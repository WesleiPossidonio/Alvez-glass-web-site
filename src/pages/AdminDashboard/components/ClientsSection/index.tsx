import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { DialogClients } from "./components/DialogClients"
import { useClient } from "@/hooks/useClient"
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious
} from "@/components/ui/pagination"
import { OrderFormDialog } from "./components/OrderFormDialog"
import { PackagePlus } from "lucide-react"
import { UpdateDialogClients } from "./components/UpdateDialogClients"

export const ClientsSection = () => {
  const { listClients } = useClient()
  const [searchClient, setSearchClient] = useState('')
  const [currentPage, setCurrentPage] = useState(1)

  const pageSize = 8

  // 🔎 Filtragem
  const filteredClients = searchClient.length !== 0
    ? listClients.filter(client =>
      client.name.toLowerCase().includes(searchClient.toLowerCase()) ||
      client.cpf_cnpj.includes(searchClient))
    : listClients

  const totalPages = Math.ceil(filteredClients.length / pageSize)

  // 📄 Função para obter os itens da página atual
  const getPaginatedItems = () => {
    const startIndex = (currentPage - 1) * pageSize
    const endIndex = currentPage * pageSize
    return filteredClients.slice(startIndex, endIndex)
  }

  // 📑 Função para gerar a lista de páginas (com elipses)
  const getPaginationPages = (currentPage: number, totalPages: number) => {
    const delta = 2
    const pages: (number | string)[] = []

    for (let i = 1; i <= totalPages; i++) {
      if (i === 1 || i === totalPages || (i >= currentPage - delta && i <= currentPage + delta)) {
        pages.push(i)
      } else if (pages[pages.length - 1] !== "...") {
        pages.push("...")
      }
    }

    return pages
  }

  return (
    <section className="w-full h-full flex flex-col bg-white rounded-lg shadow p-8">
      <div className="mb-10">
        <h1 className="text-3xl font-semibold">Nossos Clientes</h1>
        <p className="text-gray-600 text-md">
          Gerencie seus clientes e visualize suas informações.
        </p>
      </div>

      <div className="w-full grid grid-cols-2 items-center">
        <Input
          type="text"
          placeholder="Buscar Cliente"
          className="w-2/3 py-6"
          onBlur={(e) => {
            setSearchClient(e.target.value)
            setCurrentPage(1) // resetar para primeira página ao buscar
          }}
        />

        <div className="w-full flex items-center justify-end gap-5 ">
          <Dialog>
            <DialogTrigger asChild>
              <Button className="text-md font-semibold py-6 bg-base-blue 
              hover:bg-base-blue-hover cursor-pointer transform ease-in duration-75">
                Adicionar Cliente
              </Button>
            </DialogTrigger>
            <DialogClients />
          </Dialog>
          <p className="font-semibold cursor-pointer hover:underline">
            Filtros
          </p>
        </div>
      </div>

      <div className="w-full mt-10 space-y-3">
        <p className="font-semibold text-lg">Lista de Clientes</p>
        <div className="w-full mt-5">
          {/* Cabeçalho */}
          <div className="w-full grid grid-cols-5 text-center p-3 rounded-sm 
          shadow-md bg-gray-100 mb-4"
          >
            <p className="col-span-1 font-semibold">Nome</p>
            <p className="col-span-1 font-semibold">CPF/CNPJ</p>
            <p className="col-span-1 font-semibold">Email</p>
            <p className="col-span-1 font-semibold">Telefone</p>
          </div>

          {/* Lista Paginada */}
          {
            getPaginatedItems().length === 0 ? (
              <p className="text-center py-6 text-gray-500">Nenhum cliente encontrado</p>
            ) : getPaginatedItems().map(client => (


              <div key={client.id} className="w-full grid grid-cols-5 items-center
              text-center p-2.5 rounded-sm shadow-md mb-3 cursor-pointer 
              hover:bg-gray-50 hover:text-neutral-950 transition"
              >
                <Dialog>
                  <DialogTrigger asChild>
                    <p className="text-sm text-neutral-700 hover:text-base-blue">{client.name}</p>
                  </DialogTrigger>
                  <UpdateDialogClients id={client.id} />
                </Dialog>
                <p className="text-sm text-neutral-700">{client.cpf_cnpj}</p>
                <p className="text-sm text-neutral-700">{client.email}</p>
                <p className="text-sm text-neutral-700">{client.phone}</p>
                <Dialog>
                  <DialogTrigger asChild>
                    <div className="flex items-center justify-center z-20">
                      <PackagePlus className="text-neutral-700 size-9 hover:text-base-blue z-20" />
                    </div>
                  </DialogTrigger>
                  <OrderFormDialog clientId={client.id} />
                </Dialog>
              </div>

            ))
          }
        </div>

        {/* Paginação */}
        {totalPages > 0 && (
          <Pagination>
            <PaginationContent className="my-3 self-end">
              {/* Anterior */}
              <PaginationItem>
                <PaginationPrevious
                  href="#"
                  onClick={(e) => {
                    e.preventDefault()
                    if (currentPage > 1) setCurrentPage(currentPage - 1)
                  }}
                />
              </PaginationItem>

              {/* Números de páginas */}
              {getPaginationPages(currentPage, totalPages).map((p, index) => (
                <PaginationItem key={index}>
                  {p === "..." ? (
                    <PaginationEllipsis />
                  ) : (
                    <PaginationLink
                      href="#"
                      isActive={currentPage === p}
                      onClick={(e) => {
                        e.preventDefault()
                        setCurrentPage(Number(p))
                      }}
                    >
                      {p}
                    </PaginationLink>
                  )}
                </PaginationItem>
              ))}

              {/* Próximo */}
              <PaginationItem>
                <PaginationNext
                  href="#"
                  onClick={(e) => {
                    e.preventDefault()
                    if (currentPage < totalPages) setCurrentPage(currentPage + 1)
                  }}
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        )}
      </div>
    </section>
  )
}
