import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import portraitUrl from "@/assets/sadiq-portrait.jpg";
import { seo } from "@/lib/seo";
import { absoluteUrl } from "@/lib/site-config";

export const Route = createFileRoute("/about")({
  head: () => ({
    ...seo({
      title: "About Hooze Enterprises & Sadiq Shehu Musa",
      description:
        "Hooze Enterprises is a founder-led Nigerian technology company building useful software, automation and intelligent systems.",
      path: "/about",
    }),
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Person",
          name: "Sadiq Shehu Musa",
          jobTitle: "Founder",
          image: absoluteUrl(portraitUrl),
          worksFor: { "@type": "Organization", name: "Hooze Enterprises" },
        }),
      },
    ],
  }),
  component: AboutPage,
});

function AboutPage() {
  return (
    <>
      <section className="gutter hair-b pb-16 pt-28">
        <p className="mono-label">About Hooze</p>
        <h1 className="display mt-8 max-w-6xl text-[clamp(2.6rem,8vw,6.5rem)]">
          Builders of the systems behind <span className="text-signal">better businesses.</span>
        </h1>
      </section>

      <section className="gutter hair-b py-20">
        <div className="grid gap-12 lg:grid-cols-2">
          <h2 className="display text-4xl">Why Hooze exists</h2>
          <div className="space-y-6 text-lg leading-relaxed text-muted-foreground">
            <p>
              Too many businesses carry good ideas and serious ambition through fragile processes,
              disconnected tools and repetitive work.
            </p>
            <p>
              Hooze Enterprises exists to turn those constraints into reliable systems. We combine
              software engineering, operational thinking and applied intelligence—but only where
              each one earns its place.
            </p>
            <p>
              Our ambition is to build for the 1%: not as a claim of status, but as a standard of
              care, clarity and execution.
            </p>
          </div>
        </div>
      </section>

      <section className="gutter hair-b py-20">
        <div className="grid gap-12 lg:grid-cols-[.8fr_1.2fr] lg:items-center">
          <div className="flex flex-col items-start gap-6">
            <div className="relative w-full max-w-sm overflow-hidden border border-hairline bg-bone">
              <img
                src={portraitUrl}
                alt="Portrait of Sadiq Shehu Musa, Founder of Hooze Enterprises"
                width={768}
                height={768}
                loading="lazy"
                className="block aspect-square w-full object-cover"
              />
            </div>
            <div>
              <p className="mono-label text-signal">Founder</p>
              <p className="display mt-3 text-3xl">Sadiq Shehu Musa</p>
            </div>
          </div>
          <div>
            <h2 className="display text-[clamp(2rem,5vw,4rem)]">
              One accountable team from problem to product.
            </h2>
            <p className="mt-7 max-w-2xl text-lg leading-relaxed text-muted-foreground">
              Sadiq founded Hooze around a simple conviction: technology should be measured by what
              it enables people and businesses to do better. He leads the company's product
              thinking, engineering direction and client work from Nigeria.
            </p>
            <p className="mt-5 max-w-2xl leading-relaxed text-muted-foreground">
              That founder-led model means fewer handoffs, direct communication and responsibility
              that does not disappear between sales and delivery.
            </p>
          </div>
        </div>
      </section>

      <section className="gutter py-20">
        <p className="mono-label">What we value</p>
        <div className="mt-10 grid gap-px bg-hairline md:grid-cols-3">
          {[
            ["Clarity before code", "Understand the real constraint before proposing the system."],
            [
              "Evidence over theatre",
              "Show status, limits and results honestly—without invented proof.",
            ],
            [
              "Ownership after launch",
              "Build maintainable systems the business can understand and own.",
            ],
          ].map(([title, text]) => (
            <div key={title} className="bg-background p-8">
              <h2 className="display text-2xl">{title}</h2>
              <p className="mt-5 leading-relaxed text-muted-foreground">{text}</p>
            </div>
          ))}
        </div>
        <Button asChild size="lg" className="mt-12">
          <Link to="/start-a-project">
            Work with Hooze <ArrowRight />
          </Link>
        </Button>
      </section>
    </>
  );
}
