
import { useState } from "react";
import { useForm, type Resolver } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff } from "lucide-react";

import Logo from '@/assets/Logo2.png'

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { toast } from "react-toastify";
import api from "@/services/api";

const createPasswordSchema = z
  .object({
    update_number: z
      .string()
      .trim()
      .regex(/^\d{6}$/, "Informe o código de 6 dígitos recebido por e-mail."),

    password: z
      .string()
      .min(8, "A senha deve ter pelo menos 8 caracteres.")
      .regex(/[A-Z]/, "Inclua pelo menos uma letra maiúscula.")
      .regex(/[a-z]/, "Inclua pelo menos uma letra minúscula.")
      .regex(/[0-9]/, "Inclua pelo menos um número."),

    confirmPassword: z
      .string()
      .min(1, "Confirme sua senha."),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "As senhas não coincidem.",
    path: ["confirmPassword"],
  });

type CreatePasswordFormData = z.infer<typeof createPasswordSchema>;

export function CreatePassword() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [success, setSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<CreatePasswordFormData>({
    resolver: zodResolver(
      createPasswordSchema,
    ) as unknown as Resolver<CreatePasswordFormData>,
    defaultValues: {
      update_number: "",
      password: "",
      confirmPassword: "",
    },
    mode: "onTouched",
  });

  const password = watch("password");

  const requirements = [
    {
      label: "Pelo menos 8 caracteres",
      valid: password.length >= 8,
    },
    {
      label: "Uma letra maiúscula",
      valid: /[A-Z]/.test(password),
    },
    {
      label: "Uma letra minúscula",
      valid: /[a-z]/.test(password),
    },
    {
      label: "Pelo menos um número",
      valid: /[0-9]/.test(password),
    },
  ];

 const handleFormSubmit = async (
  data: CreatePasswordFormData
) => {
  setSubmitError("");

  try {
    await toast.promise(
      api.patch("client/activate", {
        update_number: data.update_number,
        password: data.password,
        confirmPassword: data.confirmPassword
      }),
      {
        pending: "Cadastrando sua senha...",
        success: "Senha cadastrada com sucesso!",
        error: {
          render({ data }) {
            return (
              (
                data as {
                  response?: {
                    data?: { message?: string };
                  };
                }
              )?.response?.data?.message ||
              "Não foi possível cadastrar sua senha."
            );
          },
        },
      }
    );

    setSuccess(true);
  } catch (error) {
    console.error("Erro ao cadastrar senha:", error);

    const message = (
      error as {
        response?: {
          data?: { message?: string };
        };
      }
    )?.response?.data?.message;

    setSubmitError(
      message ||
        "Não foi possível criar sua senha. Verifique o código e tente novamente."
    );
  }
};

  if (success) {
    return (
      <Card className="w-full max-w-md border-border shadow-lg">
        <CardContent className="flex flex-col items-center p-8 text-center">
          <div className="w-full flex items-center justify-center mt-4">
            <img className='w-28 -ml-6' src={Logo} alt="logo" />
          </div>

          <h1 className="text-2xl font-bold tracking-tight">
            Senha criada!
          </h1>

          <p className="mt-3 text-sm leading-6 text-muted-foreground">
            Sua senha foi cadastrada com sucesso.
            Agora você já pode acessar sua conta.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full h-auto mx-auto my-[3.5%] max-w-lg border-border shadow-lg">
      <CardHeader className="space-y-4 pb-6">
        <div className="w-full flex items-center justify-center mt-4">
          <img className='w-28 -ml-6' src={Logo} alt="logo" />
        </div>


        <div className="space-y-2 mt-5 text-center">
          <CardTitle className="text-2xl font-bold tracking-tight">
            Crie sua senha
          </CardTitle>

          <CardDescription className="text-sm leading-6">
            Para ativar sua conta Alves Glass, informe
            o código enviado ao seu e-mail e defina
            uma senha segura.
          </CardDescription>
        </div>
      </CardHeader>

      <CardContent>
        <form
          onSubmit={handleSubmit(handleFormSubmit)}
          className="space-y-5"
        >
          <div className="space-y-2">
            <label
              htmlFor="update_number"
              className="text-sm font-medium"
            >
              Código de validação
            </label>

            <Input
              id="update_number"
              placeholder="Ex.: 123456"
              inputMode="numeric"
              autoComplete="one-time-code"
              maxLength={6}
              aria-invalid={!!errors.update_number}
              {...register("update_number")}
            />

            <p className="text-xs text-muted-foreground">
              Confira o código de 6 dígitos recebido por e-mail.
            </p>

            {errors.update_number && (
              <p className="text-sm text-destructive">
                {errors.update_number.message}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <label
              htmlFor="password"
              className="text-sm font-medium"
            >
              Nova senha
            </label>

            <div className="relative">
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="Digite sua senha"
                autoComplete="new-password"
                className="pr-11"
                aria-invalid={!!errors.password}
                {...register("password")}
              />

              <button
                type="button"
                aria-label={
                  showPassword
                    ? "Ocultar senha"
                    : "Mostrar senha"
                }
                onClick={() => setShowPassword((value) => !value)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground transition-colors hover:text-foreground"
              >
                {showPassword ? (
                  <EyeOff className="h-4 w-4" />
                ) : (
                  <Eye className="h-4 w-4" />
                )}
              </button>
            </div>

            {errors.password && (
              <p className="text-sm text-destructive">
                {errors.password.message}
              </p>
            )}

            <div className="rounded-lg bg-muted/50 p-3">
              <p className="mb-2 text-xs font-medium text-muted-foreground">
                Sua senha deve conter:
              </p>

              <ul className="space-y-1.5">
                {requirements.map((requirement) => (
                  <li
                    key={requirement.label}
                    className={`flex items-center gap-2 text-xs ${requirement.valid
                      ? "text-emerald-700"
                      : "text-muted-foreground"
                      }`}
                  >
                    <span
                      className={`h-1.5 w-1.5 rounded-full ${requirement.valid
                        ? "bg-emerald-600"
                        : "bg-muted-foreground/50"
                        }`}
                    />
                    {requirement.label}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="space-y-2">
            <label
              htmlFor="confirmPassword"
              className="text-sm font-medium"
            >
              Confirme sua senha
            </label>

            <div className="relative">
              <Input
                id="confirmPassword"
                type={showConfirmation ? "text" : "password"}
                placeholder="Digite sua senha novamente"
                autoComplete="new-password"
                className="pr-11"
                aria-invalid={!!errors.confirmPassword}
                {...register("confirmPassword")}
              />

              <button
                type="button"
                aria-label={
                  showConfirmation
                    ? "Ocultar confirmação"
                    : "Mostrar confirmação"
                }
                onClick={() =>
                  setShowConfirmation((value) => !value)
                }
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground transition-colors hover:text-foreground"
              >
                {showConfirmation ? (
                  <EyeOff className="h-4 w-4" />
                ) : (
                  <Eye className="h-4 w-4" />
                )}
              </button>
            </div>

            {errors.confirmPassword && (
              <p className="text-sm text-destructive">
                {errors.confirmPassword.message}
              </p>
            )}
          </div>

          {submitError && (
            <div
              role="alert"
              className="rounded-lg border border-destructive/30 bg-destructive/5 p-3 text-sm text-destructive"
            >
              {submitError}
            </div>
          )}

          <Button
            type="submit"
            disabled={isSubmitting}
            className="h-11 w-full bg-base-blue text-white hover:bg-base-blue-hover cursor-pointer"
          >
            {isSubmitting
              ? "Criando sua senha..."
              : "Criar senha e ativar conta"}
          </Button>

          <p className="text-center text-xs leading-5 text-muted-foreground">
            Seus dados são tratados com segurança.
            Nunca compartilhe seu código de validação.
          </p>
        </form>
      </CardContent>
    </Card>
  );
}