import { HARNESS_RELEASE, HARNESS_REPO } from "@/data/release";
import { GROUPS, LAYERS } from "@/data/groups";
import { PACKAGES } from "@/data/packages";
import { groupsEn, LAYERS_EN } from "@/data/en/groups";
import { packagesEn } from "@/data/en/packages";

export const SITE_ORIGIN = "https://dsh.177.best";
export const SITE_NAME = "DSH 积木书";
export const SITE_NAME_EN = "DSH Brickbook";
export const SITE_TAGLINE = "Everything is a Plugin";
export const SITE_AUTHOR = "willzero";
export const AUTHOR_X = "https://x.com/willzero";
export const AUTHOR_AVATAR = "/avatar-willzero.jpg";
export const AUTHOR_GITHUB = "https://github.com/kverona-ai";
export const SITE_DESCRIPTION = `DeepSeek Harness ${HARNESS_RELEASE.version} 架构图解：Cordis 插件底板、仅追加会话日志、能力 seam 与 ${HARNESS_RELEASE.packageCount} 个源码包，小孩版与源码对照。`;
export const SITE_DESCRIPTION_EN = `A source-level guide to DeepSeek Harness ${HARNESS_RELEASE.version}: Cordis plugins, append-only Session logs, capability seams, and ${HARNESS_RELEASE.packageCount} source packages.`;
export const SOURCE_REPO = HARNESS_REPO;
export const SITE_REPO = "https://github.com/kverona-ai/dsh-arc";
export const DATE_PUBLISHED = "2026-08-23";
export const DATE_MODIFIED = "2026-08-28";

export type PageSeo = {
  path: string;
  title: string;
  description: string;
};

export const PAGE_SEO: Record<string, PageSeo> = {
  "/": {
    path: "/",
    title: "DSH 积木书 · DeepSeek Harness 架构图解",
    description:
      "用积木城讲清 DeepSeek Harness：Cordis 插件内核、仅追加会话日志、能力 seam。Everything is a plugin。源码级图解。",
  },
  "/story": {
    path: "/story",
    title: "八页故事讲完 dsh · DeepSeek Harness 入门",
    description:
      "DeepSeek Harness 是什么？Cordis 底板、profile 玩具盒、会话日记、一轮对话、可换接头、Host 与 Client。五岁能听懂的架构故事。",
  },
  "/principles": {
    path: "/principles",
    title: "两条铁律：插件可换，日记不撒谎 · dsh",
    description:
      "DeepSeek Harness 设计铁律：Everything is a plugin，Every run is traceable。四种套装与新行为往哪挂：ctx.llm、ctx.tools、isolate。",
  },
  "/map": {
    path: "/map",
    title: "十层积木城总图 · DeepSeek Harness 模块地图",
    description:
      "从 Cordis 底板到 Host/Client 窗户：agent loop、LLM、fs/subprocess、session、skills。DeepSeek Harness 分层总图。",
  },
  "/cordis": {
    path: "/cordis",
    title: "Cordis 底板：插件、Context、可逆副作用 · dsh",
    description:
      "Cordis 是 dsh 的插件框架。Context 置物架、inject 等待依赖、emit/waterfall/parallel/serial、fiber 卸载自动撤销。scope ≠ isolate。",
  },
  "/boot": {
    path: "/boot",
    title: "dsh 怎么启动：Profile、Bundle、Patch",
    description:
      "运行中的 dsh 是启动时叠出来的插件树。空根 + dsh-base + web-app/headless + cordis.patch.yml。dsh --dump-config 看真实树。",
  },
  "/loop": {
    path: "/loop",
    title: "一轮对话：Turn、Step、Inbox 与会话日志 · dsh",
    description:
      "DeepSeek Harness agent loop：followup/steer/inject，turn/start 到 turn/end。模型可见即已记录。deriveMessages() 只投影日志。",
  },
  "/seams": {
    path: "/seams",
    title: "能力 Seam：定义、提供方、消费方 · dsh",
    description:
      "换 ctx.fs + ctx.subprocess，Bash/PTY/LSP 跟着走。sandbox 是围栏不是搬家。E2B 是另一对执行世界提供方。",
  },
  "/events": {
    path: "/events",
    title: "事件总线：会话日记、agent 对讲机、能力规矩 · dsh",
    description:
      "选对事件域是改 dsh 的第一件事。session/* 耐久，agent/* 拦截飞行中的工作，tools/* 与 fs/* 给 seam 加锁。",
  },
  "/modules": {
    path: "/modules",
    title: `DeepSeek Harness ${HARNESS_RELEASE.version} 模块目录 · ${HARNESS_RELEASE.packageCount} 个包怎么放`,
    description: `官方 ${HARNESS_RELEASE.version} 的 ${HARNESS_RELEASE.packageCount} 个包清单与精编目录：agent-loop、session、llm、fs、sandbox、subagent、host/client。`,
  },
  "/glossary": {
    path: "/glossary",
    title: "dsh 词汇表：Cordis、inject、isolate、seam",
    description:
      "DeepSeek Harness 名词对照。Cordis inject ≠ Agent inject()。sandbox ≠ E2B。scope 是储物柜，isolate 才是自己的水龙头。",
  },
  "/faq": {
    path: "/faq",
    title: "常见问题 · DeepSeek Harness 架构 FAQ",
    description:
      "DeepSeek Harness 是什么？Cordis 做什么？模型可见即已记录是什么意思？围栏和 E2B 有何不同？图片怎么进会话日志？十问十答，答案对齐源码。",
  },
};

