import { Input } from "@/components/ui/input"
import { ShoppingCartIcon, User } from "lucide-react"

export const MyProducts = () => {
  return (
    <section className="col-span-4 p-8 space-y-8">
      <div className='w-full flex justify-between items-center'>
        <p className='font-semibold text-2xl'>
          Meus Pedidos
        </p>

        <div>
          <div className='flex items-center'>
            <span className='text-sm font-semibold'>Olá |</span>
            <User className='size-5' />
          </div>
          <p>Weslei Possidonio</p>
        </div>
      </div>

      <div className='w-full flex justify-between items-center'>
        <Input className='w-80' placeholder='Pesquise...' />
      </div>

      <div className="w-full flex items-center justify-start gap-4 border-b border-neutral-400 pl-3 pb-1">
        <p className="p-2 font-semibold border-b-2 border-white hover:border-b-base-blue cursor-pointer">Pedidos</p>
        <p className="p-2 font-semibold border-b-2 border-white hover:border-b-base-blue cursor-pointer">Pedidos Entregues</p>
      </div>

      {/* <div className='w-full space-y-3 mt-18'>
        <div className='w-full grid grid-cols-5 text-center items-center p-3 mb-4 shadow-md bg-neutral-100'>
          <h1 className='text-neutral-600 font-semibold'>Nome</h1>
          <h1 className='text-neutral-600 font-semibold'>Marca</h1>
          <h1 className='text-neutral-600 font-semibold'>Data de Entrega</h1>
          <h1 className='text-neutral-600 font-semibold'>Status</h1>
          <h1 className='text-neutral-600 font-semibold'>Mais Detalhes</h1>
        </div>

        <div className='w-full space-y-3'>
          <div className='w-full grid grid-cols-5 text-center items-center px-4 rounded shadow-md ' >
            <h1 className='text-sm text-neutral-600 font-semibold'>Produto 1</h1>
            <h1 className='text-sm text-neutral-600 font-semibold'>Marca 1</h1>
            <h1 className='text-sm text-neutral-600 font-semibold'> 25/04/2025</h1>
            <h1 className='text-sm text-neutral-600 font-semibold'> Em Andamento</h1>
            <div className='text-center flex justify-center'>
              <DockIcon className='size-11 text-base-blue' />
            </div>
          </div>

          <div className='w-full grid grid-cols-5 text-center items-center px-4 rounded shadow-md'>
            <h1 className='text-sm text-neutral-600 font-semibold'>Produto 1</h1>
            <h1 className='text-sm text-neutral-600 font-semibold'>Marca 1</h1>
            <h1 className='text-sm text-neutral-600 font-semibold'>25/04/2025</h1>
            <h1 className='text-sm text-neutral-600 font-semibold'>Em Andamento</h1>
            <div className='text-center flex justify-center'>
              <DockIcon className='size-11 text-base-blue' />
            </div>
          </div>
        </div>
      </div> */}

      <div className="w-full grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 items-center gap-6 mt-7">
        <div className="w-76 h-40 py-4 px-6 flex flex-col bg-neutral-50 shadow-md rounded-xl border border-neutral-50
         hover:border-base-blue transition-all duration-250 ease-in-out cursor-pointer">
          <div className="flex items-center justify-start gap-2">
            <ShoppingCartIcon className="size-8 text-base-blue" />
            <h1 className="text-lg font-semibold text-base-blue">Name Product</h1>
          </div>
          <p className="font-semibold text-neutral-500 self-end">Pendente</p>
        </div>
        <div className="w-76 h-40 py-4 px-6 bg-neutral-50 shadow-lg rounded-xl">Heloo</div>
        <div className="w-76 h-40 py-4 px-6 bg-neutral-50 shadow-lg rounded-xl">Heloo</div>
        <div className="w-76 h-40 py-4 px-6 bg-neutral-50 shadow-lg rounded-xl">Heloo</div>
      </div>
    </section>
  )
}


