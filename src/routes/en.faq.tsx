import { createFileRoute } from "@tanstack/react-router";
import { FaqPage } from "@/routes/faq";
import { seoHead } from "@/lib/seo";

export const Route = createFileRoute("/en/faq")({
  component: FaqPage,
  head: () => seoHead("/faq", undefined, "en"),
});
