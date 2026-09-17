// Client-side convenience wrapper around logSiteEvent. Always fire-and-forget
// — analytics must never block or throw into the UI.
import { logSiteEvent, type SiteEventType } from "@/lib/analytics.functions";
import { getSessionId, getSubmissionAttribution } from "@/lib/attribution";

export function track(
  eventType: SiteEventType,
  metadata?: Record<string, string | number | boolean>,
): void {
  if (typeof window === "undefined") return;
  const attribution = getSubmissionAttribution();
  void logSiteEvent({
    data: {
      eventType,
      sessionId: getSessionId(),
      utmSource: attribution.utmSource,
      utmMedium: attribution.utmMedium,
      utmCampaign: attribution.utmCampaign,
      utmContent: attribution.utmContent,
      landingPage: attribution.landingPage,
      referrer: attribution.referrer,
      metadata,
    },
  }).catch(() => {
    // Swallow — a failed analytics call is never worth surfacing to the user.
  });
}
