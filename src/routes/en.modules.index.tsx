import { createFileRoute } from "@tanstack/react-router";
import { ModulesPage } from "@/routes/modules.index";
import { seoHead } from "@/lib/seo";

export const Route = createFileRoute("/en/modules/")({
  component: ModulesPage,
  head: () => seoHead("/modules", undefined, "en"),
});
