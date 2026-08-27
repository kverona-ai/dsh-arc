export const FAQS_EN = [
  {
    q: "Which DeepSeek Harness version does this Brickbook cover?",
    a: "The content is aligned with the official dsh-v0.1.1-rc.2 release at commit b150a55, published on 2026-08-21. That source snapshot contains 227 packages/*/package.json manifests; the directory curates the core and representative plugins instead of flattening all 227 into one list.",
  },
  {
    q: "What is DeepSeek Harness?",
    a: "DeepSeek Harness (dsh) is an open-source agent runtime. It does not hard-code a model into its core: model adapters, tools, sessions, sandboxes, loops, and UI are all plugins. Its two central ideas are Everything is a plugin and Every run is traceable.",
  },
  {
    q: "What does Cordis do in dsh?",
    a: "Cordis is the baseplate. Plugins contribute Services, typed events, and reversible effects to a shared Context. Registrations are automatically undone when a fiber is disposed. There is no privileged kernel to patch; extend the system by mounting a plugin beside the others.",
  },
  {
    q: "What does Everything is a plugin mean?",
    a: "Every capability is a replaceable brick. Change the LLM adapter without changing the loop; replace the filesystem provider and Bash, PTY, and LSP can follow. Select, replace, and extend through configuration instead of editing dsh source.",
  },
  {
    q: "What does model-visible means logged mean?",
    a: "Everything that reaches a model request must be reconstructible from the append-only Session log. deriveMessages() projects surface events instead of maintaining a second chat array. This runtime invariant is the basis of Every run is traceable.",
  },
  {
    q: "How are sandbox and E2B different?",
    a: "sandbox.confine wraps local argv—a safety gate inside this room. E2B is another fs + subprocess provider pair, like moving the whole playroom into the cloud. A fence is not a move; hands and feet must share one execution world.",
  },
  {
    q: "Are Cordis inject and Agent.inject() the same?",
    a: "No. Cordis inject declares plugin dependencies and waits for required services before activation. Agent.inject() puts a message into inbox.next-step without waking the driver. They share a name but do entirely different jobs.",
  },
  {
    q: "How are scope and isolate different?",
    a: "scope is a set of per-agent lockers, not a sandbox. isolate gives a child Context its own service with the same name—its own classroom tap. Agent presets use isolate to change outfits.",
  },
  {
    q: "How do a turn and a step differ?",
    a: "A step is one model request plus the tools it calls. A turn contains zero or more steps: it opens before the first input is claimed and closes when no work remains. Even a rejected first claim leaves a durable zero-step turn.",
  },
  {
    q: "Can dsh read images, and do images land in the session log?",
    a: "Yes, but the log stores only a reference. ctx.attachments.saveImage validates and normalizes the image, commits it content-addressed, and returns an ImageAttachmentRef; base64, browser paths, and provider URLs never reach a SessionEvent. tool-fs registers read_image only while a durable attachment store is mounted, and the routed model must declare image input; dsh-llm-deepseek then resolves each reference into a Files API id and falls back to inline data URLs for the whole request when resolution fails.",
  },
] as const;
