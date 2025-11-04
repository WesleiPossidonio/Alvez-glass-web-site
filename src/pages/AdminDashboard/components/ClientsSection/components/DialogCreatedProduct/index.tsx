import { useEffect } from "react";
import { useForm, useFieldArray, type Resolver } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

// 🧩 Schema Zod (idêntico ao do backend com Yup)
const schema = z.object({
  client_id: z.string().uuid("ID do cliente inválido").nonempty("Obrigatório"),
  order_number: z.string().nonempty("Número do pedido é obrigatório"),
  status_description: z.string().nonempty("Descrição do status é obrigatória"),
  status: z.string().nonempty("Status é obrigatório"),
  total: z.coerce.number().min(0, "Total inválido"),

  products: z
    .array(
      z.object({
        product_name: z.string().nonempty("Nome do produto é obrigatório"),
        quantity: z.coerce.number().min(1, "Quantidade obrigatória"),
        price: z.coerce.number().min(0, "Preço obrigatório"),
      })
    )
    .min(1, "Adicione pelo menos 1 produto"),
});

type FormValues = z.infer<typeof schema>;

export const OrderForm = () => {
  const {
    register,
    control,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(schema) as unknown as Resolver<FormValues>,
    defaultValues: {
      client_id: "",
      order_number: "",
      status_description: "",
      status: "",
      total: 0,
      products: [{ product_name: "", quantity: 1, price: 0 }],
    },
  });

  const { fields, append } = useFieldArray({
    control,
    name: "products",
  });

  const products = watch("products");

  // 👀 Adiciona nova linha automaticamente quando a última estiver completa
  useEffect(() => {
    const last = products[products.length - 1];
    const allFilled =
      last.product_name.trim() !== "" && last.quantity > 0 && last.price > 0;

    if (allFilled) append({ product_name: "", quantity: 1, price: 0 });
  }, [products, append]);

  const onSubmit = (data: FormValues) => {
    const filteredProducts = data.products.filter(
      (p) => p.product_name && p.quantity > 0 && p.price > 0
    );

    const payload = { ...data, products: filteredProducts };

    console.log("📦 Enviando payload:", payload);
    alert(`Pedido com ${filteredProducts.length} produtos enviado!`);
    reset();
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="max-w-5xl mx-auto bg-white p-8 rounded-xl shadow space-y-6"
    >
      <h2 className="text-xl font-semibold">Cadastro de Pedido</h2>

      {/* 🧾 Campos principais */}
      <div className="grid grid-cols-2 gap-6">
        <div>
          <Input placeholder="Client ID" {...register("client_id")} />
          {errors.client_id && (
            <p className="text-red-600 text-sm mt-1">
              {errors.client_id.message}
            </p>
          )}
        </div>

        <div>
          <Input placeholder="Número do Pedido" {...register("order_number")} />
          {errors.order_number && (
            <p className="text-red-600 text-sm mt-1">
              {errors.order_number.message}
            </p>
          )}
        </div>

        <div>
          <Input
            placeholder="Descrição do Status"
            {...register("status_description")}
          />
          {errors.status_description && (
            <p className="text-red-600 text-sm mt-1">
              {errors.status_description.message}
            </p>
          )}
        </div>

        <div>
          <Input placeholder="Status" {...register("status")} />
          {errors.status && (
            <p className="text-red-600 text-sm mt-1">
              {errors.status.message}
            </p>
          )}
        </div>

        <div>
          <Input
            type="number"
            placeholder="Total"
            {...register("total", { valueAsNumber: true })}
          />
          {errors.total && (
            <p className="text-red-600 text-sm mt-1">
              {errors.total.message}
            </p>
          )}
        </div>
      </div>

      {/* 🛒 Lista de Produtos */}
      <div className="mt-10 space-y-4">
        <h3 className="text-lg font-medium">Produtos</h3>

        {fields.map((field, index) => (
          <div
            key={field.id}
            className="grid grid-cols-3 gap-4 p-4 border rounded-md bg-gray-50"
          >
            <div>
              <Input
                placeholder="Nome do Produto"
                {...register(`products.${index}.product_name` as const)}
              />
              {errors.products?.[index]?.product_name && (
                <p className="text-red-600 text-sm mt-1">
                  {errors.products[index]?.product_name?.message}
                </p>
              )}
            </div>

            <div>
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
            </div>

            <div>
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
            </div>
          </div>
        ))}
      </div>

      {errors.products && (
        <p className="text-red-600 text-sm mt-2">{errors.products.message}</p>
      )}

      <div className="flex justify-end pt-4">
        <Button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 text-white py-6 font-semibold"
        >
          Enviar Pedido
        </Button>
      </div>
    </form>
  );
};
