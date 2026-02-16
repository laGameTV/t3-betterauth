import { betterAuth } from "better-auth";
import { nextCookies } from "better-auth/next-js";
import { drizzleAdapter } from "better-auth/adapters/drizzle";

import { env } from "@/env";
import { db } from "@/server/db";

export const auth = betterAuth({
  plugins: [nextCookies()], // make sure this is the last plugin in the array
  database: drizzleAdapter(db, {
    provider: "pg", // or "pg" or "mysql"
  }),
  emailAndPassword: {
    enabled: true,
  },
  socialProviders: {
    github: {
      clientId: env.BETTER_AUTH_GITHUB_CLIENT_ID,
      clientSecret: env.BETTER_AUTH_GITHUB_CLIENT_SECRET,
      // redirectURI: "http://localhost:3000/api/auth/callback/github", // DONT HARDOCODE THIS, USE "BETTER_AUTH_URL" ENV VARIABLE INSTEAD
    },
  },
});

export type Session = typeof auth.$Infer.Session;
