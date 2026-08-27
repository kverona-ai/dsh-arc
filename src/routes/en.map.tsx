import { createFileRoute } from "@tanstack/react-router";
import { MapPage } from "@/routes/map";
import { seoHead } from "@/lib/seo";

export const Route = createFileRoute("/en/map")({
  component: MapPage,
  head: () => seoHead("/map", undefined, "en"),
});
