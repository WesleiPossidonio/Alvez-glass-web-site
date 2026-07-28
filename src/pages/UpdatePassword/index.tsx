import * as zod from 'zod';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
// import { useClient } from '@/hooks/useClient';
import { zodResolver } from '@hookform/resolvers/zod';
import ReCAPTCHA from "react-google-recaptcha";
import { toast } from 'react-toastify';

import bgAdmin from '@/assets/BgHero.webp'
import { Lock, Mail } from 'lucide-react';


const validationSchema = zod.object({
  email: zod.email('Digite o seu email coretamente'),
  password: zod.string().min(6, 'A senha deve ter no mínimo 6 caracteres'),
})

export type FormData = zod.infer<typeof validationSchema>

export const UpdatePassword = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>({
    resolver: zodResolver(validationSchema),
  })

  // const { updatePassword } = useClient()
  const [captcha, setCaptcha] = useState<string | null>(null)

  const handleLogin = (data: FormData) => {
    if (!captcha) {
      toast.error('Captcha pendente!', {
        position: 'top-right',
      })
      return
    }
   console.log(data)
    reset()
  }

  return (
    <section className="w-full h-svh flex items-center justify-center bg-cover bg-center relative" style={{ backgroundImage: `url(${bgAdmin})` }}>
      <div className="absolute inset-0 bg-black/30"></div>
      <div className="z-25 w-[35rem] h-[28rem] rounded-lg shadow flex flex-col items-center gap-4 justify-center p-8">
        <div className='text-center space-y-1'>
          <h1 className="text-5xl font-bold text-white">Bem Vindos</h1>
          <p className='text-neutral-200'>Lorem, ipsum dolor sit amet consectetu</p>
        </div>

        <form className="w-full space-y-5" onSubmit={handleSubmit(handleLogin)}>
          <div className='relative'>
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-200" />
            <Input className="h-13 pl-10 pr-4 py-3 text-xl text-white font-semibold border-2 rounded-none placeholder:text-white" placeholder="Email" {...register('email')} />
            {errors.email && (
              <p className="text-red-500 text-sm">{errors.email.message}</p>
            )}
          </div>

          <div className='relative'>
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-200" />
            <Input className="h-13 pl-10 pr-4 text-xl text-white font-semibold border-2 rounded-none placeholder:text-white" type="password" placeholder="Senha" {...register('password')} />
            {errors.password && (
              <p className="text-red-500 text-sm">{errors.password.message}</p>
            )}
          </div>

          <div className="self-start sm:w-[80%]">
            <ReCAPTCHA
              sitekey={import.meta.env.VITE_RECAPTCHA_KEY}
              onChange={(t) => setCaptcha(t)}
            />
          </div>

           <div className="w-full flex justify-end gap-1 text-sm md:text-md">
             <p className="text-neutral-100 font-semibold">Esqueci senha?</p>
             <p className="text-neutral-100 font-bold cursor-pointer">Click aqui</p>
           </div>

          <Button type="submit" className="w-40 h-11 py-4 text-lg font-semibold cursor-pointer bg-transparent border-2 rounded-none self-center hover:bg-neutral-50 hover:text-black">Entrar</Button>
        </form>
      </div>
    </section>
  )
}
