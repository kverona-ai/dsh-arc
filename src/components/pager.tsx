import { Link } from "@tanstack/react-router";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { navNeighbors } from "@/data/nav";

export function Pager({ pathname }: { pathname: string }) {
  const { prev, next } = navNeighbors(pathname);
  if (!prev && !next) return null;

  return (
    <nav
      className="mt-14 grid gap-3 border-t border-border pt-8 sm:grid-cols-2"
      aria-label="相邻章节"
    >
      {prev ? (
        <Link
          to={prev.to}
          className="group flex min-h-14 items-center gap-3 rounded-xl bg-surface px-4 py-3 shadow-[var(--shadow-border)] transition-[background-color,transform] duration-[var(--motion-fast)] ease-[var(--ease-out)] hover:-translate-y-0.5 hover:bg-elevated"
        >
          <ArrowLeft className="size-4 shrink-0 text-muted transition-transform group-hover:-translate-x-0.5" />
          <span>
            <span className="block font-mono text-[11px] tracking-widest text-subtle uppercase">
              上一章
            </span>
            <span className="block text-sm font-medium">{prev.label}</span>
          </span>
        </Link>
      ) : (
        <div />
      )}
      {next ? (
        <Link
          to={next.to}
          className="group flex min-h-14 items-center justify-end gap-3 rounded-xl bg-surface px-4 py-3 text-right shadow-[var(--shadow-border)] transition-[background-color,transform] duration-[var(--motion-fast)] ease-[var(--ease-out)] hover:-translate-y-0.5 hover:bg-elevated"
        >
          <span>
            <span className="block font-mono text-[11px] tracking-widest text-subtle uppercase">
              下一章
            </span>
            <span className="block text-sm font-medium">{next.label}</span>
          </span>
          <ArrowRight className="size-4 shrink-0 text-muted transition-transform group-hover:translate-x-0.5" />
        </Link>
      ) : null}
    </nav>
  );
}
