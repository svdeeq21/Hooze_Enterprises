import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { LandingPage } from "@/components/LandingPage";
import { commonFaqs, faqLd, industries, serviceLd } from "@/data/seo-pages";
import { absoluteUrl } from "@/lib/site-config";
import { seo } from "@/lib/seo";

export const Route = createFileRoute("/industries/$slug")({
  loader: ({ params }) => {
    const industry = industries.find((i) => i.slug === params.slug);
    if (!industry) throw notFound();
    return industry;
  },
  head: ({ loaderData, params }) => {
    if (!loaderData) return seo({ title: "Page not found — Hooze", description: "Not found.", path: `/industries/${params.slug}`, noindex: true });
    const path = `/industries/${params.slug}`;
    return {
      ...seo({ title: `${loaderData.h1} — Hooze`, description: loaderData.answer.slice(0, 155), path }),
      scripts: [
        serviceLd(loaderData.h1, loaderData.answer, absoluteUrl(path)),
        faqLd([...loaderData.faqs, ...commonFaqs(loaderData.name.toLowerCase())]),
      ],
    };
  },
  component: IndustryPage,
});

function IndustryPage() {
  const i = Route.useLoaderData();
  return (
    <LandingPage
      kicker={`Industry · ${i.name}`}
      h1={i.h1}
      answer={i.answer}
      sections={[
        { title: "The problems this solves", items: i.problems },
        { title: "How it works", items: i.flow, ordered: true },
        { title: "What still needs a human", items: i.limits },
      ]}
      faqs={[...i.faqs, ...commonFaqs(i.name.toLowerCase())]}
      proofSlug={i.caseSlug}
    >
      <section className="gutter hair-b py-10">
        <p className="mono-label">
          <Link to="/industries" className="hover:text-foreground">All industries</Link>
          {" · "}
          <Link to="/locations" className="hover:text-foreground">Where we work</Link>
        </p>
      </section>
    </LandingPage>
  );
}
