import { Input } from "@/components/ui/input"

export const Header = () => {
  return (
    <header className="flex justify-between items-center">
      <div>
        <h1 className="text-3xl font-bold">
          Meus Pedidos
        </h1>

        <p className="text-neutral-500">
          Acompanhe o status dos seus produtos e instalações
        </p>
      </div>

      <Input
        placeholder="Buscar pedido..."
        className="w-72 bg-white"
      />
    </header>
  )
}


