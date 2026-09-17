// Server-only. Wraps requireSupabaseAuth (validates the bearer JWT against
// Supabase Auth) with an email allowlist, since Supabase Auth alone doesn't
// restrict *who* can hold an account — anyone could sign up unless email
// signups are disabled in the Supabase dashboard (see DEPLOYMENT.md).
// Every admin server function must run through requireAdmin() before it
// touches supabaseAdmin. This is the only gate standing between the public
// internet and every lead in the database, so it fails closed: no allowlist
// configured means no admin access, not open access.
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";
import { createMiddleware } from "@tanstack/react-start";

function getAdminEmails(): string[] {
  const raw = process.env["ADMIN_EMAILS"] ?? "";
  return raw
    .split(",")
    .map((email) => email.trim().toLowerCase())
    .filter(Boolean);
}

export const requireAdmin = createMiddleware({ type: "function" })
  .middleware([requireSupabaseAuth])
  .server(async ({ next, context }) => {
    const allowlist = getAdminEmails();
    const email = (context.claims["email"] as string | undefined)?.toLowerCase();
    if (allowlist.length === 0) {
      throw new Error("Unauthorized: no ADMIN_EMAILS configured for this environment.");
    }
    if (!email || !allowlist.includes(email)) {
      throw new Error("Unauthorized: this account is not on the admin allowlist.");
    }
    return next({ context: { ...context, adminEmail: email } });
  });
