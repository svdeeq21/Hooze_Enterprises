import type { ReactNode } from "react";
import { SiteFooter } from "@/components/site/SiteFooter";
import { SiteHeader } from "@/components/site/SiteHeader";
import { useRevealOnScroll } from "@/components/site/use-reveal";

/** Layout for every inner page: skip link, solid header, main landmark, footer. */
export function PageShell({ children }: { children: ReactNode }) {
  useRevealOnScroll();
  return (
    <div className="bg-background text-foreground">
      <a href="#main" className="skip-link">
        Skip to content
      </a>
      <SiteHeader solid />
      <main id="main" className="overflow-hidden pt-[76px]">
        {children}
      </main>
      <SiteFooter />
    </div>
  );
}
