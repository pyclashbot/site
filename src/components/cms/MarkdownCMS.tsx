import MarkdownBody from './MarkdownBody'
import MarkdownCode from './MarkdownCode'
import MarkdownHeader from './MarkdownHeader'
import MarkdownLink from './MarkdownLink'
import { MarkdownOL, MarkdownUL, MarkdownLI } from './MarkdownList'
import MarkdownSubheader from './MarkdownSubheader'
import ReactMarkdown, { type Components } from 'react-markdown'
import rehypeRaw from 'rehype-raw'
import remarkGfm from 'remark-gfm'

interface MarkdownCMSProps {
  markdownText: string
}

const MarkdownCMS = ({ markdownText }: MarkdownCMSProps) => {
  const components: Partial<Components> = {
    a: MarkdownLink,
    h1: MarkdownHeader,
    h2: MarkdownSubheader,
    p: MarkdownBody,
    code: MarkdownCode,
    ul: MarkdownUL,
    li: MarkdownLI,
    ol: MarkdownOL,
  }

  if (!markdownText) {
    return null
  }

  return (
    <div className="flex flex-col align-baseline">
      <ReactMarkdown rehypePlugins={[rehypeRaw, remarkGfm]} components={components}>
        {markdownText}
      </ReactMarkdown>
    </div>
  )
}

export default MarkdownCMS
