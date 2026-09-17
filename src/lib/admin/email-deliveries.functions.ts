import { createServerFn } from "@tanstack/react-start";
import { requireAdmin } from "@/lib/admin-auth.server";

export const listFailedEmailDeliveries = createServerFn({ method: "GET" })
  .middleware([requireAdmin])
  .handler(async () => {
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { data, error } = await supabaseAdmin
      .from("email_deliveries")
      .select("*")
      .eq("status", "failed")
      .order("created_at", { ascending: false })
      .limit(200);
    if (error) throw new Error("Could not load email deliveries.");
    return data;
  });
