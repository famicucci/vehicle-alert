"use client";
import { Button } from "@/components/Button";
import { Input } from "@/components/Input";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  defaultValues,
  schema,
  vehicleBrandSelectOptions,
  vehicleColorSelectOptions,
  vehicleStatusOptions,
} from "./utils";
import * as yup from "yup";
import { Select } from "@/components/Select";
import { useCreateVehicle } from "@/store/vehicle/vehicle.query";
import type { CreateVehicleInput } from "@/store/vehicle/types";

const VehicleForm = () => {
  const { control, handleSubmit, reset } = useForm({
    defaultValues: defaultValues,
    resolver: yupResolver(schema),
  });

  const { mutate: createVehicle, isPending } = useCreateVehicle();

  const onSubmit = (data: yup.InferType<typeof schema>) => {
    createVehicle(data as CreateVehicleInput, {
      onSuccess: () => reset(),
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
      <Select
        options={vehicleBrandSelectOptions}
        control={control}
        name="brand"
        placeholder="Marca"
      />
      <Select
        options={vehicleColorSelectOptions}
        control={control}
        name="color"
        placeholder="Color"
      />
      <Input control={control} name="plateNumber" placeholder="Patente" />
      <Select
        options={vehicleStatusOptions}
        control={control}
        name="status"
        placeholder="Estado"
      />
      <Button className="self-end" fullwidth disabled={isPending}>
        {isPending ? "Creando..." : "Crear"}
      </Button>
    </form>
  );
};

export default VehicleForm;
