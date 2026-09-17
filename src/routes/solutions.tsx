import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { solutions } from "@/data/content";
import { seo } from "@/lib/seo";

export const Route = createFileRoute("/solutions")({
  head: () =>
    seo({
      title: "Business Software & Automation Solutions — Hooze",
      description:
        "Explore Hooze custom software, business automation, intelligent systems and digital product services in Nigeria.",
      path: "/solutions",
    }),
  component: SolutionsPage,
});

function SolutionsPage() {
  return (
    <>
      <section className="gutter hair-b pb-16 pt-28">
        <p className="mono-label">Solutions</p>
        <h1 className="display mt-8 max-w-5xl text-[clamp(2.5rem,8vw,6.5rem)]">
          Technology chosen for the problem. <span className="text-signal">Not the pitch.</span>
        </h1>
        <p className="mt-8 max-w-2xl text-lg leading-relaxed text-muted-foreground">
          We study the operation first, then design the smallest serious system capable of improving
          it.
        </p>
      </section>
      <section className="grid gap-px bg-hairline lg:grid-cols-2">
        {solutions.map((solution) => (
          <Link
            key={solution.slug}
            to="/solutions/$slug"
            params={{ slug: solution.slug }}
            className="group bg-background p-8 md:p-12 hover:bg-secondary"
          >
            <span className="mono-label text-signal">{solution.id}</span>
            <h2 className="display mt-8 text-[clamp(2rem,4vw,3.5rem)]">{solution.title}</h2>
            <p className="mt-5 max-w-xl leading-relaxed text-muted-foreground">
              {solution.summary}
            </p>
            <ul className="mt-8 grid grid-cols-2 gap-3">
              {solution.items.map((item) => (
                <li key={item} className="mono-label">
                  — {item}
                </li>
              ))}
            </ul>
            <span className="mono-label mt-10 inline-flex items-center gap-2 text-signal">
              Explore <ArrowRight />
            </span>
          </Link>
        ))}
      </section>
    </>
  );
}
