import { type User, type NextAuthConfig } from "next-auth";
import Google from "next-auth/providers/google";
import { z } from "zod";

const schema = z.object({
  NEXTAUTH_SECRET: z.string(),
  GOOGLE_CLIENT_ID: z.string(),
  GOOGLE_CLIENT_SECRET: z.string(),
});

const env = schema.parse(process.env);

export default {
  debug: process.env.NODE_ENV === "development",
  secret: env.NEXTAUTH_SECRET,
  providers: [
    Google({
      clientId: env.GOOGLE_CLIENT_ID,
      clientSecret: env.GOOGLE_CLIENT_SECRET,
      allowDangerousEmailAccountLinking: true,
    }),
  ],
  pages: {
    signIn: "/login",
    error: "/auth/error",
  },
} satisfies NextAuthConfig;
