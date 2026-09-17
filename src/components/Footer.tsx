import { Link } from "@tanstack/react-router";
import { nav, site } from "@/data/content";
import { track } from "@/lib/track";

export function Footer() {
  return (
    <footer className="hair-t">
      <Link
        to="/start-a-project"
        className="group gutter hair-b flex flex-col justify-between gap-8 py-16 md:flex-row md:items-end"
      >
        <div>
          <p className="mono-label">Have a process holding the business back?</p>
          <p className="display mt-5 text-[clamp(2rem,6vw,4.5rem)]">
            Tell us what is <span className="text-signal">not working.</span>
          </p>
        </div>
        <span className="mono-label text-signal">Start a project →</span>
      </Link>
      <div className="gutter grid gap-10 py-10 md:grid-cols-[1fr_auto] md:items-end">
        <div>
          <p className="display text-2xl">
            Hooze <span className="text-signal">Enterprises</span>
          </p>
          <p className="mt-3 max-w-md text-sm text-muted-foreground">
            Software, automation and intelligent systems built around real business problems.
          </p>
          <div className="mt-5 flex flex-wrap gap-5 text-sm">
            <a
              href={site.whatsappHref}
              target="_blank"
              rel="noreferrer"
              onClick={() => track("whatsapp_clicked", { location: "footer" })}
              className="mono-label text-signal hover:underline"
            >
              WhatsApp Hooze
            </a>
            <a
              href={`mailto:${site.email}`}
              onClick={() => track("contact_email_clicked", { location: "footer" })}
              className="mono-label hover:text-foreground"
            >
              {site.email}
            </a>
          </div>
        </div>
        <div className="flex flex-wrap gap-6">
          {nav.map((item) => (
            <Link key={item.to} to={item.to} className="mono-label hover:text-foreground">
              {item.label}
            </Link>
          ))}
          <Link to="/privacy" className="mono-label hover:text-foreground">
            Privacy
          </Link>
          <Link to="/terms" className="mono-label hover:text-foreground">
            Terms
          </Link>
        </div>
      </div>
      <div className="gutter hair-t flex flex-col gap-3 py-6 text-muted-foreground md:flex-row md:justify-between">
        <p className="mono-label">© 2026 {site.fullName}</p>
        <p className="mono-label">Nigeria · Builders of the 1%</p>
      </div>
    </footer>
  );
}
