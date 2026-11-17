import { useState, type FormEvent } from "react";
import { Link } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { ArrowRight, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Field } from "@/components/site/primitives";
import { controlClass } from "@/components/site/form-styles";
import { track } from "@/lib/analytics";
import { submitProjectEnquiry } from "@/lib/project-enquiry.functions";
import { contactMethods, helpTypes, projectEnquirySchema } from "@/lib/project-enquiry-schema";
import { whatsappUrl } from "@/lib/site-config";

type Status = "idle" | "submitting" | "success" | "error";
type Errors = Partial<Record<"fullName" | "email" | "helpType" | "message" | "phone", string>>;

export function ProjectEnquiryForm({ initialTopic }: { initialTopic?: string | undefined }) {
  const [status, setStatus] = useState<Status>("idle");
  const [errors, setErrors] = useState<Errors>({});
  const [formError, setFormError] = useState("");
  const [method, setMethod] = useState("email");
  const send = useServerFn(submitProjectEnquiry);

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setFormError("");
    const form = new FormData(event.currentTarget);
    const parsed = projectEnquirySchema.safeParse({
      fullName: form.get("fullName"),
      email: form.get("email"),
      company: form.get("company") ?? "",
      helpType: form.get("helpType"),
      message: form.get("message"),
      contactMethod: form.get("contactMethod"),
      phone: form.get("phone") ?? "",
      website: form.get("website") ?? "",
    });
    if (!parsed.success) {
      const next: Errors = {};
      for (const issue of parsed.error.issues) {
        const key = issue.path[0] as keyof Errors | undefined;
        if (key && !next[key]) next[key] = issue.message;
      }
      setErrors(next);
      setStatus("error");
      // Send keyboard / screen-reader focus to the first problem.
      const firstId = (["fullName", "email", "helpType", "message", "phone"] as const).find(
        (k) => next[k],
      );
      if (firstId) document.getElementById(`enquiry-${firstId}`)?.focus();
      return;
    }
    setErrors({});
    setStatus("submitting");
    try {
      await send({ data: parsed.data });
      track("project_enquiry_submitted", { help_type: parsed.data.helpType });
      setStatus("success");
    } catch (error) {
      setFormError(
        error instanceof Error &&
          (error.message.startsWith("Too many") || error.message.startsWith("We couldn"))
          ? error.message
          : "We couldn’t send your enquiry just now. Please try again or use WhatsApp.",
      );
      setStatus("error");
    }
  };

  if (status === "success") {
    return (
      <div role="status" className="flex min-h-[360px] flex-col items-start justify-center">
        <span className="flex size-12 items-center justify-center border border-amber/50 text-amber">
          <Check aria-hidden="true" className="size-6" />
        </span>
        <h2 className="mt-6 font-display text-2xl font-semibold">
          Thanks, your enquiry has been sent.
        </h2>
        <p className="mt-3 max-w-[460px] text-sm leading-6 text-muted-foreground">
          We’ll read it and reply using the contact method you chose. If it’s urgent, you can also
          message us on WhatsApp.
        </p>
        <div className="mt-7 flex flex-wrap gap-4">
          <Button asChild className="h-11 rounded-sm px-5">
            <Link to="/">Back to the homepage</Link>
          </Button>
          <Button asChild variant="outline" className="h-11 rounded-sm px-5">
            <a href={whatsappUrl()} target="_blank" rel="noreferrer">
              WhatsApp Hooze
            </a>
          </Button>
        </div>
      </div>
    );
  }

  const initial = helpTypes.some(([id]) => id === initialTopic) ? initialTopic : "";

  return (
    <form onSubmit={onSubmit} noValidate className="grid gap-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <Field id="enquiry-fullName" label="Your name" error={errors.fullName}>
          {(aria) => (
            <Input
              {...aria}
              name="fullName"
              autoComplete="name"
              maxLength={120}
              required
              className="h-11 rounded-sm"
            />
          )}
        </Field>
        <Field id="enquiry-email" label="Business email" error={errors.email}>
          {(aria) => (
            <Input
              {...aria}
              name="email"
              type="email"
              autoComplete="email"
              maxLength={255}
              required
              className="h-11 rounded-sm"
            />
          )}
        </Field>
      </div>
      <Field id="enquiry-company" label="Business name" optional>
        {(aria) => (
          <Input
            {...aria}
            name="company"
            autoComplete="organization"
            maxLength={120}
            className="h-11 rounded-sm"
          />
        )}
      </Field>
      <Field id="enquiry-helpType" label="What do you need help with?" error={errors.helpType}>
        {(aria) => (
          <select
            {...aria}
            name="helpType"
            required
            defaultValue={initial}
            className={`${controlClass} h-11 bg-background`}
          >
            <option value="" disabled>
              Choose one
            </option>
            {helpTypes.map(([id, label]) => (
              <option key={id} value={id}>
                {label}
              </option>
            ))}
          </select>
        )}
      </Field>
      <Field
        id="enquiry-message"
        label="Describe the problem"
        hint="A few sentences is plenty: what happens today, and what you’d like to change."
        error={errors.message}
      >
        {(aria) => (
          <Textarea
            {...aria}
            name="message"
            required
            maxLength={2000}
            rows={5}
            className="rounded-sm"
          />
        )}
      </Field>
      <div className="grid gap-5 sm:grid-cols-2">
        <Field id="enquiry-contactMethod" label="Preferred way to reach you">
          {(aria) => (
            <select
              {...aria}
              name="contactMethod"
              value={method}
              onChange={(e) => setMethod(e.target.value)}
              className={`${controlClass} h-11 bg-background`}
            >
              {contactMethods.map(([id, label]) => (
                <option key={id} value={id}>
                  {label}
                </option>
              ))}
            </select>
          )}
        </Field>
        <Field
          id="enquiry-phone"
          label={method === "email" ? "Phone / WhatsApp number" : "Phone / WhatsApp number"}
          optional={method === "email"}
          error={errors.phone}
        >
          {(aria) => (
            <Input
              {...aria}
              name="phone"
              type="tel"
              autoComplete="tel"
              maxLength={30}
              placeholder="Include country code"
              className="h-11 rounded-sm"
            />
          )}
        </Field>
      </div>
      <div className="hp-field" aria-hidden="true">
        <label htmlFor="enquiry-website">Leave this field empty</label>
        <input id="enquiry-website" name="website" type="text" tabIndex={-1} autoComplete="off" />
      </div>
      {status === "error" && formError && (
        <p role="alert" className="text-sm text-destructive">
          {formError}
        </p>
      )}
      <Button
        type="submit"
        disabled={status === "submitting"}
        className="h-12 w-full rounded-sm text-sm sm:w-auto sm:px-8"
      >
        {status === "submitting" ? "Sending…" : "Send enquiry"}
        {status !== "submitting" && <ArrowRight aria-hidden="true" />}
      </Button>
      <p className="text-xs leading-5 text-muted-foreground">
        We use these details only to reply to your enquiry. See our{" "}
        <Link to="/privacy" className="underline underline-offset-2 hover:text-foreground">
          privacy policy
        </Link>
        . This form doesn’t sign you up for marketing.
      </p>
    </form>
  );
}
