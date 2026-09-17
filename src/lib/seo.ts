// Shared head-metadata builder so every route produces an absolute canonical
// URL, absolute og:url, and a default social share image, instead of each
// route hand-rolling relative links that only resolve correctly by accident.
import { absoluteUrl } from "@/lib/site-config";

const DEFAULT_OG_IMAGE = "/social-share.jpg";

export function seo(params: {
  title: string;
  description: string;
  path: string;
  type?: "website" | "article";
  image?: string;
  noindex?: boolean;
}) {
  const url = absoluteUrl(params.path);
  const image = absoluteUrl(params.image ?? DEFAULT_OG_IMAGE);
  const meta: Array<Record<string, string>> = [
    { title: params.title },
    { name: "description", content: params.description },
    { property: "og:title", content: params.title },
    { property: "og:description", content: params.description },
    { property: "og:type", content: params.type ?? "website" },
    { property: "og:url", content: url },
    { property: "og:image", content: image },
    { name: "twitter:card", content: "summary_large_image" },
    { name: "twitter:title", content: params.title },
    { name: "twitter:description", content: params.description },
    { name: "twitter:image", content: image },
  ];
  if (params.noindex) meta.push({ name: "robots", content: "noindex, nofollow" });
  return {
    meta,
    links: [{ rel: "canonical", href: url }],
  };
}
