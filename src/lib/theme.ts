export const THEME_STORAGE_KEY = "dsh-theme";
export const THEME_CHANGE_EVENT = "dsh-theme-change";

export type Theme = "dark" | "light";

export const THEME_COLOR: Record<Theme, string> = {
  dark: "#08090c",
  light: "#faf9f5",
};

export const THEME_BOOT_SCRIPT = `(function(){try{var k="${THEME_STORAGE_KEY}";var s=localStorage.getItem(k);var t=s==="light"||s==="dark"?s:(matchMedia("(prefers-color-scheme: light)").matches?"light":"dark");var a=function(){document.documentElement.dataset.theme=t;document.documentElement.style.colorScheme=t;var m=document.querySelector('meta[name="theme-color"]');if(m)m.setAttribute("content",t==="light"?"${THEME_COLOR.light}":"${THEME_COLOR.dark}")};a();addEventListener("DOMContentLoaded",a,{once:true})}catch(_){}})();`;

export function resolvedTheme(): Theme {
  if (typeof document === "undefined") return "dark";
  return document.documentElement.dataset.theme === "light" ? "light" : "dark";
}

export function applyTheme(theme: Theme) {
  document.documentElement.dataset.theme = theme;
  document.documentElement.style.colorScheme = theme;
  document.querySelector('meta[name="theme-color"]')?.setAttribute("content", THEME_COLOR[theme]);
}
