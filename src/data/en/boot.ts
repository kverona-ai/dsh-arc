export const BOOT_LAYERS_EN = [
  {
    id: "empty",
    title: "Empty root []",
    kid: "An empty backpack. No bricks have been packed yet.",
    tech: "The profile's cordis.yml is written as an empty array on every startup. The tree is built entirely from patches, so dump-config cannot drift from the real boot.",
  },
  {
    id: "base",
    title: "dsh-base",
    kid: "The largest bag: brain, hands, journal, fence, and keys.",
    tech: "The first layer of every shipped profile. It inserts llm, session, agent, tools, sandbox, fs, shell, skills, subagents, and more—about 70 lines—with bash / pwsh gated by platform.",
  },
  {
    id: "mode",
    title: "dsh-web-app or dsh-headless",
    kid: "Choose the box with a window, or the one that goes home after one task.",
    tech: "web-app inserts webserver, apiproxy, the client plugin roster, workspace, and storage. headless inserts a one-shot runner.",
  },
  {
    id: "profile",
    title: "profiles/<name>/cordis.patch.yml",
    kid: "Your own note attached to this box.",
    tech: "It replaces a whole config row by id or inserts a new row. There is no deep merge; every field you keep must be restated.",
  },
  {
    id: "home",
    title: "$DSH_HOME/cordis.patch.yml",
    kid: "A higher-priority note that applies to every box on this machine.",
    tech: "The home layer overrides the profile layer. watchUserPatches watches both files and transactionally recomposes them through HMR.",
  },
  {
    id: "overlay",
    title: "--patch and environment switches",
    kid: "Attach one final note before leaving.",
    tech: "Launcher overlays such as DSH_TELEMETRY_DISABLED can disable rows. dsh --profile web --dump-config prints the tree that actually boots on your machine.",
  },
];

export const BOOT_STEPS_EN = [
  {
    title: "dsh web",
    kid: "Call the caretaker.",
    tech: "apps/cli/src/bin.ts parses arguments and calls loadLayeredEnv.",
  },
  {
    title: "Choose a profile",
    kid: "Take out the box named web.",
    tech: "loadProfile reads dsh.profile.bundles from $DSH_HOME/profiles/<name>/package.json.",
  },
  {
    title: "Stack patches",
    kid: "Empty each bag into the backpack in order.",
    tech: "composeEntries runs applyEntryPatches over an empty list.",
  },
  {
    title: "boot()",
    kid: "Lay down the baseplate and attach the bricks.",
    tech: "Create the root Context, mount Loader + include + group, and wait for every fiber to reach ACTIVE.",
  },
  {
    title: "Assert",
    kid: "Count every brick and shout if one is missing.",
    tech: "assertEntriesLoaded / assertEntriesActivated fail loudly, restore the TTY, then exit(1).",
  },
  {
    title: "Open the window",
    kid: "Web mode opens the mailbox and glass.",
    tech: "web-runtime prints the URL and opens the browser by default. headless creates one Agent, submits the task, and prints the final assistant text.",
  },
];

export const PRESETS_EN = [
  {
    id: "standard",
    name: "Standard mode",
    kid: "A complete coding agent: edit files, run commands, browse, use skills, plan, and ask helpers.",
    note: "The full toolset and coding persona. Official Standard mode.",
  },
  {
    id: "code",
    name: "PTC Mode",
    kid: "The standard kit plus a lab where TypeScript orchestrates multiple tool rounds.",
    note: "The UI label is now PTC Mode; the internal code preset and Code Mode SDK names remain.",
  },
  {
    id: "minimal",
    name: "Minimal mode",
    kid: "Only a mouth and eraser, useful for evaluating models.",
    note: "Persistent bash plus str_replace_editor. Official Minimal mode.",
  },
  {
    id: "cordis",
    name: "Creator mode",
    kid: "The agent may inspect attached bricks and add another one itself.",
    note: "standard plus runtime introspection, in-memory plugin trials, and preset composition. Official Creator mode.",
  },
];
