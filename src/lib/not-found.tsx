import { Compass } from "lucide-react";
import { NAV } from "@/data/nav";
import { NAV_EN } from "@/data/en/nav";
import { LocalizedLink } from "@/components/localized-link";
import { useLocale } from "@/lib/locale";

/**
 * The router's default 404. It answered with the shell and nothing else, so a
 * broken link led to a blank page with no way back.
 */
export function AppNotFound() {
  const en = useLocale() === "en";
  const nav = en ? NAV_EN : NAV;
  return (
    <main className="px-4 py-16 sm:px-8 sm:py-24 lg:px-12">
      <div className="max-w-2xl">
        <p className="mb-3 flex items-center gap-2 font-mono text-xs tracking-[0.18em] text-accent uppercase">
          <Compass className="size-4" />
          404
        </p>
        <h1 className="text-3xl leading-tight tracking-tight sm:text-5xl">
          {en ? "This brick is not in the box" : "盒子里没有这块积木"}
        </h1>
        <p className="mt-4 text-base leading-relaxed text-muted sm:text-lg">
          {en
            ? "The address does not match any chapter. Pick one below, or press ⌘K to search every package, drawer, and term."
            : "这个地址不对应任何一章。从下面挑一章，或者按 ⌘K 搜包名、抽屉和词汇。"}
        </p>
      </div>
      <nav
        className="mt-10 grid gap-2 sm:grid-cols-2 lg:grid-cols-3"
        aria-label={en ? "Chapters" : "章节"}
      >
        {nav.map((item) => (
          <LocalizedLink
            key={item.to}
            to={item.to}
            className="rounded-xl bg-elevated p-4 shadow-[var(--shadow-border)] transition-transform duration-[var(--motion-fast)] hover:-translate-y-0.5"
          >
            <span className="block font-medium">{item.label}</span>
            <span className="block text-sm text-muted">{item.kid}</span>
          </LocalizedLink>
        ))}
      </nav>
    </main>
  );
}
