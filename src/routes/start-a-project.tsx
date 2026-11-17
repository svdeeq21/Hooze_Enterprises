import { createFileRoute } from "@tanstack/react-router";
import { MessageCircle, Mail } from "lucide-react";
import { PageShell } from "@/components/site/PageShell";
import { ProjectEnquiryForm } from "@/components/site/ProjectEnquiryForm";
import { Eyebrow } from "@/components/site/primitives";
import { track } from "@/lib/analytics";
import { seo } from "@/lib/seo";
import { mailtoUrl, siteConfig, whatsappUrl } from "@/lib/site-config";

export const Route = createFileRoute("/start-a-project")({
  validateSearch: (search: Record<string, unknown>): { topic?: string } =>
    typeof search["topic"] === "string" ? { topic: search["topic"] } : {},
  head: () =>
    seo({
      title: "Start a project | Hooze Enterprises",
      description:
        "Tell Hooze Enterprises what you need to build or automate. A short form, and a reply from a real person.",
      path: "/start-a-project",
    }),
  component: StartAProject,
});

function StartAProject() {
  const { topic } = Route.useSearch();
  return (
    <PageShell>
      <section className="py-16 md:py-24">
        <div className="mx-auto grid max-w-[1440px] grid-cols-12 gap-x-0 gap-y-10 md:gap-x-10 px-5 md:px-10 xl:px-16">
          <div className="col-span-12 md:col-span-5">
            <Eyebrow>CUSTOM ENGINEERING</Eyebrow>
            <h1 className="mt-6 max-w-[560px] font-display text-4xl font-semibold leading-[1.05] md:text-6xl">
              Have a business problem that needs a{" "}
              <span className="text-amber">technical solution?</span>
            </h1>
            <p className="mt-6 max-w-[460px] text-sm leading-6 text-muted-foreground">
              Tell us what you need to build or automate. You don’t need technical language or a
              finished brief. We’ll read it, reply, and suggest a sensible next step, even if that
              step is “you don’t need software for this.”
            </p>
            <div className="mt-10 border-t border-border pt-6">
              <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-muted-foreground">
                PREFER TO TALK?
              </p>
              <div className="mt-4 flex flex-col gap-1">
                <a
                  href={whatsappUrl("Hello Hooze, I'd like to talk about a project.")}
                  target="_blank"
                  rel="noreferrer"
                  onClick={() => track("contact_whatsapp", { location: "start-a-project" })}
                  className="inline-flex min-h-11 items-center gap-3 text-sm transition-colors hover:text-amber"
                >
                  <MessageCircle aria-hidden="true" className="size-4 text-amber" />
                  WhatsApp Hooze
                </a>
                <a
                  href={mailtoUrl("Project enquiry for Hooze Enterprises")}
                  onClick={() => track("contact_email", { location: "start-a-project" })}
                  className="inline-flex min-h-11 items-center gap-3 break-all text-sm transition-colors hover:text-amber"
                >
                  <Mail aria-hidden="true" className="size-4 shrink-0 text-amber" />
                  {siteConfig.contact.email}
                </a>
              </div>
            </div>
          </div>
          <div className="col-span-12 border border-border bg-surface p-5 md:col-span-6 md:col-start-7 md:p-8">
            <ProjectEnquiryForm initialTopic={topic} />
          </div>
        </div>
      </section>
    </PageShell>
  );
}
