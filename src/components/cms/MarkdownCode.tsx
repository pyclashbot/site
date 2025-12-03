import type { ReactNode } from 'react'

interface MarkdownCodeProps {
  children?: ReactNode
}

const MarkdownCode = ({ children }: MarkdownCodeProps) => {
  return (
    <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-sm text-foreground">
      {children}
    </code>
  )
}

export default MarkdownCode
