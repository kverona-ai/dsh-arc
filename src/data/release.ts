export const HARNESS_RELEASE = {
  version: "0.1.1-rc.2",
  tag: "dsh-v0.1.1-rc.2",
  commit: "b150a55",
  released: "2026-08-21",
  packageCount: 227,
  url: "https://github.com/deepseek-ai/deepseek-harness/releases/tag/dsh-v0.1.1-rc.2",
} as const;

export const RELEASE_HIGHLIGHTS = [
  {
    icon: "vision",
    zh: "图片成为原生输入：DeepSeek 适配器会经 Files API 上传、复用并自动预处理图片。",
    en: "Images are native input: the DeepSeek adapter uploads, reuses, and preprocesses them through the Files API.",
  },
  {
    icon: "collaboration",
    zh: "子 Agent 能直接接入 Claude Code、Codex 与 ACP，并通过控制、报告和任务面板协作。",
    en: "Subagents can connect to Claude Code, Codex, and ACP, with control, reporting, and job-panel workflows.",
  },
  {
    icon: "safety",
    zh: "执行链更稳：修复 Bubblewrap 逃逸路径，并补齐持久 PowerShell、超时与文件观察策略。",
    en: "Execution is safer and steadier, with a Bubblewrap escape fix plus persistent PowerShell, timeout, and file-observation policies.",
  },
  {
    icon: "tools",
    zh: "工具与界面继续积木化：多行提问、插件清单、图片附件、网页搜索和压缩都有独立包。",
    en: "Tools and UI are more composable: multiline questions, plugin inventory, image attachments, web search, and compaction live in focused packages.",
  },
] as const;
