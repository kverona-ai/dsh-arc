import type { Group, Layer } from "@/data/groups";

export const LAYERS_EN: Array<{ id: Layer; title: string; kid: string; job: string }> = [
  {
    id: "vendor",
    title: "Baseplate · Cordis",
    kid: "Like a LEGO baseplate. Without it, the bricks fall apart.",
    job: "Plugin framework: Context, Service, Fiber, reversible effects, and typed events.",
  },
  {
    id: "boot",
    title: "Assembly · Profile / Bundle",
    kid: "Choose a toy box, then stack its bags in order.",
    job: "CLI startup, profile composition, bundle patch layers, and an empty-root build.",
  },
  {
    id: "core",
    title: "Core · Agent Loop",
    kid: "The agent's heartbeat: listen, think, act, then think again.",
    job: "session / systemPrompt / tools / agents / agentLoop / scope.",
  },
  {
    id: "brain",
    title: "Brain · LLM",
    kid: "The brick that speaks can be replaced with another brand.",
    job: "Message vocabulary, streaming adapters, DeepSeek / pi-ai / retry / token-meter.",
  },
  {
    id: "hands",
    title: "Hands · Execution world",
    kid: "Hands, feet, and fences must live in the same room.",
    job: "fs / subprocess / sandbox / shell / terminal / lsp share one execution world.",
  },
  {
    id: "memory",
    title: "Journal · Session",
    kid: "Everything that happens goes in a notebook that can be reopened later.",
    job: "Append-only event log, JSONL/SQLite persistence, projections, search, and titles.",
  },
  {
    id: "skills",
    title: "Abilities · Capability plugins",
    kid: "Teach the agent new tricks: search the web, ask helpers, track work.",
    job: "Tool consumers: skill / plan / goal / jobs / workflow / subagent / web / mcp.",
  },
  {
    id: "window",
    title: "Window · Host + Client",
    kid: "A window lets you watch the agent working inside the house.",
    job: "webserver / apiproxy on the host; slot / ui-* in the browser.",
  },
  {
    id: "grownups",
    title: "Rules · Human collaboration",
    kid: "People decide which bricks are safe and which need permission.",
    job: "approval / permission / commands / credentials / settings / identity.",
  },
  {
    id: "extras",
    title: "Extras · Supporting pieces",
    kid: "Glue, rulers, and test bricks keep the city steady.",
    job: "typert / sdk / acp / util / test-support / experimental.",
  },
];

