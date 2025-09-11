import Logo from '@/assets/Logo.png'

import { Input } from '@/components/ui/input'
import { CardSim, DockIcon, User } from 'lucide-react'
import { useState } from 'react'

export const Dashboard = () => {
  const [clickMenu, setClikMenu] = useState('')
  return (
    <main className="w-full h-svh grid grid-cols-5">
      <aside className="col-span-1 flex flex-col gap-10 items-star bg-neutral-50 p-6">
        <div>
          <img className='w-22 -ml-6' src={Logo} alt="" />
        </div>

        <div className='w-full h-full flex flex-col justify-between'>
          <div className='space-y-2'>
            <div data-success={clickMenu} className='group flex items-center gap-1 py-3.5 px-2 border-l-6 border-neutral-50
             hover:border-base-blue cursor-pointer transform ease-in-out duration-150 
             data-[success="Meus-Dados"]:border-base-blue '>
              <User data-success={clickMenu} className='text-neutral-500 group-hover:text-base-blue size-7 data-[success="Meus-Dados"]:text-base-blue' />
              <p data-success={clickMenu} className='text-neutral-500 group-hover:text-neutral-900 
              font-semibold data-[success="Meus-Dados"]:text-neutral-900'
                onClick={() => setClikMenu('Meus-Dados')}>
                Meus Dados
              </p>
            </div>

            <div data-success={clickMenu} className='group flex items-center gap-1 py-3.5 px-2 border-l-6 border-neutral-50
             hover:border-base-blue data-[success="Minhas-Compras"]:border-base-blue cursor-pointer transform ease-in-out duration-150'>
              <CardSim data-success={clickMenu} className='text-neutral-500 group-hover:text-base-blue size-7 data-[success="Minhas-Compras"]:text-base-blue' />
              <p data-success={clickMenu} className='text-neutral-500 group-hover:text-neutral-900
               font-semibold data-[success="Minhas-Compras"]:text-neutral-900'  onClick={() => setClikMenu('Minhas-Compras')}>
                Minhas Compras
              </p>
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
        </div>

      </div>
    </main>
  )
}

