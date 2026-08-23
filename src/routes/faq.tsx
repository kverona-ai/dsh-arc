import { createFileRoute, Link } from "@tanstack/react-router";
import { FaqList } from "@/components/faq-list";
import { KidNote } from "@/components/kid-note";
import { Page } from "@/components/page";
import { seoHead } from "@/lib/seo";

export const Route = createFileRoute("/faq")({
  component: FaqPage,
  head: () => seoHead("/faq"),
});

function FaqPage() {
  return (
    <Page
      kicker="FAQ"
      title="先问这八句"
      lead="生成式搜索和人类读者都从这里开始。每条答案都能在积木书里翻到源码真名。"
    >
      <KidNote className="mb-8 max-w-3xl">
        记住三对容易绊倒的名字：inject 不是 inject()；sandbox 不是 E2B；scope 不是 isolate。
      </KidNote>
      <FaqList />
      <p className="mt-8 text-sm text-muted">
        还想对名字：
        <Link to="/glossary" className="ml-1 text-accent hover:underline">
          打开词汇表
        </Link>
        。想看挂钩：
        <Link to="/principles" className="ml-1 text-accent hover:underline">
          两条铁律
        </Link>
        。
      </p>
    </Page>
  );
}
