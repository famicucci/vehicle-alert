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
        (session.user as { role?: string }).role = token.role as string | undefined;
      }
      return session;
    },
  },
} satisfies NextAuthConfig;
