"use client";
import { Button } from "@/components/Button";
import { Input } from "@/components/Input";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { defaultValues, getVehicleStatusOptions, schema } from "./utils";
import { Select } from "@/components/Select";
import { useVehicleStatus } from "@/store/vehicleStatus/vehicleStatus.query";

const VehicleForm = () => {
  const { control, handleSubmit } = useForm({
    defaultValues: defaultValues,
    resolver: yupResolver(schema),
  });
  const { data, isLoading, error } = useVehicleStatus();

  const onSubmit = (data: any) => {
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
      <Input control={control} name="brand" placeholder="Marca" />
      <Input control={control} name="color" placeholder="Color" />
      <Input control={control} name="plateNumber" placeholder="Patente" />
      <Select
        options={getVehicleStatusOptions(data || [])}
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
