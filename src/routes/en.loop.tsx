import { createFileRoute } from "@tanstack/react-router";
import { LoopPage } from "@/routes/loop";
import { seoHead } from "@/lib/seo";

export const Route = createFileRoute("/en/loop")({
  component: LoopPage,
  head: () => seoHead("/loop", undefined, "en"),
});
