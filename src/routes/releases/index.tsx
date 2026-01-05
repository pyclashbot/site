import Footer from '@/components/Footer'
import Hero from '@/components/Hero'
import { ReleasesTable } from '@/components/ReleasesTable'
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { getLatestRelease, listReleasesForTab } from '@/lib/github'
import { Link, createFileRoute, useNavigate } from '@tanstack/react-router'

const STALE_TIME = 5 * 60 * 1000 // 5 minutes

export const Route = createFileRoute('/releases/')({
  validateSearch: (search) => ({
    tab: (search.tab as 'stable' | 'prerelease') || 'stable',
    page: Number(search.page) || 1,
  }),
  staleTime: STALE_TIME,
  loaderDeps: ({ search }) => ({ tab: search.tab, page: search.page }),
  loader: async ({ deps }) => {
    const [latest, paginated] = await Promise.all([
      getLatestRelease(),
      listReleasesForTab(deps.tab, deps.page),
    ])
    return { latest, ...paginated }
  },
  component: ReleasesPage,
})

function ReleasesPage() {
  const { latest, releases, pagination } = Route.useLoaderData()
  const { tab, page } = Route.useSearch()
  const navigate = useNavigate()

  const handleTabChange = (value: string) => {
    navigate({
      to: '/releases',
      search: { tab: value as 'stable' | 'prerelease', page: 1 },
    })
  }

  const handleReleaseClick = (tag: string) => {
    navigate({
      to: '/releases/$tag',
      params: { tag },
    })
  }

  return (
    <>
      <Hero
        assets={latest.assets}
        version={latest.tag_name}
        publishedAt={latest.published_at}
        tagName={latest.tag_name}
        showDetails
      />

      <h2 className="mb-4 text-2xl font-bold tracking-tight text-foreground">
        Release History
      </h2>

      <Tabs value={tab} onValueChange={handleTabChange}>
        <TabsList className="mb-6">
          <TabsTrigger value="stable">Stable</TabsTrigger>
          <TabsTrigger value="prerelease">Pre-releases</TabsTrigger>
        </TabsList>

        <TabsContent value={tab}>
          {releases.length === 0 ? (
            <p className="py-8 text-center text-muted-foreground">
              No {tab === 'prerelease' ? 'pre-releases' : 'stable releases'}{' '}
              found.
            </p>
          ) : (
            <ReleasesTable
              releases={releases}
              onReleaseClick={handleReleaseClick}
            />
          )}
        </TabsContent>
      </Tabs>

      {(pagination.hasNextPage || page > 1) && (
        <Pagination className="mt-8">
          <PaginationContent>
            {page > 1 && (
              <PaginationItem>
                <Link to="/releases" search={{ tab, page: page - 1 }}>
                  <PaginationPrevious className="cursor-pointer" />
                </Link>
              </PaginationItem>
            )}

            <PaginationItem>
              <span className="px-4 text-sm text-muted-foreground">{page}</span>
            </PaginationItem>

            {pagination.hasNextPage && (
              <PaginationItem>
                <Link to="/releases" search={{ tab, page: page + 1 }}>
                  <PaginationNext className="cursor-pointer" />
                </Link>
              </PaginationItem>
            )}
          </PaginationContent>
        </Pagination>
      )}

      <Footer />
    </>
  )
}
