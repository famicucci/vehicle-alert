"use client";
import { useModal } from "@/contexts/ModalContext";
import { InputView } from "@/components/Input";
import useVehicle from "@/store/vehicle/vehicle";
import Vehicles from "./components/Vehicles";

const Page = () => {
  const { setSearch } = useVehicle();

  return (
    <div className="flex flex-col gap-4">
      <InputView
        placeholder="Buscar..."
        onChange={(e) => {
          setTimeout(() => {
            setSearch(e.target.value);
          }, 1000);
        }}
      />
      <Vehicles />
    </div>
  );
};

export default Page;
