import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { KidNote, TechNote } from "@/components/kid-note";
import { Page } from "@/components/page";
import { GROUPS, LAYERS, type Layer } from "@/data/groups";
import { cn } from "@/lib/utils";

import { seoHead } from "@/lib/seo";

export const Route = createFileRoute("/map")({
  component: MapPage,
  head: () => seoHead("/map"),
});

function MapPage() {
  const [active, setActive] = useState<Layer>("core");
  const layer = LAYERS.find((l) => l.id === active)!;
  const groups = GROUPS.filter((g) => g.layer === active);

  return (
    <Page
      kicker="总图"
      title="整座积木城，一层一层点"
      lead="从底板往上长。点一层，看这一层住了哪些包。"
    >
      <KidNote className="mb-8 max-w-3xl">
        下面不是流程图，是剖面。最底下是底板，最上面是窗户。机器人住在中间：左边写日记，右边动手，头顶是脑子。
      </KidNote>

      <div className="grid gap-6 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)]">
        <ol className="grid gap-2">
          {[...LAYERS].reverse().map((item, idx) => {
            const on = item.id === active;
            return (
              <li key={item.id}>
                <button
                  type="button"
                  onClick={() => setActive(item.id)}
                  className={cn(
                    "flex w-full items-center gap-4 rounded-xl px-4 py-3.5 text-left shadow-[var(--shadow-border)] transition-[background-color,transform] duration-[var(--motion-fast)] ease-[var(--ease-out)]",
                    on ? "bg-accent text-accent-fg" : "bg-surface text-fg hover:bg-elevated",
                  )}
                >
                  <span className="font-mono text-xs tabular-nums opacity-70">
                    {String(LAYERS.length - idx).padStart(2, "0")}
                  </span>
                  <span className="min-w-0">
                    <span className="block font-medium">{item.title}</span>
                    <span className={cn("block text-sm", on ? "opacity-80" : "text-muted")}>
                      {item.kid}
                    </span>
                  </span>
                </button>
              </li>
            );
          })}
        </ol>

        <div className="rounded-2xl bg-elevated p-6 shadow-[var(--shadow-border)] sm:p-8">
          <p className="font-mono text-xs tracking-widest text-accent uppercase">{layer.id}</p>
          <h2 className="mt-2 text-2xl">{layer.title}</h2>
          <p className="mt-3 leading-relaxed text-muted">{layer.job}</p>
          <ul className="mt-6 grid gap-2">
            {groups.map((g) => (
              <li key={g.slug}>
                <Link
                  to="/modules/$slug"
                  params={{ slug: g.slug }}
                  className="flex items-baseline justify-between gap-3 rounded-md bg-surface px-3 py-2.5 hover:bg-ink"
                >
                  <span>
                    <span className="font-medium">{g.name}</span>
                    <span className="ml-2 text-sm text-muted">{g.kid}</span>
                  </span>
                  {g.ctx ? (
                    <code className="shrink-0 font-mono text-[11px] text-subtle">{g.ctx.split(" ")[0]}</code>
                  ) : null}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <RelationSvg />

      <section className="mt-12">
        <h2 className="mb-4 text-2xl">屋子和窗户</h2>
        <div className="grid gap-3 md:grid-cols-2">
          <article className="rounded-xl bg-surface p-5 shadow-[var(--shadow-border)]">
            <p className="font-mono text-xs tracking-widest text-accent uppercase">Host · Node</p>
            <h3 className="mt-2 text-lg">屋子这一半</h3>
            <p className="mt-2 text-sm">哑巴信箱 webserver、接待员 apiproxy、静态玻璃。Agent 循环在这里跳。</p>
            <p className="mt-2 text-sm text-muted">
              Native 能力仅 loopback。Host 把 __DSH_BOOT__ 塞进 HTML，告诉窗户该拼哪些积木。
            </p>
          </article>
          <article className="rounded-xl bg-surface p-5 shadow-[var(--shadow-border)]">
            <p className="font-mono text-xs tracking-widest text-accent uppercase">Client · Browser</p>
            <h3 className="mt-2 text-lg">窗户这一半</h3>
            <p className="mt-2 text-sm">浏览器另起 Loader，立刻挂 immediately 行，把 DOM 交给 ctx.uiRenderer。</p>
            <p className="mt-2 text-sm text-muted">
              聊天框、侧栏、设置都是 Slot。窗户只消费 session/event，不自己编故事。
            </p>
          </article>
        </div>
      </section>

      <TechNote className="mt-8">
        扩展插件依赖 Service Definition，绝不依赖具体提供方。dsh-agent-loop
        可替换；UI、钩子和工具插件只依赖 dsh-agent。能力把需要独立演进的定义 / 提供方 /
        消费方拆开。官方图：docs/capability-seams.md、docs/module-graph.md。
      </TechNote>
    </Page>
  );
}

function RelationSvg() {
  return (
    <section className="mt-12">
      <h2 className="mb-4 text-2xl">谁找谁说话</h2>
      <div className="overflow-x-auto rounded-2xl bg-ink p-4 shadow-[var(--shadow-border)] sm:p-8">
        <svg
          viewBox="0 0 920 420"
          className="h-auto w-full min-w-[640px] text-fg"
          role="img"
          aria-label="核心模块关系：用户到 agent 到 llm 与 tools，tools 再经 shell 与 fs 进入执行世界"
        >
          <defs>
            <marker id="arr" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto">
              <path d="M0,0 L8,4 L0,8 z" className="fill-subtle" />
            </marker>
          </defs>
          {[
            { x: 40, y: 170, w: 120, h: 64, t: "你", s: "followup" },
            { x: 200, y: 170, w: 140, h: 64, t: "Agent", s: "ctx.agents" },
            { x: 390, y: 40, w: 160, h: 64, t: "SystemPrompt", s: "说明书" },
            { x: 390, y: 170, w: 160, h: 64, t: "AgentLoop", s: "心跳" },
            { x: 390, y: 300, w: 160, h: 64, t: "Session", s: "日记本" },
            { x: 600, y: 40, w: 140, h: 64, t: "LLM", s: "ctx.llm" },
            { x: 600, y: 170, w: 140, h: 64, t: "Tools", s: "ctx.tools" },
            { x: 780, y: 110, w: 120, h: 56, t: "Shell / FS", s: "手脚" },
            { x: 780, y: 200, w: 120, h: 56, t: "Subprocess", s: "跑腿" },
            { x: 780, y: 290, w: 120, h: 56, t: "Sandbox", s: "围栏" },
          ].map((b) => (
            <g key={b.t}>
              <rect
                x={b.x}
                y={b.y}
                width={b.w}
                height={b.h}
                rx="10"
                className="fill-elevated stroke-border"
              />
              <text x={b.x + 16} y={b.y + 28} className="fill-fg" fontSize="15" fontFamily="Outfit">
                {b.t}
              </text>
              <text
                x={b.x + 16}
                y={b.y + 48}
                className="fill-muted"
                fontSize="11"
                fontFamily="IBM Plex Mono"
              >
                {b.s}
              </text>
            </g>
          ))}
          {[
            [160, 202, 200, 202],
            [340, 202, 390, 202],
            [470, 104, 470, 170],
            [470, 234, 470, 300],
            [550, 72, 600, 72],
            [550, 202, 600, 202],
            [740, 202, 780, 138],
            [740, 202, 780, 228],
            [740, 202, 780, 318],
          ].map(([x1, y1, x2, y2], i) => (
            <line
              key={i}
              x1={x1}
              y1={y1}
              x2={x2}
              y2={y2}
              className="stroke-subtle"
              strokeWidth="1.4"
              markerEnd="url(#arr)"
            />
          ))}
        </svg>
      </div>
    </section>
  );
}
