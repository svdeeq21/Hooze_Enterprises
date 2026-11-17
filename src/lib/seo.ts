import { absoluteUrl, siteConfig } from "@/lib/site-config";

type SeoInput = {
  title: string;
  description: string;
  path: string;
  /** Set false for pages that should not appear in search results. */
  index?: boolean;
};

/** Per-route head tags. The root route deliberately sets no og:image; every page sets its own. */
export function seo({ title, description, path, index = true }: SeoInput) {
  const url = absoluteUrl(path);
  const image = `${siteConfig.url}/og-image.jpg`;
  return {
    meta: [
      { title },
      { name: "description", content: description },
      ...(index ? [] : [{ name: "robots", content: "noindex" }]),
      { property: "og:site_name", content: siteConfig.name },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { property: "og:url", content: url },
      { property: "og:image", content: image },
      { property: "og:image:width", content: "1200" },
      { property: "og:image:height", content: "630" },
      { property: "og:image:alt", content: "Hooze Enterprises: AI products and business systems" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: title },
      { name: "twitter:description", content: description },
      { name: "twitter:image", content: image },
    ],
    links: [{ rel: "canonical", href: url }],
  };
}
