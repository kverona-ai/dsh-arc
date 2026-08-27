import type { NavPath } from "@/data/nav";

export const NAV_EN: ReadonlyArray<{ to: NavPath; label: string; kid: string }> = [
  { to: "/", label: "Cover", kid: "Start here" },
  { to: "/story", label: "The brick story", kid: "Simple enough for a five-year-old" },
  { to: "/principles", label: "Two principles", kid: "Plugins and the journal" },
  { to: "/map", label: "Architecture map", kid: "The whole brick city" },
  { to: "/cordis", label: "The Cordis baseplate", kid: "How the bricks connect" },
  { to: "/boot", label: "How it boots", kid: "Which layer comes first" },
  { to: "/loop", label: "One conversation turn", kid: "How the agent thinks" },
  { to: "/seams", label: "Replaceable seams", kid: "Swap out a hand" },
  { to: "/events", label: "Event bus", kid: "Who calls whom" },
  { to: "/modules", label: "Module directory", kid: "Every brick in the box" },
  { to: "/glossary", label: "Glossary", kid: "Names side by side" },
];
