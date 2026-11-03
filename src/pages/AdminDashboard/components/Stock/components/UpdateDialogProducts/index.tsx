
import { useEffect } from "react";
import { useForm, type Resolver } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "@/components/ui/button";
import {
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";

import { useStockProduct } from "@/hooks/useStockProduct";

interface UpdateDialogProductsProps {
  id: string;
}

const updateProductFormSchema = z.object({
  product_category_id: z.coerce
    .number()
    .min(1, "Categoria do produto é obrigatória"),

  control_level: z.enum(["FREE", "RESTRICTED"], {
    message: "Nível de controle é obrigatório",
  }),

  item_name: z
    .string()
    .trim()
    .min(1, "Nome do produto é obrigatório"),

  unit: z
    .string()
    .trim()
    .min(1, "Unidade é obrigatória"),

  sector_name: z
    .string()
    .trim()
    .min(1, "Setor é obrigatório"),

  code: z
    .string()
    .trim()
    .min(1, "Código do produto é obrigatório"),

  quantity: z.coerce
    .number()
    .int("A quantidade deve ser um número inteiro")
    .min(0, "A quantidade não pode ser negativa"),

  min_quantity: z.coerce
    .number()
    .int("A quantidade mínima deve ser um número inteiro")
    .min(0, "A quantidade mínima não pode ser negativa"),

  location: z
    .string()
    .trim()
    .min(1, "Localização é obrigatória"),
});

type UpdateProductFormData = z.infer<
  typeof updateProductFormSchema
>;

export const UpdateDialogProducts = ({
  id,
}: UpdateDialogProductsProps) => {
  const {
    handleUpdateProduct,
    listProduct,
  } = useStockProduct();

  const productToUpdate = listProduct.find(
    (product) => product.id === id,
  );

  const {
    register,
    handleSubmit,
    reset,
    formState: {
      errors,
      isSubmitting,
    },
  } = useForm<UpdateProductFormData>({
    resolver: zodResolver(
      updateProductFormSchema,
    ) as unknown as Resolver<UpdateProductFormData>,

    defaultValues: {
      product_category_id: 0,
      control_level: "FREE",
      item_name: "",
      unit: "",
      sector_name: "",
      code: "",
      quantity: 0,
      min_quantity: 0,
      location: "",
    },
  });

  /*
   * Quando o produto for encontrado na lista,
   * carregamos seus dados no formulário.
   */
  useEffect(() => {
    if (!productToUpdate) return;

    reset({
      product_category_id:
        productToUpdate.product_category_id,

      control_level:
        productToUpdate.control_level,

      item_name:
        productToUpdate.item_name,

      unit:
        productToUpdate.unit,

      sector_name:
        productToUpdate.sector_name,

      code:
        productToUpdate.code,

      quantity:
        productToUpdate.quantity,

      min_quantity:
        productToUpdate.min_quantity,

      location:
        productToUpdate.location,
    });
  }, [productToUpdate, reset]);

  const updateProduct = async (
    data: UpdateProductFormData,
  ) => {
    try {
      await handleUpdateProduct({
        id,
        ...data,
      });

      reset();
    } catch (error) {
      console.error(
        error,
        "Erro ao atualizar produto",
      );
    }
  };

  if (!productToUpdate) {
    return (
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            Produto não encontrado
          </DialogTitle>

          <DialogDescription>
            Não foi possível encontrar o produto
            selecionado.
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    );
  }

  return (
    <DialogContent className="w-full max-w-3xl">
      <DialogHeader>
        <DialogTitle>
          Atualizar produto
        </DialogTitle>

        <DialogDescription>
          Altere as informações do produto e salve
          as alterações.
        </DialogDescription>
      </DialogHeader>

      <form
        onSubmit={handleSubmit(updateProduct)}
        className="space-y-6"
      >
        {/* Informações principais */}
        <div className="space-y-4">
          <div>
            <h3 className="text-lg font-semibold">
              Informações do produto
            </h3>

            <p className="text-sm text-gray-500">
              Atualize os dados de identificação do
              produto.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {/* Nome */}
            <label className="text-sm font-medium text-gray-700 md:col-span-2">
              Nome do produto

              <Input
                className="mt-1"
                placeholder="Ex.: Chapa de aço"
                {...register("item_name")}
              />

              {errors.item_name && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.item_name.message}
                </p>
              )}
            </label>

            {/* Código */}
            <label className="text-sm font-medium text-gray-700">
              Código

              <Input
                className="mt-1"
                placeholder="Ex.: MAT-001"
                {...register("code")}
              />

              {errors.code && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.code.message}
                </p>
              )}
            </label>

            {/* Categoria */}
            <label className="text-sm font-medium text-gray-700">
              ID da categoria

              <Input
                className="mt-1"
                type="number"
                min={1}
                {...register(
                  "product_category_id",
                )}
              />

              {errors.product_category_id && (
                <p className="mt-1 text-sm text-red-600">
                  {
                    errors.product_category_id
                      .message
                  }
                </p>
              )}
            </label>

            {/* Unidade */}
            <label className="text-sm font-medium text-gray-700">
              Unidade

              <Input
                className="mt-1"
                placeholder="Ex.: UN, KG, M, CX"
                {...register("unit")}
              />

              {errors.unit && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.unit.message}
                </p>
              )}
            </label>

            {/* Setor */}
            <label className="text-sm font-medium text-gray-700">
              Setor

              <Input
                className="mt-1"
                placeholder="Ex.: Produção"
                {...register("sector_name")}
              />

              {errors.sector_name && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.sector_name.message}
                </p>
              )}
            </label>

            {/* Localização */}
            <label className="text-sm font-medium text-gray-700">
              Localização

              <Input
                className="mt-1"
                placeholder="Ex.: Galpão A - Prateleira 03"
                {...register("location")}
              />

              {errors.location && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.location.message}
                </p>
              )}
            </label>

            {/* Nível de controle */}
            <label className="text-sm font-medium text-gray-700">
              Nível de controle

              <select
                className="mt-1 flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm shadow-sm"
                {...register("control_level")}
              >
                <option value="FREE">
                  Livre
                </option>

                <option value="RESTRICTED">
                  Restrito
                </option>
              </select>

              {errors.control_level && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.control_level.message}
                </p>
              )}
            </label>
          </div>
        </div>

        {/* Controle de estoque */}
        <div className="space-y-4">
          <div>
            <h3 className="text-lg font-semibold">
              Controle de estoque
            </h3>

            <p className="text-sm text-gray-500">
              Atualize as quantidades relacionadas ao
              estoque.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {/* Quantidade */}
            <label className="text-sm font-medium text-gray-700">
              Quantidade atual

              <Input
                className="mt-1"
                type="number"
                min={0}
                {...register("quantity")}
              />

              {errors.quantity && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.quantity.message}
                </p>
              )}
            </label>

            {/* Quantidade mínima */}
            <label className="text-sm font-medium text-gray-700">
              Quantidade mínima

              <Input
                className="mt-1"
                type="number"
                min={0}
                {...register("min_quantity")}
              />

              {errors.min_quantity && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.min_quantity.message}
                </p>
              )}
            </label>
          </div>
        </div>

        <DialogFooter>
          <Button
            type="submit"
            disabled={isSubmitting}
            className="bg-base-blue text-white hover:bg-base-blue-hover"
          >
            {isSubmitting
              ? "Atualizando..."
              : "Atualizar produto"}
          </Button>
        </DialogFooter>
      </form>
    </DialogContent>
  );
};

