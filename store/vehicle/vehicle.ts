import { create } from "zustand";
import { VehicleState } from "./types";

const useVehicle = create<VehicleState>((set) => ({
  vehicles: [],
  status: "iddle",
  search: "",
  setSearch: (search) => set({ search }),
}));

export default useVehicle;
