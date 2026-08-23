import { useRouterState } from "@tanstack/react-router";
import type { ReactNode } from "react";
import { Pager } from "@/components/pager";
import { cn } from "@/lib/utils";

export function Page({
  kicker,
  title,
  lead,
  children,
  className,
}: {
  kicker?: string;
  title: string;
  lead?: string;
  children: ReactNode;
  className?: string;
}) {
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  return (
    <main className={cn("px-4 py-10 sm:px-8 sm:py-14 lg:px-12", className)}>
      <header className="mb-10 max-w-3xl">
        {kicker ? (
          <p className="mb-3 font-mono text-xs tracking-[0.18em] text-accent uppercase">
            {kicker}
          </p>
        ) : null}
        <h1 className="text-3xl leading-tight tracking-tight sm:text-5xl">{title}</h1>
        {lead ? (
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted sm:text-lg">
            {lead}
          </p>
        ) : null}
      </header>
      {children}
      <Pager pathname={pathname} />
    </main>
  );
}
