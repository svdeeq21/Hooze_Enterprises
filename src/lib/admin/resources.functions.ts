import { createServerFn } from "@tanstack/react-start";
import { requireAdmin } from "@/lib/admin-auth.server";

export const listResourceRequests = createServerFn({ method: "GET" })
  .middleware([requireAdmin])
  .handler(async () => {
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { data, error } = await supabaseAdmin
      .from("resource_requests")
      .select(
        "id, business_challenge, delivery_status, created_at, utm_source, contacts:contact_id(name, email, business_name)",
      )
      .order("created_at", { ascending: false })
      .limit(200);
    if (error) throw new Error("Could not load resource requests.");
    return data;
  });
