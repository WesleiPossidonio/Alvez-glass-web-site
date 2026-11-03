import { useContext } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { UserContext } from "@/contexts/UserContext";

import {
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

const createUserSchema = z.object({
  name: z
    .string()
    .trim()
    .min(3, "Informe um nome com pelo menos 3 caracteres."),

  email: z
    .string()
    .trim()
    .email("Informe um e-mail válido."),

  password: z
    .string()
    .min(8, "A senha deve ter pelo menos 8 caracteres."),

  admin: z.boolean(),
});

type CreateUserData = z.infer<typeof createUserSchema>;

interface DialogUsersProps {
  onCreated: () => Promise<void>;
}

export const DialogUsers = ({ onCreated }: DialogUsersProps) => {
  const { handleCreateUser } = useContext(UserContext);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<CreateUserData>({
    resolver: zodResolver(createUserSchema),
    mode: "onBlur",
    defaultValues: {
      name: "",
      email: "",
      password: "",
      admin: false,
    },
  });

  const onSubmit = async (data: CreateUserData) => {
    try {
      await handleCreateUser(data);
      await onCreated();
      reset();
    } catch (error) {
      console.error("Erro ao cadastrar usuário:", error);
    }
  };

  return (
    <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-[500px]">
      <DialogHeader>
        <DialogTitle className="text-xl">
          Adicionar usuário
        </DialogTitle>

        <DialogDescription>
          Preencha os dados abaixo para cadastrar um novo usuário no sistema.
        </DialogDescription>
      </DialogHeader>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="user-name">Nome completo</Label>

          <Input
            id="user-name"
            placeholder="Digite o nome completo"
            {...register("name")}
          />

          {errors.name && (
            <p className="text-xs text-red-500">
              {errors.name.message}
            </p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="user-email">E-mail</Label>

          <Input
            id="user-email"
            type="email"
            placeholder="usuario@email.com"
            {...register("email")}
          />

          {errors.email && (
            <p className="text-xs text-red-500">
              {errors.email.message}
            </p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="user-password">Senha</Label>

          <Input
            id="user-password"
            type="password"
            placeholder="Digite uma senha"
            {...register("password")}
          />

          {errors.password && (
            <p className="text-xs text-red-500">
              {errors.password.message}
            </p>
          )}
        </div>

        <label className="flex cursor-pointer items-center gap-3 rounded-md border p-3">
          <input
            type="checkbox"
            className="size-4 accent-[#1B3B55]"
            {...register("admin")}
          />

          <div>
            <p className="text-sm font-medium text-neutral-800">
              Administrador
            </p>

            <p className="text-xs text-neutral-500">
              Permite acesso às funcionalidades administrativas.
            </p>
          </div>
        </label>

        <DialogFooter className="gap-2 sm:gap-2">
          <DialogClose asChild>
            <Button type="button" variant="outline">
              Cancelar
            </Button>
          </DialogClose>

          <Button
            type="submit"
            disabled={isSubmitting}
            className="bg-base-blue font-semibold text-white hover:bg-base-blue-hover"
          >
            {isSubmitting ? "Cadastrando..." : "Cadastrar usuário"}
          </Button>
        </DialogFooter>
      </form>
    </DialogContent>
  );
};