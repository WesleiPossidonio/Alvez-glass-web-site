
import { useForm, type Resolver } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "@/components/ui/button";
import {
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";

import { useStockProduct } from "@/hooks/useStockProduct";

const schema = z.object({
  name: z
    .string()
    .trim()
    .min(1, "Nome da categoria é obrigatório"),
});

type FormValues = z.infer<typeof schema>;

export const CategoryStockDialog = () => {
  const { handleCreateCategory } = useStockProduct();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    resolver: zodResolver(schema) as unknown as Resolver<FormValues>,
    defaultValues: {
      name: "",
    },
  });

  const onSubmit = async (data: FormValues) => {
    try {
      await handleCreateCategory(data);

      reset();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <DialogContent className="w-full sm:max-w-lg">
      <DialogHeader className="mb-4">
        <DialogTitle className="text-2xl">
          Adicionar categoria de estoque
        </DialogTitle>

        <DialogDescription>
          Cadastre uma categoria para organizar os produtos
          do estoque.
        </DialogDescription>
      </DialogHeader>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-6"
      >
        <div className="space-y-4">
          <label className="text-sm font-medium text-gray-700">
            Nome da categoria

            <Input
              className="mt-1"
              placeholder="Ex.: Vidraçaria, Marcenaria"
              {...register("name")}
            />

            {errors.name && (
              <p className="mt-1 text-sm text-red-600">
                {errors.name.message}
              </p>
            )}
          </label>
        </div>

        <DialogFooter>
          <Button
            type="submit"
            disabled={isSubmitting}
            className="bg-base-blue text-white hover:bg-base-blue-hover"
          >
            {isSubmitting
              ? "Cadastrando..."
              : "Cadastrar categoria"}
          </Button>
        </DialogFooter>
      </form>
    </DialogContent>
  );
};

