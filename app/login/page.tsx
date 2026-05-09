"use client";
import { InputView } from "@/components/Input";
import { Button } from "@/components/Button";
import { Typography } from "@/components/Typography";

const LoginPage = () => {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-6">
      <div className="w-full max-w-sm flex flex-col gap-8">
        <div className="flex flex-col items-center gap-1">
          <Typography variant="h3">Alerta Vehículos</Typography>
          <Typography variant="body medium" color="secondary">
            Ingresá con tu cuenta
          </Typography>
        </div>

        <form className="flex flex-col gap-6">
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-gray-700">Email</label>
            <InputView
              type="email"
              placeholder="tu@email.com"
              autoComplete="email"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-gray-700">Contraseña</label>
            <InputView
              type="password"
              placeholder="••••••••"
              autoComplete="current-password"
            />
          </div>

          <Button fullwidth>Ingresar</Button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
