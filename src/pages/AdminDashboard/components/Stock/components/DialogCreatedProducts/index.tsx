
import { useForm, type Resolver } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  PackagePlus,
  Boxes,
  MapPin,
  ShieldCheck,
  ClipboardList,
} from "lucide-react";

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
  category_id: z.coerce
    .number()
    .int("Selecione uma categoria válida")
    .min(1, "Categoria do produto é obrigatória"),

  control_level: z.enum(["FREE", "RESTRICTED"], {
    message: "Nível de controle é obrigatório",
  }),

  item_name: z.string().trim().min(1, "Nome do produto é obrigatório"),
  unit: z.string().trim().min(1, "Unidade é obrigatória"),
  sector_name: z.string().trim().min(1, "Setor é obrigatório"),
  code: z.string().trim().min(1, "Código do produto é obrigatório"),

  quantity: z.coerce
    .number()
    .int("A quantidade deve ser um número inteiro")
    .min(0, "A quantidade não pode ser negativa"),

  min_quantity: z.coerce
    .number()
    .int("A quantidade mínima deve ser um número inteiro")
    .min(0, "A quantidade mínima não pode ser negativa"),

  location: z.string().trim().min(1, "Localização é obrigatória"),
});

type FormValues = z.infer<typeof schema>;

const inputClassName =
  "mt-1.5 h-11 w-full rounded-lg border-gray-200 bg-white shadow-sm transition-colors focus-visible:ring-2 focus-visible:ring-base-blue/20";

const selectClassName =
  "mt-1.5 flex h-11 w-full rounded-lg border border-gray-200 bg-white px-3 text-sm shadow-sm outline-none transition-colors focus:border-base-blue focus:ring-2 focus:ring-base-blue/20";

