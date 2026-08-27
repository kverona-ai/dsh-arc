import { createFileRoute, notFound } from "@tanstack/react-router";
import { GroupPage } from "@/routes/modules.$slug";
import { Page } from "@/components/page";
import { LocalizedLink } from "@/components/localized-link";
import { groupBySlug } from "@/data/groups";
import { notFoundHead, seoHead } from "@/lib/seo";

export const Route = createFileRoute("/en/modules/$slug")({
  loader: ({ params }) => {
    if (!groupBySlug(params.slug)) throw notFound();
    return null;
  },
  component: GroupPage,
  head: ({ params }) =>
    groupBySlug(params.slug)
      ? seoHead(`/modules/${params.slug}`, undefined, "en")
      : notFoundHead("en"),
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
