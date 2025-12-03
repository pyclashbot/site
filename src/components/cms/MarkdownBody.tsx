import { isValidElement, type ReactNode } from 'react'

interface MarkdownBodyProps {
  children?: ReactNode
}

const MarkdownBody = ({ children }: MarkdownBodyProps) => {
  if (!children) return null

  if (
    typeof children === 'string' ||
    typeof children === 'number' ||
    typeof children === 'boolean' ||
    isValidElement(children)
  ) {
    return <p className="mb-4 leading-relaxed text-muted-foreground">{children}</p>
  }

  if (Array.isArray(children)) {
    const childArr = children.filter((child: ReactNode) => child !== ' ')

    // check if any children are images
    if (childArr.some((child: ReactNode) => isValidElement(child) && child?.type === 'img')) {
      return <div className="mb-4 flex items-start">{children}</div>
    }

    // check if all children are links
    if (
      childArr.every(
        (child: ReactNode) =>
          isValidElement(child) && (child?.props as { href?: string })?.href
      )
    ) {
      return <div className="mb-4 flex gap-2">{children}</div>
    }
  }

  return <p className="mb-4 leading-relaxed text-muted-foreground">{children}</p>
}

export default MarkdownBody
