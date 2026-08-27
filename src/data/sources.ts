/**
 * Where each chapter's claims come from in the upstream tree. Rendered at the
 * foot of every page and emitted as JSON-LD `citation`, so a reader — or an
 * answer engine quoting this site — can check the source instead of trusting it.
 */
import { HARNESS_RELEASE, HARNESS_REPO } from "@/data/release";
import { GROUPS } from "@/data/groups";

export interface Source {
  path: string;
  label: string;
  labelEn: string;
}

const DOC = (file: string, label: string, labelEn: string): Source => ({
  path: `docs/${file}`,
  label,
  labelEn,
});

export const PAGE_SOURCES: Record<string, Source[]> = {
  "/": [DOC("architecture.md", "架构总览", "Architecture overview")],
  "/story": [
    DOC("architecture.md", "架构总览", "Architecture overview"),
    DOC("cordis-primer.md", "Cordis 入门", "Cordis primer"),
  ],
  "/principles": [
    DOC("architecture.md", "架构总览", "Architecture overview"),
    DOC("defensive-patterns.md", "防御式模式", "Defensive patterns"),
  ],
  "/map": [
    DOC("module-graph.md", "模块依赖图", "Module graph"),
    DOC("graph-atlas.md", "图谱索引", "Graph atlas"),
  ],
  "/cordis": [DOC("cordis-primer.md", "Cordis 入门", "Cordis primer")],
  "/boot": [
    DOC("config-catalog.md", "配置目录", "Config catalog"),
    DOC("architecture.md", "架构总览", "Architecture overview"),
  ],
  "/loop": [
    DOC("agent-lifecycle.md", "Agent 生命周期", "Agent lifecycle"),
    DOC("tool-execution-pipeline.md", "工具执行流水线", "Tool execution pipeline"),
  ],
  "/seams": [DOC("capability-seams.md", "能力接头", "Capability seams")],
  "/events": [
    DOC("event-producer-consumer.md", "事件生产与消费", "Event producers and consumers"),
    DOC("agent-lifecycle.md", "Agent 生命周期", "Agent lifecycle"),
  ],
  "/modules": [
    DOC("module-graph.md", "模块依赖图", "Module graph"),
    DOC("tool-catalog.md", "工具目录", "Tool catalog"),
  ],
  "/glossary": [DOC("glossary.md", "官方词汇表", "Official glossary")],
  "/faq": [
    DOC("architecture.md", "架构总览", "Architecture overview"),
    DOC("capability-seams.md", "能力接头", "Capability seams"),
  ],
};

/** A drawer page cites the package directory it documents. */
export function sourcesFor(path: string, groupPath?: string): Source[] {
  if (groupPath) {
    return [
      { path: groupPath, label: "源码目录", labelEn: "Package directory" },
      DOC("module-graph.md", "模块依赖图", "Module graph"),
    ];
  }
  return PAGE_SOURCES[path] ?? [];
}

/** Pinned to the release this book was read against, so the link never drifts. */
export function sourceUrl(path: string) {
  const kind = path.endsWith(".md") ? "blob" : "tree";
  return `${HARNESS_REPO}/${kind}/${HARNESS_RELEASE.tag}/${path}`;
}

export function sourcesForPath(path: string): Source[] {
  const slug = path.match(/^\/modules\/([^/]+)$/)?.[1];
  const group = slug ? GROUPS.find((item) => item.slug === slug) : undefined;
  return sourcesFor(path, group?.path);
}
