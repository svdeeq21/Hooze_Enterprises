// Layout route for everything under /admin. Deliberately does not render the
// marketing Nav/Footer (see __root.tsx, which special-cases this prefix) and
// carries a client-side session guard as a UX convenience — the real
// authorization boundary is server-side (requireAdmin on every admin server
// function), so a bypass of this guard alone can't reach any data.
import { createFileRoute, Link, Outlet, useNavigate, useRouterState } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/admin")({
  head: () => ({
    meta: [
      { title: "Admin — Hooze Enterprises" },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
  component: AdminLayout,
});

function AdminLayout() {
  const [status, setStatus] = useState<"checking" | "authed" | "anon">("checking");
  const navigate = useNavigate();
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const isLoginPage = pathname === "/admin/login";

  useEffect(() => {
    let active = true;
    supabase.auth.getSession().then(({ data }) => {
      if (!active) return;
      setStatus(data.session ? "authed" : "anon");
    });
    const { data: sub } = supabase.auth.onAuthStateChange((_event, session) => {
      setStatus(session ? "authed" : "anon");
    });
    return () => {
      active = false;
      sub.subscription.unsubscribe();
    };
  }, []);

  useEffect(() => {
    if (status === "anon" && !isLoginPage) void navigate({ to: "/admin/login" });
  }, [status, isLoginPage, navigate]);

  if (isLoginPage) {
    return (
      <div className="min-h-screen bg-background text-foreground">
        <Outlet />
      </div>
    );
  }

  if (status !== "authed") {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background text-sm text-muted-foreground">
        Checking session…
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="hair-b flex items-center justify-between px-6 py-4">
        <Link to="/admin" className="mono-label text-signal">
          Hooze Admin
        </Link>
        <nav className="flex gap-6 text-sm">
          <Link to="/admin" className="hover:text-signal">
            Dashboard
          </Link>
          <Link to="/admin/enquiries" className="hover:text-signal">
            Enquiries
          </Link>
          <Link to="/admin/resources" className="hover:text-signal">
            Resource requests
          </Link>
          <Link to="/admin/email-deliveries" className="hover:text-signal">
            Email failures
          </Link>
          <button
            onClick={() => void supabase.auth.signOut()}
            className="text-muted-foreground hover:text-foreground"
          >
            Sign out
          </button>
        </nav>
      </header>
      <main className="p-6">
        <Outlet />
      </main>
    </div>
  );
}
