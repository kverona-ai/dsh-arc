import { createFileRoute } from "@tanstack/react-router";
import { StoryPage } from "@/routes/story";
import { seoHead } from "@/lib/seo";

export const Route = createFileRoute("/en/story")({
  component: StoryPage,
  head: () => seoHead("/story", undefined, "en"),
});
