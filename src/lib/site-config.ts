/**
 * Single source of truth for contact details, URLs and verified business facts.
 * Change values HERE, not inside components.
 *
 * Items marked CONFIRM need a decision from the business owner before launch.
 */

const envSiteUrl = import.meta.env["VITE_SITE_URL"] as string | undefined;

export const siteConfig = {
  name: "Hooze Enterprises",
  tagline: "Builders of the 1%",
  // CONFIRM: final production domain. Override with VITE_SITE_URL in .env / hosting settings.
  url: (envSiteUrl ?? "https://www.hoozeenterprises.com").replace(/\/+$/, ""),
  productUrl: "https://ai.hoozeenterprises.com",
  contact: {
    // CONFIRM: replace with the verified company-domain address (and keep
    // tools/build-guide-pdf.py in sync), then re-run that script.
    email: "hoozeenterprises@gmail.com",
    // CONFIRM: send a test message to this number before launch.
    whatsappNumber: "2349150754870",
  },
  guide: {
    title: "The Business Automation Starter Kit",
    file: "/downloads/Hooze-Business-Automation-Starter-Kit.pdf",
    downloadName: "Hooze-Business-Automation-Starter-Kit.pdf",
    pages: 4,
  },
  caseStudy: {
    slug: "praise-dynasty-whatsapp-sales-system",
    client: "Praise Dynasty Realty",
    // CONFIRM: location and year of deployment (previous site said 2025; project records say 2026).
    place: "Abuja, Nigeria",
    year: "2026",
    // CONFIRM: measurement period and definition of each figure before publishing more detail.
    leads: "220",
    messages: "7,293",
  },
} as const;

export const whatsappUrl = (message?: string) =>
  `https://wa.me/${siteConfig.contact.whatsappNumber}${
    message ? `?text=${encodeURIComponent(message)}` : ""
  }`;

export const mailtoUrl = (subject?: string) =>
  `mailto:${siteConfig.contact.email}${subject ? `?subject=${encodeURIComponent(subject)}` : ""}`;

export const absoluteUrl = (path: string) => `${siteConfig.url}${path === "/" ? "" : path}`;

export const caseStudyPath = `/work/${siteConfig.caseStudy.slug}` as const;

/** Every public page. Used by the sitemap and by the link-integrity test. */
export const publicPaths = ["/", "/about", "/start-a-project", caseStudyPath, "/privacy"] as const;
