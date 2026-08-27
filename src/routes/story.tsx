import { createFileRoute } from "@tanstack/react-router";
import { KidNote, TechNote } from "@/components/kid-note";
import { Page } from "@/components/page";
import { STORY_CHAPTERS } from "@/data/story";
import { Button } from "@/components/ui/button";
import { seoHead } from "@/lib/seo";
import { STORY_CHAPTERS_EN } from "@/data/en/story";
import { useLocale } from "@/lib/locale";
import { LocalizedLink } from "@/components/localized-link";

export const Route = createFileRoute("/story")({
  component: StoryPage,
  head: () => seoHead("/story"),
});

export function StoryPage() {
  const locale = useLocale();
  const en = locale === "en";
  const chapters = en ? STORY_CHAPTERS_EN : STORY_CHAPTERS;
  return (
    <Page
      kicker={en ? "Picture book" : "图画书"}
      title={en ? "A whole city in eight pages" : "八页故事，讲完一座城"}
      lead={
        en
          ? "Hear it once like a five-year-old. The real source names are tucked under every page."
          : "先当五岁小孩听一遍。每页下面藏着源码里的真名字。"
      }
    >
      <ol className="grid gap-8">
        {chapters.map((ch) => (
          <li key={ch.n} className="grid gap-3 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
            <article className="rounded-2xl bg-elevated p-6 shadow-[var(--shadow-border)] sm:p-8">
              <p className="font-mono text-xs text-accent tabular-nums">{ch.n}</p>
              <h2 className="mt-3 text-2xl sm:text-3xl">{ch.title}</h2>
              <p className="mt-4 text-base leading-relaxed">{ch.kid}</p>
            </article>
            <TechNote>{ch.tech}</TechNote>
          </li>
        ))}
      </ol>
      <KidNote className="mt-10">
        {en
          ? "Remember three things: the baseplate is Cordis; the journal is the source of truth; and when you replace a socket, hands and feet move together."
          : "记住三句话就够了：底板叫 Cordis；日记本才是真相；换插座时，手和脚要一起走。"}
      </KidNote>
      <div className="mt-8 flex flex-wrap gap-3">
        <Button asChild>
          <LocalizedLink to="/principles">
            {en ? "Next: the two principles" : "下一页：两条铁律"}
          </LocalizedLink>
        </Button>
        <Button asChild variant="outline">
          <LocalizedLink to="/loop">
            {en ? "Or follow one conversation" : "或者直接看一轮对话"}
          </LocalizedLink>
        </Button>
      </div>
    </Page>
  );
}