export const PAGE_SEO_EN: Record<string, PageSeo> = {
  "/": {
    path: "/",
    title: "DSH Brickbook · DeepSeek Harness Architecture Explained",
    description:
      "Understand DeepSeek Harness as a brick city: the Cordis plugin baseplate, append-only Session journal, capability seams, and replaceable agent loop.",
  },
  "/story": {
    path: "/story",
    title: "DeepSeek Harness in Seven Pages · DSH Brickbook",
    description:
      "A plain-language tour of Cordis, profiles, the Session journal, conversation turns, capability seams, and the Host/Client split.",
  },
  "/principles": {
    path: "/principles",
    title: "Two Principles: Plugins and Traceability · DSH",
    description:
      "Everything is a plugin. Every run is traceable. Learn where new behavior belongs: ctx.llm, ctx.tools, agent events, and isolate realms.",
  },
  "/map": {
    path: "/map",
    title: "DeepSeek Harness Architecture Map · DSH Brickbook",
    description:
      "Explore ten layers from the Cordis baseplate to Host and Client: agent loop, LLM, execution world, Session, skills, and UI.",
  },
  "/cordis": {
    path: "/cordis",
    title: "Cordis: Plugins, Context, and Reversible Effects · DSH",
    description:
      "How Cordis composes plugins with Context, inject, typed events, Fiber lifecycles, and reversible effects. Scope is not isolate.",
  },
  "/boot": {
    path: "/boot",
    title: "How dsh Boots: Profiles, Bundles, and Patches",
    description:
      "A running DeepSeek Harness is a layered plugin tree: empty root, dsh-base, web-app or headless, profile patches, and startup overlays.",
  },
  "/loop": {
    path: "/loop",
    title: "One Conversation Turn: Steps, Inbox, and Session Log · DSH",
    description:
      "Follow followup, steer, inject, turn/start, model requests, tool execution, and turn/end through the DeepSeek Harness agent loop.",
  },
  "/seams": {
    path: "/seams",
    title: "Capability Seams: Definitions, Providers, Consumers · DSH",
    description:
      "Replace ctx.fs and ctx.subprocess together so Bash, PTY, and LSP move with the execution world. A sandbox fence is not an E2B move.",
  },
  "/events": {
    path: "/events",
    title: "Event Bus: Session, Agent, and Capability Events · DSH",
    description:
      "Choose the right event domain: durable session facts, in-flight agent events, and capability policy on tools, filesystems, and LLM streams.",
  },
  "/modules": {
    path: "/modules",
    title: `DeepSeek Harness ${HARNESS_RELEASE.version} Module Directory · DSH Brickbook`,
    description: `A curated directory over the ${HARNESS_RELEASE.packageCount} package manifests in ${HARNESS_RELEASE.version}: agent loop, Session, LLM, filesystem, sandbox, subagents, Host and Client.`,
  },
  "/glossary": {
    path: "/glossary",
    title: "DeepSeek Harness Glossary: Cordis, inject, isolate, seam",
    description:
      "Source-level definitions for Cordis, Context, Fiber, Session, waterfall, scope, isolate, execution world, capability seam, and more.",
  },
  "/faq": {
    path: "/faq",
    title: "DeepSeek Harness Architecture FAQ · DSH Brickbook",
    description:
      "Answers about Cordis, Everything is a plugin, model-visible means logged, sandbox vs E2B, scope vs isolate, and turns vs steps.",
  },
};

