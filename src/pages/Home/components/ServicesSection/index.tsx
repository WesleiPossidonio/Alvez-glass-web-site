import Autoplay from "embla-carousel-autoplay"
import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel"
import Image from '@/assets/ImageAbout.jpg'
import { useEffect } from "react"
import Aos from "aos"

export const ServicesSection = () => {
  useEffect(() => {
    Aos.init();
  }, [])

  return (
    <section className="w-full bg-neutral-100 h-[35rem]">
      <div className="container mx-auto h-full flex items-center justify-center gap-14 pt-16 px-8 xl:px-0">

        <div className="w-1/3 h-[28rem] space-y-2 pt-10" data-aos="fade-right" data-aos-duration="1000">
          <p className="font-semibold"> - Serviços</p>
          <h1 className="text-3xl font-semibold">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Delectus quis
          </h1>
          <p className="mt-3">
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
            Laudantium aliquid nam ut sed adipisci iste quia perferendis laborum dol
          </p>
        </div>

        <Carousel className="w-2/3"
          plugins={[
            Autoplay({
              delay: 4500,
            }),
          ]}
          data-aos="zoom-in" data-aos-duration="1000"
        >
          <CarouselContent className="px-12 gap-12 ">
            <CarouselItem className="md:basis-1/2 xl:basis-1/3 relative pb-22">
              <div className="w-full h-28 p-4 bg-white shadow-lg rounded ml-6 mt-8 absolute bottom-12">
                <p>helooo 1</p>
              </div>

              <img src={Image} alt="" className="w-full h-72 rounded-lg shadow" />
            </CarouselItem>

            <CarouselItem className="md:basis-1/2 xl:basis-1/3 relative pb-22">
              <div className="w-full h-28 p-4 bg-white shadow-lg rounded ml-6 mt-8 absolute bottom-12">
                <p>helooo 2</p>
              </div>

              <img src={Image} alt="" className="w-full h-72 rounded-lg shadow" />
            </CarouselItem>

            <CarouselItem className="md:basis-1/2 xl:basis-1/3 relative pb-22">
              <div className="w-full h-28 p-4 bg-white shadow-lg rounded ml-6 mt-8 absolute bottom-12">
                <p>helooo 3</p>
              </div>

              <img src={Image} alt="" className="w-full h-72 rounded-lg shadow" />
            </CarouselItem>

            <CarouselItem className="md:basis-1/2 xl:basis-1/3 relative pb-22">
              <div className="w-full h-28 p-4 bg-white shadow-lg rounded ml-6 mt-8 absolute bottom-12">
                <p>helooo 4</p>
              </div>

              <img src={Image} alt="" className="w-full h-72 rounded-lg shadow" />
            </CarouselItem>
            <CarouselItem className="md:basis-1/2 xl:basis-1/3 relative pb-22">
              <div className="w-full h-28 p-4 bg-white shadow-lg rounded ml-6 mt-8 absolute bottom-12">
                <p>helooo 5</p>
              </div>

              <img src={Image} alt="" className="w-full h-72 rounded-lg shadow" />
            </CarouselItem>

            <CarouselItem className="md:basis-1/2 xl:basis-1/3 relative pb-22">
              <div className="w-full h-28 p-4 bg-white shadow-lg rounded ml-6 mt-8 absolute bottom-12">
                <p>helooo 6</p>
              </div>

              <img src={Image} alt="" className="w-full h-72 rounded-lg shadow" />
            </CarouselItem>
          </CarouselContent>
        </Carousel>
      </div>
    </section>
  )
}