export const DialogCreatedProducts = () => {
  const {
    handleCreateProduct,
    productCategories,
    sectionsCategories,
  } = useStockProduct();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    resolver: zodResolver(schema) as unknown as Resolver<FormValues>,
    defaultValues: {
      category_id: 0,
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

  const onSubmit = async (data: FormValues) => {
    try {
      await handleCreateProduct(data);
      reset();
    } catch (error) {
      console.error("Erro ao cadastrar produto:", error);
    }
  };

  return (
    <DialogContent className="flex max-h-[90vh] w-[calc(100%-2rem)] min-w-4xl flex-col gap-0 overflow-hidden rounded-2xl p-0">
      <DialogHeader className=" mt-5 px-6 py-5 sm:px-8">
        <div className="flex items-start gap-3">

          <div className="space-y-1">
            <DialogTitle className="text-2xl font-semibold tracking-tight text-gray-900">
              Adicionar produto
            </DialogTitle>

            <DialogDescription className="text-sm leading-relaxed text-gray-500">
              Cadastre as informações do produto e configure seu controle de
              estoque.
            </DialogDescription>
          </div>
        </div>
      </DialogHeader>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="min-h-0 space-y-7 overflow-y-auto px-6 py-6 sm:px-8"
      >
        {/* Informações do produto */}
        <section className="space-y-4">
          <div className="flex items-center gap-2 border-b pb-3">
            <ClipboardList className="size-5 text-base-blue" />

            <div>
              <h3 className="font-semibold text-gray-900">
                Informações do produto
              </h3>
              <p className="text-xs text-gray-500">
                Identificação e classificação do item.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="space-y-1 sm:col-span-2">
              <label
                htmlFor="item_name"
                className="text-sm font-medium text-gray-700"
              >
                Nome do produto <span className="text-red-500">*</span>
              </label>

              <Input
                id="item_name"
                placeholder="Ex.: Chapa de aço"
                className={inputClassName}
                aria-invalid={!!errors.item_name}
                {...register("item_name")}
              />

              {errors.item_name && (
                <p className="text-xs text-red-600">
                  {errors.item_name.message}
                </p>
              )}
            </div>

            <div className="space-y-1">
              <label
                htmlFor="code"
                className="text-sm font-medium text-gray-700"
              >
                Código do produto <span className="text-red-500">*</span>
              </label>

              <Input
                id="code"
                placeholder="Ex.: MAT-001"
                className={inputClassName}
                aria-invalid={!!errors.code}
                {...register("code")}
              />

              {errors.code && (
                <p className="text-xs text-red-600">
                  {errors.code.message}
                </p>
              )}
            </div>

            <div className="space-y-1">
              <label
                htmlFor="category_id"
                className="text-sm font-medium text-gray-700"
              >
                Categoria <span className="text-red-500">*</span>
              </label>

              <select
                id="category_id"
                className={selectClassName}
                aria-invalid={!!errors.category_id}
                {...register("category_id")}
              >
                <option value="">Selecione uma categoria</option>

                {productCategories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>

              {errors.category_id && (
                <p className="text-xs text-red-600">
                  {errors.category_id.message}
                </p>
              )}
            </div>

            <div className="space-y-1">
              <label
                htmlFor="unit"
                className="text-sm font-medium text-gray-700"
              >
                Unidade de medida <span className="text-red-500">*</span>
              </label>

              <Input
                id="unit"
                placeholder="Ex.: UN, KG, M, CX"
                className={inputClassName}
                aria-invalid={!!errors.unit}
                {...register("unit")}
              />

              {errors.unit && (
                <p className="text-xs text-red-600">
                  {errors.unit.message}
                </p>
              )}
            </div>

            <div className="space-y-1">
              <label
                htmlFor="sector_name"
                className="text-sm font-medium text-gray-700"
              >
                Setor <span className="text-red-500">*</span>
              </label>

              <select
                id="sector_name"
                className={selectClassName}
                aria-invalid={!!errors.sector_name}
                {...register("sector_name")}
              >
                <option value="">Selecione um setor</option>

                {sectionsCategories.map((section) => (
                  <option key={section.name} value={section.name}>
                    {section.name}
                  </option>
                ))}
              </select>

              {errors.sector_name && (
                <p className="text-xs text-red-600">
                  {errors.sector_name.message}
                </p>
              )}
            </div>
          </div>
        </section>

        {/* Localização e acesso */}
        <section className="space-y-4">
          <div className="flex items-center gap-2 border-b pb-3">
            <MapPin className="size-5 text-base-blue" />

            <div>
              <h3 className="font-semibold text-gray-900">
                Localização e acesso
              </h3>
              <p className="text-xs text-gray-500">
                Informe onde o item fica armazenado e seu nível de controle.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="space-y-1">
              <label
                htmlFor="location"
                className="text-sm font-medium text-gray-700"
              >
                Localização física <span className="text-red-500">*</span>
              </label>

              <Input
                id="location"
                placeholder="Ex.: Galpão A - Prateleira 03"
                className={inputClassName}
                aria-invalid={!!errors.location}
                {...register("location")}
              />

              {errors.location && (
                <p className="text-xs text-red-600">
                  {errors.location.message}
                </p>
              )}
            </div>

            <div className="space-y-1">
              <label
                htmlFor="control_level"
                className="flex items-center gap-1.5 text-sm font-medium text-gray-700"
              >
                <ShieldCheck className="size-4 text-gray-400" />
                Nível de controle <span className="text-red-500">*</span>
              </label>

              <select
                id="control_level"
                className={selectClassName}
                aria-invalid={!!errors.control_level}
                {...register("control_level")}
              >
                <option value="FREE">Livre</option>
                <option value="RESTRICTED">Restrito</option>
              </select>

              {errors.control_level && (
                <p className="text-xs text-red-600">
                  {errors.control_level.message}
                </p>
              )}

              <p className="text-xs leading-relaxed text-gray-500">
                Defina se a retirada do item é livre ou exige controle.
              </p>
            </div>
          </div>
        </section>

        {/* Controle de estoque */}
        <section className="space-y-4">
          <div className="flex items-center gap-2 border-b pb-3">
            <Boxes className="size-5 text-base-blue" />

            <div>
              <h3 className="font-semibold text-gray-900">
                Controle de estoque
              </h3>
              <p className="text-xs text-gray-500">
                Defina o saldo inicial e o limite mínimo desejado.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="space-y-1">
              <label
                htmlFor="quantity"
                className="text-sm font-medium text-gray-700"
              >
                Quantidade inicial <span className="text-red-500">*</span>
              </label>

              <Input
                id="quantity"
                type="number"
                min={0}
                step={1}
                className={inputClassName}
                aria-invalid={!!errors.quantity}
                {...register("quantity")}
              />

              {errors.quantity && (
                <p className="text-xs text-red-600">
                  {errors.quantity.message}
                </p>
              )}
            </div>

            <div className="space-y-1">
              <label
                htmlFor="min_quantity"
                className="text-sm font-medium text-gray-700"
              >
                Estoque mínimo <span className="text-red-500">*</span>
              </label>

              <Input
                id="min_quantity"
                type="number"
                min={0}
                step={1}
                className={inputClassName}
                aria-invalid={!!errors.min_quantity}
                {...register("min_quantity")}
              />

              {errors.min_quantity && (
                <p className="text-xs text-red-600">
                  {errors.min_quantity.message}
                </p>
              )}

              <p className="text-xs text-gray-500">
                Use esse limite para identificar quando será necessário repor
                o produto.
              </p>
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
                <span className="mr-2 size-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                Cadastrando...
              </>
            ) : (
              <>
                <PackagePlus className="mr-2 size-4" />
                Cadastrar produto
              </>
            )}
          </Button>
        </DialogFooter>
      </form>
    </DialogContent>
  );
};