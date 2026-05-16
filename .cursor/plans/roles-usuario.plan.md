---
name: roles de usuario
overview: Agregar un enum de roles (USER/ADMIN) al modelo User en Prisma, propagarlo al JWT y la sesión a través de Auth.js, y mostrar un badge "Admin" en el AppHeader cuando el usuario logueado sea administrador.
todos:
  - id: schema-role
    content: Agregar enum UserRole y campo role al modelo User en prisma/schema.prisma, luego correr db:migrate
    status: completed
  - id: auth-role
    content: Propagar role en authorize, jwt y session callbacks en auth.ts
    status: completed
  - id: auth-config-role
    content: Incluir role en el session callback de auth.config.ts
    status: completed
  - id: header-badge
    content: Mostrar badge Admin en AppHeader.tsx cuando role === ADMIN
    status: completed
isProject: false
---

# Plan: Roles de Usuario

## Resumen de cambios

```
prisma/schema.prisma              ← nuevo enum UserRole + campo role en User
auth.ts                           ← incluir role en authorize, jwt y session callbacks
auth.config.ts                    ← incluir role en session callback (para middleware/edge)
components/AppHeader/AppHeader.tsx ← badge "Admin" condicional
```

Migración a correr después del schema:

```bash
npm run db:migrate
```

---

## 1. Schema — `prisma/schema.prisma`

Agregar el enum y el campo con default `USER`:

```prisma
enum UserRole {
  USER
  ADMIN
}

model User {
  id        Int       @id @default(autoincrement())
  email     String    @unique
  password  String
  enabled   Boolean   @default(false)
  role      UserRole  @default(USER)
  createdAt DateTime  @default(now())
  vehicles  Vehicle[]

  @@map("users")
}
```

Los usuarios existentes quedan automáticamente como `USER` por el default.

---

## 2. `auth.ts` — propagar role por todo el flujo JWT

**`authorize`**: incluir `role` en el objeto retornado:

```ts
return {
  id: String(user.id),
  email: user.email,
  enabled: user.enabled,
  role: user.role,
};
```

**`jwt` callback**: guardar el role en el token al login y leerlo de la DB al refrescar:

```ts
if (user) {
  token.userId = user.id;
  token.pendingApproval = !(user as { enabled?: boolean }).enabled;
  token.role = (user as { role?: string }).role;
}

if (token.userId && !user) {
  const dbUser = await prisma.user.findUnique({
    where: { id: Number(token.userId) },
    select: { enabled: true, role: true },
  });
  // ...lógica de enabled existente...
  token.role = dbUser.role;
}
```

**`session` callback**: exponer role en `session.user`:

```ts
(session.user as { role?: string }).role = token.role as string | undefined;
```

---

## 3. `auth.config.ts` — session callback para edge

Replicar el mismo campo en el session callback liviano:

```ts
session({ session, token }) {
  if (token?.userId) {
    session.user.id = String(token.userId);
    (session.user as { pendingApproval?: boolean }).pendingApproval = !!token.pendingApproval;
    (session.user as { role?: string }).role = token.role as string | undefined;
  }
  return session;
},
```

---

## 4. `AppHeader.tsx` — badge Admin

El AppHeader ya llama a `auth()` y tiene la sesión. Solo agregar el badge condicional:

```tsx
const role = (session?.user as { role?: string })?.role;

// en el JSX, junto al email:
{
  role === "ADMIN" && (
    <span className="text-xs font-medium text-primary ml-2">Admin</span>
  );
}
```
