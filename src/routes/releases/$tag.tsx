import DownloadList from '@/components/DownloadList'
import Footer from '@/components/Footer'
import MarkdownCMS from '@/components/cms/MarkdownCMS'
import { getReleaseByTag } from '@/lib/github'
import { Link, createFileRoute } from '@tanstack/react-router'

const STALE_TIME = 15 * 60 * 1000 // 15 minutes

export const Route = createFileRoute('/releases/$tag')({
  staleTime: STALE_TIME,
  loader: async ({ params }) => {
    const release = await getReleaseByTag(params.tag)
    return { release }
  },
  component: ReleasePage,
})

function ReleasePage() {
  const { release } = Route.useLoaderData()

  return (
    <>
      <Link
        to="/releases"
        search={{ tab: 'stable', page: 1 }}
        className="mb-4 block text-sm text-muted-foreground hover:text-foreground"
      >
        &larr; Back to releases
      </Link>

      <h1 className="mb-2 text-4xl font-bold tracking-tight text-foreground">
        {release.name}
      </h1>

      <div className="mb-6 flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
        <span className="font-mono">{release.tag_name}</span>
        {release.prerelease && (
          <span className="rounded bg-accent/20 px-2 py-0.5 text-xs text-accent">
            Pre-release
          </span>
        )}
        <span>{new Date(release.published_at).toLocaleDateString()}</span>
      </div>

      {/* Downloads */}
      {release.assets.length > 0 && <DownloadList assets={release.assets} />}

      {/* Release Notes */}
      {release.body && (
        <div className="mt-8">
          <h2 className="mb-4 text-xl font-semibold text-foreground">
            Release Notes
          </h2>
          <MarkdownCMS markdownText={release.body} />
        </div>
      )}

      <Footer />
    </>
  )
}
