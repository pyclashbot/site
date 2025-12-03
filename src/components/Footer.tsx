const authors: { name: string; url?: string }[] = [
  { name: 'Martin Miglio', url: 'https://martinmiglio.dev' },
  { name: 'Matthew Miglio' },
]

export default function Footer() {
  return (
    <footer className="mt-16 py-8">
      <div className="text-center text-sm text-muted-foreground">
        <p>
          © {new Date().getFullYear()}{' '}
          {authors.map((author, index) => (
            <span key={author.name}>
              {index > 0 && index < authors.length - 1 && ', '}
              {index > 0 && index === authors.length - 1 && ' and '}
              {author.url ? (
                <a
                  href={author.url}
                  className="text-foreground underline-offset-4 hover:underline"
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
      </div>
    </footer>
  )
}
