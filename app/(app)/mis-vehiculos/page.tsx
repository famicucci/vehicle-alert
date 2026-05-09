import { Typography } from "@/components/Typography";
import { Car } from "lucide-react";

const MisVehiculosPage = () => {
  return (
    <div className="flex flex-col items-center justify-center gap-3 py-20 text-center text-gray-400">
      <Car size={48} strokeWidth={1.5} />
      <Typography variant="h5">Mis vehículos</Typography>
      <Typography variant="body medium">Próximamente</Typography>
    </div>
  );
};

export default MisVehiculosPage;
