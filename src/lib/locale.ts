import { useRouterState } from "@tanstack/react-router";

export const DEFAULT_LOCALE = "zh-CN" as const;
export const ENGLISH_LOCALE = "en" as const;
export const LOCALE_CHOICE_KEY = "dsh-locale-choice";
export const LOCALE_PROMPT_KEY = "dsh-locale-prompt-v1";

export type Locale = typeof DEFAULT_LOCALE | typeof ENGLISH_LOCALE;

export function localeFromPath(pathname: string): Locale {
  return pathname === "/en" || pathname.startsWith("/en/") ? ENGLISH_LOCALE : DEFAULT_LOCALE;
}

export function basePath(pathname: string): string {
  if (pathname === "/en") return "/";
  if (pathname.startsWith("/en/")) return pathname.slice(3) || "/";
  return pathname || "/";
}

export function localizedPath(pathname: string, locale: Locale): string {
  const path = basePath(pathname);
  if (locale === ENGLISH_LOCALE) return path === "/" ? "/en" : `/en${path}`;
  return path;
}

export function useLocale(): Locale {
  return useRouterState({ select: (state) => localeFromPath(state.location.pathname) });
}

export function localeLabel(locale: Locale) {
  return locale === ENGLISH_LOCALE ? "English" : "简体中文";
}
