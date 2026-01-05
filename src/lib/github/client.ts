import { Octokit } from "@octokit/rest";

export const octokit = new Octokit({
	auth: process.env.GITHUB_TOKEN,
});

export const REPO = { owner: "pyclashbot", repo: "py-clash-bot" };
