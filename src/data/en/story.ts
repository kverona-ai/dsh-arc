export const STORY_CHAPTERS_EN = [
  {
    n: "01",
    title: "A brick city that can move",
    kid: "Imagine a huge box of bricks. Some can talk, some open doors, and some keep a journal. DeepSeek hands the whole city to a caretaker called dsh. The caretaker does not do the jobs itself—it assembles the bricks from a set of instructions.",
    tech: "DeepSeek Harness (dsh) is an open-source agent runtime. Its central idea is Everything is a plugin. Model adapters, tools, sessions, sandboxes, loops, and UI are all plugins.",
  },
  {
    n: "02",
    title: "The baseplate is called Cordis",
    kid: "Bricks need a baseplate to stay together. This one is called Cordis. A brick can announce, ‘I provide the brain’ or ‘I provide the hands.’ Pull it out, and the traces it registered disappear with it.",
    tech: "Cordis is a spatially and temporally composable plugin framework. Plugins contribute Services, typed events, and reversible Effects to a shared Context. Registered work is unwound when a fiber is disposed. There is no privileged kernel to patch.",
  },
  {
    n: "03",
    title: "Choose a toy box first",
    kid: "Before setting out, choose a box. The web box has a window; the headless box finishes one job and goes home. Each box contains layered bags. The first is always dsh-base, with the brain, hands, journal, and fence.",
    tech: "Profiles (web / headless) stack bundles in order. dsh-base is first; dsh-web-app adds the browser; dsh-headless adds a one-shot runner. Then come the profile patch, the home-level patch, and --patch.",
  },
  {
    n: "04",
    title: "The journal is the source of truth",
    kid: "Everything the agent does goes into a journal that only grows forward. Thoughts, words, and actions are written down first. Close it and reopen it—the story is still there. If the model can see it, it has already been logged.",
    tech: "A Session is an append-only SessionEvent log. deriveMessages() projects model history from surface events. A runtime invariant asserts that everything reaching a model request can be reconstructed from the log.",
  },
  {
    n: "05",
    title: "A conversation turn is like homework",
    kid: "You ring the bell with followup, and the caretaker opens a turn. It claims the notes on the desk, lets the hall monitors check them, asks the model to think, runs tools, then thinks again until the work is complete.",
    tech: "A Turn has zero or more Steps. A Step is one model request plus its tool calls. The Inbox has next-turn and next-step queues. agent/pre-step, agent/request, llm/stream, and tools/* are waterfalls.",
  },
  {
    n: "06",
    title: "A socket can move to another room",
    kid: "A lamp keeps the same plug whether it is at home or in a cloud playroom. The lamp does not change. But its hands, feet, and glasses must move together because they share one room.",
    tech: "A seam is a Service Definition + Provider + Consumer. Point ctx.fs and ctx.subprocess at E2B and Bash / PTY / LSP follow without forks. ctx.sandbox is a local fence, not a move.",
  },
  {
    n: "07",
    title: "The window is made of plugins too",
    kid: "The web page is not a separate building. The house has a quiet mailbox (webserver), a receptionist (apiproxy), and a browser that assembles its own small Cordis city. The chat box, sidebar, and settings are pictures pinned into slots.",
    tech: "The Host runs in Node; the Client starts another Loader in the browser. dsh.client declares __DSH_BOOT__. Slots are UI composition points. Native capabilities are loopback-only.",
  },
  {
    n: "08",
    title: "Pictures go into a drawer first",
    kid: "The robot can look at pictures now. But a picture is never glued into the journal—it is filed in a drawer by its fingerprint, and the journal keeps only a slip with the number on it. Next time the same picture comes up, the caretaker takes the one already in the drawer instead of developing it again.",
    tech: "ctx.attachments is the durable attachment seam: saveImage validates and normalizes the image, commits it content-addressed, and returns a serializable ImageAttachmentRef. SessionEvents carry references only—never base64, browser paths, or provider URLs. tool-fs registers read_image only while a durable store is mounted; dsh-llm-deepseek then resolves each reference into a Files API id, falling back to inline data URLs for the whole request when resolution fails.",
  },
] as const;
