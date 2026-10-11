import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { track } from "@/lib/track";

export function StarterKitCta() {
  return (
    <section className="gutter hair-b py-16">
      <p className="mono-label text-signal">Not sure where to start?</p>
      <h2 className="display mt-6 max-w-3xl text-[clamp(1.8rem,4.5vw,3.2rem)]">
        Unsure what to automate? Start with the free Business Automation Starter Kit.
      </h2>
      <div className="mt-8 flex flex-wrap gap-3">
        <Button asChild size="lg">
          <Link to="/get-the-guide" onClick={() => track("starter_kit_cta_clicked")}>
            Get the starter kit <ArrowRight />
          </Link>
        </Button>
        <Button asChild size="lg" variant="outline">
          <Link to="/start-a-project">Describe your problem</Link>
        </Button>
      </div>
    </section>
  );
}
