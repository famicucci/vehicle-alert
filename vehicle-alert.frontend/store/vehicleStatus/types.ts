import { VehicleStatus } from "@/interfaces/vehicleStatus";

export type Status = "iddle" | "loading" | "succeeded" | "failed";

export interface VehicleStatusState {
  vehicleStatus: VehicleStatus[];
  status: Status;
}
