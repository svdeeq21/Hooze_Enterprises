import { createFileRoute } from "@tanstack/react-router";
import { PageShell } from "@/components/site/PageShell";
import { Eyebrow } from "@/components/site/primitives";
import { seo } from "@/lib/seo";
import { mailtoUrl, siteConfig } from "@/lib/site-config";

export const Route = createFileRoute("/privacy")({
  head: () =>
    seo({
      title: "Privacy policy | Hooze Enterprises",
      description:
        "How Hooze Enterprises collects, uses and protects the personal information you share on this website.",
      path: "/privacy",
    }),
  component: Privacy,
});

// DRAFT: written to match what the site actually does today. Have it reviewed (including
// against the Nigeria Data Protection Act 2023) and update the date below when you change it.
const updated = "16 November 2026";

function Privacy() {
  return (
    <PageShell>
      <article className="mx-auto max-w-[780px] px-5 py-16 md:px-10 md:py-24">
        <Eyebrow>LEGAL</Eyebrow>
        <h1 className="mt-6 font-display text-4xl font-semibold md:text-5xl">Privacy policy</h1>
        <p className="mt-4 text-sm text-muted-foreground">Last updated {updated}</p>
        <div className="mt-10 space-y-8 text-sm leading-7 text-foreground/85 [&_h2]:mb-2 [&_h2]:font-display [&_h2]:text-xl [&_h2]:font-semibold [&_h2]:text-foreground [&_ul]:mt-2 [&_ul]:list-disc [&_ul]:space-y-1 [&_ul]:pl-5">
          <section>
            <h2>Who we are</h2>
            <p>
              {siteConfig.name} (“Hooze”, “we”) is a technology company based in Nigeria. This
              policy covers personal information collected through this website. For anything in it,
              contact us at{" "}
              <a
                className="text-amber underline underline-offset-2"
                href={mailtoUrl("Privacy request")}
              >
                {siteConfig.contact.email}
              </a>
              .
            </p>
          </section>
          <section>
            <h2>What we collect, and why</h2>
            <ul>
              <li>
                <strong>Free guide form:</strong> your name and email address, plus whether you
                chose to receive occasional tips from us. We use these to provide the guide and keep
                a record of who requested it.
              </li>
              <li>
                <strong>Project enquiry form:</strong> your name, email, business name (optional),
                what you need help with, your description, your preferred contact method and, if you
                choose, a phone number. We use these only to reply to your enquiry.
              </li>
              <li>
                <strong>Messages you send us</strong> by WhatsApp or email, which we use to respond
                to you.
              </li>
            </ul>
            <p className="mt-3">
              We don’t sell your information. We only send marketing messages to people who ticked
              the optional tips box, and you can tell us to stop at any time.
            </p>
          </section>
          <section>
            <h2>Where it’s stored and who can see it</h2>
            <p>
              Form submissions are stored in a database operated for us by a hosting provider.
              Access is restricted to authorised Hooze staff, and the data can’t be read from your
              browser. We may use email and hosting providers to run the website and notify us of
              new enquiries; they process information only on our behalf.
            </p>
          </section>
          <section>
            <h2>How long we keep it</h2>
            <p>
              We keep information only as long as it’s needed for the purpose it was collected for,
              then delete it. You can ask us to delete it sooner.
            </p>
          </section>
          <section>
            <h2>Your choices and rights</h2>
            <p>
              You can ask us to show you the information we hold about you, correct it, delete it,
              or stop sending you marketing. Email us and we’ll respond. If you believe we have
              handled your information improperly, you may also complain to the Nigeria Data
              Protection Commission.
            </p>
          </section>
          <section>
            <h2>Cookies and analytics</h2>
            <p>
              This website doesn’t set advertising cookies. If we add privacy-friendly analytics in
              future we’ll update this page.
            </p>
          </section>
          <section>
            <h2>Changes</h2>
            <p>If we change this policy we’ll update the date above.</p>
          </section>
        </div>
      </article>
    </PageShell>
  );
}
