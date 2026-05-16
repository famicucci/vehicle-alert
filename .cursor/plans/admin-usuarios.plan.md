---
name: admin usuarios
overview: Crear la página de administración de usuarios (lista con estado habilitado/rol), protegerla en el middleware para ADMIN only, agregar el endpoint de API correspondiente, y convertir el badge "Admin" del header en un link de acceso.
todos:
  - id: middleware-admin
    content: Proteger /admin/* en middleware.ts para role ADMIN y agregar al matcher
    status: pending
  - id: api-admin-users
    content: Crear GET /api/admin/users con verificación de rol ADMIN
    status: pending
  - id: hook-admin-users
    content: Crear useAdminUsers en store/admin/admin.query.ts
    status: pending
  - id: page-admin-users
    content: Crear page.tsx y UsersList.tsx para la ruta /admin/usuarios
    status: pending
  - id: header-link
    content: Convertir badge Admin en Link a /admin/usuarios en AppHeader.tsx
    status: pending
isProject: false
---

# Plan: Admin — Gestión de Usuarios

## Resumen de cambios

```
middleware.ts                                    ← proteger /admin/* solo para ADMIN
app/(app)/admin/usuarios/page.tsx                ← página de listado de usuarios
app/(app)/admin/usuarios/components/UsersList.tsx ← componente client con TanStack
app/api/admin/users/route.ts                     ← endpoint GET protegido a ADMIN
store/admin/admin.query.ts                       ← hook useAdminUsers
components/AppHeader/AppHeader.tsx               ← badge → Link a /admin/usuarios
```

---

## 1. Middleware — `middleware.ts`

Agregar protección de ruta `/admin` que requiere `role === "ADMIN"`. Usuarios autenticados pero sin el rol son redirigidos a `/`:

```ts
const user = session?.user as
  | { id?: string; pendingApproval?: boolean; role?: string }
  | undefined;

// ...después de las validaciones existentes...
if (req.nextUrl.pathname.startsWith("/admin") && user?.role !== "ADMIN") {
  return NextResponse.redirect(new URL("/buscar-vehiculo", req.nextUrl));
}
```

Y agregar `/admin` al matcher:

```ts
matcher: [
  "/buscar-vehiculo/:path*",
  "/nuevo-vehiculo/:path*",
  "/mis-vehiculos/:path*",
  "/admin/:path*",
];
```

---

## 2. API — `app/api/admin/users/route.ts`

Endpoint que verifica `session.user.role === "ADMIN"` antes de devolver la lista:

```ts
export const GET = withAuth(async (_req, session) => {
  if ((session.user as { role?: string }).role !== "ADMIN") {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const users = await prisma.user.findMany({
    select: {
      id: true,
      email: true,
      enabled: true,
      role: true,
      createdAt: true,
    },
    orderBy: { createdAt: "desc" },
  });

  return NextResponse.json(users);
});
```

---

## 3. Hook — `store/admin/admin.query.ts`

```ts
export function useAdminUsers() {
  return useQuery({
    queryKey: ["admin", "users"],
    queryFn: async () => {
      const res = await fetch("/api/admin/users");
      if (!res.ok) throw new Error("Error al obtener usuarios");
      return res.json();
    },
  });
}
```

---

## 4. Página y componente

**`app/(app)/admin/usuarios/page.tsx`** — título + `<UsersList />`:

```tsx
"use client";
import { Typography } from "@/components/Typography";
import UsersList from "./components/UsersList";

const AdminUsuariosPage = () => (
  <>
    <Typography variant="h2" bold className="text-center mb-4">
      Usuarios
    </Typography>
    <UsersList />
  </>
);
```

**`components/UsersList.tsx`** — usa `useAdminUsers`, lista con:

- Email del usuario
- Badge de rol (`USER` / `ADMIN`)
- Indicador de habilitado (ícono `CheckCircle` verde / `XCircle` gris)

---

## 5. AppHeader — badge → Link

Reemplazar el `<span>` del badge por un `<Link>` de Next.js:

```tsx
import Link from "next/link";

{
  role === "ADMIN" && (
    <Link
      href="/admin/usuarios"
      className="text-xs font-medium text-primary ml-2 shrink-0 hover:underline"
    >
      Admin
    </Link>
  );
}
```
