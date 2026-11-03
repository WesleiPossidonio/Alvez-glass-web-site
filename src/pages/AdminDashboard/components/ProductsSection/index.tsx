
import { useEffect, useMemo, useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";

import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

import {
  ClipboardList,
  ListTodo,
  Search,
} from "lucide-react";

import { useOrderProduct } from "@/hooks/useOrderProducts";
import { UpdateOrderFormDialog } from "./components/UpdateOrderFormDialog";

export const ProductsSection = () => {
  const { listOrderProduct } = useOrderProduct();

  const [searchOrder, setSearchOrder] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const pageSize = 8;

  // Busca por número do pedido
  const filteredOrders = useMemo(() => {
    const search = searchOrder.trim().toLowerCase();

    if (!search) {
      return listOrderProduct;
    }

    return listOrderProduct.filter((order) =>
      String(order.order_number ?? "")
        .toLowerCase()
        .includes(search)
    );
  }, [listOrderProduct, searchOrder]);

  const totalPages = Math.ceil(filteredOrders.length / pageSize);

  // Mantém a página válida quando a pesquisa ou a lista mudar
  useEffect(() => {
    setCurrentPage(1);
  }, [searchOrder]);

  useEffect(() => {
    if (totalPages > 0 && currentPage > totalPages) {
      setCurrentPage(totalPages);
    }
  }, [currentPage, totalPages]);

  // Paginação
  const paginatedOrders = useMemo(() => {
    const startIndex = (currentPage - 1) * pageSize;

    return filteredOrders.slice(
      startIndex,
      startIndex + pageSize
    );
  }, [filteredOrders, currentPage]);

  const getPaginationPages = (
    currentPage: number,
    totalPages: number
  ) => {
    const delta = 2;
    const pages: (number | string)[] = [];

    for (let i = 1; i <= totalPages; i++) {
      if (
        i === 1 ||
        i === totalPages ||
        (i >= currentPage - delta &&
          i <= currentPage + delta)
      ) {
        pages.push(i);
      } else if (pages[pages.length - 1] !== "...") {
        pages.push("...");
      }
    }

    return pages;
  };

  const formatCurrency = (
    value: number | string | null | undefined
  ) => {
    const amount = Number(value ?? 0);

    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(Number.isFinite(amount) ? amount : 0);
  };

  return (
    <section className="flex h-full w-full flex-col rounded-lg bg-white p-4 shadow sm:p-6 lg:p-8">
      {/* Cabeçalho */}
      <div className="mb-6 space-y-2">
        <h1 className="text-3xl font-semibold">
          Pedidos
        </h1>

        <p className="text-md text-gray-600">
          Consulte os pedidos cadastrados e atualize seus status.
        </p>
      </div>

      {/* Busca */}
      <div className="grid w-full grid-cols-1 gap-4 xl:grid-cols-[minmax(220px,1fr)_auto]">
        <div className="relative w-full">
          <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-gray-400" />

          <Input
            type="text"
            placeholder="Buscar pedido pelo número..."
            className="h-11 w-full pl-9"
            value={searchOrder}
            onChange={(event) => {
              setSearchOrder(event.target.value);
              setCurrentPage(1);
            }}
          />
        </div>
      </div>

      {/* Lista de pedidos */}
      <div className="mt-8 w-full space-y-4">
        <div>
          <h2 className="text-2xl font-semibold">
            Lista de pedidos
          </h2>

          <p className="mt-1 text-sm text-gray-500">
            Visualize os valores, acompanhe os status e acesse os detalhes de cada pedido.
          </p>
        </div>

        <div className="w-full overflow-x-auto">
          <div className="min-w-[700px]">
            {/* Cabeçalho da tabela */}
            <div className="mb-4 grid grid-cols-[1.2fr_1.2fr_1fr_100px] items-center rounded-sm bg-gray-100 p-3 text-center shadow-sm">
              <p className="font-semibold">
                Nº do pedido
              </p>

              <p className="font-semibold">
                Valor total
              </p>

              <p className="font-semibold">
                Status
              </p>

              <p className="font-semibold">
                Ações
              </p>
            </div>

            {/* Conteúdo */}
            {paginatedOrders.length === 0 ? (
              <div className="rounded-lg border border-dashed py-12 text-center">
                <ClipboardList className="mx-auto mb-3 size-10 text-gray-400" />

                <p className="font-medium text-gray-700">
                  Nenhum pedido encontrado
                </p>

                <p className="mt-1 text-sm text-gray-500">
                  {searchOrder
                    ? "Tente buscar por outro número de pedido."
                    : "Os pedidos cadastrados aparecerão nesta seção."}
                </p>

                {searchOrder && (
                  <Button
                    type="button"
                    variant="ghost"
                    className="mt-3 text-base-blue hover:text-base-blue-hover"
                    onClick={() => setSearchOrder("")}
                  >
                    Limpar pesquisa
                  </Button>
                )}
              </div>
            ) : (
              paginatedOrders.map((order) => (
                <div
                  key={order.id}
                  className="
                    mb-3 grid
                    grid-cols-[1.2fr_1.2fr_1fr_100px]
                    items-center rounded-sm p-3 text-center
                    shadow-sm transition-colors hover:bg-gray-50
                  "
                >
                  {/* Número do pedido */}
                  <p
                    className="truncate px-2 text-sm font-medium text-neutral-700"
                    title={`Pedido ${order.order_number}`}
                  >
                    {order.order_number}
                  </p>

                  {/* Valor total */}
                  <p className="px-2 text-sm text-neutral-600">
                    {formatCurrency(order.total)}
                  </p>

                  {/* Status */}
                  <div className="flex justify-center px-2">
                    <span className="max-w-full truncate rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-700">
                      {order.status || "Não informado"}
                    </span>
                  </div>

                  {/* Ações */}
                  <div className="flex justify-center">
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          aria-label={`Atualizar pedido ${order.order_number}`}
                          title="Visualizar e atualizar pedido"
                        >
                          <ListTodo className="size-5 text-neutral-600 hover:text-base-blue" />
                        </Button>
                      </DialogTrigger>

                      <UpdateOrderFormDialog id={order.id} />
                    </Dialog>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Paginação */}
        {totalPages > 1 && (
          <Pagination>
            <PaginationContent className="my-3">
              <PaginationItem>
                <PaginationPrevious
                  href="#"
                  onClick={(event) => {
                    event.preventDefault();

                    if (currentPage > 1) {
                      setCurrentPage((page) => page - 1);
                    }
                  }}
                />
              </PaginationItem>

              {getPaginationPages(
                currentPage,
                totalPages
              ).map((page, index) => (
                <PaginationItem key={`${page}-${index}`}>
                  {page === "..." ? (
                    <PaginationEllipsis />
                  ) : (
                    <PaginationLink
                      href="#"
                      isActive={currentPage === page}
                      onClick={(event) => {
                        event.preventDefault();
                        setCurrentPage(Number(page));
                      }}
                    >
                      {page}
                    </PaginationLink>
                  )}
                </PaginationItem>
              ))}

              <PaginationItem>
                <PaginationNext
                  href="#"
                  onClick={(event) => {
                    event.preventDefault();

                    if (currentPage < totalPages) {
                      setCurrentPage((page) => page + 1);
                    }
                  }}
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        )}

        {/* Contagem */}
        {filteredOrders.length > 0 && (
          <p className="text-sm text-gray-500">
            Exibindo{" "}
            <span className="font-medium text-gray-700">
              {(currentPage - 1) * pageSize + 1}
              {"–"}
              {Math.min(
                currentPage * pageSize,
                filteredOrders.length
              )}
            </span>{" "}
            de{" "}
            <span className="font-medium text-gray-700">
              {filteredOrders.length}
            </span>{" "}
            pedidos.
          </p>
        )}
      </div>
    </section>
  );
};
