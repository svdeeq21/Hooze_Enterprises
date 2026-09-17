import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { solutions } from "@/data/content";
import { seo } from "@/lib/seo";

export const Route = createFileRoute("/solutions/$slug")({
  loader: ({ params }) => {
    const solution = solutions.find((item) => item.slug === params.slug);
    if (!solution) throw notFound();
    return solution;
  },
  head: ({ loaderData, params }) => {
    const title = loaderData
      ? `${loaderData.title} in Nigeria — Hooze`
      : "Solution unavailable — Hooze";
    const description = loaderData?.summary ?? "This Hooze solution page is unavailable.";
    return seo({ title, description, path: `/solutions/${params.slug}` });
  },
  component: SolutionPage,
});

function SolutionPage() {
  const solution = Route.useLoaderData();
  return (
    <>
      <section className="gutter hair-b pb-16 pt-28">
        <p className="mono-label text-signal">Solution {solution.id}</p>
        <h1 className="display mt-8 max-w-5xl text-[clamp(2.6rem,8vw,6.5rem)]">{solution.title}</h1>
        <p className="mt-8 max-w-2xl text-xl leading-relaxed text-muted-foreground">
          {solution.summary}
        </p>
      </section>
      <section className="gutter hair-b py-20">
        <div className="grid gap-12 lg:grid-cols-[.75fr_1.25fr]">
          <h2 className="display text-3xl">What this can include</h2>
          <div className="grid gap-px bg-hairline sm:grid-cols-2">
            {solution.items.map((item, index) => (
              <div key={item} className="bg-background p-7">
                <span className="mono-label text-signal">0{index + 1}</span>
                <p className="mt-8 text-xl font-semibold">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="gutter py-20">
        <p className="mono-label">The Hooze approach</p>
        <h2 className="display mt-6 max-w-4xl text-[clamp(2rem,5vw,4rem)]">
          We do not start with a preferred technology. We start with what is slowing the business
          down.
        </h2>
        <Button asChild size="lg" className="mt-10">
          <Link to="/start-a-project">
            Discuss the problem <ArrowRight />
          </Link>
        </Button>
      </section>
    </>
  );
}
