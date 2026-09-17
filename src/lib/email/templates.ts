// Plain-text-first email templates. No client-side rendering dependency —
// these are plain functions so they can run in a server function with no
// React server-rendering involved.
import { absoluteUrl } from "@/lib/site-config";

const PROJECT_TYPE_LABELS: Record<string, string> = {
  "custom-software": "Custom software",
  "business-automation": "Business automation",
  "intelligent-system": "Intelligent system / AI",
  "digital-product": "Digital product",
  "not-sure": "Not sure yet",
};

function wrap(title: string, bodyHtml: string): string {
  return `<!doctype html><html><body style="margin:0;background:#0b0d10;font-family:Arial,Helvetica,sans-serif;color:#e7e7e7;">
  <div style="max-width:560px;margin:0 auto;padding:32px 20px;">
    <p style="font-size:11px;letter-spacing:.08em;text-transform:uppercase;color:#c6a366;margin:0 0 24px;">Hooze Enterprises</p>
    <h1 style="font-size:22px;margin:0 0 16px;color:#fff;">${title}</h1>
    ${bodyHtml}
    <p style="margin-top:32px;padding-top:16px;border-top:1px solid #2a2d33;font-size:12px;color:#9a9a9a;">
      Hooze Enterprises · Nigeria · hoozeenterprises@gmail.com<br/>
      Landed in spam or promotions? Please mark it "not spam" so future emails reach your inbox.
    </p>
  </div></body></html>`;
}

export function enquiryConfirmationEmail(params: {
  name: string;
  businessName: string;
  projectType: string;
  problem: string;
  reference: string;
}) {
  const typeLabel = PROJECT_TYPE_LABELS[params.projectType] ?? params.projectType;
  const subject = "We received your enquiry — Hooze Enterprises";
  const text = `Hi ${params.name},

Thanks for telling us about ${params.businessName}. Your enquiry has been recorded.

Reference: ${params.reference}
Project type: ${typeLabel}
What you told us: ${params.problem}

What happens next:
1. Hooze reviews the business problem you described.
2. We follow up using your preferred contact method.
3. If there's a fit, we arrange a focused discovery conversation.

Submitting an enquiry does not create a client relationship or guarantee availability.

(This landed in spam or promotions? Please mark it "not spam" so future emails reach your inbox.)

— Hooze Enterprises
hoozeenterprises@gmail.com`;
  const html = wrap(
    "We received your enquiry.",
    `<p style="line-height:1.6;">Hi ${escapeHtml(params.name)},</p>
     <p style="line-height:1.6;">Thanks for telling us about <strong>${escapeHtml(params.businessName)}</strong>. Your enquiry has been recorded.</p>
     <p style="line-height:1.6;font-size:13px;color:#9a9a9a;">Reference: ${escapeHtml(params.reference)}<br/>Project type: ${escapeHtml(typeLabel)}</p>
     <p style="line-height:1.6;"><strong>What you told us:</strong><br/>${escapeHtml(params.problem)}</p>
     <p style="line-height:1.6;"><strong>What happens next</strong></p>
     <ol style="line-height:1.8;padding-left:20px;">
       <li>Hooze reviews the business problem you described.</li>
       <li>We follow up using your preferred contact method.</li>
       <li>If there's a fit, we arrange a focused discovery conversation.</li>
     </ol>
     <p style="line-height:1.6;font-size:12px;color:#9a9a9a;">Submitting an enquiry does not create a client relationship or guarantee availability.</p>`,
  );
  return { subject, html, text };
}

export function internalNotificationEmail(params: {
  reference: string;
  name: string;
  businessName: string;
  email: string;
  whatsapp: string;
  projectType: string;
  problem: string;
  budgetRange: string;
  timeline: string;
  preferredContact: string;
  source: string;
}) {
  const typeLabel = PROJECT_TYPE_LABELS[params.projectType] ?? params.projectType;
  const subject = `New enquiry: ${params.businessName} (${typeLabel})`;
  const lines = [
    `Reference: ${params.reference}`,
    `Name: ${params.name}`,
    `Business: ${params.businessName}`,
    `Email: ${params.email}`,
    `WhatsApp: ${params.whatsapp || "—"}`,
    `Project type: ${typeLabel}`,
    `Budget: ${params.budgetRange || "—"}`,
    `Timeline: ${params.timeline || "—"}`,
    `Preferred contact: ${params.preferredContact}`,
    `Source: ${params.source}`,
    "",
    "Problem:",
    params.problem,
  ];
  const text = lines.join("\n");
  const html = wrap(
    "New project enquiry",
    `<table style="width:100%;border-collapse:collapse;font-size:14px;">
      ${lines
        .slice(0, 10)
        .map(
          (line) =>
            `<tr><td style="padding:4px 0;color:#9a9a9a;">${escapeHtml(line.split(":")[0] ?? "")}</td><td style="padding:4px 0;">${escapeHtml(line.split(":").slice(1).join(":").trim())}</td></tr>`,
        )
        .join("")}
     </table>
     <p style="margin-top:16px;"><strong>Problem</strong></p>
     <p style="line-height:1.6;white-space:pre-wrap;">${escapeHtml(params.problem)}</p>`,
  );
  return { subject, html, text };
}

export function resourceEmail(params: { name: string }) {
  const downloadUrl = absoluteUrl("/resources/business-automation-starter-kit.pdf");
  const subject = "Your Business Automation Starter Kit";
  const text = `Hi ${params.name},

Here is your copy of the Business Automation Starter Kit:
${downloadUrl}

It covers how to spot repetitive work, a short process-audit worksheet, common tasks businesses automate first, a customer follow-up checklist, and questions worth asking before buying any automation tool.

If a specific problem stands out after reading it, you can tell us about it here:
${absoluteUrl("/start-a-project")}

(This landed in spam or promotions? Please mark it "not spam" so future emails reach your inbox.)

— Hooze Enterprises
hoozeenterprises@gmail.com`;
  const html = wrap(
    "Your Business Automation Starter Kit",
    `<p style="line-height:1.6;">Hi ${escapeHtml(params.name)},</p>
     <p style="line-height:1.6;">Here's your copy — a short, practical guide to finding the repetitive work in your business worth fixing first.</p>
     <p style="margin:24px 0;"><a href="${downloadUrl}" style="background:#c6a366;color:#0b0d10;padding:12px 20px;text-decoration:none;font-weight:bold;">Download the guide</a></p>
     <p style="line-height:1.6;font-size:13px;color:#9a9a9a;">If a specific problem stands out after reading it, you're welcome to <a href="${absoluteUrl("/start-a-project")}" style="color:#c6a366;">tell us about it</a> — no pressure either way.</p>`,
  );
  return { subject, html, text };
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}
