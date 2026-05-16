import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { withAuth } from "@/lib/api";

export const runtime = "nodejs";

export const DELETE = withAuth(async (req, session) => {
  try {
    const id = Number(req.url.split("/").pop());

    if (isNaN(id)) {
      return NextResponse.json({ error: "Invalid id" }, { status: 400 });
    }

    const vehicle = await prisma.vehicle.findUnique({ where: { id } });

    if (!vehicle) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }

    if (vehicle.ownerId !== Number(session.user.id)) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    await prisma.vehicle.delete({ where: { id } });

    return NextResponse.json({ ok: true });
  } catch (e) {
    console.error("[DELETE /api/vehicles/:id]", e);
    return NextResponse.json(
      { error: "Failed to delete vehicle" },
      { status: 500 },
    );
  }
});
