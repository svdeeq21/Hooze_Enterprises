import { createFileRoute } from "@tanstack/react-router";
import { projects, solutions } from "@/data/content";

export const Route = createFileRoute("/sitemap.xml")({
  server: {
    handlers: {
      GET: ({ request }) => {
        const origin = new URL(request.url).origin;
        const paths = [
          "",
          "solutions",
          ...solutions.map((item) => `solutions/${item.slug}`),
          "work",
          ...projects.map((item) => `work/${item.slug}`),
          "about",
          "start-a-project",
          "get-the-guide",
          "privacy",
          "terms",
        ];
        const body = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${paths.map((path) => `  <url><loc>${origin}/${path}</loc></url>`).join("\n")}\n</urlset>`;
        return new Response(body, {
          headers: {
            "content-type": "application/xml; charset=utf-8",
            "cache-control": "public, max-age=3600",
          },
        });
      },
    },
  },
});
