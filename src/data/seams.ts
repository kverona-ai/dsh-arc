export interface SeamExample {
  slug: string;
  ctx: string;
  name: string;
  kid: string;
  definition: string;
  providers: { pkg: string; note: string }[];
  consumers: { pkg: string; note: string }[];
  swapStory: string;
}

export const SEAMS: SeamExample[] = [
  {
    slug: "llm",
    ctx: "ctx.llm",
    name: "脑子",
    kid: "换老师，不必换教室。",
    definition: "@deepseek-ai/dsh-llm · LlmRuntime",
    providers: [
      { pkg: "dsh-llm-deepseek", note: "官方 DeepSeek 适配器" },
      { pkg: "dsh-llm-pi-ai", note: "多提供方，settings 里唤醒" },
      { pkg: "dsh-llm-replay", note: "用录制日志回放，测试不需要密钥" },
    ],
    consumers: [
      { pkg: "dsh-agent-loop", note: "llm/stream" },
      { pkg: "dsh-compaction-basic", note: "摘要时再调一次模型" },
    ],
    swapStory: "循环只认识 GenerateOptions 和 StreamChunk。换适配器不会改 session 日志形状。",
  },
  {
    slug: "fs",
    ctx: "ctx.fs",
    name: "纸和笔",
    kid: "读、写、改房间里的纸。纸在哪间房，由提供方决定。",
    definition: "@deepseek-ai/dsh-fs · FileSystem",
    providers: [
      { pkg: "dsh-fs-local", note: "本机磁盘" },
      { pkg: "dsh-fs-sandbox", note: "按 sandboxPolicy 围栏写入" },
      { pkg: "dsh-fs-e2b", note: "远程 Linux 沙箱里的磁盘" },
    ],
    consumers: [
      { pkg: "dsh-tool-fs", note: "read / write / edit" },
      { pkg: "dsh-tool-fs-search", note: "glob / grep（ripgrep）" },
    ],
    swapStory: "路径是不透明的 FsTarget。消费方问 processPath / fileUrl，不自己拼路径。",
  },
  {
    slug: "subprocess",
    ctx: "ctx.subprocess",
    name: "请人跑腿",
    kid: "真正把命令跑起来的那块积木。手、黑板、眼镜都找它。",
    definition: "@deepseek-ai/dsh-subprocess · SubprocessRuntime",
    providers: [
      { pkg: "dsh-subprocess-local", note: "本机进程树" },
      { pkg: "dsh-subprocess-e2b", note: "远程沙箱进程" },
    ],
    consumers: [
      { pkg: "dsh-bash-local / bash-sandbox", note: "shell 执行" },
      { pkg: "dsh-terminal-bash", note: "持久 PTY" },
      { pkg: "dsh-lsp-stdio", note: "语言服务器" },
      { pkg: "dsh-subagent-acp 等", note: "进程外子代理" },
    ],
    swapStory: "这是执行世界的原语。和 ctx.fs 成对替换，整个可变世界一起搬家。",
  },
  {
    slug: "sandbox",
    ctx: "ctx.sandbox",
    name: "围栏",
    kid: "不是搬家，是在这间屋里装婴儿门。",
    definition: "@deepseek-ai/dsh-sandbox · SandboxProvider.confine",
    providers: [
      { pkg: "dsh-sandbox-local", note: "bwrap / Landlock / Seatbelt / Windows ACL" },
    ],
    consumers: [
      { pkg: "dsh-bash-sandbox", note: "先 confine argv 再 spawn" },
      { pkg: "dsh-terminal-bash", note: "PTY 同样被围" },
    ],
    swapStory: "禁止静默放行。容器 / E2B 是另一种执行世界，不是 sandbox 后端。",
  },
  {
    slug: "shell",
    ctx: "ctx.shell",
    name: "嘴巴下令",
    kid: "模型说『跑这条命令』，嘴巴交给执行器和围栏。",
    definition: "@deepseek-ai/dsh-shell",
    providers: [
      { pkg: "dsh-bash-sandbox", note: "POSIX 默认" },
      { pkg: "dsh-pwsh-sandbox", note: "Windows 孪生行" },
      { pkg: "dsh-bash-local", note: "不围栏的本地执行器" },
    ],
    consumers: [
      { pkg: "dsh-tool-bash / tool-pwsh", note: "面向模型的 bash/pwsh 工具" },
    ],
    swapStory: "同一份 base patch 按平台门控，每个宿主恰好挂载一个 shell 栈。",
  },
  {
    slug: "subagents",
    ctx: "ctx.subagents",
    name: "请朋友帮忙",
    kid: "插座上可以同时插好几个不同的朋友：有的在屋里，有的在门外。",
    definition: "@deepseek-ai/dsh-subagent",
    providers: [
      { pkg: "spawn-in-process", note: "全新子 agent" },
      { pkg: "fork-in-process", note: "带着父日志前缀分叉" },
      { pkg: "acp / dsh-sdk", note: "进程外协议" },
      { pkg: "claude-code / codex", note: "产品提供方，可选 bundle" },
    ],
    consumers: [
      { pkg: "dsh-tool-subagent", note: "委托工具" },
      { pkg: "dsh-tool-ralph / workflow", note: "编排里的 agent()" },
    ],
    swapStory: "和 bash 不同：多个命名提供方可共存。start 前检查 depthLimit、toolFilter、persona。",
  },
  {
    slug: "persistence",
    ctx: "ctx.sessionPersistence",
    name: "把日记复印进抽屉",
    kid: "屋里那本日记是真的；抽屉里的复印件让重启后还能接着写。",
    definition: "@deepseek-ai/dsh-session-persistence",
    providers: [
      { pkg: "dsh-session-persistence-jsonl", note: "默认，$DSH_HOME/sessions" },
      { pkg: "dsh-session-persistence-sqlite", note: "可选" },
    ],
    consumers: [
      { pkg: "dsh-session", note: "session/event 同步通知，批量落盘" },
      { pkg: "checkpoint-policy", note: "下一轮之前的耐久点" },
    ],
    swapStory: "没有平行的持久化类型。崩溃时给未闭合的 turn 补 interrupted，不截断。",
  },
];

export const SEAM_RULES = [
  {
    title: "三角缺一不可",
    kid: "插座、插头、台灯要凑齐。只有插座不算能力。",
    tech: "Service Definition 声明 ctx 键；Provider 实现；Consumer 使用。扩展插件依赖定义，绝不依赖具体提供方。",
  },
  {
    title: "执行世界成对搬家",
    kid: "手和脚必须去同一间房。",
    tech: "fs 与 subprocess 共享执行世界。指向 E2B 时 Bash、PTY、LSP 一起走，无需提供方专用 fork。",
  },
  {
    title: "围栏不是搬家",
    kid: "婴儿门 ≠ 把游戏室搬到森林小屋。",
    tech: "ctx.sandbox.confine 包装本机 argv。远程沙箱是另一对 fs/subprocess 提供方。",
  },
  {
    title: "换一块，整座城跟着变",
    kid: "这就是 seam 存在的理由。",
    tech: "工具 schema 对模型保持稳定。policy 挂在 fs/*、tools/* 事件上，不必 import 循环。",
  },
];
