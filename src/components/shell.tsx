import { useRouterState } from "@tanstack/react-router";
import { Menu, Search, X } from "lucide-react";
import { useEffect, useState, type ReactNode } from "react";
import { NAV, navIsActive } from "@/data/nav";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { SearchPalette, SearchTrigger } from "@/components/search-palette";
import { SeoBlock } from "@/components/seo-block";
import { SiteFooter } from "@/components/site-footer";
import { LanguageSwitcher } from "@/components/language-switcher";
import { LocaleSuggestion } from "@/components/locale-suggestion";
import { NAV_EN } from "@/data/en/nav";
import { useLocale } from "@/lib/locale";
import { LocalizedLink } from "@/components/localized-link";

export function AppShell({ children }: { children: ReactNode }) {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const locale = useLocale();
  const nav = locale === "en" ? NAV_EN : NAV;
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState(false);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setSearch((v) => !v);
      }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <div className="min-h-dvh">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:top-3 focus:left-3 focus:z-50 focus:rounded-md focus:bg-accent focus:px-3 focus:py-2 focus:text-accent-fg"
      >
        {locale === "en" ? "Skip to content" : "跳到正文"}
      </a>
      <header className="sticky top-0 z-40 border-b border-border bg-bg/85 backdrop-blur-md lg:hidden">
        <div className="flex h-14 items-center justify-between gap-2 px-4">
          <LocalizedLink
            to="/"
            className="flex min-w-0 items-center gap-2.5"
            onClick={() => setOpen(false)}
          >
            <Mark />
            <span className="font-display text-lg tracking-tight">
              {locale === "en" ? "DSH Brickbook" : "DSH 积木书"}
            </span>
          </LocalizedLink>
          <div className="flex items-center gap-1">
            <LanguageSwitcher compact />
            <Button
              variant="ghost"
              size="icon"
              aria-label={locale === "en" ? "Search" : "搜索"}
              onClick={() => setSearch(true)}
            >
              <Search className="size-5" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              aria-label={
                locale === "en"
                  ? open
                    ? "Close navigation"
                    : "Open navigation"
                  : open
                    ? "关闭目录"
                    : "打开目录"
              }
              onClick={() => setOpen((v) => !v)}
            >
              {open ? <X className="size-5" /> : <Menu className="size-5" />}
            </Button>
          </div>
        </div>
        {open ? (
          <nav className="grid gap-1 border-t border-border px-3 py-3">
            {nav.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                label={item.label}
                kid={item.kid}
                active={navIsActive(pathname, item.to)}
                onNavigate={() => setOpen(false)}
              />
            ))}
          </nav>
        ) : null}
      </header>

      <div className="mx-auto flex max-w-7xl">
        <aside className="sticky top-0 hidden h-dvh w-60 shrink-0 flex-col border-r border-border px-4 py-8 lg:flex">
          <LocalizedLink to="/" className="mb-6 flex items-center gap-2.5">
            <Mark />
            <div>
              <p className="font-display text-xl leading-none tracking-tight">
                {locale === "en" ? "DSH Brickbook" : "DSH 积木书"}
              </p>
              <p className="mt-1 text-xs text-muted">Everything is a Plugin</p>
            </div>
          </LocalizedLink>
          <div className="mb-4">
            <SearchTrigger onOpen={() => setSearch(true)} />
          </div>
          <div className="mb-4">
            <LanguageSwitcher />
          </div>
          <nav className="flex min-h-0 flex-1 flex-col gap-1 overflow-y-auto">
            {nav.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                label={item.label}
                kid={item.kid}
                active={navIsActive(pathname, item.to)}
              />
            ))}
          </nav>
          <p className="mt-6 text-xs leading-relaxed text-subtle">
            {locale === "en" ? "Source analysis of" : "源码分析自"} deepseek-ai/deepseek-harness
            <br />
            v0.1 developer preview
          </p>
        </aside>
        <div id="main" className="min-w-0 flex-1">
          <SeoBlock />
          {children}
          <SiteFooter />
        </div>
      </div>
      <SearchPalette open={search} onClose={() => setSearch(false)} />
      <LocaleSuggestion />
    </div>
  );
}

function NavLink({
  to,
  label,
  kid,
  active,
  onNavigate,
}: {
  to: (typeof NAV)[number]["to"];
  label: string;
  kid: string;
  active: boolean;
  onNavigate?: () => void;
}) {
  return (
    <LocalizedLink
      to={to}
      onClick={onNavigate}
      className={cn(
        "rounded-md px-3 py-2.5 transition-colors duration-[var(--motion-quick)]",
        active ? "bg-elevated text-fg" : "text-muted hover:bg-surface hover:text-fg",
      )}
    >
      <span className="block text-sm font-medium">{label}</span>
      <span className="block text-xs text-subtle">{kid}</span>
    </LocalizedLink>
  );
}

function Mark() {
  return (
    <svg viewBox="0 0 32 32" className="size-8 shrink-0" aria-hidden>
      <rect width="32" height="32" rx="8" className="fill-elevated" />
      <rect x="6" y="18" width="9" height="7" rx="1.4" className="fill-accent" />
      <rect x="17" y="18" width="9" height="7" rx="1.4" className="fill-accent-dim" />
      <rect x="11.5" y="8" width="9" height="7" rx="1.4" className="fill-fg" />
    </svg>
  );
}
