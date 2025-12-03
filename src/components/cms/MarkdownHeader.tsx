import type { ReactNode } from 'react'

interface MarkdownHeaderProps {
  children?: ReactNode
}

const MarkdownHeader = ({ children }: MarkdownHeaderProps) => {
  return (
    <h1 className="mb-4 text-4xl font-bold tracking-tight text-foreground">{children}</h1>
  )
}

export default MarkdownHeader
