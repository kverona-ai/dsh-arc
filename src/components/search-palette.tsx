import { useNavigate } from "@tanstack/react-router";
import { Search } from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";
import type { NavPath } from "@/data/nav";
import { KIND_LABEL, searchHits, type SearchHit } from "@/data/search";
import { cn } from "@/lib/utils";

export function SearchTrigger({ onOpen }: { onOpen: () => void }) {
  return (
    <button
      type="button"
      onClick={onOpen}
      className="flex h-11 w-full items-center gap-2 rounded-md bg-elevated px-3 text-left text-sm text-muted shadow-[var(--shadow-border)] hover:text-fg"
    >
      <Search className="size-4 shrink-0" />
      <span className="min-w-0 flex-1 truncate">搜索积木、包、词…</span>
      <kbd className="hidden rounded-sm bg-surface px-1.5 py-0.5 font-mono text-[10px] text-subtle sm:inline">
        Ctrl+K
      </kbd>
    </button>
  );
}

export function SearchPalette({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const [q, setQ] = useState("");
  const [active, setActive] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();
  const hits = useMemo(() => searchHits(q), [q]);

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
  }, [open]);

  useEffect(() => {
    setActive(0);
  }, [q]);

  function go(hit: SearchHit) {
    onClose();
    if (hit.slug) {
      void navigate({ to: "/modules/$slug", params: { slug: hit.slug } });
      return;
    }
    void navigate({ to: hit.to as NavPath });
  }

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50">
      <button
        type="button"
        className="absolute inset-0 bg-ink/70"
        aria-label="关闭搜索"
        onClick={onClose}
      />
      <div
        role="dialog"
        aria-modal="true"
        aria-label="搜索"
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
            placeholder="搜页面、抽屉、包名、词汇…"
            className="h-14 w-full bg-transparent text-sm text-fg placeholder:text-subtle focus:outline-none"
          />
        </label>
        <ul className="max-h-80 overflow-y-auto p-2">
          {hits.length === 0 ? (
            <li className="px-3 py-8 text-center text-sm text-muted">没有找到这块积木。</li>
          ) : (
            hits.map((hit, i) => (
              <li key={hit.id}>
                <button
                  type="button"
                  onMouseEnter={() => setActive(i)}
                  onClick={() => go(hit)}
                  className={cn(
                    "flex min-h-11 w-full items-center gap-3 rounded-lg px-3 py-2 text-left",
                    i === active ? "bg-elevated text-fg" : "text-muted hover:bg-elevated hover:text-fg",
                  )}
                >
                  <span className="w-10 shrink-0 font-mono text-[10px] tracking-widest text-accent uppercase">
                    {KIND_LABEL[hit.kind]}
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
