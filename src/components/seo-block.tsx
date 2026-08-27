import { useRouterState } from "@tanstack/react-router";
import { FAQS } from "@/data/faq";
import { groupBySlug } from "@/data/groups";
import { JsonLd } from "@/components/json-ld";
import { SITE_ORIGIN, webpageJsonLd, websiteJsonLd } from "@/lib/seo";
import { FAQS_EN } from "@/data/en/faq";
import { groupsEn } from "@/data/en/groups";
import { GROUPS } from "@/data/groups";
import { basePath, localeFromPath } from "@/lib/locale";

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
  const graph: unknown[] = [...site["@graph"], page];

  if (path === "/faq") {
    const faqs = en ? FAQS_EN : FAQS;
    graph.push({
      "@type": "FAQPage",
      "@id": `${en ? `${SITE_ORIGIN}/en` : SITE_ORIGIN}/faq#faq`,
      mainEntity: faqs.map((item) => ({
        "@type": "Question",
        name: item.q,
        acceptedAnswer: { "@type": "Answer", text: item.a },
      })),
    });
  }

  return <JsonLd data={{ "@context": "https://schema.org", "@graph": graph }} />;
}
