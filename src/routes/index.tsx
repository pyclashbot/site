import Footer from '@/components/Footer'
import Hero from '@/components/Hero'
import { VersionSelector } from '@/components/VersionSelector'
import MarkdownCMS from '@/components/cms/MarkdownCMS'
import {
  fetchRepoFile,
  getAllReleasesForSelector,
  getLatestRelease,
  getReleaseByTag,
  type Release,
} from '@/lib/github'
import {
  Link,
  createFileRoute,
  redirect,
  useNavigate,
} from '@tanstack/react-router'
import { z } from 'zod'

const STALE_TIME = 15 * 60 * 1000 // 15 minutes

const searchSchema = z.object({
  ref: z.string().optional(),
})

export const Route = createFileRoute('/')({
  validateSearch: (search) => searchSchema.parse(search),
  staleTime: STALE_TIME,
  loaderDeps: ({ search }) => ({ ref: search.ref }),
  loader: async ({ deps }) => {
    const [releases, latestRelease] = await Promise.all([
      getAllReleasesForSelector(),
      getLatestRelease(),
    ])
    const effectiveRef = deps.ref || latestRelease.tag_name

    // Try to get release for this ref (works for tags like v3.1.5)
    let release: Release
    try {
      release = deps.ref ? await getReleaseByTag(deps.ref) : latestRelease
    } catch {
      // Ref isn't a release tag (e.g., 'master' branch) - use latest release assets
      release = latestRelease
    }

    // Fetch README - only redirect if THIS fails (ref doesn't exist)
    try {
      let markdown = await fetchRepoFile(effectiveRef, 'README.md')
      // Strip h1 (first line) - we render it separately with download button
      markdown = markdown.replace(/^#\s+.+\n/, '')
      // Replace GitHub releases links with our releases page
      markdown = markdown.replace(
        /https:\/\/github\.com\/pyclashbot\/py-clash-bot\/releases\/?/g,
        '/releases'
      )
      // Replace LICENSE link with our license page
      markdown = markdown.replace(/\]\(LICENSE\)/g, '](/license)')
      return { release, markdown, releases, currentRef: effectiveRef }
    } catch {
      // Ref doesn't exist at all - redirect to clean URL
      throw redirect({ to: '/' })
    }
  },
  component: HomePage,
})

function HomePage() {
  const { release, markdown, releases, currentRef } = Route.useLoaderData()
  const navigate = useNavigate()

  const handleVersionChange = (ref: string) => {
    navigate({
      to: '/',
      search: { ref },
    })
  }

  return (
    <>
      <Hero assets={release.assets}>
        <Link
          to="/releases"
          search={{ tab: 'stable', page: 1 }}
          className="text-sm text-muted-foreground hover:underline"
        >
          More downloads
        </Link>
      </Hero>

      <MarkdownCMS markdownText={markdown} />
      <VersionSelector
        releases={releases}
        currentRef={currentRef}
        onVersionChange={handleVersionChange}
      />
      <Footer />
    </>
  )
}
