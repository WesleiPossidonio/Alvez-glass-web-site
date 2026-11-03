import Autoplay from "embla-carousel-autoplay";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { Button } from "@/components/ui/button";
import { carouselItems } from "@/utils/ArrayServices";

export const ServicesSection = () => {
  return (
    <section
      className="flex h-auto min-h-[35rem] w-full items-center scroll-mt-24 bg-neutral-100 pb-10 md:pb-0"
      id="services"
    >
      <div className="container mx-auto grid h-full grid-cols-5 gap-10 px-6 md:gap-4 md:px-8">
        <div
          className="col-span-5 space-y-4 self-start md:col-span-2"
          data-aos="fade-right"
          data-aos-duration="1000"
        >
          <p className="text-base font-semibold text-base-blue-blue">
            - Serviços
          </p>

          <h1 className="text-2xl font-semibold md:text-5xl">
            Nós temos a <span className="text-base-blue">solução certa</span>{" "}
            para a <span className="text-base-blue">sua obra!</span>
          </h1>

          <div>
            <p className="mt-3 text-sm text-neutral-600 md:text-md lg:text-lg">
              Na <strong>Alves Glass Serviços</strong>, oferecemos uma ampla
              linha de produtos e serviços personalizados. Unimos{" "}
              <strong>beleza, segurança e funcionalidade</strong> para
              transformar seu projeto em um ambiente único e exclusivo.
            </p>
          </div>

          <Button
            asChild
            className="mt-4 w-56 border border-base-blue bg-base-blue py-6 text-lg font-semibold text-white hover:bg-base-blue-hover"
          >
            <a
              href="https://wa.me/5522981445335?text=Olá!%20Gostaria%20de%20solicitar%20um%20orçamento."
              target="_blank"
              rel="noopener noreferrer"
            >
              Solicite um orçamento!
            </a>
          </Button>
        </div>

        <Carousel
          className="test z-0 col-span-5 h-[20rem] md:col-span-3"
          plugins={[
            Autoplay({
              delay: 4500,
              stopOnInteraction: true,
            }),
          ]}
          data-aos="zoom-in"
          data-aos-duration="1000"
        >
          <CarouselContent className="gap-12 md:px-12">
            {carouselItems.map((list) => (
              <CarouselItem
                className="relative md:basis-2/2 xl:basis-1/2"
                key={list.id}
              >
                <div className="absolute -bottom-11 left-10 z-10 flex h-32 w-[95%] items-start gap-4 rounded-lg bg-white p-4 shadow-lg">
                  {list.icon}

                  <div>
                    <a
                      href={list.whatsapp}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <h3 className="text-base font-semibold text-base-blue">
                        {list.name}
                      </h3>
                    </a>

                    <p className="text-sm">{list.text}</p>
                  </div>
                </div>

                <img
                  src={list.link_image}
                  alt={list.name}
                  className="h-[17rem] w-full rounded-lg object-cover shadow"
                  loading="lazy"
                  decoding="async"
                />
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </div>
    </section>
  );
};