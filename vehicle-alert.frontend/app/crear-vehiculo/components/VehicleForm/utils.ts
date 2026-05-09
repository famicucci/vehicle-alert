import * as yup from "yup";
import {
  type VehicleResidencyKind,
  VEHICLE_RESIDENCY_KIND_VALUES,
} from "@/store/vehicle/types";

const vehicleStatusLabels: Record<VehicleResidencyKind, string> = {
  residente: "Residente",
  visitante: "Visitante",
};

export const vehicleStatusOptions = VEHICLE_RESIDENCY_KIND_VALUES.map(
  (value) => ({ value, label: vehicleStatusLabels[value] }),
);

export const schema = yup
  .object({
    plateNumber: yup.string().required(),
    brand: yup.string().required(),
    color: yup.string().required(),
    status: yup
      .string()
      .oneOf([...VEHICLE_RESIDENCY_KIND_VALUES])
      .required(),
  })
  .required();

export const defaultValues = {
  plateNumber: "",
  brand: "",
  color: "",
  status: "" as VehicleResidencyKind,
};
