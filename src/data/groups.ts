export type Layer =
  | "vendor"
  | "boot"
  | "core"
  | "brain"
  | "hands"
  | "memory"
  | "skills"
  | "window"
  | "grownups"
  | "extras";

export interface Group {
  slug: string;
  name: string;
  path: string;
  layer: Layer;
  ctx?: string;
  kid: string;
  job: string;
  color: string;
}

export const LAYERS: { id: Layer; title: string; kid: string; job: string }[] = [
  {
    id: "vendor",
    title: "底板 · Cordis",
    kid: "像乐高底板。没有它，积木会散架。",
    job: "插件框架：Context、Service、Fiber、可逆副作用、类型化事件。",
  },
  {
    id: "boot",
    title: "拼法 · Profile / Bundle",
    kid: "先选玩具盒，再按说明书一层一层叠。",
    job: "CLI 启动、profile 组合、bundle 补丁层、空树叠加。",
  },
  {
    id: "core",
    title: "主干 · Agent Loop",
    kid: "机器人的心跳：听一句话、想一步、动手、再想。",
    job: "session / systemPrompt / tools / agents / agentLoop / scope。",
  },
  {
    id: "brain",
    title: "脑子 · LLM",
    kid: "真正会说话的那块积木，可以换成别的牌子。",
    job: "消息词汇、流式适配器、DeepSeek / pi-ai / retry / token-meter。",
  },
  {
    id: "hands",
    title: "手脚 · 执行世界",
    kid: "手、脚和围栏必须待在同一个房间里。",
    job: "fs / subprocess / sandbox / shell / terminal / lsp 共享执行世界。",
  },
  {
    id: "memory",
    title: "日记 · Session",
    kid: "发生过的事都写在本子上，合上再打开还能接着看。",
    job: "仅追加事件日志、JSONL/SQLite 持久化、投影、检索、标题。",
  },
  {
    id: "skills",
    title: "本领 · 能力插件",
    kid: "教机器人新本事：查网页、请帮手、写待办。",
    job: "tools 消费方：skill / plan / goal / jobs / workflow / subagent / web / mcp。",
  },
  {
    id: "window",
    title: "窗户 · Host + Client",
    kid: "屋子里有一扇窗，你从窗外看机器人工作。",
    job: "webserver / apiproxy 在宿主；slot / ui-* 在浏览器。",
  },
  {
    id: "grownups",
    title: "规矩 · 人机协作",
    kid: "大人决定哪些积木能碰，哪些要先举手。",
    job: "approval / permission / commands / credentials / settings / identity。",
  },
  {
    id: "extras",
    title: "其它 · 配套",
    kid: "胶水、尺子、测试积木，让整座城不晃。",
    job: "typert / sdk / acp / util / test-support / experimental。",
  },
];

