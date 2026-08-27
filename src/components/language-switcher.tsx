import { useNavigate, useRouterState } from "@tanstack/react-router";
import { Languages } from "lucide-react";
import { LOCALE_CHOICE_KEY, localizedPath, useLocale, type Locale } from "@/lib/locale";
import { cn } from "@/lib/utils";

export function LanguageSwitcher({ compact = false }: { compact?: boolean }) {
  const locale = useLocale();
  const pathname = useRouterState({ select: (state) => state.location.pathname });
  const navigate = useNavigate();
  const target: Locale = locale === "en" ? "zh-CN" : "en";
  const label = locale === "en" ? "切换到简体中文" : "Switch to English";

  function switchLocale() {
    window.localStorage.setItem(LOCALE_CHOICE_KEY, target);
    void navigate({ to: localizedPath(pathname, target) as never });
  }

  return (
    <button
      type="button"
      onClick={switchLocale}
      aria-label={label}
      title={label}
      className={cn(
        "flex h-11 items-center justify-center gap-2 rounded-md bg-elevated text-sm font-medium text-muted shadow-[var(--shadow-border)] transition-[background-color,color] duration-[var(--motion-quick)] hover:bg-surface hover:text-fg",
        compact ? "min-w-11 px-2.5" : "w-full px-3",
      )}
    >
      <Languages className="size-4 shrink-0" />
      <span>{locale === "en" ? "中文" : "EN"}</span>
      {!compact ? (
        <span className="min-w-0 truncate text-xs font-normal text-subtle">
          {locale === "en" ? "简体中文" : "English"}
        </span>
      ) : null}
    </button>
  );
}
