import { auth } from "@/auth/auth";
import { UserAuthForm } from "@/components/AuthForm";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function AuthenticationPage({
  searchParams,
}: Readonly<{
  searchParams: { [key: string]: string | string[] | undefined };
}>) {
  const callbackUrl = searchParams.callbackUrl as string | undefined;
  const session = await auth();

  if (session) {
    redirect(callbackUrl ?? "/");
  }

  return (
    <div className="lg:p-8">
      <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
        <h1 className="text-center text-2xl font-semibold tracking-tight">
          Sign in to <span className="text-primary">pyclashbot.app</span>
        </h1>
        <UserAuthForm />
        <p className="px-8 text-center text-sm text-muted-foreground">
          By clicking continue, you agree to our{" "}
          <Link
            href="/terms"
            className="underline underline-offset-4 hover:text-primary"
          >
            Terms of Service
          </Link>{" "}
          and{" "}
          <Link
            href="/privacy"
            className="underline underline-offset-4 hover:text-primary"
          >
            Privacy Policy
          </Link>
          .
        </p>
      </div>
    </div>
  );
}
