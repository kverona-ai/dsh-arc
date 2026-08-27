import { createFileRoute } from "@tanstack/react-router";
import { BootPage } from "@/routes/boot";
import { seoHead } from "@/lib/seo";

export const Route = createFileRoute("/en/boot")({
  component: BootPage,
  head: () => seoHead("/boot", undefined, "en"),
});
