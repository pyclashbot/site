import Footer from '@/components/Footer'
import Hero from '@/components/Hero'
import MarkdownCMS from '@/components/cms/MarkdownCMS'
import { fetchRepoFile, getLatestRelease } from '@/lib/github'
import { Link, createFileRoute } from '@tanstack/react-router'

const STALE_TIME = 15 * 60 * 1000 // 15 minutes

export const Route = createFileRoute('/')({
  staleTime: STALE_TIME,
  loader: async () => {
    const release = await getLatestRelease()
    let markdown = await fetchRepoFile(release.tag_name, 'README.md')
    // Strip h1 (first line) - we render it separately with download button
    markdown = markdown.replace(/^#\s+.+\n/, '')
    // Replace GitHub releases links with our releases page
    markdown = markdown.replace(
      /https:\/\/github\.com\/pyclashbot\/py-clash-bot\/releases\/?/g,
      '/releases'
    )
    // Replace LICENSE link with our license page
    markdown = markdown.replace(/\]\(LICENSE\)/g, '](/license)')
    return { release, markdown }
  },
  component: HomePage,
})

function HomePage() {
  const { release, markdown } = Route.useLoaderData()

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
      <Footer />
    </>
  )
}
