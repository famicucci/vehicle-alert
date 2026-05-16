"use client";

import { Typography } from "@/components/Typography";
import MyVehicles from "./components/MyVehicles";

const MisVehiculosPage = () => {
  return (
    <>
      <Typography variant="h2" bold className="text-center mb-4">
        Mis Vehículos
      </Typography>
      <MyVehicles />
    </>
  );
};

export default MisVehiculosPage;
