"use client";
import { Input } from "@/components/Input";
import { Button } from "@/components/Button";
import { Typography } from "@/components/Typography";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { useState } from "react";
import Link from "next/link";
import { Eye, EyeOff } from "lucide-react";

const schema = yup.object({
  email: yup.string().email("Email inválido").required("El email es requerido"),
  password: yup.string().min(6, "Mínimo 6 caracteres").required("La contraseña es requerida"),
});

const defaultValues = { email: "", password: "" };

const LoginPage = () => {
  const router = useRouter();
  const [serverError, setServerError] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);

  const { control, handleSubmit, formState: { isSubmitting } } = useForm({
    defaultValues,
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data: yup.InferType<typeof schema>) => {
    setServerError(null);

    const result = await signIn("credentials", {
      email: data.email,
      password: data.password,
      redirect: false,
    });

    if (result?.error === "PENDING_APPROVAL") {
      router.push("/pending-approval");
      return;
    }

    if (result?.error) {
      setServerError("Email o contraseña incorrectos");
      return;
    }

    router.push("/buscar-vehiculo");
  };

  return (
    <div className="flex h-dvh flex-col items-center justify-center px-6">
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
              type={showPassword ? "text" : "password"}
              placeholder="••••••••"
              autoComplete="current-password"
              rightElement={
                <button type="button" onClick={() => setShowPassword((v) => !v)} className="text-gray-400 hover:text-gray-600">
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              }
            />
          </div>

          {serverError && (
            <Typography variant="body small" color="error">
              {serverError}
            </Typography>
          )}

          <Button fullwidth type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Ingresando..." : "Ingresar"}
          </Button>
        </form>

        <Typography variant="body small" className="text-center text-gray-500">
          ¿No tenés cuenta?{" "}
          <Link href="/register" className="text-primary font-medium">
            Registrate
          </Link>
        </Typography>
      </div>
    </div>
  );
};

export default LoginPage;
