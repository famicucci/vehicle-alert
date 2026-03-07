import { create } from "zustand";
import { VehicleStatusState } from "./types";

const useVehicle = create<VehicleStatusState>((set) => ({
  vehicleStatus: [],
  status: "iddle",
}));

export default useVehicle;
