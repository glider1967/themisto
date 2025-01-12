import GitHub from "next-auth/providers/github";
import type { NextAuthConfig } from "next-auth";

// Notice this is only an object, not a full Auth.js instance
export default {
  providers: [GitHub],
  debug: process.env.NODE_ENV !== "production",
} satisfies NextAuthConfig;
