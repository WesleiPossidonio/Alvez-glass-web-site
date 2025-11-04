import * as zod from 'zod'
import ReCAPTCHA from "react-google-recaptcha";
import { zodResolver } from '@hookform/resolvers/zod'
import { toast } from 'react-toastify';

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { useUser } from '@/hooks/userUser';

const confirmOrderLAdminValidationSchema = zod.object({
  email: zod.string().email('Informe o seu email'),
  password: zod.string().min(6, 'Informe a Senha'),
})

export type OrderLoginData = zod.infer<typeof confirmOrderLAdminValidationSchema>

type ConfirmOrderFormLoginData = OrderLoginData

export const LoginAdmin = () => {
  const {
    register,
    handleSubmit,
    // formState: { errors },
    reset,
  } = useForm<ConfirmOrderFormLoginData>({
    resolver: zodResolver(confirmOrderLAdminValidationSchema),
  })

  const { handleLoginUser } = useUser()

  const [captcha, setCaptcha] = useState<string | null>('')

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
      typeSessions: 'admin'
    }
    handleLoginUser(dataLogin)
    reset()
  }
  return (
    <section className="w-full h-svh flex items-center justify-center bg-neutral-100">
      <div className="bg-white w-[35rem] h-[28rem] rounded-lg shadow flex flex-col items-center gap-4 justify-center p-8">
        <p className="text-2xl">Login</p>
        <form className="w-full space-y-3" action="" onSubmit={handleSubmit(handleLogin)}>
          <Input className="p-3" placeholder="Email" {...register('email')} />
          <Input className="p-3" type="password" placeholder="Senha" {...register('password')} />
          <div id="self-start sm:w-[80%]" style={{ alignSelf: 'start ' }}>
            <ReCAPTCHA
              sitekey={import.meta.env.VITE_RECAPTCHA_KEY}
              onChange={handleCapcha}
            />
          </div>
          <Button className="w-32 py-4 bg-base-blue">Entrar</Button>
        </form>
      </div>
    </section>
  )
}



