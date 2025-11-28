import type { ReactNode } from 'react'

interface MarkdownListProps {
  children?: ReactNode
}

const MarkdownUL = ({ children }: MarkdownListProps) => {
  return <ul className="list-inside list-disc space-y-1">{children}</ul>
}

const MarkdownOL = ({ children }: MarkdownListProps) => {
  return <ol className="list-inside list-decimal space-y-1">{children}</ol>
}

const MarkdownLI = ({ children }: MarkdownListProps) => {
  return <li>{children}</li>
}

export { MarkdownUL, MarkdownLI, MarkdownOL }
