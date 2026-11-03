
import { useEffect, useState } from 'react'
import {
  CalendarDays,
  CircleDollarSign,
  Download,
  FileText,
  Pencil,
  Plus,
  Trash2,
} from 'lucide-react'

import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from '@/components/ui/dialog'
import { useOrderProduct } from '@/hooks/useOrderProducts'

import { DialogBudget } from '../DialogBudged'
import { UpdateDialogBudget } from '../UpdateDialogBudget'

interface Budget {
  id: string
  name_budget: string
  description_budget: string
  expiration_date: string
  total_value: number
  client_id: string
  pdf_object_name?: string
}

interface DialogBudgetsProps {
  clientId: string
}

const currencyFormatter = new Intl.NumberFormat('pt-BR', {
  style: 'currency',
  currency: 'BRL',
})

const dateFormatter = new Intl.DateTimeFormat('pt-BR')

export const DialogListBudgets = ({
  clientId,
}: DialogBudgetsProps) => {
  const {
    budgets,
    loading,
    getListBudgets,
    handleDeleteBudget,
  } = useOrderProduct()

  const [selectedBudget, setSelectedBudget] =
    useState<Budget | null>(null)

  useEffect(() => {
    getListBudgets(clientId)
  }, [clientId, getListBudgets])

  const getPdfUrl = (objectName: string) => {
    return `${import.meta.env.VITE_MINIO_URL}/${import.meta.env.VITE_MINIO_BUCKET}/${objectName}`
  }

  const formatDate = (date: string) => {
    const parsedDate = new Date(date)

    if (Number.isNaN(parsedDate.getTime())) {
      return 'Data não disponível'
    }

    return dateFormatter.format(parsedDate)
  }

  const isExpired = (date: string) => {
    const expirationDate = new Date(date)

    if (Number.isNaN(expirationDate.getTime())) {
      return false
    }

    const today = new Date()
    today.setHours(0, 0, 0, 0)
    expirationDate.setHours(0, 0, 0, 0)

    return expirationDate < today
  }

  return (
    <DialogContent className="flex max-h-[90dvh] flex-col gap-0 overflow-hidden p-0 sm:max-w-3xl lg:max-w-5xl">
      {/* Cabeçalho */}
      <div className="flex flex-col bg-gray-50/80 gap-4 border-b px-5 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-7">
        <div className=" mt-2 flex items-start gap-3">
          <div>
            <h2 className="text-xl font-semibold tracking-tight">
              Orçamentos
            </h2>

            <p className="mt-1 text-sm text-muted-foreground">
              Consulte, atualize e gerencie os orçamentos deste cliente.
            </p>
          </div>
        </div>

        <Dialog>
          <DialogTrigger asChild>
            <Button className="w-full cursor-pointer bg-base-blue hover:bg-base-blue-hover sm:w-auto">
              <Plus className="mr-2 size-4" />
              Novo orçamento
            </Button>
          </DialogTrigger>

          <DialogBudget clientId={clientId} />
        </Dialog>
      </div>

      {/* Conteúdo */}
      <div className="min-h-0 flex-1 overflow-y-auto bg-muted/20 px-5 py-5 sm:px-7">
        {loading ? (
          <div className="flex flex-col items-center justify-center gap-3 py-16">
            <div className="size-8 animate-spin rounded-full border-2 border-muted border-t-base-blue" />

            <p className="text-sm text-muted-foreground">
              Carregando orçamentos...
            </p>
          </div>
        ) : budgets.length === 0 ? (
          <div className="flex flex-col items-center justify-center rounded-xl border border-dashed bg-background px-6 py-14 text-center">
            <div className="flex size-14 items-center justify-center rounded-2xl bg-muted">
              <FileText className="size-7 text-muted-foreground" />
            </div>

            <h3 className="mt-4 font-semibold">
              Nenhum orçamento cadastrado
            </h3>

            <p className="mt-2 max-w-sm text-sm text-muted-foreground">
              Os orçamentos deste cliente aparecerão aqui. Comece criando
              o primeiro para manter tudo organizado.
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            <div className="mb-4 flex items-center justify-between gap-3">
              <p className="text-sm text-muted-foreground">
                {budgets.length}{' '}
                {budgets.length === 1
                  ? 'orçamento encontrado'
                  : 'orçamentos encontrados'}
              </p>
            </div>

            {budgets.map((budget: Budget) => {
              const expired = isExpired(budget.expiration_date)

              return (
                <article
                  key={budget.id}
                  className="group rounded-xl border bg-background p-4 transition-colors hover:border-base-blue/30 sm:p-5"
                >
                  <div className="flex flex-col gap-4">
                    {/* Informações principais */}
                    <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                      <div className="min-w-0 flex-1">
                        <div className="flex flex-wrap items-center gap-2">
                          <h3 className="break-words font-semibold tracking-tight">
                            {budget.name_budget}
                          </h3>

                          <span
                            className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium ${
                              expired
                                ? 'bg-red-50 text-red-700'
                                : 'bg-emerald-50 text-emerald-700'
                            }`}
                          >
                            {expired ? 'Vencido' : 'Dentro da validade'}
                          </span>
                        </div>

                        <p className="mt-1.5 whitespace-pre-wrap break-words text-sm leading-relaxed text-muted-foreground">
                          {budget.description_budget ||
                            'Nenhuma descrição informada.'}
                        </p>
                      </div>

                      {/* Ações */}
                      <div className="flex shrink-0 items-center gap-1 self-end sm:self-start">
                        {budget.pdf_object_name && (
                          <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            className="size-9 cursor-pointer text-muted-foreground hover:text-base-blue"
                            title="Baixar PDF"
                            aria-label={`Baixar PDF do orçamento ${budget.name_budget}`}
                            asChild
                          >
                            <a
                              href={getPdfUrl(budget.pdf_object_name)}
                              target="_blank"
                              rel="noopener noreferrer"
                              download
                            >
                              <Download className="size-4" />
                            </a>
                          </Button>
                        )}

                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          className="size-9 cursor-pointer text-muted-foreground hover:bg-blue-50 hover:text-blue-700"
                          title="Editar orçamento"
                          aria-label={`Editar orçamento ${budget.name_budget}`}
                          onClick={() => setSelectedBudget(budget)}
                        >
                          <Pencil className="size-4" />
                        </Button>

                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          className="size-9 cursor-pointer text-muted-foreground hover:bg-red-50 hover:text-red-600"
                          title="Excluir orçamento"
                          aria-label={`Excluir orçamento ${budget.name_budget}`}
                          onClick={() => handleDeleteBudget(budget.id)}
                        >
                          <Trash2 className="size-4" />
                        </Button>
                      </div>
                    </div>

                    {/* Metadados */}
                    <div className="grid grid-cols-1 gap-3 border-t pt-4 sm:grid-cols-2">
                      <div className="flex items-center gap-3">
                        <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-muted">
                          <CircleDollarSign className="size-4 text-muted-foreground" />
                        </div>

                        <div className="min-w-0">
                          <p className="text-xs text-muted-foreground">
                            Valor total
                          </p>

                          <p className="mt-0.5 font-semibold tabular-nums">
                            {currencyFormatter.format(
                              Number(budget.total_value) || 0,
                            )}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-3">
                        <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-muted">
                          <CalendarDays className="size-4 text-muted-foreground" />
                        </div>

                        <div className="min-w-0">
                          <p className="text-xs text-muted-foreground">
                            Data de validade
                          </p>

                          <p
                            className={`mt-0.5 font-medium ${
                              expired ? 'text-red-600' : ''
                            }`}
                          >
                            {formatDate(budget.expiration_date)}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Documento */}
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <FileText className="size-4 shrink-0" />

                      {budget.pdf_object_name
                        ? 'Documento PDF disponível'
                        : 'Nenhum PDF anexado'}
                    </div>
                  </div>
                </article>
              )
            })}
          </div>
        )}
      </div>

      {/* Edição */}
      {selectedBudget && (
        <UpdateDialogBudget
          budget={selectedBudget}
          open={!!selectedBudget}
          onOpenChange={(open) => {
            if (!open) {
              setSelectedBudget(null)
            }
          }}
        />
      )}
    </DialogContent>
  )
}

