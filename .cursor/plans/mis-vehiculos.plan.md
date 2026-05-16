---
name: mis-vehiculos feature
overview: Agregar la relación `ownerId` entre `Vehicle` y `User` en Prisma, asociar cada vehículo creado al usuario logueado, y construir la página "Mis vehículos" que lista los vehículos propios del usuario autenticado usando TanStack Query.
todos:
  - id: schema
    content: Agregar ownerId nullable y relación User↔Vehicle en prisma/schema.prisma, luego correr migrate
    status: pending
  - id: api-post
    content: Setear ownerId desde session.user.id en POST /api/vehicles
    status: pending
  - id: api-mine
    content: Crear GET /api/vehicles/mine que devuelve vehículos del usuario autenticado
    status: pending
  - id: hook
    content: Agregar useMyVehicles en store/vehicle/vehicle.query.ts
    status: pending
  - id: page
    content: Reescribir page.tsx y crear components/MyVehicles.tsx en mis-vehiculos
    status: pending
isProject: false
---

# Plan: Mis Vehículos

## Resumen de cambios

```
prisma/schema.prisma                              ← agregar ownerId en Vehicle
app/api/vehicles/route.ts                         ← asignar ownerId al crear un vehículo
app/api/vehicles/mine/route.ts                    ← nuevo endpoint GET
store/vehicle/vehicle.query.ts                    ← nuevo hook useMyVehicles
app/(app)/mis-vehiculos/page.tsx                  ← página (Client Component)
app/(app)/mis-vehiculos/components/MyVehicles.tsx ← lista de vehículos propios
```

---

## 1. Schema — `prisma/schema.prisma`

Agregar `ownerId` nullable en `Vehicle` (nullable para no romper registros existentes sin dueño) y la relación inversa en `User`:

```prisma
model User {
  id       Int       @id @default(autoincrement())
  // ...campos actuales...
  vehicles Vehicle[]
}

model Vehicle {
  id          Int     @id @default(autoincrement())
  // ...campos actuales...
  ownerId     Int?    @map("owner_id")
  owner       User?   @relation(fields: [ownerId], references: [id])
}
```

Luego correr la migración:

```bash
npx prisma migrate dev --name add-vehicle-owner
```

---

## 2. API POST — `app/api/vehicles/route.ts`

En el handler `POST`, tomar el `session.user.id` que ya pasa `withAuth` y setearlo como `ownerId`:

```ts
export const POST = withAuth(async (req, session) => {
  // ...validaciones actuales...
  const created = await prisma.vehicle.create({
    data: { plateNumber, brand, color, status, ownerId: Number(session.user.id) },
  });
  // ...
});
```

El `GET` general no cambia (buscar-vehiculo sigue mostrando todos los vehículos).

---

## 3. Nuevo endpoint — `app/api/vehicles/mine/route.ts`

Nuevo archivo que devuelve solo los vehículos del usuario autenticado:

```ts
export const GET = withAuth(async (_req, session) => {
  const vehicles = await prisma.vehicle.findMany({
    where: { ownerId: Number(session.user.id) },
    orderBy: { id: "desc" },
  });
  return NextResponse.json(vehicles.map(serializeVehicle));
});
```

Reutiliza `withAuth` y `serializeVehicle` del mismo patrón que el route existente.

---

## 4. Hook — `store/vehicle/vehicle.query.ts`

Agregar `useMyVehicles` siguiendo el mismo patrón de `useVehicles`:

```ts
export function useMyVehicles() {
  return useQuery<Vehicle[]>({
    queryKey: ["vehicles", "mine"],
    queryFn: async () => {
      const res = await fetch("/api/vehicles/mine");
      if (!res.ok) throw new Error("Error al obtener vehículos");
      return res.json();
    },
  });
}
```

---

## 5. Página — `app/(app)/mis-vehiculos/`

Mismo patrón que `buscar-vehiculo`: `page.tsx` es el contenedor y delega el fetch a un sub-componente Client.

**`page.tsx`** — título y renderiza `<MyVehicles />`:

```tsx
"use client";
import { Typography } from "@/components/Typography";
import MyVehicles from "./components/MyVehicles";

const MisVehiculosPage = () => (
  <div className="flex flex-col gap-4">
    <Typography variant="h5">Mis vehículos</Typography>
    <MyVehicles />
  </div>
);
```

**`components/MyVehicles.tsx`** — usa `useMyVehicles`, maneja estados de carga/error/vacío y renderiza la lista. Cada ítem muestra:

- Patente (`plateNumber`)
- Marca (vía `VEHICLE_BRAND_LABELS`)
- Color (vía `VEHICLE_COLOR_META`)
- Estado (`residente` / `visitante`)

---

## Flujo de datos

```mermaid
flowchart TD
    subgraph crear [Crear vehículo]
        A[POST /api/vehicles] -->|"withAuth + session.user.id"| B["prisma.vehicle.create(ownerId)"]
    end
    subgraph listar [Mis vehículos]
        C[MisVehiculosPage] --> D["MyVehicles (Client Component)"]
        D -->|useMyVehicles| E[GET /api/vehicles/mine]
        E -->|"withAuth + session.user.id"| F["prisma.vehicle.findMany(ownerId)"]
        F --> G[Lista de vehículos]
    end
```
