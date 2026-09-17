import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export const Route = createFileRoute("/admin/login")({
  component: AdminLogin,
});

function AdminLogin() {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setError("");
    const form = new FormData(event.currentTarget);
    const { error: signInError } = await supabase.auth.signInWithPassword({
      email: String(form.get("email")),
      password: String(form.get("password")),
    });
    setLoading(false);
    if (signInError) {
      setError("Sign-in failed. Check the email and password.");
      return;
    }
    void navigate({ to: "/admin" });
  }

  return (
    <div className="flex min-h-screen items-center justify-center px-4">
      <form onSubmit={handleSubmit} className="w-full max-w-sm border border-hairline p-8">
        <p className="mono-label text-signal">Hooze Admin</p>
        <h1 className="display mt-4 text-2xl">Sign in</h1>
        <div className="mt-6 grid gap-4">
          <label className="text-sm font-medium">
            Email
            <Input
              name="email"
              type="email"
              required
              className="mt-2 h-11 rounded-none bg-secondary/30 px-4"
            />
          </label>
          <label className="text-sm font-medium">
            Password
            <Input
              name="password"
              type="password"
              required
              className="mt-2 h-11 rounded-none bg-secondary/30 px-4"
            />
          </label>
        </div>
        {error && (
          <p role="alert" className="mt-4 text-sm text-destructive">
            {error}
          </p>
        )}
        <Button type="submit" className="mt-6 w-full" disabled={loading}>
          {loading ? "Signing in…" : "Sign in"}
        </Button>
        <p className="mt-6 text-xs text-muted-foreground">
          Access is limited to allowlisted Hooze admin accounts. Ask the site owner if you need
          access.
        </p>
      </form>
    </div>
  );
}
