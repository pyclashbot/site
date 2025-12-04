import Footer from '@/components/Footer'
import MarkdownCMS from '@/components/cms/MarkdownCMS'
import { fetchRepoFile, getLatestRelease } from '@/lib/github'
import { createFileRoute } from '@tanstack/react-router'

const STALE_TIME = 15 * 60 * 1000 // 15 minutes

export const Route = createFileRoute('/contributing')({
  staleTime: STALE_TIME,
  loader: async () => {
    const release = await getLatestRelease()
    const markdown = await fetchRepoFile(release.tag_name, 'CONTRIBUTING.md')
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
