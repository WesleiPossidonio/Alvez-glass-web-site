import { useState } from "react"
import { Dialog, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious
} from "@/components/ui/pagination"

import { useOrderProduct } from "@/hooks/useOrderProducts"
import { ListTodo } from "lucide-react"
import { UpdateOrderFormDialog } from "./components/UpdateOrderFormDialog"


export const ProductsSection = () => {
  const { listOrderProduct } = useOrderProduct()
  const [searchClient, setSearchClient] = useState('')
  const [currentPage, setCurrentPage] = useState(1)

  const pageSize = 8

  // 🔎 Filtragem
  const filteredOrderProduct = searchClient.length !== 0
    ? listOrderProduct.filter(client =>
      client.order_number.toLowerCase().includes(searchClient.toLowerCase()))
    : listOrderProduct

  const totalPages = Math.ceil(filteredOrderProduct.length / pageSize)

  // 📄 Função para obter os itens da página atual
  const getPaginatedItems = () => {
    const startIndex = (currentPage - 1) * pageSize
    const endIndex = currentPage * pageSize
    return filteredOrderProduct.slice(startIndex, endIndex)
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
      <h1 className="text-2xl font-semibold mb-8">Adicionar Produtos</h1>

      <div className="w-full grid grid-cols-2 items-center px-3">
        <Input
          type="text"
          placeholder="Buscar Vendas"
          className="w-2/3 py-6"
          onBlur={(e) => {
            setSearchClient(e.target.value)
            setCurrentPage(1) // resetar para primeira página ao buscar
          }}
        />
      </div>

      <div className="w-full mt-10 space-y-3">
        <p className="font-semibold text-lg">Ultimas Vendas</p>
        <div className="w-full mt-5">
          {/* Cabeçalho */}
          <div className="w-full grid grid-cols-4 text-center p-3 rounded-sm 
          shadow-md bg-gray-100 mb-4"
          >
            <p className="col-span-1 font-semibold">Nª do Pedido</p>
            <p className="col-span-1 font-semibold">Valor Total</p>
            <p className="col-span-1 font-semibold">Status</p>
          </div>

          {/* Lista Paginada */}
          {
            getPaginatedItems().length === 0 ? (
              <p className="text-center py-6 text-gray-500">Nenhum cliente encontrado</p>
            ) : getPaginatedItems().map(client => (

              <div key={client.id} className="w-full grid grid-cols-4 items-center
              text-center p-2.5 rounded-sm shadow-md mb-3 cursor-pointer 
              hover:bg-gray-50 hover:text-neutral-950 transition"
              >
                <p className="text-sm text-neutral-700 font-semibold">{client.order_number}</p>
                <p className="text-sm text-neutral-700">{client.total}</p>
                <p className="text-sm text-neutral-700">{client.status}</p>
                <div className="flex items-center justify-center">
                  <Dialog>
                    <DialogTrigger asChild>
                      <ListTodo className="size-9 text-neutral-500 hover:text-base-blue z-20" />
                    </DialogTrigger>
                    <UpdateOrderFormDialog id={client.id} />
                  </Dialog>
                </div>
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
    </section >
  )
}
