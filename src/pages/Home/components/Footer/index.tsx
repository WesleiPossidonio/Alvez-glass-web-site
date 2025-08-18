import ImageLogo from '@/assets/Logo2.png'
export const Footer = () => {
  return (
    <footer className="w-full h-[20rem] bg-neutral-5git0 mt-16">
      <div className="container mx-auto flex flex-col md:flex-row items-start justify-between gap-5 px-8 py-16">
        <div className='space-y-3 md:space-y-2'>
          <img src={ImageLogo} className='w-35' alt="alves-glass-logo" />
          <p className='text-neutral-700 text-sm'>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. <br /> Assumenda, saepe. Ad veniam, magnam culpa
          </p>
        </div>

        <div className='space-x-5 flex flex-col md:flex-row md:gap-0 gap-2'>
          <a href="/">Home</a>
          <a href="#about">Sobre Nós</a>
          <a href="#services">Serviços</a>
          <a href="#portfolio">Portfólio</a>
          <a href="#contact">Contatos</a>
        </div>
      </div>
    </footer>
  )
}


