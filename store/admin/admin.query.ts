"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

export type AdminUser = {
  id: number;
  email: string;
  enabled: boolean;
  role: "USER" | "ADMIN";
  createdAt: string;
};

export function useToggleUserEnabled() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: number) => {
      const res = await fetch(`/api/admin/users/${id}`, { method: "PATCH" });
      if (!res.ok) throw new Error("Error al actualizar el usuario");
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin", "users"] });
    },
  });
}

export function useAdminUsers() {
  return useQuery<AdminUser[]>({
    queryKey: ["admin", "users"],
    queryFn: async () => {
      const res = await fetch("/api/admin/users");
      if (!res.ok) throw new Error("Error al obtener usuarios");
      return res.json();
    },
  });
}