export function canonical(path: string, locale: "zh-CN" | "en" = "zh-CN") {
  const normalized = !path || path === "/" ? "" : path.startsWith("/") ? path : `/${path}`;
  if (locale === "en") return `${SITE_ORIGIN}/en${normalized}`;
  return normalized ? `${SITE_ORIGIN}${normalized}` : `${SITE_ORIGIN}/`;
}

/** Trim to a byte-ish budget on a separator, so a title or description ends on a word. */
function clamp(text: string, max: number) {
  if (text.length <= max) return text;
  const cut = text.slice(0, max);
  const stop = Math.max(cut.lastIndexOf("、"), cut.lastIndexOf(","), cut.lastIndexOf(" "));
  return `${(stop > max * 0.6 ? cut.slice(0, stop) : cut).trimEnd()}…`;
}

/** npm names without the scope — "dsh-llm-deepseek" is what people paste into search. */
export function groupPackageNames(slug: string, locale: "zh-CN" | "en" = "zh-CN") {
  const list = locale === "en" ? packagesEn(PACKAGES) : PACKAGES;
  return list
    .filter((pkg) => pkg.group === slug)
    .map((pkg) => pkg.npm.replace("@deepseek-ai/", ""));
}

/**
 * Title and description for one module drawer. Generic "<slug> · Module" titles
 * gave 100 pages nothing to rank on, so both carry the drawer's real job,
 * ctx key, and package names.
 */
export function moduleSeo(slug: string, locale: "zh-CN" | "en" = "zh-CN"): PageSeo | undefined {
  const groups = locale === "en" ? groupsEn(GROUPS) : GROUPS;
  const group = groups.find((item) => item.slug === slug);
  if (!group) return undefined;
  const en = locale === "en";
  const names = groupPackageNames(slug, locale);
  const shown = names.slice(0, 4).join(en ? ", " : "、");
  const rest = names.length > 4 ? names.length - 4 : 0;
  const packagesLine = names.length
    ? en
      ? ` ${names.length} packages: ${shown}${rest ? `, and ${rest} more` : ""}.`
      : `收录 ${names.length} 个包：${shown}${rest ? ` 等` : ""}。`
    : "";
  const ctxLine = group.ctx ? (en ? ` Context key ${group.ctx}.` : `ctx 键 ${group.ctx}。`) : "";
  const layer = (en ? LAYERS_EN : LAYERS).find((item) => item.id === group.layer);
  const siblings = groups
    .filter((item) => item.layer === group.layer && item.slug !== slug)
    .slice(0, 4)
    .map((item) => item.name)
    .join(en ? ", " : "、");
  // Short drawers would otherwise ship a 60-character description; the layer and
  // its neighbours are real context, not padding.
  const layerLine = layer
    ? en
      ? ` In the ${layer.title} layer${siblings ? `, beside ${siblings}` : ""}.`
      : `属于「${layer.title}」层${siblings ? `，同层还有 ${siblings}` : ""}。`
    : "";
  const key = group.ctx ?? group.path;
  return {
    path: `/modules/${slug}`,
    title: en
      ? `${group.name} · ${clamp(key, 30)} · DeepSeek Harness module`
      : `${group.name} · ${clamp(key, 30)} · DeepSeek Harness 模块`,
    description: clamp(
      en
        ? `${group.path} — ${group.job}. ${group.kid}.${ctxLine}${packagesLine}${layerLine}`
        : `${group.path}：${group.job}。${group.kid}。${ctxLine}${packagesLine}${layerLine}`,
      158,
    ),
  };
}

