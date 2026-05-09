export const VEHICLE_COLOR_KIND_VALUES = [
  "rojo",
  "verde",
  "azul",
  "amarillo",
  "negro",
  "blanco",
  "gris",
  "gris_oscuro",
  "marron",
  "naranja",
] as const;

export type VehicleColorKind = (typeof VEHICLE_COLOR_KIND_VALUES)[number];

export const VEHICLE_COLOR_META: Record<
  VehicleColorKind,
  { name: string; code: string }
> = {
  rojo: { name: "Rojo", code: "#FF0000" },
  verde: { name: "Verde", code: "#00FF00" },
  azul: { name: "Azul", code: "#0000FF" },
  amarillo: { name: "Amarillo", code: "#FFFF00" },
  negro: { name: "Negro", code: "#000000" },
  blanco: { name: "Blanco", code: "#FFFFFF" },
  gris: { name: "Gris", code: "#A9A9A9" },
  gris_oscuro: { name: "Gris Oscuro", code: "#808080" },
  marron: { name: "Marrón", code: "#A52A2A" },
  naranja: { name: "Naranja", code: "#FFA500" },
};

export const vehicleColorSelectOptions = VEHICLE_COLOR_KIND_VALUES.map(
  (kind) => ({
    value: kind,
    label: VEHICLE_COLOR_META[kind].name,
  }),
);
