import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { listEnquiries } from "@/lib/admin/enquiries.functions";
import { Input } from "@/components/ui/input";

export const Route = createFileRoute("/admin/enquiries")({
  component: AdminEnquiries,
});

const STATUSES = ["new", "contacted", "discovery", "proposal", "won", "lost"] as const;
type Row = Awaited<ReturnType<typeof listEnquiries>>[number];

function AdminEnquiries() {
  const [rows, setRows] = useState<Row[]>([]);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState<string>("");
  const [error, setError] = useState("");

  useEffect(() => {
    const timeout = setTimeout(() => {
      listEnquiries({
        data: {
          search,
          status: (status || undefined) as (typeof STATUSES)[number] | undefined,
        },
      })
        .then(setRows)
        .catch((cause) =>
          setError(cause instanceof Error ? cause.message : "Could not load enquiries."),
        );
    }, 250);
    return () => clearTimeout(timeout);
  }, [search, status]);

  return (
    <div>
      <div className="flex flex-wrap gap-3">
        <Input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search name, business, email…"
          className="h-10 w-64 rounded-none bg-secondary/30 px-3"
        />
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="h-10 border border-input bg-background px-3 text-sm"
        >
          <option value="">All statuses</option>
          {STATUSES.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>
      </div>
      {error && <p className="mt-4 text-sm text-destructive">{error}</p>}
      <div className="mt-6 overflow-x-auto">
        <table className="w-full min-w-[720px] text-sm">
          <thead>
            <tr className="hair-b text-left text-muted-foreground">
              <th className="py-2 pr-4">Name</th>
              <th className="py-2 pr-4">Business</th>
              <th className="py-2 pr-4">Type</th>
              <th className="py-2 pr-4">Status</th>
              <th className="py-2 pr-4">Source</th>
              <th className="py-2 pr-4">Received</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row.id} className="hair-b hover:bg-secondary/30">
                <td className="py-3 pr-4">
                  <Link
                    to="/admin/enquiries/$id"
                    params={{ id: row.id }}
                    className="text-signal hover:underline"
                  >
                    {row.name}
                  </Link>
                </td>
                <td className="py-3 pr-4">{row.business_name}</td>
                <td className="py-3 pr-4">{row.project_type}</td>
                <td className="py-3 pr-4 capitalize">{row.status}</td>
                <td className="py-3 pr-4 text-muted-foreground">{row.utm_source || "direct"}</td>
                <td className="py-3 pr-4 text-muted-foreground">
                  {new Date(row.created_at).toLocaleDateString()}
                </td>
              </tr>
            ))}
            {rows.length === 0 && (
              <tr>
                <td colSpan={6} className="py-6 text-muted-foreground">
                  No enquiries match.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
