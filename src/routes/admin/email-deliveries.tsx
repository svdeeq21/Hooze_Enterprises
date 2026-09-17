import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { listFailedEmailDeliveries } from "@/lib/admin/email-deliveries.functions";

export const Route = createFileRoute("/admin/email-deliveries")({
  component: AdminEmailDeliveries,
});

type Row = Awaited<ReturnType<typeof listFailedEmailDeliveries>>[number];

function AdminEmailDeliveries() {
  const [rows, setRows] = useState<Row[]>([]);
  const [error, setError] = useState("");

  useEffect(() => {
    listFailedEmailDeliveries()
      .then(setRows)
      .catch((cause) =>
        setError(cause instanceof Error ? cause.message : "Could not load email deliveries."),
      );
  }, []);

  if (error) return <p className="text-sm text-destructive">{error}</p>;

  return (
    <div>
      <p className="text-sm text-muted-foreground">
        Failed sends only. Successful sends aren't shown here to keep this list actionable.
      </p>
      <div className="mt-4 overflow-x-auto">
        <table className="w-full min-w-[720px] text-sm">
          <thead>
            <tr className="hair-b text-left text-muted-foreground">
              <th className="py-2 pr-4">Type</th>
              <th className="py-2 pr-4">Recipient</th>
              <th className="py-2 pr-4">Error</th>
              <th className="py-2 pr-4">Attempts</th>
              <th className="py-2 pr-4">When</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row.id} className="hair-b text-destructive">
                <td className="py-3 pr-4">{row.email_type}</td>
                <td className="py-3 pr-4">{row.recipient}</td>
                <td className="py-3 pr-4 max-w-sm truncate">{row.error_message ?? "—"}</td>
                <td className="py-3 pr-4">{row.attempt_count}</td>
                <td className="py-3 pr-4">{new Date(row.created_at).toLocaleString()}</td>
              </tr>
            ))}
            {rows.length === 0 && (
              <tr>
                <td colSpan={5} className="py-6 text-muted-foreground">
                  No failed deliveries. Good sign.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
