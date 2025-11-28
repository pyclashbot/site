import type { ReactNode } from 'react'

interface MarkdownSubheaderProps {
  children?: ReactNode
}

const MarkdownSubheader = ({ children }: MarkdownSubheaderProps) => {
  return <h2 className="pb-2 pt-4 text-3xl font-bold">{children}</h2>
}

export default MarkdownSubheader
