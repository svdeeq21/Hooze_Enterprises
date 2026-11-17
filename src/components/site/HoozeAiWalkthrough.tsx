import { useState } from "react";
import { Bot, Check, CircleDot } from "lucide-react";
import { Eyebrow } from "@/components/site/primitives";

/**
 * A scripted, clearly labelled illustration of one complete real-estate enquiry.
 * It is NOT live software and uses no real customer data. Replace with anonymised real
 * screenshots from the Praise Dynasty deployment when they are available.
 */
const steps = [
  {
    title: "A customer reaches out",
    text: "A WhatsApp enquiry enters the business conversation.",
    messages: [{ from: "customer", text: "Hello, is the two-bedroom apartment still available?" }],
    note: "Enquiry received and logged against a new lead.",
    lead: {
      interest: "Two-bedroom apartment",
      location: "Not yet known",
      timeline: "Not yet known",
    },
    status: "Enquiry received",
    next: "Ask which area they prefer",
  },
  {
    title: "Context informs the response",
    text: "Relevant business knowledge helps guide what happens next.",
    messages: [
      { from: "customer", text: "Hello, is the two-bedroom apartment still available?" },
      {
        from: "assistant",
        text: "I can help with that. Which area are you interested in, and when are you hoping to move?",
      },
    ],
    note: "Property information is checked before the reply is sent.",
    lead: {
      interest: "Two-bedroom apartment",
      location: "Not yet known",
      timeline: "Not yet known",
    },
    status: "Gathering details",
    next: "Wait for their area and timing",
  },
  {
    title: "The lead is qualified",
    text: "Useful details and intent are captured in the process.",
    messages: [
      {
        from: "assistant",
        text: "Which area are you interested in, and when are you hoping to move?",
      },
      { from: "customer", text: "Around Victoria Island, ideally within the next month." },
    ],
    note: "Details are saved to the lead so the team does not have to ask again.",
    lead: {
      interest: "Two-bedroom apartment",
      location: "Victoria Island",
      timeline: "Within a month",
    },
    status: "Qualified",
    next: "Share matching properties",
  },
  {
    title: "Follow-up moves forward",
    text: "The next action is easier to see and keep track of.",
    messages: [
      { from: "customer", text: "Around Victoria Island, ideally within the next month." },
      {
        from: "assistant",
        text: "Here are two options that match. Would you like to arrange an inspection?",
      },
    ],
    note: "If the customer needs a person, the conversation can be handed to your team.",
    lead: {
      interest: "Two-bedroom apartment",
      location: "Victoria Island",
      timeline: "Within a month",
    },
    status: "Follow-up active",
    next: "Offer an inspection, or hand over to an agent",
  },
] as const;

