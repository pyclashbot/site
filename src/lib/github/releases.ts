import { octokit, REPO } from "./client";

export class GitHubApiError extends Error {
	constructor(
		message: string,
		public status?: number,
	) {
		super(message);
		this.name = "GitHubApiError";
	}
}

export interface ReleaseAsset {
	name: string;
	download_url: string;
	size: number;
	download_count: number;
}

export interface Release {
	tag_name: string;
	name: string;
	body: string | null;
	published_at: string;
	prerelease: boolean;
	html_url: string;
	assets: ReleaseAsset[];
}

export interface PaginatedReleases {
	releases: Release[];
	pagination: {
		page: number;
		hasNextPage: boolean;
	};
}

export interface ReleaseOption {
	tag_name: string;
	name: string;
	published_at: string;
	prerelease: boolean;
}

export interface AllReleasesResponse {
	latestStable: ReleaseOption | null;
	latestPrerelease: ReleaseOption | null;
	allReleases: ReleaseOption[];
}

const ITEMS_PER_PAGE = 20;

export async function listReleasesForTab(
	tab: "stable" | "prerelease",
	page: number,
): Promise<PaginatedReleases> {
	const allReleases = await fetchAllReleases(formatRelease);

	const filtered = allReleases.filter((r) =>
		tab === "prerelease" ? r.prerelease : !r.prerelease,
	);

	const startIndex = (page - 1) * ITEMS_PER_PAGE;
	const pageReleases = filtered.slice(startIndex, startIndex + ITEMS_PER_PAGE);
	const hasNextPage = filtered.length > page * ITEMS_PER_PAGE;

	return {
		releases: pageReleases,
		pagination: { page, hasNextPage },
	};
}

export async function getReleaseByTag(tag: string): Promise<Release> {
	try {
		const { data } = await octokit.repos.getReleaseByTag({
			...REPO,
			tag,
		});
		return formatRelease(data);
	} catch (error) {
		console.error("[GitHub] getReleaseByTag failed:", tag, error);
		throw new GitHubApiError(`Release not found: ${tag}`, 404);
	}
}

export async function getLatestRelease(): Promise<Release> {
	try {
		const { data } = await octokit.repos.getLatestRelease(REPO);
		return formatRelease(data);
	} catch (error) {
		console.error("[GitHub] getLatestRelease failed:", error);
		throw new GitHubApiError("No releases found", 404);
	}
}

export async function getAllReleasesForSelector(): Promise<AllReleasesResponse> {
	const allReleases = await fetchAllReleases(formatReleaseOption);

	// Sort by published_at descending (newest first)
	allReleases.sort(
		(a, b) =>
			new Date(b.published_at).getTime() - new Date(a.published_at).getTime(),
	);

	const latestStable = allReleases.find((r) => !r.prerelease) ?? null;
	const latestPrerelease = allReleases.find((r) => r.prerelease) ?? null;

	return { latestStable, latestPrerelease, allReleases };
}

type GitHubRelease = Awaited<
	ReturnType<typeof octokit.repos.listReleases>
>["data"][number];

async function fetchAllReleases<T>(
	mapper: (release: GitHubRelease) => T,
): Promise<T[]> {
	try {
		const results: T[] = [];
		let page = 1;
		const perPage = 100;

		while (true) {
			const { data } = await octokit.repos.listReleases({
				...REPO,
				page,
				per_page: perPage,
			});

			if (data.length === 0) break;
			results.push(...data.map(mapper));
			if (data.length < perPage) break;
			page++;
		}

		return results;
	} catch (error) {
		console.error("[GitHub] fetchAllReleases failed:", error);
		throw new GitHubApiError("Failed to fetch releases", 500);
	}
}

function formatReleaseOption(release: GitHubRelease): ReleaseOption {
	return {
		tag_name: release.tag_name,
		name: release.name || release.tag_name,
		published_at: release.published_at ?? "",
		prerelease: release.prerelease,
	};
}

function formatRelease(release: GitHubRelease): Release {
	return {
		tag_name: release.tag_name,
		name: release.name || release.tag_name,
		body: release.body ?? null,
		published_at: release.published_at ?? "",
		prerelease: release.prerelease,
		html_url: release.html_url,
		assets: release.assets
			.filter((a) => !a.name.endsWith(".zip") && !a.name.endsWith(".tar.gz"))
			.map((a) => ({
				name: a.name,
				download_url: a.browser_download_url,
				size: a.size,
				download_count: a.download_count,
			})),
	};
}
