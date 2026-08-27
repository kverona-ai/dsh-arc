export const PILLARS = [
  {
    id: "plugin",
    title: "Everything is a plugin",
    kid: "每一块本事都是积木：脑子、手、日记、围栏、循环、窗户。换一块，不用拆整座城。",
    tech: "DeepSeek Harness 建在 Cordis 上。模型适配器、工具、技能、会话、沙箱、存储、循环、调度和 UI 都是插件。通过配置选择、替换或扩展，不必改 dsh 源码。没有需要打补丁的特权内核。",
  },
  {
    id: "trace",
    title: "Every run is traceable",
    kid: "模型看见的每一句话，都已经写进只能往后翻的日记。合上再打开，故事还在。",
    tech: "系统提示、推理、工具调用与结果、子代理调度、每一次上下文注入，都追加进 Session 日志。Resume、fork、检索、回放都走同一条事件流。运行时不变量断言：模型可见即已记录。",
  },
] as const;

export const RUNTIME_MODES = [
  {
    id: "standard",
    name: "标准模式",
    kid: "全套编程机器人：改文件、敲命令、上网、技能、计划、目标、帮手、编舞。",
    note: "完整工具与编码人格。agent preset：standard。",
  },
  {
    id: "code",
    name: "PTC 模式",
    kid: "标准套装再加实验室：让模型用一段 TypeScript 把好多步活编排在一起。",
    note: "界面已改称 PTC Mode；内部仍以 code preset 与 Code Mode SDK 组合多轮操作。",
  },
  {
    id: "minimal",
    name: "极简模式",
    kid: "只留嘴巴和橡皮，用来给模型打分。",
    note: "持久 bash + str_replace_editor，适合基准测试。",
  },
  {
    id: "creator",
    name: "创造模式",
    kid: "允许机器人给自己加积木、检查现在挂了哪些插件。",
    note: "标准能力 + 运行时自检、内存里试插件、组合成新 preset。",
  },
] as const;

export const EXTEND_MAP = [
  {
    goal: "加一个模型提供方",
    hang: "ctx.llm",
    kid: "再请一位老师。教室不用拆。",
  },
  {
    goal: "加一项模型会用的能力",
    hang: "ctx.tools",
    kid: "往工具柜里放新工具，说明书会自动订进出门手册。",
  },
  {
    goal: "让某一会话拥有另一套能力",
    hang: "agent preset + isolate",
    kid: "给这个机器人单独换衣服。水龙头也是它自己的。",
  },
  {
    goal: "加 shell 执行",
    hang: "ctx.shell → ctx.subprocess",
    kid: "嘴巴下令，跑腿的人真正去跑。",
  },
  {
    goal: "加一直开着的终端",
    hang: "ctx.terminals + dsh-tool-terminal",
    kid: "墙上挂一块不会关的小黑板。",
  },
  {
    goal: "加人类口令",
    hang: "ctx.commands",
    kid: "不用喊老师，你自己就能下口令。",
  },
  {
    goal: "加后台慢工",
    hang: "ctx.jobs · job_* 工具",
    kid: "把活丢进洗衣机，过一会儿再看。",
  },
  {
    goal: "加文件系统或写前策略",
    hang: "ctx.fs 或 fs/* 事件",
    kid: "换书桌，或在动笔前加一条家规。",
  },
  {
    goal: "限制所启动的进程",
    hang: "ctx.sandbox.confine(argv)",
    kid: "出门前先套上围栏。不是搬家。",
  },
  {
    goal: "拦截请求、工具或轮次",
    hang: "agent/* 或 tools/*",
    kid: "门卫盖章、洋葱传纸。turn-stopping 能叫停放学。",
  },
  {
    goal: "加模型可见的上下文",
    hang: "agent.inject()",
    kid: "从门缝塞纸条。不敲门，等下一回领取。",
  },
  {
    goal: "加 UI 或编辑器",
    hang: "ctx.agents + session/event",
    kid: "窗户只看日记广播，不自己编故事。",
  },
  {
    goal: "加聊天节点",
    hang: "ConversationNodeDefinition",
    kid: "在毡板上再按一张新图片。",
  },
  {
    goal: "加持久会话状态",
    hang: "扩展 SessionEventMap",
    kid: "日记里多一种句子。回放也从日记来。",
  },
  {
    goal: "给会话起标题",
    hang: "唯一的 ctx.sessionTitle 提供方",
    kid: "给日记本起名字的人只能有一个。",
  },
  {
    goal: "管理同会话目标",
    hang: "ctx.goals + agent/*",
    kid: "冰箱上的目标贴，做完再揭。",
  },
  {
    goal: "fork 一个还在写的本子",
    hang: "ctx.sessions.fork(...)",
    kid: "把日记复印一份，从某一页开始另写。",
  },
  {
    goal: "把注册限定到一个 agent",
    hang: "agent.ctx",
    kid: "东西放进这个人的储物柜，不是大厅。",
  },
] as const;
