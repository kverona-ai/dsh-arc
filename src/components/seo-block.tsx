import { useRouterState } from "@tanstack/react-router";
import { FAQS } from "@/data/faq";
import { groupBySlug } from "@/data/groups";
import { JsonLd } from "@/components/json-ld";
import { SITE_ORIGIN, webpageJsonLd, websiteJsonLd } from "@/lib/seo";

export function SeoBlock() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const site = websiteJsonLd();
  const slug = pathname.match(/^\/modules\/([^/]+)$/)?.[1];
  const group = slug ? groupBySlug(slug) : undefined;
  const page = webpageJsonLd(
    pathname,
    group
      ? {
          title: `${group.name} · DeepSeek Harness 模块 | DSH 积木书`,
          description: `${group.job}。${group.kid}`,
        }
      : undefined,
  );
  const graph: unknown[] = [...site["@graph"], page];

  if (pathname === "/faq") {
    graph.push({
      "@type": "FAQPage",
      "@id": `${SITE_ORIGIN}/faq#faq`,
      mainEntity: FAQS.map((item) => ({
        "@type": "Question",
        name: item.q,
        acceptedAnswer: { "@type": "Answer", text: item.a },
      })),
    });
  }

  return <JsonLd data={{ "@context": "https://schema.org", "@graph": graph }} />;
}
