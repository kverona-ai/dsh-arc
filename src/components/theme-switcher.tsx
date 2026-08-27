import { Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";
import { useLocale } from "@/lib/locale";
import {
  applyTheme,
  resolvedTheme,
  THEME_CHANGE_EVENT,
  THEME_STORAGE_KEY,
  type Theme,
} from "@/lib/theme";
import { cn } from "@/lib/utils";

export function ThemeSwitcher({ compact = false }: { compact?: boolean }) {
  const locale = useLocale();
  const [theme, setTheme] = useState<Theme>("dark");

  useEffect(() => {
    const media = window.matchMedia("(prefers-color-scheme: light)");
    const sync = () => setTheme(resolvedTheme());
    const followSystem = () => {
      if (window.localStorage.getItem(THEME_STORAGE_KEY)) return;
      const next: Theme = media.matches ? "light" : "dark";
      applyTheme(next);
      setTheme(next);
    };
    window.addEventListener(THEME_CHANGE_EVENT, sync);
    window.addEventListener("storage", sync);
    media.addEventListener("change", followSystem);
    sync();
    return () => {
      window.removeEventListener(THEME_CHANGE_EVENT, sync);
      window.removeEventListener("storage", sync);
      media.removeEventListener("change", followSystem);
    };
  }, []);

  const next: Theme = theme === "dark" ? "light" : "dark";
  const label =
    locale === "en"
      ? `Switch to ${next === "light" ? "warm light" : "dark"} theme`
      : `切换到${next === "light" ? "暖光浅色" : "深色"}主题`;

  function switchTheme() {
    window.localStorage.setItem(THEME_STORAGE_KEY, next);
    applyTheme(next);
    setTheme(next);
    window.dispatchEvent(new Event(THEME_CHANGE_EVENT));
  }

  return (
    <button
      type="button"
      onClick={switchTheme}
      aria-label={label}
      title={label}
      className={cn(
        "flex h-11 items-center justify-center gap-2 rounded-md bg-elevated text-sm font-medium text-muted shadow-[var(--shadow-border)] transition-[background-color,color,box-shadow] duration-[var(--motion-quick)] hover:bg-surface hover:text-fg",
        compact ? "min-w-11 px-2.5" : "w-full px-3",
      )}
    >
      {theme === "dark" ? <Sun className="size-4" /> : <Moon className="size-4" />}
      {!compact ? (
        <span>{locale === "en" ? (theme === "dark" ? "Light" : "Dark") : theme === "dark" ? "浅色" : "深色"}</span>
      ) : null}
    </button>
  );
}
