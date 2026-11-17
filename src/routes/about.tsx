import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PageShell } from "@/components/site/PageShell";
import { ArrowLink, Eyebrow } from "@/components/site/primitives";
import { seo } from "@/lib/seo";
import { siteConfig } from "@/lib/site-config";

export const Route = createFileRoute("/about")({
  head: () =>
    seo({
      title: "About Hooze Enterprises | Engineering-led AI and automation",
      description:
        "Hooze Enterprises is led by engineer Sadiq Shehu and builds practical AI products, automation and software for Nigerian businesses.",
      path: "/about",
    }),
  component: About,
});

// CONFIRM: edit this bio. To show a founder photo, add the file to src/assets and set `founderPhoto`.
const founderPhoto: string | null = null;

const principles = [
  [
    "Solve the actual problem",
    "We start from how the work really happens, not from a technology we want to use.",
  ],
  [
    "Build around the business",
    "Systems should fit your process, your team and your customers, not the other way round.",
  ],
  [
    "Prioritise reliability",
    "A system people can trust on a busy Monday matters more than an impressive demo.",
  ],
  [
    "Keep humans in the loop",
    "Where judgement matters, a person stays in control, with clear handoffs.",
  ],
  [
    "Deliver what can be maintained",
    "We build systems your business can run, monitor and improve over time.",
  ],
] as const;

function About() {
  return (
    <PageShell>
      <section className="border-b border-border py-16 md:py-24">
        <div className="mx-auto grid max-w-[1440px] grid-cols-12 gap-x-0 gap-y-10 md:gap-x-10 px-5 md:px-10 xl:px-16">
          <div className="col-span-12 md:col-span-7">
            <Eyebrow>ABOUT HOOZE</Eyebrow>
            <h1 className="mt-6 max-w-[760px] font-display text-4xl font-semibold leading-[1.05] md:text-6xl">
              We don’t build for the <span className="text-amber">ordinary.</span>
            </h1>
            <p className="mt-8 max-w-[620px] text-base leading-7 text-foreground/80">
              Hooze Enterprises exists to build technology that moves businesses forward. Our
              flagship product, Hooze AI, helps WhatsApp-first businesses manage customer
              conversations. Alongside it, we take on custom AI applications, automation and
              software for businesses with problems that off-the-shelf tools don’t solve.
            </p>
          </div>
          <div className="col-span-12 border-t border-border pt-6 md:col-span-3 md:col-start-10 md:border-l md:border-t-0 md:pl-7 md:pt-0">
            <Eyebrow>OUR POSITION</Eyebrow>
            <p className="mt-4 font-display text-2xl font-semibold leading-tight">
              Not everything needs AI.
            </p>
            <p className="mt-3 font-display text-2xl font-semibold leading-tight text-muted-foreground">
              Everything needs the right solution.
            </p>
          </div>
        </div>
      </section>

      <section className="border-b border-border bg-surface py-16 md:py-24">
        <div className="mx-auto grid max-w-[1440px] grid-cols-12 items-start gap-x-0 gap-y-10 md:gap-x-10 px-5 md:px-10 xl:px-16">
          <div className="col-span-12 md:col-span-4">
            {founderPhoto ? (
              <img
                src={founderPhoto}
                alt="Sadiq Shehu, founder of Hooze Enterprises"
                width={640}
                height={800}
                loading="lazy"
                className="aspect-[4/5] w-full object-cover"
              />
            ) : (
              <div
                role="img"
                aria-label="Photo of the founder to be added"
                className="case-study-visual flex aspect-[4/5] w-full items-center justify-center border border-border"
              >
                <span className="font-display text-7xl font-black text-amber/80">SS</span>
              </div>
            )}
          </div>
          <div className="col-span-12 md:col-span-7 md:col-start-6">
            <Eyebrow>THE FOUNDER</Eyebrow>
            <h2 className="mt-6 font-display text-3xl font-semibold md:text-4xl">Sadiq Shehu</h2>
            <p className="mt-1 text-sm text-muted-foreground">Founder, Hooze Enterprises</p>
            <div className="mt-6 max-w-[620px] space-y-4 text-sm leading-7 text-foreground/80">
              <p>
                Hooze Enterprises is founded and led by Sadiq Shehu, an engineer in Nigeria who
                builds and ships production AI and automation systems for real businesses.
              </p>
              <p>
                Hooze began from a simple frustration: too many businesses lose customers and time
                to slow, manual, disconnected work, and too many “AI solutions” add complexity
                instead of removing it. Hooze exists to build the practical version: technology that
                fits how a business already runs, and that people can rely on.
              </p>
            </div>
            <div className="mt-8">
              <ArrowLink to="/work/praise-dynasty-whatsapp-sales-system">
                See a deployed system
              </ArrowLink>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="mx-auto max-w-[1440px] px-5 md:px-10 xl:px-16">
          <Eyebrow>ENGINEERING PRINCIPLES</Eyebrow>
          <h2 className="mt-6 max-w-[640px] font-display text-3xl font-semibold md:text-5xl">
            How we decide what to build.
          </h2>
          <ol className="mt-12 grid border-l border-t border-border md:grid-cols-2 xl:grid-cols-3">
            {principles.map(([title, text], index) => (
              <li key={title} className="border-b border-r border-border p-6 md:p-8">
                <span className="font-mono text-xs text-amber">0{index + 1}</span>
                <h3 className="mt-4 font-display text-xl font-semibold">{title}</h3>
                <p className="mt-3 text-sm leading-6 text-muted-foreground">{text}</p>
              </li>
            ))}
          </ol>
          <div className="mt-12 flex flex-wrap gap-4">
            <Button asChild size="lg" className="h-12 rounded-sm px-6 text-sm">
              <Link to="/start-a-project">
                Start a project <ArrowUpRight aria-hidden="true" />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="h-12 rounded-sm px-6 text-sm">
              <a href={siteConfig.productUrl} target="_blank" rel="noreferrer">
                Explore Hooze AI <ArrowUpRight aria-hidden="true" />
              </a>
            </Button>
          </div>
        </div>
      </section>
    </PageShell>
  );
}
