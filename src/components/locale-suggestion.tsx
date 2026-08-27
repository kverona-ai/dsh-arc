import * as Dialog from "@radix-ui/react-dialog";
import { useNavigate, useRouterState } from "@tanstack/react-router";
import { Languages, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { LOCALE_CHOICE_KEY, LOCALE_PROMPT_KEY, localizedPath, useLocale } from "@/lib/locale";
import type { LocaleSuggestion as Suggestion } from "@/lib/locale-detection";

export function LocaleSuggestion() {
  const locale = useLocale();
  const pathname = useRouterState({ select: (state) => state.location.pathname });
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [suggestion, setSuggestion] = useState<Suggestion | null>(null);
  const checked = useRef(false);

  useEffect(() => {
    if (locale !== "zh-CN" || checked.current) return;
    checked.current = true;
    if (
      window.localStorage.getItem(LOCALE_CHOICE_KEY) ||
      window.localStorage.getItem(LOCALE_PROMPT_KEY)
    ) {
      return;
    }

    const controller = new AbortController();
    let showTimer: number | undefined;
    fetch("/api/locale-suggestion", {
      headers: { accept: "application/json" },
      signal: controller.signal,
    })
      .then((response) => (response.ok ? response.json() : null))
      .then((result: Suggestion | null) => {
        if (result?.suggestedLocale !== "en") return;
        showTimer = window.setTimeout(() => {
          setSuggestion(result);
          setOpen(true);
        }, 400);
      })
      .catch(() => {
        // Locale advice is optional; a network failure must never block reading.
      });
    return () => {
      controller.abort();
      if (showTimer !== undefined) window.clearTimeout(showTimer);
    };
  }, [locale]);

  function remember(decision: "en" | "zh-CN" | "dismissed") {
    window.localStorage.setItem(
      LOCALE_PROMPT_KEY,
      JSON.stringify({ decision, country: suggestion?.country, at: Date.now() }),
    );
  }

  function stayChinese() {
    remember("zh-CN");
    window.localStorage.setItem(LOCALE_CHOICE_KEY, "zh-CN");
    setOpen(false);
  }

  function switchToEnglish() {
    remember("en");
    window.localStorage.setItem(LOCALE_CHOICE_KEY, "en");
    setOpen(false);
    void navigate({ to: localizedPath(pathname, "en") as never });
  }

  function onOpenChange(nextOpen: boolean) {
    if (!nextOpen && open) remember("dismissed");
    setOpen(nextOpen);
  }

  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-50 bg-ink/75 backdrop-blur-sm data-[state=closed]:opacity-0 data-[state=open]:opacity-100 transition-opacity duration-[var(--motion-quick)]" />
        <Dialog.Content className="fixed right-3 bottom-3 left-3 z-50 mx-auto max-w-lg rounded-2xl bg-elevated p-5 text-fg shadow-[var(--shadow-lift)] outline-none data-[state=closed]:translate-y-2 data-[state=closed]:opacity-0 data-[state=open]:translate-y-0 data-[state=open]:opacity-100 transition-[opacity,transform] duration-[var(--motion-fast)] ease-[var(--ease-out)] sm:right-auto sm:bottom-8 sm:left-1/2 sm:w-[calc(100%-2rem)] sm:-translate-x-1/2 sm:p-7 data-[state=closed]:sm:-translate-x-1/2 data-[state=open]:sm:-translate-x-1/2">
          <div className="flex items-start gap-4 pr-9">
            <div className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-surface text-accent shadow-[var(--shadow-border)]">
              <Languages className="size-5" />
            </div>
            <div>
              <Dialog.Title className="font-display text-2xl leading-tight tracking-tight">
                Switch to English?
              </Dialog.Title>
              <Dialog.Description className="mt-2 text-sm leading-relaxed text-muted">
                {suggestion?.countryName?.zh
                  ? `看起来你正在从${suggestion.countryName.zh}访问。`
                  : "你的浏览器更常使用英文。"}
                要切换到完整的 English 版本吗？
              </Dialog.Description>
            </div>
          </div>

          <div className="mt-5 rounded-xl bg-surface px-4 py-3 shadow-[var(--shadow-border)]">
            <p className="text-sm font-medium">English</p>
            <p className="mt-0.5 text-xs text-muted">
              Full site translation · Same technical detail
            </p>
          </div>

          <div className="mt-5 grid gap-2 sm:grid-cols-2">
            <Button type="button" onClick={switchToEnglish} className="w-full">
              Switch to English
            </Button>
            <Button type="button" variant="outline" onClick={stayChinese} className="w-full">
              继续使用中文
            </Button>
          </div>

          <Dialog.Close asChild>
            <button
              type="button"
              aria-label="关闭语言建议"
              className="absolute top-3 right-3 flex size-11 items-center justify-center rounded-md text-muted hover:bg-surface hover:text-fg"
            >
              <X className="size-5" />
            </button>
          </Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
