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
        <CarouselItem className="h-svh relative border-0 bg-black bg-center bg-no-repeat flex items-center p-16">
          {/* Camada de imagem escurecida */}
          <div
            className="absolute inset-0 bg-cover bg-center filter brightness-80 z-0"
            style={{ backgroundImage: `url(${ImgBanner})` }}
          />

          {/* Conteúdo em cima da imagem */}
          <div className="relative z-10 w-2/3 flex flex-col gap-4 text-white">
            <p className="text-md font-semibold">
              Soluções em Vidro com Design Inteligente
            </p>
            <h1 className="text-6xl font-bold">
              Transformamos Vidro em Experiência, Elegância e Segurança.
            </h1>
            <p className="text-xl font-semibold">
              Nossa equipe é formada por especialistas que entendem a importância de cada detalhe — do primeiro atendimento à entrega final.
            </p>

            <div className="space-x-4">
              <Button className="w-52 py-7 text-lg bg-transparent border text-white font-semibold">Saiba Mais!</Button>
              <Button className="w-52 py-7 text-lg bg-base-blue border border-base-blue text-white font-semibold">Solicitar Orçamento!</Button>
            </div>

          </div>
        </CarouselItem>

        {/* <CarouselItem className="h-svh border-0 bg-center bg-cover bg-no-repeat flex items-center" style={{ backgroundImage: `url(${ImgBannerTwo})` }}>
          <p className="text-5xl">heloo</p>
        </CarouselItem> */}
      </CarouselContent>
    </Carousel >
  )
}


