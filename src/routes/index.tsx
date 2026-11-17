import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowDown,
  ArrowUpRight,
  Cable,
  CircleDot,
  FileText,
  Layers3,
  MessageCircle,
  ShoppingBag,
  Sparkles,
  Wrench,
  Workflow,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { GuideForm } from "@/components/site/GuideForm";
import { HoozeAiWalkthrough } from "@/components/site/HoozeAiWalkthrough";
import { PageShellHome } from "@/components/site/PageShellHome";
import { ArrowLink, Eyebrow } from "@/components/site/primitives";
import { track } from "@/lib/analytics";
import { additionalSectors, industries } from "@/lib/industries";
import { seo } from "@/lib/seo";
import { caseStudyPath, mailtoUrl, siteConfig, whatsappUrl } from "@/lib/site-config";
import heroImage1280 from "@/assets/hooze-hero-1280.webp";
import heroImage1920 from "@/assets/hooze-hero-1920.webp";
import heroImage2560 from "@/assets/hooze-hero-2560.webp";

const challenges = [
  {
    number: "01",
    title: "Missed enquiries",
    text: "Customer conversations get lost, answered late, or left without a clear next step.",
    icon: MessageCircle,
  },
  {
    number: "02",
    title: "Repetitive work",
    text: "People spend valuable time repeating manual steps that a better system could handle.",
    icon: Workflow,
  },
  {
    number: "03",
    title: "Disconnected tools",
    text: "Important information sits across inboxes and software that do not work together.",
    icon: Layers3,
  },
];

const approach = [
  {
    number: "01",
    title: "Understand the process first",
    text: "We map how the work actually happens before choosing any tool, including whether software is needed at all.",
    icon: CircleDot,
  },
  {
    number: "02",
    title: "Use AI where it earns its place",
    text: "If a checklist or a simple automation solves it, we say so. AI goes where language, judgement or context genuinely matter.",
    icon: Sparkles,
  },
  {
    number: "03",
    title: "Build it to be maintained",
    text: "Clear handoffs to your team, human oversight where it matters, and systems that can be improved over time.",
    icon: Wrench,
  },
];

const services = [
  {
    title: "AI-powered applications",
    text: "Software that uses AI to do useful business tasks: answering questions from your own information, sorting requests and assisting your team.",
    fit: "Teams with a repeated, language-heavy task.",
    topic: "ai-application",
    icon: Sparkles,
  },
  {
    title: "Business automation",
    text: "Stop relying on people to remember every repetitive task. We connect your tools and automate workflows around enquiries, notifications and reporting.",
    fit: "Businesses whose work moves between chats, sheets and inboxes.",
    topic: "automation",
    icon: Workflow,
  },
  {
    title: "Custom business software",
    text: "Systems built around how your company operates, instead of forcing your company to fit generic software.",
    fit: "Operations that off-the-shelf tools do not quite cover.",
    topic: "custom-software",
    icon: Layers3,
  },
  {
    title: "AI integrations",
    text: "Connect AI capabilities to the tools you already use, so you do not have to replace what works.",
    fit: "Teams happy with their tools but short of connections between them.",
    topic: "integration",
    icon: Cable,
  },
] as const;

const engagementSteps = [
  {
    number: "01",
    title: "Discovery",
    text: "We learn your business, the existing workflow and the actual operational problem.",
  },
  {
    number: "02",
    title: "Solution design",
    text: "We define the right solution, its scope, requirements and an implementation plan.",
  },
  {
    number: "03",
    title: "Engineering and deployment",
    text: "We build, test, integrate and deploy the agreed system.",
  },
  {
    number: "04",
    title: "Ongoing support",
    text: "We monitor, maintain and improve the solution according to the agreed engagement.",
  },
];

