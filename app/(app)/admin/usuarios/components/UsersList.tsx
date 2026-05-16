"use client";

import { useState, useRef, useEffect } from "react";
import {
  useAdminUsers,
  useToggleUserEnabled,
  type AdminUsersFilters,
} from "@/store/admin/admin.query";
import { CheckCircle, XCircle, AlertCircle, Loader2, ChevronDown } from "lucide-react";
import { Typography } from "@/components/Typography";
import { useModal } from "@/contexts/ModalContext";
import ConfirmToggleUser from "./ConfirmToggleUser";

const STATUS_LABELS: Record<AdminUsersFilters["status"], string> = {
  all: "Todos",
  enabled: "Habilitados",
  disabled: "Deshabilitados",
};

interface Props {
  currentUserId: number;
}

const UsersList = ({ currentUserId }: Props) => {
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [status, setStatus] = useState<AdminUsersFilters["status"]>("all");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const { data, isLoading, error } = useAdminUsers({ search: debouncedSearch, status });
  const { mutate: toggleUser } = useToggleUserEnabled();
  const { show, hide } = useModal();

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedSearch(search), 500);
    return () => clearTimeout(timer);
  }, [search]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="flex flex-col gap-4">
      <div className="flex gap-2">
        <input
          type="text"
          placeholder="Buscar por email..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="flex-1 text-sm border border-gray-200 rounded-lg px-3 py-2 outline-none focus:border-primary transition-colors"
        />
        <div className="relative shrink-0" ref={dropdownRef}>
          <button
            onClick={() => setDropdownOpen((o) => !o)}
            className="flex items-center gap-1 text-sm border border-gray-200 rounded-lg px-3 py-2 text-gray-600 hover:border-gray-300 transition-colors"
          >
            {STATUS_LABELS[status]}
            <ChevronDown size={14} />
          </button>
          {dropdownOpen && (
            <div className="absolute right-0 mt-1 w-44 bg-white border border-gray-100 rounded-lg shadow-md z-10 overflow-hidden">
              {(["all", "enabled", "disabled"] as const).map((option) => (
                <button
                  key={option}
                  onClick={() => {
                    setStatus(option);
                    setDropdownOpen(false);
                  }}
                  className={`w-full text-left px-4 py-2 text-sm transition-colors hover:bg-gray-50 ${
                    status === option ? "font-medium text-primary" : "text-gray-700"
                  }`}
                >
                  {STATUS_LABELS[option]}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {isLoading && (
        <div className="flex flex-col items-center justify-center gap-3 py-20 text-gray-500">
          <Loader2 size={40} strokeWidth={1.5} className="animate-spin" />
          <Typography variant="body medium">Cargando...</Typography>
        </div>
      )}

      {error && (
        <div className="flex flex-col items-center justify-center gap-3 py-20 text-center">
          <AlertCircle size={40} strokeWidth={1.5} className="text-error" />
          <Typography variant="body medium" color="error">
            Ocurrió un error al cargar los usuarios
          </Typography>
        </div>
      )}

      {!isLoading && !error && (!data || data.length === 0) && (
        <div className="flex flex-col items-center justify-center gap-3 py-20 text-center text-gray-500">
          <Typography variant="body medium">No hay usuarios registrados</Typography>
        </div>
      )}

      {!isLoading && !error && data && data.length > 0 && (
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
                {user.id === currentUserId ? (
                  <span className="p-2 shrink-0">
                    {user.enabled ? (
                      <CheckCircle size={20} className="text-green-500" />
                    ) : (
                      <XCircle size={20} className="text-gray-300" />
                    )}
                  </span>
                ) : (
                  <button
                    className="p-2 shrink-0"
                    onClick={() =>
                      show("Modificar usuario", ConfirmToggleUser, {
                        email: user.email,
                        enabled: user.enabled,
                        onConfirm: () => {
                          toggleUser(user.id);
                          hide();
                        },
                      })
                    }
                  >
                    {user.enabled ? (
                      <CheckCircle size={20} className="text-green-500" />
                    ) : (
                      <XCircle size={20} className="text-gray-300" />
                    )}
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default UsersList;
