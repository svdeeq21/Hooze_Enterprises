import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ProjectVisual } from "@/components/ProjectVisual";
import { projects } from "@/data/content";
import { seo } from "@/lib/seo";

export const Route = createFileRoute("/work/$slug")({
  loader: ({ params }) => {
    const project = projects.find((item) => item.slug === params.slug);
    if (!project) throw notFound();
    return project;
  },
  head: ({ loaderData, params }) => {
    const title = loaderData ? `${loaderData.headline} — Hooze` : "Case study unavailable — Hooze";
    const description = loaderData?.problem ?? "This case study is unavailable.";
    const base = seo({
      title,
      description,
      path: `/work/${params.slug}`,
      type: "article",
    });
    return {
      ...base,
      scripts: loaderData
        ? [
            {
              type: "application/ld+json",
              children: JSON.stringify({
                "@context": "https://schema.org",
                "@type": "CreativeWork",
                name: loaderData.name,
                description: loaderData.headline,
                creator: { "@type": "Organization", name: "Hooze Enterprises" },
              }),
            },
          ]
        : [],
    };
  },
  component: CaseStudy,
});
function CaseStudy() {
  const project = Route.useLoaderData();
  return (
    <>
      <article>
        <header className="gutter hair-b pb-16 pt-28">
          <div className="flex flex-wrap gap-5">
            <span className="mono-label text-signal">{project.status}</span>
            <span className="mono-label">{project.label}</span>
            <span className="mono-label">{project.year}</span>
          </div>
          <h1 className="display mt-8 max-w-6xl text-[clamp(2.5rem,8vw,6rem)]">
            {project.headline}
          </h1>
        </header>
        <section className="gutter hair-b py-14">
          <ProjectVisual
            image={project.image}
            alt={`Illustrative system view for ${project.name}`}
            className="aspect-[16/9]"
          />
        </section>
        <section className="gutter grid gap-px bg-hairline py-px lg:grid-cols-4">
          {[
            ["The problem", project.problem],
            ["The decision", project.approach],
            ["What was built", project.built],
            ["Where it stands", project.outcome],
          ].map(([label, text]) => (
            <div key={label} className="bg-background p-7">
              <h2 className="mono-label text-signal">{label}</h2>
              <p className="mt-6 leading-relaxed text-muted-foreground">{text}</p>
            </div>
          ))}
        </section>
      </article>
      <section className="gutter py-20">
        <h2 className="display max-w-3xl text-[clamp(2rem,5vw,4rem)]">
          Have a similar operational problem?
        </h2>
        <Button asChild size="lg" className="mt-9">
          <Link to="/start-a-project">
            Discuss it with Hooze <ArrowRight />
          </Link>
        </Button>
      </section>
    </>
  );
}
