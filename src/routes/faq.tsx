import { createFileRoute } from "@tanstack/react-router";
import { FaqList } from "@/components/faq-list";
import { KidNote } from "@/components/kid-note";
import { Page } from "@/components/page";
import { seoHead } from "@/lib/seo";
import { useLocale } from "@/lib/locale";
import { LocalizedLink } from "@/components/localized-link";

export const Route = createFileRoute("/faq")({
  component: FaqPage,
  head: () => seoHead("/faq"),
});

export function FaqPage() {
  const locale = useLocale();
  const en = locale === "en";
  return (
    <Page
      kicker="FAQ"
      title={en ? "Start with these ten questions" : "先问这十句"}
      lead={
        en
          ? "A compact starting point for readers and generative search. Every answer uses the same source-level names as the rest of the Brickbook."
          : "生成式搜索和人类读者都从这里开始。每条答案都能在积木书里翻到源码真名。"
      }
    >
      <KidNote className="mb-8 max-w-3xl">
        {en
          ? "Remember the three names most often confused: inject is not inject(); sandbox is not E2B; scope is not isolate."
          : "记住三对容易绊倒的名字：inject 不是 inject()；sandbox 不是 E2B；scope 不是 isolate。"}
      </KidNote>
      <FaqList />
      <p className="mt-8 text-sm text-muted">
        {en ? "Need to check a name?" : "还想对名字："}
        <LocalizedLink to="/glossary" className="ml-1 text-accent hover:underline">
          {en ? "Open the glossary" : "打开词汇表"}
        </LocalizedLink>
        {en ? ". Looking for an extension hook?" : "。想看挂钩："}
        <LocalizedLink to="/principles" className="ml-1 text-accent hover:underline">
          {en ? "Read the two principles" : "两条铁律"}
        </LocalizedLink>
        {en ? "." : "。"}
      </p>
    </Page>
  );
}
