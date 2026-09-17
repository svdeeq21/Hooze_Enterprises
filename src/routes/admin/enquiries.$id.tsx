import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { getEnquiry, updateEnquiryStatus, addEnquiryNote } from "@/lib/admin/enquiries.functions";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

export const Route = createFileRoute("/admin/enquiries/$id")({
  component: AdminEnquiryDetail,
});

const STATUSES = ["new", "contacted", "discovery", "proposal", "won", "lost"] as const;
type Detail = Awaited<ReturnType<typeof getEnquiry>>;

function AdminEnquiryDetail() {
  const { id } = Route.useParams();
  const [detail, setDetail] = useState<Detail | null>(null);
  const [note, setNote] = useState("");
  const [error, setError] = useState("");

  function reload() {
    getEnquiry({ data: { id } })
      .then(setDetail)
      .catch((cause) =>
        setError(cause instanceof Error ? cause.message : "Could not load enquiry."),
      );
  }
  useEffect(reload, [id]);

  if (error) return <p className="text-sm text-destructive">{error}</p>;
  if (!detail) return <p className="text-sm text-muted-foreground">Loading…</p>;
  const { enquiry, notes, deliveries } = detail;

  return (
    <div className="grid gap-8 lg:grid-cols-[1fr_.7fr]">
      <div>
        <p className="mono-label text-signal">{enquiry.project_type}</p>
        <h1 className="display mt-2 text-3xl">{enquiry.business_name}</h1>
        <dl className="mt-6 grid grid-cols-2 gap-4 text-sm">
          <div>
            <dt className="text-muted-foreground">Name</dt>
            <dd>{enquiry.name}</dd>
          </div>
          <div>
            <dt className="text-muted-foreground">Email</dt>
            <dd>{enquiry.email}</dd>
          </div>
          <div>
            <dt className="text-muted-foreground">WhatsApp</dt>
            <dd>{enquiry.whatsapp || "—"}</dd>
          </div>
          <div>
            <dt className="text-muted-foreground">Preferred contact</dt>
            <dd className="capitalize">{enquiry.preferred_contact}</dd>
          </div>
          <div>
            <dt className="text-muted-foreground">Budget</dt>
            <dd>{enquiry.budget_range || "—"}</dd>
          </div>
          <div>
            <dt className="text-muted-foreground">Timeline</dt>
            <dd>{enquiry.timeline || "—"}</dd>
          </div>
          <div>
            <dt className="text-muted-foreground">Source</dt>
            <dd>{enquiry.utm_source || "direct"}</dd>
          </div>
          <div>
            <dt className="text-muted-foreground">Received</dt>
            <dd>{new Date(enquiry.created_at).toLocaleString()}</dd>
          </div>
        </dl>
        <p className="mt-6 text-sm font-medium">Problem</p>
        <p className="mt-2 whitespace-pre-wrap text-sm leading-relaxed text-muted-foreground">
          {enquiry.problem}
        </p>
        {enquiry.current_tools && (
          <>
            <p className="mt-6 text-sm font-medium">Current tools</p>
            <p className="mt-2 text-sm text-muted-foreground">{enquiry.current_tools}</p>
          </>
        )}

        <p className="mt-8 text-sm font-medium">Email delivery</p>
        <ul className="mt-2 space-y-1 text-sm">
          {deliveries.map((d) => (
            <li
              key={d.id}
              className={d.status === "failed" ? "text-destructive" : "text-muted-foreground"}
            >
              {d.email_type} → {d.recipient} · {d.status}
              {d.error_message ? ` (${d.error_message})` : ""}
            </li>
          ))}
          {deliveries.length === 0 && (
            <li className="text-muted-foreground">No delivery attempts logged yet.</li>
          )}
        </ul>
      </div>

      <div>
        <p className="text-sm font-medium">Status</p>
        <select
          defaultValue={enquiry.status}
          onChange={(e) =>
            updateEnquiryStatus({
              data: { id, status: e.target.value as (typeof STATUSES)[number] },
            }).then(reload)
          }
          className="mt-2 h-10 w-full border border-input bg-background px-3 text-sm capitalize"
        >
          {STATUSES.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>

        <p className="mt-8 text-sm font-medium">Internal notes</p>
        <div className="mt-2 grid gap-3">
          <Textarea
            value={note}
            onChange={(e) => setNote(e.target.value)}
            rows={3}
            className="rounded-none bg-secondary/30 p-3 text-sm"
            placeholder="Add a note for the team…"
          />
          <Button
            size="sm"
            disabled={!note.trim()}
            onClick={() =>
              addEnquiryNote({ data: { id, note } }).then(() => {
                setNote("");
                reload();
              })
            }
          >
            Add note
          </Button>
        </div>
        <ul className="mt-6 space-y-4">
          {notes.map((n) => (
            <li key={n.id} className="border-l-2 border-signal pl-3 text-sm">
              <p className="text-muted-foreground">
                {n.author_email} · {new Date(n.created_at).toLocaleString()}
              </p>
              <p className="mt-1 whitespace-pre-wrap">{n.note}</p>
            </li>
          ))}
          {notes.length === 0 && <li className="text-sm text-muted-foreground">No notes yet.</li>}
        </ul>
      </div>
    </div>
  );
}
