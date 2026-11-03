
import { useEffect } from 'react'
import * as zod from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import {
  CalendarDays,
  CircleDollarSign,
  FileText,
  LoaderCircle,
  Upload,
} from 'lucide-react'

import {
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { useOrderProduct } from '@/hooks/useOrderProducts'

const MAX_FILE_SIZE = 10 * 1024 * 1024

const addBudgetFormSchema = zod.object({
  name_budget: zod
    .string()
    .trim()
    .min(1, 'Digite o nome do orçamento')
    .max(150, 'O nome deve ter no máximo 150 caracteres'),

  description_budget: zod
    .string()
    .trim()
    .min(1, 'Digite a descrição do orçamento'),

  expiration_date: zod
    .string()
    .min(1, 'Informe a data de validade')
    .refine(
      (value) => {
        if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) {
          return false
        }

        const date = new Date(`${value}T00:00:00`)

        return (
          !Number.isNaN(date.getTime()) &&
          date.toISOString().slice(0, 10) === value
        )
      },
      'Informe uma data válida',
    ),

  total_value: zod
    .string()
    .min(1, 'Informe o valor total')
    .refine(
      (value) =>
        value.trim() !== '' &&
        Number.isFinite(Number(value)),
      'Informe um valor numérico válido',
    )
    .refine(
      (value) => Number(value) >= 0,
      'O valor deve ser maior ou igual a zero',
    ),

  client_id: zod
    .string()
    .uuid('Cliente inválido'),

  file: zod
    .custom<FileList>()
    .refine(
      (files) => files?.length > 0,
      'Selecione o PDF do orçamento',
    )
    .refine(
      (files) =>
        !files?.length ||
        files[0].type === 'application/pdf',
      'O arquivo deve estar no formato PDF',
    )
    .refine(
      (files) =>
        !files?.length ||
        files[0].size <= MAX_FILE_SIZE,
      'O PDF deve ter no máximo 10 MB',
    ),
})

type AddBudgetFormData = zod.infer<typeof addBudgetFormSchema>

interface DialogBudgetProps {
  clientId: string
}

const currencyFormatter = new Intl.NumberFormat('pt-BR', {
  style: 'currency',
  currency: 'BRL',
})

