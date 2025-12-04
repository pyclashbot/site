import { getLatestReleaseFn } from '@/lib/github'
import { useQuery } from '@tanstack/react-query'
import { Link } from '@tanstack/react-router'
import DownloadButton from './DownloadButton'
import { Button } from './ui/button'

interface HeroWithReleaseProps {
  children?: React.ReactNode
}

export default function HeroWithRelease({ children }: HeroWithReleaseProps) {
  const { data: latest } = useQuery({
    queryKey: ['latest-release'],
    queryFn: () => getLatestReleaseFn(),
  })

  return (
    <div className="flex flex-col items-center gap-8 py-12">
      <p className="text-balance text-center text-5xl font-black leading-[1.1] tracking-tight text-foreground/90 sm:text-6xl">
        Skip the Grind Keep the Progress
      </p>

      {latest ? (
        <DownloadButton assets={latest.assets} />
      ) : (
        <Button variant="secondary" size="lg" className="gap-2 px-8 py-8 text-lg" asChild>
          <Link to="/releases" search={{ tab: 'stable', page: 1 }}>
            View Downloads
          </Link>
        </Button>
      )}

      {children}
    </div>
  )
}