// One drawer per line, same reason as PACKAGES in ./packages.ts.
// prettier-ignore
export const GROUPS: Group[] = [
  { slug: "vendor", name: "vendor / Cordis", path: "vendor/", layer: "vendor", kid: "积木底板", job: "Cordis、Loader、Include、HMR、Schemastery", color: "accent" },
  { slug: "boot", name: "boot", path: "packages/boot", layer: "boot", ctx: "boot helpers", kid: "开机说明书", job: "app-boot、cmdline、profile 组装", color: "fg" },
  { slug: "bundle", name: "bundle", path: "packages/bundle", layer: "boot", kid: "现成玩具盒", job: "dsh-base / web-app / headless 补丁层", color: "fg" },
  { slug: "core", name: "core", path: "packages/core", layer: "core", ctx: "ctx.sessions / tools / agents / agentLoop / systemPrompt", kid: "心跳和日记本", job: "session、prompt、tools、agent、loop、scope", color: "accent" },
  { slug: "llm", name: "llm", path: "packages/llm", layer: "brain", ctx: "ctx.llm", kid: "会说话的脑子", job: "适配器 seam + DeepSeek / pi-ai / retry / token-meter", color: "accent" },
  { slug: "fs", name: "fs", path: "packages/fs", layer: "hands", ctx: "ctx.fs", kid: "读写房间里的纸", job: "文件系统 seam、本地/沙箱提供方、read/write/edit/glob/grep", color: "ok" },
  { slug: "subprocess", name: "subprocess", path: "packages/subprocess", layer: "hands", ctx: "ctx.subprocess", kid: "请外面的小朋友帮忙跑", job: "进程组、输出 spill、升级杀死", color: "ok" },
  { slug: "sandbox", name: "sandbox", path: "packages/sandbox", layer: "hands", ctx: "ctx.sandbox", kid: "围栏游戏区", job: "bwrap / Landlock / Seatbelt / Windows ACL", color: "warn" },
  { slug: "shell", name: "shell", path: "packages/shell", layer: "hands", ctx: "ctx.shell", kid: "说话就能敲命令", job: "bash / pwsh 执行器 + 面向模型的工具", color: "ok" },
  { slug: "terminal", name: "terminal", path: "packages/terminal", layer: "hands", ctx: "ctx.terminals", kid: "一直开着的小黑板", job: "持久 PTY、owner 隔离、六件工具", color: "ok" },
  { slug: "lsp", name: "lsp", path: "packages/lsp", layer: "hands", ctx: "ctx.lsp", kid: "会读代码地图的眼镜", job: "语言服务器 seam + stdio 提供方 + lsp 工具", color: "ok" },
  { slug: "code-runtime", name: "code-runtime", path: "packages/code-runtime", layer: "hands", ctx: "ctx.codeRuntime", kid: "小实验室", job: "代码执行 seam：worker 线程 / CPython", color: "ok" },
  { slug: "session", name: "session", path: "packages/session", layer: "memory", ctx: "ctx.sessionPersistence", kid: "把日记本收进抽屉", job: "JSONL/SQLite、投影、遥测、标题、checkpoint", color: "accent" },
  { slug: "session-query", name: "session-query", path: "packages/session-query", layer: "memory", ctx: "ctx.sessionQuery", kid: "翻旧日记", job: "读取、血缘、过滤、SQLite FTS", color: "accent" },
  { slug: "storage", name: "storage", path: "packages/storage", layer: "memory", ctx: "ctx.storage", kid: "不是日记的小盒子", job: "非会话 KV 中枢 + JSON/SQLite + domain", color: "accent" },
  { slug: "attachment", name: "attachment", path: "packages/attachment", layer: "memory", ctx: "ctx.attachments", kid: "把照片贴在日记外面", job: "内容寻址附件，日志只存引用", color: "accent" },
  { slug: "compaction", name: "compaction", path: "packages/compaction", layer: "memory", ctx: "ctx.compaction", kid: "日记太厚就摘要", job: "token-meter 驱动摘要 + 工具结果剪枝", color: "warn" },
  { slug: "spill", name: "spill", path: "packages/spill", layer: "memory", ctx: "ctx.spillStore", kid: "太长的话写到另一张纸", job: "超长工具结果外溢", color: "warn" },
  { slug: "skill", name: "skill", path: "packages/skill", layer: "skills", ctx: "ctx.skills", kid: "技能卡片", job: "技能注册表、文件系统提供方、loader 工具", color: "fg" },
  { slug: "plan", name: "plan", path: "packages/plan", layer: "skills", ctx: "ctx.planMode", kid: "先画图纸再动手", job: "Plan 模式：探索、提交、等人审", color: "fg" },
  { slug: "goal", name: "goal", path: "packages/goal", layer: "skills", ctx: "ctx.goals", kid: "墙上贴的目标", job: "同会话目标持久化与 round driver", color: "fg" },
  { slug: "jobs", name: "jobs", path: "packages/jobs", layer: "skills", ctx: "ctx.jobs", kid: "后台慢慢做的事", job: "后台任务注册表 + job_* 工具", color: "fg" },
  { slug: "workflow", name: "workflow", path: "packages/workflow", layer: "skills", ctx: "ctx.workflowEngine", kid: "编舞脚本", job: "模型写 JS 编排，worker 线程执行", color: "fg" },
  { slug: "subagent", name: "subagent", path: "packages/subagent", layer: "skills", ctx: "ctx.subagents", kid: "请另一个机器人帮忙", job: "spawn / fork / ACP / SDK / Claude / Codex", color: "fg" },
  { slug: "web", name: "web", path: "packages/web", layer: "skills", ctx: "ctx.web", kid: "去网上找东西", job: "search / fetch 提供方 + 模型工具", color: "fg" },
  { slug: "mcp", name: "mcp", path: "packages/mcp", layer: "skills", ctx: "ctx.tools", kid: "外面商店里的工具", job: "MCP 客户端桥，把远端工具挂到 ctx.tools", color: "fg" },
  { slug: "todo", name: "todo", path: "packages/todo", layer: "skills", kid: "待办清单", job: "todo_write，整表快照进会话日志", color: "fg" },
  { slug: "extensions", name: "extensions", path: "packages/extensions", layer: "skills", kid: "机器人给自己加积木", job: "模型自写插件：inspect / mount / dispose", color: "fg" },
  { slug: "host", name: "host", path: "packages/host", layer: "window", kid: "屋子这一半", job: "webserver、apiproxy、静态前端、目录选择", color: "accent" },
  { slug: "client", name: "client", path: "packages/client", layer: "window", kid: "窗户这一半", job: "slot、conversation、sidebar、settings 等 ui-* 插件", color: "accent" },
  { slug: "interaction", name: "interaction", path: "packages/interaction", layer: "grownups", ctx: "ctx.approval / commands / userQuestions", kid: "举手问大人", job: "批准、权限预设、slash 命令、问用户", color: "warn" },
  { slug: "credentials", name: "credentials", path: "packages/credentials", layer: "grownups", ctx: "ctx.credentials", kid: "钥匙放保险箱", job: "凭据引用 seam + 本地提供方 + 授权流", color: "warn" },
  { slug: "settings", name: "settings", path: "packages/settings", layer: "grownups", ctx: "ctx.settings", kid: "墙上的开关", job: "用户设置 seam + settings.yaml", color: "warn" },
  { slug: "guard", name: "guard", path: "packages/guard", layer: "grownups", kid: "别转圈圈", job: "重复调用提醒 + 工具超时", color: "warn" },
  { slug: "hooks", name: "hooks", path: "packages/hooks", layer: "grownups", kid: "别的积木说明书也能用", job: "Claude Code / Codex 钩子桥", color: "warn" },
  { slug: "identity", name: "identity", path: "packages/identity", layer: "grownups", kid: "匿名名牌", job: "共享匿名用户 id，用于遥测与反馈", color: "warn" },
  { slug: "feedback", name: "feedback", path: "packages/feedback", layer: "grownups", kid: "竖拇指", job: "会话反馈命令 + 逐条评分", color: "warn" },
  { slug: "workspace", name: "workspace", path: "packages/workspace", layer: "grownups", ctx: "ctx.workspaceRegistry", kid: "这间房间叫什么", job: "工作区实体注册表", color: "warn" },
  { slug: "preset", name: "preset", path: "packages/preset", layer: "boot", ctx: "ctx.agentPresets", kid: "不同机器人套装", job: "按会话组装 agent + persona", color: "fg" },
  { slug: "context", name: "context", path: "packages/context", layer: "core", kid: "出门前看一眼钟和说明书", job: "AGENTS.md、时间、tmux、@file/@session", color: "fg" },
  { slug: "api", name: "api", path: "packages/api", layer: "window", ctx: "ctx.typertGateway", kid: "屋里屋外的传声筒", job: "Typert RPC 网关与 Remote BFF", color: "accent" },
  { slug: "typert", name: "typert", path: "packages/typert", layer: "extras", ctx: "ctx.typert", kid: "给积木画说明书", job: "类型图生成、加载、运行时注册表", color: "subtle" },
  { slug: "sdk", name: "sdk", path: "packages/sdk", layer: "extras", kid: "用遥控器开车", job: "进程外 JSON-RPC 客户端 / 协议 / 服务器", color: "subtle" },
  { slug: "acp", name: "acp", path: "packages/acp", layer: "extras", kid: "自动化专用插头", job: "Agent Client Protocol stdio 服务器", color: "subtle" },
  { slug: "schedule", name: "schedule", path: "packages/schedule", layer: "skills", kid: "闹钟", job: "会话内 after / at / 固定频率提醒", color: "fg" },
  { slug: "e2b", name: "e2b", path: "packages/e2b", layer: "hands", ctx: "ctx.e2b", kid: "把房间搬到云上", job: "E2B 沙箱生命周期 + fs/subprocess 提供方", color: "ok" },
  { slug: "experimental", name: "experimental", path: "packages/experimental", layer: "extras", ctx: "ctx.agentTeams", kid: "实验小队", job: "Agent Teams：花名册、邮箱、任务板", color: "subtle" },
  { slug: "runtime-diagnostics", name: "runtime-diagnostics", path: "packages/runtime-diagnostics", layer: "extras", ctx: "ctx.invariants", kid: "体检表", job: "包自有运行时不变量注册表", color: "subtle" },
  { slug: "util", name: "util", path: "packages/util", layer: "extras", kid: "胶水与尺子", job: "brand、home-paths、timeout、atomic-write", color: "subtle" },
  { slug: "test-support", name: "test-support", path: "packages/test-support", layer: "extras", kid: "练习用积木", job: "testkit、LLM mock、replay、loader smoke", color: "subtle" },
];

export function groupBySlug(slug: string) {
  return GROUPS.find((g) => g.slug === slug);
}

export function groupsInLayer(layer: Layer) {
  return GROUPS.filter((g) => g.layer === layer);
}
