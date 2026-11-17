import type { ReactNode } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import { track } from "@/lib/analytics";

export function Eyebrow({ children }: { children: ReactNode }) {
  return (
    <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-amber md:text-xs">
      {children}
    </p>
  );
}

const arrowLinkClass =
  "group inline-flex min-h-11 items-center gap-3 border-b border-amber/60 pb-1 text-sm font-medium text-foreground transition-colors hover:text-amber";
const arrowIcon = (
  <ArrowUpRight
    aria-hidden="true"
    className="size-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
  />
);

/** External links open in a new tab; internal ones use the router. */
export function ArrowLink({
  href,
  to,
  children,
  event,
}: {
  href?: string;
  to?:
    "/" | "/about" | "/start-a-project" | "/privacy" | "/work/praise-dynasty-whatsapp-sales-system";
  children: ReactNode;
  event?: string;
}) {
  if (to) {
    return (
      <Link to={to} className={arrowLinkClass} onClick={() => event && track(event)}>
        {children}
        {arrowIcon}
      </Link>
    );
  }
  return (
    <a
      href={href}
      className={arrowLinkClass}
      target="_blank"
      rel="noreferrer"
      onClick={() => event && track(event)}
    >
      {children}
      {arrowIcon}
    </a>
  );
}

type FieldProps = {
  id: string;
  label: string;
  error?: string | undefined;
  hint?: string;
  optional?: boolean;
  children: (aria: {
    id: string;
    "aria-invalid": boolean | undefined;
    "aria-describedby": string | undefined;
  }) => ReactNode;
};

/** Label + control + error wired together for screen readers. */
export function Field({ id, label, error, hint, optional, children }: FieldProps) {
  const describedBy = [error ? `${id}-error` : "", hint ? `${id}-hint` : ""]
    .filter(Boolean)
    .join(" ");
  return (
    <div className="grid gap-2">
      <label htmlFor={id} className="text-xs text-muted-foreground">
        {label}
        {optional && <span className="ml-1 text-muted-foreground/80">(optional)</span>}
      </label>
      {children({
        id,
        "aria-invalid": error ? true : undefined,
        "aria-describedby": describedBy || undefined,
      })}
      {hint && (
        <p id={`${id}-hint`} className="text-xs text-muted-foreground">
          {hint}
        </p>
      )}
      {error && (
        <p id={`${id}-error`} className="text-xs text-destructive">
          {error}
        </p>
      )}
    </div>
  );
}
