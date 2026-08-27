#!/usr/bin/env node
// Regenerates the crawler artifacts that enumerate module drawers — sitemap.xml
// and the drawer list in llms.txt — from src/data/groups.ts, so a new drawer
// never silently misses either one. Both locales get hreflang alternates.
import { readFileSync, writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const { GROUPS } = await import(join(root, "src/data/groups.ts"));
const { FAQS_EN } = await import(join(root, "src/data/en/faq.ts"));
const { GLOSSARY_EN } = await import(join(root, "src/data/en/glossary.ts"));

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

writeFileSync(join(root, "public/sitemap.xml"), xml);
console.log(`sitemap.xml — ${paths.length * 2} urls, lastmod ${lastmod}`);

/** Replace one `## Heading` section, up to the next heading or EOF. */
function replaceSection(text, heading, body) {
  const start = text.indexOf(`## ${heading}\n`);
  if (start === -1) throw new Error(`llms-full.txt has no "## ${heading}" section`);
  const after = text.indexOf("\n## ", start + 1);
  const tail = after === -1 ? "" : text.slice(after + 1);
  return `${text.slice(0, start)}## ${heading}\n\n${body}\n${tail}`;
}

// The digest's FAQ and glossary are generated from the same data the pages
// render, so a retrieval client gets the whole corpus in one fetch and the two
// copies cannot drift apart.
const llmsFullPath = join(root, "public/llms-full.txt");
let full = readFileSync(llmsFullPath, "utf8");
full = replaceSection(
  full,
  "FAQ",
  FAQS_EN.map((item) => `Q: ${item.q}\nA: ${item.a}`).join("\n\n"),
);
full = replaceSection(
  full,
  "Glossary",
  GLOSSARY_EN.map((term) => `${term.term} (${term.cn}): ${term.tech}`).join("\n"),
);
writeFileSync(llmsFullPath, full);
console.log(`llms-full.txt — ${FAQS_EN.length} answers, ${GLOSSARY_EN.length} terms`);

// llms.txt keeps one compact drawer list instead of 50 link lines: a retrieval
// client only needs the URL shape plus the slugs.
const MARKER = "## Module drawers";
const drawers = [
  MARKER,
  "",
  `Every drawer is ${ORIGIN}/en/modules/<slug> — drop /en for the Chinese page.`,
  "Each one lists that group's packages with npm name, ctx key, and job.",
  "",
  GROUPS.map((g) => g.slug).join(", "),
  "",
].join("\n");

const llmsPath = join(root, "public/llms.txt");
const llms = readFileSync(llmsPath, "utf8");
const at = llms.indexOf(MARKER);
writeFileSync(llmsPath, (at === -1 ? `${llms.trimEnd()}\n\n` : llms.slice(0, at)) + drawers);
console.log(`llms.txt — ${GROUPS.length} drawer slugs`);
