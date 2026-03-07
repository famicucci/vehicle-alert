"use client";
import { Typography } from "@/components/Typography";
import VehicleForm from "./components/VehicleForm/VehicleForm";

const Page = () => {
  return (
    <>
      <Typography variant="h2" bold className="text-center mb-4">
        Crear Vehículo
      </Typography>
      <VehicleForm />
    </>
  );
};

export default Page;
