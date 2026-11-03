
import { useEffect } from 'react'
import {
  useForm,
  useFieldArray,
  useWatch,
  type Resolver,
} from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  CheckCircle2,
  ClipboardList,
  CircleDollarSign,
  LoaderCircle,
  Package,
  Plus,
  ShoppingCart,
  Trash2,
} from 'lucide-react'

import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { DialogContent } from '@/components/ui/dialog'
import { Textarea } from '@/components/ui/textarea'
import { useOrderProduct } from '@/hooks/useOrderProducts'

interface Product {
  product_name: string
  quantity: number
  unit_price: number
}

interface UpdateOrderFormDialogProps {
  id: string
}

const schema = z.object({
  client_id: z
    .string()
    .uuid('ID do cliente inválido'),

  order_number: z
    .string()
    .trim()
    .min(1, 'O número do pedido é obrigatório'),

  status_description: z
    .string()
    .trim()
    .min(1, 'A descrição do status é obrigatória'),

  status: z
    .string()
    .trim()
    .min(1, 'O status é obrigatório'),

  products: z
    .array(
      z.object({
        product_name: z
          .string()
          .trim()
          .min(1, 'Informe o nome do produto'),

        quantity: z.coerce
          .number()
          .finite('Informe uma quantidade válida')
          .min(1, 'A quantidade mínima é 1'),

        unit_price: z.coerce
          .number()
          .finite('Informe um preço válido')
          .min(0, 'O preço deve ser maior ou igual a zero'),
      }),
    )
    .min(1, 'Adicione pelo menos um produto'),
})

type FormValues = z.infer<typeof schema>

const currencyFormatter = new Intl.NumberFormat('pt-BR', {
  style: 'currency',
  currency: 'BRL',
})

