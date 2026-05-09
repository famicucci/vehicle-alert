import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { CreateVehicleInput, Vehicle } from "./types";

const API_URL = "/api/vehicles";

export function useVehicles(search: string) {
  return useQuery<Vehicle[]>({
    queryKey: ["vehicles", search],
    queryFn: async () => {
      const res = await fetch(
        `${API_URL}?search=${encodeURIComponent(search)}`,
      );
      if (!res.ok) throw new Error("Error al obtener vehicles");
      const data: Vehicle[] = await res.json();
      return data.map((q: any) => ({ ...q, selectedAnswer: null }));
    },
    enabled: !!search.trim(),
  });
}

export function useCreateVehicle() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (payload: CreateVehicleInput) => {
      const res = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error("Failed to create vehicle");
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["vehicles"] });
    },
  });
}

export function useDeleteTestCase() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: number) => {
      const res = await fetch(`${API_URL}/${id}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("Failed to delete test case");
      return id;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["test-cases"] });
    },
  });
}
