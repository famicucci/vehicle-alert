import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { withAuth, type AuthenticatedSession } from "@/lib/api";
import { type VehicleBrandKind } from "@/store/vehicle/brands";
import { type VehicleColorKind } from "@/store/vehicle/colors";
import { type VehicleResidencyKind } from "@/store/vehicle/types";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

type VehicleRow = {
  id: number;
  plateNumber: string;
  brand: VehicleBrandKind;
  color: VehicleColorKind;
  status: VehicleResidencyKind;
};

function serializeVehicle(v: VehicleRow) {
  return {
    id: v.id,
    plateNumber: v.plateNumber,
    brand: v.brand,
    color: v.color,
    status: v.status,
  };
}

export const GET = withAuth(async (_req, session: AuthenticatedSession) => {
  try {
    const vehicles = await prisma.vehicle.findMany({
      where: { ownerId: Number(session.user.id) },
      orderBy: { id: "desc" },
    });

    return NextResponse.json(
      vehicles.map((v) => serializeVehicle(v as unknown as VehicleRow)),
    );
  } catch (e) {
    console.error("[GET /api/vehicles/mine]", e);
    return NextResponse.json(
      { error: "Failed to load vehicles" },
      { status: 500 },
    );
  }
});
