"use client";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="lg:p-8">
      <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
        <div className="flex flex-col space-y-2 text-center">
          <h1 className="text-2xl font-semibold tracking-tight">
            Went looking, found nothing.
          </h1>
          <div className="text-muted-foreground">404 - Page Not Found</div>
        </div>
        <Separator />
        <Button asChild className="w-full">
          <Link href="/">Go home</Link>
        </Button>
      </div>
    </div>
  );
}
