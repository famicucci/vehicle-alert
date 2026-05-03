import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

function serializeVehicle(v: {
  id: number;
  plateNumber: string;
  brandId: number;
  colorId: number;
  statusId: number;
  brand: { id: number; name: string };
  color: { id: number; name: string; code: string };
  status: { id: number; name: string };
}) {
  return {
    id: v.id,
    plateNumber: v.plateNumber,
    brandId: v.brandId,
    colorId: v.colorId,
    statusId: v.statusId,
    brand: { id: v.brand.id, name: v.brand.name },
    color: { id: v.color.id, name: v.color.name, code: v.color.code },
    status: { id: v.status.id, name: v.status.name },
  };
}

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const search = searchParams.get("search")?.trim() ?? "";

    const words = search.split(/\s+/).filter(Boolean);
    const where =
      words.length > 0
        ? {
            AND: words.map((word) => ({
              OR: [
                { plateNumber: { contains: word } },
                { brand: { name: { contains: word } } },
                { color: { name: { contains: word } } },
              ],
            })),
          }
        : undefined;

    const rows = await prisma.vehicle.findMany({
      where,
      include: { brand: true, color: true, status: true },
      orderBy: { id: "asc" },
    });

    return NextResponse.json(rows.map(serializeVehicle));
  } catch (e) {
    console.error("[GET /api/vehicles]", e);
    return NextResponse.json(
      { error: "Failed to load vehicles" },
      { status: 500 },
    );
  }
}

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as Record<string, unknown>;
    const plateNumber = String(body.plateNumber ?? "").trim();
    const brandId = Number(body.brandId);
    const colorId = Number(body.colorId);
    const statusId = Number(body.statusId);

    if (!plateNumber || !brandId || !colorId || !statusId) {
      return NextResponse.json(
        { error: "plateNumber, brandId, colorId and statusId are required" },
        { status: 400 },
      );
    }

    const created = await prisma.vehicle.create({
      data: { plateNumber, brandId, colorId, statusId },
      include: { brand: true, color: true, status: true },
    });

    return NextResponse.json(serializeVehicle(created), { status: 201 });
  } catch (e) {
    console.error("[POST /api/vehicles]", e);
    return NextResponse.json(
      { error: "Failed to create vehicle" },
      { status: 500 },
    );
  }
}
