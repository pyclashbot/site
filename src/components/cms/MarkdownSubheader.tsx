import type { ReactNode } from 'react'

interface MarkdownSubheaderProps {
  children?: ReactNode
}

const MarkdownSubheader = ({ children }: MarkdownSubheaderProps) => {
  return (
    <h2 className="mb-3 mt-8 border-l-2 border-primary pl-4 text-2xl font-semibold text-foreground">
      {children}
    </h2>
  )
}

export default MarkdownSubheader
