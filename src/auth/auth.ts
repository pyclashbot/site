import authConfig from "./auth.config";
// import { PrismaAdapter } from "@auth/prisma-adapter";
// import prisma from "@repo/database/src/client";
import NextAuth from "next-auth";

export const {
  handlers: { GET, POST },
  auth,
} = NextAuth({
  // adapter: PrismaAdapter(prisma),
  session: {
    strategy: "jwt",
    maxAge: 24 * 60 * 60, // 24 hours
  },
  ...authConfig,
});
