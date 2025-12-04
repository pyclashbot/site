import Footer from '@/components/Footer'
import MarkdownCMS from '@/components/cms/MarkdownCMS'
import { createFileRoute } from '@tanstack/react-router'

const markdownURL =
  'https://raw.githubusercontent.com/pyclashbot/py-clash-bot/master/CONTRIBUTING.md'

const STALE_TIME = 15 * 60 * 1000 // 15 minutes

export const Route = createFileRoute('/contributing')({
  staleTime: STALE_TIME,
  loader: async () => {
    const res = await fetch(markdownURL)
    const markdown = await res.text()
    return { markdown }
  },
  component: ContributingPage,
})

function ContributingPage() {
  const { markdown } = Route.useLoaderData()
  return (
    <>
      <MarkdownCMS markdownText={markdown} />
      <Footer />
    </>
  )
}
