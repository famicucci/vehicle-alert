import { NextResponse } from "next/server";
import type { ResultSetHeader, RowDataPacket } from "mysql2";
import { getPool } from "@/lib/db/pool";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

type VehicleRow = RowDataPacket & {
  id: number;
  plateNumber: string;
  brandId: number;
  colorId: number;
  statusId: number;
  brand_id: number;
  brand_name: string;
  color_id: number;
  color_name: string;
  color_code: string;
  status_id: number;
  status_name: string;
};

function mapVehicle(row: VehicleRow) {
  return {
    id: row.id,
    plateNumber: row.plateNumber,
    brandId: row.brandId,
    colorId: row.colorId,
    statusId: row.statusId,
    brand: { id: row.brand_id, name: row.brand_name },
    color: {
      id: row.color_id,
      name: row.color_name,
      code: row.color_code,
    },
    status: { id: row.status_id, name: row.status_name },
  };
}

const baseSelect = `
  SELECT
    v.id,
    v.plateNumber,
    v.brandId,
    v.colorId,
    v.statusId,
    b.id AS brand_id,
    b.name AS brand_name,
    c.id AS color_id,
    c.name AS color_name,
    c.code AS color_code,
    vs.id AS status_id,
    vs.name AS status_name
  FROM vehicles v
  LEFT JOIN brands b ON b.id = v.brandId
  LEFT JOIN colors c ON c.id = v.colorId
  LEFT JOIN vehicle_status vs ON vs.id = v.statusId
`;

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const search = searchParams.get("search")?.trim() ?? "";

    const pool = getPool();
    let sql = baseSelect;
    const params: string[] = [];

    if (search) {
      const words = search.split(/\s+/).filter(Boolean);
      const clauses = words.map(
        () => `(v.plateNumber LIKE ? OR b.name LIKE ? OR c.name LIKE ?)`,
      );
      sql += ` WHERE ${clauses.join(" AND ")}`;
      for (const w of words) {
        const p = `%${w}%`;
        params.push(p, p, p);
      }
    }

    const [rows] = await pool.execute<VehicleRow[]>(sql, params);
    return NextResponse.json(rows.map(mapVehicle));
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

    const pool = getPool();
    const [result] = await pool.execute(
      `INSERT INTO vehicles (plateNumber, brandId, colorId, statusId) VALUES (?, ?, ?, ?)`,
      [plateNumber, brandId, colorId, statusId],
    );

    const insertId = (result as ResultSetHeader).insertId;
    const [rows] = await pool.execute<VehicleRow[]>(
      `${baseSelect} WHERE v.id = ?`,
      [insertId],
    );
    const row = rows[0];
    if (!row) {
      return NextResponse.json({ error: "Created but failed to load row" }, { status: 500 });
    }
    return NextResponse.json(mapVehicle(row), { status: 201 });
  } catch (e) {
    console.error("[POST /api/vehicles]", e);
    return NextResponse.json(
      { error: "Failed to create vehicle" },
      { status: 500 },
    );
  }
}
