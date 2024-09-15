"use client";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";

export default function ErrorPage({
  error,
  reset,
}: Readonly<{
  error: Error & { digest?: string };
  reset: () => void;
}>) {
  return (
    <div className="lg:p-8">
      <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
        <div className="flex flex-col space-y-2 text-center">
          <h1 className="text-2xl font-semibold tracking-tight">
            Something went wrong!
          </h1>
          <div className="text-muted-foreground">{error.name}</div>
        </div>
        <Separator />
        <span className="mx-auto flex w-full gap-2">
          <Button variant="outline" onClick={reset} className="flex-1">
            Try again
          </Button>
          <Button asChild className="flex-1">
            <Link href="/">Go home</Link>
          </Button>
        </span>
      </div>
    </div>
  );
}
