import { cn } from "@/lib/utils";

const TONES = {
  accent: "bg-accent text-accent-fg",
  fg: "bg-fg text-bg",
  elevated: "bg-elevated text-fg shadow-[var(--shadow-border)]",
  ok: "bg-ok text-bg",
  warn: "bg-warn text-bg",
  muted: "bg-subtle text-fg",
} as const;

export function Brick({
  label,
  sub,
  tone = "elevated",
  active,
  compact,
  onClick,
  className,
}: {
  label: string;
  sub?: string;
  tone?: keyof typeof TONES;
  active?: boolean;
  /** Tightens type for narrow diagram bricks — Latin labels are far wider than CJK ones. */
  compact?: boolean;
  onClick?: () => void;
  className?: string;
}) {
  const Comp = onClick ? "button" : "div";
  return (
    <Comp
      type={onClick ? "button" : undefined}
      onClick={onClick}
      className={cn(
        "relative min-h-11 rounded-md py-2 text-left transition-[transform,box-shadow] duration-[var(--motion-fast)] ease-[var(--ease-out)]",
        compact ? "px-2" : "px-3",
        TONES[tone],
        onClick && "hover:-translate-y-0.5",
        active && "ring-2 ring-accent",
        className,
      )}
    >
      <span className={cn("absolute top-1 flex gap-1", compact ? "left-2" : "left-3")} aria-hidden>
        <i className="size-1.5 rounded-full bg-current opacity-40" />
        <i className="size-1.5 rounded-full bg-current opacity-40" />
      </span>
      <p className={cn("mt-1.5 font-medium leading-tight", compact && "truncate text-xs")}>
        {label}
      </p>
      {sub ? (
        <p className={cn("mt-0.5 truncate opacity-70", compact ? "text-[0.625rem]" : "text-xs")}>
          {sub}
        </p>
      ) : null}
    </Comp>
  );
}
