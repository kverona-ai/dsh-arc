import { createFileRoute } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { Brick } from "@/components/brick";
import { Pager } from "@/components/pager";
import { SourceNote } from "@/components/source-note";
import { Button } from "@/components/ui/button";
import { KidNote } from "@/components/kid-note";
import { FaqList } from "@/components/faq-list";
import { LAYERS } from "@/data/groups";
import { NAV } from "@/data/nav";
import { seoHead } from "@/lib/seo";
import { LAYERS_EN } from "@/data/en/groups";
import { NAV_EN } from "@/data/en/nav";
import { LocalizedLink } from "@/components/localized-link";
import { useLocale } from "@/lib/locale";
import { ReleaseUpdate } from "@/components/release-update";

export const Route = createFileRoute("/")({
  component: HomePage,
  head: () => seoHead("/"),
});

export function HomePage() {
  const locale = useLocale();
  const en = locale === "en";
  const layers = en ? LAYERS_EN : LAYERS;
  const nav = en ? NAV_EN : NAV;

  return (
    <main className="px-4 py-10 sm:px-8 sm:py-16 lg:px-12">
      <section className="grid items-end gap-10 lg:grid-cols-[1.15fr_0.85fr]">
        <div>
          <p className="mb-4 font-mono text-xs tracking-[0.2em] text-accent uppercase">
            {en ? "DeepSeek Harness · Source explained" : "DeepSeek Harness · 源码图解"}
          </p>
          <h1 className="max-w-xl font-display text-4xl leading-[1.05] tracking-tight sm:text-6xl">
            {en ? "Everything is a brick." : "一切都是积木。"}
          </h1>
          <p className="mt-5 max-w-xl text-base leading-relaxed text-muted sm:text-lg">
            {en
              ? "An architecture picture book simple enough for a five-year-old. The agent thinks, keeps a journal, and acts—and every ability is a plugin you can pull out and replace."
              : "这是一本给五岁小孩也能翻懂的架构图画书。机器人会想、会写日记、会动手；每一块本事都是可以拔掉再换上的插件。"}
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button asChild size="lg">
              <LocalizedLink to="/story">
                {en ? "Read the story" : "先听故事"}
                <ArrowRight className="size-4" />
              </LocalizedLink>
            </Button>
            <Button asChild variant="outline" size="lg">
              <LocalizedLink to="/map">{en ? "Explore the map" : "看整座积木城"}</LocalizedLink>
            </Button>
            <Button asChild variant="ghost" size="lg">
              <LocalizedLink to="/loop">{en ? "Follow a turn" : "看一轮对话"}</LocalizedLink>
            </Button>
          </div>
        </div>
        <HeroCity en={en} />
      </section>

      <KidNote className="mt-12 max-w-3xl">
        {en ? (
          <>
            Imagine a LEGO box. The baseplate is <strong className="text-fg">Cordis</strong>. The
            brain, hands, journal, window, and fence all attach to it. Pull out a brick and its
            registered traces disappear too. That is what DeepSeek Harness means by{" "}
            <em>Everything is a Plugin</em>.
          </>
        ) : (
          <>
            想象一盒乐高。底板叫 <strong className="text-fg">Cordis</strong>
            。大脑、手、日记本、窗户、围栏，全都是卡在底板上的积木。不想要哪块，拔掉就好——痕迹也会一起消失。这就是
            DeepSeek Harness 说的 <em>Everything is a Plugin</em>。
          </>
        )}
      </KidNote>

      <ReleaseUpdate en={en} />

      <section className="mt-16">
        <div className="mb-6 flex items-end justify-between gap-4">
          <h2 className="text-2xl sm:text-3xl">{en ? "The ten-layer brick city" : "十层积木城"}</h2>
          <LocalizedLink to="/map" className="text-sm text-accent hover:underline">
            {en ? "Open the map" : "打开总图"}
          </LocalizedLink>
        </div>
        <ol className="grid gap-3 sm:grid-cols-2">
          {layers.map((layer, i) => (
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
          kicker={en ? "Principles" : "铁律"}
          title={en ? "Replaceable plugins, an honest journal" : "插件可换，日记不撒谎"}
          body="Everything is a plugin. Every run is traceable."
        />
        <Entry
          to="/cordis"
          kicker={en ? "Baseplate" : "底板"}
          title={en ? "Five rules hold the city together" : "五块积木卡住世界"}
          body={
            en
              ? "Plugins, Context, inject, events, and reversible effects."
              : "插件、上下文、inject、事件、可逆副作用。"
          }
        />
        <Entry
          to="/seams"
          kicker={en ? "Seams" : "接头"}
          title={en ? "Swap the hands; move the whole world" : "换一只手，整座城搬家"}
          body={
            en
              ? "Definition, provider, consumer. fs and subprocess move as a pair."
              : "定义、提供方、消费方。fs 和 subprocess 必须成对走。"
          }
        />
      </section>

      <section className="mt-16">
        <h2 className="mb-4 text-2xl">{en ? "Reading order" : "阅读顺序"}</h2>
        <ol className="grid gap-2 sm:grid-cols-2">
          {nav
            .filter((item) => item.to !== "/")
            .map((item, i) => (
              <li key={item.to}>
                <LocalizedLink
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
                </LocalizedLink>
              </li>
            ))}
        </ol>
      </section>
      <section className="mt-16">
        <div className="mb-5 flex items-end justify-between gap-4">
          <h2 className="text-2xl">{en ? "Frequently asked questions" : "常见问题"}</h2>
          <LocalizedLink to="/faq" className="text-sm text-accent hover:underline">
            {en ? "All questions" : "全部问答"}
          </LocalizedLink>
        </div>
        <FaqList limit={4} headingLevel={3} />
      </section>
      <SourceNote path="/" />
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
    <LocalizedLink
      to={to}
      className="group rounded-xl bg-elevated p-5 shadow-[var(--shadow-border)] transition-transform duration-[var(--motion-fast)] ease-[var(--ease-out)] hover:-translate-y-0.5"
    >
      <p className="font-mono text-xs tracking-widest text-accent uppercase">{kicker}</p>
      <h3 className="mt-3 text-xl">{title}</h3>
      <p className="mt-2 text-sm leading-relaxed text-muted">{body}</p>
      <p className="mt-4 inline-flex items-center gap-1 text-sm text-fg">
        {useLocale() === "en" ? "Open" : "打开"}
        <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-0.5" />
      </p>
    </LocalizedLink>
  );
}

function HeroCity({ en }: { en: boolean }) {
  return (
    <div className="rounded-2xl bg-ink p-4 shadow-[var(--shadow-lift)] sm:p-6">
      <p className="mb-4 font-mono text-xs tracking-widest text-subtle uppercase">
        {en ? "BRICK CITY · SECTION" : "积木城剖面"}
      </p>
      <div className="grid gap-2">
        <div className="grid grid-cols-3 gap-2">
          <Brick label={en ? "Window" : "窗户"} sub="client ui-*" compact={en} tone="fg" />
          <Brick label={en ? "Mailbox" : "信箱"} sub="webserver" compact={en} tone="fg" />
          <Brick label={en ? "Reception" : "接待"} sub="apiproxy" compact={en} tone="fg" />
        </div>
        <div className="grid grid-cols-4 gap-2">
          <Brick label={en ? "Skills" : "技能"} sub="skill" compact={en} tone="elevated" />
          <Brick label={en ? "Plan" : "计划"} sub="plan" compact={en} tone="elevated" />
          <Brick label={en ? "Helpers" : "帮手"} sub="subagent" compact={en} tone="elevated" />
          <Brick label={en ? "To-do" : "待办"} sub="todo" compact={en} tone="elevated" />
        </div>
        <div className="grid grid-cols-5 gap-2">
          <Brick label={en ? "Paper" : "纸笔"} sub="fs" compact={en} tone="ok" />
          <Brick label={en ? "Runner" : "跑腿"} sub="spawn" compact={en} tone="ok" />
          <Brick label={en ? "Fence" : "围栏"} sub="box" compact={en} tone="warn" />
          <Brick label={en ? "Voice" : "嘴巴"} sub="shell" compact={en} tone="ok" />
          <Brick label={en ? "LSP" : "眼镜"} sub="code map" compact={en} tone="ok" />
        </div>
        <div className="grid grid-cols-4 gap-2">
          <Brick label={en ? "Journal" : "日记"} sub="session" compact={en} tone="accent" />
          <Brick label={en ? "Heartbeat" : "心跳"} sub="loop" compact={en} tone="accent" />
          <Brick label={en ? "Tools" : "工具柜"} sub="tools" compact={en} tone="accent" />
          <Brick label={en ? "Brain" : "脑子"} sub="llm" compact={en} tone="accent" />
        </div>
        <Brick
          label={
            en
              ? "Cordis baseplate · Context · Fiber · reversible effects"
              : "Cordis 底板 · Context · Fiber · 可逆副作用"
          }
          tone="muted"
        />
      </div>
    </div>
  );
}
