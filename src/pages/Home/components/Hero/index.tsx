import Autoplay from "embla-carousel-autoplay"
import {
  Carousel,
  CarouselContent,
  CarouselItem
} from "@/components/ui/carousel"

import ImgBanner from "@/assets/bg-bannerOne.jpg"
// import ImgBannerTwo from "@/assets/bg-bannerTwo.jpg"
import { Button } from "@/components/ui/button"

export const Hero = () => {
  return (
    <Carousel className="w-full h-[calc(100svh - 6rem)]"
      plugins={[
        Autoplay({
          delay: 3500,
        }),
      ]}
      opts={{
        loop: true,
      }}>
      <CarouselContent className=" text-white">
        <CarouselItem className="h-svh relative border-0 bg-black bg-center bg-no-repeat flex items-center  px-8 md:p-16">
          {/* Camada de imagem escurecida */}
          <div
            className="absolute inset-0 bg-cover bg-center filter brightness-65 z-0"
            style={{ backgroundImage: `url(${ImgBanner})` }}
          />

          {/* Conteúdo em cima da imagem */}
          <div className="w-full relative z-10 md:w-2/3 flex flex-col gap-2 md:gap-4 text-white mt-26">
            <p className=" text-sm md:text-md font-semibold">
              Projetos residenciais, comerciais e
              industriais
            </p>
            <h1 className="text-2xl md:text-6xl font-bold mb-2">
              Vidros, <br className="md:hidden" /> Esquadrias de Alumínio e Móveis
              Planejados em um só lugar
            </h1>
            <p className="text-sm md:text-xl font-semibold">
              Oferecemos soluções completas, da
              medição à instalação, garantindo
              excelência e segurança em cada etapa
            </p>

            <div className="w-full flex space-x-4 mt-2 md:mt-0">
              <a href="#about-me">
                <Button className="w-max md:w-52 py-7 text-md md:text-lg bg-transparent border text-white font-semibold">Saiba Mais!</Button>
              </a>
              <a href="https://wa.me/22981445335" target="_blank">
                <Button className="w-max md:w-52 py-7 text-md md:text-lg bg-base-blue border border-base-blue text-white font-semibold">
                  Solicitar Orçamento!
                </Button>
              </a>
            </div>

          </div>
        </CarouselItem>
      </CarouselContent>
    </Carousel >
  )
}


