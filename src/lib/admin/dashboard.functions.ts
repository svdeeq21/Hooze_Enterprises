import { createServerFn } from "@tanstack/react-start";
import { requireAdmin } from "@/lib/admin-auth.server";

export const getDashboardSummary = createServerFn({ method: "GET" })
  .middleware([requireAdmin])
  .handler(async () => {
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const [enquiryCounts, resourceCount, subscriberCount, failedDeliveries] = await Promise.all([
      supabaseAdmin.from("project_enquiries").select("status"),
      supabaseAdmin.from("resource_requests").select("id", { count: "exact", head: true }),
      supabaseAdmin
        .from("consent_records")
        .select("id", { count: "exact", head: true })
        .eq("consent_type", "marketing")
        .eq("consent_status", true),
      supabaseAdmin
        .from("email_deliveries")
        .select("id", { count: "exact", head: true })
        .eq("status", "failed"),
    ]);

    const byStatus: Record<string, number> = {};
    for (const row of enquiryCounts.data ?? []) {
      byStatus[row.status] = (byStatus[row.status] ?? 0) + 1;
    }

    return {
      enquiriesByStatus: byStatus,
      totalEnquiries: enquiryCounts.data?.length ?? 0,
      resourceRequests: resourceCount.count ?? 0,
      marketingSubscribers: subscriberCount.count ?? 0,
      failedEmailDeliveries: failedDeliveries.count ?? 0,
    };
  });
