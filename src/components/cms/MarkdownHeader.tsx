import logo from '@/assets/pixel-pycb.png'
import { Link } from '@tanstack/react-router'
import type { ReactNode } from 'react'

interface MarkdownHeaderProps {
  children?: ReactNode
}

const MarkdownHeader = ({ children }: MarkdownHeaderProps) => {
  return (
    <div className="py-2">
      <Link className="flex flex-row items-center space-x-2" to="/">
        <img src={logo} alt="logo" width={50} height={50} />
        <h1 className="text-4xl font-black tracking-wide text-primary">{children}</h1>
      </Link>
    </div>
  )
}

export default MarkdownHeader
