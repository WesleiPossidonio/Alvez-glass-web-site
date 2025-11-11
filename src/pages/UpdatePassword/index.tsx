import * as zod from 'zod'
import ReCAPTCHA from "react-google-recaptcha";
import { zodResolver } from '@hookform/resolvers/zod'
import { toast } from 'react-toastify';

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { useClient } from '@/hooks/useClient';

const validationSchema = zod.object({
  update_number: zod.string().min(6, 'O numero deve ter no mínimo 6 caracteres'),
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

  const { updatePassword } = useClient()
  const [captcha, setCaptcha] = useState<string | null>(null)

  const handleLogin = (data: FormData) => {
    if (!captcha) {
      toast.error('Captcha pendente!', {
        position: 'top-right',
      })
      return
    }
    updatePassword(data)
    reset()
  }

  return (
    <section className="w-full h-svh flex items-center justify-center bg-neutral-100">
      <div className="bg-white w-[35rem] h-[28rem] rounded-lg shadow flex flex-col items-center gap-4 justify-center p-8">
        <p className="text-2xl">Cadastrar senha</p>

        <form className="w-full space-y-3" onSubmit={handleSubmit(handleLogin)}>
          <div>
            <Input className="p-3" placeholder="Número de verificação" {...register('update_number')} />
            {errors.update_number && (
              <p className="text-red-500 text-sm">{errors.update_number.message}</p>
            )}
          </div>

          <div>
            <Input className="p-3" type="password" placeholder="Senha" {...register('password')} />
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

          <Button type="submit" className="w-32 py-4 bg-base-blue">Entrar</Button>
        </form>
      </div>
    </section>
  )
}
