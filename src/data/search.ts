import { GLOSSARY } from "@/data/glossary";
import { GROUPS } from "@/data/groups";
import { NAV } from "@/data/nav";
import { PACKAGES } from "@/data/packages";

export type SearchHit = {
  id: string;
  kind: "page" | "group" | "package" | "term";
  title: string;
  hint: string;
  to: string;
  slug?: string;
};

function haystack(parts: Array<string | undefined>) {
  return parts.filter(Boolean).join(" ").toLowerCase();
}

export function searchIndex(): SearchHit[] {
  const pages: SearchHit[] = NAV.map((item) => ({
    id: `page:${item.to}`,
    kind: "page",
    title: item.label,
    hint: item.kid,
    to: item.to,
  }));

  const groups: SearchHit[] = GROUPS.map((g) => ({
    id: `group:${g.slug}`,
    kind: "group",
    title: g.name,
    hint: `${g.kid} · ${g.path}`,
    to: "/modules/$slug",
    slug: g.slug,
  }));

  const pkgs: SearchHit[] = PACKAGES.map((p) => ({
    id: `pkg:${p.npm}`,
    kind: "package",
    title: p.npm,
    hint: `${p.kid} · ${p.job}`,
    to: "/modules/$slug",
    slug: p.group,
  }));

  const terms: SearchHit[] = GLOSSARY.map((g) => ({
    id: `term:${g.term}`,
    kind: "term",
    title: `${g.term} · ${g.cn}`,
    hint: g.kid,
    to: "/glossary",
  }));

  return [...pages, ...groups, ...pkgs, ...terms];
}

export function searchHits(query: string, limit = 8): SearchHit[] {
  const needle = query.trim().toLowerCase();
  if (!needle) {
    return searchIndex()
      .filter((h) => h.kind === "page")
      .slice(0, limit);
  }
  const scored = searchIndex()
    .map((hit) => {
      const blob = haystack([hit.title, hit.hint, hit.slug, hit.to]);
      const idx = blob.indexOf(needle);
      if (idx < 0) return null;
      const boost = hit.kind === "page" ? 0 : hit.kind === "term" ? 1 : 2;
      return { hit, score: boost * 1000 + idx };
    })
    .filter((x): x is { hit: SearchHit; score: number } => x !== null)
    .sort((a, b) => a.score - b.score);
  return scored.slice(0, limit).map((s) => s.hit);
}

export const KIND_LABEL: Record<SearchHit["kind"], string> = {
  page: "页",
  group: "抽屉",
  package: "包",
  term: "词",
};
