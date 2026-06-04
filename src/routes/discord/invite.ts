import { createServerFileRoute } from "@tanstack/react-start/server";
import { trackEvent } from "@/lib/umami";

// Maps a traffic source (?ref=) to a Discord invite. Keeping distinct invite codes
// per source means Discord's native per-invite analytics also reports the split, on
// top of umami. To rotate an invite, edit this map — nothing else changes.
const INVITES = {
	default: { invite: "https://discord.gg/nqKRkyq2UU", ref: "website" },
	client: { invite: "https://discord.gg/X7YGaX76EH", ref: "client" },
} as const;

async function handler({ request }: { request: Request }) {
	const ref = new URL(request.url).searchParams.get("ref");
	const target =
		(ref && INVITES[ref as keyof typeof INVITES]) || INVITES.default;

	await trackEvent({
		name: "discord-redirect",
		url: "/discord/invite",
		data: { ref: target.ref },
		request,
	});

	return new Response(null, {
		status: 302,
		headers: {
			Location: target.invite,
			"Cache-Control": "no-store",
		},
	});
}

export const ServerRoute = createServerFileRoute("/discord/invite").methods({
	GET: handler,
	HEAD: handler,
});
