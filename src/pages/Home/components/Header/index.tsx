import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { Menu, X } from "lucide-react" // Ícones para abrir/fechar o menu

import Logo from '@/assets/Logo.png'

export const Header = () => {
  const navigate = useNavigate()
  const [menuOpen, setMenuOpen] = useState(false)

  const toggleMenu = () => setMenuOpen(!menuOpen)

  // Função para navegação e manipulação de âncoras
  const handleNavigate = (path: string) => {
    if (path.startsWith('#')) {
      if (window.location.pathname !== '/') {
        navigate(`/${path}`) // ex: navegando para /#about
      } else {
        window.location.hash = path // ex: #about
      }
    } else {
      navigate(path) // rotas como /login-estudante ou /admin
    }

    if (menuOpen) toggleMenu()
  }

  return (
    <header className="bg-white lg:px-15 fixed top-0 z-10 w-full px-5">
      <div className="mx-auto flex items-center justify-between">
        <div onClick={() => handleNavigate('/')} className="flex justify-center items-center cursor-pointer">
          <img className="w-20 md:w-23.5" src={Logo} alt="" />
        </div>

        <nav className="hidden md:flex md:items-center space-x-6">
          <a className="md:text-lg text-black hover:text-base-blue font-semibold cursor-pointer" onClick={() => handleNavigate('/')}>Home</a>
          <a className="md:text-lg text-black hover:text-base-blue font-semibold cursor-pointer" onClick={() => handleNavigate('#about')}>Sobre Nós</a>
          <a className="md:text-lg text-black hover:text-base-blue font-semibold cursor-pointer" onClick={() => handleNavigate('#services')}>Serviços</a>
          <a className="md:text-lg text-black hover:text-base-blue font-semibold cursor-pointer" onClick={() => handleNavigate('#portfolio')}>Portfólio</a>
          <a className="md:text-lg text-black hover:text-base-blue font-semibold cursor-pointer" onClick={() => handleNavigate('#contacts')}>Contatos</a>

          <button
            onClick={() => handleNavigate('/login-estudante')}
            className="hover:text-base-blue font-semibold px-3 py-4 bg-base-blue text-white rounded-xl"
          >
            Portal do Cliente
          </button>
        </nav>

        {/* Ícone para menu mobile */}
        <button
          className="md:hidden text-gray-700"
          onClick={toggleMenu}
          aria-label="Abrir menu"
        >
          {menuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Menu mobile */}
      {menuOpen && (
        <nav className="md:hidden mt-4 flex flex-col items-center space-y-4 py-4">
          <a className="md:text-lg text-black hover:text-base-blue font-semibold cursor-pointer" onClick={() => handleNavigate('/')}>Home</a>
          <a className="md:text-lg text-black hover:text-base-blue font-semibold cursor-pointer" onClick={() => handleNavigate('#about')}>Sobre Nós</a>
          <a className="md:text-lg text-black hover:text-base-blue font-semibold cursor-pointer" onClick={() => handleNavigate('#services')}>Serviços</a>
          <a className="md:text-lg text-black hover:text-base-blue font-semibold cursor-pointer" onClick={() => handleNavigate('#contact')}>Contatos</a>

          <button
            onClick={() => handleNavigate('/login-estudante')}
            className="hover:text-base-blue font-semibold"
          >
            Portal do Cliente
          </button>
        </nav>
      )}
    </header>
  )
}
