import { createFileRoute, redirect } from "@tanstack/react-router";
import { CACHE_HEADERS } from "@/lib/cache";
import { getLatestRelease } from "@/lib/github";

export const Route = createFileRoute("/releases/latest")({
	headers: () => ({ "Cache-Control": CACHE_HEADERS.NO_CACHE }),
	loader: async () => {
		const latest = await getLatestRelease();
		throw redirect({ to: "/releases/$tag", params: { tag: latest.tag_name } });
	},
});
