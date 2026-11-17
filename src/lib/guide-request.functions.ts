import { createServerFn } from "@tanstack/react-start";
import { guideRequestSchema } from "@/lib/guide-request-schema";
import { createRateLimiter } from "@/lib/rate-limit";

// 5 requests per IP per 10 minutes (best effort; see rate-limit.ts).
const allow = createRateLimiter(5, 10 * 60_000);

export const submitGuideRequest = createServerFn({ method: "POST" })
  .inputValidator((input: unknown) => guideRequestSchema.parse(input))
  .handler(async ({ data }) => {
    // Honeypot filled: pretend success so bots learn nothing, store nothing.
    if (data.website) return { success: true };

    const { getRequestIP } = await import("@tanstack/react-start/server");
    const ip = getRequestIP({ xForwardedFor: true }) ?? "unknown";
    if (!allow(`guide:${ip}`)) {
      throw new Error("Too many requests. Please wait a few minutes and try again.");
    }

    const { insertGuideRequest, recentDuplicate, notifyOwner } = await import("@/lib/leads.server");
    try {
      // The same person asking twice should still get their download, without a duplicate row.
      if (await recentDuplicate("guide_download_requests", data.email, 24 * 60)) {
        return { success: true };
      }
      await insertGuideRequest({
        full_name: data.fullName,
        email: data.email,
        phone: data.phone ?? null,
        marketing_consent: data.marketingConsent,
      });
    } catch (error) {
      console.error("Unable to save a guide request.", error);
      throw new Error("We couldn’t prepare your guide just now. Please try again.");
    }

    await notifyOwner("New guide download", [
      `Name: ${data.fullName}`,
      `Email: ${data.email}`,
      `Marketing consent: ${data.marketingConsent ? "yes" : "no"}`,
    ]);
    return { success: true };
  });
