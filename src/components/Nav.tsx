import { Link } from "@tanstack/react-router";
import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { nav } from "@/data/content";
import logo from "@/assets/hooze-logo.png";

export function Nav() {
  const [open, setOpen] = useState(false);
  useEffect(() => {
    if (!open) return;
    const close = (event: KeyboardEvent) => event.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", close);
    return () => window.removeEventListener("keydown", close);
  }, [open]);
  return (
    <header className="sticky top-0 z-50 hair-b bg-background/90 backdrop-blur-lg">
      <div className="gutter flex h-20 items-center justify-between">
        <Link
          to="/"
          className="flex items-center gap-3"
          aria-label="Hooze Enterprises home"
          onClick={() => setOpen(false)}
        >
          <img src={logo} alt="" width={52} height={52} className="h-11 w-11 object-contain" />
          <span>
            <span className="display block text-base">
              Hooze <span className="text-signal">Enterprises</span>
            </span>
            <span className="mono-label block text-[0.58rem]">Builders of the 1%</span>
          </span>
        </Link>
        <nav className="hidden items-center gap-9 md:flex" aria-label="Main navigation">
          {nav.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className="mono-label hover:text-foreground data-[status=active]:text-signal"
            >
              {item.label}
            </Link>
          ))}
          <Link
            to="/start-a-project"
            className="mono-label border border-signal px-4 py-3 text-signal hover:bg-signal hover:text-primary-foreground"
          >
            Start a project
          </Link>
        </nav>
        <button
          type="button"
          className="icon-button md:hidden"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          aria-controls="mobile-menu"
          onClick={() => setOpen((value) => !value)}
        >
          {open ? <X /> : <Menu />}
        </button>
      </div>
      {open && (
        <nav
          id="mobile-menu"
          className="gutter hair-t flex flex-col gap-7 py-8 md:hidden"
          aria-label="Mobile navigation"
        >
          {nav.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              onClick={() => setOpen(false)}
              className="display text-4xl"
            >
              {item.label}
            </Link>
          ))}
          <Link
            to="/start-a-project"
            onClick={() => setOpen(false)}
            className="display text-4xl text-signal"
          >
            Start a project
          </Link>
        </nav>
      )}
    </header>
  );
}
