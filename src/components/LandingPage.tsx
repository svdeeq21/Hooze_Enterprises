import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import type { ReactNode } from "react";
import { Button } from "@/components/ui/button";
import { StarterKitCta } from "@/components/StarterKitCta";
import type { Faq } from "@/data/seo-pages";

type Props = {
  kicker: string;
  h1: string;
  answer: string;
  extra?: string;
  sections: { title: string; items: string[]; ordered?: boolean }[];
  faqs: Faq[];
  proofSlug?: string;
  children?: ReactNode;
};

export function LandingPage({ kicker, h1, answer, extra, sections, faqs, proofSlug, children }: Props) {
  return (
    <>
      <section className="gutter hair-b pb-16 pt-28">
        <p className="mono-label text-signal">{kicker}</p>
        <h1 className="display mt-8 max-w-5xl text-[clamp(2.2rem,6.5vw,5rem)]">{h1}</h1>
        <p className="mt-8 max-w-3xl text-xl leading-relaxed text-muted-foreground">{answer}</p>
        {extra && <p className="mt-5 max-w-3xl leading-relaxed text-muted-foreground">{extra}</p>}
        <div className="mt-9 flex flex-wrap gap-3">
          <Button asChild size="lg">
            <Link to="/start-a-project">
              Discuss your process <ArrowRight />
            </Link>
          </Button>
          <Button asChild size="lg" variant="outline">
            <Link to="/get-the-guide">Free starter kit</Link>
          </Button>
        </div>
      </section>
      {sections.map((s) => {
        const items = s.items.map((i) => <li key={i}>{i}</li>);
        return (
          <section key={s.title} className="gutter hair-b py-14">
            <h2 className="display text-3xl">{s.title}</h2>
            {s.ordered ? (
              <ol className="mt-6 max-w-3xl list-decimal space-y-3 pl-5 text-muted-foreground">{items}</ol>
            ) : (
              <ul className="mt-6 max-w-3xl list-disc space-y-3 pl-5 text-muted-foreground">{items}</ul>
            )}
          </section>
        );
      })}
      {proofSlug && (
        <section className="gutter hair-b py-14">
          <h2 className="display text-3xl">Proof</h2>
          <p className="mt-5 max-w-3xl text-muted-foreground">
            This is built from a live deployment, not a concept.{" "}
            <Link to="/work/$slug" params={{ slug: proofSlug }} className="text-signal underline">
              Read the case study
            </Link>
            .
          </p>
        </section>
      )}
      {children}
      <StarterKitCta />
      <section className="gutter py-14">
        <h2 className="display text-3xl">Common questions</h2>
        <div className="mt-8 max-w-3xl space-y-8">
          {faqs.map((f) => (
            <div key={f.q}>
              <h3 className="text-lg font-semibold">{f.q}</h3>
              <p className="mt-2 leading-relaxed text-muted-foreground">{f.a}</p>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
