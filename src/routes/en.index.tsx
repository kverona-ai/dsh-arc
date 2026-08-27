import { createFileRoute } from "@tanstack/react-router";
import { HomePage } from "@/routes/index";
import { seoHead } from "@/lib/seo";

export const Route = createFileRoute("/en/")({
  component: HomePage,
  head: () => seoHead("/", undefined, "en"),
});
