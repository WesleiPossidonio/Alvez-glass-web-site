import { useEffect, useState } from 'react';
import { toast } from 'react-toastify'
import * as zod from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form";

import AOS from 'aos';
import 'aos/dist/aos.css';
import api from '@/services/api';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';

import { EnvelopeIcon, MapPinSimpleIcon, PhoneIcon } from "@phosphor-icons/react"


const sendEmailFormSchema = zod.object({
  name: zod.string().min(3, 'Por gentileza, digite o seu nome'),
  email: zod.string().email('Por gentileza, digite o seu email corretamente'),
  phone: zod
    .string()
    .min(11, 'Por gentileza, digite o numero de telefone corretamente')
    .max(11, 'Por gentileza, digite o numero sem caractere'),
  subject_text: zod.string().min(3, 'Digite sua dúvida'),
})

type createSendEmailFormInputs = zod.infer<typeof sendEmailFormSchema>

export const Contacts = () => {
  const [captcha, setCaptcha] = useState<string | null>('')
  useEffect(() => {
    AOS.init();
  }, [])

  const {
    register,
    handleSubmit,
    // formState: { errors },
    reset,
  } = useForm<createSendEmailFormInputs>({
    resolver: zodResolver(sendEmailFormSchema),
  })

  const handlesendMail = async (data: createSendEmailFormInputs) => {
    const { email, name, phone, subject_text, } = data

    const dataSendEmail = {
      email,
      name,
      phone,
      subject_text,
      captcha, // Incluindo o token reCAPTCHA
    }

    try {
      await toast.promise(api.post('sendMail', dataSendEmail), {
        pending: 'Verificando seus dados',
        success: 'Dúvida enviada com sucesso!',
        error: 'Verifique seus dado e faça novamente! 🤯',
      })
      reset()
      setCaptcha(null) // Resetando o captcha após o envio
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <section className="w-full h-auto min-h-[40rem] flex flex-col items-center justify-content-center gap-5 bg-white relative px-6 md:px-16" id='contacts'>
      <div className="w-full container xl:max-w-[80%] h-auto min-h-[35rem] py-14 px-6 md:px-8 flex flex-col gap-16" data-aos="zoom-in" data-aos-duration="1000"
      >
        <div className="flex flex-col items-center justify-center gap-1">
          <p className="text-black text-sm md:text-xl font-bold">Contatos</p>
          <div className="flex flex-col items-center justify-center gap-1">
            <h1 className="md:text-4xl text-black text-2xl font-bold text-center">Vamos Conversar! </h1>
            <h2 className="text-sm md:text-md text-black text-center">
              Entre em Contato e Dê o Próximo Passo para Impulsionar Seu Projeto.
            </h2>
          </div>
        </div>

        <div className='grid grid-cols-2 gap-16'>

          <div className='col-span-2 md:col-span-1 flex flex-col items-start justify-start gap-2'>
            <h2 className='text-2xl font-semibold'>
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
            </h2>
            <p className='text-sm'>
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Vitae esse iure, harum accusamus culpa dolorum vel
            </p>

            <div className='flex flex-col items-start justify-center gap-3 mt-5'>
              <div className='flex items-center gap-2'>
                <span className='bg-base-blue w-18 h-18 flex items-center justify-center rounded-2xl'>
                  <PhoneIcon size={42} color='#fff' />
                </span>

                <div>
                  <h1 className='font-semibold text-base-blue'>Telefone:</h1>
                  <a href="#" className='font-semibold'>(22) 22222-2222</a>
                </div>
              </div>

              <div className='flex items-center gap-2'>
                <span className='bg-base-blue w-18 h-18 flex items-center justify-center rounded-2xl'>
                  <EnvelopeIcon size={42} color='#fff' />
                </span>
                <div>
                  <h1 className='font-semibold text-base-blue'>Email:</h1>
                  <a href="#" className='font-semibold'>example@gmail.com</a>
                </div>
              </div>

              <div className='flex items-center gap-2'>
                <span className='bg-base-blue w-18 h-18 flex items-center justify-center rounded-2xl'>
                  <MapPinSimpleIcon size={42} color='#fff' />
                </span>

                <div className=''>
                  <h1 className='font-semibold text-base-blue'>Endereço:</h1>
                  <a href="#" className='font-semibold'>
                    R. Otávio Laurindo de Azevedo, N° 1040, <br /> Praia Campista, Macaé - RJ
                  </a>
                </div>
              </div>


            </div>
          </div>

          <form onSubmit={handleSubmit(handlesendMail)} className="w-full grid grid-cols-2 gap-6 col-span-2 md:col-span-1" action="">
            <Input className="col-span-2 md:col-span-1 py-3.5 md:py-6 
            text-sm md:text-md text-black placeholder:text-black bg-white"
              type="text" placeholder="Digite seu Nome"  {...register('name')} />
            <Input className="col-span-2 md:col-span-1 py-3.5 md:py-6 
            text-sm md:text-md text-black placeholder:text-black bg-white"
              type="tel" placeholder="Digite seu nº Telefone"  {...register('phone')} />
            <Input className="py-3.5 md:py-6 text-sm md:text-md col-span-2
          text-black placeholder:text-black bg-white" type="tel" placeholder="Digite seu E-Mail" {...register('email')} />
            <Textarea className=" h-25 md:h-48 md:py-6 text-sm md:text-md col-span-2 
          text-black placeholder:text-black bg-white" placeholder="Digite sua Mensagem" {...register('subject_text')} />
            <Button className="md:w-1/2 px-4 py-5 md:py-7 text-lg md:text-xl bg-base-blue hover:bg-blue-900 mt-2" >Enviar</Button>
          </form>
        </div>

      </div>
      <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3688.877171742176!2d-41.79094592377121!3d-22.395987419817306!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x96308a263ac2dd%3A0xee6992d202a10b1d!2sAlves%20Glass%20Servi%C3%A7os!5e0!3m2!1spt-BR!2sbr!4v1754438286292!5m2!1spt-BR!2sbr"
        loading="lazy" className='w-full h-92 rounded-2xl'
      ></iframe>
    </section>
  )
}


