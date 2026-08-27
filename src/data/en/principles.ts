export const PILLARS_EN = [
  {
    id: "plugin",
    title: "Everything is a plugin",
    kid: "Every ability is a brick: brain, hands, journal, fence, loop, and window. Replace one without tearing down the city.",
    tech: "DeepSeek Harness is built on Cordis. Model adapters, tools, skills, sessions, sandboxes, storage, loops, scheduling, and UI are plugins. Configuration selects, replaces, or extends them without editing dsh source. There is no privileged kernel to patch.",
  },
  {
    id: "trace",
    title: "Every run is traceable",
    kid: "Every sentence the model sees is already written in an append-only journal. Close it, reopen it, and the story remains.",
    tech: "System prompts, reasoning, tool calls and results, subagent scheduling, and every context injection are appended to the Session log. Resume, fork, search, and replay all use the same event stream. A runtime invariant enforces: model-visible means logged.",
  },
] as const;

export const RUNTIME_MODES_EN = [
  {
    id: "standard",
    name: "Standard mode",
    kid: "A full coding agent: edit files, run commands, browse, use skills, plan, track goals, ask helpers, and orchestrate.",
    note: "The full toolset and coding persona. Agent preset: standard.",
  },
  {
    id: "code",
    name: "Code Mode",
    kid: "The standard kit plus a lab where TypeScript can orchestrate many operations together.",
    note: "Tools are exposed through the Code Mode SDK so a program can combine multi-step operations.",
  },
  {
    id: "minimal",
    name: "Minimal mode",
    kid: "Only a mouth and an eraser, useful for evaluating a model.",
    note: "Persistent bash plus str_replace_editor, designed for benchmarks.",
  },
  {
    id: "creator",
    name: "Creator mode",
    kid: "The agent may inspect its current plugins and attach new bricks to itself.",
    note: "Standard abilities plus runtime introspection, in-memory plugin trials, and new preset composition.",
  },
] as const;

export const EXTEND_MAP_EN = [
  {
    goal: "Add a model provider",
    hang: "ctx.llm",
    kid: "Invite another teacher. The classroom stays put.",
  },
  {
    goal: "Add a model-facing capability",
    hang: "ctx.tools",
    kid: "Put a tool in the cabinet; its instructions join the handbook.",
  },
  {
    goal: "Give one session a different capability set",
    hang: "agent preset + isolate",
    kid: "Change this agent's outfit and give it its own tap.",
  },
  {
    goal: "Add shell execution",
    hang: "ctx.shell → ctx.subprocess",
    kid: "The mouth gives an order; the runner performs it.",
  },
  {
    goal: "Add a persistent terminal",
    hang: "ctx.terminals + dsh-tool-terminal",
    kid: "Hang up a blackboard that never closes.",
  },
  {
    goal: "Add human commands",
    hang: "ctx.commands",
    kid: "Issue the command yourself without asking the model.",
  },
  {
    goal: "Add slow background work",
    hang: "ctx.jobs · job_* tools",
    kid: "Put work in the washing machine and check later.",
  },
  {
    goal: "Add a filesystem or write policy",
    hang: "ctx.fs or fs/* events",
    kid: "Replace the desk or add a rule before writing.",
  },
  {
    goal: "Restrict spawned processes",
    hang: "ctx.sandbox.confine(argv)",
    kid: "Put up the fence before going out. This is not a move.",
  },
  {
    goal: "Intercept requests, tools, or turns",
    hang: "agent/* or tools/*",
    kid: "A hall monitor can stamp the pass or stop the school day.",
  },
  {
    goal: "Add model-visible context",
    hang: "agent.inject()",
    kid: "Slide a note under the door. Do not ring; wait for the next claim.",
  },
  {
    goal: "Add a UI or editor",
    hang: "ctx.agents + session/event",
    kid: "The window watches journal broadcasts; it never invents the story.",
  },
  {
    goal: "Add a conversation node",
    hang: "ConversationNodeDefinition",
    kid: "Pin another picture into the felt board.",
  },
  {
    goal: "Add persistent session state",
    hang: "extend SessionEventMap",
    kid: "Add a sentence type to the journal; replay reads it there too.",
  },
  {
    goal: "Generate session titles",
    hang: "the single ctx.sessionTitle provider",
    kid: "Only one person may name the journal.",
  },
  {
    goal: "Manage goals in one session",
    hang: "ctx.goals + agent/*",
    kid: "Pin a goal to the fridge and remove it when done.",
  },
  {
    goal: "Fork a journal still being written",
    hang: "ctx.sessions.fork(...)",
    kid: "Copy the journal and start a new story from one page.",
  },
  {
    goal: "Scope registrations to one agent",
    hang: "agent.ctx",
    kid: "Put the item in this person's locker, not the lobby.",
  },
] as const;
