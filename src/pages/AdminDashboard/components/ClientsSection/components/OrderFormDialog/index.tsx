
import { useRef, useState } from "react";
import {
  useForm,
  useFieldArray,
  useWatch,
  type Resolver,
} from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  ClipboardList,
  MapPin,
  PackagePlus,
  Plus,
  Trash2,
  LoaderCircle,
  ShoppingCart,
  CircleDollarSign,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { useOrderProduct } from "@/hooks/useOrderProducts";

interface OrderFormDialogProps {
  clientId: string;
}

interface AddressResponse {
  cep: string;
  logradouro: string;
  complemento: string;
  bairro: string;
  localidade: string;
  uf: string;
  erro?: boolean;
}

const productSchema = z.object({
  product_name: z
    .string()
    .trim()
    .min(1, "Nome do serviço é obrigatório"),

  quantity: z.coerce
    .number()
    .int("A quantidade deve ser um número inteiro")
    .min(1, "A quantidade mínima é 1")
    .refine(Number.isFinite, "Informe uma quantidade válida"),

  unit_price: z.coerce
    .number()
    .min(0, "O preço não pode ser negativo")
    .refine(Number.isFinite, "Informe um preço válido"),
});

const schema = z.object({
  order_number: z
    .string()
    .trim()
    .min(1, "Número do pedido é obrigatório"),

  status_description: z
    .string()
    .trim()
    .min(1, "Descrição do status é obrigatória"),

  status: z.string().trim().min(1, "Status é obrigatório"),

  products: z
    .array(productSchema)
    .min(1, "Adicione pelo menos um serviço"),

  address: z.object({
    rua: z.string().trim().min(3, "Rua obrigatória"),

    number_house: z
      .string()
      .trim()
      .min(1, "Número obrigatório"),

    bairro: z.string().trim().min(3, "Bairro obrigatório"),

    cidade: z.string().trim().min(3, "Cidade obrigatória"),

    uf: z
      .string()
      .trim()
      .transform((value) => value.toUpperCase())
      .pipe(
        z.string().regex(
          /^[A-Z]{2}$/,
          "Informe uma UF válida",
        ),
      ),

    cep: z
      .string()
      .transform((value) => value.replace(/\D/g, ""))
      .pipe(
        z.string().length(8, "Informe um CEP válido com 8 dígitos"),
      ),
  }),
});

type FormValues = z.infer<typeof schema>;

const inputClassName =
  "mt-1.5 h-11 rounded-lg border-gray-200 bg-white shadow-sm focus-visible:ring-2 focus-visible:ring-base-blue/20";

const formatCurrency = (value: number) =>
  new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(value);

const formatCep = (value: string) => {
  const digits = value.replace(/\D/g, "").slice(0, 8);

  if (digits.length <= 5) {
    return digits;
  }

  return `${digits.slice(0, 5)}-${digits.slice(5)}`;
};

