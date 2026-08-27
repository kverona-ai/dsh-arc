import { useLocale } from "@/lib/locale";
import { AUTHOR_AVATAR, AUTHOR_X, SITE_AUTHOR } from "@/lib/seo";
import { cn } from "@/lib/utils";

export function XLogo({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      <path
        fill="currentColor"
        d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"
      />
    </svg>
  );
}

export function CreatorAvatar({
  className,
  badge = true,
}: {
  className?: string;
  badge?: boolean;
}) {
  return (
    <span className={cn("relative inline-flex shrink-0", className)}>
      <img
        src={AUTHOR_AVATAR}
        width={40}
        height={40}
        loading="eager"
        decoding="async"
        alt={`@${SITE_AUTHOR}`}
        className="size-full rounded-full object-cover ring-1 ring-border-strong"
      />
      {badge ? (
        <span className="absolute -right-1 -bottom-1 grid size-4 place-items-center rounded-full bg-fg text-bg ring-2 ring-elevated">
          <XLogo className="size-2" />
        </span>
      ) : null}
    </span>
  );
}

/** Author identity card: avatar from X, handle, and a one-line role. Links to x.com/willzero. */
export function CreatorCard({ className }: { className?: string }) {
  const en = useLocale() === "en";
  return (
    <a
      href={AUTHOR_X}
      target="_blank"
      rel="me noopener noreferrer"
      aria-label={en ? `Open @${SITE_AUTHOR} on X` : `在 X 上打开 @${SITE_AUTHOR}`}
      title={en ? `@${SITE_AUTHOR} on X` : `@${SITE_AUTHOR} 的 X 账号`}
      className={cn(
        "group flex min-h-11 items-center gap-2.5 rounded-lg bg-elevated p-2 pr-3 shadow-[var(--shadow-border)] transition-[background-color,transform,box-shadow] duration-[var(--motion-quick)] ease-[var(--ease-out)] hover:-translate-y-0.5 hover:bg-surface hover:shadow-[var(--shadow-lift)]",
        className,
      )}
    >
      <CreatorAvatar className="size-9" />
      <span className="min-w-0 leading-tight">
        <span className="block truncate text-sm font-medium text-fg">@{SITE_AUTHOR}</span>
        <span className="block truncate text-xs text-muted">
          {en ? "Author · follow on X" : "作者 · 在 X 上关注"}
        </span>
      </span>
    </a>
  );
}
