import { createServerFn } from "@tanstack/react-start";
import { helpTypes, projectEnquirySchema } from "@/lib/project-enquiry-schema";
import { createRateLimiter } from "@/lib/rate-limit";

// 3 enquiries per IP per 15 minutes (best effort; see rate-limit.ts).
const allow = createRateLimiter(3, 15 * 60_000);

export const submitProjectEnquiry = createServerFn({ method: "POST" })
  .inputValidator((input: unknown) => projectEnquirySchema.parse(input))
  .handler(async ({ data }) => {
    if (data.website) return { success: true };

    const { getRequestIP } = await import("@tanstack/react-start/server");
    const ip = getRequestIP({ xForwardedFor: true }) ?? "unknown";
    if (!allow(`enquiry:${ip}`)) {
      throw new Error("Too many requests. Please wait a few minutes and try again.");
    }

    const { insertProjectEnquiry, recentDuplicate, notifyOwner } =
      await import("@/lib/leads.server");
    try {
      if (await recentDuplicate("project_enquiries", data.email, 10)) return { success: true };
      await insertProjectEnquiry({
        full_name: data.fullName,
        email: data.email,
        company: data.company || null,
        help_type: data.helpType,
        message: data.message,
        contact_method: data.contactMethod,
        phone: data.phone || null,
      });
    } catch (error) {
      console.error("Unable to save a project enquiry.", error);
      throw new Error("We couldn’t send your enquiry just now. Please try again or use WhatsApp.");
    }

    const topic = helpTypes.find(([id]) => id === data.helpType)?.[1] ?? data.helpType;
    await notifyOwner(`New project enquiry: ${topic}`, [
      `Name: ${data.fullName}`,
      `Email: ${data.email}`,
      `Business: ${data.company || "-"}`,
      `Needs help with: ${topic}`,
      `Preferred contact: ${data.contactMethod}${data.phone ? ` (${data.phone})` : ""}`,
      "",
      data.message,
    ]);
    return { success: true };
  });
