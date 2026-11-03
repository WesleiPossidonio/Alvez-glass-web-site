
import { useEffect } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import {
  CalendarDays,
  CircleDollarSign,
  FileText,
  LoaderCircle,
  PencilLine,
  Upload,
} from 'lucide-react'

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { useOrderProduct } from '@/hooks/useOrderProducts'

interface Budget {
  id: string
  name_budget: string
  description_budget: string
  expiration_date: string
  total_value: number
  client_id: string
  pdf_object_name?: string
}

interface UpdateDialogBudgetProps {
  budget: Budget
  open: boolean
  onOpenChange: (open: boolean) => void
}

const MAX_FILE_SIZE = 10 * 1024 * 1024

const updateBudgetSchema = z.object({
  name_budget: z
    .string()
    .trim()
    .min(1, 'Digite o nome do orçamento')
    .max(150, 'O nome deve ter no máximo 150 caracteres'),

  description_budget: z
    .string()
    .trim()
    .min(1, 'Digite a descrição do orçamento'),

  expiration_date: z
    .string()
    .min(1, 'Informe a data de validade')
    .refine(
      (value) => {
        const date = new Date(`${value}T00:00:00`)
        return (
          /^\d{4}-\d{2}-\d{2}$/.test(value) &&
          !Number.isNaN(date.getTime()) &&
          date.toISOString().slice(0, 10) === value
        )
      },
      'Informe uma data válida',
    ),

  total_value: z
    .number({
      error: 'Informe o valor do orçamento',
    })
    .finite('Informe um valor válido')
    .min(0, 'O valor deve ser maior ou igual a zero'),

  file: z
    .custom<FileList>()
    .optional()
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

type UpdateBudgetFormData = z.infer<typeof updateBudgetSchema>

const currencyFormatter = new Intl.NumberFormat('pt-BR', {
  style: 'currency',
  currency: 'BRL',
})

export function UpdateDialogBudget({
  budget,
  open,
  onOpenChange,
}: UpdateDialogBudgetProps) {
  const { handleUpdateBudget } = useOrderProduct()

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: {
      errors,
      isSubmitting,
    },
  } = useForm<UpdateBudgetFormData>({
    resolver: zodResolver(updateBudgetSchema),
    defaultValues: {
      name_budget: budget.name_budget,
      description_budget: budget.description_budget,
      expiration_date: budget.expiration_date
        ? budget.expiration_date.slice(0, 10)
        : '',
      total_value: Number(budget.total_value),
      file: undefined,
    },
  })

  useEffect(() => {
    if (open) {
      reset({
        name_budget: budget.name_budget,
        description_budget: budget.description_budget,
        expiration_date: budget.expiration_date
          ? budget.expiration_date.slice(0, 10)
          : '',
        total_value: Number(budget.total_value),
        file: undefined,
      })
    }
  }, [budget, open, reset])

  const handleUpdate = async (data: UpdateBudgetFormData) => {
    const formData = new FormData()

    formData.append('name_budget', data.name_budget)
    formData.append('description_budget', data.description_budget)
    formData.append('expiration_date', data.expiration_date)
    formData.append('total_value', String(data.total_value))
    formData.append('client_id', budget.client_id)

    if (data.file?.length) {
      formData.append('file', data.file[0])
    }

    await handleUpdateBudget(budget.id, formData)

    reset()
    onOpenChange(false)
  }

  const handleDialogChange = (nextOpen: boolean) => {
    if (!nextOpen && isSubmitting) return

    if (!nextOpen) {
      reset()
    }

    onOpenChange(nextOpen)
  }

  const valueField = register('total_value', {
    setValueAs: (value) =>
      value === '' ? Number.NaN : Number(value),
  })

  const nameField = register('name_budget')
  const descriptionField = register('description_budget')
  const expirationField = register('expiration_date')
  const fileField = register('file')
  const currentTotalValue = watch('total_value')

  return (
    <Dialog open={open} onOpenChange={handleDialogChange}>
      <DialogContent className="flex max-h-[90dvh] flex-col gap-0 overflow-hidden p-0 sm:max-w-xl">
        {/* Cabeçalho */}
        <DialogHeader className="border-b px-6 py-5 text-left sm:px-7">
          <div className="flex items-start gap-3">
            <div className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-base-blue/10">
              <PencilLine className="size-5 text-base-blue" />
            </div>

            <div className="space-y-1">
              <DialogTitle className="text-lg font-semibold tracking-tight">
                Atualizar orçamento
              </DialogTitle>

              <DialogDescription className="text-sm leading-relaxed">
                Edite as informações do orçamento e substitua o PDF,
                caso necessário.
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        {/* Formulário */}
        <form
          onSubmit={handleSubmit(handleUpdate)}
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
                  {currencyFormatter.format(
                    Number.isFinite(currentTotalValue)
                      ? currentTotalValue
                      : Number(budget.total_value) || 0,
                  )}
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

            {/* Documento PDF */}
            <div className="space-y-2">
              <label
                htmlFor="budget-pdf"
                className="flex items-center gap-2 text-sm font-medium"
              >
                <FileText className="size-4 text-muted-foreground" />
                Documento do orçamento
              </label>

              <label
                htmlFor="budget-pdf"
                className="flex cursor-pointer flex-col items-center justify-center rounded-xl border border-dashed bg-muted/20 px-5 py-6 text-center transition-colors hover:border-base-blue/50 hover:bg-muted/40"
              >
                <div className="flex size-10 items-center justify-center rounded-full bg-background shadow-sm">
                  <Upload className="size-5 text-base-blue" />
                </div>

                <span className="mt-3 text-sm font-medium">
                  Selecione um arquivo PDF
                </span>

                <span className="mt-1 text-xs text-muted-foreground">
                  Somente PDF, até 10 MB
                </span>

                <Input
                  id="budget-pdf"
                  type="file"
                  accept="application/pdf,.pdf"
                  className="sr-only"
                  aria-invalid={!!errors.file}
                  aria-describedby={errors.file ? 'budget-pdf-error' : undefined}
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
                {budget.pdf_object_name
                  ? 'Já existe um PDF associado. Selecione outro arquivo somente se quiser substituí-lo.'
                  : 'Nenhum PDF atual informado. Selecione um arquivo para anexá-lo ao orçamento.'}
              </p>
            </div>
          </div>

          {/* Rodapé */}
          <DialogFooter className="flex-col-reverse gap-2 border-t bg-background px-6 py-4 sm:flex-row sm:px-7">
            <Button
              type="button"
              variant="outline"
              className="w-full cursor-pointer sm:w-auto"
              disabled={isSubmitting}
              onClick={() => handleDialogChange(false)}
            >
              Cancelar
            </Button>

            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full cursor-pointer bg-base-blue hover:bg-base-blue-hover sm:w-auto"
            >
              {isSubmitting ? (
                <>
                  <LoaderCircle className="mr-2 size-4 animate-spin" />
                  Atualizando...
                </>
              ) : (
                <>
                  <PencilLine className="mr-2 size-4" />
                  Salvar alterações
                </>
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

