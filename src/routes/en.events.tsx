import { createFileRoute } from "@tanstack/react-router";
import { EventsPage } from "@/routes/events";
import { seoHead } from "@/lib/seo";

export const Route = createFileRoute("/en/events")({
  component: EventsPage,
  head: () => seoHead("/events", undefined, "en"),
});
