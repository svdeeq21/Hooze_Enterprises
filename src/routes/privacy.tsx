import { createFileRoute } from "@tanstack/react-router";
import { seo } from "@/lib/seo";

export const Route = createFileRoute("/privacy")({
  head: () =>
    seo({
      title: "Privacy Policy — Hooze Enterprises",
      description:
        "How Hooze Enterprises collects, uses and protects information submitted through this website.",
      path: "/privacy",
    }),
  component: Privacy,
});

function Privacy() {
  return (
    <Legal title="Privacy policy" updated="16 September 2026">
      <p>
        <em>
          This policy is a first-pass draft describing the data this website actually collects. It
          is not legal advice and has not received final legal or regulatory compliance review.
        </em>
      </p>

      <h2>Information we collect</h2>
      <p>
        Depending on which form you use, we collect: your name, email address, and optionally your
        WhatsApp number, business name and business type; the details of a project enquiry (project
        type, description of the problem, current tools, budget range and timeline); or a request
        for a free resource (an optional note about your biggest operational challenge). We also
        process limited technical data — an IP-derived fingerprint and campaign parameters (such as
        which link or search brought you here) — to protect the forms from abuse and to understand
        which channels are useful, without collecting more than that.
      </p>

      <h2>The three kinds of consent we track separately</h2>
      <p>We do not treat one consent as covering everything. Specifically:</p>
      <ul>
        <li>
          <strong>Enquiry response consent</strong> — given when you submit a project enquiry,
          covering our use of your details to respond to that enquiry.
        </li>
        <li>
          <strong>Resource delivery consent</strong> — given when you request a free resource,
          covering delivery of that resource to your email.
        </li>
        <li>
          <strong>Marketing subscription consent</strong> — a separate, optional checkbox for
          occasional emails about automation and business systems. You can decline this while still
          receiving an enquiry response or a requested resource, and you can withdraw it at any time
          by emailing us.
        </li>
      </ul>

      <h2>How we use information</h2>
      <p>
        We use your information to review and respond to your enquiry or request, manage the
        resulting business relationship, secure our service against spam and abuse, and — only where
        you have separately opted in — send occasional marketing emails. We do not sell personal
        information.
      </p>

      <h2>Email delivery</h2>
      <p>
        Emails referenced above (enquiry confirmations, internal notifications, and resource
        delivery) are sent through our Gmail account via SMTP. We keep a record of whether an
        email was sent successfully so we can follow up manually if it was not.
      </p>

      <h2>Storage and access</h2>
      <p>
        Information is stored in an access-controlled Supabase database. There is no public read or
        write access to this data from the website — every save and every admin lookup goes through
        a server-side function, and admin access is limited to a small, explicitly allowlisted set
        of Hooze accounts. We retain information only as long as reasonably necessary for these
        purposes.
      </p>

      <h2>Analytics</h2>
      <p>
        We record a small number of first-party, privacy-conscious events (for example, that a form
        was started or submitted, or that a WhatsApp link was clicked) together with campaign
        attribution such as UTM parameters and referrer. These events are tied to an anonymous
        per-browser-session identifier, not to your name or email, and we do not use third-party
        advertising analytics.
      </p>

      <h2>Your choices</h2>
      <p>
        You may ask to access, correct, delete your information, or withdraw marketing consent at
        any time by emailing hoozeenterprises@gmail.com. Some records may be retained where required
        for security or legal reasons.
      </p>

      <h2>Contact</h2>
      <p>
        Questions about this policy may be sent to hoozeenterprises@gmail.com. Hooze Enterprises
        operates from Nigeria.
      </p>
    </Legal>
  );
}

function Legal({
  title,
  updated,
  children,
}: {
  title: string;
  updated: string;
  children: React.ReactNode;
}) {
  return (
    <article className="gutter mx-auto max-w-4xl pb-24 pt-28">
      <p className="mono-label">Last updated · {updated}</p>
      <h1 className="display mt-7 text-[clamp(2.5rem,7vw,5rem)]">{title}</h1>
      <div className="mt-14 space-y-5 text-muted-foreground [&_h2]:display [&_h2]:pt-8 [&_h2]:text-2xl [&_p]:leading-relaxed [&_ul]:list-disc [&_ul]:space-y-2 [&_ul]:pl-6 [&_li]:leading-relaxed">
        {children}
      </div>
    </article>
  );
}
