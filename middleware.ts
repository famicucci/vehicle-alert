import { auth } from "@/auth";
import { NextResponse } from "next/server";

export default auth((req) => {
  const { nextUrl, auth: session } = req;
  const isLoggedIn = !!session;

  const isAppRoute = nextUrl.pathname.startsWith("/buscar-vehiculo") ||
    nextUrl.pathname.startsWith("/crear-vehiculo") ||
    nextUrl.pathname.startsWith("/mis-vehiculos");

  if (isAppRoute && !isLoggedIn) {
    return NextResponse.redirect(new URL("/login", nextUrl));
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
