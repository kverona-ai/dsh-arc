import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function KidNote({
  title = "五岁怎么懂",
  children,
  className,
}: {
  title?: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <aside
      className={cn(
        "rounded-xl bg-elevated p-4 shadow-[var(--shadow-border)] sm:p-5",
        className,
      )}
    >
      <p className="mb-2 font-mono text-xs tracking-widest text-accent uppercase">
        {title}
      </p>
      <div className="text-[0.95rem] leading-relaxed text-fg">{children}</div>
    </aside>
  );
}

export function TechNote({
  title = "源码怎么说",
  children,
  className,
}: {
  title?: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <aside
      className={cn(
        "rounded-xl bg-surface p-4 shadow-[var(--shadow-border)] sm:p-5",
        className,
      )}
    >
      <p className="mb-2 font-mono text-xs tracking-widest text-muted uppercase">
        {title}
      </p>
      <div className="text-sm leading-relaxed text-muted">{children}</div>
    </aside>
  );
}
