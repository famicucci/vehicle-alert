---
name: Autenticación de Usuarios
overview: "Implementar autenticación completa con NextAuth.js: modelo User en la BD, registro de usuarios, aprobación por admin, login funcional y protección de rutas."
todos:
  - id: user-model
    content: Agregar modelo User a schema.prisma (con campo enabled) y crear migración
    status: pending
  - id: install-deps
    content: Instalar next-auth@beta, @auth/prisma-adapter, bcryptjs
    status: pending
  - id: nextauth-config
    content: Crear auth.ts y app/api/auth/[...nextauth]/route.ts (verificar enabled en credentials)
    status: pending
  - id: register-api
    content: Crear app/api/auth/register/route.ts (crea usuario con enabled=false)
    status: pending
  - id: register-page
    content: Crear app/register/page.tsx con formulario
    status: pending
  - id: pending-approval-page
    content: Crear app/pending-approval/page.tsx con mensaje de espera
    status: pending
  - id: login-functional
    content: Actualizar app/login/page.tsx para usar signIn de NextAuth
    status: pending
  - id: middleware
    content: Crear middleware.ts para proteger rutas /(app)/* y redirigir usuarios no habilitados
    status: pending
isProject: false
---

# Autenticación de Usuarios

Implementar autenticación con **NextAuth.js v5** usando el provider `Credentials` (email + contraseña), Prisma como adapter, y bcrypt para hashear contraseñas. Los usuarios se registran solos pero quedan deshabilitados hasta que un administrador los apruebe.

## Flujo general

```mermaid
flowchart TD
    register["Registro /register"] -->|"POST /api/auth/register"| createUser["Crear User en BD\nenabled=false"]
    createUser --> pendingPage["Redirigir a /pending-approval"]
    login["Login /login"] -->|"NextAuth signIn"| verifyCredentials["Verificar email+password"]
    verifyCredentials -->|"credenciales inválidas"| loginError["Error en formulario"]
    verifyCredentials -->|"enabled=false"| pendingPage
    verifyCredentials -->|"enabled=true"| session["Sesión activa\ncookie HTTP-only"]
    session --> protectedRoutes["Rutas protegidas /(app)/*"]
    noSession["Sin sesión"] -->|"middleware redirect"| login
```

## Fase 1 — Modelo User y migración

Agregar modelo `User` a [`prisma/schema.prisma`](prisma/schema.prisma):

```prisma
model User {
  id        Int      @id @default(autoincrement())
  email     String   @unique
  password  String
  enabled   Boolean  @default(false)
  createdAt DateTime @default(now())

  @@map("users")
}
```

Crear migración: `npm run db:migrate`

## Fase 2 — Instalar dependencias

```bash
npm install next-auth@beta @auth/prisma-adapter bcryptjs
npm install -D @types/bcryptjs
```

## Fase 3 — Configurar NextAuth

- Crear [`auth.ts`](auth.ts) en la raíz con `NextAuth({ providers: [Credentials] })`.
- La lógica de verificación chequea: credenciales válidas **y** `enabled === true`. Si `enabled === false`, lanza un error específico `"PENDING_APPROVAL"` que el login puede capturar para redirigir.
- Crear [`app/api/auth/[...nextauth]/route.ts`](app/api/auth/[...nextauth]/route.ts) que re-exporta los handlers.
- Agregar `AUTH_SECRET` a `.env`.

## Fase 4 — API de registro

- Crear [`app/api/auth/register/route.ts`](app/api/auth/register/route.ts): `POST` que valida email único, hashea la contraseña con bcrypt y crea el `User` con `enabled: false`.

## Fase 5 — Página de registro

- Crear [`app/register/page.tsx`](app/register/page.tsx): formulario con email, contraseña y confirmar contraseña. Al registrarse con éxito redirige a `/pending-approval`.

## Fase 6 — Página de aprobación pendiente

- Crear [`app/pending-approval/page.tsx`](app/pending-approval/page.tsx): página sin menú que muestra un mensaje del estilo "Tu cuenta está pendiente de aprobación. Un administrador del barrio habilitará tu acceso próximamente."

## Fase 7 — Login funcional

- Actualizar [`app/login/page.tsx`](app/login/page.tsx): reemplazar `console.log` por `signIn("credentials", ...)` de NextAuth. Si el error es `"PENDING_APPROVAL"`, redirigir a `/pending-approval`.

## Fase 8 — Proteger rutas con middleware

- Crear [`middleware.ts`](middleware.ts) en la raíz con dos reglas:
  - Sin sesión → redirigir a `/login`
  - Con sesión pero `enabled=false` → redirigir a `/pending-approval`
- Aplica a todas las rutas bajo `/(app)/*`.

## Archivos a crear/modificar

- **Modificar** [`prisma/schema.prisma`](prisma/schema.prisma) — agregar modelo `User` con `enabled`
- **Crear** migración SQL
- **Crear** [`auth.ts`](auth.ts) — configuración NextAuth
- **Crear** [`app/api/auth/[...nextauth]/route.ts`](app/api/auth/[...nextauth]/route.ts)
- **Crear** [`app/api/auth/register/route.ts`](app/api/auth/register/route.ts)
- **Crear** [`app/register/page.tsx`](app/register/page.tsx)
- **Crear** [`app/pending-approval/page.tsx`](app/pending-approval/page.tsx)
- **Modificar** [`app/login/page.tsx`](app/login/page.tsx)
- **Crear** [`middleware.ts`](middleware.ts)
