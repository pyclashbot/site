import Footer from '@/components/Footer'
import HeroWithRelease from '@/components/HeroWithRelease'
import MarkdownCMS from '@/components/cms/MarkdownCMS'
import { Link, createFileRoute } from '@tanstack/react-router'

const markdownURL =
  'https://raw.githubusercontent.com/pyclashbot/py-clash-bot/master/README.md'

const STALE_TIME = 15 * 60 * 1000 // 15 minutes

export const Route = createFileRoute('/')({
  staleTime: STALE_TIME,
  loader: async () => {
    const res = await fetch(markdownURL)
    let markdown = await res.text()
    // Strip h1 (first line) - we render it separately with download button
    markdown = markdown.replace(/^#\s+.+\n/, '')
    // Replace GitHub releases links with our releases page
    markdown = markdown.replace(
      /https:\/\/github\.com\/pyclashbot\/py-clash-bot\/releases\/?/g,
      '/releases'
    )
    // Replace LICENSE link with our license page
    markdown = markdown.replace(/\]\(LICENSE\)/g, '](/license)')
    return { markdown }
  },
  component: HomePage,
})

function HomePage() {
  const { markdown } = Route.useLoaderData()

  return (
    <>
      <HeroWithRelease>
        <Link
          to="/releases"
          search={{ tab: 'stable', page: 1 }}
          className="text-sm text-muted-foreground hover:underline"
        >
          More downloads
        </Link>
      </HeroWithRelease>

      <MarkdownCMS markdownText={markdown} />
      <Footer />
    </>
  )
}
