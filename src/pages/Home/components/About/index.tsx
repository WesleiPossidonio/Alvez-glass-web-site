import Image from '@/assets/ImageAbout.jpg'
import { Button } from '@/components/ui/button';
import Aos from 'aos';
import { useEffect } from 'react';

export const About = () => {
  useEffect(() => {
    Aos.init();
  }, [])

  return (
    <section className="xl:max-w-[95rem] mx-auto bg-white mb-13 bg-cover bg-no-repeat" id='about'>
      <div className="container flex h-max px-16 py-24">
        <div className="w-1/2 flex items-center justify-start gap-3 relative" data-aos="fade-right" data-aos-duration="1000">

          <div className="w-62 h-74 xl:w-[25rem] xl:h-[25rem] relative">
            <div className='w-full h-full border-5 border-base-blue rounded '></div>
            <img src={Image} alt="" className=' w-full h-full rounded absolute top-5 left-5' />
          </div>

          <div className="absolute lg:top-20 lg:left-20 xl:top-32 xl:left-30">
            <div className='h-62 w-62 xl:w-[20rem] xl:h-[20rem] relative'>
              <div className='w-full h-full border-5 border-base-blue rounded absolute top-5 left-5'></div>
              <img src={Image} alt="" className=' w-full h-full rounded' />

              {/* <div className="w-44 flex flex-col items-center justify-center bg-base-blue p-4 rounded-2xl shadow-md absolute -bottom-13 -right-14">
                <span className="text-4xl font-bold text-white">+500</span>
                <span className="text-md font-semibold text-white">Clientes Atendidos</span>
              </div> */}
            </div>
          </div>

        </div>

        <div className="w-1/2 flex flex-col items-start justify-center gap-3" data-aos="fade-left" data-aos-duration="1000">
          <div className="space-y-1">
            <h3 className="text-md font-bold text-base-blue">- Sobre Nós</h3>
            <h1 className="text-4xl font-bold text-neutral-700">
              Soluções sob medida em alumínio, vidro e móveis <span className='text-base-blue'> com  precisão, elegância.</span>
            </h1>
          </div>
          <p className="text-gray-600">
            Na Alves Glass,<strong> unimos inovação, segurança e sofisticação para
              transformar ambientes com excelência. </strong> Com ampla experiência no mercado,
            oferecemos soluções completas em <strong> esquadrias de alumínio, vidros em
              geral e móveis planejados,</strong> atendendo projetos residenciais, comerciais e industriais.
          </p>
          <p className="text-gray-600">
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

