import { createFileRoute } from "@tanstack/react-router";
import { useRef, useState, type FormEvent } from "react";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { submitEnquiry } from "@/lib/enquiries.functions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { getSubmissionAttribution } from "@/lib/attribution";
import { track } from "@/lib/track";
import { seo } from "@/lib/seo";

export const Route = createFileRoute("/start-a-project")({
  head: () =>
    seo({
      title: "Start a Software or Automation Project — Hooze",
      description:
        "Tell Hooze what is not working in your business. Start a focused conversation about custom software, automation or intelligent systems.",
      path: "/start-a-project",
    }),
  component: StartProjectPage,
});

const field = "mt-2 h-12 rounded-none bg-secondary/30 px-4";

function StartProjectPage() {
  const [state, setState] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [error, setError] = useState("");
  const [reference, setReference] = useState("");
  const started = useRef(false);

  function handleFirstInteraction() {
    if (started.current) return;
    started.current = true;
    track("project_form_started");
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setState("sending");
    setError("");
    const form = new FormData(event.currentTarget);
    const attribution = getSubmissionAttribution();
    const projectType = String(form.get("projectType")) as
      | "custom-software"
      | "business-automation"
      | "intelligent-system"
      | "digital-product"
      | "not-sure";
    try {
      const result = await submitEnquiry({
        data: {
          name: String(form.get("name")),
          businessName: String(form.get("businessName")),
          email: String(form.get("email")),
          whatsapp: String(form.get("whatsapp") ?? ""),
          projectType,
          problem: String(form.get("problem")),
          currentTools: String(form.get("currentTools") ?? ""),
          budgetRange: String(form.get("budgetRange") ?? ""),
          timeline: String(form.get("timeline") ?? ""),
          preferredContact: String(form.get("preferredContact")) as "email" | "whatsapp",
          consent: form.get("consent") === "on" ? true : (undefined as never),
          website: String(form.get("website") ?? ""),
          utmSource: attribution.utmSource,
          utmMedium: attribution.utmMedium,
          utmCampaign: attribution.utmCampaign,
          utmContent: attribution.utmContent,
          landingPage: attribution.landingPage,
          referrer: attribution.referrer,
        },
      });
      setReference(result.reference);
      setState("sent");
      track("project_form_submitted", { projectType });
    } catch (cause) {
      setError(
        cause instanceof Error
          ? cause.message
          : "We could not save your enquiry. Please try again.",
      );
      setState("error");
    }
  }

  return (
    <section className="gutter pb-24 pt-28">
      <div className="grid gap-16 lg:grid-cols-[.75fr_1.25fr]">
        <div>
          <p className="mono-label text-signal">Start a project</p>
          <h1 className="display mt-7 text-[clamp(2.5rem,7vw,5.5rem)]">
            Tell us what is <span className="text-signal">not working.</span>
          </h1>
          <p className="mt-7 max-w-lg text-lg leading-relaxed text-muted-foreground">
            You do not need a technical specification. Describe the business problem, the current
            process and what better would look like.
          </p>
          <div className="mt-10 hair-t pt-7">
            <p className="mono-label">What happens next</p>
            <ol className="mt-5 space-y-4 text-sm text-muted-foreground">
              <li>01 · Hooze reviews the business problem you described.</li>
              <li>02 · You receive a confirmation email with your submitted details.</li>
              <li>03 · We follow up using your preferred contact method.</li>
            </ol>
          </div>
        </div>
        {state === "sent" ? (
          <div className="flex min-h-[420px] flex-col justify-center border border-hairline p-8">
            <CheckCircle2 className="size-10 text-signal" />
            <h2 className="display mt-8 text-4xl">We received your enquiry.</h2>
            <p className="mt-5 max-w-md leading-relaxed text-muted-foreground">
              Your project details have been recorded, and a confirmation email is on its way. Hooze
              will follow up using your preferred contact method.
            </p>
            <p className="mt-6 font-mono text-xs uppercase tracking-wider text-muted-foreground">
              Reference · {reference}
            </p>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            onFocus={handleFirstInteraction}
            className="grid gap-6 border border-hairline p-6 md:p-10"
          >
            <div className="grid gap-5 sm:grid-cols-2">
              <Field label="Your name" name="name" required />
              <Field label="Business name" name="businessName" required />
              <Field label="Email" name="email" type="email" required />
              <Field label="WhatsApp (optional)" name="whatsapp" type="tel" />
            </div>
            <label className="text-sm font-medium">
              What kind of project?
              <select
                name="projectType"
                required
                className={`${field} block w-full border border-input text-foreground`}
                defaultValue=""
              >
                <option value="" disabled>
                  Choose one
                </option>
                <option value="custom-software">Custom software</option>
                <option value="business-automation">Business automation</option>
                <option value="intelligent-system">Intelligent system / AI</option>
                <option value="digital-product">Digital product</option>
                <option value="not-sure">Not sure yet</option>
              </select>
            </label>
            <label className="text-sm font-medium">
              Describe the problem
              <Textarea
                name="problem"
                required
                minLength={30}
                maxLength={3000}
                rows={7}
                className="mt-2 rounded-none bg-secondary/30 p-4"
                placeholder="What happens today, where does it break down, and what should improve?"
              />
            </label>
            <Field
              label="Current tools (optional)"
              name="currentTools"
              placeholder="WhatsApp, spreadsheets, existing CRM…"
            />
            <div className="grid gap-5 sm:grid-cols-2">
              <Field label="Budget range (optional)" name="budgetRange" />
              <Field label="Timeline (optional)" name="timeline" />
            </div>
            <fieldset>
              <legend className="text-sm font-medium">Preferred contact</legend>
              <div className="mt-3 flex gap-6 text-sm">
                <label>
                  <input
                    type="radio"
                    name="preferredContact"
                    value="email"
                    defaultChecked
                    className="mr-2 accent-amber-500"
                  />
                  Email
                </label>
                <label>
                  <input
                    type="radio"
                    name="preferredContact"
                    value="whatsapp"
                    className="mr-2 accent-amber-500"
                  />
                  WhatsApp
                </label>
              </div>
            </fieldset>
            <input
              name="website"
              tabIndex={-1}
              autoComplete="off"
              className="hidden"
              aria-hidden="true"
            />
            <label className="flex items-start gap-3 text-sm leading-relaxed text-muted-foreground">
              <input type="checkbox" name="consent" required className="mt-1 accent-amber-500" />I
              agree that Hooze may use these details to respond to this enquiry. See the{" "}
              <a href="/privacy" className="underline hover:text-foreground">
                privacy policy
              </a>
              .
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
                  Send enquiry <ArrowRight />
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
