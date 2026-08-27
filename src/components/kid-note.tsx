import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { useLocale } from "@/lib/locale";

export function KidNote({
  title,
  children,
  className,
}: {
  title?: string;
  children: ReactNode;
  className?: string;
}) {
  const locale = useLocale();
  return (
    <aside
      className={cn("rounded-xl bg-elevated p-4 shadow-[var(--shadow-border)] sm:p-5", className)}
    >
      <p className="mb-2 font-mono text-xs tracking-widest text-accent uppercase">
        {title ?? (locale === "en" ? "The five-year-old version" : "五岁怎么懂")}
      </p>
      <div className="text-[0.95rem] leading-relaxed text-fg">{children}</div>
    </aside>
  );
}

export function TechNote({
  title,
  children,
  className,
}: {
  title?: string;
  children: ReactNode;
  className?: string;
}) {
  const locale = useLocale();
  return (
    <aside
      className={cn("rounded-xl bg-surface p-4 shadow-[var(--shadow-border)] sm:p-5", className)}
    >
      <p className="mb-2 font-mono text-xs tracking-widest text-muted uppercase">
        {title ?? (locale === "en" ? "What the source says" : "源码怎么说")}
      </p>
      <div className="text-sm leading-relaxed text-muted">{children}</div>
    </aside>
  );
}
