import { createFileRoute } from "@tanstack/react-router";
import { suggestionFromHeaders } from "@/lib/locale-detection";

export const Route = createFileRoute("/api/locale-suggestion")({
  server: {
    handlers: {
      GET: ({ request }) =>
        Response.json(suggestionFromHeaders(request.headers), {
          headers: {
            "cache-control": "private, max-age=3600",
            vary: "Accept-Language, X-Vercel-IP-Country, CF-IPCountry, X-Country-Code",
          },
        }),
    },
  },
});
