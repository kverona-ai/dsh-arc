export const EVENT_DOMAINS = [
  {
    id: "session",
    title: "会话事件 · 日记",
    kid: "写进本子、重启还在的事实。",
    when: "必须在重新加载后仍然存在",
    color: "accent",
    items: [
      { name: "turn/start · turn/end", note: "一轮作业的开合" },
      { name: "step/start · step/end", note: "一次想+做" },
      { name: "user/message", note: "进入步骤的输入（surface）" },
      { name: "assistant/chunk · assistant/message", note: "速记与誊清" },
      { name: "tool/call · tool/result", note: "动手与成绩单" },
      { name: "request/header", note: "冻住的请求信封" },
      { name: "session/event", note: "对外广播每一条日志" },
    ],
  },
  {
    id: "agent",
    title: "Agent 事件 · 对讲机",
    kid: "正在干活时喊的话，不写进日记正文。",
    when: "观察或拦截飞行中的工作",
    color: "ok",
    items: [
      { name: "agent/inbox/*", note: "inserted / claimed / discarded / spliced" },
      { name: "agent/status", note: "idle ⇄ running" },
      { name: "agent/pre-step", note: "waterfall：拒绝或改写领取" },
      { name: "agent/request", note: "waterfall：换模型，不换作文" },
      { name: "agent/request-error", note: "waterfall：重试或放行失败" },
      { name: "agent/turn-stopping", note: "serial：最后塞一张便利贴的机会" },
    ],
  },
  {
    id: "capability",
    title: "能力事件 · 规矩",
    kid: "不必走进心跳房，也能给插座加锁。",
    when: "向 seam 附加策略和适配器",
    color: "warn",
    items: [
      { name: "llm/stream", note: "waterfall：包住适配器流" },
      { name: "tools/pre-execute", note: "allow / deny / ask" },
      { name: "tools/execute", note: "包住工具函数（超时、指标）" },
      { name: "tools/post-execute", note: "accept / replace / block" },
      { name: "fs/write-intent · fs/edit-intent", note: "写前观察策略" },
      { name: "system-prompt/assemble", note: "提示词最后组装" },
    ],
  },
];

export const DISPATCH_MODES = [
  {
    mode: "emit",
    await: "否",
    order: "注册顺序观察",
    ret: "无",
    kid: "广播：谁爱听谁听，不能否决。",
  },
  {
    mode: "waterfall",
    await: "否（但绕行）",
    order: "洋葱，从外到内",
    ret: "有",
    kid: "必须喊 next() 把纸传下去，否则就是你做主。",
  },
  {
    mode: "parallel",
    await: "是",
    order: "一起跑",
    ret: "无",
    kid: "全班同时做同一件事，比如把日记刷到磁盘。",
  },
  {
    mode: "serial",
    await: "是",
    order: "一个接一个",
    ret: "有",
    kid: "排队发言，没有 next()。turn-stopping 就是这种。",
  },
];
