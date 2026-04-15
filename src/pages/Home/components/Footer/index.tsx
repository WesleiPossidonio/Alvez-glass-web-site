import ImageLogo from '@/assets/Logo2.png'
import { EnvelopeIcon } from '@phosphor-icons/react'
import { MapPin, Phone } from 'lucide-react'

export const Footer = () => {
  return (
    <footer className="w-full bg-neutral-50 text-neutral-200 mt-16 py-14">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-5 gap-12 px-6 md:px-10">

        {/* LOGO + TEXTO */}
        <div className="md:col-span-2 flex flex-col gap-4">
          <img src={ImageLogo} className="w-32" alt="alves-glass-logo" />

          <p className="text-sm text-neutral-700 leading-relaxed max-w-sm">
            Atendimento personalizado e compromisso com a excelência em cada detalhe.
          </p>

          <p className="text-xs text-neutral-900 mt-2">
            Copyright © 2026 |
            <span className="font-medium text-neutral-700"> Todos os Direitos Reservados</span>
          </p>
        </div>

        {/* SUPORTE */}
        <div className="flex flex-col gap-4">
          <h2 className="text-sm font-semibold uppercase tracking-wider text-neutral-900">
            Suporte
          </h2>

          <div className="flex flex-col gap-3">
            <a
              href="#"
              className="text-sm text-neutral-700 hover:text-white transition-colors"
            >
              Política de Privacidade
            </a>
          </div>
        </div>

        {/* NAVEGAÇÃO */}
        <div className="flex flex-col gap-4">
          <h2 className="text-sm font-semibold uppercase tracking-wider text-neutral-900">
            Navegação
          </h2>

          <nav className="flex flex-col gap-3">
            {[
              { label: 'Home', href: '/' },
              { label: 'Sobre Nós', href: '#about' },
              { label: 'Serviços', href: '#services' },
              { label: 'Portfólio', href: '#portfolio' },
              { label: 'Contatos', href: '#contact' },
            ].map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="text-sm text-neutral-700 hover:text-white transition-colors"
              >
                {item.label}
              </a>
            ))}
          </nav>
        </div>

        {/* CONTATOS */}
        <div className="flex flex-col gap-4">
          <h2 className="text-sm font-semibold uppercase tracking-wider text-neutral-900">
            Contatos
          </h2>

          <div className="flex flex-col gap-4 text-sm">

            <a
              href="mailto:Alves.glass01@gmail.com"
              className="flex items-center gap-2 text-neutral-700 hover:text-white transition-colors"
            >
              <EnvelopeIcon className="size-5" />
              <span>Email</span>
            </a>

            <a
              href="tel:+2227724714"
              className="flex items-center gap-2 text-neutral-700 hover:text-white transition-colors"
            >
              <Phone className="size-5" />
              <span>(22) 27724714</span>
            </a>

            <div className="flex items-start gap-2 text-neutral-700">
              <MapPin className="size-5 mt-1" />
              <p className="leading-relaxed">
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