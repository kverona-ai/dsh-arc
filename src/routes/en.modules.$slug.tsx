import { createFileRoute } from "@tanstack/react-router";
import { GroupPage } from "@/routes/modules.$slug";
import { Page } from "@/components/page";
import { LocalizedLink } from "@/components/localized-link";
import { groupsEn } from "@/data/en/groups";
import { GROUPS } from "@/data/groups";
import { seoHead } from "@/lib/seo";

export const Route = createFileRoute("/en/modules/$slug")({
  component: GroupPage,
  head: ({ params }) => {
    const group = groupsEn(GROUPS).find((item) => item.slug === params.slug);
    if (!group) return seoHead("/modules", undefined, "en");
    return seoHead(
      `/modules/${group.slug}`,
      {
        title: `${group.name} · DeepSeek Harness Module | DSH Brickbook`,
        description: `${group.job}. ${group.kid}${group.ctx ? `. ${group.ctx}` : ""}.`,
      },
      "en",
    );
  },
  notFoundComponent: () => (
    <Page
      title="That drawer does not exist"
      lead="Return to the directory to explore other bricks."
    >
      <LocalizedLink to="/modules" className="text-accent hover:underline">
        Back to directory
      </LocalizedLink>
    </Page>
  ),
});
