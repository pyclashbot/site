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
    return <div>{children}</div>
  }

  if (Array.isArray(children)) {
    const childArr = children.filter((child: ReactNode) => child !== ' ')

    // check if any children are images
    if (childArr.some((child: ReactNode) => isValidElement(child) && child?.type === 'img')) {
      return <div className="flex items-start">{children}</div>
    }

    // check if all children are links
    if (
      childArr.every(
        (child: ReactNode) =>
          isValidElement(child) && (child?.props as { href?: string })?.href
      )
    ) {
      return <div className="flex gap-1 pb-1 pt-1">{children}</div>
    }
  }

  return <div>{children}</div>
}

export default MarkdownBody
