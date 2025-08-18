import Image from '@/assets/bg-bannerTwo.jpg'
import logo from '@/assets/Logo.png'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

export const Login = () => {
  return (
    <main className="w-full h-svh grid grid-cols-3">
      <div className="col-span-1 md:col-span-2 bg-image bg-cover bg-no-repeat" style={{ backgroundImage: `url(${Image})` }}></div>
      <div className="col-span-2 md:col-span-1 w-full p-4 md:p-8 flex flex-col justify-center gap-2 relative">
        <img src={logo} className='w-26 md:w-32 absolute top-0 left-0' alt="" />
        <div className='w-full space-y-2'>
          <h2 className='font-semibold text-base-blue'>- Login</h2>
          <h1 className='text-2xl md:text-5xl'>
            Bem Vindo  ao <br /> <span className='text-base-blue'> Portal do Usuário </span>
          </h1>
          <p className='text-sm md:text-md'>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Laborum ad
          </p>
        </div>

        <form className='w-full space-y-4 mt-6' action="">
          <Input className='shadow-md py-5 bg-neutral-50' placeholder='Email:' />
          <Input className='shadow-md py-5 bg-neutral-50' placeholder='Senha:' />

          <div className='w-full flex flex-col md:flex-row justify-between gap-2'>
            <Button className='w-36 text-lg py-6 bg-base-blue font-semibold cursor-pointer hover:bg-blue-900'>
              Entrar
            </Button>

            <div className='flex gap-1 text-sm md:text-md'>
              <p className='text-neutral-700'>Esqueci senha?</p>
              <p>Click aqui</p>
            </div>
          </div>

        </form>

      </div>
    </main>
  )
}


