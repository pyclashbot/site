import { getLatestRelease } from '@/lib/github'
import { createFileRoute, redirect } from '@tanstack/react-router'

export const Route = createFileRoute('/releases/latest')({
  loader: async () => {
    const latest = await getLatestRelease()
    throw redirect({ to: '/releases/$tag', params: { tag: latest.tag_name } })
  },
})
