import { REPO } from "./client";

export async function fetchRepoFile(
	tag: string,
	path: string,
): Promise<string> {
	const url = `https://raw.githubusercontent.com/${REPO.owner}/${REPO.repo}/${tag}/${path}`;
	const res = await fetch(url);
	if (!res.ok) throw new Error(`Failed to fetch ${path}: ${res.status}`);
	return res.text();
}
