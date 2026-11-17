import { useRef, useState, type FormEvent } from "react";
import { Link } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { ArrowRight, Check, Download, Mail, UserRound } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Field } from "@/components/site/primitives";
import { track } from "@/lib/analytics";
import { submitGuideRequest } from "@/lib/guide-request.functions";
import { guideRequestSchema } from "@/lib/guide-request-schema";
import { siteConfig } from "@/lib/site-config";

type Status = "idle" | "submitting" | "success" | "error";
type FieldErrors = Partial<Record<"fullName" | "email", string>>;

export function GuideForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [errors, setErrors] = useState<FieldErrors>({});
  const [formError, setFormError] = useState("");
  const [consent, setConsent] = useState(false);
  const successHeading = useRef<HTMLHeadingElement>(null);
  const send = useServerFn(submitGuideRequest);

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setFormError("");
    const form = new FormData(event.currentTarget);
    const parsed = guideRequestSchema.safeParse({
      fullName: form.get("fullName"),
      email: form.get("email"),
      marketingConsent: consent,
      website: form.get("website") ?? "",
    });
    if (!parsed.success) {
      const next: FieldErrors = {};
      for (const issue of parsed.error.issues) {
        const key = issue.path[0];
        if ((key === "fullName" || key === "email") && !next[key]) next[key] = issue.message;
      }
      setErrors(next);
      setStatus("error");
      return;
    }
    setErrors({});
    setStatus("submitting");
    try {
      await send({ data: parsed.data });
      track("guide_download_requested", { marketing_consent: consent });
      setStatus("success");
      // Move focus to the confirmation so screen-reader users hear it.
      requestAnimationFrame(() => successHeading.current?.focus());
    } catch (error) {
      setFormError(
        error instanceof Error && error.message.startsWith("Too many")
          ? error.message
          : "We couldn’t prepare your guide just now. Please try again.",
      );
      setStatus("error");
    }
  };

  if (status === "success") {
    return (
      <div role="status" className="flex min-h-[320px] flex-col items-start justify-center">
        <span className="flex size-12 items-center justify-center border border-amber/50 text-amber">
          <Check aria-hidden="true" className="size-6" />
        </span>
        <h3
          ref={successHeading}
          tabIndex={-1}
          className="mt-6 font-display text-2xl font-semibold outline-none"
        >
          Your guide is ready.
        </h3>
        <p className="mt-3 max-w-[420px] text-sm leading-6 text-muted-foreground">
          Thanks for requesting {siteConfig.guide.title}. Download your copy below. Nothing has been
          emailed to you.
        </p>
        <Button asChild className="mt-7 h-12 rounded-sm px-5">
          <a
            href={siteConfig.guide.file}
            download={siteConfig.guide.downloadName}
            onClick={() => track("guide_pdf_downloaded")}
          >
            <Download aria-hidden="true" />
            Download your free guide
          </a>
        </Button>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate>
      <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-amber">
        GET YOUR FREE COPY
      </p>
      <h3 className="mt-3 font-display text-2xl font-semibold">Unlock the guide instantly.</h3>
      <p className="mt-2 text-sm leading-6 text-muted-foreground">
        Enter your name and email and the download appears on this page straight away. Nothing is
        sent to your inbox.
      </p>
      <div className="mt-6 grid gap-4">
        <Field id="guide-name" label="Your name" error={errors.fullName}>
          {(aria) => (
            <div className="relative">
              <UserRound
                aria-hidden="true"
                className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground"
              />
              <Input
                {...aria}
                name="fullName"
                autoComplete="name"
                maxLength={120}
                required
                placeholder="Full name"
                className="h-11 rounded-sm pl-10 text-sm"
              />
            </div>
          )}
        </Field>
        <Field id="guide-email" label="Email address" error={errors.email}>
          {(aria) => (
            <div className="relative">
              <Mail
                aria-hidden="true"
                className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground"
              />
              <Input
                {...aria}
                name="email"
                type="email"
                autoComplete="email"
                maxLength={255}
                required
                placeholder="you@company.com"
                className="h-11 rounded-sm pl-10 text-sm"
              />
            </div>
          )}
        </Field>
        {/* Honeypot: hidden from people and assistive tech, tempting to bots. */}
        <div className="hp-field" aria-hidden="true">
          <label htmlFor="guide-website">Leave this field empty</label>
          <input id="guide-website" name="website" type="text" tabIndex={-1} autoComplete="off" />
        </div>
        <label className="flex cursor-pointer items-start gap-3 text-xs leading-5 text-muted-foreground">
          <input
            type="checkbox"
            checked={consent}
            onChange={(event) => setConsent(event.target.checked)}
            className="mt-0.5 size-4 shrink-0 accent-[var(--amber)]"
          />
          <span>
            Also send me occasional, practical tips from Hooze. Optional, and not needed to get the
            guide.
          </span>
        </label>
      </div>
      {status === "error" && formError && (
        <p role="alert" className="mt-4 text-sm text-destructive">
          {formError}
        </p>
      )}
      <Button
        type="submit"
        disabled={status === "submitting"}
        className="mt-6 h-12 w-full rounded-sm text-sm"
      >
        {status === "submitting" ? "Preparing your guide…" : "Get the free guide"}
        {status !== "submitting" && <ArrowRight aria-hidden="true" />}
      </Button>
      <p className="mt-3 text-xs leading-5 text-muted-foreground">
        We use your details to provide the guide and keep a record of who requested it. See our{" "}
        <Link to="/privacy" className="underline underline-offset-2 hover:text-foreground">
          privacy policy
        </Link>
        .
      </p>
    </form>
  );
}