export const DialogBudget = ({ clientId }: DialogBudgetProps) => {
  const { handleCreateBudget } = useOrderProduct()

  const {
    register,
    handleSubmit,
    reset,
    watch,
    setValue,
    formState: {
      errors,
      isSubmitting,
    },
  } = useForm<AddBudgetFormData>({
    resolver: zodResolver(addBudgetFormSchema),
    defaultValues: {
      name_budget: '',
      description_budget: '',
      expiration_date: '',
      total_value: '',
      client_id: clientId,
    },
  })

  const currentTotalValue = watch('total_value')
  const selectedFile = watch('file')?.[0]

  useEffect(() => {
    setValue('client_id', clientId, {
      shouldValidate: true,
    })
  }, [clientId, setValue])

  const addBudget = async (data: AddBudgetFormData) => {
    const formData = new FormData()

    formData.append('name_budget', data.name_budget)
    formData.append('description_budget', data.description_budget)
    formData.append('expiration_date', data.expiration_date)
    formData.append('total_value', String(Number(data.total_value)))
    formData.append('client_id', data.client_id)
    formData.append('file', data.file[0])

    await handleCreateBudget(formData)

    reset({
      name_budget: '',
      description_budget: '',
      expiration_date: '',
      total_value: '',
      client_id: clientId,
      file: undefined,
    })
  }

  const nameField = register('name_budget')
  const descriptionField = register('description_budget')
  const expirationField = register('expiration_date')
  const valueField = register('total_value')
  const fileField = register('file')

  return (
    <DialogContent className="flex max-h-[90dvh] flex-col gap-0 overflow-hidden p-0 sm:max-w-xl">
      {/* Cabeçalho */}
      <DialogHeader className="border-b px-6 py-5 text-left sm:px-7">
        <div className="flex items-start gap-3">

          <div className="space-y-1">
            <DialogTitle className="text-lg font-semibold tracking-tight">
              Novo orçamento
            </DialogTitle>

            <DialogDescription className="text-sm leading-relaxed">
              Preencha os dados abaixo e anexe o documento PDF para
              cadastrar o orçamento deste cliente.
            </DialogDescription>
          </div>
        </div>
      </DialogHeader>

      {/* Formulário */}
      <form
        onSubmit={handleSubmit(addBudget)}
        className="flex min-h-0 flex-1 flex-col overflow-hidden"
      >
        <div className="space-y-5 overflow-y-auto px-6 py-6 sm:px-7">
          {/* Nome */}
          <div className="space-y-2">
            <label
              htmlFor="name_budget"
              className="text-sm font-medium"
            >
              Nome do orçamento
              <span className="ml-1 text-red-500">*</span>
            </label>

            <Input
              id="name_budget"
              placeholder="Ex.: Fornecimento de materiais"
              maxLength={150}
              aria-invalid={!!errors.name_budget}
              aria-describedby={
                errors.name_budget ? 'name-budget-error' : undefined
              }
              {...nameField}
            />

            {errors.name_budget && (
              <p
                id="name-budget-error"
                role="alert"
                className="text-sm text-red-600"
              >
                {errors.name_budget.message}
              </p>
            )}
          </div>

          {/* Descrição */}
          <div className="space-y-2">
            <label
              htmlFor="description_budget"
              className="text-sm font-medium"
            >
              Descrição
              <span className="ml-1 text-red-500">*</span>
            </label>

            <Textarea
              id="description_budget"
              placeholder="Descreva os materiais, serviços ou condições do orçamento..."
              rows={4}
              className="min-h-28 resize-y"
              aria-invalid={!!errors.description_budget}
              aria-describedby={
                errors.description_budget
                  ? 'description-budget-error'
                  : undefined
              }
              {...descriptionField}
            />

            {errors.description_budget && (
              <p
                id="description-budget-error"
                role="alert"
                className="text-sm text-red-600"
              >
                {errors.description_budget.message}
              </p>
            )}
          </div>

          {/* Valor e validade */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <label
                htmlFor="total_value"
                className="flex items-center gap-2 text-sm font-medium"
              >
                <CircleDollarSign className="size-4 text-muted-foreground" />
                Valor total
                <span className="text-red-500">*</span>
              </label>

              <Input
                id="total_value"
                type="number"
                min="0"
                step="0.01"
                placeholder="0,00"
                aria-invalid={!!errors.total_value}
                aria-describedby={
                  errors.total_value ? 'total-value-error' : undefined
                }
                {...valueField}
              />

              {errors.total_value && (
                <p
                  id="total-value-error"
                  role="alert"
                  className="text-sm text-red-600"
                >
                  {errors.total_value.message}
                </p>
              )}

              <p className="text-xs text-muted-foreground">
                Prévia:{' '}
                {currentTotalValue?.trim() !== '' &&
                Number.isFinite(Number(currentTotalValue))
                  ? currencyFormatter.format(Number(currentTotalValue))
                  : currencyFormatter.format(0)}
              </p>
            </div>

            <div className="space-y-2">
              <label
                htmlFor="expiration_date"
                className="flex items-center gap-2 text-sm font-medium"
              >
                <CalendarDays className="size-4 text-muted-foreground" />
                Data de validade
                <span className="text-red-500">*</span>
              </label>

              <Input
                id="expiration_date"
                type="date"
                aria-invalid={!!errors.expiration_date}
                aria-describedby={
                  errors.expiration_date
                    ? 'expiration-date-error'
                    : undefined
                }
                {...expirationField}
              />

              {errors.expiration_date && (
                <p
                  id="expiration-date-error"
                  role="alert"
                  className="text-sm text-red-600"
                >
                  {errors.expiration_date.message}
                </p>
              )}
            </div>
          </div>

          {/* Upload do PDF */}
          <div className="space-y-2">
            <label
              htmlFor="budget-pdf"
              className="flex items-center gap-2 text-sm font-medium"
            >
              <FileText className="size-4 text-muted-foreground" />
              PDF do orçamento
              <span className="text-red-500">*</span>
            </label>

            <label
              htmlFor="budget-pdf"
              className="flex cursor-pointer flex-col items-center justify-center rounded-xl border border-dashed bg-muted/20 px-5 py-6 text-center transition-colors hover:border-base-blue/50 hover:bg-muted/40"
            >
              <div className="flex size-10 items-center justify-center rounded-full bg-background shadow-sm">
                <Upload className="size-5 text-base-blue" />
              </div>

              <span className="mt-3 break-all text-sm font-medium">
                {selectedFile?.name || 'Selecionar arquivo PDF'}
              </span>

              <span className="mt-1 text-xs text-muted-foreground">
                {selectedFile
                  ? `${(selectedFile.size / (1024 * 1024)).toFixed(2)} MB`
                  : 'Formato PDF · Tamanho máximo de 10 MB'}
              </span>

              <Input
                id="budget-pdf"
                type="file"
                accept=".pdf,application/pdf"
                className="sr-only"
                aria-invalid={!!errors.file}
                aria-describedby={
                  errors.file ? 'budget-pdf-error' : undefined
                }
                {...fileField}
              />
            </label>

            {errors.file && (
              <p
                id="budget-pdf-error"
                role="alert"
                className="text-sm text-red-600"
              >
                {errors.file.message}
              </p>
            )}

            <p className="text-xs leading-relaxed text-muted-foreground">
              Anexe o documento que será disponibilizado junto ao orçamento.
            </p>
          </div>
        </div>

        {/* Rodapé */}
        <DialogFooter className="border-t bg-background px-6 py-4 sm:px-7">
          <Button
            type="button"
            variant="outline"
            className="w-full cursor-pointer sm:w-auto"
            disabled={isSubmitting}
            onClick={() => {
              reset({
                name_budget: '',
                description_budget: '',
                expiration_date: '',
                total_value: '',
                client_id: clientId,
                file: undefined,
              })
            }}
          >
            Limpar campos
          </Button>

          <Button
            type="submit"
            disabled={isSubmitting}
            className="w-full cursor-pointer bg-base-blue hover:bg-base-blue-hover sm:w-auto"
          >
            {isSubmitting ? (
              <>
                <LoaderCircle className="mr-2 size-4 animate-spin" />
                Enviando orçamento...
              </>
            ) : (
              <>
                <Upload className="mr-2 size-4" />
                Enviar orçamento
              </>
            )}
          </Button>
        </DialogFooter>
      </form>
    </DialogContent>
  )
}

