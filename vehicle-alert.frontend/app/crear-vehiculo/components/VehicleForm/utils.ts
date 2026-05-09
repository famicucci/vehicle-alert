import * as yup from "yup";

export enum VehicleStatus {
  Residente = "residente",
  Visitante = "visitante",
}

export const vehicleStatusLabels: Record<VehicleStatus, string> = {
  [VehicleStatus.Residente]: "Residente",
  [VehicleStatus.Visitante]: "Visitante",
};

export const vehicleStatusOptions = Object.values(VehicleStatus).map((value) => ({
  value,
  label: vehicleStatusLabels[value],
}));

export const schema = yup
  .object({
    plateNumber: yup.string().required(),
    brand: yup.string().required(),
    color: yup.string().required(),
    status: yup.string().oneOf(Object.values(VehicleStatus)).required(),
  })
  .required();

export const defaultValues = {
  plateNumber: "",
  brand: "",
  color: "",
  status: "" as VehicleStatus,
};
