"use client";

import { Separator } from "./ui/separator";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { getProviders, signIn } from "next-auth/react";
import * as React from "react";
import { useEffect } from "react";

interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> {
  callbackUrl?: string;
}

export function UserAuthForm({
  className,
  callbackUrl,
  ...props
}: Readonly<UserAuthFormProps>) {
  const [providers, setProviders] = React.useState<Awaited<
    ReturnType<typeof getProviders>
  > | null>(null);

  useEffect(() => {
    getProviders().then((providers) => {
      setProviders(providers);
    });
  }, []);

  return (
    <div className={cn("grid gap-6", className)} {...props}>
      {providers && (
        <>
          <Separator />
          {Object.keys(providers).map((providerName) => {
            const provider = providers[providerName];
            if (provider.id === "email") {
              return null;
            }
            return (
              <Button
                key={provider.id}
                onClick={() => signIn(provider.id, { callbackUrl })}
                data-umami-event={`Auth Form - Sign In with ${provider.name}`}
              >
                {provider.name}
              </Button>
            );
          })}
        </>
      )}
    </div>
  );
}
