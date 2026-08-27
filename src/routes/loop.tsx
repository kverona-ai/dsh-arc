import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { KidNote, TechNote } from "@/components/kid-note";
import { Page } from "@/components/page";
import { Button } from "@/components/ui/button";
import { INBOX_MODES, LOOP_BEATS } from "@/data/loop";
import { cn } from "@/lib/utils";

import { seoHead } from "@/lib/seo";
import { INBOX_MODES_EN, LOOP_BEATS_EN } from "@/data/en/loop";
import { useLocale } from "@/lib/locale";

export const Route = createFileRoute("/loop")({
  component: LoopPage,
  head: () => seoHead("/loop"),
});

const KIND_LABEL = {
  durable: "日记",
  waterfall: "洋葱",
  emit: "广播",
  serial: "排队",
} as const;

const KIND_LABEL_EN = {
  durable: "journal",
  waterfall: "waterfall",
  emit: "broadcast",
  serial: "serial",
} as const;

export function LoopPage() {
  const locale = useLocale();
  const en = locale === "en";
  const beats = en ? LOOP_BEATS_EN : LOOP_BEATS;
  const inboxModes = en ? INBOX_MODES_EN : INBOX_MODES;
  const kindLabel = en ? KIND_LABEL_EN : KIND_LABEL;
  const [i, setI] = useState(0);
  const [playing, setPlaying] = useState(true);
  const beat = beats[i]!;

  useEffect(() => {
    if (!playing) return;
    const id = window.setInterval(() => {
      setI((n) => (n + 1) % beats.length);
    }, 2400);
    return () => window.clearInterval(id);
  }, [beats.length, playing]);

  return (
    <Page
      kicker={en ? "One conversation turn" : "一轮对话"}
      title={en ? "Bell, journal, think, act, finish" : "门铃、日记、想、动手、放学"}
      lead={
        en
          ? "A step is one model request plus the tools it calls. A turn contains zero or more steps."
          : "一个步骤是一次模型请求加上它调用的工具。一个轮次包含零个或多个步骤。"
      }
    >
      <KidNote className="mb-8 max-w-3xl">
        {en
          ? "You ring the bell and the caretaker opens a turn. It claims notes from the desk, gets the hall monitor's stamp, records the teacher as they speak, and performs the work. Then it asks, ‘Anything else?’ Silence ends the turn. Every stage goes into the journal."
          : "你按门铃。管家打开一轮作业。先把桌上纸条收走，门卫盖章，老师边说边记，再去干活。干完问一句「还有吗？」没人说话就放学。全程都要写进日记。"}
      </KidNote>

      <div className="grid gap-6 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">
        <div className="rounded-2xl bg-ink p-5 shadow-[var(--shadow-border)] sm:p-6">
          <div className="mb-4 flex items-center justify-between gap-3">
            <p className="font-mono text-xs tracking-widest text-subtle uppercase">
              {en ? "Playback" : "播放"}
            </p>
            <Button variant="outline" size="sm" onClick={() => setPlaying((p) => !p)}>
              {playing ? (en ? "Pause" : "暂停") : en ? "Resume" : "继续"}
            </Button>
          </div>
          <ol className="grid gap-1">
            {beats.map((b, idx) => (
              <li key={b.id}>
                <button
                  type="button"
                  onClick={() => {
                    setI(idx);
                    setPlaying(false);
                  }}
                  className={cn(
                    "flex w-full items-center justify-between gap-3 rounded-md px-3 py-2.5 text-left text-sm",
                    idx === i
                      ? "bg-accent text-accent-fg"
                      : "text-muted hover:bg-elevated hover:text-fg",
                  )}
                >
                  <span>{b.title}</span>
                  <span className="font-mono text-[10px] tracking-wider uppercase opacity-70">
                    {kindLabel[b.kind]}
                  </span>
                </button>
              </li>
            ))}
          </ol>
        </div>

        <article className="rounded-2xl bg-elevated p-6 shadow-[var(--shadow-border)] sm:p-8">
          <p className="font-mono text-xs text-accent">
            {String(i + 1).padStart(2, "0")} / {String(beats.length).padStart(2, "0")} ·{" "}
            {kindLabel[beat.kind]}
          </p>
          <h2 className="mt-3 text-3xl">{beat.title}</h2>
          <code className="mt-3 block font-mono text-sm text-muted">{beat.event}</code>
          <p className="mt-5 text-base leading-relaxed">{beat.kid}</p>
          <p className="mt-4 text-sm leading-relaxed text-muted">{beat.tech}</p>
        </article>
      </div>

      <h2 className="mt-14 mb-4 text-2xl">
        {en ? "Three ways to add a note" : "三种塞纸条的办法"}
      </h2>
      <div className="grid gap-3 md:grid-cols-3">
        {inboxModes.map((m) => (
          <article
            key={m.method}
            className="rounded-xl bg-surface p-5 shadow-[var(--shadow-border)]"
          >
            <code className="font-mono text-sm text-accent">{m.method}</code>
            <p className="mt-3">{m.kid}</p>
            <p className="mt-2 text-sm text-muted">
              {m.target} · {m.wake ? (en ? "wakes" : "叫醒") : en ? "does not wake" : "不叫醒"}
            </p>
            <p className="mt-2 text-sm text-subtle">{m.when}</p>
          </article>
        ))}
      </div>

      <h2 className="mt-14 mb-4 text-2xl">{en ? "The official turn skeleton" : "官方轮次骨架"}</h2>
      <pre className="overflow-x-auto rounded-2xl bg-ink p-5 font-mono text-xs leading-relaxed text-muted shadow-[var(--shadow-border)] sm:p-6 sm:text-sm">
        {en
          ? `turn/start
  claim next-step + one queued message
  assemble prompt + tool schemas
  -> agent/pre-step          reject | enter
     reject or empty first enter → close a zero-step turn
     step/start
     append user/message
     deriveMessages() projects history
     agent/request → llm/stream → chunk* → assistant/message
     tool/call* → pre-execute → execute → post-execute → tool/result*
     step/end
     another request owed, or next-step has input → next step
  -> agent/turn-stopping     serial, no next()
turn/end`
          : `turn/start
  claim next-step + 一张排队的话
  assemble prompt + tool schemas
  -> agent/pre-step          reject | enter
     拒绝或首次 enter 被改空 → 关闭无步骤轮次
     step/start
     写入 user/message
     deriveMessages() 投影历史
     agent/request → llm/stream → chunk* → assistant/message
     tool/call* → pre-execute → execute → post-execute → tool/result*
     step/end
     还欠下一次请求，或 next-step 又来了 → 下一步
  -> agent/turn-stopping     serial，没有 next()
turn/end`}
      </pre>

      <h2 className="mt-14 mb-4 text-2xl">
        {en ? "If the model sees it, it is already logged" : "模型看见的一定已经记下"}
      </h2>
      <div className="grid gap-4 lg:grid-cols-2">
        <TechNote>
          {en
            ? "deriveMessages() projects only surface events: user/message, non-empty assistant/message, and tool/result. Chunks, turn/step, inbox splices, and request/header do not enter model history. A compaction replace removes nodes hidden by its shadow."
            : "deriveMessages() 只投影 surface：user/message、非空 assistant/message、tool/result。chunk、turn/step、inbox splice、request/header 都不进模型历史。compaction 的 replace 会撕掉被阴影罩住的节点。"}
        </TechNote>
        <TechNote title={en ? "The loop stores no chat array" : "循环不存聊天数组"}>
          {en
            ? "ReactLoopAgent lives at packages/core/agent-loop/src/agent.ts. Every request is rebuilt from request/header + deriveMessages(). agent/request may not edit messages. That is model-visible means logged."
            : "ReactLoopAgent 在 packages/core/agent-loop/src/agent.ts。每次请求由 request/header + deriveMessages() 重建。agent/request 不许改 messages。这就是「模型可见即已记录」。"}
        </TechNote>
      </div>
    </Page>
  );
}
