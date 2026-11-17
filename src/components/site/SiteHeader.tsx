import { useEffect, useRef, useState } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { track } from "@/lib/analytics";
import { siteConfig } from "@/lib/site-config";
import logoImage from "@/assets/hooze-logo-160.png";

const navItems = [
  ["Hooze AI", "hooze-ai"],
  ["Engineering", "engineering"],
  ["Our work", "work"],
  ["About", "about"],
  ["Free guide", "guide"],
] as const;

export function SiteHeader({ solid = false }: { solid?: boolean }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const menuButton = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const update = () => setScrolled(window.scrollY > 32);
    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);

  // Escape closes the mobile menu and returns focus to its button.
  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setMenuOpen(false);
        menuButton.current?.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [menuOpen]);

  const closeMenu = () => setMenuOpen(false);
  const showBackground = solid || scrolled || menuOpen;

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 border-b transition-all duration-300 ${
        showBackground
          ? "border-border bg-background/95 backdrop-blur-md"
          : "border-transparent bg-transparent"
      }`}
    >
      <div className="mx-auto flex h-[76px] max-w-[1440px] items-center justify-between px-5 md:px-10 xl:px-16">
        <Link to="/" aria-label="Hooze Enterprises home" className="flex items-center gap-3">
          <img
            src={logoImage}
            alt=""
            width={56}
            height={56}
            className="size-11 object-cover md:size-12"
          />
          <span className="border-l border-border pl-3 font-mono text-[10px] uppercase leading-tight tracking-[0.14em] text-muted-foreground">
            HOOZE ENTERPRISES
            <br />
            {siteConfig.tagline.toUpperCase()}
          </span>
        </Link>
        <nav aria-label="Main navigation" className="hidden items-center gap-7 lg:flex">
          {navItems.map(([label, id]) => (
            <Link
              key={id}
              to="/"
              hash={id}
              className="text-xs text-muted-foreground transition-colors hover:text-foreground"
            >
              {label}
            </Link>
          ))}
          <Button asChild size="sm" className="ml-1 h-10 rounded-sm px-4 text-xs">
            <a
              href={siteConfig.productUrl}
              target="_blank"
              rel="noreferrer"
              onClick={() => track("cta_explore_hooze_ai", { location: "header" })}
            >
              Explore Hooze AI <ArrowUpRight aria-hidden="true" />
            </a>
          </Button>
        </nav>
        <Button
          ref={menuButton}
          aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
          aria-expanded={menuOpen}
          aria-controls="mobile-navigation"
          onClick={() => setMenuOpen(!menuOpen)}
          variant="ghost"
          size="icon"
          className="lg:hidden"
        >
          {menuOpen ? <X /> : <Menu />}
        </Button>
      </div>
      {menuOpen && (
        <nav
          id="mobile-navigation"
          aria-label="Mobile navigation"
          className="max-h-[calc(100svh-76px)] overflow-y-auto border-t border-border bg-background px-5 py-4 lg:hidden"
        >
          {navItems.map(([label, id], index) => (
            <Link
              key={id}
              to="/"
              hash={id}
              onClick={closeMenu}
              className="flex items-center justify-between border-b border-border py-4 text-base"
            >
              {label}
              <span className="font-mono text-xs text-muted-foreground">0{index + 1}</span>
            </Link>
          ))}
          <Link
            to="/start-a-project"
            onClick={closeMenu}
            className="flex items-center justify-between border-b border-border py-4 text-base"
          >
            Start a project
            <ArrowUpRight aria-hidden="true" className="size-4 text-muted-foreground" />
          </Link>
          <Button asChild className="mt-5 h-11 w-full rounded-sm">
            <a href={siteConfig.productUrl} target="_blank" rel="noreferrer" onClick={closeMenu}>
              Explore Hooze AI <ArrowUpRight aria-hidden="true" />
            </a>
          </Button>
        </nav>
      )}
    </header>
  );
}
