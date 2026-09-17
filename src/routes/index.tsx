import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ProjectVisual } from "@/components/ProjectVisual";
import { process, projects, solutions, site } from "@/data/content";
import { seo } from "@/lib/seo";
import { track } from "@/lib/track";
import heroImage from "@/assets/hero-system.jpg";
import portraitUrl from "@/assets/sadiq-portrait.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    ...seo({
      title: "Hooze Enterprises — Software & Automation Systems",
      description:
        "Hooze builds custom software, business automation and intelligent systems around real operational problems in Nigeria.",
      path: "/",
    }),
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Organization",
          name: "Hooze Enterprises",
          areaServed: "Nigeria",
          email: "hoozeenterprises@gmail.com",
          founder: { "@type": "Person", name: "Sadiq Shehu Musa" },
        }),
      },
    ],
  }),
  component: Index,
});

function Index() {
  const featured = projects[0];
  if (!featured) return null;
  return (
    <>
      <section className="relative min-h-[84vh] overflow-hidden hair-b">
        <img
          src={heroImage}
          alt="Abstract systems architecture representing connected business operations"
          width={1920}
          height={1088}
          className="absolute inset-0 h-full w-full object-cover opacity-45"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/25 via-background/65 to-background" />
        <div className="gutter relative flex min-h-[84vh] flex-col justify-end pb-14 pt-32">
          <div className="flex items-center gap-4">
            <span className="mono-label text-signal">Hooze Enterprises</span>
            <span className="h-px flex-1 bg-hairline" />
            <span className="mono-label">Nigeria</span>
          </div>
          <h1 className="display rise mt-9 max-w-6xl text-[clamp(2.8rem,8.5vw,7.5rem)]">
            Business problems don’t fix themselves.{" "}
            <span className="text-signal">We build the systems that do.</span>
          </h1>
          <div className="mt-10 grid gap-8 lg:grid-cols-[1fr_auto] lg:items-end">
            <p className="max-w-2xl text-base leading-relaxed text-foreground/80 md:text-xl">
              Hooze helps businesses replace repetitive work, disconnected tools and missed
              opportunities with software, automation and intelligent systems built around how they
              operate.
            </p>
            <div className="flex flex-wrap gap-3">
              <Button asChild size="lg">
                <Link to="/start-a-project">
                  Start a project <ArrowRight />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline">
                <Link to="/work">See our work</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section className="gutter hair-b py-7">
        <div className="grid gap-5 md:grid-cols-3">
          <p className="mono-label">
            <span className="text-signal">Production</span> client system deployed
          </p>
          <p className="mono-label">
            <span className="text-signal">220+</span> leads in working dataset
          </p>
          <p className="mono-label">
            <span className="text-signal">7,293</span> messages processed
          </p>
        </div>
      </section>

      <section className="gutter hair-b py-20 md:py-28">
        <div className="grid gap-12 lg:grid-cols-[.8fr_1.2fr]">
          <div>
            <p className="mono-label">The operational cost</p>
            <h2 className="display mt-6 text-[clamp(2rem,5vw,4rem)]">
              Your business should not depend on workarounds.
            </h2>
          </div>
          <div className="grid gap-px bg-hairline sm:grid-cols-2">
            {[
              ["Missed enquiries", "Customer conversations get lost or followed up too late."],
              ["Repetitive work", "People spend valuable time repeating avoidable manual steps."],
              [
                "Scattered information",
                "Critical data sits across disconnected tools and inboxes.",
              ],
              [
                "A product needs building",
                "The business needs software shaped around a real opportunity.",
              ],
            ].map(([title, text]) => (
              <div key={title} className="bg-background p-7">
                <h3 className="font-semibold text-xl">{title}</h3>
                <p className="mt-3 leading-relaxed text-muted-foreground">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="gutter hair-b py-20 md:py-28">
        <div className="flex items-end justify-between gap-6">
          <div>
            <p className="mono-label">Solutions</p>
            <h2 className="display mt-6 text-[clamp(2rem,5vw,4rem)]">
              The right system for the work that matters.
            </h2>
          </div>
          <Link to="/solutions" className="mono-label hidden text-signal sm:block">
            All solutions →
          </Link>
        </div>
        <div className="mt-14 grid gap-px bg-hairline lg:grid-cols-2">
          {solutions.map((solution) => (
            <Link
              key={solution.slug}
              to="/solutions/$slug"
              params={{ slug: solution.slug }}
              className="group bg-background p-8 hover:bg-secondary"
            >
              <span className="mono-label text-signal">{solution.id}</span>
              <h3 className="display mt-6 text-3xl">{solution.title}</h3>
              <p className="mt-4 max-w-lg leading-relaxed text-muted-foreground">
                {solution.summary}
              </p>
              <span className="mono-label mt-8 inline-flex items-center gap-2 group-hover:text-signal">
                Explore <ArrowRight />
              </span>
            </Link>
          ))}
        </div>
      </section>

      <section className="hair-b">
        <div className="gutter py-20 md:py-28">
          <p className="mono-label">Featured work · Production</p>
          <div className="mt-10 grid gap-10 lg:grid-cols-[1.1fr_.9fr] lg:items-center">
            <ProjectVisual
              image={featured.image}
              alt="Illustrative view of the Praise Dynasty Realty WhatsApp sales system"
              className="aspect-[16/10]"
            />
            <div>
              <p className="mono-label text-signal">
                {featured.name} · {featured.year}
              </p>
              <h2 className="display mt-6 text-[clamp(2rem,4.4vw,3.75rem)]">{featured.headline}</h2>
              <p className="mt-6 leading-relaxed text-muted-foreground">{featured.built}</p>
              <ul className="mt-7 space-y-3">
                {[
                  "Production deployment",
                  "Approximately 220 leads",
                  "7,293 messages in the working dataset",
                ].map((item) => (
                  <li key={item} className="flex gap-3 text-sm">
                    <Check className="mt-0.5 size-4 text-signal" />
                    {item}
                  </li>
                ))}
              </ul>
              <Button asChild variant="outline" size="lg" className="mt-9">
                <Link to="/work/$slug" params={{ slug: featured.slug }}>
                  Read the case study <ArrowRight />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section className="gutter hair-b py-20 md:py-28">
        <p className="mono-label">Our position</p>
        <blockquote className="display mt-8 max-w-5xl text-[clamp(2rem,5.5vw,4.75rem)]">
          Not everything needs AI. Not everything needs custom software.{" "}
          <span className="text-signal">Everything needs the right solution.</span>
        </blockquote>
        <p className="mt-9 max-w-2xl text-lg leading-relaxed text-muted-foreground">
          We start by understanding what is not working. Then we decide whether the answer is
          automation, software, intelligence—or something simpler.
        </p>
      </section>

      <section className="gutter hair-b py-20 md:py-28">
        <p className="mono-label">How a Hooze project works</p>
        <div className="mt-12 grid gap-px bg-hairline md:grid-cols-5">
          {process.map(([id, title, text]) => (
            <div key={id} className="bg-background p-6">
              <span className="mono-label text-signal">{id}</span>
              <h3 className="display mt-12 text-xl">{title}</h3>
              <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="gutter hair-b py-20 md:py-28">
        <p className="mono-label">Founder-led accountability</p>
        <div className="mt-12 grid gap-10 lg:grid-cols-[.8fr_1.2fr] lg:items-center">
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
            <h2 className="display text-[clamp(2rem,5vw,4rem)]">
              Built with ambition. Delivered with responsibility.
            </h2>
            <p className="mt-7 max-w-2xl text-lg leading-relaxed text-muted-foreground">
              Sadiq Shehu Musa founded Hooze Enterprises to build useful systems around meaningful
              business problems—not technology for technology’s sake.
            </p>
            <Link to="/about" className="mono-label mt-8 inline-block text-signal">
              About Hooze and its founder →
            </Link>
          </div>
        </div>
      </section>

      <section className="gutter hair-b py-20 md:py-28">
        <div className="grid gap-10 lg:grid-cols-[1fr_.8fr] lg:items-center">
          <div>
            <p className="mono-label text-signal">Not ready for a project yet?</p>
            <h2 className="display mt-6 text-[clamp(2rem,5vw,4rem)]">
              Get the Business Automation Starter Kit.
            </h2>
            <p className="mt-6 max-w-xl leading-relaxed text-muted-foreground">
              A free, practical guide to finding the repetitive work worth fixing first — how to
              spot it, a short process-audit worksheet, and what to ask before buying any tool.
              Useful on its own, whether or not you ever work with Hooze.
            </p>
            <Button asChild size="lg" className="mt-8">
              <Link to="/get-the-guide">
                Get the free guide <ArrowRight />
              </Link>
            </Button>
          </div>
          <div className="hair-l pl-10 hidden lg:block">
            <ul className="space-y-4 text-sm text-muted-foreground">
              {[
                "How to identify repetitive work",
                "A process audit worksheet",
                "Common tasks businesses automate first",
                "Customer follow-up checklist",
                "Questions to ask before buying automation",
              ].map((item) => (
                <li key={item} className="flex gap-3">
                  <Check className="mt-0.5 size-4 shrink-0 text-signal" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="gutter py-20 md:py-28">
        <div className="grid gap-10 md:grid-cols-2">
          <Link
            to="/start-a-project"
            className="group border border-hairline p-10 hover:border-signal"
          >
            <span className="mono-label text-signal">Ready to hire</span>
            <h3 className="display mt-6 text-3xl">Start a project</h3>
            <p className="mt-4 leading-relaxed text-muted-foreground">
              Tell us what is not working. We will help determine the right system.
            </p>
            <span className="mono-label mt-8 inline-flex items-center gap-2 group-hover:text-signal">
              Start a project <ArrowRight />
            </span>
          </Link>
          <a
            href={site.whatsappHref}
            target="_blank"
            rel="noreferrer"
            onClick={() => track("whatsapp_clicked", { location: "homepage_final_cta" })}
            className="group border border-hairline p-10 hover:border-signal"
          >
            <span className="mono-label text-signal">Want to talk first</span>
            <h3 className="display mt-6 text-3xl">Talk to Hooze</h3>
            <p className="mt-4 leading-relaxed text-muted-foreground">
              Prefer a conversation before anything else? Message Hooze directly on WhatsApp.
            </p>
            <span className="mono-label mt-8 inline-flex items-center gap-2 group-hover:text-signal">
              Open WhatsApp <ArrowRight />
            </span>
          </a>
        </div>
      </section>
    </>
  );
}
