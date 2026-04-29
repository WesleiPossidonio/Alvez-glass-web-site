import { useForm, useFieldArray, type Resolver } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { DialogContent } from "@/components/ui/dialog";
import { Plus, Trash2 } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { useOrderProduct } from "@/hooks/useOrderProducts";
import { useWatch } from "react-hook-form";
interface Product {
  product_name: string;
  quantity: number;
  price: number;
}

interface UpdateOrderFormDialogProps {
  id: string;
}

// 🧩 Schema Zod (igual ao backend)
const schema = z.object({
  client_id: z.string().uuid("ID do cliente inválido").nonempty("Obrigatório"),
  order_number: z.string().nonempty("Número do pedido é obrigatório"),
  status_description: z.string().nonempty("Descrição do status é obrigatória"),
  status: z.string().nonempty("Status é obrigatório"),
  products: z
    .array(
      z.object({
        product_name: z.string().nonempty("Nome do produto é obrigatório"),
        quantity: z.coerce.number().min(1, "Quantidade obrigatória"),
        price: z.coerce.number().min(0, "Preço obrigatório"),
      }),
    )
    .min(1, "Adicione pelo menos 1 produto"),
});

type FormValues = z.infer<typeof schema>;

export const UpdateOrderFormDialog = ({ id }: UpdateOrderFormDialogProps) => {
  const { listOrderProduct } = useOrderProduct();
  const orderToUpdate = listOrderProduct.find((order) => order.id === id);

  const {
    register,
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(schema) as unknown as Resolver<FormValues>,
    defaultValues: {
      client_id: orderToUpdate?.client_id || "",
      order_number: orderToUpdate?.order_number || "",
      status_description: orderToUpdate?.status_description || "",
      status: orderToUpdate?.status || "",
      products: orderToUpdate?.products?.length
        ? orderToUpdate.products.map((p: Product) => ({
            product_name: p.product_name || "",
            quantity: p.quantity || 1,
            price: p.price || 0,
          }))
        : [{ product_name: "", quantity: 1, price: 0 }],
    },
  });

  const products = useWatch({
    control,
    name: "products",
  });

  const { handleUpdateOrderProduct } = useOrderProduct();
  const { fields, append, remove } = useFieldArray({
    control,
    name: "products",
  });

  const total = (products || []).reduce((acc, product) => {
    return acc + product.quantity * product.price;
  }, 0);

  const onSubmit = (data: FormValues) => {
    const payload = {
      id: id,
      ...data,
      products: data.products
        .filter((p) => p.product_name && p.quantity > 0 && p.price > 0)
        .map((p) => ({
          ...p,
          id: orderToUpdate?.id || "",
        })),
    };

    handleUpdateOrderProduct(payload);
    reset();
  };

  return (
    <DialogContent
      className="w-full h-full md:max-w-[90vw] md:h-[90vh] flex 
    items-center justify-center p-0"
    >
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full h-full flex flex-col overflow-y-auto bg-white 
        p-8 rounded-xl shadow space-y-6 relative"
      >
        <div>
          <h2 className="text-2xl font-semibold">Atualizar status do pedido</h2>
          <p>Atualize o status do pedido abaixo</p>
        </div>
        {/* 🧾 Campos principais */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <label className="text-sm font-medium text-gray-700">
            Número do Pedido
            <Input
              placeholder="Número do Pedido"
              {...register("order_number")}
            />
            {errors.order_number && (
              <p className="text-red-600 text-sm mt-1">
                {errors.order_number.message}
              </p>
            )}
          </label>

          <div
            className="w-44 h-18 p-2 rounded-md space-y-0.5 absolute top-18 
            right-15 bg-base-blue "
          >
            <p className="text-sm text-white font-semibold">Total do Pedido</p>
            <div className="text-2xl font-bold text-white">
              R$ {total.toFixed(2)}
            </div>
          </div>

          <label>
            <Input placeholder="Status" {...register("status")} />
            {errors.status && (
              <p className="text-red-600 text-sm mt-1">
                {errors.status.message}
              </p>
            )}
          </label>

          <label className="text-sm font-medium text-gray-700">
            Descrição do Status
            <Textarea
              placeholder="Descrição do Status"
              {...register("status_description")}
            />
            {errors.status_description && (
              <p className="text-red-600 text-sm mt-1">
                {errors.status_description.message}
              </p>
            )}
          </label>
        </div>

        {/* 🛒 Lista de Produtos */}
        <div className="mt-10 space-y-4 flex-1">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-medium">Produtos</h3>
            <Button
              type="button"
              variant="outline"
              onClick={() =>
                append({ product_name: "", quantity: 1, price: 0 })
              }
              className="flex items-center gap-2"
            >
              <Plus size={16} /> Adicionar Produto
            </Button>
          </div>

          {fields.map((field, index) => (
            <div
              key={field.id}
              className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 border 
              rounded-md  bg-gray-50 relative"
            >
              <label className="text-sm font-medium text-gray-700">
                Nome do Produto
                <Input
                  placeholder="Nome do Produto"
                  {...register(`products.${index}.product_name` as const)}
                />
                {errors.products?.[index]?.product_name && (
                  <p className="text-red-600 text-sm mt-1">
                    {errors.products[index]?.product_name?.message}
                  </p>
                )}
              </label>

              <label className="text-sm font-medium text-gray-700">
                Quantidade
                <Input
                  type="number"
                  placeholder="Quantidade"
                  {...register(`products.${index}.quantity` as const, {
                    valueAsNumber: true,
                  })}
                />
                {errors.products?.[index]?.quantity && (
                  <p className="text-red-600 text-sm mt-1">
                    {errors.products[index]?.quantity?.message}
                  </p>
                )}
              </label>

              <label className="text-sm font-medium text-gray-700">
                Preço
                <Input
                  type="number"
                  placeholder="Preço"
                  {...register(`products.${index}.price` as const, {
                    valueAsNumber: true,
                  })}
                />
                {errors.products?.[index]?.price && (
                  <p className="text-red-600 text-sm mt-1">
                    {errors.products[index]?.price?.message}
                  </p>
                )}
              </label>

              {fields.length > 1 && (
                <button
                  type="button"
                  onClick={() => remove(index)}
                  className="absolute top-2 right-2 text-red-600
                   hover:text-red-800"
                >
                  <Trash2 size={18} />
                </button>
              )}
            </div>
          ))}

          {errors.products && (
            <p className="text-red-600 text-sm mt-2">
              {errors.products.message}
            </p>
          )}
        </div>

        <div className="flex justify-end pt-4">
          <Button
            type="submit"
            className="bg-base-blue hover:bg-base-blue-hover 
            text-white py-6 font-semibold cursor-pointer"
          >
            Enviar Pedido
          </Button>
        </div>
      </form>
    </DialogContent>
  );
};
