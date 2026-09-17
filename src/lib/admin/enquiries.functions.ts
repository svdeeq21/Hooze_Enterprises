// Server-only, admin-gated. Every export here runs through requireAdmin
// before touching supabaseAdmin — see src/lib/admin-auth.server.ts.
// supabaseAdmin is imported dynamically inside each handler, not at module
// top level: this file is a *.functions.ts file and ships a client-side
// reference stub, so a top-level import of the service-role client would
// pull client.server.ts into that bundle (see the warning in
// src/integrations/supabase/client.server.ts).
import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { requireAdmin } from "@/lib/admin-auth.server";

const STATUSES = ["new", "contacted", "discovery", "proposal", "won", "lost"] as const;

const listSchema = z.object({
  search: z.string().trim().max(200).optional().default(""),
  status: z.enum(STATUSES).optional(),
});

export const listEnquiries = createServerFn({ method: "GET" })
  .middleware([requireAdmin])
  .inputValidator((input) => listSchema.parse(input))
  .handler(async ({ data }) => {
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    let query = supabaseAdmin
      .from("project_enquiries")
      .select(
        "id, name, business_name, email, whatsapp, project_type, status, budget_range, timeline, created_at, utm_source",
      )
      .order("created_at", { ascending: false })
      .limit(200);

    if (data.status) query = query.eq("status", data.status);
    if (data.search) {
      const term = `%${data.search}%`;
      query = query.or(`name.ilike.${term},business_name.ilike.${term},email.ilike.${term}`);
    }

    const { data: rows, error } = await query;
    if (error) throw new Error("Could not load enquiries.");
    return rows;
  });

export const getEnquiry = createServerFn({ method: "GET" })
  .middleware([requireAdmin])
  .inputValidator((input) => z.object({ id: z.string().uuid() }).parse(input))
  .handler(async ({ data }) => {
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const [{ data: enquiry, error }, { data: notes }, { data: deliveries }] = await Promise.all([
      supabaseAdmin.from("project_enquiries").select("*").eq("id", data.id).single(),
      supabaseAdmin
        .from("enquiry_notes")
        .select("*")
        .eq("enquiry_id", data.id)
        .order("created_at", { ascending: false }),
      supabaseAdmin
        .from("email_deliveries")
        .select("*")
        .eq("related_table", "project_enquiries")
        .eq("related_id", data.id)
        .order("created_at", { ascending: false }),
    ]);
    if (error || !enquiry) throw new Error("Enquiry not found.");
    return { enquiry, notes: notes ?? [], deliveries: deliveries ?? [] };
  });

export const updateEnquiryStatus = createServerFn({ method: "POST" })
  .middleware([requireAdmin])
  .inputValidator((input) =>
    z.object({ id: z.string().uuid(), status: z.enum(STATUSES) }).parse(input),
  )
  .handler(async ({ data }) => {
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { error } = await supabaseAdmin
      .from("project_enquiries")
      .update({ status: data.status })
      .eq("id", data.id);
    if (error) throw new Error("Could not update status.");
    return { ok: true };
  });

export const addEnquiryNote = createServerFn({ method: "POST" })
  .middleware([requireAdmin])
  .inputValidator((input) =>
    z
      .object({
        id: z.string().uuid(),
        note: z.string().trim().min(1).max(2000),
      })
      .parse(input),
  )
  .handler(async ({ data, context }) => {
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { error } = await supabaseAdmin.from("enquiry_notes").insert({
      enquiry_id: data.id,
      note: data.note,
      author_email: context.adminEmail,
    });
    if (error) throw new Error("Could not save note.");
    return { ok: true };
  });
