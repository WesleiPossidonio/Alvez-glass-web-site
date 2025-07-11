import { Star } from "lucide-react"
import Autoplay from "embla-carousel-autoplay"
import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel"

const comentsArray = [
  {
    name: 'Rafael',
    text: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Vero, quo suscipit. Dolore culpa voluptatem explicabo obcaecati, ullam sint rerum sequi voluptatibus accusamus, delectus reprehenderit impedit, harum quam aspernatur porro sunt.',
    id: 1,
  },

  {
    name: 'Claudia',
    text: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Vero, quo suscipit. Dolore culpa voluptatem explicabo obcaecati, ullam sint rerum sequi voluptatibus accusamus, delectus reprehenderit impedit, harum quam aspernatur porro sunt.',
    id: 2,
  },

  {
    name: 'Otávio',
    text: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Vero, quo suscipit. Dolore culpa voluptatem explicabo obcaecati, ullam sint rerum sequi voluptatibus accusamus, delectus reprehenderit impedit, harum quam aspernatur porro sunt.',
    id: 3,
  },

  {
    name: 'Sheila',
    text: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Vero, quo suscipit. Dolore culpa voluptatem explicabo obcaecati, ullam sint rerum sequi voluptatibus accusamus, delectus reprehenderit impedit, harum quam aspernatur porro sunt.',
    id: 4,
  },

  {
    name: 'Luiz Paulo',
    text: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Vero, quo suscipit. Dolore culpa voluptatem explicabo obcaecati, ullam sint rerum sequi voluptatibus accusamus, delectus reprehenderit impedit, harum quam aspernatur porro sunt.',
    id: 5,
  },

  {
    name: 'Larissa',
    text: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Vero, quo suscipit. Dolore culpa voluptatem explicabo obcaecati, ullam sint rerum sequi voluptatibus accusamus, delectus reprehenderit impedit, harum quam aspernatur porro sunt.',
    id: 6,
  },

]


export const Coments = () => {
  return (
    <section className="w-full h-auto flex items-center overflow-hidden bg-neutral-100" style={{ minHeight: '35rem' }}>
      <div className=" container mx-auto py-10 px-8 space-y-5 flex flex-col items-start justify-center gap-7">
        <div className="w-full flex flex-col items-center justify-start gap-3" data-aos="fade-right" data-aos-duration="1000">
          <div className="self-center text-center">
            <h4 className="text-black font-semibold">Testemunhos</h4>
            <h1 className="text-black text-2xl md:text-3xl font-semibold">O que Falam da Alves Glass</h1>
            <p className="text-black text-md md:text-lg m-0 self-start">
              Veja o que nossos clientes dizem sobre o nosso trabalho
            </p>
          </div>
        </div>

        <Carousel className="w-full" plugins={[
          Autoplay({
            delay: 4000,
          }),

        ]} data-aos="zoom-in-up" data-aos-duration="1000">
          <CarouselContent>
            {
              comentsArray.map(coments => {
                return (
                  <CarouselItem key={coments.id} className="md:basis-1/2 lg:basis-1/3 flex items-center justify-center">
                    <div className="w-full h-64 p-6 flex flex-col items-start justify-center gap-3 rounded-md shadow-sm bg-white">
                      <p className="text-md font-semibold">
                        {coments.name}
                      </p>
                      <p className="text-sm overflow-hidden">
                        {coments.text}
                      </p>
                      <div className="flex flex-col items-start justify-center gap-3">
                        <div className="flex">
                          <Star className="size-4 text-yellow-400" />
                          <Star className="size-4 text-yellow-400" />
                          <Star className="size-4 text-yellow-400" />
                          <Star className="size-4 text-yellow-400" />
                          <Star className="size-4 text-yellow-400" />
                        </div>
                      </div>

                    </div>
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


