import { NextResponse } from "next/server";
import type { Prisma } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import {
  type VehicleBrandKind,
  VEHICLE_BRAND_KIND_VALUES,
  VEHICLE_BRAND_LABELS,
} from "@/store/vehicle/brands";
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

const BRAND_VALUES = new Set<string>(VEHICLE_BRAND_KIND_VALUES);
const COLOR_VALUES = new Set<string>(VEHICLE_COLOR_KIND_VALUES);
const RESIDENCY_VALUES = new Set<string>(VEHICLE_RESIDENCY_KIND_VALUES);

type VehicleRow = {
  id: number;
  plateNumber: string;
  brand: VehicleBrandKind;
  color: VehicleColorKind;
  status: VehicleResidencyKind;
};

function brandsMatchingSearch(word: string): VehicleBrandKind[] {
  const w = word.toLowerCase();
  return VEHICLE_BRAND_KIND_VALUES.filter(
    (kind) =>
      kind.toLowerCase().includes(w) ||
      VEHICLE_BRAND_LABELS[kind].toLowerCase().includes(w),
  );
}

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
    brand: v.brand,
    color: v.color,
    status: v.status,
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
            ...brandsMatchingSearch(word).map((kind) => ({ brand: kind })),
            ...colorKindsMatchingSearch(word).map((kind) => ({ color: kind })),
          ],
        })),
      } as Prisma.VehicleWhereInput;
    }

    const rows = await prisma.vehicle.findMany({
      where,
      orderBy: { id: "asc" },
    });

    return NextResponse.json(
      rows.map((row) => serializeVehicle(row as unknown as VehicleRow)),
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
    const brandRaw = String(body.brand ?? "").trim();
    const colorRaw = String(body.color ?? "").trim();
    const statusRaw = String(body.status ?? "").trim();

    if (!plateNumber || !brandRaw || !colorRaw || !statusRaw) {
      return NextResponse.json(
        { error: "plateNumber, brand, color and status are required" },
        { status: 400 },
      );
    }

    if (!BRAND_VALUES.has(brandRaw)) {
      return NextResponse.json({ error: "Invalid brand" }, { status: 400 });
    }

    if (!COLOR_VALUES.has(colorRaw)) {
      return NextResponse.json({ error: "Invalid color" }, { status: 400 });
    }

    if (!RESIDENCY_VALUES.has(statusRaw)) {
      return NextResponse.json(
        { error: "status must be residente or visitante" },
        { status: 400 },
      );
    }

    const brand = brandRaw as VehicleBrandKind;
    const color = colorRaw as VehicleColorKind;
    const status = statusRaw as VehicleResidencyKind;

    const created = await prisma.vehicle.create({
      data: { plateNumber, brand, color, status } as unknown as Parameters<
        typeof prisma.vehicle.create
      >[0]["data"],
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
