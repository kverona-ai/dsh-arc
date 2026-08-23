import { createFileRoute, Link } from "@tanstack/react-router";
import { KidNote, TechNote } from "@/components/kid-note";
import { Page } from "@/components/page";
import { STORY_CHAPTERS } from "@/data/story";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/story")({ component: StoryPage });

function StoryPage() {
  return (
    <Page
      kicker="图画书"
      title="七页故事，讲完一座城"
      lead="先当五岁小孩听一遍。每页下面藏着源码里的真名字。"
    >
      <ol className="grid gap-8">
        {STORY_CHAPTERS.map((ch) => (
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
        记住三句话就够了：底板叫 Cordis；日记本才是真相；换插座时，手和脚要一起走。
      </KidNote>
      <div className="mt-8 flex flex-wrap gap-3">
        <Button asChild>
          <Link to="/principles">下一页：两条铁律</Link>
        </Button>
        <Button asChild variant="outline">
          <Link to="/loop">或者直接看一轮对话</Link>
        </Button>
      </div>
    </Page>
  );
}