export const OrderFormDialog = ({
  clientId,
}: OrderFormDialogProps) => {
  const { handleCreateOrderProduct } = useOrderProduct();

  const [submitError, setSubmitError] = useState("");
  const [isSearchingCep, setIsSearchingCep] = useState(false);
  const [cepMessage, setCepMessage] = useState("");
  const [cepMessageType, setCepMessageType] = useState<
    "success" | "error" | ""
  >("");

  // Identifica a consulta mais recente para evitar respostas antigas.
  const cepRequestId = useRef(0);

  const {
    register,
    control,
    handleSubmit,
    reset,
    setValue,
    getValues,
    setError,
    clearErrors,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    resolver: zodResolver(schema) as unknown as Resolver<FormValues>,

    defaultValues: {
      order_number: "",
      status_description: "",
      status: "",

      products: [
        {
          product_name: "",
          quantity: 1,
          unit_price: 0,
        },
      ],

      address: {
        rua: "",
        number_house: "",
        bairro: "",
        cidade: "",
        uf: "",
        cep: "",
      },
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "products",
  });

  const products = useWatch({
    control,
    name: "products",
  });

  const total = (products ?? []).reduce((acc, product) => {
    const quantity = Number(product?.quantity) || 0;
    const unitPrice = Number(product?.unit_price) || 0;

    return acc + quantity * unitPrice;
  }, 0);

  const searchCep = async (cep: string) => {
    const cleanCep = cep.replace(/\D/g, "");
    const requestId = ++cepRequestId.current;

    setCepMessage("");
    setCepMessageType("");

    if (!cleanCep) {
      setIsSearchingCep(false);
      clearErrors("address.cep");
      return;
    }

    if (cleanCep.length !== 8) {
      setIsSearchingCep(false);

      setError("address.cep", {
        type: "manual",
        message: "Digite os 8 dígitos do CEP.",
      });

      return;
    }

    clearErrors("address.cep");
    setIsSearchingCep(true);

    try {
      const response = await fetch(
        `https://viacep.com.br/ws/${cleanCep}/json/`,
      );

      if (!response.ok) {
        throw new Error("Falha na consulta do CEP.");
      }

      const data: AddressResponse = await response.json();

      // Ignora a resposta se outra consulta foi iniciada.
      if (requestId !== cepRequestId.current) {
        return;
      }

      // Confere se o usuário não alterou o CEP durante a consulta.
      const currentCep = getValues("address.cep").replace(/\D/g, "");

      if (currentCep !== cleanCep) {
        return;
      }

      if (data.erro) {
        setError("address.cep", {
          type: "manual",
          message: "CEP não encontrado.",
        });

        setCepMessage("Verifique o CEP informado.");
        setCepMessageType("error");
        return;
      }

      setValue(
        "address.rua",
        data.logradouro || getValues("address.rua"),
        { shouldValidate: true, shouldDirty: true },
      );

      setValue(
        "address.bairro",
        data.bairro || getValues("address.bairro"),
        { shouldValidate: true, shouldDirty: true },
      );

      setValue(
        "address.cidade",
        data.localidade || getValues("address.cidade"),
        { shouldValidate: true, shouldDirty: true },
      );

      setValue(
        "address.uf",
        data.uf || getValues("address.uf"),
        { shouldValidate: true, shouldDirty: true },
      );

      setCepMessage(
        "Endereço localizado. Confira os dados antes de continuar.",
      );
      setCepMessageType("success");
    } catch (error) {
      if (requestId !== cepRequestId.current) {
        return;
      }

      console.error("Erro ao consultar CEP:", error);

      setCepMessage(
        "Não foi possível consultar o CEP. Preencha o endereço manualmente.",
      );
      setCepMessageType("error");
    } finally {
      if (requestId === cepRequestId.current) {
        setIsSearchingCep(false);
      }
    }
  };

  const onSubmit = async (data: FormValues) => {
    setSubmitError("");

    // Invalida qualquer consulta de CEP ainda pendente.
    cepRequestId.current += 1;
    setIsSearchingCep(false);

    const payload = {
      ...data,
      client_id: clientId,

      products: data.products.map((product) => ({
        ...product,
        product_name: product.product_name.trim(),
        quantity: Number(product.quantity),
        unit_price: Number(product.unit_price),
      })),

      address: {
        ...data.address,
        cep: data.address.cep.replace(/\D/g, ""),
        uf: data.address.uf.toUpperCase(),
      },
    };

    try {
      await handleCreateOrderProduct(payload);

      reset();
      setCepMessage("");
      setCepMessageType("");
      setSubmitError("");
    } catch (error) {
      console.error("Erro ao cadastrar pedido:", error);

      setSubmitError(
        "Não foi possível cadastrar o pedido. Confira os dados e tente novamente.",
      );
    }
  };

  return (
    <DialogContent className="flex max-h-[90vh] w-[calc(100%-2rem)] max-w-4xl flex-col gap-0 overflow-hidden rounded-2xl p-0 md:max-w-3/5">
      <DialogHeader className="mt-5 border-b bg-gray-50/80 px-6 py-5 sm:px-8">
        <div className="flex items-start gap-3">
          <div className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-blue-100 text-base-blue">
            <PackagePlus className="size-5" />
          </div>

          <div className="space-y-1">
            <DialogTitle className="text-2xl font-semibold tracking-tight text-gray-900">
              Cadastrar pedido
            </DialogTitle>

            <DialogDescription className="text-sm leading-relaxed text-gray-500">
              Informe os dados do pedido, o endereço de entrega e os serviços.
            </DialogDescription>
          </div>
        </div>
      </DialogHeader>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="min-h-0 space-y-7 overflow-y-auto px-6 py-6 sm:px-8"
        noValidate
      >
        {/* Dados do pedido */}
        <section className="space-y-4">
          <div className="flex items-center gap-2 border-b pb-3">
            <ClipboardList className="size-5 text-base-blue" />

            <div>
              <h3 className="font-semibold text-gray-900">
                Dados do pedido
              </h3>

              <p className="text-xs text-gray-500">
                Identificação e acompanhamento do pedido.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="space-y-1">
              <label
                htmlFor="order_number"
                className="text-sm font-medium text-gray-700"
              >
                Número do pedido <span className="text-red-500">*</span>
              </label>

              <Input
                id="order_number"
                placeholder="Ex.: PED-001"
                className={inputClassName}
                aria-invalid={!!errors.order_number}
                {...register("order_number")}
              />

              {errors.order_number && (
                <p className="text-xs text-red-600">
                  {errors.order_number.message}
                </p>
              )}
            </div>

            <div className="space-y-1">
              <label
                htmlFor="status"
                className="text-sm font-medium text-gray-700"
              >
                Status <span className="text-red-500">*</span>
              </label>

              <Input
                id="status"
                placeholder="Ex.: Em produção"
                className={inputClassName}
                aria-invalid={!!errors.status}
                {...register("status")}
              />

              {errors.status && (
                <p className="text-xs text-red-600">
                  {errors.status.message}
                </p>
              )}
            </div>

            <div className="space-y-1 sm:col-span-2">
              <label
                htmlFor="status_description"
                className="text-sm font-medium text-gray-700"
              >
                Descrição do status <span className="text-red-500">*</span>
              </label>

              <Textarea
                id="status_description"
                placeholder="Descreva a situação atual do pedido..."
                className="mt-1.5 min-h-24 resize-y rounded-lg border-gray-200 shadow-sm focus-visible:ring-2 focus-visible:ring-base-blue/20"
                aria-invalid={!!errors.status_description}
                {...register("status_description")}
              />

              {errors.status_description && (
                <p className="text-xs text-red-600">
                  {errors.status_description.message}
                </p>
              )}
            </div>
          </div>
        </section>

        {/* Endereço de entrega */}
        <section className="space-y-4">
          <div className="flex items-center gap-2 border-b pb-3">
            <MapPin className="size-5 text-base-blue" />

            <div>
              <h3 className="font-semibold text-gray-900">
                Endereço de entrega
              </h3>

              <p className="text-xs text-gray-500">
                Informe o local de entrega do pedido.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {/* CEP */}
            <div className="space-y-1">
              <label
                htmlFor="address.cep"
                className="text-sm font-medium text-gray-700"
              >
                CEP <span className="text-red-500">*</span>
              </label>

              <div className="relative">
                <Input
                  id="address.cep"
                  inputMode="numeric"
                  autoComplete="postal-code"
                  placeholder="00000-000"
                  className={`${inputClassName} pr-10`}
                  aria-invalid={!!errors.address?.cep}
                  {...register("address.cep", {
                    onChange: (event) => {
                      const formattedCep = formatCep(event.target.value);

                      setValue("address.cep", formattedCep, {
                        shouldDirty: true,
                      });

                      setCepMessage("");
                      setCepMessageType("");
                      setIsSearchingCep(false);

                      // Invalida consultas iniciadas com CEP anterior.
                      cepRequestId.current += 1;
                    },

                    onBlur: (event) => {
                      void searchCep(event.target.value);
                    },
                  })}
                />

                {isSearchingCep && (
                  <LoaderCircle className="absolute right-3 top-1/2 size-4 -translate-y-1/2 animate-spin text-base-blue" />
                )}
              </div>

              {errors.address?.cep && (
                <p className="text-xs text-red-600">
                  {errors.address.cep.message}
                </p>
              )}

              {!errors.address?.cep && cepMessage && (
                <p
                  role="status"
                  className={`flex items-start gap-1 text-xs ${
                    cepMessageType === "success"
                      ? "text-green-700"
                      : "text-amber-700"
                  }`}
                >
                  {cepMessageType === "success" ? (
                    <CheckCircle2 className="mt-0.5 size-3.5 shrink-0" />
                  ) : (
                    <AlertCircle className="mt-0.5 size-3.5 shrink-0" />
                  )}

                  <span>{cepMessage}</span>
                </p>
              )}

              <p className="text-xs text-gray-400">
                A busca acontece ao sair do campo.
              </p>
            </div>

            {/* Rua */}
            <div className="space-y-1 lg:col-span-2">
              <label
                htmlFor="address.rua"
                className="text-sm font-medium text-gray-700"
              >
                Rua / Avenida <span className="text-red-500">*</span>
              </label>

              <Input
                id="address.rua"
                autoComplete="address-line1"
                placeholder="Nome da rua"
                className={inputClassName}
                aria-invalid={!!errors.address?.rua}
                {...register("address.rua")}
              />

              {errors.address?.rua && (
                <p className="text-xs text-red-600">
                  {errors.address.rua.message}
                </p>
              )}
            </div>

            {/* Número */}
            <div className="space-y-1">
              <label
                htmlFor="address.number_house"
                className="text-sm font-medium text-gray-700"
              >
                Número <span className="text-red-500">*</span>
              </label>

              <Input
                id="address.number_house"
                autoComplete="address-line2"
                placeholder="Ex.: 123"
                className={inputClassName}
                aria-invalid={!!errors.address?.number_house}
                {...register("address.number_house")}
              />

              {errors.address?.number_house && (
                <p className="text-xs text-red-600">
                  {errors.address.number_house.message}
                </p>
              )}
            </div>

            {/* Bairro */}
            <div className="space-y-1">
              <label
                htmlFor="address.bairro"
                className="text-sm font-medium text-gray-700"
              >
                Bairro <span className="text-red-500">*</span>
              </label>

              <Input
                id="address.bairro"
                autoComplete="address-level3"
                placeholder="Nome do bairro"
                className={inputClassName}
                aria-invalid={!!errors.address?.bairro}
                {...register("address.bairro")}
              />

              {errors.address?.bairro && (
                <p className="text-xs text-red-600">
                  {errors.address.bairro.message}
                </p>
              )}
            </div>

            {/* Cidade */}
            <div className="space-y-1">
              <label
                htmlFor="address.cidade"
                className="text-sm font-medium text-gray-700"
              >
                Cidade <span className="text-red-500">*</span>
              </label>

              <Input
                id="address.cidade"
                autoComplete="address-level2"
                placeholder="Nome da cidade"
                className={inputClassName}
                aria-invalid={!!errors.address?.cidade}
                {...register("address.cidade")}
              />

              {errors.address?.cidade && (
                <p className="text-xs text-red-600">
                  {errors.address.cidade.message}
                </p>
              )}
            </div>

            {/* UF */}
            <div className="space-y-1">
              <label
                htmlFor="address.uf"
                className="text-sm font-medium text-gray-700"
              >
                Estado (UF) <span className="text-red-500">*</span>
              </label>

              <Input
                id="address.uf"
                autoComplete="address-level1"
                placeholder="Ex.: RJ"
                maxLength={2}
                className={inputClassName}
                aria-invalid={!!errors.address?.uf}
                {...register("address.uf", {
                  onChange: (event) => {
                    setValue(
                      "address.uf",
                      event.target.value.toUpperCase(),
                      { shouldDirty: true },
                    );
                  },
                })}
              />

              {errors.address?.uf && (
                <p className="text-xs text-red-600">
                  {errors.address.uf.message}
                </p>
              )}
            </div>
          </div>
        </section>

        {/* Serviços */}
        <section className="space-y-4">
          <div className="flex flex-col gap-3 border-b pb-3 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-2">
              <ShoppingCart className="size-5 text-base-blue" />

              <div>
                <h3 className="font-semibold text-gray-900">
                  Serviços do pedido
                </h3>

                <p className="text-xs text-gray-500">
                  Adicione os serviços e informe quantidade e preço unitário.
                </p>
              </div>
            </div>

            <Button
              type="button"
              variant="outline"
              className="h-10 border-base-blue/20 text-base-blue hover:bg-blue-50"
              onClick={() =>
                append({
                  product_name: "",
                  quantity: 1,
                  unit_price: 0,
                })
              }
            >
              <Plus className="mr-2 size-4" />
              Adicionar serviço
            </Button>
          </div>

          <div className="space-y-3">
            {fields.map((field, index) => (
              <div
                key={field.id}
                className="rounded-xl border border-gray-200 bg-gray-50/70 p-4 sm:p-5"
              >
                <div className="mb-4 flex items-center justify-between">
                  <p className="text-sm font-semibold text-gray-700">
                    Serviço {index + 1}
                  </p>

                  {fields.length > 1 && (
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="h-8 text-red-600 hover:bg-red-50 hover:text-red-700"
                      onClick={() => remove(index)}
                      aria-label={`Remover serviço ${index + 1}`}
                    >
                      <Trash2 className="mr-1.5 size-4" />
                      Remover
                    </Button>
                  )}
                </div>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                  {/* Nome */}
                  <div className="space-y-1 sm:col-span-3">
                    <label
                      htmlFor={`product-${index}`}
                      className="text-sm font-medium text-gray-700"
                    >
                      Nome do serviço <span className="text-red-500">*</span>
                    </label>

                    <Input
                      id={`product-${index}`}
                      placeholder="Ex.: Instalação de vidro"
                      className={inputClassName}
                      aria-invalid={
                        !!errors.products?.[index]?.product_name
                      }
                      {...register(`products.${index}.product_name`)}
                    />

                    {errors.products?.[index]?.product_name && (
                      <p className="text-xs text-red-600">
                        {errors.products[index]?.product_name?.message}
                      </p>
                    )}
                  </div>

                  {/* Quantidade */}
                  <div className="space-y-1">
                    <label
                      htmlFor={`quantity-${index}`}
                      className="text-sm font-medium text-gray-700"
                    >
                      Quantidade <span className="text-red-500">*</span>
                    </label>

                    <Input
                      id={`quantity-${index}`}
                      type="number"
                      min={1}
                      step={1}
                      className={inputClassName}
                      aria-invalid={
                        !!errors.products?.[index]?.quantity
                      }
                      {...register(`products.${index}.quantity`, {
                        valueAsNumber: true,
                      })}
                    />

                    {errors.products?.[index]?.quantity && (
                      <p className="text-xs text-red-600">
                        {errors.products[index]?.quantity?.message}
                      </p>
                    )}
                  </div>

                  {/* Preço unitário */}
                  <div className="space-y-1 sm:col-span-2">
                    <label
                      htmlFor={`price-${index}`}
                      className="text-sm font-medium text-gray-700"
                    >
                      Preço unitário (R$){" "}
                      <span className="text-red-500">*</span>
                    </label>

                    <Input
                      id={`price-${index}`}
                      type="number"
                      min={0}
                      step="0.01"
                      placeholder="0.00"
                      className={inputClassName}
                      aria-invalid={
                        !!errors.products?.[index]?.unit_price
                      }
                      {...register(`products.${index}.unit_price`, {
                        valueAsNumber: true,
                      })}
                    />

                    {errors.products?.[index]?.unit_price && (
                      <p className="text-xs text-red-600">
                        {errors.products[index]?.unit_price?.message}
                      </p>
                    )}
                  </div>
                </div>

                {/* Subtotal */}
                <div className="mt-4 flex justify-end border-t border-gray-200 pt-3">
                  <p className="text-sm text-gray-600">
                    Subtotal:{" "}
                    <span className="font-semibold text-gray-900">
                      {formatCurrency(
                        (Number(products?.[index]?.quantity) || 0) *
                          (Number(products?.[index]?.unit_price) || 0),
                      )}
                    </span>
                  </p>
                </div>
              </div>
            ))}
          </div>

          {errors.products?.root?.message && (
            <p className="text-sm text-red-600">
              {errors.products.root.message}
            </p>
          )}

          {errors.products?.message && (
            <p className="text-sm text-red-600">
              {errors.products.message}
            </p>
          )}
        </section>

        {/* Resumo financeiro */}
        <section className="w-full rounded-xl border border-blue-100 bg-blue-50/70 p-5 sm:w-1/2">
          <div className="flex items-center gap-2">
            <CircleDollarSign className="size-5 text-base-blue" />

            <p className="text-sm font-medium text-gray-600">
              Valor total do pedido
            </p>
          </div>

          <p className="mt-2 text-3xl font-bold tracking-tight text-base-blue">
            {formatCurrency(total)}
          </p>

          <p className="mt-1 text-xs text-gray-500">
            {products?.length ?? 0}{" "}
            {(products?.length ?? 0) === 1
              ? "serviço adicionado"
              : "serviços adicionados"}
          </p>
        </section>

        {/* Erro de cadastro */}
        {submitError && (
          <div
            role="alert"
            className="flex items-start gap-2 rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-700"
          >
            <AlertCircle className="mt-0.5 size-4 shrink-0" />
            <p>{submitError}</p>
          </div>
        )}

        {/* Ações */}
        <DialogFooter className="gap-2 border-t pt-5">
          <Button
            type="submit"
            disabled={isSubmitting}
            className="h-11 w-full bg-base-blue px-6 font-semibold text-white hover:bg-base-blue-hover sm:w-auto"
          >
            {isSubmitting ? (
              <>
                <LoaderCircle className="mr-2 size-4 animate-spin" />
                Cadastrando pedido...
              </>
            ) : (
              <>
                <PackagePlus className="mr-2 size-4" />
                Cadastrar pedido
              </>
            )}
          </Button>
        </DialogFooter>
      </form>
    </DialogContent>
  );
};
