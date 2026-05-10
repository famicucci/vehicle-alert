import type { NextAuthConfig } from "next-auth";

export const authConfig = {
  session: { strategy: "jwt" },
  providers: [],
  pages: {
    signIn: "/login",
  },
  callbacks: {
    jwt({ token }) {
      return token;
    },
    session({ session, token }) {
      if (token?.userId) {
        session.user.id = String(token.userId);
        (session.user as { pendingApproval?: boolean }).pendingApproval =
          !!token.pendingApproval;
      }
      return session;
    },
  },
} satisfies NextAuthConfig;
