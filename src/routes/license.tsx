import { createFileRoute } from "@tanstack/react-router";
import Footer from "@/components/Footer";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { CACHE_HEADERS } from "@/lib/cache";
import { fetchRepoFile } from "@/lib/github";

const STALE_TIME = 15 * 60 * 1000;

export const Route = createFileRoute("/license")({
	staleTime: STALE_TIME,
	headers: () => ({ "Cache-Control": CACHE_HEADERS.IMMUTABLE }),
	loader: async () => {
		// Always fetch LICENSE from master since it represents current legal terms
		const license = await fetchRepoFile("master", "LICENSE");
		return { license };
	},
	component: LicensePage,
});

function LicensePage() {
	const { license } = Route.useLoaderData();
	return (
		<>
			<Card className="my-8">
				<CardHeader>
					<CardTitle className="text-2xl">License</CardTitle>
					<CardDescription>
						py-clash-bot Dual License (NC-CL-1.0 + CC BY-NC-SA 4.0)
					</CardDescription>
				</CardHeader>
				<CardContent>
					<Textarea
						value={license}
						readOnly
						className="h-[600px] resize-none font-mono text-xs leading-relaxed"
					/>
				</CardContent>
			</Card>
			<Footer />
		</>
	);
}
