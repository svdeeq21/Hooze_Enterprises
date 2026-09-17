import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { getDashboardSummary } from "@/lib/admin/dashboard.functions";

export const Route = createFileRoute("/admin/")({
  component: AdminDashboard,
});

type Summary = Awaited<ReturnType<typeof getDashboardSummary>>;

function AdminDashboard() {
  const [summary, setSummary] = useState<Summary | null>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    getDashboardSummary()
      .then(setSummary)
      .catch((cause) =>
        setError(cause instanceof Error ? cause.message : "Could not load dashboard."),
      );
  }, []);

  if (error) return <p className="text-sm text-destructive">{error}</p>;
  if (!summary) return <p className="text-sm text-muted-foreground">Loading…</p>;

  const cards: Array<[string, number]> = [
    ["New enquiries", summary.enquiriesByStatus["new"] ?? 0],
    ["Contacted", summary.enquiriesByStatus["contacted"] ?? 0],
    ["Discovery", summary.enquiriesByStatus["discovery"] ?? 0],
    ["Total enquiries", summary.totalEnquiries],
    ["Resource requests", summary.resourceRequests],
    ["Marketing subscribers", summary.marketingSubscribers],
    ["Failed email deliveries", summary.failedEmailDeliveries],
  ];

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {cards.map(([label, value]) => (
        <div key={label} className="border border-hairline p-6">
          <p className="mono-label text-muted-foreground">{label}</p>
          <p className="display mt-3 text-4xl">{value}</p>
        </div>
      ))}
    </div>
  );
}
