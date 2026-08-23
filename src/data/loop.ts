export type EventKind = "durable" | "waterfall" | "emit" | "serial";

export interface LoopBeat {
  id: string;
  title: string;
  event: string;
  kind: EventKind;
  kid: string;
  tech: string;
}

export const LOOP_BEATS: LoopBeat[] = [
  {
    id: "doorbell",
    title: "按门铃",
    event: "followup() → agent/inbox/inserted",
    kind: "emit",
    kid: "你塞进一张新作业单，门铃响了。",
    tech: "Agent.followup() 把 UserMessage 放进 inbox.next-turn 并 wakeDriver。inject() 不叫醒；steer() 叫醒但进 next-step。",
  },
  {
    id: "turn-start",
    title: "打开一轮",
    event: "turn/start",
    kind: "durable",
    kid: "管家在日记本写下：『开始做作业。』就算最后没做成，这一页也留着。",
    tech: "ReactLoopAgent.turn() 先 append turn/start。被拒绝的首次领取仍关闭一个不含步骤的持久轮次。",
  },
  {
    id: "claim",
    title: "收拾桌面",
    event: "inbox.claim → agent/inbox/claimed",
    kind: "emit",
    kid: "把桌上所有便利贴和一张新作业单收进工作堆。收走了就不再放回去。",
    tech: "先清空 next-step，若目标是 next-turn 再取一张。Claim 是纯删除。pre-step 拒绝后消息不回队列、不写 user/message，轮次以 blocked 结束。",
  },
  {
    id: "assemble",
    title: "装订说明书",
    event: "ctx.systemPrompt.assemble",
    kind: "waterfall",
    kid: "把『我是谁』『有哪些工具』『教室规则』按页码订成一本。",
    tech: "合并全局 + scope 链段落与工具 schema，跑 system-prompt/assemble waterfall。complete: true 的段落不能被监听器替换掉。",
  },
  {
    id: "pre-step",
    title: "门卫盖章",
    event: "agent/pre-step",
    kind: "waterfall",
    kid: "一排门卫检查作业。可以改写、可以盖『不准进』。不喊 next() 就是自己做主。",
    tech: "默认 enter(claimed + 变化了的 runtime context)。compaction、hooks、skills 都挂在这里。reject 或首次 enter 被改空 → 关闭无步骤轮次。",
  },
  {
    id: "step-start",
    title: "开始一步",
    event: "step/start + user/message",
    kind: "durable",
    kid: "日记写下这一步，并把收进来的话抄成『用户说了什么』。",
    tech: "每条 entered message 以 surfaceOp: append 写入。此后 deriveMessages() 才能看见它们。",
  },
  {
    id: "request",
    title: "选哪本教科书",
    event: "agent/request → llm/stream",
    kind: "waterfall",
    kid: "可以换老师、换课本，但不能偷偷改作文——作文已经冻在日记里。",
    tech: "buildRequest() 冻结 messages。agent/request 只许改 provider/model/effort。llm/stream 的 next() 才是 adapterStream()。",
  },
  {
    id: "chunks",
    title: "老师边说边记",
    event: "assistant/chunk* → assistant/message",
    kind: "durable",
    kid: "每个音节先速记，说完再誊成干净的一段。回放时听速记，问模型时看誊清。",
    tech: "BlockAssembler 聚合 StreamChunk。空内容的 assistant/message 仍保留 usage，但不进入派生历史。",
  },
  {
    id: "tools",
    title: "动手做家务",
    event: "tool/call → tools/pre-execute → execute → post-execute → tool/result",
    kind: "waterfall",
    kid: "先填许可条，门卫检查，戴上手表，做事，老师打分，成绩单冻住。会抢玩具的要排队，粉红约定的可以同桌。",
    tech: "executionMode 分为 parallel / exclusive。exclusive 是屏障；parallel 受 maxParallelToolCalls（默认 10）滚动池限制。结果按模型顺序提交。",
  },
  {
    id: "step-end",
    title: "这一步合上",
    event: "step/end",
    kind: "durable",
    kid: "无论成功失败，这一页都要合上。",
    tech: "工具还欠下一次模型请求，或 next-step 里又有输入 → 再 claim → 下一步。",
  },
  {
    id: "stopping",
    title: "还有要说的吗？",
    event: "agent/turn-stopping",
    kind: "serial",
    kid: "放学铃响前问一句。有人塞便利贴，就再做一步；没人说话，就放学。",
    tech: "serial，没有 next()。监听器可 steer()。若 inbox.nextStep 仍空则 break。",
  },
  {
    id: "turn-end",
    title: "放学",
    event: "turn/end + agent/status idle",
    kind: "durable",
    kid: "日记写下为什么放学：做完了、被叫停了、出错了、或被门卫挡住了。",
    tech: "TurnEndReason：completed | aborted | blocked | error | max-tokens | interrupted（仅崩溃修复）。",
  },
];

export const INBOX_MODES = [
  {
    method: "followup()",
    target: "next-turn",
    wake: true,
    kid: "按门铃，交新作业。",
    when: "用户在聊天框回车",
  },
  {
    method: "steer()",
    target: "next-step",
    wake: true,
    kid: "人已经在干活，隔门喊一声。",
    when: "中途引导、计划退出后继续",
  },
  {
    method: "inject()",
    target: "next-step",
    wake: false,
    kid: "从门缝塞纸条，不敲门。",
    when: "运行时上下文、技能正文、时间",
  },
] as const;