export const UpdateOrderFormDialog = ({
  id,
}: UpdateOrderFormDialogProps) => {
  const {
    listOrderProduct,
    handleUpdateOrderProduct,
  } = useOrderProduct()

  const orderToUpdate = listOrderProduct.find(
    (order) => order.id === id,
  )

  const {
    register,
    control,
    handleSubmit,
    reset,
    formState: {
      errors,
      isSubmitting,
    },
  } = useForm<FormValues>({
    resolver: zodResolver(schema) as Resolver<FormValues>,
    defaultValues: {
      client_id: orderToUpdate?.client_id || '',
      order_number: orderToUpdate?.order_number || '',
      status_description: orderToUpdate?.status_description || '',
      status: orderToUpdate?.status || '',
      products: orderToUpdate?.products?.length
        ? orderToUpdate.products.map((product: Product) => ({
            product_name: product.product_name || '',
            quantity: product.quantity ?? 1,
            unit_price: product.unit_price ?? 0,
          }))
        : [
            {
              product_name: '',
              quantity: 1,
              unit_price: 0,
            },
          ],
    },
  })

  const {
    fields,
    append,
    remove,
  } = useFieldArray({
    control,
    name: 'products',
  })

  const products = useWatch({
    control,
    name: 'products',
  })

  const orderNumber = useWatch({
    control,
    name: 'order_number',
  })

  const currentStatus = useWatch({
    control,
    name: 'status',
  })

  // Atualiza os dados quando o pedido selecionado mudar.
  useEffect(() => {
    if (!orderToUpdate) return

    reset({
      client_id: orderToUpdate.client_id || '',
      order_number: orderToUpdate.order_number || '',
      status_description: orderToUpdate.status_description || '',
      status: orderToUpdate.status || '',
      products: orderToUpdate.products?.length
        ? orderToUpdate.products.map((product: Product) => ({
            product_name: product.product_name || '',
            quantity: product.quantity ?? 1,
            price: product.unit_price ?? 0,
          }))
        : [
            {
              product_name: '',
              quantity: 1,
              price: 0,
            },
          ],
    })
  }, [id, orderToUpdate, reset])

  const total = (products || []).reduce(
    (accumulator, product) => {
      const quantity = Number(product?.quantity) || 0
      const price = Number(product?.unit_price) || 0

      return accumulator + quantity * price
    },
    0,
  )

  const onSubmit = async (data: FormValues) => {
    const payload = {
      id,
      ...data,
      products: data.products.map((product) => ({
        ...product,
        id: orderToUpdate?.id || '',
      })),
    }

    await handleUpdateOrderProduct(payload)
  }

  if (!orderToUpdate) {
    return (
      <DialogContent className="sm:max-w-lg">
        <div className="flex flex-col items-center justify-center py-10 text-center">
          <div className="flex size-12 items-center justify-center rounded-xl bg-muted">
            <ClipboardList className="size-6 text-muted-foreground" />
          </div>

          <h2 className="mt-4 font-semibold">
            Pedido não encontrado
          </h2>

          <p className="mt-2 text-sm text-muted-foreground">
            Não foi possível localizar os dados deste pedido.
            Atualize a listagem e tente novamente.
          </p>
        </div>
      </DialogContent>
    )
  }

  return (
    <DialogContent className="flex max-h-[92dvh] flex-col gap-0 overflow-hidden p-0 sm:max-w-3xl lg:max-w-5xl">
      {/* Cabeçalho */}
      <div className="border-b px-5 py-5 sm:px-7">
        <div className="flex items-start gap-3">

          <div className="min-w-0 flex-1">
            <h2 className="text-2xl font-semibold tracking-tight">
              Atualizar pedido
            </h2>

            <p className="mt-1 text-sm text-muted-foreground">
              Gerencie o status, a descrição e os produtos deste pedido.
            </p>

            <div className="mt-3 flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-muted px-3 py-1 text-xs font-medium">
                <ShoppingCart className="size-3.5" />
                Pedido {orderNumber || orderToUpdate.order_number}
              </span>

              {currentStatus?.trim() && (
                <span className="inline-flex items-center gap-1.5 rounded-full bg-blue-50 px-3 py-1 text-xs font-medium text-blue-700">
                  <CheckCircle2 className="size-3.5" />
                  {currentStatus}
                </span>
              )}
            </div>
          </div>
        </div>
      </div>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex min-h-0 flex-1 flex-col overflow-hidden"
      >
        <input type="hidden" {...register('client_id')} />

        {/* Conteúdo rolável */}
        <div className="flex-1 space-y-6 overflow-y-auto bg-muted/20 px-5 py-5 sm:px-7 sm:py-6">
          {/* Resumo financeiro */}
          <section className="rounded-xl border bg-background p-4 sm:p-5">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-center gap-3">
                <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-base-blue/10">
                  <CircleDollarSign className="size-5 text-base-blue" />
                </div>

                <div>
                  <p className="text-sm text-muted-foreground">
                    Valor total do pedido
                  </p>

                  <p className="mt-0.5 text-2xl font-bold tracking-tight tabular-nums">
                    {currencyFormatter.format(total)}
                  </p>
                </div>
              </div>

              <div className="rounded-lg bg-muted/60 px-4 py-3 sm:min-w-36">
                <p className="text-xs text-muted-foreground">
                  Itens adicionados
                </p>

                <p className="mt-1 text-lg font-semibold">
                  {products?.length || 0}
                </p>
              </div>
            </div>
          </section>

          {/* Informações do pedido */}
          <section className="space-y-4 rounded-xl border bg-background p-4 sm:p-5">
            <div className="flex items-center gap-2">
              <div className="flex size-8 items-center justify-center rounded-lg bg-muted">
                <ClipboardList className="size-4 text-muted-foreground" />
              </div>

              <div>
                <h3 className="font-semibold">
                  Informações do pedido
                </h3>

                <p className="text-xs text-muted-foreground">
                  Identificação e acompanhamento
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {/* Número */}
              <div className="space-y-2">
                <label
                  htmlFor="order_number"
                  className="text-sm font-medium"
                >
                  Número do pedido
                  <span className="ml-1 text-red-500">*</span>
                </label>

                <Input
                  id="order_number"
                  placeholder="Ex.: PED-2026-001"
                  aria-invalid={!!errors.order_number}
                  aria-describedby={
                    errors.order_number
                      ? 'order-number-error'
                      : undefined
                  }
                  {...register('order_number')}
                />

                {errors.order_number && (
                  <p
                    id="order-number-error"
                    role="alert"
                    className="text-sm text-red-600"
                  >
                    {errors.order_number.message}
                  </p>
                )}
              </div>

              {/* Status */}
              <div className="space-y-2">
                <label
                  htmlFor="status"
                  className="text-sm font-medium"
                >
                  Status do pedido
                  <span className="ml-1 text-red-500">*</span>
                </label>

                <Input
                  id="status"
                  placeholder="Ex.: Em produção"
                  aria-invalid={!!errors.status}
                  aria-describedby={
                    errors.status ? 'status-error' : undefined
                  }
                  {...register('status')}
                />

                {errors.status && (
                  <p
                    id="status-error"
                    role="alert"
                    className="text-sm text-red-600"
                  >
                    {errors.status.message}
                  </p>
                )}
              </div>

              {/* Descrição */}
              <div className="space-y-2 sm:col-span-2">
                <label
                  htmlFor="status_description"
                  className="text-sm font-medium"
                >
                  Descrição do status
                  <span className="ml-1 text-red-500">*</span>
                </label>

                <Textarea
                  id="status_description"
                  placeholder="Descreva o andamento do pedido, as etapas concluídas ou as próximas ações..."
                  rows={3}
                  className="min-h-24 resize-y"
                  aria-invalid={!!errors.status_description}
                  aria-describedby={
                    errors.status_description
                      ? 'status-description-error'
                      : undefined
                  }
                  {...register('status_description')}
                />

                {errors.status_description && (
                  <p
                    id="status-description-error"
                    role="alert"
                    className="text-sm text-red-600"
                  >
                    {errors.status_description.message}
                  </p>
                )}
              </div>
            </div>
          </section>

          {/* Produtos */}
          <section className="space-y-4">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-center gap-3">
                <div className="flex size-9 items-center justify-center rounded-lg bg-base-blue/10">
                  <Package className="size-4 text-base-blue" />
                </div>

                <div>
                  <h3 className="font-semibold">
                    Produtos do pedido
                  </h3>

                  <p className="text-xs text-muted-foreground">
                    Gerencie os itens e seus respectivos valores.
                  </p>
                </div>
              </div>

              <Button
                type="button"
                variant="outline"
                className="w-full cursor-pointer sm:w-auto"
                onClick={() =>
                  append({
                    product_name: '',
                    quantity: 1,
                    unit_price: 0,
                  })
                }
              >
                <Plus className="mr-2 size-4" />
                Adicionar produto
              </Button>
            </div>

            {fields.map((field, index) => {
              const product = products?.[index]
              const quantity = Number(product?.quantity) || 0
              const price = Number(product?.unit_price) || 0
              const subtotal = quantity * price

              return (
                <article
                  key={field.id}
                  className="rounded-xl border bg-background p-4 transition-colors hover:border-base-blue/30 sm:p-5"
                >
                  <div className="mb-4 flex items-center justify-between gap-3">
                    <div className="flex items-center gap-2">
                      <div className="flex size-8 items-center justify-center rounded-lg bg-muted">
                        <Package className="size-4 text-muted-foreground" />
                      </div>

                      <h4 className="text-sm font-semibold">
                        Produto {index + 1}
                      </h4>
                    </div>

                    {fields.length > 1 && (
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        className="size-9 cursor-pointer text-muted-foreground hover:bg-red-50 hover:text-red-600"
                        aria-label={`Remover produto ${index + 1}`}
                        title="Remover produto"
                        onClick={() => remove(index)}
                      >
                        <Trash2 className="size-4" />
                      </Button>
                    )}
                  </div>

                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {/* Nome */}
                    <div className="space-y-2 sm:col-span-2 lg:col-span-1">
                      <label
                        htmlFor={`product-name-${index}`}
                        className="text-sm font-medium"
                      >
                        Nome do produto
                        <span className="ml-1 text-red-500">*</span>
                      </label>

                      <Input
                        id={`product-name-${index}`}
                        placeholder="Ex.: Porta de vidro"
                        aria-invalid={
                          !!errors.products?.[index]?.product_name
                        }
                        {...register(
                          `products.${index}.product_name`,
                        )}
                      />

                      {errors.products?.[index]?.product_name && (
                        <p
                          role="alert"
                          className="text-sm text-red-600"
                        >
                          {errors.products[index]?.product_name?.message}
                        </p>
                      )}
                    </div>

                    {/* Quantidade */}
                    <div className="space-y-2">
                      <label
                        htmlFor={`product-quantity-${index}`}
                        className="text-sm font-medium"
                      >
                        Quantidade
                        <span className="ml-1 text-red-500">*</span>
                      </label>

                      <Input
                        id={`product-quantity-${index}`}
                        type="number"
                        min="1"
                        step="1"
                        placeholder="1"
                        aria-invalid={
                          !!errors.products?.[index]?.quantity
                        }
                        {...register(
                          `products.${index}.quantity`,
                          { valueAsNumber: true },
                        )}
                      />

                      {errors.products?.[index]?.quantity && (
                        <p
                          role="alert"
                          className="text-sm text-red-600"
                        >
                          {errors.products[index]?.quantity?.message}
                        </p>
                      )}
                    </div>

                    {/* Preço unitário */}
                    <div className="space-y-2">
                      <label
                        htmlFor={`product-price-${index}`}
                        className="text-sm font-medium"
                      >
                        Preço unitário
                        <span className="ml-1 text-red-500">*</span>
                      </label>

                      <Input
                        id={`product-price-${index}`}
                        type="number"
                        min="0"
                        step="0.01"
                        placeholder="0,00"
                        aria-invalid={
                          !!errors.products?.[index]?.unit_price
                        }
                        {...register(
                          `products.${index}.unit_price`,
                          { valueAsNumber: true },
                        )}
                      />

                      {errors.products?.[index]?.unit_price && (
                        <p
                          role="alert"
                          className="text-sm text-red-600"
                        >
                          {errors.products[index]?.unit_price?.message}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Subtotal */}
                  <div className="mt-4 flex items-center justify-between gap-3 border-t pt-3">
                    <span className="text-sm text-muted-foreground">
                      Subtotal do item
                    </span>

                    <span className="font-semibold tabular-nums">
                      {currencyFormatter.format(subtotal)}
                    </span>
                  </div>
                </article>
              )
            })}

            {typeof errors.products?.message === 'string' && (
              <p role="alert" className="text-sm text-red-600">
                {errors.products.message}
              </p>
            )}
          </section>
        </div>

        {/* Rodapé fixo */}
        <div className="flex flex-col gap-3 border-t bg-background px-5 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-7">
          <p className="text-sm text-muted-foreground">
            Total:{' '}
            <span className="font-semibold text-foreground">
              {currencyFormatter.format(total)}
            </span>
          </p>

          <Button
            type="submit"
            disabled={isSubmitting}
            className="w-full cursor-pointer bg-base-blue hover:bg-base-blue-hover sm:w-auto"
          >
            {isSubmitting ? (
              <>
                <LoaderCircle className="mr-2 size-4 animate-spin" />
                Salvando alterações...
              </>
            ) : (
              <>
                <CheckCircle2 className="mr-2 size-4" />
                Salvar alterações
              </>
            )}
          </Button>
        </div>
      </form>
    </DialogContent>
  )
}
