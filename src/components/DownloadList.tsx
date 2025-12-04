import type { ReleaseAsset } from '@/lib/github'

interface DownloadListProps {
  assets: ReleaseAsset[]
}

function formatBytes(bytes: number): string {
  if (bytes < 1024) return bytes + ' B'
  if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB'
  return (bytes / (1024 * 1024)).toFixed(1) + ' MB'
}

export default function DownloadList({ assets }: DownloadListProps) {
  return (
    <div className="rounded-lg border border-border bg-card p-4">
      <h3 className="mb-3 font-semibold text-foreground">Downloads</h3>
      <div className="space-y-2">
        {assets.map((asset) => (
          <a
            key={asset.name}
            href={asset.download_url}
            className="flex items-center justify-between rounded border border-border p-3 transition-colors hover:border-accent hover:bg-muted"
            data-umami-event={`Download - ${asset.name}`}
          >
            <span className="font-mono text-sm text-foreground">
              {asset.name}
            </span>
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <span>{formatBytes(asset.size)}</span>
              <span>{asset.download_count.toLocaleString()} downloads</span>
            </div>
          </a>
        ))}
      </div>
    </div>
  )
}
