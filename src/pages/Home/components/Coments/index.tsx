import { Star } from "lucide-react"
import Autoplay from "embla-carousel-autoplay"
import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel"
import { ReactGoogleReviews } from "react-google-reviews"
import "react-google-reviews/dist/index.css"
import image from "@/assets/BannerHero.jpg"

export const Coments = () => {
  const featurableWidgetId = "36bd4ab2-a057-4c3b-8d42-f4f49bc71a98"

  return (
    <section
      className="relative w-full flex items-center justify-center overflow-hidden py-16"
      style={{
        backgroundImage: `url(${image})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/50 z-0" />

      <div className="container mx-auto px-6 md:px-10 flex flex-col items-center gap-10 relative z-10">
        {/* Título */}
        <div className="text-center text-white space-y-2">
          <h4 className="font-semibold tracking-wide">Avaliações</h4>
          <h1 className="text-2xl md:text-4xl font-bold">
            O que falam da <span className="text-base-blue">Alves Glass</span>
          </h1>
          <p className="text-sm md:text-lg opacity-90">
            Veja o que nossos clientes dizem sobre o nosso trabalho
          </p>
        </div>

        {/* Google Reviews */}
        <Carousel
          className="w-full max-w-[900px]"
          plugins={[
            Autoplay({
              delay: 4000,
            }),
          ]}
        >

          <ReactGoogleReviews
            layout="custom"
            featurableId={featurableWidgetId}
            renderer={(reviews) => (
              <CarouselContent className="gap-x-6 w-[95%] mx-auto">
                {reviews.slice(0, 6).map(({ reviewId, reviewer, comment, starRating }) => (
                  <CarouselItem
                    key={reviewId}
                    className="bg-white/10 backdrop-blur-md border border-white/20 p-6 rounded-2xl shadow-md text-center text-white"
                  >
                    <p className="text-md font-semibold mb-2">{reviewer.displayName}</p>
                    <p className="text-sm italic opacity-90">“{comment}”</p>

                    {/* ⭐ Avaliação dinâmica */}
                    <div className="flex justify-center gap-1 mt-3">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-4 h-4 ${i < starRating ? 'text-yellow-400' : 'text-gray-400/40'
                            }`}
                        />
                      ))}
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
            )}
          />


        </Carousel>
      </div>
    </section>
  )
}
