import { Separator } from './ui/separator'

const authors: { name: string; url?: string }[] = [
  { name: 'Martin Miglio', url: 'https://martinmiglio.dev' },
  { name: 'Matthew Miglio' },
]

export default function Footer() {
  return (
    <div className="py-8 text-sm">
      <Separator className="mb-2" />
      <div>
        © {new Date().getFullYear()}{' '}
        {authors.map((author, index) => (
          <span key={author.name}>
            {index > 0 && index < authors.length - 1 && ', '}
            {index > 0 && index === authors.length - 1 && ' and '}
            {author.url ? (
              <a
                href={author.url}
                className="hover:underline"
                data-umami-event={`Footer - ${author.name}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                {author.name}
              </a>
            ) : (
              author.name
            )}
          </span>
        ))}
      </div>
    </div>
  )
}
