import AuthSessionProvider from "./AuthSessionProvider";
import { auth } from "@/auth/auth";
import type { ReactNode } from "react";

export default async function Provider({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <AuthSessionProvider session={await auth()}>{children}</AuthSessionProvider>
  );
}
