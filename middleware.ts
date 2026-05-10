import NextAuth from "next-auth";
import { authConfig } from "@/auth.config";
import { NextResponse } from "next/server";

const { auth } = NextAuth(authConfig);

const PROTECTED = ["/buscar-vehiculo", "/crear-vehiculo", "/mis-vehiculos"];

export default auth((req) => {
  const session = req.auth;
  const user = session?.user as
    | { id?: string; pendingApproval?: boolean }
    | undefined;

  const isProtected = PROTECTED.some((path) =>
    req.nextUrl.pathname.startsWith(path),
  );

  if (isProtected && !user?.id) {
    return NextResponse.redirect(new URL("/login", req.nextUrl));
  }

  if (isProtected && user?.pendingApproval) {
    return NextResponse.redirect(new URL("/pending-approval", req.nextUrl));
  }

  return NextResponse.next();
});

export const config = {
  matcher: [
    "/buscar-vehiculo/:path*",
    "/crear-vehiculo/:path*",
    "/mis-vehiculos/:path*",
  ],
};
