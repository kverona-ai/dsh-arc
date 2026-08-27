import { createFileRoute } from "@tanstack/react-router";
import { KidNote, TechNote } from "@/components/kid-note";
import { Page } from "@/components/page";
import { DISPATCH_MODES, EVENT_DOMAINS } from "@/data/events";

import { seoHead } from "@/lib/seo";
import { DISPATCH_MODES_EN, EVENT_DOMAINS_EN } from "@/data/en/events";
import { useLocale } from "@/lib/locale";

export const Route = createFileRoute("/events")({
  component: EventsPage,
  head: () => seoHead("/events"),
});

export function EventsPage() {
  const locale = useLocale();
  const en = locale === "en";
  const domains = en ? EVENT_DOMAINS_EN : EVENT_DOMAINS;
  const modes = en ? DISPATCH_MODES_EN : DISPATCH_MODES;
  const toolPipeline = en
    ? [
        "createExecution: freeze arguments",
        "tools/pre-execute waterfall: allow / deny / ask",
        "If ask → ctx.approval",
        "ToolGuard[]: may only tighten policy",
        "tools/execute waterfall: timeout wraps tool.execute",
        "tools/post-execute: accept / replace / block",
        "finalizeContent: last model-visible edit; must not throw",
        "tools/result emit: freeze the report card",
      ]
    : [
        "createExecution：冻住参数",
        "tools/pre-execute waterfall：allow / deny / ask",
        "若 ask → ctx.approval",
        "ToolGuard[]：只能更严，不能放宽",
        "tools/execute waterfall：超时手表包住 tool.execute",
        "tools/post-execute：accept / replace / block",
        "finalizeContent：最后改模型可见文本，不许抛错",
        "tools/result emit：成绩单冻住",
      ];
  return (
    <Page
      kicker={en ? "Events" : "事件"}
      title={en ? "Three books of events" : "三本喊话册"}
      lead={
        en
          ? "Choosing the right event domain is the first decision for most changes. Keep journal facts, live intercom calls, and capability policy in the right book."
          : "选对事件域，是大多数改动的第一个决定。日记、对讲机、规矩，不要写错本子。"
      }
    >
      <KidNote className="mb-10 max-w-3xl">
        {en
          ? "The journal records what must be remembered forever. The intercom carries live calls during work. Rules attach to sockets without entering the heartbeat room."
          : "日记本记下永远要记得的事。对讲机是干活时喊的话，合上本子就听不见。规矩贴在插座上，不必走进心跳房。"}
      </KidNote>

      <div className="grid gap-5 lg:grid-cols-3">
        {domains.map((d) => (
          <article
            key={d.id}
            className="rounded-2xl bg-surface p-5 shadow-[var(--shadow-border)] sm:p-6"
          >
            <p className="font-mono text-xs tracking-widest text-accent uppercase">{d.id}</p>
            <h2 className="mt-2 text-xl">{d.title}</h2>
            <p className="mt-2 text-sm">{d.kid}</p>
            <p className="mt-1 text-sm text-muted">
              {en ? "Use when" : "何时"}：{d.when}
            </p>
            <ul className="mt-5 grid gap-2">
              {d.items.map((it) => (
                <li key={it.name} className="rounded-md bg-elevated px-3 py-2">
                  <code className="font-mono text-xs text-fg">{it.name}</code>
                  <p className="text-sm text-muted">{it.note}</p>
                </li>
              ))}
            </ul>
          </article>
        ))}
      </div>

      <h2 className="mt-14 mb-4 text-2xl">{en ? "The tool pipeline" : "工具流水线"}</h2>
      <ol className="grid gap-2 md:grid-cols-2">
        {toolPipeline.map((s, i) => (
          <li
            key={s}
            className="flex gap-3 rounded-xl bg-elevated px-4 py-3 text-sm shadow-[var(--shadow-border)]"
          >
            <span className="font-mono text-accent tabular-nums">
              {String(i + 1).padStart(2, "0")}
            </span>
            <span>{s}</span>
          </li>
        ))}
      </ol>

      <h2 className="mt-14 mb-4 text-2xl">
        {en ? "The four dispatch modes, once more" : "四种喊法再看一眼"}
      </h2>
      <div className="grid gap-3 sm:grid-cols-2">
        {modes.map((m) => (
          <article key={m.mode} className="rounded-xl bg-surface p-5 shadow-[var(--shadow-border)]">
            <code className="font-mono text-accent">{m.mode}</code>
            <p className="mt-2">{m.kid}</p>
          </article>
        ))}
      </div>

      <TechNote className="mt-8">
        {en
          ? "An SDK that needs a replayable transcript should consume session/event. agent/* is the live interface for queues, status, interception, request construction, steering, and error handling. See docs/event-producer-consumer.md for the full producer/consumer matrix."
          : "SDK 若要可回放 transcript，应消费 session/event。agent/* 是队列、状态、拦截、请求构造、steering 和错误处理的实时接口。完整生产者/消费者矩阵见 docs/event-producer-consumer.md。"}
      </TechNote>
    </Page>
  );
}
