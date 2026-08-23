export const SITE_ORIGIN = "https://dsh.177.best";
export const SITE_NAME = "DSH 积木书";
export const SITE_TAGLINE = "Everything is a Plugin";
export const SITE_AUTHOR = "wangxy";
export const SITE_DESCRIPTION =
  "DeepSeek Harness（dsh）架构图解：Everything is a plugin，Every run is traceable。Cordis 底板、会话日志、能力 seam，小孩版与源码对照。";
export const SITE_DESCRIPTION_EN =
  "A source-level explainer of DeepSeek Harness: plugin architecture on Cordis, append-only session logs, and capability seams. Kid-friendly Chinese with the real package names.";
export const SOURCE_REPO = "https://github.com/deepseek-ai/deepseek-harness";
export const SITE_REPO = "https://github.com/kverona-ai/dsh-arc";
export const DATE_PUBLISHED = "2026-08-23";
export const DATE_MODIFIED = "2026-08-24";

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
    title: "七页故事讲完 dsh · DeepSeek Harness 入门",
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
    title: "DeepSeek Harness 模块目录 · 227 个包怎么放",
    description:
      "dsh 主干包目录：agent-loop、session、llm、fs、sandbox、subagent、host/client。按抽屉检索 npm 包与 ctx 键。",
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
      "DeepSeek Harness 是什么？Cordis 做什么？模型可见即已记录是什么意思？围栏和 E2B 有何不同？插件怎么换？",
  },
};

export function canonical(path: string) {
  if (!path || path === "/") return `${SITE_ORIGIN}/`;
  return `${SITE_ORIGIN}${path.startsWith("/") ? path : `/${path}`}`;
}

export function pageSeo(path: string, override?: Partial<PageSeo>): PageSeo {
  const base = PAGE_SEO[path];
  if (base) {
    return {
      path: override?.path ?? base.path,
      title: override?.title ?? base.title,
      description: override?.description ?? base.description,
    };
  }
  const slug = path.match(/^\/modules\/([^/]+)$/)?.[1];
  if (slug && !override?.title) {
    // Lazy import avoided: callers may pass override from groupBySlug.
    return {
      path,
      title: override?.title ?? `${slug} · DeepSeek Harness 模块 | ${SITE_NAME}`,
      description: override?.description ?? SITE_DESCRIPTION,
    };
  }
  return {
    path,
    title: override?.title ?? `${SITE_NAME} · DeepSeek Harness`,
    description: override?.description ?? SITE_DESCRIPTION,
  };
}

export function seoHead(path: string, override?: Partial<PageSeo>) {
  const page = pageSeo(path, override);
  const url = canonical(page.path);
  const image = `${SITE_ORIGIN}/og.jpg`;
  return {
    meta: [
      { title: page.title },
      { name: "description", content: page.description },
      { name: "robots", content: "index, follow, max-image-preview:large, max-snippet:-1" },
      { name: "author", content: SITE_AUTHOR },
      { name: "application-name", content: SITE_NAME },
      { property: "og:locale", content: "zh_CN" },
      { property: "og:site_name", content: SITE_NAME },
      { property: "og:type", content: "website" },
      { property: "og:title", content: page.title },
      { property: "og:description", content: page.description },
      { property: "og:url", content: url },
      { property: "og:image", content: image },
      { property: "og:image:width", content: "1200" },
      { property: "og:image:height", content: "630" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: page.title },
      { name: "twitter:description", content: page.description },
      { name: "twitter:image", content: image },
    ],
    links: [{ rel: "canonical", href: url }],
  };
}

export function absoluteUrl(path: string) {
  return canonical(path);
}

export function websiteJsonLd(): { "@context": string; "@graph": Record<string, unknown>[] } {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": `${SITE_ORIGIN}/#website`,
        url: `${SITE_ORIGIN}/`,
        name: SITE_NAME,
        alternateName: ["DeepSeek Harness 积木书", "dsh architecture", SITE_TAGLINE],
        description: SITE_DESCRIPTION,
        inLanguage: "zh-CN",
        publisher: { "@id": `${SITE_ORIGIN}/#author` },
      },
      {
        "@type": "Person",
        "@id": `${SITE_ORIGIN}/#author`,
        name: SITE_AUTHOR,
        url: SITE_REPO,
      },
      {
        "@type": "TechArticle",
        "@id": `${SITE_ORIGIN}/#work`,
        headline: "DeepSeek Harness 架构图解：Everything is a Plugin",
        alternativeHeadline: SITE_DESCRIPTION_EN,
        inLanguage: "zh-CN",
        url: `${SITE_ORIGIN}/`,
        datePublished: DATE_PUBLISHED,
        dateModified: DATE_MODIFIED,
        author: { "@id": `${SITE_ORIGIN}/#author` },
        publisher: { "@id": `${SITE_ORIGIN}/#author` },
        about: [
          "DeepSeek Harness",
          "Cordis",
          "agent runtime",
          "plugin architecture",
        ],
        citation: SOURCE_REPO,
        image: `${SITE_ORIGIN}/og.jpg`,
        isBasedOn: SOURCE_REPO,
      },
    ],
  };
}

export function webpageJsonLd(path: string, override?: Partial<PageSeo>) {
  const page = pageSeo(path, override);
  const url = canonical(page.path);
  const crumbs = breadcrumbs(page.path);
  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": `${url}#page`,
    url,
    name: page.title,
    description: page.description,
    inLanguage: "zh-CN",
    isPartOf: { "@id": `${SITE_ORIGIN}/#website` },
    datePublished: DATE_PUBLISHED,
    dateModified: DATE_MODIFIED,
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

function breadcrumbs(path: string): { name: string; item: string }[] {
  const home = { name: SITE_NAME, item: `${SITE_ORIGIN}/` };
  if (path === "/") return [home];
  const seo = PAGE_SEO[path];
  if (path.startsWith("/modules/") && path !== "/modules") {
    return [
      home,
      { name: "模块目录", item: canonical("/modules") },
      { name: seo?.title ?? path, item: canonical(path) },
    ];
  }
  return [home, { name: seo?.title.split("·")[0]?.trim() ?? path, item: canonical(path) }];
}
