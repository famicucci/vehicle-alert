import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import {
  type VehicleResidencyKind,
  VEHICLE_RESIDENCY_KIND_VALUES,
} from "@/store/vehicle/types";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

const RESIDENCY_VALUES = new Set<string>(VEHICLE_RESIDENCY_KIND_VALUES);

type VehicleWithBrandColor = {
  id: number;
  plateNumber: string;
  brandId: number;
  colorId: number;
  status: VehicleResidencyKind;
  brand: { id: number; name: string };
  color: { id: number; name: string; code: string };
};

function serializeVehicle(v: VehicleWithBrandColor) {
  return {
    id: v.id,
    plateNumber: v.plateNumber,
    brandId: v.brandId,
    colorId: v.colorId,
    status: v.status,
    brand: { id: v.brand.id, name: v.brand.name },
    color: { id: v.color.id, name: v.color.name, code: v.color.code },
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
      include: { brand: true, color: true },
      orderBy: { id: "asc" },
    });

    return NextResponse.json(
      rows.map((row) =>
        serializeVehicle(row as unknown as VehicleWithBrandColor),
      ),
    );
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
    const statusRaw = String(body.status ?? "").trim();

    if (!plateNumber || !brandId || !colorId || !statusRaw) {
      return NextResponse.json(
        { error: "plateNumber, brandId, colorId and status are required" },
        { status: 400 },
      );
    }

    if (!RESIDENCY_VALUES.has(statusRaw)) {
      return NextResponse.json(
        { error: "status must be residente or visitante" },
        { status: 400 },
      );
    }

    const status = statusRaw as VehicleResidencyKind;

    const created = await prisma.vehicle.create({
      data: { plateNumber, brandId, colorId, status } as unknown as Parameters<
        typeof prisma.vehicle.create
      >[0]["data"],
      include: { brand: true, color: true },
    });

    return NextResponse.json(
      serializeVehicle(created as unknown as VehicleWithBrandColor),
      { status: 201 },
    );
  } catch (e) {
    console.error("[POST /api/vehicles]", e);
    return NextResponse.json(
      { error: "Failed to create vehicle" },
      { status: 500 },
    );
  }
}
