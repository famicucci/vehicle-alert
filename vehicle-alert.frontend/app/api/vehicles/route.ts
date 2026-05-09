import { NextResponse } from "next/server";
import type { Prisma } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import {
  type VehicleColorKind,
  VEHICLE_COLOR_KIND_VALUES,
  VEHICLE_COLOR_META,
} from "@/store/vehicle/colors";
import {
  type VehicleResidencyKind,
  VEHICLE_RESIDENCY_KIND_VALUES,
} from "@/store/vehicle/types";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

const RESIDENCY_VALUES = new Set<string>(VEHICLE_RESIDENCY_KIND_VALUES);
const COLOR_VALUES = new Set<string>(VEHICLE_COLOR_KIND_VALUES);

type VehicleRow = {
  id: number;
  plateNumber: string;
  brandId: number;
  color: VehicleColorKind;
  status: VehicleResidencyKind;
  brand: { id: number; name: string };
};

function colorKindsMatchingSearch(word: string): VehicleColorKind[] {
  const w = word.toLowerCase();
  return VEHICLE_COLOR_KIND_VALUES.filter(
    (kind) =>
      kind.toLowerCase().includes(w) ||
      VEHICLE_COLOR_META[kind].name.toLowerCase().includes(w),
  );
}

function serializeVehicle(v: VehicleRow) {
  return {
    id: v.id,
    plateNumber: v.plateNumber,
    brandId: v.brandId,
    color: v.color,
    status: v.status,
    brand: { id: v.brand.id, name: v.brand.name },
  };
}

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const search = searchParams.get("search")?.trim() ?? "";

    const words = search.split(/\s+/).filter(Boolean);
    let where: Prisma.VehicleWhereInput | undefined;
    if (words.length > 0) {
      where = {
        AND: words.map((word) => ({
          OR: [
            { plateNumber: { contains: word } },
            { brand: { name: { contains: word } } },
            ...colorKindsMatchingSearch(word).map((kind) => ({
              color: kind,
            })),
          ],
        })),
      } as Prisma.VehicleWhereInput;
    }

    const rows = await prisma.vehicle.findMany({
      where,
      include: { brand: true },
      orderBy: { id: "asc" },
    });

    return NextResponse.json(
      rows.map((row) =>
        serializeVehicle(row as unknown as VehicleRow),
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
    const colorRaw = String(body.color ?? "").trim();
    const statusRaw = String(body.status ?? "").trim();

    if (!plateNumber || !brandId || !colorRaw || !statusRaw) {
      return NextResponse.json(
        { error: "plateNumber, brandId, color and status are required" },
        { status: 400 },
      );
    }

    if (!COLOR_VALUES.has(colorRaw)) {
      return NextResponse.json(
        { error: "Invalid color" },
        { status: 400 },
      );
    }

    if (!RESIDENCY_VALUES.has(statusRaw)) {
      return NextResponse.json(
        { error: "status must be residente or visitante" },
        { status: 400 },
      );
    }

    const color = colorRaw as VehicleColorKind;
    const status = statusRaw as VehicleResidencyKind;

    const created = await prisma.vehicle.create({
      data: { plateNumber, brandId, color, status } as unknown as Parameters<
        typeof prisma.vehicle.create
      >[0]["data"],
      include: { brand: true },
    });

    return NextResponse.json(
      serializeVehicle(created as unknown as VehicleRow),
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
