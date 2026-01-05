import { Octokit } from "@octokit/rest";

const token = process.env.GITHUB_TOKEN;

if (!token) {
	console.warn(
		"[GitHub] GITHUB_TOKEN not set - using unauthenticated API (60 req/hour limit)",
	);
}

export const octokit = new Octokit({
	...(token && { auth: token }),
});

export const REPO = { owner: "pyclashbot", repo: "py-clash-bot" };
