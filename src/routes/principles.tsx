import { createFileRoute, Link } from "@tanstack/react-router";
import { KidNote, TechNote } from "@/components/kid-note";
import { Page } from "@/components/page";
import { EXTEND_MAP, PILLARS, RUNTIME_MODES } from "@/data/principles";
import { seoHead } from "@/lib/seo";

export const Route = createFileRoute("/principles")({
  component: PrinciplesPage,
  head: () => seoHead("/principles"),
});

function PrinciplesPage() {
  return (
    <Page
      kicker="铁律"
      title="插件可换，日记不可撒谎"
      lead="官方设计只有两句话。其余一切——启动、循环、接头、窗户——都是这两句话的展开。"
    >
      <div className="grid gap-4 lg:grid-cols-2">
        {PILLARS.map((p) => (
          <article key={p.id} className="rounded-2xl bg-elevated p-6 shadow-[var(--shadow-border)] sm:p-8">
            <p className="font-mono text-xs tracking-widest text-accent uppercase">{p.id}</p>
            <h2 className="mt-3 text-2xl sm:text-3xl">{p.title}</h2>
            <p className="mt-4 leading-relaxed">{p.kid}</p>
            <p className="mt-3 text-sm leading-relaxed text-muted">{p.tech}</p>
          </article>
        ))}
      </div>

      <KidNote className="mt-10 max-w-3xl">
        两件容易混的「inject」：Cordis 的 inject 是积木等朋友到齐；Agent 的 inject()
        是从门缝塞纸条、不敲门。名字一样，完全不是一回事。
      </KidNote>

      <h2 className="mt-14 mb-4 text-2xl">四种套装</h2>
      <p className="mb-5 max-w-2xl text-muted">
        Profile 决定整座城怎么拼。Agent preset 决定某一个机器人穿哪套衣服——在 isolate
        realm 里再挂一棵小树。
      </p>
      <div className="grid gap-3 sm:grid-cols-2">
        {RUNTIME_MODES.map((m) => (
          <article key={m.id} className="rounded-xl bg-surface p-5 shadow-[var(--shadow-border)]">
            <p className="font-mono text-xs text-accent">{m.id}</p>
            <h3 className="mt-2 text-lg">{m.name}</h3>
            <p className="mt-1 text-sm">{m.kid}</p>
            <p className="mt-2 text-sm text-muted">{m.note}</p>
          </article>
        ))}
      </div>

      <h2 className="mt-14 mb-4 text-2xl">新行为往哪挂</h2>
      <p className="mb-5 max-w-2xl text-muted">
        改循环本身之前，先在这张表里找挂钩。官方原文叫「新行为的归属位置」。
      </p>
      <div className="overflow-x-auto rounded-2xl bg-ink shadow-[var(--shadow-border)]">
        <table className="w-full min-w-[640px] border-separate border-spacing-0 text-sm">
          <thead>
            <tr className="text-left text-muted">
              <th className="border-b border-border px-4 py-3 font-medium">你想做</th>
              <th className="border-b border-border px-4 py-3 font-medium">挂在哪</th>
              <th className="border-b border-border px-4 py-3 font-medium">小孩版</th>
            </tr>
          </thead>
          <tbody>
            {EXTEND_MAP.map((row) => (
              <tr key={row.goal}>
                <td className="border-b border-border px-4 py-3">{row.goal}</td>
                <td className="border-b border-border px-4 py-3 font-mono text-xs text-accent">
                  {row.hang}
                </td>
                <td className="border-b border-border px-4 py-3 text-muted">{row.kid}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <TechNote className="mt-8">
        扩展实操手册把功能映射到能力，并索引：加包、加工具、加 LLM 适配器、加 Chat
        节点、加设置卡片。详见 deepseek-harness docs/cookbook。改循环本身时，这张映射要一起改。
      </TechNote>

      <div className="mt-8">
        <Link to="/glossary" className="text-sm text-accent hover:underline">
          去词汇表核对名字 →
        </Link>
      </div>
    </Page>
  );
}
