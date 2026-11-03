
import * as zod from "zod";
import ReCAPTCHA from "react-google-recaptcha";

import { GoogleLogin, type CredentialResponse } from "@react-oauth/google";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import {
  AlertCircle,
  ArrowRight,
  Eye,
  EyeOff,
  LoaderCircle,
  LockKeyhole,
  Mail,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/hooks/authSession";

import logo from "@/assets/Logo.png";
import Image from "@/assets/BannerHero.webp";
import api from "@/services/api";
import { useNavigate } from "react-router-dom";

const confirmOrderLoginValidationSchema = zod.object({
  email: zod
    .string()
    .trim()
    .email("Informe um endereço de e-mail válido"),
  password: zod
    .string()
    .min(6, "A senha deve ter pelo menos 6 caracteres"),
});

export type OrderLoginData = zod.infer<
  typeof confirmOrderLoginValidationSchema
>;

type ConfirmOrderFormLoginData = OrderLoginData;

export const LoginClient = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ConfirmOrderFormLoginData>({
    resolver: zodResolver(confirmOrderLoginValidationSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const [captcha, setCaptcha] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);

  const { loginClient, refreshUser } = useAuth();
  const navigate = useNavigate()

  const handleLogin = async (data: ConfirmOrderFormLoginData) => {
    if (!captcha) {
      toast.error("Confirme que você não é um robô.");
      return;
    }

    try {
      await loginClient(data.email, data.password);
    } catch {
      toast.error("Não foi possível entrar. Verifique seus dados.");
    }
  };

  const handleGoogleLogin = async (
    credentialResponse: CredentialResponse,
  ) => {
    const token = credentialResponse.credential;

    if (!token) {
      toast.error("Não foi possível obter o token do Google.");
      return;
    }

    try {
      await api.post("google-session", {
        token,
        withCredentials: true 
      });

      await refreshUser()
      navigate('/area-cliente')

      toast.success("Login realizado com sucesso!");
    } catch (error) {
      console.error("Erro no login com Google:", error);
      toast.error("Não foi possível entrar com sua conta Google.");
    }
  };

  return (
    <main className="min-h-svh bg-white md:grid md:grid-cols-2">
      {/* Painel visual */}
      <section
        className="relative hidden min-h-svh overflow-hidden bg-slate-950 bg-cover bg-center md:flex md:items-end"
        style={{ backgroundImage: `url(${Image})` }}
        aria-label="Apresentação Alves Glass"
      >
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/30 to-slate-950/10" />

        <div className="relative z-10 max-w-xl p-10 text-white lg:p-16">
          <img
            src={logo}
            alt="Alves Glass"
            className="mb-12 w-36 rounded-md bg-white/95 p-2"
          />

          <span className="mb-4 inline-flex rounded-full border border-white/30 bg-white/10 px-4 py-1.5 text-sm backdrop-blur">
            Portal do cliente
          </span>

          <h2 className="text-4xl font-bold leading-tight lg:text-5xl">
            Seu atendimento,
            <br />
            em um só lugar.
          </h2>

          <p className="mt-5 max-w-md text-base leading-relaxed text-white/80 lg:text-lg">
            Acompanhe seus pedidos e consulte as atualizações do seu
            atendimento de forma simples e segura.
          </p>
        </div>
      </section>

      {/* Área de autenticação */}
      <section className="flex min-h-svh items-center justify-center px-5 py-10 sm:px-8 md:px-10 lg:px-16">
        <div className="w-full max-w-md">
          <div className="mb-10 flex items-center justify-between md:hidden">
            <img src={logo} alt="Alves Glass" className="w-28" />
            <span className="text-xs font-medium text-slate-500">
              Portal do cliente
            </span>
          </div>

          <header className="mb-8">
            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.18em] text-blue-800">
              Bem-vindo de volta
            </p>

            <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
              Acesse sua conta
            </h1>

            <p className="mt-3 text-sm leading-relaxed text-slate-500 sm:text-base">
              Entre para acompanhar seus pedidos e as atualizações do seu
              atendimento.
            </p>
          </header>

          {/* Login com Google */}
          <div className="w-full [&>div]:w-full">
            <GoogleLogin
              onSuccess={handleGoogleLogin}
              onError={() =>
                toast.error("Falha na autenticação com Google.")
              }
              text="continue_with"
              shape="rectangular"
              theme="outline"
              size="large"
              width="400"
            />
          </div>

          <div className="my-7 flex items-center gap-4">
            <div className="h-px flex-1 bg-slate-200" />
            <span className="text-xs font-medium uppercase tracking-wider text-slate-400">
              ou entre com seu e-mail
            </span>
            <div className="h-px flex-1 bg-slate-200" />
          </div>

          <form
            className="space-y-5"
            onSubmit={handleSubmit(handleLogin)}
            noValidate
          >
            {/* E-mail */}
            <div className="space-y-2">
              <label
                htmlFor="email"
                className="text-sm font-semibold text-slate-700"
              >
                E-mail
              </label>

              <div className="relative">
                <Mail
                  aria-hidden="true"
                  className="absolute left-3.5 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400"
                />

                <Input
                  id="email"
                  type="email"
                  autoComplete="email"
                  placeholder="voce@exemplo.com"
                  aria-invalid={Boolean(errors.email)}
                  aria-describedby={errors.email ? "email-error" : undefined}
                  className={`h-12 rounded-lg pl-11 ${errors.email
                      ? "border-red-500 focus-visible:ring-red-500"
                      : "border-slate-300 focus-visible:ring-blue-800"
                    }`}
                  {...register("email")}
                />
              </div>

              {errors.email && (
                <p
                  id="email-error"
                  role="alert"
                  className="flex items-center gap-1.5 text-sm text-red-600"
                >
                  <AlertCircle className="h-4 w-4" />
                  {errors.email.message}
                </p>
              )}
            </div>

            {/* Senha */}
            <div className="space-y-2">
              <div className="flex items-center justify-between gap-3">
                <label
                  htmlFor="password"
                  className="text-sm font-semibold text-slate-700"
                >
                  Senha
                </label>

                <button
                  type="button"
                  onClick={() =>
                    toast.info("Conecte aqui o fluxo de recuperação de senha.")
                  }
                  className="text-sm font-medium text-blue-800 transition hover:text-blue-950 hover:underline"
                >
                  Esqueci minha senha
                </button>
              </div>

              <div className="relative">
                <LockKeyhole
                  aria-hidden="true"
                  className="absolute left-3.5 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400"
                />

                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="current-password"
                  placeholder="Digite sua senha"
                  aria-invalid={Boolean(errors.password)}
                  aria-describedby={
                    errors.password ? "password-error" : undefined
                  }
                  className={`h-12 rounded-lg pl-11 pr-12 ${errors.password
                      ? "border-red-500 focus-visible:ring-red-500"
                      : "border-slate-300 focus-visible:ring-blue-800"
                    }`}
                  {...register("password")}
                />

                <button
                  type="button"
                  aria-label={showPassword ? "Ocultar senha" : "Mostrar senha"}
                  onClick={() => setShowPassword((current) => !current)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 rounded p-1 text-slate-400 transition hover:text-slate-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-800"
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5" />
                  ) : (
                    <Eye className="h-5 w-5" />
                  )}
                </button>
              </div>

              {errors.password && (
                <p
                  id="password-error"
                  role="alert"
                  className="flex items-center gap-1.5 text-sm text-red-600"
                >
                  <AlertCircle className="h-4 w-4" />
                  {errors.password.message}
                </p>
              )}
            </div>

            {/* reCAPTCHA */}
            <div className="overflow-x-auto rounded-lg border border-slate-200 bg-slate-50 p-3">
              <p className="mb-3 text-xs leading-relaxed text-slate-500">
                Para proteger sua conta, confirme a verificação abaixo.
              </p>

              <ReCAPTCHA
                sitekey={import.meta.env.VITE_RECAPTCHA_KEY}
                onChange={setCaptcha}
                onExpired={() => setCaptcha(null)}
              />
            </div>

            {/* Entrar */}
            <Button
              type="submit"
              disabled={isSubmitting}
              className="h-12 w-full gap-2 rounded-lg bg-blue-900 text-base font-semibold text-white shadow-sm transition hover:bg-blue-950 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isSubmitting ? (
                <>
                  <LoaderCircle className="h-5 w-5 animate-spin" />
                  Entrando...
                </>
              ) : (
                <>
                  Entrar na minha conta
                  <ArrowRight className="h-5 w-5" />
                </>
              )}
            </Button>
          </form>

          <p className="mt-8 text-center text-xs leading-relaxed text-slate-400">
            Ao acessar o portal, você utiliza os serviços de atendimento da
            Alves Glass.
          </p>
        </div>
      </section>
    </main>
  );
};
