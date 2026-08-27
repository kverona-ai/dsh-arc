import { useRouterState } from "@tanstack/react-router";
import { FAQS } from "@/data/faq";
import { groupBySlug } from "@/data/groups";
import { JsonLd } from "@/components/json-ld";
import { canonical, webpageJsonLd, websiteJsonLd } from "@/lib/seo";
import { FAQS_EN } from "@/data/en/faq";
import { groupsEn } from "@/data/en/groups";
import { GROUPS } from "@/data/groups";
import { GLOSSARY } from "@/data/glossary";
import { GLOSSARY_EN } from "@/data/en/glossary";
import { PACKAGES } from "@/data/packages";
import { packagesEn } from "@/data/en/packages";
import { SEAMS } from "@/data/seams";
import { SEAMS_EN } from "@/data/en/seams";
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
  const slug = path.match(/^\/modules\/([^/]+)$/)?.[1];
  const group = slug
    ? en
      ? groupsEn(GROUPS).find((item) => item.slug === slug)
      : groupBySlug(slug)
    : undefined;
  const page = webpageJsonLd(
    path,
    group
      ? {
          title: `${group.name} · DeepSeek Harness ${en ? "Module | DSH Brickbook" : "模块 | DSH 积木书"}`,
          description: en ? `${group.job}. ${group.kid}` : `${group.job}。${group.kid}`,
        }
      : undefined,
    locale,
  );
  const url = canonical(path, locale);
  const graph: unknown[] = [...site["@graph"], page, ...pageEntities(path, url, en)];

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
            isPartOf: { "@id": "https://github.com/deepseek-ai/deepseek-harness#source" },
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

  if (path === "/story") {
    const chapters = en ? STORY_CHAPTERS_EN : STORY_CHAPTERS;
    return [
      {
        "@type": "ItemList",
        "@id": `${url}#chapters`,
        name: en
          ? "DeepSeek Harness in eight pages"
          : "八页故事讲完 DeepSeek Harness",
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
