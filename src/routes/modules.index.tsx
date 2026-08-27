import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Page } from "@/components/page";
import { KidNote } from "@/components/kid-note";
import { GROUPS, LAYERS } from "@/data/groups";
import { PACKAGES, ROLE_LABEL } from "@/data/packages";
import { cn } from "@/lib/utils";
import { seoHead } from "@/lib/seo";
import { groupsEn, LAYERS_EN } from "@/data/en/groups";
import { packagesEn, ROLE_LABEL_EN } from "@/data/en/packages";
import { useLocale } from "@/lib/locale";
import { LocalizedLink } from "@/components/localized-link";

export const Route = createFileRoute("/modules/")({
  component: ModulesPage,
  head: () => seoHead("/modules"),
});

export function ModulesPage() {
  const locale = useLocale();
  const en = locale === "en";
  const groups = useMemo(() => (en ? groupsEn(GROUPS) : GROUPS), [en]);
  const packages = useMemo(() => (en ? packagesEn(PACKAGES) : PACKAGES), [en]);
  const layers = en ? LAYERS_EN : LAYERS;
  const roleLabel = en ? ROLE_LABEL_EN : ROLE_LABEL;
  const [q, setQ] = useState("");
  const [layer, setLayer] = useState<string>("all");

  const visibleGroups = useMemo(() => {
    return groups.filter((g) => layer === "all" || g.layer === layer);
  }, [groups, layer]);

  const filtered = useMemo(() => {
    const needle = q.trim().toLowerCase();
    const allowed = new Set(visibleGroups.map((g) => g.slug));
    return packages.filter((p) => {
      if (!allowed.has(p.group)) return false;
      if (!needle) return true;
      return [p.slug, p.npm, p.job, p.kid, p.ctx, p.group].some((s) =>
        (s ?? "").toLowerCase().includes(needle),
      );
    });
  }, [packages, q, visibleGroups]);

  return (
    <Page
      kicker={en ? "Directory" : "目录"}
      title={en ? "Every brick has a drawer" : "每一块积木都有抽屉"}
      lead={
        en
          ? "The repository contains about 227 packages. This directory covers the core and representative plugins. Open a group to see its relationships."
          : "仓库约 227 个包。这里收录主干与代表性插件。点组名进入该组的关系说明。"
      }
    >
      <KidNote className="mb-8 max-w-3xl">
        {en
          ? "Three roles: the definition is the socket, the provider supplies the plug, and the consumer is the lamp. Core packages are the heartbeat and journal. UI packages are pictures pinned to the window."
          : "三角色：定义是插座，提供方是哪栋楼，消费方是台灯。主干是心跳和日记。界面是窗户上的贴纸。"}
      </KidNote>

      <div className="mb-6 flex flex-col gap-3 sm:flex-row">
        <label className="block min-w-0 flex-1">
          <span className="sr-only">{en ? "Search packages" : "搜索包"}</span>
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder={en ? "Search package, ctx, or description…" : "搜索包名、ctx、小孩版…"}
            className="h-11 w-full rounded-md bg-elevated px-4 text-sm text-fg shadow-[var(--shadow-border)] placeholder:text-subtle focus:outline-none focus:ring-2 focus:ring-accent/50"
          />
        </label>
        <p className="self-center text-sm text-muted tabular-nums">
          {filtered.length} {en ? "packages" : "个"}
        </p>
      </div>

      <div className="mb-6 flex flex-wrap gap-2">
        <FilterChip
          label={en ? "All layers" : "全部层"}
          on={layer === "all"}
          onClick={() => setLayer("all")}
        />
        {layers.map((l) => (
          <FilterChip
            key={l.id}
            label={l.title.split("·")[0]!.trim()}
            on={layer === l.id}
            onClick={() => setLayer(l.id)}
          />
        ))}
      </div>

      <div className="grid gap-3 sm:grid-cols-2">
        {visibleGroups.map((g) => (
          <LocalizedLink
            key={g.slug}
            to={`/modules/${g.slug}`}
            className="rounded-xl bg-surface p-5 shadow-[var(--shadow-border)] transition-transform duration-[var(--motion-fast)] hover:-translate-y-0.5"
          >
            <p className="font-mono text-xs text-accent">{g.path}</p>
            <h2 className="mt-1 text-xl">{g.name}</h2>
            <p className="mt-2 text-sm">{g.kid}</p>
            <p className="mt-1 text-sm text-muted">{g.job}</p>
          </LocalizedLink>
        ))}
      </div>

      <h2 className="mt-12 mb-4 text-2xl">{en ? "Package cards" : "包卡片"}</h2>
      {filtered.length === 0 ? (
        <p className="rounded-xl bg-surface px-4 py-8 text-center text-sm text-muted">
          {en
            ? "No package in this layer matches. Try another term or select All layers."
            : "这一层没有匹配的包。换个词，或点「全部层」。"}
        </p>
      ) : (
        <ul className="grid gap-2">
          {filtered.map((p) => (
            <li
              key={p.npm}
              className="grid gap-2 rounded-xl bg-elevated px-4 py-3 shadow-[var(--shadow-border)] sm:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)]"
            >
              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <code className="font-mono text-xs text-fg">{p.npm}</code>
                  <span className="rounded-full bg-surface px-2 py-0.5 text-[11px] text-muted">
                    {roleLabel[p.role]}
                  </span>
                </div>
                <p className="mt-1 text-sm">{p.kid}</p>
              </div>
              <div className="text-sm text-muted">
                <p>{p.job}</p>
                {p.ctx ? (
                  <code className="mt-1 block font-mono text-[11px] text-subtle">{p.ctx}</code>
                ) : null}
              </div>
            </li>
          ))}
        </ul>
      )}
    </Page>
  );
}

function FilterChip({ label, on, onClick }: { label: string; on: boolean; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "h-11 rounded-full px-3 text-xs font-medium",
        on ? "bg-accent text-accent-fg" : "bg-elevated text-muted hover:text-fg",
      )}
    >
      {label}
    </button>
  );
}
