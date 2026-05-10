import { NextResponse } from "next/server";
import { auth } from "@/auth";
import type { Session } from "next-auth";

type AuthenticatedHandler = (
  req: Request,
  session: Session,
) => Promise<NextResponse>;

export const withAuth = (handler: AuthenticatedHandler) =>
  async (req: Request): Promise<NextResponse> => {
    const session = await auth();
    if (!session?.user) {
      return NextResponse.json({ error: "No autorizado" }, { status: 401 });
    }
    return handler(req, session);
  };
