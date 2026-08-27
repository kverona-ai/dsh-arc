import { createFileRoute } from "@tanstack/react-router";
import { SeamsPage } from "@/routes/seams";
import { seoHead } from "@/lib/seo";

export const Route = createFileRoute("/en/seams")({
  component: SeamsPage,
  head: () => seoHead("/seams", undefined, "en"),
});
