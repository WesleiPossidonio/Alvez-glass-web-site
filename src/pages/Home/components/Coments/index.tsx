import { Star } from "lucide-react"
import Autoplay from "embla-carousel-autoplay"
import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel"
import image from '@/assets/bg-bannerOne.jpg'

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
    <section
      className="relative w-full h-auto flex items-center overflow-hidden"
      style={{
        minHeight: '35rem',
        backgroundImage: `url(${image})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed',
      }}
    >
      {/* Overlay branca sutil */}
      <div className="absolute inset-0 z-0 pointer-events-none" style={{
        backgroundColor: 'rgba(0, 0, 0, 0.3)', // branco com 10% de opacidade
      }} />

      <div className="container mx-auto py-10 px-8 space-y-5 flex flex-col items-start justify-center gap-7 relative z-5">
        <div className="w-full flex flex-col items-center justify-start gap-3" data-aos="fade-right" data-aos-duration="1000">
          <div className="self-center text-center">
            <h4 className="text-white font-semibold drop-shadow-md">Testemunhos</h4>
            <h1 className="text-white text-2xl md:text-3xl font-semibold drop-shadow-md">O que Falam da Alves Glass</h1>
            <p className="text-white text-md md:text-lg m-0 self-start drop-shadow-md">
              Veja o que nossos clientes dizem sobre o nosso trabalho
            </p>
          </div>
        </div>

        <Carousel
          className="w-full"
          plugins={[
            Autoplay({
              delay: 4000,
            }),
          ]}
          data-aos="zoom-in-up"
          data-aos-duration="1000"
        >
          <CarouselContent>
            {comentsArray.map((coment) => (
              <CarouselItem
                key={coment.id}
                className="md:basis-1/2 lg:basis-1/1 flex items-center justify-center px-3"
              >
                <div
                  className="w-2/3 h-64 p-6 flex flex-col items-center justify-center gap-3 rounded-2xl
                  bg-transparent backdrop-blur-lg border border-white/20
                  shadow-lg shadow-white/10 relative cursor-default
                  hover:scale-[1.03] transition-transform duration-300 text-center"
                >
                  <p className="text-md font-semibold text-white drop-shadow-md">{coment.name}</p>
                  <p className="text-sm text-white overflow-hidden italic drop-shadow-md">“{coment.text}”</p>
                  <div className="flex gap-1 mt-auto">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-5 h-5 ${i < 5 ? 'text-yellow-400' : 'text-gray-300'
                          }`}
                      />
                    ))}
                  </div>
                </div>

              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </div>
    </section>
  )
}
