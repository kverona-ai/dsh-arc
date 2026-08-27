import { useNavigate } from "@tanstack/react-router";
import { Search } from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";
import { KIND_LABEL, KIND_LABEL_EN, searchHits, type SearchHit } from "@/data/search";
import { cn } from "@/lib/utils";
import { localizedPath, useLocale } from "@/lib/locale";

export function SearchTrigger({ onOpen }: { onOpen: () => void }) {
  const locale = useLocale();
  return (
    <button
      type="button"
      onClick={onOpen}
      className="flex h-11 w-full items-center gap-2 rounded-md bg-elevated px-3 text-left text-sm text-muted shadow-[var(--shadow-border)] hover:text-fg"
    >
      <Search className="size-4 shrink-0" />
      <span className="min-w-0 flex-1 truncate">
        {locale === "en" ? "Search bricks, packages, terms…" : "搜索积木、包、词…"}
      </span>
      <kbd className="hidden rounded-sm bg-surface px-1.5 py-0.5 font-mono text-[10px] text-subtle sm:inline">
        Ctrl+K
      </kbd>
    </button>
  );
}

export function SearchPalette({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [q, setQ] = useState("");
  const [active, setActive] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();
  const locale = useLocale();
  const hits = useMemo(() => searchHits(q, 8, locale), [q, locale]);
  const kindLabel = locale === "en" ? KIND_LABEL_EN : KIND_LABEL;

  useEffect(() => {
    if (!open) return;
    setQ("");
    setActive(0);
    const id = window.setTimeout(() => inputRef.current?.focus(), 10);
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    window.addEventListener("keydown", onKey);
    return () => {
      window.clearTimeout(id);
      window.removeEventListener("keydown", onKey);
    };
  }, [onClose, open]);

  useEffect(() => {
    setActive(0);
  }, [q]);

  function go(hit: SearchHit) {
    onClose();
    const target = hit.slug ? `/modules/${hit.slug}` : hit.to;
    void navigate({ to: localizedPath(target, locale) as never });
  }

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50">
      <button
        type="button"
        className="absolute inset-0 bg-ink/70"
        aria-label={locale === "en" ? "Close search" : "关闭搜索"}
        onClick={onClose}
      />
      <div
        role="dialog"
        aria-modal="true"
        aria-label={locale === "en" ? "Search" : "搜索"}
        className="relative mx-auto mt-[12vh] w-[min(36rem,calc(100%-1.5rem))] overflow-hidden rounded-2xl bg-surface shadow-[var(--shadow-lift)]"
      >
        <label className="flex items-center gap-3 border-b border-border px-4">
          <Search className="size-4 text-muted" />
          <input
            ref={inputRef}
            value={q}
            onChange={(e) => setQ(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Escape") {
                e.preventDefault();
                onClose();
              } else if (e.key === "ArrowDown") {
                e.preventDefault();
                setActive((i) => Math.min(i + 1, Math.max(hits.length - 1, 0)));
              } else if (e.key === "ArrowUp") {
                e.preventDefault();
                setActive((i) => Math.max(i - 1, 0));
              } else if (e.key === "Enter") {
                const hit = hits[active];
                if (hit) go(hit);
              }
            }}
            placeholder={
              locale === "en"
                ? "Search pages, groups, packages, and terms…"
                : "搜页面、抽屉、包名、词汇…"
            }
            className="h-14 w-full bg-transparent text-sm text-fg placeholder:text-subtle focus:outline-none"
          />
        </label>
        <ul className="max-h-80 overflow-y-auto p-2">
          {hits.length === 0 ? (
            <li className="px-3 py-8 text-center text-sm text-muted">
              {locale === "en" ? "No matching brick found." : "没有找到这块积木。"}
            </li>
          ) : (
            hits.map((hit, i) => (
              <li key={hit.id}>
                <button
                  type="button"
                  onMouseEnter={() => setActive(i)}
                  onClick={() => go(hit)}
                  className={cn(
                    "flex min-h-11 w-full items-center gap-3 rounded-lg px-3 py-2 text-left",
                    i === active
                      ? "bg-elevated text-fg"
                      : "text-muted hover:bg-elevated hover:text-fg",
                  )}
                >
                  <span className="w-10 shrink-0 font-mono text-[10px] tracking-widest text-accent uppercase">
                    {kindLabel[hit.kind]}
                  </span>
                  <span className="min-w-0">
                    <span className="block truncate text-sm font-medium text-fg">{hit.title}</span>
                    <span className="block truncate text-xs text-subtle">{hit.hint}</span>
                  </span>
                </button>
              </li>
            ))
          )}
        </ul>
      </div>
    </div>
  );
}
