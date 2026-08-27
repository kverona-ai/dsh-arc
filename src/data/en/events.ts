export const EVENT_DOMAINS_EN = [
  {
    id: "session",
    title: "Session events · Journal",
    kid: "Facts written down and preserved across restarts.",
    when: "The fact must survive a reload",
    color: "accent",
    items: [
      { name: "turn/start · turn/end", note: "Open and close a turn" },
      { name: "step/start · step/end", note: "One think-and-act step" },
      { name: "user/message", note: "Input entering a step (surface)" },
      { name: "assistant/chunk · assistant/message", note: "Live notes and clean copy" },
      { name: "tool/call · tool/result", note: "Action and report card" },
      { name: "request/header", note: "The frozen request envelope" },
      { name: "session/event", note: "Broadcast every log event" },
    ],
  },
  {
    id: "agent",
    title: "Agent events · Intercom",
    kid: "Live calls during work that do not enter the journal body.",
    when: "Observe or intercept in-flight work",
    color: "ok",
    items: [
      { name: "agent/inbox/*", note: "inserted / claimed / discarded / spliced" },
      { name: "agent/status", note: "idle ⇄ running" },
      { name: "agent/pre-step", note: "waterfall: reject or rewrite claimed input" },
      { name: "agent/request", note: "waterfall: change the model, not the essay" },
      { name: "agent/request-error", note: "waterfall: retry or let failure through" },
      { name: "agent/turn-stopping", note: "serial: the final chance to add a note" },
    ],
  },
  {
    id: "capability",
    title: "Capability events · Rules",
    kid: "Attach policy to a socket without entering the heartbeat room.",
    when: "Add policy and adapters to a seam",
    color: "warn",
    items: [
      { name: "llm/stream", note: "waterfall: wrap the adapter stream" },
      { name: "tools/pre-execute", note: "allow / deny / ask" },
      { name: "tools/execute", note: "wrap the tool function with timeouts or metrics" },
      { name: "tools/post-execute", note: "accept / replace / block" },
      { name: "fs/write-intent · fs/edit-intent", note: "observe before writes" },
      { name: "system-prompt/assemble", note: "final prompt assembly" },
    ],
  },
];

export const DISPATCH_MODES_EN = [
  {
    mode: "emit",
    await: "No",
    order: "Observe in registration order",
    ret: "None",
    kid: "Broadcast: listeners may observe but cannot veto.",
  },
  {
    mode: "waterfall",
    await: "No (but wraps)",
    order: "Onion, outside in",
    ret: "Yes",
    kid: "Call next() to pass the paper inward; otherwise you take control.",
  },
  {
    mode: "parallel",
    await: "Yes",
    order: "Run together",
    ret: "None",
    kid: "The whole class works at once, such as flushing the journal to disk.",
  },
  {
    mode: "serial",
    await: "Yes",
    order: "One after another",
    ret: "Yes",
    kid: "Take turns speaking, with no next(). turn-stopping uses this mode.",
  },
];
