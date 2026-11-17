import { describe, expect, it } from "vitest";
import { guideRequestSchema } from "@/lib/guide-request-schema";
import { additionalSectors, industries } from "@/lib/industries";

describe("guide request details", () => {
  it("accepts a name and email only (phone is no longer required)", () => {
    const result = guideRequestSchema.safeParse({
      fullName: "Jane Doe",
      email: "jane@example.com",
    });
    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data.marketingConsent).toBe(false);
      expect(result.data.phone).toBeUndefined();
    }
  });

  it("treats an empty phone as not provided but validates one that is given", () => {
    expect(
      guideRequestSchema.safeParse({ fullName: "Jane Doe", email: "j@example.com", phone: "" })
        .success,
    ).toBe(true);
    expect(
      guideRequestSchema.safeParse({
        fullName: "Jane Doe",
        email: "j@example.com",
        phone: "+234 801 234 5678",
      }).success,
    ).toBe(true);
    expect(
      guideRequestSchema.safeParse({
        fullName: "Jane Doe",
        email: "j@example.com",
        phone: "0801<script>",
      }).success,
    ).toBe(false);
  });

  it("rejects invalid email addresses and too-short names", () => {
    expect(
      guideRequestSchema.safeParse({ fullName: "Jane Doe", email: "not-an-email" }).success,
    ).toBe(false);
    expect(guideRequestSchema.safeParse({ fullName: "J", email: "jane@example.com" }).success).toBe(
      false,
    );
  });

  it("keeps marketing consent separate and opt-in", () => {
    const r = guideRequestSchema.parse({
      fullName: "Jane Doe",
      email: "j@example.com",
      marketingConsent: true,
    });
    expect(r.marketingConsent).toBe(true);
  });
});

describe("website sectors", () => {
  it("lists four primary sectors, only one marked as deployed", () => {
    expect(industries).toHaveLength(4);
    expect(industries.filter((i) => i.deployed).map((i) => i.title)).toEqual(["Real estate"]);
  });

  it("gives every photo card alt text, and the retail card does not reuse another sector's image", () => {
    const images = industries.filter((i) => i.image).map((i) => i.image);
    expect(new Set(images).size).toBe(images.length);
    industries.filter((i) => i.image).forEach((i) => expect(i.alt.length).toBeGreaterThan(10));
    expect(industries.find((i) => i.title.startsWith("Retail"))?.image).toBeNull();
    expect(additionalSectors).toMatch(/professional services/i);
  });
});
