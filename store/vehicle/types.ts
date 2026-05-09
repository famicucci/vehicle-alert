export { type VehicleBrandKind } from "./brands";
export { type VehicleColorKind } from "./colors";

import type { VehicleBrandKind } from "./brands";
import type { VehicleColorKind } from "./colors";

export const VEHICLE_RESIDENCY_KIND_VALUES = [
  "residente",
  "visitante",
] as const;

export type VehicleResidencyKind =
  (typeof VEHICLE_RESIDENCY_KIND_VALUES)[number];

export type CreateVehicleInput = {
  plateNumber: string;
  brand: VehicleBrandKind;
  color: VehicleColorKind;
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
  brand: VehicleBrandKind;
  color: VehicleColorKind;
  status: VehicleResidencyKind;
  selectedAnswer: null;
}
