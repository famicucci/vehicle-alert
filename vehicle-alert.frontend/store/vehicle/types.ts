/** Alineado con el enum `VehicleResidencyKind` en Prisma y el formulario. */
export const VEHICLE_RESIDENCY_KIND_VALUES = ["residente", "visitante"] as const;

export type VehicleResidencyKind =
  (typeof VEHICLE_RESIDENCY_KIND_VALUES)[number];

export type CreateVehicleInput = {
  plateNumber: string;
  brandId: number;
  colorId: number;
  status: VehicleResidencyKind;
};

export interface VehicleState {
  vehicles: Vehicle[];
  search: string;
  status: Status;
  setSearch: (search: string) => void;
}

export type Status = "iddle" | "loading" | "succeeded" | "failed";

export interface Vehicle {
  id: number;
  plateNumber: string;
  brand: Brand;
  color: Color;
  status: VehicleResidencyKind;
  selectedAnswer: null;
}

export interface Brand {
  id: number;
  name: string;
}

export interface Color {
  id: number;
  name: string;
  code: string;
}
