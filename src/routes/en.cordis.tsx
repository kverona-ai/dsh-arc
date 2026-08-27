import { createFileRoute } from "@tanstack/react-router";
import { CordisPage } from "@/routes/cordis";
import { seoHead } from "@/lib/seo";

export const Route = createFileRoute("/en/cordis")({
  component: CordisPage,
  head: () => seoHead("/cordis", undefined, "en"),
});
