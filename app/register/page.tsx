"use client";
import { Input } from "@/components/Input";
import { Button } from "@/components/Button";
import { Typography } from "@/components/Typography";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

const schema = yup.object({
  email: yup.string().email("Email inválido").required("El email es requerido"),
  password: yup
    .string()
    .min(6, "Mínimo 6 caracteres")
    .required("La contraseña es requerida"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password")], "Las contraseñas no coinciden")
    .required("Confirmá tu contraseña"),
});

const defaultValues = { email: "", password: "", confirmPassword: "" };

const RegisterPage = () => {
  const router = useRouter();
  const [serverError, setServerError] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const { control, handleSubmit, formState: { isSubmitting } } = useForm({
    defaultValues,
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data: yup.InferType<typeof schema>) => {
    setServerError(null);
    const res = await fetch("/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: data.email, password: data.password }),
    });

    if (res.status === 409) {
      setServerError("Ya existe una cuenta con ese email");
      return;
    }

    if (!res.ok) {
      setServerError("Ocurrió un error al crear la cuenta");
      return;
    }

    router.push("/pending-approval");
  };

  return (
    <div className="flex h-dvh flex-col items-center justify-center px-6">
      <div className="w-full max-w-sm flex flex-col gap-8">
        <div className="flex flex-col items-center gap-1">
          <Typography variant="h3">Crear cuenta</Typography>
          <Typography variant="body medium" color="secondary">
            Registrate para solicitar acceso
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
              autoComplete="new-password"
              rightElement={
                <button type="button" onClick={() => setShowPassword((v) => !v)} className="text-gray-400 hover:text-gray-600">
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              }
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-gray-700">Confirmá la contraseña</label>
            <Input
              control={control}
              name="confirmPassword"
              type={showConfirm ? "text" : "password"}
              placeholder="••••••••"
              autoComplete="new-password"
              rightElement={
                <button type="button" onClick={() => setShowConfirm((v) => !v)} className="text-gray-400 hover:text-gray-600">
                  {showConfirm ? <EyeOff size={18} /> : <Eye size={18} />}
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
            {isSubmitting ? "Creando cuenta..." : "Crear cuenta"}
          </Button>
        </form>

        <Typography variant="body small" className="text-center text-gray-500">
          ¿Ya tenés cuenta?{" "}
          <Link href="/login" className="text-primary font-medium">
            Iniciá sesión
          </Link>
        </Typography>
      </div>
    </div>
  );
};

export default RegisterPage;
