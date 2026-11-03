
import { useState } from "react";

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
  Files,
  PackagePlus,
  Plus,
  Search,
  Users,
  Mail,
} from "lucide-react";

import { DialogClients } from "./components/DialogClients";
import { UpdateDialogClients } from "./components/UpdateDialogClients";
import { OrderFormDialog } from "./components/OrderFormDialog";
import { DialogListBudgets } from "./components/DialogListBudgets";

import { useClientManagement } from "@/hooks/ClientManagement";

export const ClientsSection = () => {
  const {
    listClients,
    pagination,
    currentPage,
    setCurrentPage,
    handleResendActivationCode,
  } = useClientManagement();

  const [searchClient, setSearchClient] = useState("");

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

  // Seis colunas: três campos de dados e três ações.
  const gridColumns =
    "grid grid-cols-[minmax(150px,1.2fr)_minmax(200px,1.5fr)_minmax(130px,1fr)_90px_90px_100px]";

  return (
    <section className="flex h-full w-full flex-col rounded-lg bg-white p-4 shadow sm:p-6 lg:p-8">
      {/* Cabeçalho */}
      <div className="mb-6 space-y-2">
        <h1 className="text-3xl font-semibold">
          Clientes
        </h1>

        <p className="text-md text-gray-600">
          Gerencie seus clientes, pedidos e orçamentos.
        </p>
      </div>

      {/* Busca e ações */}
      <div className="grid w-full grid-cols-1 gap-4 xl:grid-cols-[minmax(220px,1fr)_auto]">
        <div className="relative w-full">
          <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-gray-400" />

          <Input
            type="text"
            placeholder="Buscar cliente por nome, e-mail ou telefone..."
            className="h-11 w-full pl-9"
            value={searchClient}
            onChange={(e) => {
              setSearchClient(e.target.value);
              setCurrentPage(1);
            }}
          />
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <Dialog>
            <DialogTrigger asChild>
              <Button className="h-11 bg-base-blue font-semibold text-white hover:bg-base-blue-hover">
                <Plus className="mr-2 size-4" />
                Adicionar cliente
              </Button>
            </DialogTrigger>

            <DialogClients />
          </Dialog>
        </div>
      </div>

      {/* Lista de clientes */}
      <div className="mt-8 w-full space-y-4">
        <div>
          <h2 className="text-2xl font-semibold">
            Lista de clientes
          </h2>

          <p className="mt-1 text-sm text-gray-500">
            Consulte os dados cadastrados e acesse pedidos e orçamentos.
          </p>
        </div>

        {/* Tabela responsiva */}
        <div className="w-full overflow-x-auto rounded-md border border-gray-100">
          <div className="min-w-[900px] p-2">
            {/* Cabeçalho */}
            <div
              className={`${gridColumns} mb-3 items-center rounded-md bg-gray-100 px-3 py-4 text-center`}
            >
              <p className="font-semibold">Nome</p>
              <p className="font-semibold">E-mail</p>
              <p className="font-semibold">Telefone</p>
              <p className="font-semibold">Ativação</p>
              <p className="font-semibold">Pedidos</p>
              <p className="font-semibold">Orçamentos</p>
            </div>

            {/* Conteúdo */}
            {listClients.length === 0 ? (
              <div className="rounded-lg border border-dashed py-12 text-center">
                <Users className="mx-auto mb-3 size-10 text-gray-400" />

                <p className="font-medium text-gray-700">
                  Nenhum cliente encontrado
                </p>

                <p className="mt-1 text-sm text-gray-500">
                  Tente buscar por outro termo ou cadastre um novo cliente.
                </p>
              </div>
            ) : (
              listClients.map((client) => (
                <div
                  key={client.id}
                  className={`${gridColumns} mb-2 items-center rounded-md border border-gray-100 px-3 py-2 text-center transition-colors hover:bg-gray-50`}
                >
                  {/* Nome */}
                  <div className="min-w-0">
                    <Dialog>
                      <DialogTrigger asChild>
                        <button
                          type="button"
                          className="w-full truncate px-2 text-sm font-medium text-neutral-700 hover:text-base-blue"
                          title={client.name}
                        >
                          {client.name}
                        </button>
                      </DialogTrigger>

                      <UpdateDialogClients id={client.id} />
                    </Dialog>
                  </div>

                  {/* E-mail */}
                  <p
                    className="truncate px-2 text-sm text-neutral-600"
                    title={client.email}
                  >
                    {client.email}
                  </p>

                  {/* Telefone */}
                  <p
                    className="truncate px-2 text-sm text-neutral-600"
                    title={client.phone || "Não informado"}
                  >
                    {client.phone || "Não informado"}
                  </p>

                  {/* Reenviar código de ativação */}
                  <div className="flex justify-center">
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      aria-label={`Reenviar código de ativação para ${client.name}`}
                      title="Reenviar código de ativação"
                      onClick={() =>
                        handleResendActivationCode(client.id)
                      }
                    >
                      <Mail className="size-5 text-neutral-600 transition-colors hover:text-base-blue" />
                    </Button>
                  </div>

                  {/* Pedidos */}
                  <div className="flex justify-center">
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          aria-label={`Criar pedido para ${client.name}`}
                          title="Criar pedido"
                        >
                          <PackagePlus className="size-5 text-neutral-600 transition-colors hover:text-base-blue" />
                        </Button>
                      </DialogTrigger>

                      <OrderFormDialog clientId={client.id} />
                    </Dialog>
                  </div>

                  {/* Orçamentos */}
                  <div className="flex justify-center">
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          aria-label={`Ver orçamentos de ${client.name}`}
                          title="Ver orçamentos"
                        >
                          <Files className="size-5 text-neutral-600 transition-colors hover:text-base-blue" />
                        </Button>
                      </DialogTrigger>

                      <DialogListBudgets clientId={client.id} />
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

                    if (currentPage > 1) {
                      setCurrentPage(currentPage - 1);
                    }
                  }}
                />
              </PaginationItem>

              {getPaginationPages(
                currentPage,
                pagination.totalPages
              ).map((page, index) => (
                <PaginationItem key={`${page}-${index}`}>
                  {page === "..." ? (
                    <PaginationEllipsis />
                  ) : (
                    <PaginationLink
                      href="#"
                      isActive={currentPage === page}
                      onClick={(e) => {
                        e.preventDefault();
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
                  onClick={(e) => {
                    e.preventDefault();

                    if (currentPage < pagination.totalPages) {
                      setCurrentPage(currentPage + 1);
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
