
import { useMemo, useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import {
  ArrowRight,
  Check,
  CheckCircle2,
  ChevronRight,
  Clock3,
  Package,
  Search,
  ShieldCheck,
  ShoppingBag,
  SlidersHorizontal,
  Truck,
  XCircle,
} from "lucide-react";

import { useClient } from "@/hooks/useClient";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const filters = [
  "Todos",
  "Pendente",
  "Em produção",
  "Em rota",
  "Concluídos",
  "Cancelados",
] as const;

type StatusType =
  | "concluido"
  | "rota"
  | "producao"
  | "pendente"
  | "cancelado"
  | "outro";

const normalizeStatus = (status: string) =>
  status
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim();

const getStatusType = (status: string): StatusType => {
  const value = normalizeStatus(status);

  if (value.includes("cancelado") || value.includes("recusado")) {
    return "cancelado";
  }

  if (
    value.includes("concluido") ||
    value.includes("entregue") ||
    value.includes("finalizado")
  ) {
    return "concluido";
  }

  if (
    value.includes("rota") ||
    value.includes("transporte") ||
    value.includes("enviado") ||
    value.includes("enviando")
  ) {
    return "rota";
  }

  if (value.includes("producao") || value.includes("fabricacao")) {
    return "producao";
  }

  if (
    value.includes("pendente") ||
    value.includes("aguardando")
  ) {
    return "pendente";
  }

  return "outro";
};

const statusConfig: Record<
  StatusType,
  {
    label: string;
    icon: typeof CheckCircle2;
    badge: string;
  }
> = {
  concluido: {
    label: "Concluído",
    icon: CheckCircle2,
    badge: "bg-emerald-50 text-emerald-700 ring-emerald-600/20",
  },
  rota: {
    label: "Em rota",
    icon: Truck,
    badge: "bg-blue-50 text-blue-700 ring-blue-600/20",
  },
  producao: {
    label: "Em produção",
    icon: Package,
    badge: "bg-amber-50 text-amber-700 ring-amber-600/20",
  },
  pendente: {
    label: "Pendente",
    icon: Clock3,
    badge: "bg-orange-50 text-orange-700 ring-orange-600/20",
  },
  cancelado: {
    label: "Cancelado",
    icon: XCircle,
    badge: "bg-red-50 text-red-700 ring-red-600/20",
  },
  outro: {
    label: "Em acompanhamento",
    icon: Package,
    badge: "bg-slate-100 text-slate-700 ring-slate-500/20",
  },
};

const currencyFormatter = new Intl.NumberFormat("pt-BR", {
  style: "currency",
  currency: "BRL",
});

const progressSteps = [
  "Pedido recebido",
  "Produção",
  "Em rota",
  "Concluído",
];

export const MyProducts = () => {
  const { myOrders } = useClient();

  const [activeFilter, setActiveFilter] =
    useState<(typeof filters)[number]>("Todos");
  const [search, setSearch] = useState("");

  const orders = myOrders ?? [];

  const filteredOrders = useMemo(() => {
    const term = normalizeStatus(search);

    return orders.filter((order) => {
      const status = order.status ?? "";
      const statusType = getStatusType(status);
      const orderId = String(order.order_number ?? order.id ?? "");

      const matchesSearch =
        !term ||
        normalizeStatus(orderId).includes(term) ||
        normalizeStatus(status).includes(term) ||
        normalizeStatus(order.status_description ?? "").includes(term);

      const matchesFilter =
        activeFilter === "Todos" ||
        (activeFilter === "Pendente" &&
          statusType === "pendente") ||
        (activeFilter === "Concluídos" &&
          statusType === "concluido") ||
        (activeFilter === "Em rota" &&
          statusType === "rota") ||
        (activeFilter === "Em produção" &&
          statusType === "producao") ||
        (activeFilter === "Cancelados" &&
          statusType === "cancelado");

      return matchesSearch && matchesFilter;
    });
  }, [orders, search, activeFilter]);

  const formatCurrency = (
    value: number | string | null | undefined,
  ) => {
    const amount = Number(value ?? 0);

    return currencyFormatter.format(
      Number.isFinite(amount) ? amount : 0,
    );
  };

  const getProgress = (type: StatusType) => {
    switch (type) {
      case "concluido":
        return 4;
      case "rota":
        return 3;
      case "producao":
        return 2;
      case "pendente":
        return 1;
      default:
        return 1;
    }
  };

  const clearFilters = () => {
    setSearch("");
    setActiveFilter("Todos");
  };

  return (
    <section className="flex min-h-svh min-w-0 w-full flex-col gap-7 bg-slate-50/50 p-4 sm:p-6 lg:p-8">
      {/* Cabeçalho */}
      <header className="flex min-w-0 flex-col items-start gap-2">
        <span className="text-xs font-semibold uppercase tracking-[0.16em] text-blue-700">
          Área do cliente
        </span>

        <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
          Minhas compras
        </h1>

        <p className="max-w-2xl text-sm leading-relaxed text-slate-500 sm:text-base">
          Acompanhe seus pedidos e consulte as atualizações dos
          seus projetos com a Alves Glass.
        </p>
      </header>

      {/* Busca e filtro */}
      <div className="flex min-w-0 flex-col gap-3 sm:flex-row sm:items-center">
        <div className="relative min-w-0 flex-1">
          <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-slate-400" />

          <Input
            id="search-orders"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Buscar por número ou descrição..."
            aria-label="Buscar pedidos"
            className="h-11 w-full rounded-xl border-slate-200 bg-white pl-9 shadow-sm focus-visible:ring-blue-600"
          />
        </div>


        <div className="flex h-10 min-w-0 flex-1 items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 shadow-sm transition-colors focus-within:border-blue-500 sm:flex-none">
          <SlidersHorizontal className="size-4 shrink-0 text-slate-500" />

          <Select
            value={activeFilter}
            onValueChange={(value) =>
              setActiveFilter(value as (typeof filters)[number])
            }
          >
            <SelectTrigger
              id="filter-orders"
              aria-label="Filtrar pedidos por status"
              className="h-full min-w-0 flex-1 border-0 bg-transparent p-0 text-sm font-medium text-slate-700 shadow-none focus:ring-0 focus:ring-offset-0 sm:min-w-36"
            >
              <SelectValue placeholder="Filtrar pedidos" />
            </SelectTrigger>

            <SelectContent align="end">
              {filters.map((filter) => (
                <SelectItem key={filter} value={filter}>
                  {filter === "Todos" ? "Todos os pedidos" : filter}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

      </div>

      {/* Listagem */}
      <div className="grid min-w-0 grid-cols-1 items-start gap-6 2xl:grid-cols-[minmax(0,1fr)_280px]">
        <div className="min-w-0 space-y-4">
          <div className="flex flex-wrap items-end justify-between gap-2">
            <div>
              <h2 className="text-lg font-semibold tracking-tight text-slate-900">
                Meus pedidos
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                {filteredOrders.length}{" "}
                {filteredOrders.length === 1
                  ? "pedido encontrado"
                  : "pedidos encontrados"}
              </p>
            </div>

            {(search || activeFilter !== "Todos") && (
              <button
                type="button"
                onClick={clearFilters}
                className="text-sm font-medium text-blue-700 transition hover:text-blue-800"
              >
                Limpar filtros
              </button>
            )}
          </div>

          {filteredOrders.length === 0 ? (
            <div className="rounded-xl border border-dashed border-slate-300 bg-white px-5 py-12 text-center">
              <div className="mx-auto flex size-12 items-center justify-center rounded-xl bg-slate-100">
                <ShoppingBag className="size-6 text-slate-400" />
              </div>

              <h3 className="mt-4 font-semibold text-slate-800">
                {orders.length === 0
                  ? "Você ainda não tem pedidos"
                  : "Nenhum pedido encontrado"}
              </h3>

              <p className="mx-auto mt-2 max-w-sm text-sm leading-relaxed text-slate-500">
                {orders.length === 0
                  ? "Quando você tiver pedidos, poderá acompanhar o andamento por aqui."
                  : "Tente mudar o status selecionado ou pesquisar por outro termo."}
              </p>

              {(search || activeFilter !== "Todos") && (
                <Button
                  type="button"
                  variant="outline"
                  className="mt-4"
                  onClick={clearFilters}
                >
                  Limpar filtros
                </Button>
              )}
            </div>
          ) : (
            filteredOrders.map((order) => {
              const type = getStatusType(order.status ?? "");
              const config = statusConfig[type];
              const StatusIcon = config.icon;
              const progress = getProgress(type);
              const canceled = type === "cancelado";

              return (
                <article
                  key={order.id}
                  className="min-w-0 rounded-xl border border-slate-200 bg-white p-4 transition-colors hover:border-slate-300 sm:p-5"
                >
                  {/* Identificação do pedido */}
                  <div className="flex min-w-0 flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                    <div className="flex min-w-0 items-start gap-3">
                      <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-slate-100 text-slate-600">
                        <ShoppingBag className="size-5" />
                      </div>

                      <div className="min-w-0">
                        <p className="text-xs text-slate-500">
                          Número do pedido
                        </p>

                        <h3 className="mt-1 break-all text-base font-semibold text-slate-900">
                          {order.order_number
                            ? `PED-${order.order_number}`
                            : `PED-${String(order.id).slice(0, 8)}`}
                        </h3>
                      </div>
                    </div>

                    <span
                      className={`inline-flex w-fit max-w-full items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium ring-1 ring-inset ${config.badge}`}
                    >
                      <StatusIcon className="size-3.5 shrink-0" />
                      <span className="break-words">
                        {order.status || config.label}
                      </span>
                    </span>
                  </div>

                  {/* Atualização e valor */}
                  <div className="mt-5 flex min-w-0 flex-col gap-4 border-t border-slate-100 pt-4 sm:flex-row sm:items-start sm:justify-between">
                    <div className="min-w-0 flex-1">
                      <p className="text-xs font-medium text-slate-500">
                        Última atualização
                      </p>

                      <p className="mt-1 break-words text-sm leading-relaxed text-slate-700">
                        {order.status_description ||
                          "Nenhuma atualização adicional disponível."}
                      </p>
                    </div>

                    <div className="shrink-0 sm:min-w-32 sm:text-right">
                      <p className="text-xs text-slate-500">
                        Valor total
                      </p>

                      <p className="mt-1 text-lg font-semibold tracking-tight text-slate-900">
                        {formatCurrency(order.total)}
                      </p>
                    </div>
                  </div>

                  {/* Etapas do pedido */}
                  <div className="mt-5 border-t border-slate-100 pt-5">
                    {canceled ? (
                      <div className="flex items-start gap-2 text-sm text-red-700">
                        <XCircle className="mt-0.5 size-4 shrink-0" />
                        <span>
                          O acompanhamento deste pedido foi encerrado.
                        </span>
                      </div>
                    ) : (
                      <>
                        <div className="mb-5 flex flex-wrap items-center justify-between gap-2">
                          <p className="text-xs font-medium text-slate-500">
                            Etapas do pedido
                          </p>

                          <span className="text-xs text-slate-500">
                            {type === "concluido"
                              ? "Pedido finalizado"
                              : "Em acompanhamento"}
                          </span>
                        </div>

                        <div className="flex min-w-0 items-start">
                          {progressSteps.map((step, index) => {
                            const completed = index < progress;
                            const last =
                              index === progressSteps.length - 1;

                            return (
                              <div
                                key={step}
                                className={`relative flex min-w-0 flex-1 flex-col items-center ${!last
                                    ? "after:absolute after:left-1/2 after:top-2.5 after:h-0.5 after:w-full after:translate-x-1/2"
                                    : ""
                                  } ${!last && index + 1 < progress
                                    ? "after:bg-emerald-500"
                                    : !last
                                      ? "after:bg-slate-200"
                                      : ""
                                  }`}
                              >
                                <div
                                  className={`relative z-10 flex size-5 shrink-0 items-center justify-center rounded-full ${completed
                                      ? "bg-emerald-500 text-white"
                                      : "border-2 border-slate-200 bg-white text-slate-400"
                                    }`}
                                >
                                  {completed && (
                                    <Check className="size-3" />
                                  )}
                                </div>

                                <p
                                  className={`mt-2 max-w-full px-0.5 text-center text-[10px] leading-tight sm:text-xs ${completed
                                      ? "font-medium text-slate-700"
                                      : "text-slate-400"
                                    }`}
                                >
                                  {step}
                                </p>
                              </div>
                            );
                          })}
                        </div>

                        <p className="mt-4 text-xs leading-relaxed text-slate-400">
                          As etapas são uma indicação visual baseada
                          no status atual do pedido.
                        </p>
                      </>
                    )}
                  </div>
                </article>
              );
            })
          )}
        </div>

        {/* Painel auxiliar */}
        <aside className="flex min-w-0 flex-col gap-4">
          <div className="rounded-xl border border-slate-200 bg-white p-5">
            <div className="flex size-10 items-center justify-center rounded-lg bg-blue-50 text-blue-700">
              <ShieldCheck className="size-5" />
            </div>

            <h3 className="mt-4 font-semibold text-slate-900">
              Acompanhe com tranquilidade
            </h3>

            <p className="mt-2 text-sm leading-relaxed text-slate-500">
              Consulte as atualizações dos seus pedidos sempre que
              precisar.
            </p>

            <div className="mt-4 flex items-start gap-2 rounded-lg bg-slate-50 p-3">
              <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-emerald-600" />

              <p className="text-xs leading-relaxed text-slate-600">
                Seus pedidos ficam organizados para facilitar a consulta.
              </p>
            </div>
          </div>

          <div className="rounded-xl bg-gradient-to-br from-blue-950 to-blue-800 p-5 text-white">
            <div className="flex size-10 items-center justify-center rounded-lg bg-white/10">
              <Package className="size-5" />
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
              Meus orçamentos
              <ArrowRight className="ml-2 size-4" />
            </Button>
          </div>

          <div className="rounded-xl border border-slate-200 bg-white p-5">
            <div className="flex items-center gap-2">
              <Clock3 className="size-5 text-slate-500" />

              <h3 className="font-semibold text-slate-900">
                Precisa de ajuda?
              </h3>
            </div>

            <p className="mt-2 text-sm leading-relaxed text-slate-500">
              Se tiver dúvidas sobre o status ou os detalhes de um
              pedido, entre em contato com a equipe.
            </p>

            <a
              href="mailto:contato@alvesglass.com.br"
              className="mt-4 inline-flex items-center text-sm font-medium text-blue-700 transition hover:text-blue-800"
            >
              Falar com a equipe
              <ChevronRight className="ml-1 size-4" />
            </a>
          </div>
        </aside>
      </div>
    </section>
  );
};
