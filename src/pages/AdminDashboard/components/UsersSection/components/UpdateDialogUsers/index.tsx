
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import type { User } from "@/contexts/AdminContext";
import { useAdmin } from "@/hooks/useAdmin";

const updateUserSchema = z.object({
  name: z
    .string()
    .trim()
    .min(3, "Informe um nome com pelo menos 3 caracteres."),

  email: z
    .string()
    .trim()
    .email("Informe um e-mail válido."),

  registration: z
    .string()
    .trim()
    .min(1, "A matrícula é obrigatória."),

  password: z
    .string()
    .refine(
      (value) => value === "" || value.length >= 8,
      "A senha deve ter pelo menos 8 caracteres.",
    ),
});

type UpdateUserData = z.infer<typeof updateUserSchema>;

interface UpdateDialogUsersProps {
  user: User;
  onUpdated: () => Promise<void>;
}

export const UpdateDialogUsers = ({
  user,
  onUpdated,
}: UpdateDialogUsersProps) => {
  const { handleUpdateUser } = useAdmin()

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<UpdateUserData>({
    resolver: zodResolver(updateUserSchema),
    mode: "onBlur",
    defaultValues: {
      name: user.name,
      email: user.email,
      registration: user.registration || "",
      password: "",
    },
  });

  const onSubmit = async (data: UpdateUserData) => {
    try {
      const { password, ...userData } = data;

      
      await handleUpdateUser({
        id: user.id,
        ...userData,
        ...(password.trim() ? { password } : {}),
      });

      await onUpdated();
    } catch (error) {
      console.error("Erro ao atualizar usuário:", error);
    }
  };

  return (
    <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-[500px]">
      <DialogHeader>
        <DialogTitle className="text-xl">
          Atualizar usuário
        </DialogTitle>

        <DialogDescription>
          Altere os dados cadastrais do usuário selecionado.
        </DialogDescription>
      </DialogHeader>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="update-user-name">Nome completo</Label>

          <Input
            id="update-user-name"
            {...register("name")}
          />

          {errors.name && (
            <p className="text-xs text-red-500">
              {errors.name.message}
            </p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="update-user-email">E-mail</Label>

          <Input
            id="update-user-email"
            type="email"
            {...register("email")}
          />

          {errors.email && (
            <p className="text-xs text-red-500">
              {errors.email.message}
            </p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="update-user-registration">Matrícula</Label>

          <Input
            id="update-user-registration"
            {...register("registration")}
          />

          {errors.registration && (
            <p className="text-xs text-red-500">
              {errors.registration.message}
            </p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="update-user-password">
            Nova senha
          </Label>

          <Input
            id="update-user-password"
            type="password"
            placeholder="Deixe vazio para manter a senha atual"
            {...register("password")}
          />

          {errors.password && (
            <p className="text-xs text-red-500">
              {errors.password.message}
            </p>
          )}

          <p className="text-xs text-gray-500">
            Preencha somente se desejar alterar a senha.
          </p>
        </div>

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
            {isSubmitting ? "Salvando..." : "Salvar alterações"}
          </Button>
        </DialogFooter>
      </form>
    </DialogContent>
  );
};