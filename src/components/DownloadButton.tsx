import type { ReleaseAsset } from '@/lib/github'
import { useDetectedOS, getAssetPlatform } from '@/hooks/useDetectedOS'
import { Button } from './ui/button'
import { Link } from '@tanstack/react-router'
import { Download } from 'lucide-react'

interface DownloadButtonProps {
  assets: ReleaseAsset[]
  version?: string
  publishedAt?: string
  tagName?: string
  showChangelog?: boolean
  showDetails?: boolean
}

function formatBytes(bytes: number): string {
  if (bytes < 1024) return bytes + ' B'
  if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB'
  return (bytes / (1024 * 1024)).toFixed(1) + ' MB'
}

const platformLabels = {
  windows: 'Windows',
  macos: 'macOS',
  unknown: 'Download',
}

const platformIcons = {
  windows: (
    <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
      <path d="M0 3.449L9.75 2.1v9.451H0m10.949-9.602L24 0v11.4H10.949M0 12.6h9.75v9.451L0 20.699M10.949 12.6H24V24l-12.9-1.801" />
    </svg>
  ),
  macos: (
    <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
      <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
    </svg>
  ),
}

export default function DownloadButton({
  assets,
  version,
  publishedAt,
  tagName,
  showChangelog = true,
  showDetails = true,
}: DownloadButtonProps) {
  const detectedOS = useDetectedOS()

  // Find primary asset based on detected OS
  const primaryAsset =
    assets.find((a) => getAssetPlatform(a.name) === detectedOS) ?? assets[0]

  const primaryPlatform = primaryAsset
    ? getAssetPlatform(primaryAsset.name)
    : 'unknown'

  // Get other assets for platform icons
  const otherAssets = assets.filter((a) => a.name !== primaryAsset?.name)

  if (!primaryAsset) {
    return null
  }

  return (
    <div className="flex flex-col items-center gap-4">
      {/* Main download button */}
      <Button
        variant="secondary"
        size="lg"
        className="gap-2 px-8 py-8 text-lg"
        asChild
      >
        <a
          href={primaryAsset.download_url}
          data-umami-event={`Download - ${primaryAsset.name}`}
        >
          <Download className="h-5 w-5" />
          Download for {platformLabels[primaryPlatform]}
        </a>
      </Button>

      {showDetails && (
        <>
          {/* Size and version info */}
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <span>{formatBytes(primaryAsset.size)}</span>
            {version && (
              <>
                <span>•</span>
                <span className="font-mono">{version}</span>
              </>
            )}
          </div>

          {/* Date and changelog */}
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            {publishedAt && (
              <span>{new Date(publishedAt).toLocaleDateString()}</span>
            )}
            {showChangelog && tagName && (
              <>
                {publishedAt && <span>•</span>}
                <Link
                  to="/releases/$tag"
                  params={{ tag: tagName }}
                  className="text-accent hover:underline"
                >
                  View changelog
                </Link>
              </>
            )}
          </div>

          {/* Other platform icons */}
          {otherAssets.length > 0 && (
            <div className="flex items-center gap-3 pt-2">
              <span className="text-xs text-muted-foreground">
                Also available for:
              </span>
              {otherAssets.map((asset) => {
                const platform = getAssetPlatform(asset.name)
                const icon =
                  platform !== 'unknown' ? platformIcons[platform] : null
                return (
                  <a
                    key={asset.name}
                    href={asset.download_url}
                    className="rounded-md p-2 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                    title={`Download for ${platformLabels[platform]} (${formatBytes(asset.size)})`}
                    data-umami-event={`Download - ${asset.name}`}
                  >
                    {icon ?? platformLabels[platform]}
                  </a>
                )
              })}
            </div>
          )}
        </>
      )}
    </div>
  )
}
