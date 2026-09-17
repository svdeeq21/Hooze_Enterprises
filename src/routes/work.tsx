import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { ProjectVisual } from "@/components/ProjectVisual";
import { projects } from "@/data/content";
import { seo } from "@/lib/seo";

export const Route = createFileRoute("/work")({
  head: () =>
    seo({
      title: "Software & Automation Case Studies — Hooze",
      description:
        "Explore real Hooze work across WhatsApp sales, intelligent systems and custom software.",
      path: "/work",
    }),
  component: WorkPage,
});
function WorkPage() {
  return (
    <>
      <section className="gutter hair-b pb-16 pt-28">
        <p className="mono-label">Selected work</p>
        <h1 className="display mt-8 text-[clamp(3rem,9vw,7rem)]">
          Built, <span className="text-signal">not claimed.</span>
        </h1>
        <p className="mt-8 max-w-2xl text-lg text-muted-foreground">
          Client deployments, Hooze products and prototypes—each labelled honestly.
        </p>
      </section>
      {projects.map((project, index) => (
        <article key={project.slug} className="gutter hair-b py-14 md:py-20">
          <Link
            to="/work/$slug"
            params={{ slug: project.slug }}
            className="group grid gap-10 lg:grid-cols-[1fr_1.1fr] lg:items-center"
          >
            <div className={index % 2 ? "lg:order-2" : ""}>
              <div className="flex gap-4">
                <span className="mono-label text-signal">{project.status}</span>
                <span className="mono-label">{project.year}</span>
              </div>
              <h2 className="display mt-6 text-[clamp(2rem,5vw,4rem)]">{project.name}</h2>
              <p className="mt-5 max-w-xl text-lg leading-relaxed text-muted-foreground">
                {project.headline}
              </p>
              <span className="mono-label mt-8 inline-flex items-center gap-2 group-hover:text-signal">
                Read the case study <ArrowRight />
              </span>
            </div>
            <ProjectVisual
              image={project.image}
              alt={`Illustrative system view for ${project.name}`}
              className="aspect-[16/10] transition-transform duration-700 group-hover:scale-[1.02]"
            />
          </Link>
        </article>
      ))}
    </>
  );
}
