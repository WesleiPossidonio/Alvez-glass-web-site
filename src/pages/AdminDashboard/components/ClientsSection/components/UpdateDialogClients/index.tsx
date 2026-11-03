
import { useEffect, useState } from "react";
import * as zod from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { useClientManagement } from "@/hooks/ClientManagement";

import { Button } from "@/components/ui/button";
import {
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import {
  AlertCircle,
  LoaderCircle,
  UserRound,
} from "lucide-react";

interface UpdateDialogClientsProps {
  id: string;
}

const updateClientFormSchema = zod.object({
  name: zod.string().trim().min(1, "O nome é obrigatório"),
  email: zod.string().trim().email("Informe um e-mail válido"),
  cpf_cnpj: zod
    .string()
    .trim()
    .min(11, "Informe um CPF ou CNPJ válido")
    .max(14, "CPF ou CNPJ deve ter no máximo 14 caracteres"),
  phone: zod
    .string()
    .trim()
    .min(9, "Informe um telefone válido")
    .max(11, "Telefone deve ter no máximo 11 caracteres"),
});

type UpdateClientFormData = zod.infer<typeof updateClientFormSchema>;

const inputClassName =
  "mt-1.5 h-11 rounded-lg border-gray-200 bg-white shadow-sm transition-colors " +
  "placeholder:text-gray-400 focus-visible:ring-2 focus-visible:ring-blue-500/20";

export const UpdateDialogClients = ({
  id,
}: UpdateDialogClientsProps) => {
  const { handleUpdateClient, listClients } = useClientManagement();

  const clientToUpdate = listClients.find((client) => client.id === id);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors, isDirty },
  } = useForm<UpdateClientFormData>({
    resolver: zodResolver(updateClientFormSchema),
    defaultValues: {
      name: "",
      email: "",
      cpf_cnpj: "",
      phone: "",
    },
  });

  useEffect(() => {
    if (!clientToUpdate) return;

    reset({
      name: clientToUpdate.name ?? "",
      email: clientToUpdate.email ?? "",
      phone: clientToUpdate.phone?.replace(/\D/g, "") ?? "",
    });
  }, [clientToUpdate, reset]);

  const updateClient = async (data: UpdateClientFormData) => {
    setIsSubmitting(true);
    setSubmitError("");

    try {
      await handleUpdateClient({
        id,
        ...data,
      });

      reset(data);
    } catch {
      setSubmitError(
        "Não foi possível atualizar o cliente. Tente novamente.",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderFieldError = (message?: string) => {
    if (!message) return null;

    return (
      <p className="mt-1.5 flex items-center gap-1.5 text-xs text-red-600">
        <AlertCircle className="h-3.5 w-3.5 shrink-0" />
        {message}
      </p>
    );
  };

  return (
    <DialogContent className="flex max-h-[90vh] flex-col gap-0 overflow-hidden rounded-2xl p-0 sm:max-w-3xl lg:min-w-2/3">
      <DialogHeader className="border-b border-gray-100 bg-gray-50/80 px-6 py-5 text-left sm:px-8">
        <div className="mt-5 flex items-center gap-3">
          <div className="min-w-0">
            <DialogTitle className="text-2xl font-semibold tracking-tight text-gray-900">
              Atualizar cliente
            </DialogTitle>

            <DialogDescription className="mt-1 text-sm text-gray-500">
              Edite os dados cadastrais e de contato do cliente.
            </DialogDescription>
          </div>
        </div>
      </DialogHeader>

      <form
        className="flex min-h-0 flex-1 flex-col"
        onSubmit={handleSubmit(updateClient)}
      >
        <div className="min-h-0 flex-1 space-y-8 overflow-y-auto px-6 py-6 sm:px-8">
          {!clientToUpdate && (
            <div className="flex items-start gap-3 rounded-lg border border-amber-200 bg-amber-50 p-4 text-sm text-amber-800">
              <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
              <p>
                Não foi possível localizar este cliente. Verifique se ele
                ainda está disponível na listagem.
              </p>
            </div>
          )}

          <section className="space-y-5">
            <div className="flex items-center gap-3 border-b border-gray-100 pb-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-50 text-blue-700">
                <UserRound className="h-4 w-4" />
              </div>

              <div>
                <h3 className="text-sm font-semibold text-gray-900">
                  Dados do cliente
                </h3>
                <p className="text-xs text-gray-500">
                  Informações pessoais e de contato.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="space-y-1.5 sm:col-span-2">
                <Label htmlFor="name">Nome / Razão social</Label>
                <Input
                  id="name"
                  placeholder="Nome do cliente ou empresa"
                  className={inputClassName}
                  aria-invalid={!!errors.name}
                  {...register("name")}
                />
                {renderFieldError(errors.name?.message)}
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="cpf_cnpj">CPF / CNPJ</Label>
                <Input
                  id="cpf_cnpj"
                  placeholder="Somente números"
                  maxLength={14}
                  className={inputClassName}
                  aria-invalid={!!errors.cpf_cnpj}
                  {...register("cpf_cnpj", {
                    onChange: (event) => {
                      const value = event.target.value.replace(/\D/g, "");
                      setValue("cpf_cnpj", value, {
                        shouldDirty: true,
                        shouldValidate: true,
                      });
                    },
                  })}
                />
                {renderFieldError(errors.cpf_cnpj?.message)}
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="phone">Telefone</Label>
                <Input
                  id="phone"
                  type="tel"
                  placeholder="(22) 99999-9999"
                  maxLength={11}
                  className={inputClassName}
                  aria-invalid={!!errors.phone}
                  {...register("phone", {
                    onChange: (event) => {
                      const value = event.target.value.replace(/\D/g, "");
                      setValue("phone", value, {
                        shouldDirty: true,
                        shouldValidate: true,
                      });
                    },
                  })}
                />
                {renderFieldError(errors.phone?.message)}
              </div>

              <div className="space-y-1.5 sm:col-span-2">
                <Label htmlFor="email">E-mail</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="cliente@empresa.com.br"
                  className={inputClassName}
                  aria-invalid={!!errors.email}
                  {...register("email")}
                />
                {renderFieldError(errors.email?.message)}
              </div>
            </div>
          </section>

          {submitError && (
            <div className="flex items-start gap-2 rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-700">
              <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
              <p>{submitError}</p>
            </div>
          )}
        </div>

        <DialogFooter className="flex-row justify-end gap-3 border-t border-gray-100 bg-white px-6 py-4 sm:px-8">
          <Button
            type="submit"
            disabled={!clientToUpdate || isSubmitting || !isDirty}
            className="h-11 min-w-40 rounded-lg bg-base-blue px-5 font-medium text-white transition-colors hover:bg-blue-800 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {isSubmitting ? (
              <>
                <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />
                Atualizando...
              </>
            ) : (
              "Salvar alterações"
            )}
          </Button>
        </DialogFooter>
      </form>
    </DialogContent>
  );
};
