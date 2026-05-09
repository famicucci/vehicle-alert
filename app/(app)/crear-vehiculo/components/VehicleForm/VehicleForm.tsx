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
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">
      <div className="flex flex-col gap-1">
        <label className="text-sm font-medium text-gray-700">Marca</label>
        <Select
          options={vehicleBrandSelectOptions}
          control={control}
          name="brand"
          placeholder="Seleccioná una marca"
        />
      </div>
      <div className="flex flex-col gap-1">
        <label className="text-sm font-medium text-gray-700">Color</label>
        <Select
          options={vehicleColorSelectOptions}
          control={control}
          name="color"
          placeholder="Seleccioná un color"
        />
      </div>
      <div className="flex flex-col gap-1">
        <label className="text-sm font-medium text-gray-700">Patente</label>
        <Input control={control} name="plateNumber" placeholder="Ej: ABC123" />
      </div>
      <div className="flex flex-col gap-1">
        <label className="text-sm font-medium text-gray-700">Estado</label>
        <Select
          options={vehicleStatusOptions}
          control={control}
          name="status"
          placeholder="Seleccioná un estado"
        />
      </div>
      <Button className="self-end" fullwidth disabled={isPending}>
        {isPending ? "Creando..." : "Crear"}
      </Button>
    </form>
  );
};

export default VehicleForm;
