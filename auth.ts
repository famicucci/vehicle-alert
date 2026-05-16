import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { authConfig } from "@/auth.config";

export const { handlers, signIn, signOut, auth } = NextAuth({
  ...authConfig,
  providers: [
    Credentials({
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Contraseña", type: "password" },
      },
      async authorize(credentials) {
        const email = credentials?.email as string | undefined;
        const password = credentials?.password as string | undefined;

        if (!email || !password) return null;

        const user = await prisma.user.findUnique({ where: { email } });
        if (!user) return null;

        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) return null;

        return { id: String(user.id), email: user.email, enabled: user.enabled, role: user.role };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.userId = user.id;
        token.pendingApproval = !(user as { enabled?: boolean }).enabled;
        token.role = (user as { role?: string }).role;
      }

      if (token.userId && !user) {
        const dbUser = await prisma.user.findUnique({
          where: { id: Number(token.userId) },
          select: { enabled: true, role: true },
        });

        if (!dbUser) return null;

        if (!dbUser.enabled) {
          if (token.pendingApproval) {
            return token;
          } else {
            return null;
          }
        }

        token.pendingApproval = false;
        token.role = dbUser.role;
      }

      return token;
    },
    async session({ session, token }) {
      if (token?.userId) {
        session.user.id = String(token.userId);
        (session.user as { pendingApproval?: boolean }).pendingApproval =
          !!token.pendingApproval;
        (session.user as { role?: string }).role = token.role as string | undefined;
      }
      return session;
    },
  },
});
