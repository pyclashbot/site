import logo from '@/assets/pixel-pycb.png'
import { Link } from '@tanstack/react-router'

const linkClass =
  'text-sm text-muted-foreground transition-colors hover:text-foreground'

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-sm">
      <nav className="mx-auto flex h-16 max-w-3xl items-center justify-between px-6 md:px-8">
        <Link to="/" className="flex items-center gap-2">
          <img src={logo} alt="" width={32} height={32} />
          <span className="font-semibold text-foreground">py-clash-bot</span>
        </Link>
        <div className="flex items-center gap-6">
          <Link to="/" className={linkClass} activeProps={{ className: 'text-foreground' }}>
            Home
          </Link>
          <Link
            to="/releases"
            search={{ tab: 'stable', page: 1 }}
            className={linkClass}
            activeOptions={{ includeSearch: false }}
            activeProps={{ className: 'text-foreground' }}
          >
            Downloads
          </Link>
          <Link
            to="/contributing"
            className={linkClass}
            activeProps={{ className: 'text-foreground' }}
          >
            Contributing
          </Link>
          <a
            href="https://github.com/pyclashbot/py-clash-bot"
            target="_blank"
            rel="noopener noreferrer"
            className={linkClass}
          >
            GitHub
          </a>
        </div>
      </nav>
    </header>
  )
}
