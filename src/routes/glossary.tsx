import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { KidNote } from "@/components/kid-note";
import { Page } from "@/components/page";
import { GLOSSARY } from "@/data/glossary";
import { seoHead } from "@/lib/seo";
import { GLOSSARY_EN } from "@/data/en/glossary";
import { useLocale } from "@/lib/locale";
import { LocalizedLink } from "@/components/localized-link";

export const Route = createFileRoute("/glossary")({
  component: GlossaryPage,
  head: () => seoHead("/glossary"),
});

export function GlossaryPage() {
  const locale = useLocale();
  const en = locale === "en";
  const glossary = en ? GLOSSARY_EN : GLOSSARY;
  const [q, setQ] = useState("");
  const filtered = useMemo(() => {
    const needle = q.trim().toLowerCase();
    if (!needle) return glossary;
    return glossary.filter((g) =>
      [g.term, g.cn, g.kid, g.tech].some((s) => s.toLowerCase().includes(needle)),
    );
  }, [glossary, q]);

  return (
    <Page
      kicker={en ? "Glossary" : "词汇"}
      title={en ? "The real names in the source" : "源码里的真名字"}
      lead={
        en
          ? "Plain-language and source-level meanings side by side. Open a term's chapter to return to the part of the story where it appears."
          : "小孩版和源码版对照。点词条右边的章节，跳回故事发生的地方。"
      }
    >
      <KidNote className="mb-8 max-w-3xl">
        {en
          ? "The three easiest pairs to confuse: inject (the baseplate waits) ≠ inject() (slide a note); sandbox (a fence) ≠ E2B (a move); scope (lockers) ≠ isolate (a separate tap)."
          : "最容易绊倒的三对：inject（底板等待）≠ inject()（塞纸条）；sandbox（围栏）≠ E2B（搬家）；scope（储物柜）≠ isolate（自己的水龙头）。"}
      </KidNote>

      <label className="mb-6 block">
        <span className="sr-only">{en ? "Filter terms" : "筛选词条"}</span>
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder={en ? "Filter terms and explanations…" : "筛选词条、中文、小孩版…"}
          className="h-11 w-full max-w-xl rounded-md bg-elevated px-4 text-sm text-fg shadow-[var(--shadow-border)] placeholder:text-subtle focus:outline-none focus:ring-2 focus:ring-accent/50"
        />
      </label>

      <p className="mb-4 text-sm text-muted tabular-nums">
        {filtered.length} {en ? "terms" : "条"}
      </p>

      {filtered.length === 0 ? (
        <p className="rounded-xl bg-surface px-4 py-8 text-center text-sm text-muted">
          {en
            ? "No matching term. Try plugin, journal, sandbox, or waterfall."
            : "没有这条词。试试插件、日记、围栏、洋葱。"}
        </p>
      ) : (
        <ul className="grid gap-3">
          {filtered.map((g) => (
            <li
              key={g.term}
              className="rounded-xl bg-surface p-5 shadow-[var(--shadow-border)] sm:p-6"
            >
              <div className="flex flex-wrap items-baseline justify-between gap-3">
                <div>
                  <h2 className="font-mono text-base text-fg">{g.term}</h2>
                  <p className="mt-1 text-sm text-accent">{g.cn}</p>
                </div>
                <ChapterLink href={g.href} en={en} />
              </div>
              <p className="mt-3 leading-relaxed">{g.kid}</p>
              <p className="mt-2 text-sm leading-relaxed text-muted">{g.tech}</p>
            </li>
          ))}
        </ul>
      )}
    </Page>
  );
}

function ChapterLink({ href, en }: { href: string; en: boolean }) {
  const className = "inline-flex min-h-11 items-center text-sm text-muted hover:text-fg";
  return (
    <LocalizedLink to={href} className={className}>
      {en ? "Open chapter" : "去这一章"}
    </LocalizedLink>
  );
}
