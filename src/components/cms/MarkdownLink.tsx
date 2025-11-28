import { Link } from '@tanstack/react-router'
import type { ReactNode } from 'react'

interface MarkdownLinkProps {
  href?: string
  children?: ReactNode
}

const MarkdownLink = ({ href, children }: MarkdownLinkProps) => {
  let resolvedHref = href ?? ''

  // if href links to .md file, it should really link to the page
  if (resolvedHref.includes('.md')) {
    const fileName = resolvedHref.split('/').pop()
    const pageName = fileName?.replace('.md', '')
    const pageNameLower = pageName?.toLowerCase()
    resolvedHref = `/${pageNameLower}`
  }

  // Check if it's an external link
  const isExternal = resolvedHref.startsWith('http') || resolvedHref.startsWith('//')

  if (isExternal) {
    return (
      <a
        href={resolvedHref}
        className="text-accent-foreground underline hover:opacity-80"
        data-umami-event="link click"
        data-umami-event-href={resolvedHref}
        target="_blank"
        rel="noopener noreferrer"
      >
        {children}
      </a>
    )
  }

  return (
    <Link
      to={resolvedHref}
      className="text-accent-foreground underline hover:opacity-80"
      data-umami-event="link click"
      data-umami-event-href={resolvedHref}
    >
      {children}
    </Link>
  )
}

export default MarkdownLink
