import type { ReactNode } from "react";
import { SiteFooter } from "@/components/site/SiteFooter";
import { SiteHeader } from "@/components/site/SiteHeader";
import { useRevealOnScroll } from "@/components/site/use-reveal";

/** Homepage layout: transparent header over the hero (no top padding on main). */
export function PageShellHome({ children }: { children: ReactNode }) {
  useRevealOnScroll();
  return (
    <div className="bg-background text-foreground">
      <a href="#main" className="skip-link">
        Skip to content
      </a>
      <SiteHeader />
      <main id="main" className="overflow-hidden">
        {children}
      </main>
      <SiteFooter />
    </div>
  );
}
