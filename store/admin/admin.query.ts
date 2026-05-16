"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

export type AdminUser = {
  id: number;
  email: string;
  enabled: boolean;
  role: "USER" | "ADMIN";
  createdAt: string;
};

export type AdminUsersFilters = {
  search: string;
  status: "all" | "enabled" | "disabled";
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

export function useAdminUsers(filters: AdminUsersFilters) {
  return useQuery<AdminUser[]>({
    queryKey: ["admin", "users", filters],
    queryFn: async () => {
      const params = new URLSearchParams();
      if (filters.search) params.set("search", filters.search);
      if (filters.status !== "all") params.set("status", filters.status);
      const res = await fetch(`/api/admin/users?${params}`);
      if (!res.ok) throw new Error("Error al obtener usuarios");
      return res.json();
    },
  });
}
