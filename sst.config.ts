/// <reference path="./.sst/platform/config.d.ts" />

export default $config({
  app(input) {
    return {
      name: 'pyclashbot-site',
      removal: input?.stage === 'production' ? 'retain' : 'remove',
      protect: ['production'].includes(input?.stage),
      home: 'aws',
      providers: {
        aws: {
          profile: 'pyclashbot',
          region: 'us-east-1',
        },
      },
    }
  },
  async run() {
    const stage = $app.stage
    const isProduction = stage === 'production'

    const baseDomain = isProduction ? 'pyclashbot.app' : `${stage}.pyclashbot.app`

    const dns = sst.aws.dns({
      zone: 'Z018325532CS6EQFY59HX',
    })

    const router = new sst.aws.Router('ApiRouter', {
      domain: {
        name: baseDomain,
        aliases: isProduction ? [`www.${baseDomain}`] : undefined,
        dns,
      },
    })

    new sst.aws.TanStackStart('PyclashbotSite', {
      router: {
        instance: router,
      },
      environment: {
        API_ROUTE_SECRET: process.env.API_ROUTE_SECRET || '',
        DISCORD_WEBHOOK_RELEASE: process.env.DISCORD_WEBHOOK_RELEASE || '',
        DISCORD_WEBHOOK_PRERELEASE: process.env.DISCORD_WEBHOOK_PRERELEASE || '',
        ANALYTICS_ID: process.env.ANALYTICS_ID || '',
      },
    })
  },
  console: {
    autodeploy: {
      target(event) {
        if (event.type === 'branch' && event.action === 'pushed') {
          if (event.branch === 'develop') {
            return { stage: 'develop' }
          }

          if (event.branch === 'master') {
            return { stage: 'production' }
          }
        }
      },
    },
  },
})
