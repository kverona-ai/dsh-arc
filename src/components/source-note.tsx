import { ExternalLink } from "lucide-react";
import { HARNESS_RELEASE } from "@/data/release";
import { sourcesForPath, sourceUrl } from "@/data/sources";
import { useLocale } from "@/lib/locale";
import { cn } from "@/lib/utils";

/** Visible provenance: what upstream files this page was written from. */
export function SourceNote({ path, className }: { path: string; className?: string }) {
  const en = useLocale() === "en";
  const sources = sourcesForPath(path);
  if (!sources.length) return null;
  return (
    <aside
      className={cn("mt-12 border-t border-border pt-6", className)}
      aria-labelledby="page-sources"
    >
      <h2 id="page-sources" className="text-sm font-medium text-muted">
        {en ? "Read from" : "本页源码依据"} · {HARNESS_RELEASE.tag}
      </h2>
      <ul className="mt-3 flex flex-wrap gap-2">
        {sources.map((source) => (
          <li key={source.path}>
            <a
              href={sourceUrl(source.path)}
              target="_blank"
              rel="noopener noreferrer"
              className="flex min-h-11 items-center gap-2 rounded-md bg-elevated px-3 text-sm shadow-[var(--shadow-border)] transition-colors duration-[var(--motion-quick)] hover:bg-surface"
            >
              <span className="font-medium">{en ? source.labelEn : source.label}</span>
              <code className="font-mono text-xs text-subtle">{source.path}</code>
              <ExternalLink className="size-3.5 shrink-0 text-subtle" />
            </a>
          </li>
        ))}
      </ul>
    </aside>
  );
}
