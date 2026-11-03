import Autoplay from "embla-carousel-autoplay";
import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";

import ImgBanner from "@/assets/bg-bannerOne.webp";

export const Hero = () => {
  return (
    <Carousel
      className="h-[calc(100svh-5rem)] min-h-[34rem] w-full"
      plugins={[
        Autoplay({
          delay: 5000,
          stopOnInteraction: true,
        }),
      ]}
      opts={{ loop: true }}
    >

      <CarouselContent className="h-full text-white">
        <CarouselItem className="relative flex h-[calc(100svh-5rem)] min-h-[34rem] items-center border-0 bg-black bg-center bg-no-repeat px-6 sm:px-8 md:px-16">
          {/* Camada de imagem escurecida */}
          <img
            src={ImgBanner}
            alt=""
            fetchPriority="high"
            decoding="async"
            className="absolute inset-0 size-full object-cover brightness-[0.65]"
          />

          {/* <img
            src={list.link_image}
            alt={list.name}
            loading="lazy"
            decoding="async"
            className="h-[17rem] w-full rounded-lg object-cover"
          /> */}

          {/* Conteúdo em cima da imagem */}
          <div className="w-full relative z-10 md:w-2/3 flex flex-col gap-2 md:gap-4 text-white mt-26">
            <p className=" text-sm md:text-md font-semibold">
              Projetos residenciais, comerciais e industriais
            </p>
            <h1 className="text-3xl md:text-6xl font-bold mb-2">
              Vidros, <br className="md:hidden" /> Esquadrias de Alumínio e
              Móveis Planejados em um só lugar
            </h1>
            <p className="text-md md:text-xl font-semibold">
              Oferecemos soluções completas, da medição à instalação, garantindo
              excelência e segurança em cada etapa
            </p>

            <div className="w-full flex space-x-4 mt-2 md:mt-0">
              <a href="#about-me">
                <Button className="w-max md:w-52 py-7 text-md md:text-lg bg-transparent border text-white font-semibold">
                  Saiba Mais!
                </Button>
              </a>
              <a href="https://wa.me/22981445335" target="_blank">
                <Button className="w-max md:w-52 py-7 text-md md:text-lg bg-base-blue border border-base-blue text-white font-semibold hover:bg-base-blue-hover hover:border-base-blue-hover">
                  Solicitar Orçamento!
                </Button>
              </a>
            </div>
          </div>
        </CarouselItem>
      </CarouselContent>
    </Carousel>
  );
};
