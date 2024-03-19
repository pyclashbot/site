"use client";

import { Separator } from "./ui/separator";
import Link from "next/link";

export default function Footer() {
  const authors: { name: string; url?: string }[] = [
    { name: "Martin Miglio", url: "https://martinmiglio.dev" },
    { name: "Matthew Miglio" },
  ];

  return (
    <div className="py-8 text-sm">
      <Separator className="mb-2" />
      <div>
        © {new Date().getFullYear()}{" "}
        {authors.map((author, index) => (
          <span key={author.name}>
            {index > 0 && index < authors.length - 1 && ", "}
            {index > 0 && index === authors.length - 1 && " and "}
            {author.url ? (
              <Link
                href={author.url}
                className="hover:underline"
                data-umami-event={`Footer - ${author.name}`}
              >
                {author.name}
              </Link>
            ) : (
              author.name
            )}
          </span>
        ))}
      </div>
    </div>
  );
}
