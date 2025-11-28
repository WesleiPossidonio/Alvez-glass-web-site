import ImageLogo from '@/assets/Logo2.png'
import { EnvelopeIcon } from '@phosphor-icons/react'
import { MapPin, Phone } from 'lucide-react'
export const Footer = () => {
  return (
    <footer className="w-full h-[20rem] bg-neutral mt-16">
      <div className="container mx-auto grid grid-cols-5 gap-5 px-8 md:py-16">
        <div className='col-span-5 md:col-span-2 space-y-3 md:space-y-2 order-4 md:order-1 mt-6'>
          <img src={ImageLogo} className='w-35' alt="alves-glass-logo" />
          <p className='text-sm'>Atendimento personalizado e compromisso <br /> com a excelência em cada detalhe.</p>
          <p className='text-neutral-700 text-sm'>
            Copyright &copy; 2025 | <span className="text-md font-semibold"> Todos os Direitos Reservados </span>
          </p>
        </div>

        <div className='col-span-5 md:col-span-1 space-x-5 flex flex-col gap-4'>
          <h2 className='text-xl font-semibold'>Suporte</h2>
          <div className="w-full flex flex-col gap-3">
            <a href="#" className="text-md font-medium">Política de Privacidade</a>
          </div>
        </div>

        <div className='col-span-5 md:col-span-1 space-x-5 flex flex-col gap-4'>
          <h2 className='text-xl font-semibold'>Navegação</h2>
          <div className='flex flex-col gap-3'>
            <a className='text-md' href="/">Home</a>
            <a className='text-md' href="#about">Sobre Nós</a>
            <a className='text-md' href="#services">Serviços</a>
            <a className='text-md' href="#portfolio">Portfólio</a>
            <a className='text-md' href="#contact">Contatos</a>
          </div>
        </div>

        <div className=" space-y-4.5 col-span-5 md:col-span-1">
          <h2 className='text-xl font-semibold'>Contatos</h2>
          <div className="w-full flex flex-col gap-3">
            <div className='flex items-center gap-2'>
              <EnvelopeIcon className='text-neutral-500 size-9' />
              <a href="mailto:Alves.glass01@gmail.com" className="text-md font-medium flex items-center gap-2">
                Alves.glass01@gmail.com
              </a>
            </div>

            <div className='flex items-center gap-2'>
              <Phone className="text-neutral-500 size-8" />
              <a href="tel:+2227724714" className="text-md font-medium flex items-center">
                (22) 27724714
              </a>
            </div>

            <div className='flex items-center gap-2'>
              <MapPin className="text-neutral-500 size-9 md:size-18" />
              <a href="#" className="text-md font-medium flex items-center gap-2">
                R. Otávio Laurindo <br className='md:hidden' /> de Azevedo, N° 1040, Praia Campista, Macaé - RJ
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}


