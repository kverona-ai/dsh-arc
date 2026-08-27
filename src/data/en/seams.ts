import type { SeamExample } from "@/data/seams";

export const SEAMS_EN: SeamExample[] = [
  {
    slug: "llm",
    ctx: "ctx.llm",
    name: "Brain",
    kid: "Change the teacher without changing the classroom.",
    definition: "@deepseek-ai/dsh-llm · LlmRuntime",
    providers: [
      { pkg: "dsh-llm-deepseek", note: "Official DeepSeek adapter" },
      { pkg: "dsh-llm-pi-ai", note: "Multiple providers activated through settings" },
      { pkg: "dsh-llm-replay", note: "Replay recorded logs for keyless tests" },
    ],
    consumers: [
      { pkg: "dsh-agent-loop", note: "llm/stream" },
      { pkg: "dsh-compaction-basic", note: "Calls the model again for summaries" },
    ],
    swapStory:
      "The loop knows only GenerateOptions and StreamChunk. Replacing the adapter does not change the session log shape.",
  },
  {
    slug: "fs",
    ctx: "ctx.fs",
    name: "Paper and pencil",
    kid: "Read, write, and edit papers. The provider decides which room holds them.",
    definition: "@deepseek-ai/dsh-fs · FileSystem",
    providers: [
      { pkg: "dsh-fs-local", note: "Local disk" },
      { pkg: "dsh-fs-sandbox", note: "Writes fenced by sandboxPolicy" },
      { pkg: "dsh-fs-e2b", note: "Disk inside a remote Linux sandbox" },
    ],
    consumers: [
      { pkg: "dsh-tool-fs", note: "read / write / edit" },
      { pkg: "dsh-tool-fs-search", note: "glob / grep (ripgrep)" },
    ],
    swapStory:
      "Paths are opaque FsTargets. Consumers ask for processPath / fileUrl instead of assembling paths themselves.",
  },
  {
    slug: "subprocess",
    ctx: "ctx.subprocess",
    name: "Runner",
    kid: "The brick that actually runs commands. Hands, blackboards, and glasses all use it.",
    definition: "@deepseek-ai/dsh-subprocess · SubprocessRuntime",
    providers: [
      { pkg: "dsh-subprocess-local", note: "Local process tree" },
      { pkg: "dsh-subprocess-e2b", note: "Remote sandbox processes" },
    ],
    consumers: [
      { pkg: "dsh-bash-local / bash-sandbox", note: "Shell execution" },
      { pkg: "dsh-terminal-bash", note: "Persistent PTY" },
      { pkg: "dsh-lsp-stdio", note: "Language servers" },
      { pkg: "dsh-subagent-acp and others", note: "Out-of-process subagents" },
    ],
    swapStory:
      "This is the execution world's primitive. Replace it together with ctx.fs to move the whole mutable world.",
  },
  {
    slug: "sandbox",
    ctx: "ctx.sandbox",
    name: "Fence",
    kid: "Not a move—just a safety gate in this room.",
    definition: "@deepseek-ai/dsh-sandbox · SandboxProvider.confine",
    providers: [{ pkg: "dsh-sandbox-local", note: "bwrap / Landlock / Seatbelt / Windows ACL" }],
    consumers: [
      { pkg: "dsh-bash-sandbox", note: "confine argv before spawn" },
      { pkg: "dsh-terminal-bash", note: "The PTY is fenced too" },
    ],
    swapStory:
      "Silent pass-through is forbidden. A container or E2B is a different execution world, not a sandbox backend.",
  },
  {
    slug: "shell",
    ctx: "ctx.shell",
    name: "Command voice",
    kid: "The model says ‘run this,’ and the voice hands it to the executor and fence.",
    definition: "@deepseek-ai/dsh-shell",
    providers: [
      { pkg: "dsh-bash-sandbox", note: "POSIX default" },
      { pkg: "dsh-pwsh-sandbox", note: "Windows twin" },
      { pkg: "dsh-bash-local", note: "Unfenced local executor" },
    ],
    consumers: [{ pkg: "dsh-tool-bash / tool-pwsh", note: "Model-facing bash/pwsh tools" }],
    swapStory:
      "The same base patch gates providers by platform, so each host mounts exactly one shell stack.",
  },
  {
    slug: "subagents",
    ctx: "ctx.subagents",
    name: "Ask a friend",
    kid: "Several named friends can share the socket: some inside the room, some outside.",
    definition: "@deepseek-ai/dsh-subagent",
    providers: [
      { pkg: "spawn-in-process", note: "A fresh child agent" },
      { pkg: "fork-in-process", note: "A fork with the parent's log prefix" },
      { pkg: "acp / dsh-sdk", note: "Out-of-process protocols" },
      { pkg: "claude-code / codex", note: "Optional product providers" },
    ],
    consumers: [
      { pkg: "dsh-tool-subagent", note: "Delegation tool" },
      { pkg: "dsh-tool-ralph / workflow", note: "agent() inside orchestration" },
    ],
    swapStory:
      "Unlike bash, multiple named providers may coexist. Before start, check depthLimit, toolFilter, and persona.",
  },
  {
    slug: "persistence",
    ctx: "ctx.sessionPersistence",
    name: "Copy the journal into a drawer",
    kid: "The journal in the room is the truth; the copy lets you continue after a restart.",
    definition: "@deepseek-ai/dsh-session-persistence",
    providers: [
      { pkg: "dsh-session-persistence-jsonl", note: "Default: $DSH_HOME/sessions" },
      { pkg: "dsh-session-persistence-sqlite", note: "Optional" },
    ],
    consumers: [
      { pkg: "dsh-session", note: "session/event notifications and batched writes" },
      { pkg: "checkpoint-policy", note: "Durability point before the next turn" },
    ],
    swapStory:
      "There is no parallel persistence type. Crash recovery adds interrupted to an unclosed turn without truncating the log.",
  },
  {
    slug: "attachments",
    ctx: "ctx.attachments",
    name: "File the photo by its fingerprint",
    kid: "A picture never goes into the journal; the journal only notes which drawer holds it.",
    definition: "@deepseek-ai/dsh-attachment · ImageAttachmentRef",
    providers: [
      { pkg: "dsh-attachment-local", note: "Private content-addressed store under DSH_HOME" },
    ],
    consumers: [
      { pkg: "dsh-tool-fs", note: "read_image commits before returning the image block" },
      { pkg: "dsh-llm-deepseek", note: "Resolves references into Files API ids" },
    ],
    swapStory:
      "saveImage commits before any model-visible event is appended, so the log holds references only — never base64, browser paths, or provider URLs. read_image registers only while a durable store is mounted, and refuses at execution unless the routed model declares image input.",
  },
];

export const SEAM_RULES_EN = [
  {
    title: "Every corner of the triangle matters",
    kid: "Socket, plug, and lamp must all exist. A socket alone is not a capability.",
    tech: "A Service Definition declares the ctx key; a Provider implements it; a Consumer uses it. Extensions depend on definitions, never concrete providers.",
  },
  {
    title: "Move the execution world as a pair",
    kid: "Hands and feet must enter the same room.",
    tech: "fs and subprocess share an execution world. Point both at E2B and Bash, PTY, and LSP follow without provider-specific forks.",
  },
  {
    title: "A fence is not a move",
    kid: "A safety gate is not the same as moving the playroom to a cabin.",
    tech: "ctx.sandbox.confine wraps local argv. A remote sandbox is another fs/subprocess provider pair.",
  },
  {
    title: "Swap one piece and the city follows",
    kid: "That is why the seam exists.",
    tech: "Tool schemas stay stable for the model. Policies attach to fs/* and tools/* events without importing the loop.",
  },
];
