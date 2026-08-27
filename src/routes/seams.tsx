import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { KidNote, TechNote } from "@/components/kid-note";
import { Page } from "@/components/page";
import { SEAMS, SEAM_RULES } from "@/data/seams";
import { cn } from "@/lib/utils";

import { seoHead } from "@/lib/seo";
import { SEAMS_EN, SEAM_RULES_EN } from "@/data/en/seams";
import { useLocale } from "@/lib/locale";

export const Route = createFileRoute("/seams")({
  component: SeamsPage,
  head: () => seoHead("/seams"),
});

export function SeamsPage() {
  const locale = useLocale();
  const en = locale === "en";
  const seams = en ? SEAMS_EN : SEAMS;
  const rules = en ? SEAM_RULES_EN : SEAM_RULES;
  const [slug, setSlug] = useState(SEAMS[0]!.slug);
  const seam = seams.find((s) => s.slug === slug)!;
  const [world, setWorld] = useState<"home" | "cloud">("home");

  return (
    <Page
      kicker="Seam"
      title={en ? "Socket, plug, and lamp" : "插座、插头、台灯"}
      lead={
        en
          ? "A seam has three roles: define an interface, implement it, and consume it. Replace the provider without changing consumers."
          : "一个 seam 必须有三种角色：定义接口、实现接口、使用接口。换提供方，消费方不用改。"
      }
    >
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {rules.map((r) => (
          <article
            key={r.title}
            className="rounded-xl bg-surface p-5 shadow-[var(--shadow-border)]"
          >
            <h2 className="text-lg">{r.title}</h2>
            <p className="mt-2 text-sm">{r.kid}</p>
            <p className="mt-2 text-sm text-muted">{r.tech}</p>
          </article>
        ))}
      </div>

      <h2 className="mt-14 mb-4 text-2xl">{en ? "Choose a seam" : "点一个接头"}</h2>
      <div className="flex flex-wrap gap-2">
        {seams.map((s) => (
          <button
            key={s.slug}
            type="button"
            onClick={() => setSlug(s.slug)}
            className={cn(
              "h-11 rounded-md px-4 text-sm font-medium",
              s.slug === slug ? "bg-accent text-accent-fg" : "bg-elevated text-fg hover:bg-surface",
            )}
          >
            {s.name}
            <span className="ml-2 font-mono text-[11px] opacity-70">{s.ctx}</span>
          </button>
        ))}
      </div>

      <div className="mt-6 grid gap-4 lg:grid-cols-3">
        <RoleCard
          title={en ? "Definition" : "定义"}
          kid={en ? "The shape of the socket" : "插座长什么样"}
          items={[{ pkg: seam.definition, note: seam.kid }]}
        />
        <RoleCard
          title={en ? "Provider" : "提供方"}
          kid={en ? "Which building provides the plug" : "插在哪栋楼"}
          items={seam.providers.map((p) => ({ pkg: p.pkg, note: p.note }))}
        />
        <RoleCard
          title={en ? "Consumer" : "消费方"}
          kid={en ? "The lamp does not change" : "台灯不用改"}
          items={seam.consumers.map((p) => ({ pkg: p.pkg, note: p.note }))}
        />
      </div>
      <p className="mt-4 max-w-3xl text-sm leading-relaxed text-muted">{seam.swapStory}</p>

      <h2 className="mt-14 mb-4 text-2xl">
        {en ? "Moving demo: home ↔ cloud cabin" : "搬家演示：家 ↔ 云上小屋"}
      </h2>
      <KidNote className="mb-5 max-w-3xl">
        {en
          ? "A sandbox is a safety gate; moving means relocating the entire playroom. Switch between the two worlds and watch Bash, the blackboard, and the glasses move together."
          : "围栏是婴儿门，搬家是把整间游戏室搬走。点下面两个按钮，看 Bash、黑板、眼镜是不是一起走。"}
      </KidNote>
      <div className="flex flex-wrap gap-2">
        <button
          type="button"
          onClick={() => setWorld("home")}
          className={cn(
            "h-11 rounded-md px-4 text-sm font-medium",
            world === "home" ? "bg-accent text-accent-fg" : "bg-elevated",
          )}
        >
          {en ? "Stay at home" : "住在家里"}
        </button>
        <button
          type="button"
          onClick={() => setWorld("cloud")}
          className={cn(
            "h-11 rounded-md px-4 text-sm font-medium",
            world === "cloud" ? "bg-accent text-accent-fg" : "bg-elevated",
          )}
        >
          {en ? "Move to E2B" : "搬到 E2B"}
        </button>
      </div>
      <div className="mt-5 grid gap-3 md:grid-cols-3">
        <StayCard
          title={en ? "Stays put" : "不动的"}
          items={
            en
              ? ["agent-loop", "session log", "llm calls", "skills"]
              : ["agent-loop", "session 日志", "llm 调用", "skills"]
          }
        />
        <StayCard
          title={
            world === "home"
              ? en
                ? "Execution world at home"
                : "家里的执行世界"
              : en
                ? "Execution world in the cloud"
                : "云上的执行世界"
          }
          items={
            world === "home"
              ? [
                  "fs-local / fs-sandbox",
                  "subprocess-local",
                  en ? "sandbox-local fence" : "sandbox-local 围栏",
                ]
              : ["fs-e2b", "subprocess-e2b", en ? "ctx.e2b lifecycle" : "ctx.e2b 生命周期"]
          }
        />
        <StayCard
          title={en ? "Tools that follow unchanged" : "跟着走、不用改的工具"}
          items={[
            "tool-bash / bash-sandbox",
            en ? "terminal-bash (PTY)" : "terminal-bash（PTY）",
            "lsp-stdio",
            "tool-fs",
          ]}
        />
      </div>
      <TechNote className="mt-6">
        {en
          ? "The official design is explicit: existing dsh-bash-local, dsh-terminal-bash, and dsh-lsp-stdio need no E2B-specific fork. They delegate execution-world operations to ctx.fs and ctx.subprocess. ctx.sandbox remains local confine(argv), not a remote world."
          : "官方原话：existing dsh-bash-local、dsh-terminal-bash、dsh-lsp-stdio 不需要 E2B 专用 fork。它们把执行世界操作委托给 ctx.fs 和 ctx.subprocess。ctx.sandbox 仍然只是本机 confine(argv)，不是远程世界。"}
      </TechNote>
    </Page>
  );
}

function RoleCard({
  title,
  kid,
  items,
}: {
  title: string;
  kid: string;
  items: { pkg: string; note: string }[];
}) {
  return (
    <article className="rounded-xl bg-elevated p-5 shadow-[var(--shadow-border)]">
      <p className="font-mono text-xs tracking-widest text-accent uppercase">{title}</p>
      <p className="mt-1 text-sm text-muted">{kid}</p>
      <ul className="mt-4 grid gap-2">
        {items.map((it) => (
          <li key={it.pkg} className="rounded-md bg-surface px-3 py-2">
            <p className="font-mono text-xs text-fg">{it.pkg}</p>
            <p className="text-sm text-muted">{it.note}</p>
          </li>
        ))}
      </ul>
    </article>
  );
}

function StayCard({ title, items }: { title: string; items: string[] }) {
  return (
    <article className="rounded-xl bg-surface p-5 shadow-[var(--shadow-border)]">
      <h3 className="text-lg">{title}</h3>
      <ul className="mt-3 grid gap-1.5 text-sm text-muted">
        {items.map((it) => (
          <li key={it} className="font-mono text-xs text-fg">
            {it}
          </li>
        ))}
      </ul>
    </article>
  );
}
