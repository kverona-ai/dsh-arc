#!/usr/bin/env node
// Regenerates public/sitemap.xml from the module groups, so a new drawer never
// silently misses the index. Both locales are emitted with hreflang alternates.
import { writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const { GROUPS } = await import(join(root, "src/data/groups.ts"));

const ORIGIN = "https://dsh.177.best";
const lastmod = process.env.SITEMAP_DATE || new Date().toISOString().slice(0, 10);

/** Top-level chapters, highest priority first. */
const PAGES = [
  ["/", 1.0],
  ["/story", 0.9],
  ["/principles", 0.9],
  ["/map", 0.8],
  ["/cordis", 0.8],
  ["/boot", 0.8],
  ["/loop", 0.8],
  ["/seams", 0.8],
  ["/events", 0.8],
  ["/modules", 0.8],
  ["/glossary", 0.7],
  ["/faq", 0.7],
];

const paths = [...PAGES, ...GROUPS.map((g) => [`/modules/${g.slug}`, 0.6])];

const zh = (path) => `${ORIGIN}${path === "/" ? "/" : path}`;
const en = (path) => `${ORIGIN}/en${path === "/" ? "" : path}`;

function entry(loc, path, priority) {
  return [
    "  <url>",
    `    <loc>${loc}</loc>`,
    `    <xhtml:link rel="alternate" hreflang="zh-CN" href="${zh(path)}"/>`,
    `    <xhtml:link rel="alternate" hreflang="en" href="${en(path)}"/>`,
    `    <xhtml:link rel="alternate" hreflang="x-default" href="${zh(path)}"/>`,
    `    <lastmod>${lastmod}</lastmod>`,
    "    <changefreq>weekly</changefreq>",
    `    <priority>${priority.toFixed(1)}</priority>`,
    "  </url>",
  ].join("\n");
}

const body = [
  ...paths.map(([path, priority]) => entry(zh(path), path, priority)),
  ...paths.map(([path, priority]) => entry(en(path), path, Math.max(0.5, priority - 0.1))),
].join("\n");

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
${body}
</urlset>
`;

const out = join(root, "public/sitemap.xml");
writeFileSync(out, xml);
console.log(`sitemap.xml — ${paths.length * 2} urls, lastmod ${lastmod}`);
