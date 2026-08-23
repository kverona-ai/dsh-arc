import { createFileRoute } from "@tanstack/react-router";
import { KidNote, TechNote } from "@/components/kid-note";
import { Page } from "@/components/page";
import { DISPATCH_MODES } from "@/data/events";

import { seoHead } from "@/lib/seo";

export const Route = createFileRoute("/cordis")({
  component: CordisPage,
  head: () => seoHead("/cordis"),
});

const IDEAS = [
  {
    n: "1",
    title: "插件就是一块积木",
    kid: "一块积木可以是函数，也可以是 Service 子类。它有名字，有 apply(ctx)，有时还有 inject 清单。",
    tech: "A plugin implements Service. Function plugins export inject + apply(ctx)；class plugins 在构造里 super(ctx, name) 立刻注册。",
  },
  {
    n: "2",
    title: "上下文是公共置物架",
    kid: "谁把大脑放到架子上，别人就拿 ctx.llm，不必 import 具体老师。",
    tech: "Context 是服务仓库。稳定键：ctx.tools、ctx.llm、ctx.sessions。依赖服务名而不是实现。",
  },
  {
    n: "3",
    title: "inject 是等待朋友到齐",
    kid: "你说『我需要工具柜』，底板就等工具柜出现再让你上场。不用自己排队。",
    tech: "Load order is expressed through service requirements, not manual boot sequencing.",
  },
  {
    n: "4",
    title: "事件是喊话方式",
    kid: "广播、传纸条、全班一起做、排队发言——四种喊法，合同里写死。",
    tech: "emit / waterfall / parallel / serial。waterfall 是 around-middleware：listener 收 (...args, next)。",
  },
  {
    n: "5",
    title: "登记都是可逆的",
    kid: "把积木拔掉，它在置物架上留的东西、它听过的喊声，都会消失。",
    tech: "Registrations via ctx.effect() 或 ctx.on()。fiber 卸载时 unwind。没有需要打补丁的特权内核。",
  },
];

export function CordisPage() {
  return (
    <Page
      kicker="Cordis"
      title="底板的五个规矩"
      lead="Cordis 是 vendored 的插件框架。dsh 没有内核可以打补丁：你要做的是把插件挂到旁边。"
    >
      <KidNote className="mb-10 max-w-3xl">
        把 Cordis 想成乐高底板。底板不管积木长什么样，只管：卡得住、拔得掉、大家能顺着格子找到对方。
      </KidNote>

      <ol className="grid gap-4">
        {IDEAS.map((idea) => (
          <li
            key={idea.n}
            className="grid gap-3 rounded-2xl bg-surface p-5 shadow-[var(--shadow-border)] sm:grid-cols-[auto_1fr] sm:p-7"
          >
            <span className="font-display text-3xl text-accent">{idea.n}</span>
            <div>
              <h2 className="text-xl sm:text-2xl">{idea.title}</h2>
              <p className="mt-2 leading-relaxed">{idea.kid}</p>
              <p className="mt-3 text-sm leading-relaxed text-muted">{idea.tech}</p>
            </div>
          </li>
        ))}
      </ol>

      <h2 className="mt-14 mb-4 text-2xl">四种喊话</h2>
      <div className="overflow-x-auto">
        <table className="w-full min-w-[640px] border-separate border-spacing-0 text-sm">
          <thead>
            <tr className="text-left text-muted">
              <th className="border-b border-border px-3 py-2 font-medium">模式</th>
              <th className="border-b border-border px-3 py-2 font-medium">等待？</th>
              <th className="border-b border-border px-3 py-2 font-medium">顺序</th>
              <th className="border-b border-border px-3 py-2 font-medium">返回值</th>
              <th className="border-b border-border px-3 py-2 font-medium">小孩版</th>
            </tr>
          </thead>
          <tbody>
            {DISPATCH_MODES.map((m) => (
              <tr key={m.mode}>
                <td className="border-b border-border px-3 py-3 font-mono text-accent">{m.mode}</td>
                <td className="border-b border-border px-3 py-3 text-muted">{m.await}</td>
                <td className="border-b border-border px-3 py-3 text-muted">{m.order}</td>
                <td className="border-b border-border px-3 py-3 text-muted">{m.ret}</td>
                <td className="border-b border-border px-3 py-3">{m.kid}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <WaterfallDiagram />

      <h2 className="mt-14 mb-4 text-2xl">储物柜不是水龙头</h2>
      <div className="grid gap-3 md:grid-cols-2">
        <article className="rounded-xl bg-surface p-5 shadow-[var(--shadow-border)]">
          <h3 className="text-lg">scope · 储物柜</h3>
          <p className="mt-2 text-sm">每人一个柜子，外套挂在自己的钩上。不是围栏。</p>
          <p className="mt-2 text-sm text-muted">
            dsh-scope 按 agent 划分注册层。把注册限定到一个 agent，用的是 agent.ctx。
          </p>
        </article>
        <article className="rounded-xl bg-surface p-5 shadow-[var(--shadow-border)]">
          <h3 className="text-lg">isolate · 自己的水龙头</h3>
          <p className="mt-2 text-sm">这间教室的饮水机不是大厅那台。同名服务可以另有一份。</p>
          <p className="mt-2 text-sm text-muted">
            isolate(name, label) 给子上下文另一份同名服务。agent preset 靠它换衣服。
          </p>
        </article>
      </div>

      <TechNote className="mt-8">
        源码在 vendor/cordis。Service 构造调用 ctx.reflect.provide(name, this)，fiber
        卸载自动注销。Loader 的 !!js 在注入激活后对 config 插值。Cordis 的 inject
        是等待依赖；Agent.inject() 是往 inbox 塞纸条——名字一样，不是一回事。
      </TechNote>
    </Page>
  );
}

function WaterfallDiagram() {
  return (
    <section className="mt-12">
      <h2 className="mb-4 text-2xl">Waterfall 像洋葱</h2>
      <div className="rounded-2xl bg-ink p-6 shadow-[var(--shadow-border)] sm:p-8">
        <div className="mx-auto grid max-w-md gap-2">
          {["外层监听器：可改写或短路", "中层：必须 next() 才能往下", "内核：真正干活的人"].map(
            (t, i) => (
              <div
                key={t}
                className="rounded-md bg-elevated px-4 py-3 text-sm shadow-[var(--shadow-border)]"
                style={{ marginLeft: `${i * 16}px`, marginRight: `${i * 16}px` }}
              >
                {t}
              </div>
            ),
          )}
        </div>
        <p className="mx-auto mt-5 max-w-lg text-center text-sm text-muted">
          不喊 next() 就是自己做主。agent/pre-step、agent/request、llm/stream、tools/*
          都是这种洋葱。
        </p>
      </div>
    </section>
  );
}
