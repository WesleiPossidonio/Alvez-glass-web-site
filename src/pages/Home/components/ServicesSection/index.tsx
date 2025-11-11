import Autoplay from "embla-carousel-autoplay"
import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel"
import { useEffect } from "react"
import Aos from "aos"
import { Button } from "@/components/ui/button"
import { carouselItems } from "@/utils/ArrayServices"


export const ServicesSection = () => {
  useEffect(() => {
    Aos.init();
  }, [])

  return (
    <section className="w-full bg-neutral-100 min-h-[35rem] h-auto pb-10 md:pb-0 flex items-center" id="services">
      <div className="container mx-auto h-full grid grid-cols-5 gap-10 md:gap-4 px-6 md:px-8 ">

        <div className=" col-span-5 md:col-span-2 self-start space-y-2" data-aos="fade-right" data-aos-duration="1000">
          <p className="font-semibold text-base text-base-blue-blue"> - Serviços</p>
          <h1 className="text-2xl md:text-4xl font-semibold">
            Nós temos a <span className="text-base-blue"> solução  certa </span>
            para a <span className="text-base-blue">  sua obra! </span>
          </h1>

          <div>
            <p className="mt-3 text-neutral-600 text-sm md:text-md">
              Na <strong> Alves Glass Serviços </strong>, oferecemos
              uma ampla linha de produtos e serviços
              personalizados.
              Unimos <strong> beleza, segurança e
                funcionalidade </strong> para transformar seu
              projeto em um ambiente único e exclusivo.
            </p>
          </div>

          <Button className="w-56 py-6 mt-4 text-lg bg-base-blue border border-base-blue text-white font-semibold">
            <a href="https://wa.me/22981445335" target="_blank">
              Solicite um orçamento!
            </a>
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
            {
              carouselItems.map(list => {
                return (
                  <CarouselItem className="md:basis-1/2 xl:basis-1/2 relative" key={list.id}>
                    <div className="w-[95%] h-32 p-4 bg-white shadow-lg rounded-lg absolute left-10 -bottom-11 z-10 flex gap-4 items-start">
                      {list.icon}
                      <div>
                        <h3 className="font-semibold text-base text-base-blue">
                          {list.name}
                        </h3>
                        <p className="text-sm">
                          {list.text}
                        </p>
                      </div>
                    </div>
                    <a href="http://">
                      <img src={list.link_image}
                        alt="Esquadrias de Alumínio" className="w-full h-[17rem] rounded-lg shadow object-cover"
                      />
                    </a>
                  </CarouselItem>
                )
              })
            }
          </CarouselContent>
        </Carousel>

      </div>
    </section>
  )
}

