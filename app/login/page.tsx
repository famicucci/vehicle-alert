"use client";
import { Input } from "@/components/Input";
import { Button } from "@/components/Button";
import { Typography } from "@/components/Typography";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useRouter } from "next/navigation";

const schema = yup.object({
  email: yup.string().email("Email inválido").required("El email es requerido"),
  password: yup.string().min(6, "Mínimo 6 caracteres").required("La contraseña es requerida"),
});

const defaultValues = {
  email: "",
  password: "",
};

const LoginPage = () => {
  const router = useRouter();
  const { control, handleSubmit } = useForm({
    defaultValues,
    resolver: yupResolver(schema),
  });

  const onSubmit = (data: yup.InferType<typeof schema>) => {
    console.log("login", data);
    router.push("/buscar-vehiculo");
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-6">
      <div className="w-full max-w-sm flex flex-col gap-8">
        <div className="flex flex-col items-center gap-1">
          <Typography variant="h3">Alerta Vehículos</Typography>
          <Typography variant="body medium" color="secondary">
            Ingresá con tu cuenta
          </Typography>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-gray-700">Email</label>
            <Input
              control={control}
              name="email"
              type="email"
              placeholder="tu@email.com"
              autoComplete="email"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-gray-700">Contraseña</label>
            <Input
              control={control}
              name="password"
              type="password"
              placeholder="••••••••"
              autoComplete="current-password"
            />
          </div>

          <Button fullwidth type="submit">Ingresar</Button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
