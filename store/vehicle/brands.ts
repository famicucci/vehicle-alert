export const VEHICLE_BRAND_KIND_VALUES = [
  "toyota",
  "peugeot",
  "ford",
  "volkswagen",
  "chevrolet",
  "fiat",
  "renault",
  "citroen",
  "honda",
  "nissan",
  "bmw",
  "mercedes_benz",
  "audi",
  "suzuki",
  "mitsubishi",
] as const;

export type VehicleBrandKind = (typeof VEHICLE_BRAND_KIND_VALUES)[number];

export const VEHICLE_BRAND_LABELS: Record<VehicleBrandKind, string> = {
  toyota: "Toyota",
  peugeot: "Peugeot",
  ford: "Ford",
  volkswagen: "Volkswagen",
  chevrolet: "Chevrolet",
  fiat: "Fiat",
  renault: "Renault",
  citroen: "Citroën",
  honda: "Honda",
  nissan: "Nissan",
  bmw: "BMW",
  mercedes_benz: "Mercedes-Benz",
  audi: "Audi",
  suzuki: "Suzuki",
  mitsubishi: "Mitsubishi",
};

export const vehicleBrandSelectOptions = VEHICLE_BRAND_KIND_VALUES.map(
  (kind) => ({
    value: kind,
    label: VEHICLE_BRAND_LABELS[kind],
  }),
);
