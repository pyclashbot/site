import type { ReleaseAsset } from '@/lib/github'
import DownloadButton from './DownloadButton'

interface HeroProps {
  assets: ReleaseAsset[]
  version?: string
  publishedAt?: string
  tagName?: string
  showDetails?: boolean
  children?: React.ReactNode
}

export default function Hero({
  assets,
  version,
  publishedAt,
  tagName,
  showDetails = false,
  children,
}: HeroProps) {
  return (
    <div className="flex flex-col items-center gap-8 py-12">
      <p className="text-center sm:text-6xl text-5xl font-black tracking-tight leading-[1.1] text-foreground/90 text-balance">
        Skip the Grind Keep the Progress
      </p>
      <DownloadButton
        assets={assets}
        version={version}
        publishedAt={publishedAt}
        tagName={tagName}
        showDetails={showDetails}
      />
      {children}
    </div>
  )
}
