import type { ReactNode } from 'react'

interface MarkdownCodeProps {
  children?: ReactNode
}

const MarkdownCode = ({ children }: MarkdownCodeProps) => {
  return <code>{children}</code>
}

export default MarkdownCode
