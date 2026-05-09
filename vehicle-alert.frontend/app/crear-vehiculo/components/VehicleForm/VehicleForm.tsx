"use client";
import { Button } from "@/components/Button";
import { Input } from "@/components/Input";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { defaultValues, schema, vehicleStatusOptions } from "./utils";
import * as yup from "yup";
import { Select } from "@/components/Select";

const VehicleForm = () => {
  const { control, handleSubmit } = useForm({
    defaultValues: defaultValues,
    resolver: yupResolver(schema),
  });

  const onSubmit = (data: yup.InferType<typeof schema>) => {
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
      <Input control={control} name="brand" placeholder="Marca" />
      <Input control={control} name="color" placeholder="Color" />
      <Input control={control} name="plateNumber" placeholder="Patente" />
      <Select
        options={vehicleStatusOptions}
        control={control}
        name="status"
        placeholder="Estado"
      />
      <Button className="self-end" fullwidth>
        Crear
      </Button>
    </form>
  );
};

export default VehicleForm;
