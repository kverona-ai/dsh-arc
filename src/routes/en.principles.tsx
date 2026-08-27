import { createFileRoute } from "@tanstack/react-router";
import { PrinciplesPage } from "@/routes/principles";
import { seoHead } from "@/lib/seo";

export const Route = createFileRoute("/en/principles")({
  component: PrinciplesPage,
  head: () => seoHead("/principles", undefined, "en"),
});
