import { createFileRoute, Link } from "@tanstack/react-router";
import { StarterKitCta } from "@/components/StarterKitCta";
import { industries } from "@/data/seo-pages";
import { seo } from "@/lib/seo";

export const Route = createFileRoute("/industries")({
  head: () =>
    seo({
      title: "AI & Business Automation by Industry in Nigeria — Hooze",
      description:
        "See how Hooze applies WhatsApp automation and business systems to real estate, caterers, event planners, schools, clinics, hospitals and online sellers in Nigeria.",
      path: "/industries",
    }),
  component: Industries,
});

function Industries() {
  return (
    <>
      <section className="gutter hair-b pb-16 pt-28">
        <p className="mono-label text-signal">Industries</p>
        <h1 className="display mt-8 max-w-5xl text-[clamp(2.2rem,6.5vw,5rem)]">
          Business automation, shaped around your kind of business.
        </h1>
        <p className="mt-8 max-w-3xl text-xl text-muted-foreground">
          Pick the industry closest to yours to see the problems we solve, how the system works and
          what still needs a human.
        </p>
      </section>
      <section className="gutter hair-b grid gap-px bg-hairline py-px sm:grid-cols-2 lg:grid-cols-3">
        {industries.map((i) => (
          <Link key={i.slug} to="/industries/$slug" params={{ slug: i.slug }} className="bg-background p-7 hover:bg-accent">
            <p className="text-xl font-semibold">{i.name}</p>
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{i.answer.slice(0, 120)}…</p>
          </Link>
        ))}
      </section>
      <StarterKitCta />
    </>
  );
}
