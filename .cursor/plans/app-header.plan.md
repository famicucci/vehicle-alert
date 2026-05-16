---
name: app header
overview: Agregar un header fijo y minimalista (40px) en el layout de la app autenticada que muestre el email del usuario y un botón de logout, sin sacrificar espacio notable a las páginas.
todos:
  - id: header-component
    content: Crear AppHeader.tsx (Server Component) con email de sesión
    status: pending
  - id: signout-button
    content: Crear SignOutButton.tsx (Client Component) con logout
    status: pending
  - id: layout-update
    content: Actualizar app/(app)/layout.tsx para incluir AppHeader y ajustar pt
    status: pending
isProject: false
---

# Plan: App Header

## Resumen de cambios

```
components/AppHeader/AppHeader.tsx      ← Server Component, lee sesión
components/AppHeader/SignOutButton.tsx  ← Client Component, botón de logout
app/(app)/layout.tsx                    ← agrega AppHeader y ajusta pt
```

---

## 1. `components/AppHeader/AppHeader.tsx`

Server Component. Llama a `auth()` para obtener el email y renderiza el header fijo:

```tsx
import { auth } from "@/auth";
import SignOutButton from "./SignOutButton";

const AppHeader = async () => {
  const session = await auth();
  const email = session?.user?.email ?? "";

  return (
    <header className="fixed top-0 left-0 right-0 z-50 h-10 flex items-center justify-between px-4 bg-white border-b border-gray-100">
      <span className="text-xs text-gray-400 truncate max-w-[70%]">
        {email}
      </span>
      <SignOutButton />
    </header>
  );
};
```

- `h-10` = 40px, barra muy delgada
- Email en `text-xs text-gray-400` para que pase al fondo visualmente
- `max-w-[70%]` + `truncate` para emails largos

---

## 2. `components/AppHeader/SignOutButton.tsx`

Client Component con ícono `LogOut` de lucide-react. Llama a `signOut` de `next-auth/react`:

```tsx
"use client";
import { signOut } from "next-auth/react";
import { LogOut } from "lucide-react";

const SignOutButton = () => (
  <button
    onClick={() => signOut({ callbackUrl: "/login" })}
    className="p-1 text-gray-400 hover:text-gray-600 transition-colors"
  >
    <LogOut size={16} />
  </button>
);
```

- Ícono pequeño (`size={16}`) para no llamar la atención
- `p-1` para área de toque mínima aceptable

---

## 3. `app/(app)/layout.tsx`

Agregar `AppHeader` y compensar la altura del header con `pt-12` (48px = 40px header + 8px de respiro):

```tsx
import Menu from "@/components/Menu/Menu";
import AppHeader from "@/components/AppHeader/AppHeader";

export default function AppLayout({ children }) {
  return (
    <>
      <AppHeader />
      <main className="p-4 pt-12 pb-24">{children}</main>
      <Menu />
    </>
  );
}
```
