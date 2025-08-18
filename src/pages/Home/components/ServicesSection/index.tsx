import Autoplay from "embla-carousel-autoplay"
import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel"
import Image from '@/assets/ImageAbout.jpg'
import { useEffect } from "react"
import Aos from "aos"
import { DoorOpen, Expand, LayoutPanelLeft, PanelsTopLeft, Ruler } from "lucide-react"
import { Button } from "@/components/ui/button"

export const ServicesSection = () => {
  useEffect(() => {
    Aos.init();
  }, [])

  return (
    <section className="w-full bg-neutral-100 min-h-[35rem] h-auto pb-10 md:pb-0" id="services">
      <div className="container mx-auto h-full grid grid-cols-5 items-center justify-center gap-10 md:gap-4 px-6 md:px-8 ">

        <div className=" col-span-5 md:col-span-2 self-start space-y-2 mt-14" data-aos="fade-right" data-aos-duration="1000">
          <p className="font-semibold text-base text-base-blue-blue"> - Serviços</p>
          <h1 className="text-2xl md:text-4xl font-semibold">
            Transformamos <span className="text-base-blue"> <br /> Vidro, Alumínio  e Design </span>  em Ambientes Incríveis
          </h1>
          <p className="mt-3 text-sm md:text-md">
            Soluções sob medida em esquadrias, vidros e móveis planejados que unem beleza, funcionalidade e sofisticação para o seu projeto.
          </p>

          <Button className="w-56 py-6 mt-4 text-lg bg-base-blue border border-base-blue text-white font-semibold">
            Solicite um orçamento!
          </Button>
        </div>

        <Carousel
          className="col-span-5 md:col-span-3 z-0 test h-[20rem]"
          plugins={[
            Autoplay({
              delay: 4500,
            }),
          ]}
          data-aos="zoom-in"
          data-aos-duration="1000"
        >
          <CarouselContent className="md:px-12 gap-12">

            {/* 1 - Esquadrias */}
            <CarouselItem className="md:basis-1/2 xl:basis-1/2 relative">

              <div className="w-[95%] h-28 p-4 bg-white shadow-lg rounded-lg absolute left-10 -bottom-8 z-10 flex gap-4 items-start">
                <DoorOpen className="text-neutral-700 size-8" />
                <div>
                  <h3 className="font-semibold text-base text-base-blue">Esquadrias de Alumínio</h3>
                  <p className="text-sm">Durabilidade e design com vedação térmica e acústica.</p>
                </div>
              </div>
              <img src='https://img.freepik.com/fotos-gratis/entrada-da-casa-e-escadas-cultura-japonesa_23-2149301065.jpg'
                alt="Esquadrias de Alumínio" className="w-full h-[17rem] rounded-lg shadow object-cover"
              />

            </CarouselItem>

            {/* 2 - Vidros Temperados */}
            <CarouselItem className="md:basis-1/2 xl:basis-1/2 relative">

              <div className="w-[95%] h-28 p-4 bg-white shadow-lg rounded-lg absolute left-10 -bottom-8 z-10 flex gap-4 items-start">
                <PanelsTopLeft className="text-neutral-700 size-8" />
                <div>
                  <h3 className="font-semibold text-base text-base-blue">Vidros Temperados</h3>
                  <p className="text-sm">Sofisticação e segurança em cada instalação.</p>
                </div>
              </div>
              <img src='https://img.freepik.com/vetores-gratis/ilustracao-da-montra-mostruario-de-vidro-iluminado-para-apresentacoes-e-exposicao-do-museu_1441-2462.jpg'
                alt="Vidros Temperados" className="w-full h-[17rem] rounded-lg shadow object-cover"
              />

            </CarouselItem>

            {/* 3 - Box para Banheiro */}
            <CarouselItem className="md:basis-1/2 xl:basis-1/2 relative">

              <div className="w-[95%] h-28 p-4 bg-white shadow-lg rounded-lg absolute left-10 -bottom-8 z-10 flex gap-4 items-start">
                <Ruler className="text-neutral-700 size-8" />
                <div>
                  <h3 className="font-semibold text-base text-base-blue">Box Sob Medida</h3>
                  <p className="text-sm">Funcionalidade e beleza com acabamento premium.</p>
                </div>
              </div>
              <img src='https://img.freepik.com/fotos-gratis/banheiro-pequeno-com-estilo-e-decoracao-modernos_23-2150836697.jpg'
                alt="Box de Vidro" className="w-full h-[17rem] rounded-lg shadow object-cover"
              />

            </CarouselItem>

            {/* 4 - Móveis Planejados */}
            <CarouselItem className="md:basis-1/2 xl:basis-1/2 relative">

              <div className="w-[95%] h-28 p-4 bg-white shadow-lg rounded-lg absolute left-10 -bottom-8 z-10 flex gap-4 items-start">
                <LayoutPanelLeft className="text-neutral-700 size-8" />
                <div>
                  <h3 className="font-semibold text-base text-base-blue">Móveis Planejados</h3>
                  <p className="text-sm">Personalização, aproveitamento e estilo único.</p>
                </div>
              </div>
              <img src='https://img.freepik.com/fotos-premium/armarios-de-cozinha-modernos-com-gavetas-retrateis_716147-5283.jpg'
                alt="Móveis Planejados" className="w-full h-[17rem] rounded-lg shadow object-cover"
              />

            </CarouselItem>

            {/* 5 - Fechamentos Panorâmicos */}
            <CarouselItem className="md:basis-1/2 xl:basis-1/2 relative">

              <div className="w-[95%] h-28 p-4 bg-white shadow-lg rounded-lg absolute left-10 -bottom-8 z-10 flex gap-4 items-start">
                <Expand className="text-neutral-700 size-8" />
                <div>
                  <h3 className="font-semibold text-base text-base-blue">Fechamentos Panorâmicos</h3>
                  <p className="text-sm">Integração visual com proteção e elegância.</p>
                </div>
              </div>
              <img src={Image} alt="Fechamento em Vidro" className="w-full h-[17rem] rounded-lg shadow object-cover" />

            </CarouselItem>

          </CarouselContent>
        </Carousel>

      </div>
    </section>
  )
}

