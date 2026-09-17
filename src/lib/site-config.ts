// Shared, non-secret site configuration. Safe to import from client or server
// code. Secrets (Gmail App Password, Supabase service role key, admin allowlist)
// live only in *.server.ts modules and are read directly from process.env there.

/** Absolute production origin, no trailing slash. Falls back to the current
 * Vercel deployment URL, then to the known project domain, so canonical URLs
 * and emails never silently ship with a localhost/preview origin. */
export function getSiteUrl(): string {
  const configured =
    import.meta.env["VITE_SITE_URL"] ||
    (typeof process !== "undefined" ? process.env["SITE_URL"] : undefined);
  if (configured) return configured.replace(/\/$/, "");
  const vercelUrl = typeof process !== "undefined" ? process.env["VERCEL_URL"] : undefined;
  if (vercelUrl) return `https://${vercelUrl}`;
  return "https://hoozeenterprises.vercel.app";
}

export function absoluteUrl(path: string): string {
  const base = getSiteUrl();
  return `${base}${path.startsWith("/") ? path : `/${path}`}`;
}
