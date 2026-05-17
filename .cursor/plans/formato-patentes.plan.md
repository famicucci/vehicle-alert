---
name: formato-patentes
overview: Crear un componente reutilizable PlateNumber que formatea visualmente las patentes con espacios, y usarlo en todos los lugares donde se muestra una patente.
todos:
  - id: format-plate-util
    content: Crear formatPlate.ts con la función de formateo por regex
    status: completed
  - id: plate-number-component
    content: Crear componente PlateNumber.tsx que aplica formatPlate y acepta className
    status: completed
  - id: use-plate-number
    content: Reemplazar los 4 usos de plateNumber en Vehicles.tsx, MyVehicles.tsx y ConfirmDeleteVehicle.tsx
    status: completed
isProject: false
---

# Plan: Formato Visual de Patentes

## Lugares donde se muestra una patente

- [`app/(app)/buscar-vehiculo/components/Vehicles.tsx`](<app/(app)/buscar-vehiculo/components/Vehicles.tsx>) L57 — lista de resultados de búsqueda
- [`app/(app)/mis-vehiculos/components/MyVehicles.tsx`](<app/(app)/mis-vehiculos/components/MyVehicles.tsx>) L58, L63 — lista de vehículos propios + prop al modal
- [`app/(app)/mis-vehiculos/components/ConfirmDeleteVehicle.tsx`](<app/(app)/mis-vehiculos/components/ConfirmDeleteVehicle.tsx>) L19 — modal de confirmación de eliminación

---

## Lógica de formato

| Formato almacenado | Formato visual |
| ------------------ | -------------- |
| `AB123CD`          | `AB 123 CD`    |
| `ABC123`           | `ABC 123`      |
| `A123BCD`          | `A12 3BCD`     |
| `123ABC`           | `123 ABC`      |

---

## 1. `components/PlateNumber/formatPlate.ts` (nuevo)

```ts
const FORMATS = [
  { regex: /^([A-Z]{2})(\d{3})([A-Z]{2})$/, template: "$1 $2 $3" }, // AB 123 CD
  { regex: /^([A-Z]{3})(\d{3})$/, template: "$1 $2" }, // ABC 123
  { regex: /^([A-Z]\d{2})(\d[A-Z]{3})$/, template: "$1 $2" }, // A12 3BCD
  { regex: /^(\d{3})([A-Z]{3})$/, template: "$1 $2" }, // 123 ABC
];

export const formatPlate = (plate: string): string => {
  const match = FORMATS.find(({ regex }) => regex.test(plate));
  return match ? plate.replace(match.regex, match.template) : plate;
};
```

---

## 2. `components/PlateNumber/PlateNumber.tsx` (nuevo)

```tsx
import { formatPlate } from "./formatPlate";

interface Props {
  plate: string;
  className?: string;
}

export const PlateNumber = ({ plate, className }: Props) => (
  <span className={className}>{formatPlate(plate)}</span>
);
```

---

## 3. Usos a reemplazar

**`Vehicles.tsx` L57:**

```tsx
// antes
<div className="font-bold">{vehicle.plateNumber}</div>
// después
<PlateNumber plate={vehicle.plateNumber} className="font-bold" />
```

**`MyVehicles.tsx` L58:**

```tsx
// antes
<div className="font-bold">{vehicle.plateNumber}</div>
// después
<PlateNumber plate={vehicle.plateNumber} className="font-bold" />
```

**`ConfirmDeleteVehicle.tsx` L19:**

```tsx
// antes
<span className="font-bold">{plateNumber}</span>
// después
<PlateNumber plate={plateNumber} className="font-bold" />
```

El prop `plateNumber` que se pasa desde `MyVehicles.tsx` al modal (L63) queda como string crudo — la transformación la hace el componente `PlateNumber` dentro del modal.
