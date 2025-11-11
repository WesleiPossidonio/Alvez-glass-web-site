
import image from '@/assets/BannerHero.jpg'
import { Button } from '@/components/ui/button'


export const CallAction = () => {
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
        backgroundColor: 'rgba(0, 0, 0, 0.4)', // branco com 10% de opacidade
      }} />

      <div className="container mx-auto py-10 px-8 space-y-5 flex flex-col items-start justify-center gap-7 relative z-5">
        <div className="w-full flex flex-col items-center justify-start gap-5" data-aos="fade-right" data-aos-duration="1000">
          <div className="self-center text-center">
            <h1 className="text-white text-3xl md:text-4xl font-semibold drop-shadow-md">
              Design, elegância e exclusividade <br /> em cada detalhe.
            </h1>

            <p className="text-white text-md md:text-lg m-0 self-start drop-shadow-md mt-5">
              Soluções sob medida que unem estética refinada e performance. Um novo padrão de acabamento para quem exige o melhor.
            </p>

            <Button className="w-max py-7 mt-4 text-lg bg-base-blue border border-base-blue text-white font-semibold">
              <a href="https://wa.me/22981445335" target="_blank">
                Entrar em Contato agora!
              </a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
