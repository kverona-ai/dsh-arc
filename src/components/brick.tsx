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
  onClick,
  className,
}: {
  label: string;
  sub?: string;
  tone?: keyof typeof TONES;
  active?: boolean;
  onClick?: () => void;
  className?: string;
}) {
  const Comp = onClick ? "button" : "div";
  return (
    <Comp
      type={onClick ? "button" : undefined}
      onClick={onClick}
      className={cn(
        "relative min-h-11 rounded-md px-3 py-2 text-left transition-[transform,box-shadow] duration-[var(--motion-fast)] ease-[var(--ease-out)]",
        TONES[tone],
        onClick && "hover:-translate-y-0.5",
        active && "ring-2 ring-accent",
        className,
      )}
    >
      <span className="absolute top-1 left-3 flex gap-1" aria-hidden>
        <i className="size-1.5 rounded-full bg-current opacity-40" />
        <i className="size-1.5 rounded-full bg-current opacity-40" />
      </span>
      <p className="mt-1.5 font-medium leading-tight">{label}</p>
      {sub ? <p className="mt-0.5 truncate text-xs opacity-70">{sub}</p> : null}
    </Comp>
  );
}