/** Unknown drawer: keep it out of the index instead of serving a soft 404. */
export function notFoundHead(locale: "zh-CN" | "en" = "zh-CN") {
  const en = locale === "en";
  return {
    meta: [
      { title: en ? "Page not found · DSH Brickbook" : "找不到这一页 · DSH 积木书" },
      { name: "robots", content: "noindex, follow" },
      {
        name: "description",
        content: en
          ? "That drawer does not exist. Open the module directory to find the right one."
          : "没有这个抽屉。回到模块目录找找别的积木。",
      },
    ],
    links: [],
  };
}

export function pageSeo(
  path: string,
  override?: Partial<PageSeo>,
  locale: "zh-CN" | "en" = "zh-CN",
): PageSeo {
  const pages = locale === "en" ? PAGE_SEO_EN : PAGE_SEO;
  const siteName = locale === "en" ? SITE_NAME_EN : SITE_NAME;
  const siteDescription = locale === "en" ? SITE_DESCRIPTION_EN : SITE_DESCRIPTION;
  const base = pages[path];
  if (base) {
    return {
      path: override?.path ?? base.path,
      title: override?.title ?? base.title,
      description: override?.description ?? base.description,
    };
  }
  const slug = path.match(/^\/modules\/([^/]+)$/)?.[1];
  if (slug) {
    const module = moduleSeo(slug, locale);
    if (module) {
      return {
        path,
        title: override?.title ?? module.title,
        description: override?.description ?? module.description,
      };
    }
  }
  return {
    path,
    title: override?.title ?? `${siteName} · DeepSeek Harness`,
    description: override?.description ?? siteDescription,
  };
}

export function seoHead(
  path: string,
  override?: Partial<PageSeo>,
  locale: "zh-CN" | "en" = "zh-CN",
) {
  const page = pageSeo(path, override, locale);
  const url = canonical(page.path, locale);
  const image = `${SITE_ORIGIN}/og.jpg`;
  const siteName = locale === "en" ? SITE_NAME_EN : SITE_NAME;
  const keywords =
    locale === "en"
      ? "DeepSeek Harness, dsh, Cordis, agent runtime, plugin architecture, SessionEvent, capability seam, subagents, AI agents"
      : "DeepSeek Harness, dsh, Cordis, 智能体运行时, 插件架构, 会话日志, 能力接头, 子智能体, AI Agent";
  const imageAlt =
    locale === "en"
      ? "DSH Brickbook — the ten-layer DeepSeek Harness brick city"
      : "DSH 积木书 — DeepSeek Harness 十层积木城";
  // Only the cover is the site itself; every other page is a dated article for
  // crawlers and answer engines that rank on freshness.
  const isArticle = page.path !== "/";
  return {
    meta: [
      { title: page.title },
      { name: "description", content: page.description },
      { name: "robots", content: "index, follow, max-image-preview:large, max-snippet:-1" },
      { name: "author", content: SITE_AUTHOR },
      { name: "creator", content: `@${SITE_AUTHOR}` },
      { name: "keywords", content: keywords },
      { name: "application-name", content: siteName },
      { property: "og:locale", content: locale === "en" ? "en_US" : "zh_CN" },
      { property: "og:locale:alternate", content: locale === "en" ? "zh_CN" : "en_US" },
      { property: "og:site_name", content: siteName },
      { property: "og:type", content: isArticle ? "article" : "website" },
      { property: "og:title", content: page.title },
      { property: "og:description", content: page.description },
      { property: "og:url", content: url },
      { property: "og:image", content: image },
      { property: "og:image:width", content: "1200" },
      { property: "og:image:height", content: "630" },
      { property: "og:image:alt", content: imageAlt },
      ...(isArticle
        ? [
            { property: "article:author", content: AUTHOR_X },
            { property: "article:published_time", content: DATE_PUBLISHED },
            { property: "article:modified_time", content: DATE_MODIFIED },
          ]
        : []),
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:site", content: `@${SITE_AUTHOR}` },
      { name: "twitter:creator", content: `@${SITE_AUTHOR}` },
      { name: "twitter:title", content: page.title },
      { name: "twitter:description", content: page.description },
      { name: "twitter:image", content: image },
      { name: "twitter:image:alt", content: imageAlt },
    ],
    links: [
      { rel: "canonical", href: url },
      { rel: "alternate", hrefLang: "zh-CN", href: canonical(page.path, "zh-CN") },
      { rel: "alternate", hrefLang: "en", href: canonical(page.path, "en") },
      { rel: "alternate", hrefLang: "x-default", href: canonical(page.path, "zh-CN") },
      { rel: "author", href: AUTHOR_X },
      { rel: "me", href: AUTHOR_X },
    ],
  };
}

