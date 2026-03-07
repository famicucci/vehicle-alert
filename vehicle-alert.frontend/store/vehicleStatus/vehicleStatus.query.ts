import { VehicleStatus } from "@/interfaces/vehicleStatus";
import { useQuery } from "@tanstack/react-query";

const API_URL = "http://localhost:4000/vehicle-status";

export function useVehicleStatus() {
  return useQuery<VehicleStatus[]>({
    queryKey: ["vehicle-status"],
    queryFn: async () => {
      const res = await fetch(API_URL);
      if (!res.ok) throw new Error("Error al obtener estados de vehículo");
      return res.json();
    },
  });
}
