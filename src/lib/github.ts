import { Octokit } from '@octokit/rest'
import { createServerFn } from '@tanstack/react-start'

const octokit = new Octokit({
  auth: process.env.GITHUB_TOKEN,
})

const REPO = { owner: 'pyclashbot', repo: 'py-clash-bot' }

export interface ReleaseAsset {
  name: string
  download_url: string
  size: number
  download_count: number
}

export interface Release {
  tag_name: string
  name: string
  body: string | null
  published_at: string
  prerelease: boolean
  html_url: string
  assets: ReleaseAsset[]
}

export interface PaginatedReleases {
  releases: Release[]
  pagination: {
    page: number
    hasNextPage: boolean
  }
}

const ITEMS_PER_PAGE = 20

export async function listReleasesForTab(
  tab: 'stable' | 'prerelease',
  page: number
): Promise<PaginatedReleases> {
  const needed = page * ITEMS_PER_PAGE + 1 // +1 to check if there's a next page
  let allReleases: Release[] = []
  let githubPage = 1
  const perPage = 100 // Max per request

  // Fetch until we have enough of the target type
  while (true) {
    const { data } = await octokit.repos.listReleases({
      ...REPO,
      page: githubPage,
      per_page: perPage,
    })

    if (data.length === 0) break

    allReleases.push(...data.map(formatRelease))

    // Filter for target tab
    const filtered = allReleases.filter((r) =>
      tab === 'prerelease' ? r.prerelease : !r.prerelease
    )

    // Have enough or no more pages from GitHub
    if (filtered.length >= needed || data.length < perPage) break

    githubPage++
  }

  // Filter and paginate
  const filtered = allReleases.filter((r) =>
    tab === 'prerelease' ? r.prerelease : !r.prerelease
  )

  const startIndex = (page - 1) * ITEMS_PER_PAGE
  const pageReleases = filtered.slice(startIndex, startIndex + ITEMS_PER_PAGE)
  const hasNextPage = filtered.length > page * ITEMS_PER_PAGE

  return {
    releases: pageReleases,
    pagination: {
      page,
      hasNextPage,
    },
  }
}

export async function getReleaseByTag(tag: string): Promise<Release> {
  const { data } = await octokit.repos.getReleaseByTag({
    ...REPO,
    tag,
  })
  return formatRelease(data)
}

export async function getLatestRelease(): Promise<Release> {
  const { data } = await octokit.repos.getLatestRelease(REPO)
  return formatRelease(data)
}

// Server function for client-side fetching via TanStack Query
export const getLatestReleaseFn = createServerFn().handler(async () => {
  return getLatestRelease()
})

type GitHubRelease = Awaited<
  ReturnType<typeof octokit.repos.listReleases>
>['data'][number]

function formatRelease(release: GitHubRelease): Release {
  return {
    tag_name: release.tag_name,
    name: release.name || release.tag_name,
    body: release.body ?? null,
    published_at: release.published_at ?? '',
    prerelease: release.prerelease,
    html_url: release.html_url,
    assets: release.assets
      .filter((a) => !a.name.endsWith('.zip') && !a.name.endsWith('.tar.gz'))
      .map((a) => ({
        name: a.name,
        download_url: a.browser_download_url,
        size: a.size,
        download_count: a.download_count,
      })),
  }
}