export const Route = createFileRoute("/")({
  component: HomePage,
  head: () => {
    const base = seo({
      title: "Hooze Enterprises | AI Products, Automation & Software Engineering",
      description:
        "Hooze Enterprises builds Hooze AI, a WhatsApp-first conversational sales system, plus custom AI applications, business automation and software for businesses in Nigeria.",
      path: "/",
    });
    return {
      ...base,
      scripts: [
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            name: siteConfig.name,
            url: siteConfig.url,
            logo: `${siteConfig.url}/logo.png`,
            description:
              "AI products, business automation and custom software engineering company based in Nigeria.",
            slogan: siteConfig.tagline,
            areaServed: "NG",
          }),
        },
      ],
    };
  },
});

function HomePage() {
  return (
    <PageShellHome>
      {/* HERO */}
      <section
        aria-labelledby="hero-title"
        className="relative flex min-h-[max(740px,100svh)] items-end overflow-hidden border-b border-border"
      >
        <img
          src={heroImage1920}
          srcSet={`${heroImage1280} 1280w, ${heroImage1920} 1920w, ${heroImage2560} 2560w`}
          sizes="100vw"
          alt="Abstract dark architectural forms traced with amber light"
          width={1920}
          height={1200}
          fetchPriority="high"
          decoding="async"
          className="hero-image absolute inset-0 size-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/80 to-background/10" />
        <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-background/25" />
        <div className="relative mx-auto grid w-full max-w-[1440px] grid-cols-12 items-end gap-4 px-5 pb-24 pt-36 md:px-10 md:pb-28 xl:px-16">
          <div className="col-span-12 max-w-[960px] lg:col-span-9">
            <div className="rise mb-7 flex items-center gap-3" style={{ animationDelay: "80ms" }}>
              <span className="size-1.5 rounded-full bg-amber" />
              <Eyebrow>HOOZE ENTERPRISES · NIGERIA</Eyebrow>
            </div>
            <h1
              id="hero-title"
              className="rise max-w-[940px] font-display text-4xl font-black leading-[1.04] sm:text-5xl md:text-6xl xl:text-[4.25rem]"
              style={{ animationDelay: "180ms" }}
            >
              AI products and business systems that solve{" "}
              <span className="text-amber">real operational problems.</span>
            </h1>
            <p
              className="rise mt-7 max-w-[600px] text-base leading-7 text-foreground/80 md:mt-9 md:text-lg md:leading-8"
              style={{ animationDelay: "300ms" }}
            >
              From Hooze AI, our WhatsApp-first conversational sales system, to custom AI
              applications and business automation, we engineer practical technology around the way
              businesses actually work.
            </p>
            <p
              className="rise mt-4 max-w-[600px] text-sm leading-6 text-muted-foreground"
              style={{ animationDelay: "360ms" }}
            >
              Built for WhatsApp-first businesses and teams that need better customer operations.
            </p>
            <div
              className="rise mt-8 flex flex-wrap items-center gap-x-7 gap-y-4"
              style={{ animationDelay: "420ms" }}
            >
              <Button asChild size="lg" className="h-12 rounded-sm px-6 text-sm">
                <a
                  href={siteConfig.productUrl}
                  target="_blank"
                  rel="noreferrer"
                  onClick={() => track("cta_explore_hooze_ai", { location: "hero" })}
                >
                  Explore Hooze AI <ArrowUpRight aria-hidden="true" />
                </a>
              </Button>
              <Link
                to="/start-a-project"
                onClick={() => track("cta_custom_project", { location: "hero" })}
                className="inline-flex min-h-11 items-center gap-2 border-b border-foreground/40 text-sm text-foreground transition-colors hover:border-amber hover:text-amber"
              >
                Discuss a custom project <ArrowUpRight aria-hidden="true" className="size-4" />
              </Link>
            </div>
          </div>
          <div className="col-span-12 mt-12 flex items-end justify-between border-t border-foreground/20 pt-5 lg:col-span-3 lg:mt-0 lg:flex-col lg:items-end lg:border-0 lg:pt-0">
            <a
              href={siteConfig.productUrl}
              target="_blank"
              rel="noreferrer"
              className="group text-right"
              onClick={() => track("cta_explore_hooze_ai", { location: "hero-flagship" })}
            >
              <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-muted-foreground">
                FLAGSHIP PRODUCT
              </p>
              <p className="mt-1 flex items-center gap-2 font-display text-lg font-semibold">
                Hooze <span className="text-amber">AI</span>
                <ArrowUpRight
                  aria-hidden="true"
                  className="size-4 text-amber transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                />
              </p>
              <p className="font-mono text-[11px] uppercase tracking-[0.1em] text-muted-foreground">
                CONVERSATIONAL SALES
              </p>
            </a>
            <a
              href="#problems"
              className="hidden items-center gap-3 text-xs uppercase tracking-[0.13em] text-muted-foreground transition-colors hover:text-foreground lg:flex"
            >
              <span className="scroll-dot inline-flex size-8 items-center justify-center rounded-full border border-border">
                <ArrowDown aria-hidden="true" className="size-3" />
              </span>
              Scroll to explore
            </a>
          </div>
        </div>
        <span className="absolute right-5 top-28 hidden font-mono text-[11px] uppercase tracking-[0.13em] text-foreground/50 [writing-mode:vertical-rl] md:block">
          Technology · Intelligence · Execution
        </span>
      </section>

      {/* PROBLEMS */}
      <section id="problems" className="scroll-mt-20 bg-background py-24 md:py-36">
        <div className="mx-auto max-w-[1440px] px-5 md:px-10 xl:px-16">
          <div className="grid grid-cols-12 gap-y-10 md:gap-8">
            <div className="reveal col-span-12 md:col-span-5">
              <Eyebrow>THE OPERATIONAL COST</Eyebrow>
              <h2 className="mt-6 max-w-[540px] font-display text-4xl font-semibold leading-[1.08] md:text-5xl">
                Your business shouldn’t depend on{" "}
                <span className="text-muted-foreground">workarounds.</span>
              </h2>
            </div>
            <div className="col-span-12 flex flex-col md:col-span-7">
              {challenges.map((item) => {
                const Icon = item.icon;
                return (
                  <article
                    key={item.number}
                    className="reveal grid grid-cols-[44px_1fr_auto] items-start gap-4 border-t border-border py-6 md:grid-cols-[56px_1fr_44px] md:gap-7 md:py-8"
                  >
                    <span className="pt-1 font-mono text-xs text-amber">{item.number}</span>
                    <div>
                      <h3 className="font-display text-xl font-semibold md:text-2xl">
                        {item.title}
                      </h3>
                      <p className="mt-2 max-w-[490px] text-sm leading-6 text-muted-foreground">
                        {item.text}
                      </p>
                    </div>
                    <Icon aria-hidden="true" className="mt-1 size-5 text-muted-foreground" />
                  </article>
                );
              })}
              <div className="border-t border-border" />
            </div>
          </div>
        </div>
      </section>

      {/* APPROACH */}
      <section
        id="approach"
        className="scroll-mt-20 border-y border-border bg-surface py-24 md:py-32"
      >
        <div className="mx-auto max-w-[1440px] px-5 md:px-10 xl:px-16">
          <div className="mb-14 grid grid-cols-12 gap-x-0 gap-y-8 md:gap-x-8 md:mb-20">
            <div className="reveal col-span-12 md:col-span-7">
              <Eyebrow>THE HOOZE APPROACH</Eyebrow>
              <h2 className="mt-6 max-w-[700px] font-display text-4xl font-semibold leading-[1.04] md:text-6xl">
                Not everything needs AI. Everything needs the right solution.
              </h2>
            </div>
            <p className="reveal col-span-12 self-end text-sm leading-6 text-muted-foreground md:col-span-4 md:col-start-9">
              We start with the problem, then choose the right answer: software, intelligence,
              automation, or a simpler way forward.
            </p>
          </div>
          <div className="grid grid-cols-1 border-l border-t border-border md:grid-cols-3">
            {approach.map((item) => {
              const Icon = item.icon;
              return (
                <article
                  key={item.number}
                  className="reveal group relative flex min-h-[260px] flex-col justify-between border-b border-r border-border p-6 transition-colors hover:bg-surface-raised md:min-h-[310px] md:p-8"
                >
                  <div className="flex items-center justify-between">
                    <Eyebrow>{item.number}</Eyebrow>
                    <Icon
                      aria-hidden="true"
                      className="size-5 text-amber transition-transform duration-300 group-hover:-translate-y-1"
                    />
                  </div>
                  <div>
                    <h3 className="font-display text-2xl font-semibold md:text-3xl">
                      {item.title}
                    </h3>
                    <p className="mt-3 max-w-[340px] text-sm leading-6 text-muted-foreground">
                      {item.text}
                    </p>
                  </div>
                  <span className="absolute bottom-0 left-0 h-px w-0 bg-amber transition-all duration-500 group-hover:w-full" />
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* HOOZE AI */}
      <section id="hooze-ai" className="scroll-mt-20 py-24 md:py-36">
        <div className="mx-auto max-w-[1440px] px-5 md:px-10 xl:px-16">
          <div className="grid grid-cols-12 items-end gap-x-0 gap-y-8 md:gap-x-8">
            <div className="reveal col-span-12 md:col-span-7">
              <Eyebrow>THE FLAGSHIP PRODUCT</Eyebrow>
              <h2 className="mt-6 max-w-[760px] font-display text-4xl font-semibold leading-[1.02] md:text-6xl">
                Turn business conversations into <span className="text-amber">opportunities.</span>
              </h2>
            </div>
            <p className="reveal col-span-12 text-sm leading-6 text-muted-foreground md:col-span-4 md:col-start-9">
              Hooze AI helps WhatsApp-first businesses manage customer conversations, qualify
              enquiries and keep follow-ups moving through intelligent sales workflows.
            </p>
          </div>
          <div className="reveal mt-14 md:mt-20">
            <HoozeAiWalkthrough />
          </div>
          <div className="reveal mt-8 flex flex-wrap items-center justify-between gap-5">
            <p className="max-w-[560px] text-sm leading-6 text-muted-foreground">
              Shown here for a property business, where Hooze AI is deployed today. It can be
              configured for other WhatsApp-first businesses.
            </p>
            <div className="flex flex-wrap gap-x-7 gap-y-2">
              <ArrowLink href={siteConfig.productUrl} event="cta_explore_hooze_ai">
                Discover Hooze AI
              </ArrowLink>
              <ArrowLink to={caseStudyPath} event="cta_case_study">
                See it in a real deployment
              </ArrowLink>
            </div>
          </div>
        </div>
      </section>

      {/* PROVEN WORK */}
      <section id="work" className="scroll-mt-20 border-y border-border bg-surface py-24 md:py-36">
        <div className="mx-auto max-w-[1440px] px-5 md:px-10 xl:px-16">
          <div className="grid grid-cols-12 items-end gap-x-0 gap-y-8 md:gap-x-8">
            <div className="reveal col-span-12 md:col-span-7">
              <Eyebrow>PROVEN WORK</Eyebrow>
              <h2 className="mt-6 font-display text-4xl font-semibold md:text-6xl">
                Built and deployed, not just designed.
              </h2>
            </div>
            <p className="reveal col-span-12 text-sm leading-6 text-muted-foreground md:col-span-4 md:col-start-9">
              A production deployment, described with real context and honest figures.
            </p>
          </div>
          <article className="reveal mt-12 grid border border-border bg-background md:mt-16 md:grid-cols-12">
            <div className="case-study-visual relative flex min-h-[300px] flex-col justify-between overflow-hidden p-6 md:col-span-5 md:min-h-[420px] md:p-9">
              <div className="flex items-center justify-between">
                <Eyebrow>PRODUCTION DEPLOYMENT</Eyebrow>
                <span className="font-mono text-[11px] text-muted-foreground">REAL ESTATE</span>
              </div>
              <dl className="my-8 grid grid-cols-2 gap-4">
                <div className="border border-border bg-background/80 p-4">
                  <dd className="font-display text-4xl font-semibold text-amber">
                    {siteConfig.caseStudy.leads}
                  </dd>
                  <dt className="mt-2 font-mono text-[11px] uppercase tracking-[0.1em] text-muted-foreground">
                    Leads in working dataset
                  </dt>
                </div>
                <div className="border border-border bg-background/80 p-4">
                  <dd className="font-display text-4xl font-semibold text-amber">
                    {siteConfig.caseStudy.messages}
                  </dd>
                  <dt className="mt-2 font-mono text-[11px] uppercase tracking-[0.1em] text-muted-foreground">
                    Messages processed
                  </dt>
                </div>
              </dl>
              <span className="font-mono text-[11px] uppercase tracking-[0.13em] text-muted-foreground">
                {siteConfig.caseStudy.client} · {siteConfig.caseStudy.place} ·{" "}
                {siteConfig.caseStudy.year}
              </span>
            </div>
            <div className="flex flex-col justify-center p-6 md:col-span-7 md:p-10 xl:p-14">
              <Eyebrow>CONVERSATIONAL SALES SYSTEM</Eyebrow>
              <h3 className="mt-5 max-w-[620px] font-display text-3xl font-semibold leading-tight md:text-4xl">
                Turning WhatsApp enquiries into an organised, visible sales process.
              </h3>
              <p className="mt-5 max-w-[590px] text-sm leading-6 text-muted-foreground">
                A conversational sales system with lead qualification, conversation memory, property
                retrieval, follow-up, escalation and human handoff, running for{" "}
                {siteConfig.caseStudy.client}.
              </p>
              <p className="mt-6 max-w-[560px] text-xs leading-5 text-muted-foreground">
                Figures describe the system’s working dataset. They are not a claim of revenue or
                business impact.
              </p>
              <div className="mt-7">
                <ArrowLink to={caseStudyPath} event="cta_case_study">
                  Read the case study
                </ArrowLink>
              </div>
            </div>
          </article>
        </div>
      </section>

      {/* ENGINEERING */}
      <section id="engineering" className="scroll-mt-20 py-24 md:py-32">
        <div className="mx-auto max-w-[1440px] px-5 md:px-10 xl:px-16">
          <div className="mb-14 grid grid-cols-12 items-end gap-x-0 gap-y-8 md:gap-x-8 md:mb-16">
            <div className="reveal col-span-12 md:col-span-7">
              <Eyebrow>CUSTOM ENGINEERING</Eyebrow>
              <h2 className="mt-6 max-w-[700px] font-display text-4xl font-semibold leading-[1.05] md:text-5xl">
                When off-the-shelf solutions aren’t enough.
              </h2>
            </div>
            <div className="reveal col-span-12 md:col-span-4 md:col-start-9">
              <p className="text-sm leading-6 text-muted-foreground">
                Beyond Hooze AI, we build AI applications, automation and software around how your
                business actually works.
              </p>
            </div>
          </div>
          <div className="grid grid-cols-1 border-l border-t border-border md:grid-cols-2">
            {services.map((service) => {
              const Icon = service.icon;
              return (
                <article
                  key={service.title}
                  className="reveal flex flex-col border-b border-r border-border p-6 md:p-8"
                >
                  <Icon aria-hidden="true" className="size-5 text-amber" />
                  <h3 className="mt-5 font-display text-xl font-semibold md:text-2xl">
                    {service.title}
                  </h3>
                  <p className="mt-3 max-w-[460px] text-sm leading-6 text-muted-foreground">
                    {service.text}
                  </p>
                  <p className="mt-4 text-xs leading-5 text-foreground/80">
                    <span className="font-mono uppercase tracking-[0.1em] text-muted-foreground">
                      Good for:{" "}
                    </span>
                    {service.fit}
                  </p>
                  <Link
                    to="/start-a-project"
                    search={{ topic: service.topic }}
                    onClick={() =>
                      track("cta_custom_project", { location: "service", topic: service.topic })
                    }
                    className="mt-auto inline-flex min-h-11 items-center gap-2 pt-5 text-xs font-medium text-amber"
                  >
                    Discuss this project <ArrowUpRight aria-hidden="true" className="size-3.5" />
                  </Link>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* INDUSTRIES */}
      <section
        id="industries"
        className="scroll-mt-20 border-y border-border bg-surface py-24 md:py-36"
      >
        <div className="mx-auto max-w-[1440px] px-5 md:px-10 xl:px-16">
          <div className="mb-12 grid grid-cols-12 items-end gap-x-0 gap-y-8 md:gap-x-8 md:mb-16">
            <div className="reveal col-span-12 md:col-span-7">
              <Eyebrow>WHO WE WORK WITH</Eyebrow>
              <h2 className="mt-6 max-w-[700px] font-display text-4xl font-semibold md:text-6xl">
                Designed around the way your business works.
              </h2>
            </div>
            <p className="reveal col-span-12 text-sm leading-6 text-muted-foreground md:col-span-4 md:col-start-9">
              Hooze AI is deployed in real estate today. The other sectors show where the same
              approach fits.
            </p>
          </div>
          <div className="grid grid-cols-1 border-l border-t border-border sm:grid-cols-2 xl:grid-cols-4">
            {industries.map((industry, index) => (
              <article
                key={industry.title}
                className="reveal group flex flex-col border-b border-r border-border bg-background"
              >
                <div className="relative aspect-[1.55] overflow-hidden bg-surface">
                  {industry.image ? (
                    <img
                      src={industry.image}
                      alt={industry.alt}
                      width={960}
                      height={684}
                      loading="lazy"
                      decoding="async"
                      className="size-full object-cover transition-transform duration-700 group-hover:scale-[1.035]"
                    />
                  ) : (
                    <div className="case-study-visual flex size-full items-center justify-center">
                      <ShoppingBag
                        aria-hidden="true"
                        className="size-12 text-amber/80"
                        strokeWidth={1.25}
                      />
                    </div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-background/65 via-transparent to-transparent" />
                  <span className="absolute bottom-4 left-4 font-mono text-[11px] uppercase tracking-[0.12em] text-foreground/90">
                    0{index + 1} / {industry.category}
                  </span>
                </div>
                <div className="flex flex-1 flex-col p-5 md:p-6">
                  <div className="flex items-start justify-between gap-3">
                    <h3 className="font-display text-xl font-semibold">{industry.title}</h3>
                    {industry.deployed && (
                      <span className="mt-1 shrink-0 border border-amber/50 px-2 py-0.5 font-mono text-[10px] uppercase tracking-[0.1em] text-amber">
                        Live
                      </span>
                    )}
                  </div>
                  <p className="mt-4 text-sm leading-6 text-muted-foreground">
                    {industry.challenge}
                  </p>
                  <p className="mt-3 text-sm leading-6 text-foreground/85">{industry.solution}</p>
                  <a
                    href={siteConfig.productUrl}
                    target="_blank"
                    rel="noreferrer"
                    onClick={() =>
                      track("cta_explore_hooze_ai", {
                        location: "industry",
                        industry: industry.title,
                      })
                    }
                    className="mt-auto inline-flex min-h-11 items-center gap-2 pt-4 text-xs font-medium text-amber"
                  >
                    Explore Hooze AI{" "}
                    <ArrowUpRight
                      aria-hidden="true"
                      className="size-3.5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                    />
                  </a>
                </div>
              </article>
            ))}
          </div>
          <p className="reveal mt-8 text-sm text-muted-foreground">
            Also through custom engineering:{" "}
            <span className="text-foreground/85">{additionalSectors}.</span>
          </p>
        </div>
      </section>

      {/* HOW WE WORK */}
      <section id="process" className="scroll-mt-20 py-24 md:py-32">
        <div className="mx-auto max-w-[1440px] px-5 md:px-10 xl:px-16">
          <div className="grid grid-cols-12 gap-x-0 gap-y-8 md:gap-x-8">
            <div className="reveal col-span-12 md:col-span-5">
              <Eyebrow>HOW WE WORK</Eyebrow>
              <h2 className="mt-6 max-w-[540px] font-display text-4xl font-semibold leading-[1.05] md:text-5xl">
                A clear path from first conversation to working system.
              </h2>
              <div className="mt-8">
                <Button asChild className="h-11 rounded-sm px-5">
                  <Link
                    to="/start-a-project"
                    onClick={() => track("cta_custom_project", { location: "process" })}
                  >
                    Start a project <ArrowUpRight aria-hidden="true" />
                  </Link>
                </Button>
              </div>
            </div>
            <ol className="col-span-12 md:col-span-6 md:col-start-7">
              {engagementSteps.map((step) => (
                <li
                  key={step.number}
                  className="reveal grid grid-cols-[48px_1fr] gap-4 border-t border-border py-6 md:grid-cols-[64px_1fr] md:gap-6 md:py-7"
                >
                  <span className="flex size-10 items-center justify-center border border-amber/50 font-mono text-[11px] text-amber md:size-12">
                    {step.number}
                  </span>
                  <div>
                    <h3 className="font-display text-lg font-semibold md:text-xl">{step.title}</h3>
                    <p className="mt-2 max-w-[440px] text-sm leading-6 text-muted-foreground">
                      {step.text}
                    </p>
                  </div>
                </li>
              ))}
              <li aria-hidden="true" className="border-t border-border" />
            </ol>
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section
        id="about"
        className="scroll-mt-20 relative overflow-hidden border-y border-border bg-surface py-24 md:py-36"
      >
        <div
          aria-hidden="true"
          className="pointer-events-none absolute right-[-8%] top-1/2 -translate-y-1/2 font-display text-[clamp(12rem,28vw,32rem)] font-black leading-none text-foreground/[0.025]"
        >
          1%
        </div>
        <div className="relative mx-auto grid max-w-[1440px] grid-cols-12 gap-x-0 gap-y-8 md:gap-x-8 px-5 md:px-10 xl:px-16">
          <div className="reveal col-span-12 md:col-span-7">
            <Eyebrow>THE COMPANY</Eyebrow>
            <h2 className="mt-7 max-w-[700px] font-display text-4xl font-semibold leading-[1.05] md:text-6xl">
              We don’t build for the <span className="text-amber">ordinary.</span>
            </h2>
            <p className="mt-8 max-w-[580px] text-base leading-7 text-foreground/80">
              Hooze Enterprises builds technology that moves businesses forward. We combine
              engineering discipline, intelligent systems and a commitment to execution, and we only
              recommend AI where it genuinely helps.
            </p>
            <div className="mt-8">
              <ArrowLink to="/about">About Hooze and its founder</ArrowLink>
            </div>
          </div>
          <div className="reveal col-span-12 flex flex-col justify-between border-t border-border pt-6 md:col-span-3 md:col-start-10 md:border-l md:border-t-0 md:pl-7 md:pt-0">
            <div>
              <Eyebrow>OUR POSITION</Eyebrow>
              <p className="mt-4 font-display text-2xl font-semibold leading-tight">
                Not everything needs AI.
              </p>
              <p className="mt-3 font-display text-2xl font-semibold leading-tight text-muted-foreground">
                Everything needs the right solution.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* GUIDE */}
      <section id="guide" className="scroll-mt-20 py-20 md:py-28">
        <div className="mx-auto grid max-w-[1440px] grid-cols-12 gap-x-0 gap-y-10 md:gap-x-10 px-5 md:px-10 xl:px-16">
          <div className="reveal col-span-12 self-center md:col-span-5">
            <Eyebrow>FREE GUIDE</Eyebrow>
            <h2 className="mt-6 max-w-[620px] font-display text-4xl font-semibold leading-[1.04] md:text-5xl">
              Find the work worth <span className="text-amber">automating.</span>
            </h2>
            <p className="mt-6 max-w-[520px] text-sm leading-6 text-muted-foreground">
              {siteConfig.guide.title}: a practical 20-minute guide to spotting repetitive work,
              mapping one process and choosing a sensible next step, before you buy software.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-4 text-xs text-muted-foreground">
              <span className="inline-flex items-center gap-2">
                <FileText aria-hidden="true" className="size-4 text-amber" />
                {siteConfig.guide.pages}-page PDF
              </span>
              <span aria-hidden="true" className="h-4 w-px bg-border" />
              <span>Free · No purchase required</span>
            </div>
          </div>
          <div className="reveal col-span-12 border border-border bg-surface p-5 md:col-span-6 md:col-start-7 md:p-8">
            <GuideForm />
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section id="contact" className="scroll-mt-20 border-t border-border py-24 md:py-36">
        <div className="mx-auto max-w-[1440px] px-5 md:px-10 xl:px-16">
          <div className="reveal flex flex-col justify-between gap-10 border-b border-border pb-12 md:flex-row md:items-end md:pb-16">
            <div>
              <Eyebrow>YOUR NEXT MOVE</Eyebrow>
              <h2 className="mt-6 font-display text-5xl font-semibold leading-[0.98] md:text-7xl">
                Let’s build
                <br />
                what comes next.
              </h2>
            </div>
            <p className="max-w-[410px] text-sm leading-6 text-muted-foreground">
              Two ways to start, depending on what you need.
            </p>
          </div>
          <div className="grid grid-cols-1 border-l border-border md:grid-cols-2">
            <a
              href={siteConfig.productUrl}
              target="_blank"
              rel="noreferrer"
              onClick={() => track("cta_explore_hooze_ai", { location: "final" })}
              className="group flex min-h-[220px] flex-col justify-between border-b border-r border-border p-6 transition-colors hover:bg-surface md:min-h-[260px] md:p-8"
            >
              <div className="flex items-center justify-between">
                <Eyebrow>PATH A · HOOZE AI</Eyebrow>
                <ArrowUpRight
                  aria-hidden="true"
                  className="size-5 text-amber transition-transform group-hover:-translate-y-1 group-hover:translate-x-1"
                />
              </div>
              <div>
                <h3 className="font-display text-2xl font-semibold">
                  Improve how your business handles customer conversations.
                </h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  Explore the product and see whether it fits your business.
                </p>
              </div>
            </a>
            <Link
              to="/start-a-project"
              onClick={() => track("cta_custom_project", { location: "final" })}
              className="group flex min-h-[220px] flex-col justify-between border-b border-r border-border p-6 transition-colors hover:bg-surface md:min-h-[260px] md:p-8"
            >
              <div className="flex items-center justify-between">
                <Eyebrow>PATH B · CUSTOM ENGINEERING</Eyebrow>
                <ArrowUpRight
                  aria-hidden="true"
                  className="size-5 text-amber transition-transform group-hover:-translate-y-1 group-hover:translate-x-1"
                />
              </div>
              <div>
                <h3 className="font-display text-2xl font-semibold">
                  Have a business problem that needs a technical solution?
                </h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  Tell us what you need to build or automate.
                </p>
              </div>
            </Link>
          </div>
          <div className="mt-8 flex flex-col justify-between gap-5 border-b border-border pb-8 sm:flex-row sm:items-center">
            <p className="text-sm text-muted-foreground">
              Prefer a conversation before anything else?
            </p>
            <div className="flex flex-wrap gap-x-7 gap-y-2">
              <a
                href={whatsappUrl("Hello Hooze, I'd like to talk about a project.")}
                target="_blank"
                rel="noreferrer"
                onClick={() => track("contact_whatsapp", { location: "final" })}
                className="inline-flex min-h-11 items-center gap-2 text-xs font-medium transition-colors hover:text-amber"
              >
                <MessageCircle aria-hidden="true" className="size-4 text-amber" />
                WhatsApp Hooze
              </a>
              <a
                href={mailtoUrl("Enquiry for Hooze Enterprises")}
                onClick={() => track("contact_email", { location: "final" })}
                className="inline-flex min-h-11 items-center gap-2 text-xs font-medium transition-colors hover:text-amber"
              >
                {siteConfig.contact.email} <ArrowUpRight aria-hidden="true" className="size-3.5" />
              </a>
            </div>
          </div>
        </div>
      </section>
    </PageShellHome>
  );
}
