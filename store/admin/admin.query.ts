"use client";

import { useQuery } from "@tanstack/react-query";

export type AdminUser = {
  id: number;
  email: string;
  enabled: boolean;
  role: "USER" | "ADMIN";
  createdAt: string;
};

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
