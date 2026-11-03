
import { useEffect, useState } from "react";

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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Layers, PackagePlus, Tags } from "lucide-react";

import { useStockProduct } from "@/hooks/useStockProduct";

import {
  CategoryStockDialog,
  DialogCreatedProducts,
  DialogCreatedProductCategory,
  UpdateDialogProducts,
} from "./components";

export const Stock = () => {
  const {
    listProduct,
    pagination,
    setPage,
    search,
    setSearch,
    getListProducts,
    sectionsCategories,
  } = useStockProduct();

  const [entryExitState, setEntryExitState] =
    useState<"Entrada" | "Saída">("Entrada");

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

  useEffect(() => {
    const timer = setTimeout(() => {
      void getListProducts(1, pagination.limit, search);
    }, 500);

    return () => clearTimeout(timer);
  }, [search]);

  return (
    <section className="flex h-full w-full flex-col rounded-lg bg-white p-4 shadow sm:p-6 lg:p-8">
      {/* Cabeçalho */}
      <div className="mb-6 space-y-2">
        <h1 className="text-3xl font-semibold">Estoque</h1>

        <p className="text-md text-gray-600">
          Gerencie os produtos, setores e categorias do estoque.
        </p>
      </div>

      {/* Pesquisa e ações */}
      <div className="grid w-full grid-cols-1 gap-4 xl:grid-cols-[minmax(220px,1fr)_auto]">
        <Input
          type="text"
          placeholder="Buscar produto por nome ou código..."
          className="h-11 w-full"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <div className="flex flex-wrap items-center gap-2">
          {/* Novo produto */}
          <Dialog>
            <DialogTrigger asChild>
              <Button className="h-11 bg-base-blue font-semibold text-white hover:bg-base-blue-hover">
                <PackagePlus className="mr-2 size-4" />
                Novo produto
              </Button>
            </DialogTrigger>

            <DialogCreatedProducts />
          </Dialog>

          {/* Novo setor */}
          <Dialog>
            <DialogTrigger asChild>
              <Button
                variant="outline"
                className="h-11 font-semibold"
              >
                <Layers className="mr-2 size-4" />
                Novo setor
              </Button>
            </DialogTrigger>

            <CategoryStockDialog />
          </Dialog>

          {/* Nova categoria de produto */}
          <Dialog>
            <DialogTrigger asChild>
              <Button
                variant="outline"
                className="h-11 font-semibold"
              >
                <Tags className="mr-2 size-4" />
                Nova categoria
              </Button>
            </DialogTrigger>

            <DialogCreatedProductCategory />
          </Dialog>
        </div>

        {/* Filtros e movimentação */}
        <div className="col-span-1 flex flex-wrap items-center justify-between gap-4 border-t pt-4 xl:col-span-2">
          <div className="flex items-center gap-4">
            <button
              type="button"
              data-success={entryExitState}
              className="
                border-b-2 border-transparent pb-2
                text-base font-semibold text-neutral-500
                transition-colors hover:text-base-blue
                data-[success='Entrada']:border-base-blue
                data-[success='Entrada']:text-base-blue
              "
              onClick={() => setEntryExitState("Entrada")}
            >
              Entradas
            </button>

            <button
              type="button"
              data-success={entryExitState}
              className="
                border-b-2 border-transparent pb-2
                text-base font-semibold text-neutral-500
                transition-colors hover:text-base-blue
                data-[success='Saída']:border-base-blue
                data-[success='Saída']:text-base-blue
              "
              onClick={() => setEntryExitState("Saída")}
            >
              Saídas
            </button>
          </div>

          <Select>
            <SelectTrigger className="w-full sm:w-[220px]">
              <SelectValue placeholder="Filtrar por setor" />
            </SelectTrigger>

            <SelectContent>
              {sectionsCategories.map((section) => (
                <SelectItem
                  key={section.id}
                  value={String(section.id)}
                >
                  {section.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Lista de produtos */}
      <div className="mt-8 w-full space-y-4">
        <div>
          <h2 className="text-2xl font-semibold">
            Lista de produtos
          </h2>

          <p className="mt-1 text-sm text-gray-500">
            Consulte os produtos cadastrados e suas quantidades.
          </p>
        </div>

        <div className="w-full overflow-x-auto">
          <div className="min-w-[650px]">
            {/* Cabeçalho da tabela */}
            <div className="mb-4 grid grid-cols-5 rounded-sm bg-gray-100 p-3 text-center shadow-sm">
              <p className="font-semibold">Nome</p>
              <p className="font-semibold">Código</p>
              <p className="font-semibold">Quantidade</p>
              <p className="font-semibold">Categoria</p>
              <p className="font-semibold">Ações</p>
            </div>

            {/* Produtos */}
            {listProduct.length === 0 ? (
              <div className="rounded-lg border border-dashed py-12 text-center">
                <PackagePlus className="mx-auto mb-3 size-10 text-gray-400" />

                <p className="font-medium text-gray-700">
                  Nenhum produto encontrado
                </p>

                <p className="mt-1 text-sm text-gray-500">
                  Tente alterar a busca ou cadastre um novo produto.
                </p>
              </div>
            ) : (
              listProduct.map((item) => (
                <div
                  key={item.id}
                  className="
                    mb-3 grid grid-cols-5 items-center
                    rounded-sm p-3 text-center shadow-sm
                    transition-colors hover:bg-gray-50
                  "
                >
                  <Dialog>
                    <DialogTrigger asChild>
                      <button
                        type="button"
                        className="text-sm text-neutral-700 hover:text-base-blue"
                      >
                        {item.item_name}
                      </button>
                    </DialogTrigger>

                    <UpdateDialogProducts id={item.id} />
                  </Dialog>

                  <p className="text-sm text-neutral-700">
                    {item.code}
                  </p>

                  <p className="text-sm text-neutral-700">
                    {item.quantity}
                  </p>

                  <p className="text-sm text-neutral-700">
                    {item.product_category_id}
                  </p>

                  <div className="flex items-center justify-center">
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          aria-label={`Registrar movimentação de ${item.item_name}`}
                        >
                          <PackagePlus className="size-5 text-neutral-700 hover:text-base-blue" />
                        </Button>
                      </DialogTrigger>
                    </Dialog>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Paginação */}
        {pagination.totalPages > 1 && (
          <Pagination>
            <PaginationContent className="my-3">
              <PaginationItem>
                <PaginationPrevious
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();

                    if (pagination.page > 1) {
                      setPage(pagination.page - 1);
                    }
                  }}
                />
              </PaginationItem>

              {getPaginationPages(
                pagination.page,
                pagination.totalPages
              ).map((page, index) => (
                <PaginationItem key={`${page}-${index}`}>
                  {page === "..." ? (
                    <PaginationEllipsis />
                  ) : (
                    <PaginationLink
                      href="#"
                      isActive={pagination.page === page}
                      onClick={(e) => {
                        e.preventDefault();
                        setPage(Number(page));
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
                  onClick={(e) => {
                    e.preventDefault();

                    if (
                      pagination.page < pagination.totalPages
                    ) {
                      setPage(pagination.page + 1);
                    }
                  }}
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        )}
      </div>
    </section>
  );
};

