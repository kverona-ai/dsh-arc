import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { Brick } from "@/components/brick";
import { Pager } from "@/components/pager";
import { Button } from "@/components/ui/button";
import { KidNote } from "@/components/kid-note";
import { LAYERS } from "@/data/groups";
import { NAV } from "@/data/nav";

export const Route = createFileRoute("/")({ component: Home });

function Home() {
  return (
    <main className="px-4 py-10 sm:px-8 sm:py-16 lg:px-12">
      <section className="grid items-end gap-10 lg:grid-cols-[1.15fr_0.85fr]">
        <div>
          <p className="mb-4 font-mono text-xs tracking-[0.2em] text-accent uppercase">
            DeepSeek Harness · 源码图解
          </p>
          <h1 className="max-w-xl font-display text-4xl leading-[1.05] tracking-tight sm:text-6xl">
            一切都是积木。
          </h1>
          <p className="mt-5 max-w-xl text-base leading-relaxed text-muted sm:text-lg">
            这是一本给五岁小孩也能翻懂的架构图画书。机器人会想、会写日记、会动手；
            每一块本事都是可以拔掉再换上的插件。
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button asChild size="lg">
              <Link to="/story">
                先听故事
                <ArrowRight className="size-4" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link to="/map">看整座积木城</Link>
            </Button>
            <Button asChild variant="ghost" size="lg">
              <Link to="/loop">看一轮对话</Link>
            </Button>
          </div>
        </div>
        <HeroCity />
      </section>

      <KidNote className="mt-12 max-w-3xl">
        想象一盒乐高。底板叫 <strong className="text-fg">Cordis</strong>
        。大脑、手、日记本、窗户、围栏，全都是卡在底板上的积木。不想要哪块，拔掉就好——痕迹也会一起消失。这就是
        DeepSeek Harness 说的 <em>Everything is a Plugin</em>。
      </KidNote>

      <section className="mt-16">
        <div className="mb-6 flex items-end justify-between gap-4">
          <h2 className="text-2xl sm:text-3xl">十层积木城</h2>
          <Link to="/map" className="text-sm text-accent hover:underline">
            打开总图
          </Link>
        </div>
        <ol className="grid gap-3 sm:grid-cols-2">
          {LAYERS.map((layer, i) => (
            <li
              key={layer.id}
              className="rounded-xl bg-surface p-4 shadow-[var(--shadow-border)] sm:p-5"
            >
              <p className="font-mono text-xs text-subtle tabular-nums">
                {String(i + 1).padStart(2, "0")}
              </p>
              <h3 className="mt-2 text-lg">{layer.title}</h3>
              <p className="mt-1 text-sm leading-relaxed text-muted">{layer.kid}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className="mt-16 grid gap-4 md:grid-cols-3">
        <Entry
          to="/principles"
          kicker="铁律"
          title="插件可换，日记不撒谎"
          body="Everything is a plugin. Every run is traceable."
        />
        <Entry
          to="/cordis"
          kicker="底板"
          title="五块积木卡住世界"
          body="插件、上下文、inject、事件、可逆副作用。"
        />
        <Entry
          to="/seams"
          kicker="接头"
          title="换一只手，整座城搬家"
          body="定义、提供方、消费方。fs 和 subprocess 必须成对走。"
        />
      </section>

      <section className="mt-16">
        <h2 className="mb-4 text-2xl">阅读顺序</h2>
        <ol className="grid gap-2 sm:grid-cols-2">
          {NAV.filter((item) => item.to !== "/").map((item, i) => (
            <li key={item.to}>
              <Link
                to={item.to}
                className="flex min-h-11 items-center gap-3 rounded-xl bg-surface px-4 py-3 shadow-[var(--shadow-border)] hover:bg-elevated"
              >
                <span className="font-mono text-xs text-accent tabular-nums">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span>
                  <span className="block font-medium">{item.label}</span>
                  <span className="block text-sm text-muted">{item.kid}</span>
                </span>
              </Link>
            </li>
          ))}
        </ol>
      </section>
      <Pager pathname="/" />
    </main>
  );
}

function Entry({
  to,
  kicker,
  title,
  body,
}: {
  to: "/principles" | "/cordis" | "/seams";
  kicker: string;
  title: string;
  body: string;
}) {
  return (
    <Link
      to={to}
      className="group rounded-xl bg-elevated p-5 shadow-[var(--shadow-border)] transition-transform duration-[var(--motion-fast)] ease-[var(--ease-out)] hover:-translate-y-0.5"
    >
      <p className="font-mono text-xs tracking-widest text-accent uppercase">{kicker}</p>
      <h3 className="mt-3 text-xl">{title}</h3>
      <p className="mt-2 text-sm leading-relaxed text-muted">{body}</p>
      <p className="mt-4 inline-flex items-center gap-1 text-sm text-fg">
        打开
        <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-0.5" />
      </p>
    </Link>
  );
}

function HeroCity() {
  return (
    <div className="rounded-2xl bg-ink p-4 shadow-[var(--shadow-lift)] sm:p-6">
      <p className="mb-4 font-mono text-xs tracking-widest text-subtle uppercase">
        积木城剖面
      </p>
      <div className="grid gap-2">
        <div className="grid grid-cols-3 gap-2">
          <Brick label="窗户" sub="client ui-*" tone="fg" />
          <Brick label="信箱" sub="webserver" tone="fg" />
          <Brick label="接待" sub="apiproxy" tone="fg" />
        </div>
        <div className="grid grid-cols-4 gap-2">
          <Brick label="技能" sub="skill" tone="elevated" />
          <Brick label="计划" sub="plan" tone="elevated" />
          <Brick label="帮手" sub="subagent" tone="elevated" />
          <Brick label="待办" sub="todo" tone="elevated" />
        </div>
        <div className="grid grid-cols-5 gap-2">
          <Brick label="纸笔" sub="fs" tone="ok" />
          <Brick label="跑腿" sub="spawn" tone="ok" />
          <Brick label="围栏" sub="box" tone="warn" />
          <Brick label="嘴巴" sub="shell" tone="ok" />
          <Brick label="眼镜" sub="lsp" tone="ok" />
        </div>
        <div className="grid grid-cols-4 gap-2">
          <Brick label="日记" sub="session" tone="accent" />
          <Brick label="心跳" sub="loop" tone="accent" />
          <Brick label="工具柜" sub="tools" tone="accent" />
          <Brick label="脑子" sub="llm" tone="accent" />
        </div>
        <Brick label="Cordis 底板 · Context · Fiber · 可逆副作用" tone="muted" />
      </div>
    </div>
  );
}
