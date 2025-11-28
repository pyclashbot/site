/// <reference types="vite/client" />
import appCss from '@/assets/index.css?url'
import { Outlet, createRootRoute, HeadContent, Scripts } from '@tanstack/react-router'
import type { ReactNode } from 'react'

const title = 'py-clash-bot - Automated Clash Royale'
const description =
  'An open-source application that allows users to automate their Clash Royale gameplay on Windows using an emulated Android phone.'

export const Route = createRootRoute({
  head: () => ({
    title,
    meta: [
      { charSet: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1.0' },
      { name: 'description', content: description },
      { property: 'og:title', content: title },
      { property: 'og:description', content: description },
      { property: 'og:site_name', content: 'py-clash-bot' },
      { property: 'og:type', content: 'website' },
      { property: 'og:locale', content: 'en_US' },
      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'twitter:title', content: title },
      { name: 'twitter:description', content: description },
    ],
    links: [
      { rel: 'canonical', href: 'https://www.pyclashbot.app/' },
      { rel: 'icon', href: '/favicon.ico' },
      {
        rel: 'preconnect',
        href: 'https://fonts.googleapis.com',
      },
      {
        rel: 'preconnect',
        href: 'https://fonts.gstatic.com',
        crossOrigin: 'anonymous',
      },
      {
        rel: 'stylesheet',
        href: 'https://fonts.googleapis.com/css2?family=Gantari:wght@400;500;600;700&display=swap',
      },
      { rel: 'stylesheet', href: appCss },
    ],
    scripts: [
      {
        async: true,
        src: 'https://analytics.pyclashbot.app/script.js',
        'data-website-id': import.meta.env.VITE_ANALYTICS_ID || '',
        'data-domains': 'pyclashbot.app,www.pyclashbot.app',
      },
    ],
  }),
  component: RootComponent,
  notFoundComponent: NotFoundPage,
})

function RootComponent() {
  return (
    <RootDocument>
      <Outlet />
    </RootDocument>
  )
}

function RootDocument({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body className="font-sans antialiased">
        <div className="mx-auto flex w-11/12 max-w-screen-md flex-col">
          <div className="flex min-h-screen flex-col">{children}</div>
        </div>
        <Scripts />
      </body>
    </html>
  )
}

function NotFoundPage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-6 md:p-24">
      <h1 className="mb-4 text-4xl font-bold text-primary">404</h1>
      <p className="text-muted-foreground">Page not found</p>
    </main>
  )
}
