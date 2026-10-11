import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { LandingPage } from "@/components/LandingPage";
import { cities, cityPublished, commonFaqs, deliveryModel, faqLd, industries, serviceLd } from "@/data/seo-pages";
import { absoluteUrl } from "@/lib/site-config";
import { seo } from "@/lib/seo";

export const Route = createFileRoute("/locations/$slug")({
  loader: ({ params }) => {
    const city = cities.find((c) => c.slug === params.slug);
    if (!city) throw notFound();
    return city;
  },
  head: ({ loaderData, params }) => {
    const path = `/locations/${params.slug}`;
    if (!loaderData) return seo({ title: "Page not found — Hooze", description: "Not found.", path, noindex: true });
    const name = loaderData.name;
    const h1 = `AI and business automation for businesses in ${name}`;
    const description = `Hooze builds WhatsApp, AI and business automation systems for businesses in ${name}, ${loaderData.state}. Start with the free automation starter kit.`;
    return {
      // Thin city pages stay out of search until localContext is filled in.
      ...seo({ title: `${h1} — Hooze`, description, path, noindex: !cityPublished(loaderData) }),
      scripts: [serviceLd(h1, description, absoluteUrl(path)), faqLd(commonFaqs(`businesses in ${name}`))],
    };
  },
  component: CityPage,
});

function CityPage() {
  const c = Route.useLoaderData();
  return (
    <LandingPage
      kicker={`${c.name} · ${c.state}`}
      h1={`AI and business automation for businesses in ${c.name}`}
      answer={`Hooze builds WhatsApp sales systems, workflow automation and custom business software for businesses in ${c.name}.`}
      extra={c.localContext || undefined}
      sections={[
        { title: "How we work with businesses in " + c.name, items: [deliveryModel] },
      ]}
      faqs={commonFaqs(`businesses in ${c.name}`)}
    >
      <section className="gutter hair-b py-14">
        <h2 className="display text-3xl">Solutions by industry</h2>
        <ul className="mt-6 flex flex-wrap gap-x-8 gap-y-3">
          {industries.map((i) => (
            <li key={i.slug}>
              <Link to="/industries/$slug" params={{ slug: i.slug }} className="text-signal underline">
                {i.name}
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </LandingPage>
  );
}
