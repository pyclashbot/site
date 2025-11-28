import { SendEmbed } from '@/lib/discord'
import { createFileRoute } from '@tanstack/react-router'
import { z } from 'zod'

const envSchema = z.object({
  API_ROUTE_SECRET: z.string(),
  DISCORD_WEBHOOK_PRERELEASE: z.string().url(),
})

export const Route = createFileRoute('/api/webhook/release/prerelease')({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const env = envSchema.parse(process.env)

        // Authorization
        const { searchParams } = new URL(request.url)
        if (searchParams.get('code') !== env.API_ROUTE_SECRET) {
          return new Response('You are not authorized to call this API', {
            status: 401,
          })
        }

        // Parse body
        const reqBody = await request.text()
        if (reqBody === '') {
          return new Response('No body', { status: 400 })
        }

        const data: {
          title?: string
          description?: string
          url?: string
          timestamp?: Date
          color?: number
        } = JSON.parse(reqBody)

        console.log('Embed data:', data)

        if (data.title) {
          data.title = '📦 | ' + data.title
        }

        // Send embed
        await SendEmbed(env.DISCORD_WEBHOOK_PRERELEASE, {
          title: '📦 | New Pre-Release',
          url: 'https://github.com/pyclashbot/py-clash-bot/releases/latest',
          color: 0xfca503,
          tagId: '1128136612715450498',
          ...data,
        })

        return new Response('Success', { status: 200 })
      },
    },
  },
})
