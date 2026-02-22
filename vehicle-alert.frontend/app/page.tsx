import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <div className="flex min-h-screen flex-col items-center justify-center p-24 gap-8">
        <h1 className="text-4xl font-bold">Sistema de Gestión de Pruebas</h1>
        <div className="flex gap-4">
          <Link
            href="/tests"
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
          >
            Ver Tests
          </Link>
          <Link
            href="/test-cases"
            className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition"
          >
            Ver Casos de Prueba
          </Link>
        </div>
      </div>
    </>
  );
}
