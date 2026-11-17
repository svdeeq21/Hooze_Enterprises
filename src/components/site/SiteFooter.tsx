import { Link } from "@tanstack/react-router";
import { Eyebrow } from "@/components/site/primitives";
import { mailtoUrl, siteConfig, whatsappUrl } from "@/lib/site-config";

const linkClass = "w-fit text-xs text-muted-foreground transition-colors hover:text-foreground";

export function SiteFooter() {
  return (
    <footer className="border-t border-border bg-surface">
      <div className="mx-auto max-w-[1440px] px-5 md:px-10 xl:px-16">
        <div className="grid grid-cols-12 gap-x-0 gap-y-10 md:gap-x-10 py-12 md:py-16">
          <div className="col-span-12 md:col-span-5">
            <Link
              to="/"
              className="inline-flex items-center gap-3"
              aria-label="Hooze Enterprises home"
            >
              <span className="font-display text-2xl font-black">
                HOOZE<span className="text-amber">.</span>
              </span>
              <span className="border-l border-border pl-3 font-mono text-[10px] uppercase leading-tight tracking-[0.12em] text-muted-foreground">
                ENTERPRISES
                <br />
                {siteConfig.tagline.toUpperCase()}
              </span>
            </Link>
            <p className="mt-5 max-w-[350px] text-xs leading-5 text-muted-foreground">
              AI products, business automation and custom software built around real business
              problems.
            </p>
          </div>
          <nav aria-label="Footer navigation" className="col-span-6 md:col-span-2 md:col-start-7">
            <Eyebrow>EXPLORE</Eyebrow>
            <div className="mt-4 flex flex-col gap-3">
              <Link to="/" hash="hooze-ai" className={linkClass}>
                Hooze AI
              </Link>
              <Link to="/" hash="engineering" className={linkClass}>
                Engineering
              </Link>
              <Link to="/work/praise-dynasty-whatsapp-sales-system" className={linkClass}>
                Our work
              </Link>
              <Link to="/about" className={linkClass}>
                About
              </Link>
              <Link to="/start-a-project" className={linkClass}>
                Start a project
              </Link>
            </div>
          </nav>
          <div className="col-span-6 md:col-span-3">
            <Eyebrow>CONNECT</Eyebrow>
            <div className="mt-4 flex flex-col gap-3">
              <a href={whatsappUrl()} target="_blank" rel="noreferrer" className={linkClass}>
                WhatsApp Hooze
              </a>
              <a href={mailtoUrl()} className={`${linkClass} break-all`}>
                {siteConfig.contact.email}
              </a>
              <a
                href={siteConfig.productUrl}
                target="_blank"
                rel="noreferrer"
                className={linkClass}
              >
                Hooze AI ↗
              </a>
              <Link to="/privacy" className={linkClass}>
                Privacy policy
              </Link>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-3 border-t border-border py-5 font-mono text-[11px] uppercase tracking-[0.08em] text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <span>© {new Date().getFullYear()} Hooze Enterprises Nigeria</span>
          <span>{siteConfig.tagline.toUpperCase()}</span>
        </div>
      </div>
    </footer>
  );
}
