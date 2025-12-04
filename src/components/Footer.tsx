import { Link } from '@tanstack/react-router'

const authors: { name: string; url?: string }[] = [
  { name: 'Martin Miglio', url: 'https://martinmiglio.dev' },
  { name: 'Matthew Miglio' },
]

export default function Footer() {
  return (
    <footer className="mt-16 py-8">
      <div className="flex items-center justify-between text-sm text-muted-foreground">
        <p>
          © {new Date().getFullYear()}{' '}
          {authors.map((author, index) => (
            <span key={author.name}>
              {index > 0 && index < authors.length - 1 && ', '}
              {index > 0 && index === authors.length - 1 && ' and '}
              {author.url ? (
                <a
                  href={author.url}
                  className="text-foreground underline underline-offset-4 hover:text-accent"
                  data-umami-event={`Footer - ${author.name}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {author.name}
                </a>
              ) : (
                <span className="text-foreground">{author.name}</span>
              )}
            </span>
          ))}
        </p>
        <div className="flex items-center gap-4">
          <Link
            to="/license"
            className="text-foreground underline-offset-4 hover:underline"
          >
            License
          </Link>
          <a
            href="https://github.com/pyclashbot/py-clash-bot"
            className="text-foreground underline-offset-4 hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            GitHub
          </a>
        </div>
      </div>
    </footer>
  )
}
