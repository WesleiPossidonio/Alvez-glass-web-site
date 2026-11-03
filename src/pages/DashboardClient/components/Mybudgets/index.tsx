
import { useMemo, useState } from "react";
import {
  ArrowDownWideNarrow,
  ArrowRight,
  CalendarDays,
  Download,
  Eye,
  FileText,
  FileWarning,
  Search,
  ShieldCheck,
  X,
} from "lucide-react";
import { format, parseISO } from "date-fns";
import { ptBR } from "date-fns/locale";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import type { GetBudgetProps } from "@/contexts/ClientContext";
import { useClient } from "@/hooks/useClient";

type Budget = GetBudgetProps & {
  budget_number?: string | number;
  pdf_object_name?: string | null;
};

export function MyBudgets() {
  const { budgetData } = useClient();

  const [search, setSearch] = useState("");
  const [order, setOrder] = useState<"newest" | "oldest">("newest");
  const [selectedBudget, setSelectedBudget] = useState<Budget | null>(null);

  const budgets = (budgetData ?? []) as Budget[];

  const minioUrl = `${import.meta.env.VITE_MINIO_URL}/${import.meta.env.VITE_MINIO_BUCKET}`;

  const filteredBudgets = useMemo(() => {
    return [...budgets]
      .filter((budget) =>
        [
          budget.name_budget,
          budget.description_budget,
          budget.budget_number?.toString() ?? "",
        ]
          .join(" ")
          .toLocaleLowerCase("pt-BR")
          .includes(search.toLocaleLowerCase("pt-BR")),
      )
      .sort((a, b) => {
        const dateA = a.created_at
          ? parseISO(a.created_at).getTime()
          : 0;

        const dateB = b.created_at
          ? parseISO(b.created_at).getTime()
          : 0;

        return order === "newest"
          ? dateB - dateA
          : dateA - dateB;
      })
  }, [budgets, search, order]);

  const formatDate = (date?: string | Date | null) => {
    if (!date) return "Data indisponível";

    const parsedDate = parseISO(
      date instanceof Date ? date.toISOString() : date,
    );

    if (Number.isNaN(parsedDate.getTime())) {
      return "Data indisponível";
    }

    return format(parsedDate, "dd 'de' MMMM 'de' yyyy", {
      locale: ptBR,
    });
  };

  return (
    <section className="flex min-w-0 w-full flex-col gap-7 bg-slate-50/50 p-4 sm:p-6 lg:p-8">
      <header className="flex min-w-0 flex-col gap-2">
        <span className="text-xs font-semibold uppercase tracking-[0.16em] text-blue-700">
          Área do cliente
        </span>

        <div className="flex items-center gap-3">
          <div className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-950">
            <FileText className="size-5" />
          </div>

          <div className="min-w-0">
            <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
              Meus orçamentos
            </h1>
          </div>
        </div>

        <p className="max-w-2xl text-sm leading-relaxed text-slate-500 sm:text-base">
          Consulte os documentos dos seus projetos, confira as datas
          de validade e baixe seus orçamentos em PDF.
        </p>
      </header>

      <div className="flex min-w-0 flex-col gap-3 sm:flex-row sm:items-center">
        <div className="relative min-w-0 flex-1">
          <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-slate-400" />

          <Input
            id="search-budgets"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Buscar por nome ou número..."
            aria-label="Buscar orçamentos por nome, descrição ou número"
            className="h-11 w-full rounded-xl border-slate-200 bg-white pl-9 pr-10 shadow-sm focus-visible:ring-blue-600"
          />

          {search && (
            <button
              type="button"
              onClick={() => setSearch("")}
              aria-label="Limpar busca"
              className="absolute right-3 top-1/2 -translate-y-1/2 rounded-sm text-slate-400 transition hover:text-slate-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600"
            >
              <X className="size-4" />
            </button>
          )}
        </div>

        <div className="flex h-11 min-w-0 items-center gap-2 rounded-xl border border-slate-200 bg-white px-3 shadow-sm transition-colors focus-within:border-blue-500 sm:w-56 sm:flex-none">
          <ArrowDownWideNarrow className="size-4 shrink-0 text-slate-500" />

          <Select
            value={order}
            onValueChange={(value) =>
              setOrder(value as "newest" | "oldest")
            }
          >
            <SelectTrigger
              aria-label="Ordenar orçamentos"
              className="h-full min-w-0 flex-1 border-0 bg-transparent p-0 text-sm font-medium text-slate-700 shadow-none focus:ring-0 focus:ring-offset-0"
            >
              <SelectValue placeholder="Ordenar por data" />
            </SelectTrigger>

            <SelectContent align="end">
              <SelectItem value="newest">Mais recentes</SelectItem>
              <SelectItem value="oldest">Mais antigos</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid min-w-0 grid-cols-1 items-start gap-6 2xl:grid-cols-[minmax(0,1fr)_280px]">
        <div className="min-w-0 space-y-4">
          <div className="flex flex-wrap items-end justify-between gap-2">
            <div>
              <h2 className="text-lg font-semibold tracking-tight text-slate-900">
                Documentos disponíveis
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                {filteredBudgets.length}{" "}
                {filteredBudgets.length === 1
                  ? "orçamento encontrado"
                  : "orçamentos encontrados"}
              </p>
            </div>

            {search && (
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => setSearch("")}
                className="text-blue-700 hover:text-blue-800"
              >
                Limpar busca
              </Button>
            )}
          </div>

          {filteredBudgets.length === 0 ? (
            <div className="rounded-xl border border-dashed border-slate-300 bg-white px-5 py-12 text-center">
              <div className="mx-auto flex size-12 items-center justify-center rounded-xl bg-slate-100">
                {search ? (
                  <Search className="size-6 text-slate-400" />
                ) : (
                  <FileWarning className="size-6 text-slate-400" />
                )}
              </div>

              <h3 className="mt-4 font-semibold text-slate-800">
                {search
                  ? "Nenhum orçamento encontrado"
                  : "Você ainda não tem orçamentos"}
              </h3>

              <p className="mx-auto mt-2 max-w-sm text-sm leading-relaxed text-slate-500">
                {search
                  ? "Tente buscar por outro nome ou número para localizar seu documento."
                  : "Quando a equipe da Alves Glass disponibilizar um orçamento, ele aparecerá aqui para consulta e download."}
              </p>

              {search && (
                <Button
                  type="button"
                  variant="outline"
                  className="mt-4"
                  onClick={() => setSearch("")}
                >
                  Limpar busca
                </Button>
              )}
            </div>
          ) : (
            <div className="space-y-4">
              {filteredBudgets.map((budget) => (
                <article
                  key={budget.id}
                  className="min-w-0 rounded-xl border border-slate-200 bg-white p-4 transition-colors hover:border-slate-300 sm:p-5"
                >
                  <div className="flex min-w-0 flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                    <div className="flex min-w-0 flex-1 items-start gap-3">
                      <div className="flex size-11 shrink-0 items-center justify-center rounded-lg bg-red-50 text-red-600">
                        <FileText className="size-5" />
                      </div>

                      <div className="min-w-0 flex-1">
                        <h3 className="break-words text-base font-semibold text-slate-900">
                          {budget.name_budget}
                        </h3>

                        {budget.budget_number != null &&
                          budget.budget_number !== "" && (
                            <p className="mt-1 text-xs text-slate-500">
                              Orçamento Nº {budget.budget_number}
                            </p>
                          )}

                        {budget.description_budget && (
                          <p className="mt-2 break-words text-sm leading-relaxed text-slate-600">
                            {budget.description_budget}
                          </p>
                        )}

                        <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-slate-500">
                          <span className="inline-flex items-center gap-1.5">
                            <CalendarDays className="size-4 shrink-0" />
                            <span>
                              Validade: {formatDate(budget.expiration_date)}
                            </span>
                          </span>
                        </div>

                        <p className="mt-1.5 text-xs text-slate-400">
                          Emitido em {formatDate(budget.created_at)}
                        </p>
                      </div>
                    </div>

                    <div className="flex w-full gap-2 sm:w-auto sm:shrink-0">
                      <Button
                        type="button"
                        variant="outline"
                        disabled={!budget.pdf_object_name}
                        className="min-w-0 flex-1 border-slate-200 sm:flex-none"
                        onClick={() => setSelectedBudget(budget)}
                      >
                        <Eye className="mr-2 size-4 shrink-0" />
                        Visualizar
                      </Button>

                      <Button
                        type="button"
                        disabled={!budget.pdf_object_name}
                        className="min-w-0 flex-1 bg-blue-950 text-white hover:bg-blue-900 sm:flex-none"
                        asChild
                      >
                        <a
                          href={`${minioUrl}/${budget.pdf_object_name}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          download
                        >
                          <Download className="mr-2 size-4 shrink-0" />
                          Baixar PDF
                        </a>
                      </Button>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>

        <aside className="flex min-w-0 flex-col gap-4">
          <div className="rounded-xl border border-slate-200 bg-white p-5">
            <div className="flex size-10 items-center justify-center rounded-lg bg-blue-50 text-blue-700">
              <ShieldCheck className="size-5" />
            </div>

            <h3 className="mt-4 font-semibold text-slate-900">
              Seus documentos organizados
            </h3>

            <p className="mt-2 text-sm leading-relaxed text-slate-500">
              Consulte os arquivos disponibilizados para seus projetos
              sempre que precisar.
            </p>

            <div className="mt-4 flex items-start gap-2 rounded-lg bg-slate-50 p-3">
              <FileText className="mt-0.5 size-4 shrink-0 text-blue-700" />

              <p className="text-xs leading-relaxed text-slate-600">
                Você pode visualizar o PDF no portal ou baixar o arquivo.
              </p>
            </div>
          </div>

          <div className="rounded-xl bg-gradient-to-br from-blue-950 to-blue-800 p-5 text-white">
            <div className="flex size-10 items-center justify-center rounded-lg bg-white/10">
              <FileText className="size-5" />
            </div>

            <h3 className="mt-4 text-lg font-semibold">
              Tem um novo projeto?
            </h3>

            <p className="mt-2 text-sm leading-relaxed text-blue-100">
              Entre em contato com a Alves Glass para conversar sobre
              seu próximo projeto.
            </p>

            <Button
              type="button"
              variant="outline"
              className="mt-5 w-full border-white/30 bg-white text-blue-950 hover:bg-blue-50"
              onClick={() => {
                window.location.href = "/orcamentos";
              }}
            >
              Solicitar orçamento
              <ArrowRight className="ml-2 size-4" />
            </Button>
          </div>

          <div className="rounded-xl border border-slate-200 bg-white p-5">
            <div className="flex items-center gap-2">
              <CalendarDays className="size-5 text-slate-500" />

              <h3 className="font-semibold text-slate-900">
                Precisa de ajuda?
              </h3>
            </div>

            <p className="mt-2 text-sm leading-relaxed text-slate-500">
              Se tiver dúvidas sobre um documento ou sua validade,
              entre em contato com a equipe.
            </p>

            <a
              href="mailto:contato@alvesglass.com.br"
              className="mt-4 inline-flex items-center text-sm font-medium text-blue-700 transition hover:text-blue-800"
            >
              Falar com a equipe
              <ArrowRight className="ml-1 size-4" />
            </a>
          </div>
        </aside>
      </div>

      <Dialog
        open={Boolean(selectedBudget)}
        onOpenChange={(open) => {
          if (!open) setSelectedBudget(null);
        }}
      >
        <DialogContent className="flex h-[90dvh] max-h-[900px] w-[calc(100%-1rem)] max-w-5xl flex-col gap-0 overflow-hidden p-0 sm:w-full">
          <DialogHeader className="flex flex-row items-center justify-between gap-3 border-b p-4 pr-12 sm:p-5">
            <div className="min-w-0 space-y-1 text-left">
              <DialogTitle className="truncate text-base sm:text-lg">
                {selectedBudget?.name_budget}
              </DialogTitle>

              <DialogDescription>
                {selectedBudget?.budget_number != null &&
                  selectedBudget.budget_number !== ""
                  ? `Orçamento Nº ${selectedBudget.budget_number}`
                  : "Documento em PDF"}
              </DialogDescription>
            </div>

            {selectedBudget?.pdf_object_name && (
              <Button
                type="button"
                size="sm"
                className="shrink-0 bg-blue-950 hover:bg-blue-900"
                asChild
              >
                <a
                  href={`${minioUrl}/${selectedBudget.pdf_object_name}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  download
                >
                  <Download className="mr-2 size-4" />
                  Baixar
                </a>
              </Button>
            )}
          </DialogHeader>

          <div className="relative min-h-0 flex-1 bg-slate-100">
            {selectedBudget?.pdf_object_name ? (
              <iframe
                key={selectedBudget.id}
                src={`${minioUrl}/${selectedBudget.pdf_object_name}`}
                title={`PDF do orçamento ${selectedBudget.name_budget}`}
                className="size-full border-0"
              />
            ) : (
              <div className="flex h-full items-center justify-center p-6 text-center text-sm text-slate-500">
                Nenhum PDF anexado a este orçamento.
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </section>
  );
}
