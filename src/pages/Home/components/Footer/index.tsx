import ImageLogo from '@/assets/Logo2.png'
import { EnvelopeIcon } from '@phosphor-icons/react'
import { MapPin, Phone } from 'lucide-react'

export const Footer = () => {
  return (
    <footer className="w-full bg-neutral mt-16 py-12">
      <div className="container mx-auto grid grid-cols-5 gap-10 px-8">

        {/* LOGO + TEXTO */}
        <div className="col-span-5 md:col-span-2 flex flex-col gap-2 order-1 md:order-1">
          <img src={ImageLogo} className="w-32" alt="alves-glass-logo" />

          <p className="text-sm">
            Atendimento personalizado e compromisso <br />
            com a excelência em cada detalhe.
          </p>

          <p className="text-neutral-700 text-sm mt-2">
            Copyright &copy; 2025 |
            <span className="font-semibold"> Todos os Direitos Reservados </span>
          </p>
        </div>

        {/* SUPORTE */}
        <div className="col-span-5 md:col-span-1 flex flex-col gap-4 order-3 md:order-2">
          <h2 className="text-xl font-semibold">Suporte</h2>
          <div className="flex flex-col gap-3">
            <a href="#" className="text-md font-medium">Política de Privacidade</a>
          </div>
        </div>

        {/* NAVEGAÇÃO */}
        <div className="col-span-5 md:col-span-1 flex flex-col gap-4 order-2 md:order-3">
          <h2 className="text-xl font-semibold">Navegação</h2>
          <nav className="flex flex-col gap-3">
            <a className="text-md" href="/">Home</a>
            <a className="text-md" href="#about">Sobre Nós</a>
            <a className="text-md" href="#services">Serviços</a>
            <a className="text-md" href="#portfolio">Portfólio</a>
            <a className="text-md" href="#contact">Contatos</a>
          </nav>
        </div>

        {/* CONTATOS */}
        <div className="col-span-5 md:col-span-1 flex flex-col gap-4 order-4 md:order-4">
          <h2 className="text-xl font-semibold">Contatos</h2>
          <div className="flex flex-col gap-4">

            <div className="flex items-center gap-2">
              <EnvelopeIcon className="text-neutral-500 size-6" />
              <a href="mailto:Alves.glass01@gmail.com" className="text-md font-medium">
                Alves.glass01@gmail.com
              </a>
            </div>

            <div className="flex items-center gap-2">
              <Phone className="text-neutral-500 size-6" />
              <a href="tel:+2227724714" className="text-md font-medium">
                (22) 27724714
              </a>
            </div>

            <div className="flex items-center gap-2">
              <MapPin className="text-neutral-500 size-7" />
              <p className="text-md font-medium leading-tight">
                R. Otávio Laurindo de Azevedo, N° 1040 <br />
                Praia Campista, Macaé - RJ
              </p>
            </div>

          </div>
        </div>

      </div>
    </footer>
  )
}
