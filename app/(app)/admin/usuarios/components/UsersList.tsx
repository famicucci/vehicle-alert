"use client";

import { useAdminUsers } from "@/store/admin/admin.query";
import { CheckCircle, XCircle, AlertCircle, Loader2 } from "lucide-react";
import { Typography } from "@/components/Typography";

const UsersList = () => {
  const { data, isLoading, error } = useAdminUsers();

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center gap-3 py-20 text-gray-500">
        <Loader2 size={40} strokeWidth={1.5} className="animate-spin" />
        <Typography variant="body medium">Cargando...</Typography>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center gap-3 py-20 text-center">
        <AlertCircle size={40} strokeWidth={1.5} className="text-error" />
        <Typography variant="body medium" color="error">
          Ocurrió un error al cargar los usuarios
        </Typography>
      </div>
    );
  }

  if (!data || data.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center gap-3 py-20 text-center text-gray-500">
        <Typography variant="body medium">No hay usuarios registrados</Typography>
      </div>
    );
  }

  return (
    <div className="flex flex-col">
      {data.map((user, index) => (
        <div key={user.id}>
          {index !== 0 && <hr className="mx-4 border-gray-100" />}
          <div className="flex items-center gap-3 py-3">
            <div className="flex-grow min-w-0">
              <p className="text-sm truncate">{user.email}</p>
            </div>
            <span
              className={`text-xs font-medium shrink-0 ${
                user.role === "ADMIN" ? "text-primary" : "text-gray-400"
              }`}
            >
              {user.role === "ADMIN" ? "Admin" : "Usuario"}
            </span>
            {user.enabled ? (
              <CheckCircle size={20} className="text-green-500 shrink-0" />
            ) : (
              <XCircle size={20} className="text-gray-300 shrink-0" />
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default UsersList;
