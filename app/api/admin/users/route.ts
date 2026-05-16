import { NextResponse } from "next/server";
import type { Prisma } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import { withAuth } from "@/lib/api";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

export const GET = withAuth(async (req, session) => {
  if ((session.user as { role?: string }).role !== "ADMIN") {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  try {
    const { searchParams } = new URL(req.url);
    const search = searchParams.get("search") ?? "";
    const status = searchParams.get("status") ?? "all";

    const where: Prisma.UserWhereInput = {};
    if (search) where.email = { contains: search };
    if (status === "enabled") where.enabled = true;
    if (status === "disabled") where.enabled = false;

    const users = await prisma.user.findMany({
      where,
      select: {
        id: true,
        email: true,
        enabled: true,
        role: true,
        createdAt: true,
      } as Prisma.UserSelect,
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json(users);
  } catch (e) {
    console.error("[GET /api/admin/users]", e);
    return NextResponse.json(
      { error: "Failed to load users" },
      { status: 500 },
    );
  }
});
