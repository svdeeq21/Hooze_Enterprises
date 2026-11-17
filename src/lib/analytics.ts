/**
 * Minimal, provider-agnostic conversion tracking.
 * Does nothing until an analytics script (Plausible, GA4 or Umami) is added to the page,
 * so it adds no dependency and sends no data by default.
 */
type Props = Record<string, string | number | boolean>;

declare global {
  interface Window {
    plausible?: (event: string, options?: { props?: Props }) => void;
    gtag?: (command: "event", event: string, props?: Props) => void;
    umami?: { track: (event: string, props?: Props) => void };
  }
}

export function track(event: string, props: Props = {}) {
  if (typeof window === "undefined") return;
  try {
    window.plausible?.(event, { props });
    window.gtag?.("event", event, props);
    window.umami?.track(event, props);
    if (import.meta.env.DEV) console.debug("[track]", event, props);
  } catch {
    /* analytics must never break the page */
  }
}