export function absoluteUrl(path: string) {
  return canonical(path);
}

export function websiteJsonLd(locale: "zh-CN" | "en" = "zh-CN"): {
  "@context": string;
  "@graph": Record<string, unknown>[];
} {
  const en = locale === "en";
  const siteUrl = canonical("/", locale);
  const siteId = `${siteUrl}#website`;
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": siteId,
        url: siteUrl,
        name: en ? SITE_NAME_EN : SITE_NAME,
        alternateName: en
          ? ["DeepSeek Harness Brickbook", "dsh architecture", SITE_TAGLINE]
          : ["DeepSeek Harness 积木书", "dsh architecture", SITE_TAGLINE],
        description: en ? SITE_DESCRIPTION_EN : SITE_DESCRIPTION,
        inLanguage: locale,
        publisher: { "@id": `${SITE_ORIGIN}/#author` },
      },
      {
        "@type": "Person",
        "@id": `${SITE_ORIGIN}/#author`,
        name: `@${SITE_AUTHOR}`,
        alternateName: SITE_AUTHOR,
        url: AUTHOR_X,
        image: {
          "@type": "ImageObject",
          "@id": `${SITE_ORIGIN}/#author-avatar`,
          url: `${SITE_ORIGIN}${AUTHOR_AVATAR}`,
          width: 240,
          height: 240,
          caption: `@${SITE_AUTHOR}`,
        },
        description: en
          ? "Author of DSH Brickbook, a source-level reading of the DeepSeek Harness agent runtime."
          : "DSH 积木书作者，DeepSeek Harness 智能体运行时的源码级精读。",
        knowsAbout: ["DeepSeek Harness", "Cordis", "agent runtime", "plugin architecture"],
        sameAs: [AUTHOR_X, AUTHOR_GITHUB, SITE_REPO],
      },
      {
        "@type": "SoftwareSourceCode",
        "@id": `${SOURCE_REPO}#source`,
        name: "DeepSeek Harness",
        alternateName: "dsh",
        description: "An open-source composable agent runtime built as a Cordis plugin tree.",
        codeRepository: SOURCE_REPO,
        url: HARNESS_RELEASE.url,
        version: HARNESS_RELEASE.version,
        dateModified: HARNESS_RELEASE.released,
        license: `${SOURCE_REPO}/blob/${HARNESS_RELEASE.tag}/LICENSE`,
        programmingLanguage: ["TypeScript", "Python"],
        runtimePlatform: "Node.js 22.19 or newer",
      },
      {
        "@type": "TechArticle",
        "@id": `${siteUrl}#work`,
        headline: en
          ? "DeepSeek Harness Architecture Explained: Everything is a Plugin"
          : "DeepSeek Harness 架构图解：Everything is a Plugin",
        alternativeHeadline: SITE_DESCRIPTION_EN,
        inLanguage: locale,
        url: siteUrl,
        datePublished: DATE_PUBLISHED,
        dateModified: DATE_MODIFIED,
        author: { "@id": `${SITE_ORIGIN}/#author` },
        publisher: { "@id": `${SITE_ORIGIN}/#author` },
        about: [
          { "@id": `${SOURCE_REPO}#source` },
          "Cordis",
          "agent runtime",
          "plugin architecture",
          "append-only event log",
        ],
        citation: [
          SOURCE_REPO,
          HARNESS_RELEASE.url,
          `${SOURCE_REPO}/blob/${HARNESS_RELEASE.tag}/docs/architecture.md`,
        ],
        // Named entities the book actually covers, each pointed at its own
        // authority so an answer engine can resolve them rather than guess.
        mentions: [
          {
            "@type": "SoftwareSourceCode",
            name: "Cordis",
            description:
              "The spatially and temporally composable plugin framework dsh is built on.",
            url: `${SOURCE_REPO}/tree/${HARNESS_RELEASE.tag}/vendor`,
          },
          {
            "@type": "Thing",
            name: "Model Context Protocol",
            alternateName: "MCP",
            sameAs: "https://modelcontextprotocol.io",
          },
          {
            "@type": "Thing",
            name: "Agent Client Protocol",
            alternateName: "ACP",
            sameAs: "https://agentclientprotocol.com",
          },
          { "@type": "Thing", name: "E2B", sameAs: "https://e2b.dev" },
        ],
        image: `${SITE_ORIGIN}/og.jpg`,
        version: HARNESS_RELEASE.version,
        isBasedOn: { "@id": `${SOURCE_REPO}#source` },
      },
    ],
  };
}

