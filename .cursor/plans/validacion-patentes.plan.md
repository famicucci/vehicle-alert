---
name: validacion-patentes
overview: Agregar validación de formato de patente argentina en el formulario de nuevo vehículo. Se aceptan los 4 formatos válidos: auto nuevo (AB123CD), auto viejo (ABC123), moto nueva (A123BCD) y moto vieja (123ABC). El input normaliza automáticamente a mayúsculas y sin espacios.
todos:
  - id: plate-validation-schema
    content: Agregar regex de patentes y actualizar schema yup en utils.ts con transform y test
    status: pending
isProject: false
---

# Plan: Validación de Patentes Argentinas

## Archivos a modificar

- [`app/(app)/nuevo-vehiculo/components/VehicleForm/utils.ts`](app/(app)/nuevo-vehiculo/components/VehicleForm/utils.ts) — agregar regex y actualizar el schema yup

---

## Formatos válidos

| Tipo | Patrón | Regex | Ejemplo |
|---|---|---|---|
| Auto nuevo (Mercosur) | LL NNN LL | `/^[A-Z]{2}\d{3}[A-Z]{2}$/` | `AB123CD` |
| Auto viejo | LLL NNN | `/^[A-Z]{3}\d{3}$/` | `ABC123` |
| Moto nueva (Mercosur) | LNN NLLL | `/^[A-Z]\d{3}[A-Z]{3}$/` | `A123BCD` |
| Moto vieja | NNN LLL | `/^\d{3}[A-Z]{3}$/` | `123ABC` |

La validación opera sobre la cadena **en mayúsculas y sin espacios** para aceptar input con o sin espacios (ej: `"ab 123 cd"` → `"AB123CD"`).

---

## Cambios en `utils.ts`

### 1. Agregar regex y helper de normalización

```ts
const PLATE_REGEXES = [
  /^[A-Z]{2}\d{3}[A-Z]{2}$/, // Auto nuevo:  AB123CD
  /^[A-Z]{3}\d{3}$/,          // Auto viejo:  ABC123
  /^[A-Z]\d{3}[A-Z]{3}$/,    // Moto nueva:  A123BCD
  /^\d{3}[A-Z]{3}$/,          // Moto vieja:  123ABC
];

const normalizePlate = (value: string) =>
  value.toUpperCase().replace(/\s/g, "");
```

### 2. Actualizar el campo `plateNumber` en el schema yup

```ts
plateNumber: yup
  .string()
  .required("La patente es requerida")
  .transform(normalizePlate)
  .test(
    "valid-plate",
    "Formato inválido. Ejemplos válidos: AB123CD, ABC123, A123BCD, 123ABC",
    (value) => !!value && PLATE_REGEXES.some((re) => re.test(value)),
  ),
```

El `.transform(normalizePlate)` normaliza el valor antes de validar **y** antes de enviarlo al servidor, por lo que `plateNumber` siempre llega limpio (ej: `"AB123CD"`).

---

## Sin cambios de UI necesarios

El `Input` ya muestra el error de yup debajo del campo. No se necesita ningún componente nuevo.
