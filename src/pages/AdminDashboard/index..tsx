import Logo from '@/assets/Logo.png'
import { ShoppingBagIcon, User, Users } from 'lucide-react'
import { useState } from 'react'
import { ClientsSection, MyData, ProductsSection } from './components'

export const AdminDashboard = () => {
  const [clickMenu, setClikMenu] = useState('')
  return (
    <main className="w-full h-dvh">
      <section className="w-full h-svh grid grid-cols-5">
        <aside className="col-span-1 flex flex-col gap-10 items-star bg-neutral-50 p-6">
          <div>
            <img className='w-22 -ml-6' src={Logo} alt="" />
          </div>

          <div className='w-full h-full flex flex-col justify-between'>
            <div className='space-y-2'>
              <div data-success={clickMenu} className='group flex items-center gap-1 py-3.5 px-2 border-l-6 border-neutral-50
             hover:border-base-blue cursor-pointer transform transition-all ease-in-out duration-350 
             data-[success="Meus-Dados"]:border-base-blue '>
                <User data-success={clickMenu} className='text-neutral-500 group-hover:text-base-blue size-7 data-[success="Meus-Dados"]:text-base-blue' />
                <p data-success={clickMenu} className='text-neutral-500 group-hover:text-neutral-900 
              font-semibold data-[success="Meus-Dados"]:text-neutral-900'
                  onClick={() => setClikMenu('Meus-Dados')}>
                  Meus Dados
                </p>
              </div>

              <div data-success={clickMenu} className='group flex items-center gap-1 py-3.5 px-2 border-l-6 border-neutral-50
             hover:border-base-blue data-[success="Produtos"]:border-base-blue cursor-pointer transform transition-all ease-in-out duration-350'>
                <ShoppingBagIcon data-success={clickMenu} className='text-neutral-500 group-hover:text-base-blue size-7 data-[success="Produtos"]:text-base-blue' />
                <p data-success={clickMenu} className='text-neutral-500 group-hover:text-neutral-900
               font-semibold data-[success="Produtos"]:text-neutral-900'  onClick={() => setClikMenu('Produtos')}>
                  Vendas
                </p>
              </div>

              <div data-success={clickMenu} className='group flex items-center gap-1 py-3.5 px-2 border-l-6 border-neutral-50
             hover:border-base-blue data-[success="Clientes"]:border-base-blue cursor-pointer transform transition-all ease-in-out duration-350'>
                <Users data-success={clickMenu} className='text-neutral-500 group-hover:text-base-blue size-7 data-[success="Clientes"]:text-base-blue' />
                <p data-success={clickMenu} className='text-neutral-500 group-hover:text-neutral-900
               font-semibold data-[success="Clientes"]:text-neutral-900'  onClick={() => setClikMenu('Clientes')}>
                  Clientes
                </p>
              </div>

            </div>

            <p className='text-neutral-500'>Log Out</p>
          </div>
        </aside>

        <div className='col-span-4'>
          {
            clickMenu === 'Meus-Dados' && <MyData /> ||
            clickMenu === 'Clientes' && <ClientsSection /> ||
            clickMenu === 'Produtos' && <ProductsSection /> ||
            <div className='w-full h-full flex flex-col justify-center items-center gap-4'>
              <h1 className='text-2xl font-bold text-neutral-900'>Bem vindo ao painel administrativo!</h1>
              <p className='text-neutral-600'>Selecione uma opção no menu para começar.</p>
            </div>


          }

        </div>

      </section>

    </main >
  )
}


