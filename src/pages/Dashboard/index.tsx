import Logo from '@/assets/Logo.png'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { CardSim, User } from 'lucide-react'

export const Dashboard = () => {
  return (
    <main className="w-full h-svh grid grid-cols-5">
      <aside className="col-span-1 flex flex-col gap-10 items-star bg-neutral-50 p-6">
        <img className='w-22 -ml-6' src={Logo} alt="" />

        <div className='w-full h-full flex flex-col justify-between'>
          <div className='space-y-2'>
            <div className='group flex items-center gap-1 py-3.5 px-2 rounded-md
             hover:bg-base-blue cursor-pointer transform ease-in-out duration-150'>
              <User className='group-hover:text-white size-7' />
              <p className='group-hover:text-white font-semibold'>Meus Dados</p>
            </div>

            <div className='group flex items-center gap-1 py-3.5 px-2 rounded-md
             hover:bg-base-blue cursor-pointer transform ease-in-out duration-150'>
              <CardSim className='group-hover:text-white size-7' />
              <p className='group-hover:text-white font-semibold'>Minhas Compras</p>
            </div>
          </div>

          <p className='text-neutral-500'>Log Out</p>
        </div>
      </aside>

      <div className="col-span-4 p-8 space-y-8">
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

        <div className='w-full space-y-3 mt-18'>
          <div className='w-full space-y-3 grid grid-cols-4 text-center px-4'>
            <h1 className='text-neutral-600 font-semibold'>Nome</h1>
            <h1 className='text-neutral-600 font-semibold'>Marca</h1>
            <h1 className='text-neutral-600 font-semibold'>Data de Entrega</h1>
            <h1 className='text-neutral-600 font-semibold'>Ação</h1>
          </div>

          <div className='w-full space-y-3'>
            <div className='w-full grid grid-cols-4 text-center items-center px-4 rounded'>
              <h1 className='text-sm font-semibold'>Produto 1</h1>
              <h1 className='text-sm font-semibold'>Marca 1</h1>
              <h1 className='text-sm font-semibold'> 25/04/2025</h1>

              <div>
                <Button className='bg-base-blue font-semibold w-18 py-6 
                hover:bg-blue-950 cursor-pointer'>
                  Ver Mais
                </Button>
              </div>
            </div>

            <div className='w-full grid grid-cols-4 text-center items-center px-4 rounded'>
              <h1 className='text-sm font-semibold'>Produto 1</h1>
              <h1 className='text-sm font-semibold'>Marca 1</h1>
              <h1 className='text-sm font-semibold'> 25/04/2025</h1>

              <div>
                <Button className='bg-base-blue font-semibold w-18 py-6 
                hover:bg-blue-950 cursor-pointer'>
                  Ver Mais
                </Button>
              </div>
            </div>
          </div>
        </div>

      </div>
    </main>
  )
}

