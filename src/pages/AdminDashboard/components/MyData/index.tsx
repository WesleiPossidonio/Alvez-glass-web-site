
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import {
  Camera,
  Mail,
  Save,
  ShieldCheck,
  User,
  UserCircle,
  UserRound,
} from "lucide-react";

export const MyData = () => {
  return (
    <section className="col-span-4 flex h-full w-full flex-col rounded-lg bg-white p-4 shadow sm:p-6 lg:p-8">
      {/* Cabeçalho */}
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="space-y-2">
          <h1 className="text-3xl font-semibold">
            Meus Dados
          </h1>

          <p className="text-sm text-gray-600">
            Gerencie suas informações pessoais e os dados da sua conta.
          </p>
        </div>

        <div className="flex items-center gap-3 rounded-lg border border-gray-200 bg-gray-50 px-4 py-3">
          <div className="flex size-10 items-center justify-center rounded-full bg-white shadow-sm">
            <User className="size-5 text-base-blue" />
          </div>

          <div>
            <p className="text-xs text-gray-500">
              Olá, seja bem-vindo!
            </p>

            <p className="text-sm font-semibold text-gray-800">
              Weslei Possidonio
            </p>
          </div>
        </div>
      </div>

      {/* Conteúdo */}
      <div className="grid w-full grid-cols-1 items-start gap-6 xl:grid-cols-[280px_minmax(0,1fr)]">
        {/* Perfil */}
        <div className="flex flex-col items-center rounded-lg border border-gray-200 p-6 text-center">
          <div className="relative">
            <Avatar className="size-28 border-4 border-white shadow-md">
              <AvatarImage
                src=""
                alt="Foto do perfil"
              />

              <AvatarFallback className="bg-gray-100">
                <UserCircle className="size-16 text-neutral-500" />
              </AvatarFallback>
            </Avatar>

            <button
              type="button"
              aria-label="Alterar foto do perfil"
              title="Alterar foto do perfil"
              className="absolute bottom-0 right-0 flex size-9 items-center justify-center rounded-full border-2 border-white bg-base-blue text-white shadow-sm transition hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-base-blue focus-visible:ring-offset-2"
            >
              <Camera className="size-4" />
            </button>
          </div>

          <h2 className="mt-4 text-lg font-semibold text-gray-900">
            Weslei Possidonio
          </h2>

          <p className="mt-1 text-sm text-gray-500">
            Perfil do usuário
          </p>

          <div className="mt-5 w-full border-t border-gray-100 pt-4 text-left">
            <div className="flex items-start gap-3">
              <ShieldCheck className="mt-0.5 size-5 shrink-0 text-base-blue" />

              <div>
                <p className="text-sm font-medium text-gray-800">
                  Segurança da conta
                </p>

                <p className="mt-1 text-xs leading-relaxed text-gray-500">
                  Mantenha seus dados atualizados e utilize uma senha segura.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Formulário */}
        <form
          className="min-w-0 space-y-6 rounded-lg border border-gray-200 p-4 sm:p-6"
          onSubmit={(event) => event.preventDefault()}
        >
          {/* Informações pessoais */}
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <UserRound className="size-5 text-base-blue" />

              <h2 className="text-xl font-semibold text-gray-900">
                Informações pessoais
              </h2>
            </div>

            <p className="text-sm text-gray-500">
              Atualize seu nome e o e-mail vinculado à sua conta.
            </p>
          </div>

          <div className="space-y-5">
            <div className="space-y-2">
              <label
                htmlFor="name"
                className="text-sm font-medium text-gray-700"
              >
                Nome completo
              </label>

              <Input
                id="name"
                name="name"
                type="text"
                placeholder="Digite seu nome completo"
                autoComplete="name"
                className="h-11 w-full"
              />
            </div>

            <div className="space-y-2">
              <label
                htmlFor="email"
                className="text-sm font-medium text-gray-700"
              >
                E-mail
              </label>

              <div className="relative">
                <Mail className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-gray-400" />

                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="Digite seu e-mail"
                  autoComplete="email"
                  className="h-11 w-full pl-9"
                />
              </div>
            </div>
          </div>

          {/* Segurança */}
          <div className="space-y-1 border-t border-gray-100 pt-6">
            <div className="flex items-center gap-2">
              <ShieldCheck className="size-5 text-base-blue" />

              <h2 className="text-xl font-semibold text-gray-900">
                Segurança
              </h2>
            </div>

            <p className="text-sm text-gray-500">
              Preencha a senha somente se desejar alterá-la.
            </p>
          </div>

          <div className="space-y-2">
            <label
              htmlFor="password"
              className="text-sm font-medium text-gray-700"
            >
              Nova senha
            </label>

            <Input
              id="password"
              name="password"
              type="password"
              placeholder="Digite sua nova senha"
              autoComplete="new-password"
              className="h-11 w-full"
            />

            <p className="text-xs leading-relaxed text-gray-500">
              Utilize uma senha forte e evite compartilhar suas credenciais.
            </p>
          </div>

          {/* Ações */}
          <div className="flex flex-col-reverse gap-3 border-t border-gray-100 pt-5 sm:flex-row sm:justify-end">
            <Button
              type="reset"
              variant="outline"
              className="h-11 w-full sm:w-auto"
            >
              Limpar campos
            </Button>

            <Button
              type="submit"
              className="h-11 w-full bg-base-blue font-semibold text-white hover:bg-base-blue-hover sm:w-auto"
            >
              <Save className="mr-2 size-4" />
              Atualizar perfil
            </Button>
          </div>
        </form>
      </div>
    </section>
  );
};
