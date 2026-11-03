
import { useForm, type Resolver } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  UserRoundPlus,
  ContactRound,
  LoaderCircle,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/hooks/authSession";



const addClientFormSchema = z.object({
  name: z.string().trim().min(1, "Nome do cliente é obrigatório"),
  email: z.string().trim().email("Informe um e-mail válido"),
  phone: z
    .string()
    .trim()
    .min(9, "Telefone é obrigatório")
    .max(15, "Telefone muito longo"),
});

type AddClientFormData = z.infer<typeof addClientFormSchema>;

const inputClassName =
  "mt-1.5 h-11 rounded-lg border-gray-200 bg-white shadow-sm transition-colors focus-visible:ring-2 focus-visible:ring-base-blue/20";

export const DialogClients = () => {

  const { handleCreateClient } = useAuth()

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<AddClientFormData>({
    resolver: zodResolver(
      addClientFormSchema,
    ) as unknown as Resolver<AddClientFormData>,
    defaultValues: {
      name: "",
      email: "",
      phone: "",
    },
  });

  const addClient = async (data: AddClientFormData) => {
    try {
      await handleCreateClient(data);
      reset();
    } catch (error) {
      console.error("Erro ao cadastrar cliente:", error);
    }
  };

  return (
    <DialogContent className="flex max-h-[90vh] flex-col gap-0 overflow-hidden rounded-2xl p-0 lg:w-[calc(100%-2rem)] lg:min-w-3/5">
      <DialogHeader className="mt-5 border-b bg-gray-50/80 px-6 py-5 sm:px-8">
        <div className="flex items-start gap-3">
          <div className="space-y-1">
            <DialogTitle className="text-2xl font-semibold tracking-tight text-gray-900">
              Adicionar cliente
            </DialogTitle>

            <DialogDescription className="text-sm leading-relaxed text-gray-500">
              Cadastre os dados pessoais e de contato do cliente.
            </DialogDescription>
          </div>
        </div>
      </DialogHeader>

      <form
        onSubmit={handleSubmit(addClient)}
        className="min-h-0 space-y-7 overflow-y-auto px-6 py-6 sm:px-8"
      >
        <section className="space-y-4">
          <div className="flex items-center gap-2 border-b pb-3">
            <ContactRound className="size-5 text-base-blue" />

            <div>
              <h3 className="font-semibold text-gray-900">
                Dados do cliente
              </h3>

              <p className="text-xs text-gray-500">
                Informações para identificação e contato.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="space-y-1 sm:col-span-2">
              <label
                htmlFor="name"
                className="text-sm font-medium text-gray-700"
              >
                Nome completo ou razão social{" "}
                <span className="text-red-500">*</span>
              </label>

              <Input
                id="name"
                placeholder="Ex.: João da Silva"
                className={inputClassName}
                aria-invalid={!!errors.name}
                {...register("name")}
              />

              {errors.name && (
                <p className="text-xs text-red-600">
                  {errors.name.message}
                </p>
              )}
            </div>

            <div className="space-y-1">
              <label
                htmlFor="email"
                className="text-sm font-medium text-gray-700"
              >
                E-mail <span className="text-red-500">*</span>
              </label>

              <Input
                id="email"
                type="email"
                placeholder="cliente@exemplo.com"
                className={inputClassName}
                aria-invalid={!!errors.email}
                {...register("email")}
              />

              {errors.email && (
                <p className="text-xs text-red-600">
                  {errors.email.message}
                </p>
              )}
            </div>

            <div className="space-y-1">
              <label
                htmlFor="phone"
                className="text-sm font-medium text-gray-700"
              >
                Telefone <span className="text-red-500">*</span>
              </label>

              <Input
                id="phone"
                type="tel"
                placeholder="Ex.: (22) 99999-9999"
                className={inputClassName}
                aria-invalid={!!errors.phone}
                {...register("phone")}
              />

              {errors.phone && (
                <p className="text-xs text-red-600">
                  {errors.phone.message}
                </p>
              )}
            </div>
          </div>
        </section>

        <DialogFooter className="gap-2 border-t pt-5">
          <Button
            type="submit"
            disabled={isSubmitting}
            className="h-11 w-full bg-base-blue px-6 font-semibold text-white hover:bg-base-blue-hover sm:w-auto"
          >
            {isSubmitting ? (
              <>
                <LoaderCircle className="mr-2 size-4 animate-spin" />
                Cadastrando...
              </>
            ) : (
              <>
                <UserRoundPlus className="mr-2 size-4" />
                Adicionar cliente
              </>
            )}
          </Button>
        </DialogFooter>
      </form>
    </DialogContent>
  );
};
