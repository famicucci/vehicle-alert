---
name: Página de Login
overview: Crear la página de login en /login con UI consistente con el resto de la app, sin lógica de autenticación real por ahora.
todos:
  - id: route-group
    content: Crear app/(app)/layout.tsx con Menu y padding, y actualizar app/layout.tsx para quitar Menu
    status: completed
  - id: move-routes
    content: Mover page.tsx, buscar-vehiculo/ y crear-vehiculo/ dentro de app/(app)/
    status: completed
  - id: login-page
    content: Crear app/login/page.tsx con formulario de email y contraseña
    status: completed
isProject: false
---

# Página de Login

Crear `app/login/page.tsx` con un formulario de email y contraseña usando los componentes existentes (`Input`, `Button`, `Typography`).

## Consideración de layout

El layout raíz ([`app/layout.tsx`](app/layout.tsx)) muestra el `<Menu>` en todas las rutas. La página de login no debería tener el menú inferior ni el `pb-24`. Para eso, la solución es usar un **route group** en Next.js:

```
app/
  (app)/           ← rutas con menu
    layout.tsx     ← mueve <Menu> y pb-24 acá
    buscar-vehiculo/
    crear-vehiculo/
    page.tsx
  login/           ← sin menu
    page.tsx
  layout.tsx       ← solo providers globales (QueryProvider, ModalProvider)
```

## Estructura del formulario

`app/login/page.tsx` — página centrada verticalmente con:

- Título "Alerta Vehículos" (`Typography h3`)
- Campo email (`Input`)
- Campo contraseña (`Input type="password"`)
- Botón "Ingresar" (`Button` fullwidth primary)
- Sin lógica de submit por ahora

## Archivos a crear/modificar

- **Crear** `app/(app)/layout.tsx` — mueve `<Menu>` y `pb-24` desde el layout raíz
- **Modificar** `app/layout.tsx` — queda solo con providers y estilos globales
- **Mover** `app/page.tsx` → `app/(app)/page.tsx`
- **Mover** `app/buscar-vehiculo/` → `app/(app)/buscar-vehiculo/`
- **Mover** `app/crear-vehiculo/` → `app/(app)/crear-vehiculo/`
- **Crear** `app/login/page.tsx`
