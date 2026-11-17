import { z } from "zod";

export const helpTypes = [
  ["hooze-ai", "Hooze AI (WhatsApp sales conversations)"],
  ["automation", "Business automation"],
  ["ai-application", "An AI-powered application"],
  ["custom-software", "Custom business software"],
  ["integration", "Connecting AI to tools I already use"],
  ["not-sure", "I'm not sure yet"],
] as const;

export const contactMethods = [
  ["email", "Email"],
  ["whatsapp", "WhatsApp"],
  ["call", "Phone call"],
] as const;

const helpTypeIds = helpTypes.map(([id]) => id) as [string, ...string[]];
const contactMethodIds = contactMethods.map(([id]) => id) as [string, ...string[]];

export const projectEnquirySchema = z
  .object({
    fullName: z.string().trim().min(2, "Please enter your name.").max(120),
    email: z.string().trim().email("Please enter a valid email address.").max(255),
    company: z.string().trim().max(120).optional().default(""),
    helpType: z.enum(helpTypeIds, { errorMap: () => ({ message: "Please choose an option." }) }),
    message: z
      .string()
      .trim()
      .min(20, "Please describe the problem in at least a sentence or two.")
      .max(2000, "Please keep this under 2,000 characters."),
    contactMethod: z.enum(contactMethodIds).default("email"),
    phone: z
      .string()
      .trim()
      .max(30)
      .regex(/^[+\d().\s-]*$/, "Use digits, spaces and + only.")
      .optional()
      .default(""),
    /** Honeypot: real visitors never see or fill this. */
    website: z.string().max(200).optional(),
  })
  .superRefine((value, ctx) => {
    if (value.contactMethod !== "email" && value.phone.replace(/\D/g, "").length < 6) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["phone"],
        message: "Please add the number we should use.",
      });
    }
  });

export type ProjectEnquiry = z.infer<typeof projectEnquirySchema>;
