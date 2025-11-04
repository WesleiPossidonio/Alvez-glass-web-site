import * as zod from 'zod'
import ReCAPTCHA from "react-google-recaptcha";
import { zodResolver } from '@hookform/resolvers/zod'

import Image from '@/assets/BannerHero.jpg'
import logo from '@/assets/Logo.png'

import { Button } from '@/components/ui/button'
import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { useUser } from '@/hooks/userUser';
import { toast } from 'react-toastify';


const confirmOrderLoginValidationSchema = zod.object({
  email: zod.string().email('Informe o seu email'),
  password: zod.string().min(6, 'Informe a Senha'),
})

export type OrderLoginData = zod.infer<typeof confirmOrderLoginValidationSchema>

type ConfirmOrderFormLoginData = OrderLoginData

export const LoginClient = () => {

  const {
    register,
    handleSubmit,
    // formState: { errors },
    reset,
  } = useForm<ConfirmOrderFormLoginData>({
    resolver: zodResolver(confirmOrderLoginValidationSchema),
  })

  const [captcha, setCaptcha] = useState<string | null>('')
  const { handleLoginUser } = useUser()

  const handleCapcha = (token: string | null) => {
    setCaptcha(token)
  }

  const handleLogin = (data: ConfirmOrderFormLoginData) => {
    const { email, password } = data

    if (!captcha) {
      toast.error('Captcha pendente!', {
        position: 'top-right',
      })
      return
    }

    const dataLogin = {
      email,
      password,
      typeSessions: 'user'
    }
    handleLoginUser(dataLogin)
    reset()
  }

  return (
    <main className="w-full h-svh grid grid-cols-3">
      <div className="col-span-1 lg:col-span-2 bg-image bg-cover bg-no-repeat" style={{ backgroundImage: `url(${Image})` }}></div>
      <div className="col-span-2 lg:col-span-1 w-full p-4 md:p-8 flex flex-col justify-center gap-2 relative">
        <img src={logo} className='w-24 md:w-32 absolute top-0 left-0' alt="" />
        <div className='w-full space-y-2'>
          <h2 className='font-semibold text-base-blue'>- Login</h2>
          <h1 className='text-3xl md:text-5xl'>
            Bem Vindo  ao <br /> <span className='text-base-blue'> Portal do Usuário </span>
          </h1>
          <p className='text-sm md:text-md'>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Laborum ad
          </p>
        </div>

        <form className='w-full space-y-4 mt-6' action="" onSubmit={handleSubmit(handleLogin)}>
          <input className='w-full px-3 py-2 border-b-2 border-neutral-400 focus:outline-none' placeholder='Email:' {...register('email')} />
          <input className='w-full px-3 py-2 border-b-2 border-neutral-400 focus:outline-none' placeholder='Senha:' type='password' {...register('password')} />
          <div id="self-start sm:w-[80%]" style={{ alignSelf: 'start ' }}>
            <ReCAPTCHA
              sitekey={import.meta.env.VITE_RECAPTCHA_KEY}
              onChange={handleCapcha}
            />
          </div>

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


