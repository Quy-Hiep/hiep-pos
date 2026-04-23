import type { NextAuthConfig } from "next-auth";

export const authConfig = {
  pages: {
    signIn: "/admin/login",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        (token as { role?: string }).role = (user as { role?: string }).role;
      }
      return token;
    },
    async session({ session, token }) {
      if (token && session.user) {
        (session.user as { role?: string }).role = (token as { role?: string }).role;
      }
      return session;
    },
  },
  providers: [],
  session: { strategy: "jwt" as const },
  trustHost: true,
} satisfies NextAuthConfig;
