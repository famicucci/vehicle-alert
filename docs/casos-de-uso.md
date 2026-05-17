# Casos de uso — Vehicle Alert

Documento de referencia para probar la aplicación de forma completa antes del lanzamiento.

---

## Roles

| Rol | Descripción |
|---|---|
| **Sin cuenta** | Puede registrarse. No accede a ninguna página protegida. |
| **USER** (pendiente) | Registrado pero no habilitado por un admin. Solo ve la pantalla de espera. |
| **USER** (habilitado) | Puede buscar vehículos, registrar los suyos y eliminarlos. |
| **ADMIN** | Todos los permisos de USER + gestión de usuarios. |

---

## UC-01 — Registro de cuenta

**Actor:** visitante sin cuenta  
**Ruta:** `/register` (o la que corresponda)

| # | Paso | Resultado esperado |
|---|---|---|
| 1 | Ingresar email y contraseña válidos y enviar | Cuenta creada con estado `enabled: false` y rol `USER` |
| 2 | Intentar acceder a `/buscar-vehiculo` sin ser habilitado | Redirige a `/pending-approval` |
| 3 | Registrarse con un email ya existente | Error de validación |
| 4 | Enviar el formulario con campos vacíos | Errores de validación en los campos |

---

## UC-02 — Login

**Actor:** cualquier usuario registrado  
**Ruta:** `/login`

| # | Paso | Resultado esperado |
|---|---|---|
| 1 | Ingresar credenciales correctas de un usuario habilitado | Redirige a `/buscar-vehiculo` |
| 2 | Ingresar credenciales correctas de un usuario NO habilitado | Redirige a `/pending-approval` |
| 3 | Ingresar email o contraseña incorrectos | Mensaje "Email o contraseña incorrectos" |
| 4 | Intentar acceder a `/buscar-vehiculo` sin sesión | Redirige a `/login` |
| 5 | Presionar el ícono de logout en el header | Cierra sesión y redirige a `/login` |

---

## UC-03 — Pantalla de cuenta pendiente

**Actor:** USER no habilitado  
**Ruta:** `/pending-approval`

| # | Paso | Resultado esperado |
|---|---|---|
| 1 | Acceder con sesión activa pero cuenta pendiente | Muestra mensaje de espera con ícono de reloj |
| 2 | Intentar acceder a `/buscar-vehiculo` | Redirige a `/pending-approval` |
| 3 | Una vez que el admin habilita la cuenta, intentar navegar | Accede normalmente |

---

## UC-04 — Buscar vehículos

**Actor:** USER habilitado  
**Ruta:** `/buscar-vehiculo`

| # | Paso | Resultado esperado |
|---|---|---|
| 1 | Ingresar una patente completa (ej: `AB 123 CD`) | Muestra el vehículo con patente formateada |
| 2 | Ingresar una patente parcial (ej: `AB1`) | Muestra todos los vehículos que contienen esa cadena |
| 3 | Buscar por marca (ej: `Toyota`) | Muestra todos los Toyota registrados |
| 4 | Buscar por color (ej: `rojo`) | Muestra todos los vehículos rojos |
| 5 | Buscar algo que no existe | Mensaje "No se encontraron vehículos" |
| 6 | Dejar el campo vacío | Muestra el estado inicial con instrucción de búsqueda |
| 7 | Buscar con combinaciones (ej: `Toyota rojo`) | Filtra por ambos términos simultáneamente |

---

## UC-05 — Registrar un vehículo

**Actor:** USER habilitado  
**Ruta:** `/nuevo-vehiculo`

| # | Paso | Resultado esperado |
|---|---|---|
| 1 | Completar todos los campos y enviar con patente válida (auto nuevo: `AB123CD`) | Vehículo creado y formulario reseteado |
| 2 | Enviar con patente de auto viejo (`ABC123`) | Vehículo creado correctamente |
| 3 | Enviar con patente de moto nueva (`A123BCD`) | Vehículo creado correctamente |
| 4 | Enviar con patente de moto vieja (`123ABC`) | Vehículo creado correctamente |
| 5 | Ingresar patente con minúsculas o espacios (ej: `ab 123 cd`) | Se normaliza a `AB123CD` y se crea correctamente |
| 6 | Ingresar un formato de patente inválido (ej: `1234`) | Error "Formato inválido. Ejemplos: AB123CD…" |
| 7 | Intentar registrar una patente ya existente en el sistema | Error de patente duplicada |
| 8 | Enviar el formulario con campos vacíos | Errores de validación en cada campo |
| 9 | El vehículo creado aparece en "Mis vehículos" | La lista se actualiza automáticamente |

