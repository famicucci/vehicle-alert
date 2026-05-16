import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { withAuth } from "@/lib/api";

export const runtime = "nodejs";

export const PATCH = withAuth(async (req, session) => {
  if ((session.user as { role?: string }).role !== "ADMIN") {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  try {
    const id = Number(req.url.split("/").pop());

    if (isNaN(id)) {
      return NextResponse.json({ error: "Invalid id" }, { status: 400 });
    }

    if (id === Number(session.user.id)) {
      return NextResponse.json(
        { error: "No podés deshabilitarte a vos mismo" },
        { status: 403 },
      );
    }

    const user = await prisma.user.findUnique({
      where: { id },
      select: { enabled: true },
    });

    if (!user) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }

    const updated = await prisma.user.update({
      where: { id },
      data: { enabled: !user.enabled },
      select: { id: true, enabled: true },
    });

    return NextResponse.json(updated);
  } catch (e) {
    console.error("[PATCH /api/admin/users/:id]", e);
    return NextResponse.json(
      { error: "Failed to update user" },
      { status: 500 },
    );
  }
});
