import { createFileRoute } from "@tanstack/react-router";
import { seo } from "@/lib/seo";

export const Route = createFileRoute("/terms")({
  head: () =>
    seo({
      title: "Website Terms — Hooze Enterprises",
      description:
        "Terms governing use of the Hooze Enterprises website and project enquiry service.",
      path: "/terms",
    }),
  component: Terms,
});

function Terms() {
  return (
    <article className="gutter mx-auto max-w-4xl pb-24 pt-28">
      <p className="mono-label">Last updated · 16 September 2026</p>
      <h1 className="display mt-7 text-[clamp(2.5rem,7vw,5rem)]">Website terms</h1>
      <div className="mt-14 space-y-5 text-muted-foreground [&_h2]:display [&_h2]:pt-8 [&_h2]:text-2xl [&_p]:leading-relaxed">
        <h2>Using this website</h2>
        <p>
          You may use this website to learn about Hooze Enterprises, submit legitimate business
          enquiries, and request the free resources offered here. You must not attempt to disrupt,
          misuse or gain unauthorised access to the website, its forms, or its administrative
          systems.
        </p>
        <h2>Project enquiries and resource requests</h2>
        <p>
          Submitting an enquiry or requesting a free resource does not create a client relationship,
          guarantee availability, or constitute an offer. Any project will be governed by a separate
          written agreement covering scope, fees, responsibilities and intellectual property. The
          free resources offered on this site are provided for general informational purposes and
          are not a substitute for advice specific to your business.
        </p>
        <h2>Information and portfolio</h2>
        <p>
          We aim to keep website information accurate. Product status and illustrative visuals are
          labelled where relevant. Website content is provided for general information and is not a
          guarantee of a particular business result.
        </p>
        <h2>Intellectual property</h2>
        <p>
          Unless otherwise stated, Hooze owns the website design, copy and materials, including the
          Business Automation Starter Kit. Client names and marks remain the property of their
          respective owners.
        </p>
        <h2>Contact</h2>
        <p>
          Questions about these terms may be sent to hoozeenterprises@gmail.com. These terms are
          governed by the laws applicable in Nigeria.
        </p>
      </div>
    </article>
  );
}