const GROUP_EN: Record<string, Pick<Group, "kid" | "job">> = {
  vendor: { kid: "The brick baseplate", job: "Cordis, Loader, Include, HMR, and Schemastery" },
  boot: { kid: "The startup manual", job: "app-boot, cmdline, and profile assembly" },
  bundle: { kid: "Ready-made toy boxes", job: "dsh-base / web-app / headless patch layers" },
  core: { kid: "The heartbeat and journal", job: "session, prompt, tools, agent, loop, and scope" },
  llm: {
    kid: "The speaking brain",
    job: "Adapter seam plus DeepSeek / pi-ai / retry / token-meter",
  },
  fs: {
    kid: "Read and write papers in the room",
    job: "Filesystem seam, local/sandbox providers, read/write/edit/glob/grep",
  },
  subprocess: {
    kid: "Ask a runner to do the work",
    job: "Process groups, output spill, and escalated termination",
  },
  sandbox: { kid: "A fenced play area", job: "bwrap / Landlock / Seatbelt / Windows ACL" },
  shell: { kid: "Speak commands aloud", job: "bash / pwsh executors plus model-facing tools" },
  terminal: {
    kid: "A blackboard that stays open",
    job: "Persistent PTY, owner isolation, and six tools",
  },
  lsp: {
    kid: "Glasses that read the code map",
    job: "Language-server seam, stdio provider, and LSP tools",
  },
  "code-runtime": {
    kid: "A small laboratory",
    job: "Code-execution seam: worker threads / CPython",
  },
  session: {
    kid: "Put the journal in a drawer",
    job: "JSONL/SQLite, projections, telemetry, titles, and checkpoints",
  },
  "session-query": { kid: "Read old journals", job: "Reading, lineage, filtering, and SQLite FTS" },
  storage: {
    kid: "A box that is not the journal",
    job: "Non-session KV hub, JSON/SQLite, and domains",
  },
  attachment: {
    kid: "Attach a photo beside the journal",
    job: "Content-addressed attachments; logs store references",
  },
  compaction: {
    kid: "Summarize a journal that is too thick",
    job: "token-meter-driven summaries and tool-result pruning",
  },
  spill: { kid: "Put an overlong note on another sheet", job: "Spill oversized tool results" },
  skill: { kid: "Skill cards", job: "Skill registry, filesystem provider, and loader tool" },
  plan: {
    kid: "Draw the plan before building",
    job: "Plan mode: explore, submit, and wait for review",
  },
  goal: { kid: "A goal pinned to the wall", job: "Per-session goal persistence and round driver" },
  jobs: { kid: "Work that runs in the background", job: "Background job registry and job_* tools" },
  workflow: {
    kid: "A choreography script",
    job: "Model-written JavaScript orchestration in worker threads",
  },
  subagent: { kid: "Ask another agent for help", job: "spawn / fork / ACP / SDK / Claude / Codex" },
  web: { kid: "Look things up online", job: "search / fetch providers and model tools" },
  mcp: {
    kid: "Tools from an outside shop",
    job: "MCP client bridge that mounts remote tools on ctx.tools",
  },
  todo: { kid: "A to-do list", job: "todo_write snapshots the complete list into the session log" },
  extensions: {
    kid: "The agent adds its own bricks",
    job: "Model-authored plugins: inspect / mount / dispose",
  },
  host: {
    kid: "The inside half of the house",
    job: "webserver, apiproxy, static frontend, and directory selection",
  },
  client: {
    kid: "The window half",
    job: "slot, conversation, sidebar, settings, and other ui-* plugins",
  },
  interaction: {
    kid: "Raise a hand and ask",
    job: "Approvals, permission presets, slash commands, and user questions",
  },
  credentials: {
    kid: "Keep keys in a safe",
    job: "Credential-reference seam, local provider, and authorization flows",
  },
  settings: { kid: "Switches on the wall", job: "User-settings seam and settings.yaml" },
  guard: { kid: "Stop going in circles", job: "Repeated-call reminders and tool timeouts" },
  hooks: { kid: "Use manuals from other kits", job: "Claude Code / Codex hook bridge" },
  identity: {
    kid: "An anonymous name tag",
    job: "Shared anonymous user id for telemetry and feedback",
  },
  feedback: { kid: "A thumbs-up card", job: "Session feedback command and per-message ratings" },
  workspace: { kid: "What is this room called?", job: "Workspace entity registry" },
  preset: { kid: "Different agent outfits", job: "Per-session agent assembly plus persona" },
  context: {
    kid: "Check the clock and manual before leaving",
    job: "AGENTS.md, time, tmux, @file, and @session",
  },
  api: { kid: "An intercom through the wall", job: "Typert RPC gateway and Remote BFF" },
  typert: {
    kid: "Draw instructions for every brick",
    job: "Type-graph generation, loading, and runtime registry",
  },
  sdk: {
    kid: "Drive with a remote control",
    job: "Out-of-process JSON-RPC client, protocol, and server",
  },
  acp: { kid: "A plug made for automation", job: "Agent Client Protocol stdio server" },
  schedule: { kid: "An alarm clock", job: "Per-session after / at / fixed-frequency reminders" },
  e2b: {
    kid: "Move the room into the cloud",
    job: "E2B sandbox lifecycle plus fs/subprocess providers",
  },
  experimental: {
    kid: "An experimental team",
    job: "Agent Teams: roster, mailbox, and task board",
  },
  "runtime-diagnostics": {
    kid: "A health-check sheet",
    job: "Package-owned runtime invariant registry",
  },
  util: { kid: "Glue and rulers", job: "brand, home-paths, timeout, and atomic-write" },
  "test-support": {
    kid: "Practice bricks",
    job: "testkit, LLM mock, replay, and loader smoke tests",
  },
};

export function groupsEn(groups: Group[]): Group[] {
  return groups.map((group) => ({ ...group, ...GROUP_EN[group.slug] }));
}
