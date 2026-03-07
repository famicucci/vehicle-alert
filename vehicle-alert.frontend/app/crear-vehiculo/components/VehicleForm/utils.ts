import * as yup from "yup";

export const schema = yup
  .object({
    plateNumber: yup.string().required(),
    brand: yup.string().required(),
    color: yup.string().required(),
    status: yup.string().required(),
  })
  .required();

export const defaultValues = {
  plateNumber: "",
  brand: "",
  color: "",
  status: "",
};
