import { ExternalLink, ImagePlus, MessagesSquare, ShieldCheck, SlidersHorizontal } from "lucide-react";
import { HARNESS_RELEASE, RELEASE_HIGHLIGHTS } from "@/data/release";

const ICONS = {
  vision: ImagePlus,
  collaboration: MessagesSquare,
  safety: ShieldCheck,
  tools: SlidersHorizontal,
} as const;

export function ReleaseUpdate({ en }: { en: boolean }) {
  return (
    <section
      aria-labelledby="release-update-title"
      className="mt-12 rounded-2xl bg-elevated p-5 shadow-[var(--shadow-border)] sm:p-7"
    >
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="font-mono text-xs tracking-[0.16em] text-accent uppercase">
            {en ? "Current source snapshot" : "当前源码快照"}
          </p>
          <h2 id="release-update-title" className="mt-2 text-2xl sm:text-3xl">
            DeepSeek Harness {HARNESS_RELEASE.version}
          </h2>
          <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted">
            {en
              ? `${HARNESS_RELEASE.packageCount} package manifests at commit ${HARNESS_RELEASE.commit}, updated from the official release published ${HARNESS_RELEASE.released}.`
              : `基于官方 ${HARNESS_RELEASE.released} 发布的 ${HARNESS_RELEASE.packageCount} 个包清单，源码提交 ${HARNESS_RELEASE.commit}。`}
          </p>
        </div>
        <a
          href={HARNESS_RELEASE.url}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex min-h-11 shrink-0 items-center gap-2 self-start rounded-md bg-surface px-3 text-sm font-medium text-fg shadow-[var(--shadow-border)] hover:bg-ink sm:self-auto"
        >
          {en ? "Official release" : "官方发布"}
          <ExternalLink className="size-3.5" />
        </a>
      </div>
      <ul className="mt-6 grid gap-3 sm:grid-cols-2">
        {RELEASE_HIGHLIGHTS.map((item) => {
          const Icon = ICONS[item.icon];
          return (
            <li key={item.icon} className="flex gap-3 rounded-xl bg-surface p-4">
              <span className="flex size-9 shrink-0 items-center justify-center rounded-md bg-ink text-accent">
                <Icon className="size-4" />
              </span>
              <p className="text-sm leading-relaxed text-muted">{en ? item.en : item.zh}</p>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
