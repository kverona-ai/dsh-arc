export const BOOT_LAYERS = [
  {
    id: "empty",
    title: "空根 []",
    kid: "空书包。什么积木都还没放。",
    tech: "profile 的 cordis.yml 每次启动都被写成空数组。树 100% 由补丁构成，这样 dump-config 不会和真实启动漂移。",
  },
  {
    id: "base",
    title: "dsh-base",
    kid: "最大那袋：脑子、手、日记、围栏、钥匙。",
    tech: "每个 shipped profile 的第一层。插入 llm、session、agent、tools、sandbox、fs、shell、skills、subagents… 约 70 行。按平台门控 bash / pwsh。",
  },
  {
    id: "mode",
    title: "dsh-web-app 或 dsh-headless",
    kid: "选带窗户的盒子，或做完就回家的盒子。",
    tech: "web-app 插入 webserver、apiproxy、client 插件名册、workspace、storage。headless 插入一次性 runner。",
  },
  {
    id: "profile",
    title: "profiles/<name>/cordis.patch.yml",
    kid: "你自己在这个盒子上贴的便条。",
    tech: "按 id 整行替换 config，或 insert 新行。不做深合并，要保留的字段必须重述。",
  },
  {
    id: "home",
    title: "$DSH_HOME/cordis.patch.yml",
    kid: "这台机器上对所有盒子生效的便条，优先级更高。",
    tech: "home 层覆盖 profile 层。watchUserPatches 监视两份文件，HMR 事务式重组合。",
  },
  {
    id: "overlay",
    title: "--patch 与环境开关",
    kid: "出门前最后再贴一张。",
    tech: "启动器 overlay。DSH_TELEMETRY_DISABLED 等可禁用行。dsh --profile web --dump-config 打印你机器真正启动的树。",
  },
];

export const BOOT_STEPS = [
  { title: "dsh web", kid: "你喊一声管家。", tech: "apps/cli/src/bin.ts 解析参数，loadLayeredEnv。" },
  { title: "选 profile", kid: "拿出叫 web 的盒子。", tech: "loadProfile 读 $DSH_HOME/profiles/<name>/package.json 的 dsh.profile.bundles。" },
  { title: "叠补丁", kid: "按顺序把袋子倒进书包。", tech: "composeEntries：空列表上 applyEntryPatches。" },
  { title: "boot()", kid: "把底板放好，积木开始卡住。", tech: "创建根 Context，挂 Loader + include + group，等待全部 fiber ACTIVE。" },
  { title: "断言", kid: "数一数，少一块就大声说。", tech: "assertEntriesLoaded / assertEntriesActivated。失败 fail-loud，先 restore TTY 再 exit(1)。" },
  { title: "开窗", kid: "web 模式打开信箱和玻璃。", tech: "web-runtime 打印 URL，默认打开浏览器。headless 则创建一个 Agent、提交任务、打印最后一段助手文本。" },
];

export const PRESETS = [
  {
    id: "standard",
    name: "标准模式",
    kid: "全套编程机器人：改文件、敲命令、上网、技能、计划、帮手。",
    note: "完整工具与编码人格。官方 Standard mode。",
  },
  {
    id: "code",
    name: "PTC 模式",
    kid: "标准套装再加实验室：模型用一段 TypeScript 编排多轮工具。",
    note: "界面已改称 PTC Mode；内部仍以 code preset 与 Code Mode SDK 暴露工具。",
  },
  {
    id: "minimal",
    name: "极简模式",
    kid: "只留嘴巴和橡皮，用来给模型打分。",
    note: "持久 bash + str_replace_editor。官方 Minimal mode。",
  },
  {
    id: "cordis",
    name: "创造模式",
    kid: "允许机器人检查现在挂了哪些积木，并给自己再卡一块。",
    note: "standard + 运行时自检、内存试插件、组合成新 preset。官方 Creator mode。",
  },
];
