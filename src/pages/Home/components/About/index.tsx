import Image from '@/assets/ImageAbout.jpg'
import { Button } from '@/components/ui/button';
import Aos from 'aos';
import { useEffect } from 'react';

export const About = () => {
  useEffect(() => {
    Aos.init();
  }, [])

  return (
    <section className="xl:max-w-[95rem] h-auto mx-auto bg-white mb-13 bg-cover bg-no-repeat overflow-x-hidden" id='about'>
      <div className="container flex flex-col lg:flex-row min-h-auto px-6 md:px-16 py-24">
        <div className="w-full lg:w-1/2 flex items-center justify-center lg:justify-start gap-3 relative order-2 lg:order-1 mt-11 md:mt-0" data-aos="fade-right" data-aos-duration="1000">

          <div className="w-62 h-74 xl:w-[25rem] xl:h-[25rem] relative">
            <div className='w-62 h-62 md:w-full md:h-full border-5 border-base-blue rounded '></div>
            <img src={Image} alt="" className='w-62 h-62 md:w-full md:h-full rounded absolute top-5 left-5' />
          </div>

          <div className="absolute top-36 left-2 lg:top-20 lg:left-20 xl:top-32 xl:left-30">
            <div className='w-44 h-44 md:h-62 md:w-62 xl:w-[20rem] xl:h-[20rem] relative'>
              <div className='w-full h-full border-5 border-base-blue rounded absolute top-5 left-5'></div>
              <img src={Image} alt="" className=' w-full h-full rounded' />
            </div>
          </div>

        </div>

        <div className="w-full lg:w-1/2 flex flex-col items-start justify-center gap-3 order-1 lg:order-2" data-aos="fade-left" data-aos-duration="1000">
          <div className="space-y-1">
            <h3 className="text-md font-bold text-base-blue">- Sobre Nós</h3>
            <h1 className=" text-2xl md:text-4xl font-bold text-neutral-700">
              Soluções sob medida em alumínio, vidro e móveis <span className='text-base-blue'> com  precisão, elegância.</span>
            </h1>
          </div>
          <p className="text-sm md:text-md text-gray-600">
            Na Alves Glass,<strong> unimos inovação, segurança e sofisticação para
              transformar ambientes com excelência. </strong> Com ampla experiência no mercado,
            oferecemos soluções completas em <strong> esquadrias de alumínio, vidros em
              geral e móveis planejados,</strong> atendendo projetos residenciais, comerciais e industriais.
          </p>
          <p className="text-sm md:text-md text-gray-600">
            Cada detalhe importa — por isso, trabalhamos com materiais certificados,
            equipe qualificada e um <strong> atendimento personalizado do início ao fim. </strong>
          </p>
          <Button className="w-56 py-6 mt-4 text-lg bg-base-blue border border-base-blue text-white font-semibold">
            Solicite um orçamento!
          </Button>
        </div>

      </div>

    </section>
  )
}

