
import { useCallback, useEffect, useMemo, useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogTrigger,
} from "@/components/ui/dialog";

import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
  PaginationEllipsis,
} from "@/components/ui/pagination";

import { Plus, Search, Users, Trash2 } from "lucide-react";

import { DialogUsers } from "./components/DialogUsers";
import { UpdateDialogUsers } from "./components/UpdateDialogUsers";
import { useAdmin } from "@/hooks/useAdmin";
import type { User } from "@/contexts/AdminContext";

export const UsersSection = () => {
  const { getAllUsers, handleDeleteUser } = useAdmin();

  const [listUsers, setListUsers] = useState<User[]>([]);
  const [searchUser, setSearchUser] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);

  const limit = 10;

  const fetchUsers = useCallback(async () => {
    try {
      setLoading(true);
      const users = await getAllUsers();
      setListUsers(users);
    } catch (error) {
      console.error("Erro ao buscar usuários:", error);
    } finally {
      setLoading(false);
    }
  }, [getAllUsers]);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  const filteredUsers = useMemo(() => {
    const search = searchUser.toLowerCase().trim();

    if (!search) return listUsers;

    return listUsers.filter((user) =>
      [user.name, user.email].some((value) =>
        value?.toLowerCase().includes(search),
      ),
    );
  }, [listUsers, searchUser]);

  const totalPages = Math.ceil(filteredUsers.length / limit);

  const paginatedUsers = filteredUsers.slice(
    (currentPage - 1) * limit,
    currentPage * limit,
  );

  const handleDelete = async (id: string) => {
    const confirmed = window.confirm(
      "Tem certeza que deseja excluir este usuário?",
    );

    if (!confirmed) return;

    try {
      await handleDeleteUser(id);

      const updatedUsers = listUsers.filter((user) => user.id !== id);
      setListUsers(updatedUsers);

      const remainingPages = Math.ceil(
        updatedUsers.filter((user) => {
          const search = searchUser.toLowerCase().trim();

          return (
            !search ||
            [user.name, user.email].some((value) =>
              value?.toLowerCase().includes(search),
            )
          );
        }).length / limit,
      );

      if (currentPage > Math.max(remainingPages, 1)) {
        setCurrentPage(Math.max(remainingPages, 1));
      }
    } catch (error) {
      console.error("Erro ao excluir usuário:", error);
    }
  };

  const getPaginationPages = (page: number, pages: number) => {
    const delta = 2;
    const result: (number | string)[] = [];

    for (let i = 1; i <= pages; i++) {
      if (
        i === 1 ||
        i === pages ||
        (i >= page - delta && i <= page + delta)
      ) {
        result.push(i);
      } else if (result[result.length - 1] !== "...") {
        result.push("...");
      }
    }

    return result;
  };

  const gridColumns =
    "grid grid-cols-[minmax(180px,1fr)_minmax(220px,1.2fr)_minmax(150px,0.8fr)_80px]";

  return (
    <section className="flex h-full w-full flex-col rounded-lg bg-white p-4 shadow sm:p-6 lg:p-8">
      <div className="mb-6 space-y-2">
        <h1 className="text-3xl font-semibold">Usuários</h1>
        <p className="text-md text-gray-600">
          Gerencie os usuários que possuem acesso ao sistema.
        </p>
      </div>

      <div className="grid w-full grid-cols-1 gap-4 xl:grid-cols-[minmax(220px,1fr)_auto]">
        <div className="relative w-full">
          <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-gray-400" />
          <Input
            type="text"
            placeholder="Buscar usuário por nome, e-mail ou telefone..."
            className="h-11 w-full pl-9"
            value={searchUser}
            onChange={(event) => {
              setSearchUser(event.target.value);
              setCurrentPage(1);
            }}
          />
        </div>

        <Dialog>
          <DialogTrigger asChild>
            <Button className="h-11 bg-base-blue font-semibold text-white hover:bg-base-blue-hover">
              <Plus className="mr-2 size-4" />
              Adicionar usuário
            </Button>
          </DialogTrigger>

          <DialogUsers onCreated={fetchUsers} />
        </Dialog>
      </div>

      <div className="mt-8 w-full space-y-4">
        <div>
          <h2 className="text-2xl font-semibold">Lista de usuários</h2>
          <p className="mt-1 text-sm text-gray-500">
            Consulte, atualize ou remova os usuários cadastrados.
          </p>
        </div>

        <div className="w-full overflow-x-auto rounded-md border border-gray-100">
          <div className="min-w-[750px] p-2">
            <div
              className={`${gridColumns} mb-3 items-center rounded-md bg-gray-100 px-3 py-4 text-center`}
            >
              <p className="font-semibold">Nome</p>
              <p className="font-semibold">E-mail</p>
              <p className="font-semibold">Telefone</p>
              <p className="font-semibold">Ações</p>
            </div>

            {loading ? (
              <div className="py-12 text-center text-sm text-gray-500">
                Carregando usuários...
              </div>
            ) : paginatedUsers.length === 0 ? (
              <div className="rounded-lg border border-dashed py-12 text-center">
                <Users className="mx-auto mb-3 size-10 text-gray-400" />
                <p className="font-medium text-gray-700">
                  Nenhum usuário encontrado
                </p>
                <p className="mt-1 text-sm text-gray-500">
                  Tente buscar por outro termo ou cadastre um novo usuário.
                </p>
              </div>
            ) : (
              paginatedUsers.map((user) => (
                <div
                  key={user.id}
                  className={`${gridColumns} mb-2 items-center rounded-md border border-gray-100 px-3 py-2 text-center transition-colors hover:bg-gray-50`}
                >
                  <div className="min-w-0">
                    <Dialog>
                      <DialogTrigger asChild>
                        <button
                          type="button"
                          className="w-full truncate px-2 text-sm font-medium text-neutral-700 hover:text-base-blue"
                          title={user.name}
                        >
                          {user.name}
                        </button>
                      </DialogTrigger>

                      <UpdateDialogUsers
                        user={user}
                        onUpdated={fetchUsers}
                      />
                    </Dialog>
                  </div>

                  <p
                    className="truncate px-2 text-sm text-neutral-600"
                    title={user.email}
                  >
                    {user.email}
                  </p>

                  <div className="flex justify-center">
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      title="Excluir usuário"
                      aria-label={`Excluir usuário ${user.name}`}
                      onClick={() => handleDelete(user.id)}
                    >
                      <Trash2 className="size-5 text-neutral-600 transition-colors hover:text-red-600" />
                    </Button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

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

              {getPaginationPages(currentPage, totalPages).map(
                (page, index) => (
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
                ),
              )}

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
      </div>
    </section>
  );
};
