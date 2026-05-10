import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

const PROTECTED = ["/buscar-vehiculo", "/crear-vehiculo", "/mis-vehiculos"];

export async function middleware(req: NextRequest) {
  const token = await getToken({ req, secret: process.env.AUTH_SECRET });

  const isProtected = PROTECTED.some((path) =>
    req.nextUrl.pathname.startsWith(path),
  );

  if (isProtected && !token) {
    return NextResponse.redirect(new URL("/login", req.nextUrl));
  }

  if (isProtected && token?.pendingApproval) {
    return NextResponse.redirect(new URL("/pending-approval", req.nextUrl));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/buscar-vehiculo/:path*",
    "/crear-vehiculo/:path*",
    "/mis-vehiculos/:path*",
  ],
};
