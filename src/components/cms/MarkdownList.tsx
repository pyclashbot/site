import type { ReactNode } from 'react'

interface MarkdownListProps {
  children?: ReactNode
}

const MarkdownUL = ({ children }: MarkdownListProps) => {
  return <ul className="mb-4 ml-6 list-disc space-y-2 text-muted-foreground">{children}</ul>
}

const MarkdownOL = ({ children }: MarkdownListProps) => {
  return <ol className="mb-4 ml-6 list-decimal space-y-2 text-muted-foreground">{children}</ol>
}

const MarkdownLI = ({ children }: MarkdownListProps) => {
  return <li className="leading-relaxed">{children}</li>
}

export { MarkdownUL, MarkdownLI, MarkdownOL }