export function webpageJsonLd(
  path: string,
  override?: Partial<PageSeo>,
  locale: "zh-CN" | "en" = "zh-CN",
) {
  const page = pageSeo(path, override, locale);
  const url = canonical(page.path, locale);
  const crumbs = breadcrumbs(page.path, locale);
  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": `${url}#page`,
    url,
    name: page.title,
    description: page.description,
    inLanguage: locale,
    isPartOf: { "@id": `${canonical("/", locale)}#website` },
    datePublished: DATE_PUBLISHED,
    dateModified: DATE_MODIFIED,
    primaryImageOfPage: { "@type": "ImageObject", url: `${SITE_ORIGIN}/og.jpg` },
    author: { "@id": `${SITE_ORIGIN}/#author` },
    breadcrumb: {
      "@type": "BreadcrumbList",
      itemListElement: crumbs.map((c, i) => ({
        "@type": "ListItem",
        position: i + 1,
        name: c.name,
        item: c.item,
      })),
    },
  };
}

function breadcrumbs(
  path: string,
  locale: "zh-CN" | "en" = "zh-CN",
): { name: string; item: string }[] {
  const pages = locale === "en" ? PAGE_SEO_EN : PAGE_SEO;
  const home = { name: locale === "en" ? SITE_NAME_EN : SITE_NAME, item: canonical("/", locale) };
  if (path === "/") return [home];
  const seo = pages[path];
  if (path.startsWith("/modules/") && path !== "/modules") {
    return [
      home,
      {
        name: locale === "en" ? "Module directory" : "模块目录",
        item: canonical("/modules", locale),
      },
      {
        name:
          (locale === "en" ? groupsEn(GROUPS) : GROUPS).find(
            (group) => group.slug === path.slice("/modules/".length),
          )?.name ?? path.slice("/modules/".length),
        item: canonical(path, locale),
      },
    ];
  }
  return [home, { name: seo?.title.split("·")[0]?.trim() ?? path, item: canonical(path, locale) }];
}
