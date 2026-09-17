// Client-only. Captures UTM parameters and referrer on arrival, keeps a
// first-touch snapshot in localStorage (so a contact created weeks later
// still records how they originally found the site), and hands back the
// current-visit values for per-submission attribution. Never sends anything
// anywhere by itself — callers attach the result to a form submission.
const STORAGE_KEY = "hooze_first_touch_v1";
const SESSION_KEY = "hooze_session_id_v1";

export type AttributionSnapshot = {
  utmSource: string | null;
  utmMedium: string | null;
  utmCampaign: string | null;
  utmContent: string | null;
  landingPage: string | null;
  referrer: string | null;
};

function readCurrentVisit(): AttributionSnapshot {
  if (typeof window === "undefined") {
    return {
      utmSource: null,
      utmMedium: null,
      utmCampaign: null,
      utmContent: null,
      landingPage: null,
      referrer: null,
    };
  }
  const params = new URLSearchParams(window.location.search);
  return {
    utmSource: params.get("utm_source"),
    utmMedium: params.get("utm_medium"),
    utmCampaign: params.get("utm_campaign"),
    utmContent: params.get("utm_content"),
    landingPage: window.location.pathname,
    referrer: document.referrer || null,
  };
}

/** Call once, high in the app (e.g. root component), to persist first-touch
 * attribution the first time a visitor arrives with any tracked parameter. */
export function captureFirstTouch(): void {
  if (typeof window === "undefined") return;
  if (window.localStorage.getItem(STORAGE_KEY)) return;
  const visit = readCurrentVisit();
  const hasSignal = visit.utmSource || visit.utmMedium || visit.utmCampaign || visit.referrer;
  if (!hasSignal) return;
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(visit));
  } catch {
    // Storage can be unavailable (private browsing, quota) — attribution is a
    // nice-to-have, never worth failing the page over.
  }
}

/** Returns this visit's attribution for attaching to a form submission
 * (last-touch), falling back to the very first captured touch if this visit
 * carries no tracked parameters of its own. */
export function getSubmissionAttribution(): AttributionSnapshot {
  const current = readCurrentVisit();
  if (current.utmSource || current.utmMedium || current.utmCampaign) return current;
  if (typeof window === "undefined") return current;
  try {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (stored) return { ...current, ...(JSON.parse(stored) as AttributionSnapshot) };
  } catch {
    // Ignore malformed/unavailable storage — fall through to current visit.
  }
  return current;
}

/** Stable per-browser-session id for grouping site_events without ever
 * storing anything personally identifying. */
export function getSessionId(): string {
  if (typeof window === "undefined") return "server";
  try {
    let id = window.sessionStorage.getItem(SESSION_KEY);
    if (!id) {
      id = crypto.randomUUID();
      window.sessionStorage.setItem(SESSION_KEY, id);
    }
    return id;
  } catch {
    return "unavailable";
  }
}
