import logo from '@/assets/pixel-pycb.png'
import { Link } from '@tanstack/react-router'

const navLinks = [
  { label: 'Home', href: '/' },
  { label: 'Contributing', href: '/contributing' },
  { label: 'GitHub', href: 'https://github.com/pyclashbot/py-clash-bot', external: true },
]

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-sm">
      <nav className="mx-auto flex h-16 max-w-3xl items-center justify-between px-6 md:px-8">
        <Link to="/" className="flex items-center gap-2">
          <img src={logo} alt="py-clash-bot" width={32} height={32} />
          <span className="font-semibold text-foreground">py-clash-bot</span>
        </Link>
        <div className="flex items-center gap-6">
          {navLinks.map((link) =>
            link.external ? (
              <a
                key={link.href}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-muted-foreground transition-colors hover:text-foreground"
              >
                {link.label}
              </a>
            ) : (
              <Link
                key={link.href}
                to={link.href}
                className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                activeProps={{ className: 'text-foreground' }}
              >
                {link.label}
              </Link>
            )
          )}
        </div>
      </nav>
    </header>
  )
}
