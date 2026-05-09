"use client";
import { usePathname, useRouter } from "next/navigation";
import { Search, PlusCircle, Home } from "lucide-react";

const NAV_ITEMS = [
  { href: "/", icon: Home, label: "Inicio" },
  { href: "/crear-vehiculo", icon: PlusCircle, label: "Crear" },
] as const;

const Menu = () => {
  const router = useRouter();
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 flex items-end justify-around bg-white border-t border-gray-200 shadow-lg">
      {NAV_ITEMS.slice(0, 1).map(({ href, icon: Icon, label }) => (
        <button
          key={href}
          onClick={() => router.push(href)}
          className={`flex flex-col items-center gap-1 px-6 py-3 text-xs transition-colors ${
            pathname === href
              ? "text-primary"
              : "text-gray-500 hover:text-gray-800"
          }`}
        >
          <Icon size={28} />
          <span>{label}</span>
        </button>
      ))}

      {/* Botón central resaltado — buscar vehículo */}
      <button
        onClick={() => router.push("/buscar-vehiculo")}
        className="relative -top-4 flex flex-col items-center gap-1 text-xs"
      >
        <span
          className={`flex items-center justify-center w-14 h-14 rounded-full shadow-md transition-colors ${
            pathname === "/buscar-vehiculo"
              ? "bg-primary-hover"
              : "bg-primary hover:bg-primary-hover"
          }`}
        >
          <Search size={26} className="text-white" />
        </span>
        <span
          className={`mt-1 ${
            pathname === "/buscar-vehiculo" ? "text-primary" : "text-gray-500"
          }`}
        >
          Buscar
        </span>
      </button>

      {NAV_ITEMS.slice(1).map(({ href, icon: Icon, label }) => (
        <button
          key={href}
          onClick={() => router.push(href)}
          className={`flex flex-col items-center gap-1 px-6 py-3 text-xs transition-colors ${
            pathname === href
              ? "text-primary"
              : "text-gray-500 hover:text-gray-800"
          }`}
        >
          <Icon size={28} />
          <span>{label}</span>
        </button>
      ))}
    </nav>
  );
};

export default Menu;
