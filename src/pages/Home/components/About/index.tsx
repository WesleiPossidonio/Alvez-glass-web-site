
import { Button } from '@/components/ui/button';
import Aos from 'aos';
import { useEffect } from 'react';
// import Image from '@/assets/ImageAbout.jpg'

import Pergolado from '@/assets/pergolado.jpeg'
import Esquadrilha from '@/assets/esquadrilahs.jpeg'
import Moveis from '@/assets/moveis-planejados.jpeg'

export const About = () => {
  useEffect(() => {
    Aos.init();
  }, [])

  return (
    <section className="w-[90%] h-auto mx-auto bg-white mb-13 bg-cover bg-no-repeat overflow-x-hidden" id='about'>
      <div className="container my-0 mx-auto grid grid-cols-2 min-h-auto px-6 md:px-10 py-24">
        <div className="col-span-1 flex items-center justify-center lg:justify-start 
        gap-3 relative order-2 lg:order-1 mt-11 md:mt-0" data-aos="fade-right" data-aos-duration="1000">

          {/* <div className="w-62 h-74 xl:w-[25rem] xl:h-[25rem] relative">
            <div className='w-62 h-62 md:w-full md:h-full border-5 border-base-blue rounded '></div>
            <img src={Image} alt="" className='w-62 h-62 md:w-full md:h-full rounded absolute top-5 left-5' />
          </div>

          <div className="absolute top-36 left-2 lg:top-20 lg:left-20 xl:top-32 xl:left-30">
            <div className='w-44 h-44 md:h-62 md:w-62 xl:w-[20rem] xl:h-[20rem] relative'>
              <div className='w-full h-full border-5 border-base-blue rounded absolute top-5 left-5'></div>
              <img src={Image} alt="" className=' w-full h-full rounded' />
            </div>
          </div> */}

          <div className='space-y-6'>
            <div className='w-74 h-74'>
              <img className='w-full h-full object-cover rounded-lg shadow' src={Esquadrilha} alt="" />
            </div>

            <div className='w-64 h-54 ml-16'>
              <img className='w-full h-full object-cover rounded-lg shadow' src={Moveis} alt="" />
            </div>
          </div>

          <div className='w-84 h-64 -mt-27 mr-25'>
            <img className='w-full h-full object-cover rounded-lg shadow' src={Pergolado} alt="" />
          </div>

        </div>

        <div className="col-span-1 flex flex-col items-start justify-center gap-3 order-1 lg:order-2" data-aos="fade-left" data-aos-duration="1000">
          <div className="space-y-1">
            <h3 className="text-md font-bold text-base-blue">- Sobre Nós</h3>
            <h1 className=" text-2xl md:text-4xl font-bold text-neutral-700">
              Soluções sob medida em alumínio, vidro e móveis <span className='text-base-blue'> com  precisão, elegância.</span>
            </h1>
          </div>
          <p className="text-sm md:text-md text-gray-600">
            Somos uma empresa especializada em <strong>
              vidros em geral, esquadrias de alumínio
              e móveis planejados</strong>, unindo tecnologia,
            design e sofisticação para criar ambientes
            únicos. Atendemos tanto projetos
            residenciais quanto comerciais e
            industriais.
          </p>
          <p className="text-sm md:text-md text-gray-600">
            Mais do que produtos, entregamos
            <strong> soluções personalizadas </strong> que refletem
            confiança, estilo e durabilidade — sempre
            com atendimento próximo e cuidadoso.
          </p>
          <Button className="w-56 py-6 mt-4 text-lg bg-base-blue border border-base-blue text-white font-semibold">
            <a href="https://wa.me/22981445335" target="_blank">
              Solicite um orçamento!
            </a>
          </Button>
        </div>

      </div>

    </section>
  )
}

