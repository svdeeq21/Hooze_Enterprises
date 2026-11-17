import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PageShell } from "@/components/site/PageShell";
import { ArrowLink, Eyebrow } from "@/components/site/primitives";
import { track } from "@/lib/analytics";
import { seo } from "@/lib/seo";
import { caseStudyPath, siteConfig } from "@/lib/site-config";

const { client, place, year, leads, messages } = siteConfig.caseStudy;

export const Route = createFileRoute("/work/praise-dynasty-whatsapp-sales-system")({
  head: () =>
    seo({
      title: `${client} case study: a WhatsApp sales system | Hooze Enterprises`,
      description: `How Hooze built a conversational sales system for ${client}: lead qualification, conversation memory, property retrieval, follow-up and human handoff over WhatsApp.`,
      path: caseStudyPath,
    }),
  component: CaseStudy,
});

// CONFIRM before adding detail: measurement period and definitions for the two figures,
// plus any anonymised screenshots or a client quote you have permission to publish.
const built = [
  [
    "Automated conversations",
    "Customers get a prompt, relevant reply on WhatsApp instead of waiting for someone to be free.",
  ],
  [
    "Property information retrieval",
    "Answers draw on the business’s own property information, so replies stay relevant.",
  ],
  [
    "Lead qualification and context",
    "Details such as interest, location and timing are captured against the lead as the conversation goes.",
  ],
  [
    "Conversation memory",
    "The system remembers earlier messages, so customers aren’t asked the same thing twice.",
  ],
  [
    "Follow-up workflows",
    "Enquiries that go quiet are followed up on a defined schedule, rather than relying on someone to remember.",
  ],
  [
    "Escalation and human handoff",
    "When a customer needs a person, the conversation is passed to the team with its context.",
  ],
] as const;

function Section({
  number,
  title,
  children,
}: {
  number: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="reveal grid grid-cols-12 gap-6 border-t border-border py-12 md:gap-8 md:py-16">
      <div className="col-span-12 md:col-span-4">
        <span className="font-mono text-xs text-amber">{number}</span>
        <h2 className="mt-3 font-display text-2xl font-semibold md:text-3xl">{title}</h2>
      </div>
      <div className="col-span-12 md:col-span-7 md:col-start-6">{children}</div>
    </section>
  );
}

function CaseStudy() {
  return (
    <PageShell>
      <header className="border-b border-border py-16 md:py-24">
        <div className="mx-auto max-w-[1440px] px-5 md:px-10 xl:px-16">
          <Eyebrow>CASE STUDY · REAL ESTATE · {year}</Eyebrow>
          <h1 className="mt-6 max-w-[900px] font-display text-4xl font-semibold leading-[1.05] md:text-6xl">
            {client}:{" "}
            <span className="text-amber">a conversational sales system built around WhatsApp.</span>
          </h1>
          <p className="mt-6 text-sm text-muted-foreground">
            {client} · {place}
          </p>
        </div>
      </header>

      <div className="mx-auto max-w-[1440px] px-5 md:px-10 xl:px-16">
        <Section number="01" title="The problem">
          <p className="text-base leading-7 text-foreground/85">
            Property enquiries arrive through WhatsApp throughout the day. That creates operational
            pressure: replying quickly, working out which buyers are serious, and making sure
            follow-ups don’t go cold while the team is busy.
          </p>
        </Section>

        <Section number="02" title="What Hooze built">
          <ul className="grid gap-px border border-border bg-border sm:grid-cols-2">
            {built.map(([title, text]) => (
              <li key={title} className="bg-background p-5">
                <h3 className="font-display text-base font-semibold">{title}</h3>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">{text}</p>
              </li>
            ))}
          </ul>
        </Section>

        <Section number="03" title="Deployment evidence">
          <dl className="grid max-w-[520px] grid-cols-2 gap-4">
            <div className="border border-border bg-surface p-5">
              <dd className="font-display text-4xl font-semibold text-amber">{leads}</dd>
              <dt className="mt-2 font-mono text-[11px] uppercase tracking-[0.1em] text-muted-foreground">
                Leads in working dataset
              </dt>
            </div>
            <div className="border border-border bg-surface p-5">
              <dd className="font-display text-4xl font-semibold text-amber">{messages}</dd>
              <dt className="mt-2 font-mono text-[11px] uppercase tracking-[0.1em] text-muted-foreground">
                Messages processed
              </dt>
            </div>
          </dl>
          <p className="mt-5 max-w-[560px] text-sm leading-6 text-muted-foreground">
            These figures describe the system’s working dataset. They are not a claim about revenue,
            sales growth or return on investment, and we haven’t measured those.
          </p>
        </Section>

        <Section number="04" title="What the system enables">
          <p className="text-base leading-7 text-foreground/85">
            Every enquiry is recorded, qualified and tracked in one place, with a clear next step
            and a route to a human when one is needed. The team can see where each conversation
            stands instead of scrolling back through chats.
          </p>
        </Section>

        <Section number="05" title="See it in action">
          <p className="text-base leading-7 text-foreground/85">
            Hooze AI is the product behind this deployment. You can explore it, or talk to us about
            whether it fits your business.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-x-8 gap-y-4">
            <Button asChild size="lg" className="h-12 rounded-sm px-6 text-sm">
              <a
                href={siteConfig.productUrl}
                target="_blank"
                rel="noreferrer"
                onClick={() => track("cta_explore_hooze_ai", { location: "case-study" })}
              >
                Explore Hooze AI <ArrowUpRight aria-hidden="true" />
              </a>
            </Button>
            <Link
              to="/start-a-project"
              onClick={() => track("cta_custom_project", { location: "case-study" })}
              className="inline-flex min-h-11 items-center gap-2 border-b border-foreground/40 text-sm transition-colors hover:border-amber hover:text-amber"
            >
              Discuss your own project <ArrowUpRight aria-hidden="true" className="size-4" />
            </Link>
          </div>
          <div className="mt-8">
            <ArrowLink to="/">Back to the homepage</ArrowLink>
          </div>
        </Section>
      </div>
    </PageShell>
  );
}
