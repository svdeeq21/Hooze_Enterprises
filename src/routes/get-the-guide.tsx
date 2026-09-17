import { createFileRoute } from "@tanstack/react-router";
import { useRef, useState, type FormEvent } from "react";
import { ArrowRight, CheckCircle2, Download } from "lucide-react";
import { submitResourceRequest } from "@/lib/resources.functions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { getSubmissionAttribution } from "@/lib/attribution";
import { track } from "@/lib/track";
import { seo } from "@/lib/seo";

export const Route = createFileRoute("/get-the-guide")({
  head: () =>
    seo({
      title: "Free Business Automation Starter Kit — Hooze Enterprises",
      description:
        "A free, practical guide to spotting repetitive work in your business, auditing one process, and knowing what to ask before buying any automation tool.",
      path: "/get-the-guide",
    }),
  component: GetTheGuidePage,
});

const field = "mt-2 h-12 rounded-none bg-secondary/30 px-4";
const CONTENTS = [
  "How to identify repetitive business work",
  "A process audit worksheet",
  "Common tasks that may be automated",
  "Customer enquiry and follow-up checklist",
  "Questions to ask before buying automation",
  "Practical next steps",
];

function GetTheGuidePage() {
  const [state, setState] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [error, setError] = useState("");
  const [downloadUrl, setDownloadUrl] = useState("");
  const started = useRef(false);

  function handleFirstInteraction() {
    if (started.current) return;
    started.current = true;
    track("resource_form_started");
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setState("sending");
    setError("");
    const form = new FormData(event.currentTarget);
    const attribution = getSubmissionAttribution();
    try {
      const result = await submitResourceRequest({
        data: {
          name: String(form.get("name")),
          email: String(form.get("email")),
          businessName: String(form.get("businessName") ?? ""),
          businessType: String(form.get("businessType") ?? ""),
          businessChallenge: String(form.get("businessChallenge") ?? ""),
          resourceConsent: form.get("resourceConsent") === "on" ? true : (undefined as never),
          marketingConsent: form.get("marketingConsent") === "on",
          website: String(form.get("website") ?? ""),
          utmSource: attribution.utmSource,
          utmMedium: attribution.utmMedium,
          utmCampaign: attribution.utmCampaign,
          utmContent: attribution.utmContent,
          landingPage: attribution.landingPage,
          referrer: attribution.referrer,
        },
      });
      setDownloadUrl(result.downloadUrl);
      setState("sent");
      track("resource_form_submitted");
    } catch (cause) {
      setError(
        cause instanceof Error
          ? cause.message
          : "We could not save your request. Please try again.",
      );
      setState("error");
    }
  }

  return (
    <section className="gutter pb-24 pt-28">
      <div className="grid gap-16 lg:grid-cols-[.9fr_1.1fr]">
        <div>
          <p className="mono-label text-signal">Free resource</p>
          <h1 className="display mt-7 text-[clamp(2.4rem,6.5vw,4.75rem)]">
            The Business Automation <span className="text-signal">Starter Kit.</span>
          </h1>
          <p className="mt-7 max-w-lg text-lg leading-relaxed text-muted-foreground">
            A short, practical guide for business owners who want to find repetitive work, missed
            follow-ups and manual processes worth fixing — whether or not you ever work with Hooze.
          </p>
          <ul className="mt-10 space-y-3">
            {CONTENTS.map((item) => (
              <li key={item} className="flex gap-3 text-sm text-muted-foreground">
                <span className="mono-label text-signal">—</span>
                {item}
              </li>
            ))}
          </ul>
        </div>
        {state === "sent" ? (
          <div className="flex min-h-[380px] flex-col justify-center border border-hairline p-8">
            <CheckCircle2 className="size-10 text-signal" />
            <h2 className="display mt-8 text-4xl">It's ready.</h2>
            <p className="mt-5 max-w-md leading-relaxed text-muted-foreground">
              A copy is on its way to your inbox. You can also download it directly below.
            </p>
            <p className="mt-3 max-w-md text-sm leading-relaxed text-muted-foreground">
              Don't see it within a few minutes? Check your spam or promotions folder — and mark
              it "not spam" so future emails from us land in your inbox.
            </p>
            <Button asChild size="lg" className="mt-8 w-fit">
              <a href={downloadUrl} download>
                <Download className="mr-1" />
                Download the guide
              </a>
            </Button>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            onFocus={handleFirstInteraction}
            className="grid gap-6 border border-hairline p-6 md:p-10"
          >
            <div className="grid gap-5 sm:grid-cols-2">
              <Field label="Your name" name="name" required />
              <Field label="Email" name="email" type="email" required />
              <Field label="Business name (optional)" name="businessName" />
              <Field label="Business type (optional)" name="businessType" />
            </div>
            <Field
              label="Biggest operational challenge (optional)"
              name="businessChallenge"
              placeholder="What takes up the most avoidable time in your business?"
            />
            <input
              name="website"
              tabIndex={-1}
              autoComplete="off"
              className="hidden"
              aria-hidden="true"
            />
            <label className="flex items-start gap-3 text-sm leading-relaxed text-muted-foreground">
              <input
                type="checkbox"
                name="resourceConsent"
                required
                className="mt-1 accent-amber-500"
              />
              I agree to receive this resource by email. See the{" "}
              <a href="/privacy" className="underline hover:text-foreground">
                privacy policy
              </a>
              .
            </label>
            <label className="flex items-start gap-3 text-sm leading-relaxed text-muted-foreground">
              <input type="checkbox" name="marketingConsent" className="mt-1 accent-amber-500" />
              Also send me occasional emails about automation and useful business systems (optional
              — you can unsubscribe any time).
            </label>
            {state === "error" && (
              <p role="alert" className="text-sm text-destructive">
                {error}
              </p>
            )}
            <Button type="submit" size="lg" disabled={state === "sending"}>
              {state === "sending" ? (
                "Sending…"
              ) : (
                <>
                  Get the free guide <ArrowRight />
                </>
              )}
            </Button>
          </form>
        )}
      </div>
    </section>
  );
}

function Field({
  label,
  name,
  type = "text",
  required = false,
  placeholder,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
  placeholder?: string;
}) {
  return (
    <label className="text-sm font-medium">
      {label}
      <Input
        name={name}
        type={type}
        required={required}
        maxLength={255}
        placeholder={placeholder}
        className={field}
      />
    </label>
  );
}
