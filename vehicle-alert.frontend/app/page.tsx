import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <div className="flex min-h-screen flex-col items-center justify-center p-24 gap-8">
        <h1 className="text-4xl font-bold text-center">Alerta Vehículos</h1>
        <div className="flex gap-4">
          <Link
            href="/buscar-vehiculo"
            className="px-4 py-2 bg-green-500 text-white text-center rounded hover:bg-green-600 transition"
          >
            Buscar Vehículos
          </Link>
        </div>
      </div>
    </>
  );
}
