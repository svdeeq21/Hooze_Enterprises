import { z } from "zod";

const emptyToUndefined = (value: unknown) =>
  typeof value === "string" && value.trim() === "" ? undefined : value;

export const guideRequestSchema = z.object({
  fullName: z.string().trim().min(2, "Please enter your name.").max(120),
  email: z.string().trim().email("Please enter a valid email address.").max(255),
  /** Optional. The form no longer asks for it; kept so older callers still validate. */
  phone: z.preprocess(
    emptyToUndefined,
    z
      .string()
      .trim()
      .min(6)
      .max(30)
      .regex(/^[+\d().\s-]+$/)
      .optional(),
  ),
  /** Separate, optional consent for marketing. Never required to get the guide. */
  marketingConsent: z.boolean().default(false),
  /** Honeypot: real visitors never see or fill this. */
  website: z.string().max(200).optional(),
});

export type GuideRequest = z.infer<typeof guideRequestSchema>;
