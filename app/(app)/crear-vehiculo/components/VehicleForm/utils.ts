import * as yup from "yup";
import {
  type VehicleBrandKind,
  VEHICLE_BRAND_KIND_VALUES,
} from "@/store/vehicle/brands";
import {
  type VehicleColorKind,
  VEHICLE_COLOR_KIND_VALUES,
} from "@/store/vehicle/colors";
import {
  type VehicleResidencyKind,
  VEHICLE_RESIDENCY_KIND_VALUES,
} from "@/store/vehicle/types";

export { vehicleBrandSelectOptions } from "@/store/vehicle/brands";
export { vehicleColorSelectOptions } from "@/store/vehicle/colors";

const vehicleStatusLabels: Record<VehicleResidencyKind, string> = {
  residente: "Residente",
  visitante: "Visitante",
};

export const vehicleStatusOptions = VEHICLE_RESIDENCY_KIND_VALUES.map(
  (value) => ({ value, label: vehicleStatusLabels[value] }),
);

export const schema = yup
  .object({
    plateNumber: yup.string().required("La patente es requerida"),
    brand: yup
      .string()
      .oneOf([...VEHICLE_BRAND_KIND_VALUES], "Seleccioná una marca válida")
      .required("La marca es requerida"),
    color: yup
      .string()
      .oneOf([...VEHICLE_COLOR_KIND_VALUES], "Seleccioná un color válido")
      .required("El color es requerido"),
    status: yup
      .string()
      .oneOf([...VEHICLE_RESIDENCY_KIND_VALUES], "Seleccioná un estado válido")
      .required("El estado es requerido"),
  })
  .required();

export const defaultValues = {
  plateNumber: "",
  brand: "" as VehicleBrandKind,
  color: "" as VehicleColorKind,
  status: "" as VehicleResidencyKind,
};
