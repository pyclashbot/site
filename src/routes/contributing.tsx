import { createFileRoute, redirect, useNavigate } from "@tanstack/react-router";
import { z } from "zod";
import MarkdownCMS from "@/components/cms/MarkdownCMS";
import Footer from "@/components/Footer";
import { VersionSelector } from "@/components/VersionSelector";
import {
	fetchRepoFile,
	getAllReleasesForSelector,
	getLatestRelease,
} from "@/lib/github";

const STALE_TIME = 15 * 60 * 1000; // 15 minutes

const searchSchema = z.object({
	ref: z.string().optional(),
});

export const Route = createFileRoute("/contributing")({
	validateSearch: (search) => searchSchema.parse(search),
	staleTime: STALE_TIME,
	loaderDeps: ({ search }) => ({ ref: search.ref }),
	loader: async ({ deps }) => {
		const [releases, latestRelease] = await Promise.all([
			getAllReleasesForSelector(),
			getLatestRelease(),
		]);
		const effectiveRef = deps.ref || latestRelease.tag_name;

		try {
			const markdown = await fetchRepoFile(effectiveRef, "CONTRIBUTING.md");
			return { markdown, releases, currentRef: effectiveRef };
		} catch {
			throw redirect({ to: "/contributing" });
		}
	},
	component: ContributingPage,
});

function ContributingPage() {
	const { markdown, releases, currentRef } = Route.useLoaderData();
	const navigate = useNavigate();

	const handleVersionChange = (ref: string) => {
		navigate({
			to: "/contributing",
			search: { ref },
		});
	};

	return (
		<>
			<MarkdownCMS markdownText={markdown} />
			<VersionSelector
				releases={releases}
				currentRef={currentRef}
				onVersionChange={handleVersionChange}
			/>
			<Footer />
		</>
	);
}
