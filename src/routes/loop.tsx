import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { KidNote, TechNote } from "@/components/kid-note";
import { Page } from "@/components/page";
import { Button } from "@/components/ui/button";
import { INBOX_MODES, LOOP_BEATS } from "@/data/loop";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/loop")({ component: LoopPage });

const KIND_LABEL = {
  durable: "日记",
  waterfall: "洋葱",
  emit: "广播",
  serial: "排队",
} as const;

function LoopPage() {
  const [i, setI] = useState(0);
  const [playing, setPlaying] = useState(true);
  const beat = LOOP_BEATS[i]!;

  useEffect(() => {
    if (!playing) return;
    const id = window.setInterval(() => {
      setI((n) => (n + 1) % LOOP_BEATS.length);
    }, 2400);
    return () => window.clearInterval(id);
  }, [playing]);

  return (
    <Page
      kicker="一轮对话"
      title="门铃、日记、想、动手、放学"
      lead="一个步骤是一次模型请求加上它调用的工具。一个轮次包含零个或多个步骤。"
    >
      <KidNote className="mb-8 max-w-3xl">
        你按门铃。管家打开一轮作业。先把桌上纸条收走，门卫盖章，老师边说边记，再去干活。
        干完问一句「还有吗？」没人说话就放学。全程都要写进日记。
      </KidNote>

      <div className="grid gap-6 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">
        <div className="rounded-2xl bg-ink p-5 shadow-[var(--shadow-border)] sm:p-6">
          <div className="mb-4 flex items-center justify-between gap-3">
            <p className="font-mono text-xs tracking-widest text-subtle uppercase">播放</p>
            <Button variant="outline" size="sm" onClick={() => setPlaying((p) => !p)}>
              {playing ? "暂停" : "继续"}
            </Button>
          </div>
          <ol className="grid gap-1">
            {LOOP_BEATS.map((b, idx) => (
              <li key={b.id}>
                <button
                  type="button"
                  onClick={() => {
                    setI(idx);
                    setPlaying(false);
                  }}
                  className={cn(
                    "flex w-full items-center justify-between gap-3 rounded-md px-3 py-2.5 text-left text-sm",
                    idx === i ? "bg-accent text-accent-fg" : "text-muted hover:bg-elevated hover:text-fg",
                  )}
                >
                  <span>{b.title}</span>
                  <span className="font-mono text-[10px] tracking-wider uppercase opacity-70">
                    {KIND_LABEL[b.kind]}
                  </span>
                </button>
              </li>
            ))}
          </ol>
        </div>

        <article className="rounded-2xl bg-elevated p-6 shadow-[var(--shadow-border)] sm:p-8">
          <p className="font-mono text-xs text-accent">
            {String(i + 1).padStart(2, "0")} / {String(LOOP_BEATS.length).padStart(2, "0")} ·{" "}
            {KIND_LABEL[beat.kind]}
          </p>
          <h2 className="mt-3 text-3xl">{beat.title}</h2>
          <code className="mt-3 block font-mono text-sm text-muted">{beat.event}</code>
          <p className="mt-5 text-base leading-relaxed">{beat.kid}</p>
          <p className="mt-4 text-sm leading-relaxed text-muted">{beat.tech}</p>
        </article>
      </div>

      <h2 className="mt-14 mb-4 text-2xl">三种塞纸条的办法</h2>
      <div className="grid gap-3 md:grid-cols-3">
        {INBOX_MODES.map((m) => (
          <article key={m.method} className="rounded-xl bg-surface p-5 shadow-[var(--shadow-border)]">
            <code className="font-mono text-sm text-accent">{m.method}</code>
            <p className="mt-3">{m.kid}</p>
            <p className="mt-2 text-sm text-muted">
              {m.target} · {m.wake ? "叫醒" : "不叫醒"}
            </p>
            <p className="mt-2 text-sm text-subtle">{m.when}</p>
          </article>
        ))}
      </div>

      <h2 className="mt-14 mb-4 text-2xl">官方轮次骨架</h2>
      <pre className="overflow-x-auto rounded-2xl bg-ink p-5 font-mono text-xs leading-relaxed text-muted shadow-[var(--shadow-border)] sm:p-6 sm:text-sm">
        {`turn/start
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

      <h2 className="mt-14 mb-4 text-2xl">模型看见的一定已经记下</h2>
      <div className="grid gap-4 lg:grid-cols-2">
        <TechNote>
          deriveMessages() 只投影 surface：user/message、非空 assistant/message、tool/result。
          chunk、turn/step、inbox splice、request/header 都不进模型历史。compaction 的 replace
          会撕掉被阴影罩住的节点。
        </TechNote>
        <TechNote title="循环不存聊天数组">
          ReactLoopAgent 在 packages/core/agent-loop/src/agent.ts。每次请求由 request/header
          + deriveMessages() 重建。agent/request 不许改 messages。这就是「模型可见即已记录」。
        </TechNote>
      </div>
    </Page>
  );
}
