
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

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { useStockProduct } from "@/hooks/useStockProduct";

const schema = z.object({
  name: z
    .string()
    .trim()
    .min(1, "Nome da categoria é obrigatório"),

  category_section_id: z.coerce
    .number()
    .int("Selecione um setor válido")
    .min(1, "O setor é obrigatório"),
});

type FormValues = z.infer<typeof schema>;

export const DialogCreatedProductCategory = () => {
  const {
    handleCreateProductCategory,
    sectionsCategories,
  } = useStockProduct();

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    resolver: zodResolver(schema) as unknown as Resolver<FormValues>,
    defaultValues: {
      name: "",
      category_section_id: 0,
    },
  });

  const selectedSection = watch("category_section_id");

  const onSubmit = async (data: FormValues) => {
    try {
      await handleCreateProductCategory(data);

      reset();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <DialogContent className="w-full sm:max-w-lg">
      <DialogHeader className="mb-4">
        <DialogTitle className="text-2xl">
          Adicionar categoria de produto
        </DialogTitle>

        <DialogDescription>
          Cadastre uma categoria e vincule-a ao setor correspondente
          do estoque.
        </DialogDescription>
      </DialogHeader>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-6"
      >
        <div className="space-y-4">
          {/* Nome da categoria */}
          <label className="block text-sm font-medium text-gray-700">
            Nome da categoria

            <Input
              className="mt-1"
              placeholder="Ex.: Ferramentas, Equipamentos"
              {...register("name")}
            />

            {errors.name && (
              <p className="mt-1 text-sm text-red-600">
                {errors.name.message}
              </p>
            )}
          </label>

          {/* Setor vinculado */}
          <div className="space-y-1">
            <label className="text-sm font-medium text-gray-700">
              Setor do estoque
            </label>

            <Select
              value={
                selectedSection > 0
                  ? String(selectedSection)
                  : ""
              }
              onValueChange={(value) => {
                setValue("category_section_id", Number(value), {
                  shouldValidate: true,
                  shouldDirty: true,
                });
              }}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Selecione o setor" />
              </SelectTrigger>

              <SelectContent>
                {sectionsCategories.map((section) => (
                  <SelectItem
                    key={section.id}
                    value={String(section.id)}
                  >
                    {section.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {errors.category_section_id && (
              <p className="mt-1 text-sm text-red-600">
                {errors.category_section_id.message}
              </p>
            )}
          </div>
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

