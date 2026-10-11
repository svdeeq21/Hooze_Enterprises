import { createFileRoute, Link } from "@tanstack/react-router";
import { StarterKitCta } from "@/components/StarterKitCta";
import { cities, deliveryModel } from "@/data/seo-pages";
import { seo } from "@/lib/seo";

export const Route = createFileRoute("/locations")({
  head: () =>
    seo({
      title: "AI & Automation Services Across Nigeria — Hooze",
      description:
        "Hooze builds AI, WhatsApp and business automation systems for businesses across Nigeria, including Abuja, Lagos, Kaduna and Lokoja.",
      path: "/locations",
    }),
  component: Locations,
});

function Locations() {
  return (
    <>
      <section className="gutter hair-b pb-16 pt-28">
        <p className="mono-label text-signal">Where we work</p>
        <h1 className="display mt-8 max-w-5xl text-[clamp(2.2rem,6.5vw,5rem)]">
          AI and business automation for businesses across Nigeria.
        </h1>
        <p className="mt-8 max-w-3xl text-xl text-muted-foreground">{deliveryModel}</p>
      </section>
      <section className="gutter hair-b grid gap-px bg-hairline py-px sm:grid-cols-2 lg:grid-cols-4">
        {cities.map((c) => (
          <Link key={c.slug} to="/locations/$slug" params={{ slug: c.slug }} className="bg-background p-7 hover:bg-accent">
            <p className="text-xl font-semibold">{c.name}</p>
            <p className="mono-label mt-3">{c.state}</p>
          </Link>
        ))}
      </section>
      <StarterKitCta />
    </>
  );
}
