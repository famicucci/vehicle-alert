---
name: Mis Vehículos
overview: Asociar vehículos a usuarios (relación User-Vehicle en la BD), exponer un endpoint de mis vehículos y mostrarlos en la página /mis-vehiculos.
todos:
  - id: schema-relation
    content: "PRE: eliminar vehículos manualmente. Luego agregar userId requerido a Vehicle en schema.prisma y crear migración"
    status: pending
  - id: my-vehicles-endpoint
    content: Crear app/api/my-vehicles/route.ts (GET por userId de sesión)
    status: pending
  - id: post-with-user
    content: Actualizar POST /api/vehicles para asignar userId de la sesión (requiere auth completo)
    status: pending
  - id: mis-vehiculos-page
    content: Implementar app/(app)/mis-vehiculos/page.tsx con lista de vehículos del usuario
    status: pending
isProject: false
---

# Mis Vehículos

Agregar pertenencia de vehículos a usuarios: relación en el schema, endpoint propio, y página con lista.

> **Dependencia**: las fases 3 y 4 requieren que el plan de auth (`auth.plan.md`) esté completado, ya que necesitan leer la sesión activa del usuario logueado.

## Cambios en el schema

Agregar `userId` requerido a [`prisma/schema.prisma`](prisma/schema.prisma):

```prisma
model Vehicle {
  id          Int                  @id @default(autoincrement())
  plateNumber String               @unique
  brand       VehicleBrandKind     @default(toyota)
  color       VehicleColorKind     @default(rojo)
  status      VehicleResidencyKind @default(residente)
  userId      Int
  user        User                 @relation(fields: [userId], references: [id])

  @@map("vehicles")
}

model User {
  // campos existentes...
  vehicles  Vehicle[]
}
```

Antes de ejecutar esta tarea, eliminar manualmente todos los registros de la tabla `vehicles` (por ejemplo desde DBeaver). Eso permite que Prisma genere la columna `userId INT NOT NULL` directamente sin pasos intermedios.

## Endpoint de mis vehículos

Nuevo archivo [`app/api/my-vehicles/route.ts`](app/api/my-vehicles/route.ts):

- `GET` — lee el `userId` de la sesión NextAuth y devuelve solo los vehículos de ese usuario.
- Requiere sesión activa; devuelve `401` si no hay sesión.

## Actualizar creación de vehículo

Modificar [`app/api/vehicles/route.ts`](app/api/vehicles/route.ts) — el `POST` lee la sesión y asigna `userId` al crear el vehículo.

## Página mis vehículos

Reemplazar el "Próximamente" en [`app/(app)/mis-vehiculos/page.tsx`](<app/(app)/mis-vehiculos/page.tsx>) con:

- Hook TanStack Query que consume `GET /api/my-vehicles`.
- Lista de vehículos con patente, marca y color (igual al componente `Vehicles.tsx` existente).
- Estados: cargando, error, sin vehículos, lista.

## Archivos a crear/modificar

- **Modificar** [`prisma/schema.prisma`](prisma/schema.prisma) — agregar relación `Vehicle → User`
- **Crear** migración SQL
- **Crear** [`app/api/my-vehicles/route.ts`](app/api/my-vehicles/route.ts)
- **Modificar** [`app/api/vehicles/route.ts`](app/api/vehicles/route.ts) — asignar `userId` en POST _(requiere auth)_
- **Modificar** [`app/(app)/mis-vehiculos/page.tsx`](<app/(app)/mis-vehiculos/page.tsx>)
