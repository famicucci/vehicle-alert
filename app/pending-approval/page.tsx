import { Typography } from "@/components/Typography";
import { Clock } from "lucide-react";

const PendingApprovalPage = () => {
  return (
    <div className="flex h-dvh flex-col items-center justify-center px-6 text-center">
      <div className="w-full max-w-sm flex flex-col items-center gap-4">
        <Clock size={48} strokeWidth={1.5} className="text-gray-400" />
        <Typography variant="h5">Cuenta pendiente de aprobación</Typography>
        <Typography variant="body medium" color="secondary">
          Tu solicitud fue recibida. Un administrador del barrio verificará tus
          datos y habilitará tu acceso próximamente.
        </Typography>
      </div>
    </div>
  );
};

export default PendingApprovalPage;
