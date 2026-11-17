import { describe, expect, it } from "vitest";
import { projectEnquirySchema } from "@/lib/project-enquiry-schema";

const valid = {
  fullName: "Ada Lovelace",
  email: "ada@example.com",
  helpType: "automation",
  message: "We answer the same customer questions on WhatsApp all day.",
};

describe("project enquiry", () => {
  it("accepts a minimal valid enquiry and defaults to email contact", () => {
    const r = projectEnquirySchema.safeParse(valid);
    expect(r.success).toBe(true);
    if (r.success) expect(r.data.contactMethod).toBe("email");
  });

  it("requires a real description and a known help type", () => {
    expect(projectEnquirySchema.safeParse({ ...valid, message: "too short" }).success).toBe(false);
    expect(projectEnquirySchema.safeParse({ ...valid, helpType: "hack-the-planet" }).success).toBe(
      false,
    );
    expect(projectEnquirySchema.safeParse({ ...valid, message: "x".repeat(2001) }).success).toBe(
      false,
    );
  });

  it("needs a number when WhatsApp or a call is preferred", () => {
    expect(projectEnquirySchema.safeParse({ ...valid, contactMethod: "whatsapp" }).success).toBe(
      false,
    );
    expect(
      projectEnquirySchema.safeParse({
        ...valid,
        contactMethod: "call",
        phone: "+234 801 234 5678",
      }).success,
    ).toBe(true);
  });

  it("rejects malformed phone characters and invalid emails", () => {
    expect(projectEnquirySchema.safeParse({ ...valid, phone: "<script>" }).success).toBe(false);
    expect(projectEnquirySchema.safeParse({ ...valid, email: "nope" }).success).toBe(false);
  });
});
