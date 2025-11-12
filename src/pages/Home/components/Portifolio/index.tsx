import Aos from 'aos';
import { useEffect } from 'react';

import imageCozinha from '@/assets/cozinhaTwo.jpg'
import imageSacada from '@/assets/IMG_9432.jpg'
import imagePorteiro from '@/assets/IMG_9638.jpg'
import imageEscada from '@/assets/IMG_9882.jpg'
import imageMoveis from '@/assets/IMG_8615.jpg'
import ImageTwo from '@/assets/IMG_8173.jpg'


const galleryImages = [
  {
    id: 1,
    src: imageMoveis,
    alt: 'Cabine de duche com moldura de metal preto',
  },
  {
    id: 2,
    src: imageSacada,
    alt: 'Interior moderno com janelas de vidro',
  },
  {
    id: 3,
    src: imageEscada,
    alt: 'Mockup de logotipo em parede de escritório',
  },
  {
    id: 4,
    src: imagePorteiro,
    alt: 'Cozinha minimalista branca',
  },
  {
    id: 5,
    src: ImageTwo,
    alt: 'Entrada de casa com escadas estilo japonês',
  },
  {
    id: 6,
    src: imageCozinha,
    alt: 'Armários modernos com gavetas retráteis',
  },
];

export const Portifolio = () => {
  useEffect(() => {
    Aos.init();
  }, []);

  return (
    <section className="w-full min-h-[35rem] h-auto flex items-center p-8 lg:p-16 " id='portfolio'>
      <div className="container mx-auto h-full flex flex-col gap-10">

        {/* Título */}
        <div className="w-full flex flex-col items-center justify-center gap-1 text-center">
          <p className="font-bold text-base-blue">Portfólio</p>
          <h3 className="text-2xl md:text-4xl font-semibold max-w-3xl">
            Nosso portfólio de projetos realizados com{' '}
            <span className="text-base-blue">excelência e inovação</span>
          </h3>
          <p className="text-gray-500 text-sm max-w-xl">
            Veja abaixo uma seleção dos nossos melhores trabalhos organizados em uma galeria moderna e responsiva.
          </p>
        </div>

        {/* Galeria */}
        <div
          className="grid grid-cols-4 gap-5"
          data-aos="zoom-in-up"
          data-aos-duration="1000"
        >
          {/* Coluna 1 */}
          <div className="flex col-span-4 md:col-span-1 flex-col gap-5">
            <a href="https://wa.me/5522981445335?text=Gostei%20desse%20projeto%20e%20quero%20entender%20melhor%20como%20funciona.%20Pode%20me%20ajudar%3F%0A" target="_blank" rel="noopener noreferrer">
              <img
                src={galleryImages[0].src}
                alt={galleryImages[0].alt}
                className="h-[36rem] w-full object-cover rounded-lg"
                data-aos="zoom-in"
                data-aos-duration="1000"
              />
            </a>
          </div>

          {/* Coluna 2 */}
          <div className="flex flex-col col-span-4 md:col-span-1 gap-5">
            <a href="https://wa.me/5522981445335?text=Gostei%20desse%20projeto%20e%20quero%20entender%20melhor%20como%20funciona.%20Pode%20me%20ajudar%3F%0A" target="_blank" rel="noopener noreferrer">
              <img
                src={galleryImages[1].src}
                alt={galleryImages[1].alt}
                className="h-[14.75rem] w-full object-cover rounded-lg"
                data-aos="zoom-in"
                data-aos-duration="1000"
              />
            </a>
            <a href="https://wa.me/5522981445335?text=Gostei%20desse%20projeto%20e%20quero%20entender%20melhor%20como%20funciona.%20Pode%20me%20ajudar%3F%0A" target="_blank" rel="noopener noreferrer">
              <img
                src={galleryImages[2].src}
                alt={galleryImages[2].alt}
                className="h-[20rem] w-full object-cover rounded-lg"
                data-aos="zoom-in"
                data-aos-duration="1000"
              />
            </a>
          </div>

          {/* Coluna 3 */}
          <div className="flex flex-col col-span-4 md:col-span-1 gap-5">
            <a href="https://wa.me/5522981445335?text=Gostei%20desse%20projeto%20e%20quero%20entender%20melhor%20como%20funciona.%20Pode%20me%20ajudar%3F%0A" target="_blank" rel="noopener noreferrer">
              <img
                src={galleryImages[3].src}
                alt={galleryImages[3].alt}
                className="h-[36rem] w-full object-cover rounded-lg"
                data-aos="zoom-in"
                data-aos-duration="1000"
              />
            </a>
          </div>

          {/* Coluna 4 */}
          <div className="flex flex-col  col-span-4 md:col-span-1 gap-5">
            <a href="https://wa.me/5522981445335?text=Gostei%20desse%20projeto%20e%20quero%20entender%20melhor%20como%20funciona.%20Pode%20me%20ajudar%3F%0A" target="_blank" rel="noopener noreferrer">
              <img
                src={galleryImages[4].src}
                alt={galleryImages[4].alt}
                className="h-[14.75rem] w-full object-cover rounded-lg"
                data-aos="zoom-in"
                data-aos-duration="1000"
              />
            </a>
            <a href="https://wa.me/5522981445335?text=Gostei%20desse%20projeto%20e%20quero%20entender%20melhor%20como%20funciona.%20Pode%20me%20ajudar%3F%0A" target="_blank" rel="noopener noreferrer">
              <img
                src={galleryImages[5].src}
                alt={galleryImages[5].alt}
                className="h-[20rem] w-full object-cover rounded-lg"
                data-aos="zoom-in"
                data-aos-duration="1000"
              />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