export function HoozeAiWalkthrough() {
  const [active, setActive] = useState(0);
  const step = steps[active] ?? steps[0];

  return (
    <div className="grid gap-0 border border-border bg-surface lg:grid-cols-12">
      <div
        role="tablist"
        aria-label="How a Hooze AI conversation unfolds"
        className="border-b border-border lg:col-span-4 lg:border-b-0 lg:border-r"
      >
        <div className="px-5 pb-2 pt-5 md:px-6">
          <Eyebrow>HOW IT WORKS · ONE ENQUIRY</Eyebrow>
        </div>
        {steps.map((item, index) => {
          const selected = index === active;
          return (
            <button
              key={item.title}
              role="tab"
              id={`walkthrough-tab-${index}`}
              aria-selected={selected}
              aria-controls="walkthrough-panel"
              tabIndex={selected ? 0 : -1}
              onClick={() => setActive(index)}
              onKeyDown={(event) => {
                if (event.key === "ArrowDown" || event.key === "ArrowRight")
                  setActive((active + 1) % steps.length);
                if (event.key === "ArrowUp" || event.key === "ArrowLeft")
                  setActive((active + steps.length - 1) % steps.length);
              }}
              className={`grid w-full grid-cols-[40px_1fr] items-start gap-4 border-t border-border px-5 py-5 text-left transition-colors md:px-6 ${selected ? "bg-surface-raised" : "hover:bg-surface-raised/60"}`}
            >
              <span
                className={`flex size-10 items-center justify-center border font-mono text-[11px] ${selected ? "border-amber text-amber" : "border-border text-muted-foreground"}`}
              >
                0{index + 1}
              </span>
              <span>
                <span className="block font-display text-base font-semibold md:text-lg">
                  {item.title}
                </span>
                <span className="mt-1 block text-sm leading-6 text-muted-foreground">
                  {item.text}
                </span>
              </span>
            </button>
          );
        })}
      </div>

      <div
        id="walkthrough-panel"
        role="tabpanel"
        aria-labelledby={`walkthrough-tab-${active}`}
        className="lg:col-span-8"
      >
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border px-4 py-3 md:px-6">
          <div className="flex items-center gap-3">
            <span className="size-2 rounded-full bg-amber" />
            <span className="font-display text-sm font-semibold">
              Hooze <span className="text-amber">AI</span>
            </span>
            <span className="border-l border-border pl-3 font-mono text-[11px] uppercase tracking-[0.1em] text-muted-foreground">
              Illustration · scripted example
            </span>
          </div>
          <span className="inline-flex items-center gap-1.5 font-mono text-[11px] uppercase text-amber">
            <span className="size-1.5 rounded-full bg-amber" />
            {step.status}
          </span>
        </div>
        <div className="grid min-h-[360px] md:grid-cols-5">
          <div className="flex flex-col justify-center gap-4 border-b border-border px-4 py-6 md:col-span-3 md:border-b-0 md:border-r md:px-6">
            <p className="font-mono text-[11px] uppercase tracking-[0.12em] text-muted-foreground">
              WHATSAPP CONVERSATION
            </p>
            {step.messages.map((message) => (
              <div
                key={message.text}
                className={`max-w-[88%] px-4 py-3 text-sm leading-6 ${message.from === "customer" ? "self-start border border-border bg-background" : "self-end bg-surface-raised"}`}
              >
                {message.text}
              </div>
            ))}
            <div className="flex items-center gap-2 border border-amber/40 px-3 py-2.5 text-xs leading-5 text-muted-foreground">
              <Bot aria-hidden="true" className="size-4 shrink-0 text-amber" />
              {step.note}
            </div>
          </div>
          <aside className="p-4 md:col-span-2 md:p-6" aria-label="Lead details captured">
            <p className="font-mono text-[11px] uppercase tracking-[0.12em] text-muted-foreground">
              LEAD CONTEXT
            </p>
            <dl className="mt-5 space-y-4">
              {(
                [
                  ["Interest", step.lead.interest],
                  ["Location", step.lead.location],
                  ["Timeline", step.lead.timeline],
                ] as const
              ).map(([label, value]) => (
                <div key={label}>
                  <dt className="font-mono text-[11px] uppercase text-muted-foreground">{label}</dt>
                  <dd
                    className={`mt-1 text-sm ${value === "Not yet known" ? "text-muted-foreground" : ""}`}
                  >
                    {value}
                  </dd>
                </div>
              ))}
              <div>
                <dt className="font-mono text-[11px] uppercase text-muted-foreground">Next step</dt>
                <dd className="mt-1 flex items-start gap-2 text-sm">
                  <span className="mt-2 size-1.5 shrink-0 rounded-full bg-amber" />
                  {step.next}
                </dd>
              </div>
            </dl>
            <div className="mt-6 border-t border-border pt-4 text-xs text-muted-foreground">
              {steps.map((item, index) => (
                <div
                  key={item.title}
                  className={`mt-2 flex items-center gap-2 ${index <= active ? "text-foreground" : ""}`}
                >
                  <span
                    className={`flex size-5 items-center justify-center border ${index <= active ? "border-amber text-amber" : "border-border"}`}
                  >
                    {index < active ? (
                      <Check aria-hidden="true" className="size-3" />
                    ) : index === active ? (
                      <CircleDot aria-hidden="true" className="size-3" />
                    ) : null}
                  </span>
                  {item.title}
                </div>
              ))}
            </div>
          </aside>
        </div>
        <p className="border-t border-border px-4 py-4 text-xs leading-5 text-muted-foreground md:px-6">
          A scripted illustration of one property enquiry. It is not a production screenshot and
          uses no real customer data.
        </p>
      </div>
    </div>
  );
}
