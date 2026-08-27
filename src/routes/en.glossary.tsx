import { createFileRoute } from "@tanstack/react-router";
import { GlossaryPage } from "@/routes/glossary";
import { seoHead } from "@/lib/seo";

export const Route = createFileRoute("/en/glossary")({
  component: GlossaryPage,
  head: () => seoHead("/glossary", undefined, "en"),
});
