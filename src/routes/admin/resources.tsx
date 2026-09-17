import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { listResourceRequests } from "@/lib/admin/resources.functions";

export const Route = createFileRoute("/admin/resources")({
  component: AdminResources,
});

type Row = Awaited<ReturnType<typeof listResourceRequests>>[number];

function AdminResources() {
  const [rows, setRows] = useState<Row[]>([]);
  const [error, setError] = useState("");

  useEffect(() => {
    listResourceRequests()
      .then(setRows)
      .catch((cause) =>
        setError(cause instanceof Error ? cause.message : "Could not load resource requests."),
      );
  }, []);

  if (error) return <p className="text-sm text-destructive">{error}</p>;

  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-[720px] text-sm">
        <thead>
          <tr className="hair-b text-left text-muted-foreground">
            <th className="py-2 pr-4">Name</th>
            <th className="py-2 pr-4">Email</th>
            <th className="py-2 pr-4">Business</th>
            <th className="py-2 pr-4">Challenge</th>
            <th className="py-2 pr-4">Delivery</th>
            <th className="py-2 pr-4">Requested</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => {
            const contact = row.contacts as unknown as {
              name: string;
              email: string;
              business_name: string | null;
            } | null;
            return (
              <tr key={row.id} className="hair-b">
                <td className="py-3 pr-4">{contact?.name ?? "—"}</td>
                <td className="py-3 pr-4">{contact?.email ?? "—"}</td>
                <td className="py-3 pr-4">{contact?.business_name ?? "—"}</td>
                <td className="py-3 pr-4 max-w-xs truncate">{row.business_challenge ?? "—"}</td>
                <td
                  className={`py-3 pr-4 ${row.delivery_status === "failed" ? "text-destructive" : ""}`}
                >
                  {row.delivery_status}
                </td>
                <td className="py-3 pr-4 text-muted-foreground">
                  {new Date(row.created_at).toLocaleDateString()}
                </td>
              </tr>
            );
          })}
          {rows.length === 0 && (
            <tr>
              <td colSpan={6} className="py-6 text-muted-foreground">
                No resource requests yet.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