---

## UC-06 — Ver mis vehículos

**Actor:** USER habilitado  
**Ruta:** `/mis-vehiculos`

| # | Paso | Resultado esperado |
|---|---|---|
| 1 | Acceder sin vehículos registrados | Mensaje "Todavía no tenés vehículos registrados" |
| 2 | Acceder con vehículos registrados | Lista con marca, color, estado (residente/visitante) y patente formateada |
| 3 | Verificar que solo aparecen los vehículos propios | No aparecen vehículos de otros usuarios |

---

## UC-07 — Eliminar un vehículo

**Actor:** USER habilitado (dueño del vehículo)  
**Ruta:** `/mis-vehiculos`

| # | Paso | Resultado esperado |
|---|---|---|
| 1 | Presionar el ícono de papelera en un vehículo | Abre modal de confirmación con la patente formateada |
| 2 | Confirmar la eliminación en el modal | Vehículo eliminado, lista actualizada |
| 3 | Cancelar en el modal | Modal se cierra, vehículo no eliminado |

---

## UC-08 — Panel de administración: ver usuarios

**Actor:** ADMIN  
**Ruta:** `/admin/usuarios` (accesible desde el badge "Admin" en el header)

| # | Paso | Resultado esperado |
|---|---|---|
| 1 | Acceder al panel | Lista de todos los usuarios ordenados por fecha de registro |
| 2 | Un usuario USER intenta acceder a `/admin/usuarios` directamente | Redirige a `/buscar-vehiculo` |
| 3 | Verificar que el propio admin aparece sin botón de toggle | El ícono de estado propio es estático (no clickeable) |

---

## UC-09 — Panel de administración: buscar y filtrar usuarios

**Actor:** ADMIN  
**Ruta:** `/admin/usuarios`

| # | Paso | Resultado esperado |
|---|---|---|
| 1 | Escribir parte de un email en el buscador | Lista filtrada en tiempo real (debounce 500ms) |
| 2 | Seleccionar "Habilitados" en el dropdown | Solo aparecen usuarios con `enabled: true` |
| 3 | Seleccionar "Deshabilitados" en el dropdown | Solo aparecen usuarios con `enabled: false` |
| 4 | Seleccionar "Todos" | Se muestran todos los usuarios |
| 5 | Combinar búsqueda + filtro de estado | Aplica ambos filtros simultáneamente |

---

## UC-10 — Habilitar / deshabilitar usuario

**Actor:** ADMIN  
**Ruta:** `/admin/usuarios`

| # | Paso | Resultado esperado |
|---|---|---|
| 1 | Presionar el ícono de estado de un usuario habilitado | Modal "¿Querés deshabilitar a usuario@mail.com?" |
| 2 | Confirmar en el modal | Usuario deshabilitado, lista actualizada, ícono cambia a gris |
| 3 | Presionar el ícono de estado de un usuario deshabilitado | Modal "¿Querés habilitar a usuario@mail.com?" |
| 4 | Confirmar en el modal | Usuario habilitado, ícono cambia a verde |
| 5 | Cancelar en cualquier modal | Sin cambios |
| 6 | El usuario deshabilitado intenta loguearse | Redirige a `/pending-approval` |
| 7 | Intentar deshabilitar al propio admin vía API (`PATCH /api/admin/users/:id`) | Respuesta 403 "No podés deshabilitarte a vos mismo" |

---

## Flujo completo de onboarding

Para probar el ciclo completo de un vecino nuevo:

1. Registrarse con email y contraseña
2. Verificar que redirige a `/pending-approval`
3. Desde otra sesión (admin), ir a `/admin/usuarios` y habilitar al usuario
4. El usuario puede ahora ingresar a la app
5. Registrar su vehículo en `/nuevo-vehiculo`
6. Verificar que aparece en `/mis-vehiculos`
7. Verificar que aparece en `/buscar-vehiculo` buscando por su patente

---

## Consideraciones para el lanzamiento

- Crear al menos un usuario ADMIN directamente en la base de datos antes de lanzar (campo `role = 'ADMIN'` y `enabled = true`)
- Todos los usuarios nuevos que se registren llegan con `enabled = false` — el admin debe habilitarlos manualmente
- La búsqueda de vehículos está disponible para todos los usuarios habilitados, no solo para el dueño del vehículo
