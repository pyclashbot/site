import { routeTree } from './routeTree.gen'
import { createRouter as createTanStackRouter } from '@tanstack/react-router'

// TanStack Start requires a named export called getRouter
export function getRouter() {
  const router = createTanStackRouter({
    routeTree,
    scrollRestoration: true,
  })

  return router
}

// Also export createRouter for backwards compatibility
export const createRouter = getRouter

declare module '@tanstack/react-router' {
  interface Register {
    router: ReturnType<typeof getRouter>
  }
}
