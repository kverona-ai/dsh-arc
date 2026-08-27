import { useRouterState } from "@tanstack/react-router";
import { FAQS } from "@/data/faq";
import { JsonLd } from "@/components/json-ld";
import { canonical, SOURCE_REPO, webpageJsonLd, websiteJsonLd } from "@/lib/seo";
import { FAQS_EN } from "@/data/en/faq";
import { groupsEn } from "@/data/en/groups";
import { GROUPS } from "@/data/groups";
import { GLOSSARY } from "@/data/glossary";
import { GLOSSARY_EN } from "@/data/en/glossary";
import { PACKAGES } from "@/data/packages";
import { packagesEn } from "@/data/en/packages";
import { SEAMS } from "@/data/seams";
import { SEAMS_EN } from "@/data/en/seams";
import { BOOT_STEPS } from "@/data/boot";
import { BOOT_STEPS_EN } from "@/data/en/boot";
import { STORY_CHAPTERS } from "@/data/story";
import { STORY_CHAPTERS_EN } from "@/data/en/story";
import { basePath, localeFromPath } from "@/lib/locale";

type Node = Record<string, unknown>;

/** Page-level structured data: what answer engines quote when they cite this site. */
export function SeoBlock() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const locale = localeFromPath(pathname);
  const path = basePath(pathname);
  const en = locale === "en";
  const site = websiteJsonLd(locale);
  // pageSeo resolves /modules/<slug> itself, so the WebPage node stays in sync
  // with the <title> and meta description instead of restating them.
  const page = webpageJsonLd(path, undefined, locale);
  const url = canonical(path, locale);
  const entities: Node[] = pageEntities(path, url, en).map((node) => ({
    inLanguage: locale,
    ...node,
  }));
  // Point the page at the thing it is actually about, so an answer engine reads
  // the FAQ, HowTo, term set, or package list as this URL's primary entity.
  const primary = entities[0]?.["@id"];
  const graph: unknown[] = [
    ...site["@graph"],
    primary ? { ...page, mainEntity: { "@id": primary } } : page,
    ...entities,
  ];

  return <JsonLd data={{ "@context": "https://schema.org", "@graph": graph }} />;
}

function pageEntities(path: string, url: string, en: boolean): Node[] {
  if (path === "/faq") {
    const faqs = en ? FAQS_EN : FAQS;
    return [
      {
        "@type": "FAQPage",
        "@id": `${url}#faq`,
        mainEntity: faqs.map((item) => ({
          "@type": "Question",
          name: item.q,
          acceptedAnswer: { "@type": "Answer", text: item.a },
        })),
      },
    ];
  }

  if (path === "/glossary") {
    const terms = en ? GLOSSARY_EN : GLOSSARY;
    const setId = `${url}#terms`;
    return [
      {
        "@type": "DefinedTermSet",
        "@id": setId,
        name: en ? "DeepSeek Harness glossary" : "DeepSeek Harness 词汇表",
        url,
        hasDefinedTerm: terms.map((t) => ({
          "@type": "DefinedTerm",
          name: t.term,
          alternateName: t.cn,
          description: t.tech,
          inDefinedTermSet: { "@id": setId },
        })),
      },
    ];
  }

  const groupSlug = path.match(/^\/modules\/([^/]+)$/)?.[1];
  if (groupSlug) {
    const group = (en ? groupsEn(GROUPS) : GROUPS).find((item) => item.slug === groupSlug);
    const packages = (en ? packagesEn(PACKAGES) : PACKAGES).filter((p) => p.group === groupSlug);
    if (!group || !packages.length) return [];
    return [
      {
        "@type": "ItemList",
        "@id": `${url}#packages`,
        name: en
          ? `${group.name} packages in DeepSeek Harness`
          : `DeepSeek Harness ${group.name} 组的包`,
        description: en ? `${group.job}. ${group.kid}.` : `${group.job}。${group.kid}。`,
        numberOfItems: packages.length,
        itemListElement: packages.map((pkg, i) => ({
          "@type": "ListItem",
          position: i + 1,
          item: {
            "@type": "SoftwareSourceCode",
            name: pkg.npm,
            description: en ? `${pkg.job}. ${pkg.kid}` : `${pkg.job}。${pkg.kid}`,
            ...(pkg.ctx ? { alternateName: pkg.ctx } : {}),
            codeRepository: `${SOURCE_REPO}/tree/master/${group.path}`,
            isPartOf: { "@id": `${SOURCE_REPO}#source` },
          },
        })),
      },
    ];
  }

  if (path === "/modules") {
    const packages = en ? packagesEn(PACKAGES) : PACKAGES;
    return [
      {
        "@type": "ItemList",
        "@id": `${url}#packages`,
        name: en ? "DeepSeek Harness package directory" : "DeepSeek Harness 模块目录",
        numberOfItems: packages.length,
        itemListOrder: "https://schema.org/ItemListUnordered",
        itemListElement: packages.map((pkg, i) => ({
          "@type": "ListItem",
          position: i + 1,
          item: {
            "@type": "SoftwareSourceCode",
            name: pkg.npm,
            description: en ? `${pkg.job}. ${pkg.kid}` : `${pkg.job}。${pkg.kid}`,
            ...(pkg.ctx ? { alternateName: pkg.ctx } : {}),
            isPartOf: { "@id": `${SOURCE_REPO}#source` },
          },
        })),
      },
    ];
  }

  if (path === "/seams") {
    const seams = en ? SEAMS_EN : SEAMS;
    return [
      {
        "@type": "ItemList",
        "@id": `${url}#seams`,
        name: en ? "DeepSeek Harness capability seams" : "DeepSeek Harness 能力接头",
        numberOfItems: seams.length,
        itemListElement: seams.map((seam, i) => ({
          "@type": "ListItem",
          position: i + 1,
          name: seam.ctx,
          description: `${seam.definition} — ${seam.swapStory}`,
        })),
      },
    ];
  }

  if (path === "/boot") {
    const steps = en ? BOOT_STEPS_EN : BOOT_STEPS;
    return [
      {
        "@type": "HowTo",
        "@id": `${url}#boot`,
        name: en ? "How a DeepSeek Harness process boots" : "DeepSeek Harness 是怎么启动的",
        description: en
          ? "Profile, bundles, and patches compose onto an empty root before the first fiber activates."
          : "profile、bundle 与补丁在空根上依次叠加，直到所有 fiber 激活。",
        totalTime: "PT2M",
        step: steps.map((item, i) => ({
          "@type": "HowToStep",
          position: i + 1,
          name: item.title,
          text: item.tech,
        })),
      },
    ];
  }

  if (path === "/story") {
    const chapters = en ? STORY_CHAPTERS_EN : STORY_CHAPTERS;
    return [
      {
        "@type": "ItemList",
        "@id": `${url}#chapters`,
        name: en ? "DeepSeek Harness in eight pages" : "八页故事讲完 DeepSeek Harness",
        numberOfItems: chapters.length,
        itemListOrder: "https://schema.org/ItemListOrderAscending",
        itemListElement: chapters.map((ch, i) => ({
          "@type": "ListItem",
          position: i + 1,
          name: ch.title,
          description: ch.tech,
        })),
      },
    ];
  }

  return [];
}
