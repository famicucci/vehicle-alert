---
name: toggle usuario habilitado
overview: Permitir al administrador habilitar/deshabilitar usuarios desde la lista, convirtiendo el ícono de estado en un botón que abre un modal de confirmación antes de ejecutar el cambio. Un admin no puede deshabilitarse a sí mismo ni ver el botón para su propio usuario.
todos:
  - id: api-toggle-user
    content: Crear PATCH /api/admin/users/[id]/route.ts para invertir el campo enabled
    status: pending
  - id: hook-toggle-user
    content: Agregar useToggleUserEnabled en store/admin/admin.query.ts
    status: pending
  - id: modal-toggle-user
    content: Crear ConfirmToggleUser.tsx con mensaje dinámico habilitar/deshabilitar
    status: pending
  - id: users-list-btn
    content: Convertir íconos en botones en UsersList.tsx e integrar modal
    status: pending
  - id: self-disable-guard
    content: Bloquear auto-deshabilitación en API y ocultar botón en frontend para el usuario propio
    status: pending
isProject: false
---

# Plan: Toggle Usuario Habilitado

## Resumen de cambios

```
app/api/admin/users/[id]/route.ts                          ← nuevo endpoint PATCH
store/admin/admin.query.ts                                 ← hook useToggleUserEnabled
app/(app)/admin/usuarios/components/ConfirmToggleUser.tsx  ← cuerpo del modal de confirmación
app/(app)/admin/usuarios/components/UsersList.tsx          ← ícono → botón + modal
```

---

## 1. API — `app/api/admin/users/[id]/route.ts`

Nuevo endpoint `PATCH` que verifica rol ADMIN, luego invierte el campo `enabled` del usuario:

```ts
export const PATCH = withAuth(async (req, session) => {
  if ((session.user as { role?: string }).role !== "ADMIN") {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const id = Number(req.url.split("/").pop());
  const user = await prisma.user.findUnique({
    where: { id },
    select: { enabled: true },
  });

  if (!user) return NextResponse.json({ error: "Not found" }, { status: 404 });

  const updated = await prisma.user.update({
    where: { id },
    data: { enabled: !user.enabled },
    select: { id: true, enabled: true },
  });

  return NextResponse.json(updated);
});
```

---

## 2. Hook — `store/admin/admin.query.ts`

Agregar `useToggleUserEnabled` siguiendo el patrón de `useDeleteVehicle`:

```ts
export function useToggleUserEnabled() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: number) => {
      const res = await fetch(`/api/admin/users/${id}`, { method: "PATCH" });
      if (!res.ok) throw new Error("Error al actualizar el usuario");
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin", "users"] });
    },
  });
}
```

---

## 3. Modal de confirmación — `ConfirmToggleUser.tsx`

Mismo patrón que `ConfirmDeleteVehicle.tsx`. Recibe el email y el estado actual para adaptar el mensaje:

```tsx
interface Props {
  email: string;
  enabled: boolean; // estado ACTUAL (antes del cambio)
  onConfirm: () => void;
}
```

Mensaje dinámico:

- Si `enabled === true` → "¿Estás seguro que querés **deshabilitar** a `email`?"
- Si `enabled === false` → "¿Estás seguro que querés **habilitar** a `email`?"

Botones full-width con `py-3`:

- Confirmar (`variant="primary"`) → llama a `onConfirm()`
- Cancelar (`variant="secondary"`) → llama a `hide()`

---

## 4.5. Protección contra auto-deshabilitación

**API**: en el PATCH, verificar que el id del target no sea el mismo que `session.user.id`:
```ts
if (id === Number(session.user.id)) {
  return NextResponse.json({ error: "No podés deshabilitarte a vos mismo" }, { status: 403 });
}
```

**Frontend**: `page.tsx` pasa a Server Component para leer `auth()` y obtener el `currentUserId`, que se pasa como prop a `UsersList`. En la lista, si `user.id === currentUserId`, se muestra el ícono estático sin botón.

```ts
// page.tsx (Server Component)
const session = await auth();
const currentUserId = Number(session?.user?.id);
<UsersList currentUserId={currentUserId} />
```

---

## 4. `UsersList.tsx` — ícono → botón + modal

Reemplazar los íconos estáticos por botones que abren el modal:

```tsx
const { mutate: toggleUser } = useToggleUserEnabled();
const { show, hide } = useModal();

// en la fila:
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
</button>;
```
