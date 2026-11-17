import { existsSync, readFileSync, readdirSync, statSync } from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";
import { publicPaths, siteConfig } from "@/lib/site-config";

const root = path.resolve(__dirname, "../..");
const src = path.join(root, "src");

function walk(dir: string, out: string[] = []): string[] {
  for (const name of readdirSync(dir)) {
    const full = path.join(dir, name);
    if (statSync(full).isDirectory()) walk(full, out);
    else out.push(full);
  }
  return out;
}
const sourceFiles = walk(src).filter(
  (f) => /\.(ts|tsx)$/.test(f) && !f.includes("/test/") && !f.endsWith("routeTree.gen.ts"),
);
const allSource = sourceFiles.map((f) => readFileSync(f, "utf8")).join("\n");

describe("assets", () => {
  it("every local asset import points at a file that exists (the original Lovable build break)", () => {
    const imports = [...allSource.matchAll(/from\s+["']@\/assets\/([^"']+)["']/g)].map(
      (m) => m[1]!,
    );
    expect(imports.length).toBeGreaterThan(0);
    for (const file of imports) {
      expect(file, `${file} must not be a Lovable *.asset.json stub`).not.toMatch(/\.asset\.json$/);
      expect(existsSync(path.join(src, "assets", file)), `missing src/assets/${file}`).toBe(true);
    }
  });

  it("serves the guide PDF, social card and logo from public/", () => {
    for (const f of [
      siteConfig.guide.file,
      "/og-image.jpg",
      "/logo.png",
      "/favicon.png",
      "/robots.txt",
    ]) {
      expect(existsSync(path.join(root, "public", f)), `missing public${f}`).toBe(true);
    }
  });
});

describe("links", () => {
  it("every internal link target is a real route", () => {
    const targets = new Set<string>();
    for (const m of allSource.matchAll(/\bto=["'](\/[^"']*)["']/g)) targets.add(m[1]!);
    for (const m of allSource.matchAll(/\bto:\s*["'](\/[^"']*)["']/g)) targets.add(m[1]!);
    expect(targets.size).toBeGreaterThan(3);
    for (const t of targets) expect(publicPaths as readonly string[], `link to ${t}`).toContain(t);
  });

  it("every in-page #anchor used by the homepage exists as a section id", () => {
    const home = readFileSync(path.join(src, "routes/index.tsx"), "utf8");
    const header = readFileSync(path.join(src, "components/site/SiteHeader.tsx"), "utf8");
    const footer = readFileSync(path.join(src, "components/site/SiteFooter.tsx"), "utf8");
    const ids = new Set([...home.matchAll(/\bid="([a-z-]+)"/g)].map((m) => m[1]));
    const wanted = new Set<string>();
    for (const m of home.matchAll(/href="#([a-z-]+)"/g)) wanted.add(m[1]!);
    for (const m of header.matchAll(/\["[^"]+",\s*"([a-z-]+)"\]/g)) wanted.add(m[1]!);
    for (const m of footer.matchAll(/hash="([a-z-]+)"/g)) wanted.add(m[1]!);
    for (const id of wanted) expect(ids.has(id), `#${id} has no matching section id`).toBe(true);
  });

  it("no leftover links to the old site, placeholder domains or stale PDF addresses", () => {
    expect(allSource).not.toMatch(/vercel\.app/);
    expect(allSource).not.toMatch(/\.asset\.json/);
  });
});

describe("business facts", () => {
  it("does not label the Praise Dynasty deployment as 2025", () => {
    expect(siteConfig.caseStudy.year).toBe("2026");
    expect(allSource).not.toMatch(/PRAISE DYNASTY REALTY · 2025/i);
  });

  it("contact details come from one place (no hard-coded email or WhatsApp number in components)", () => {
    const outside = sourceFiles.filter((f) => !f.endsWith("site-config.ts"));
    for (const f of outside) {
      const text = readFileSync(f, "utf8");
      expect(text, f).not.toMatch(/hoozeenterprises@gmail\.com/);
      expect(text, f).not.toMatch(/2349150754870/);
    }
  });

  it("the guide copy matches the PDF's real page count", async () => {
    const pdf = readFileSync(path.join(root, "public", siteConfig.guide.file)).toString("latin1");
    const pages = [...pdf.matchAll(/\/Type\s*\/Page[^s]/g)].length;
    expect(pages).toBe(siteConfig.guide.pages);
  });
});
