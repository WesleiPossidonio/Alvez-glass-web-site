import Aos from 'aos';
import { useEffect } from 'react';

const galleryImages = [
  {
    id: 1,
    src: 'https://img.freepik.com/fotos-premium/interior-contemporaneo-da-cabina-de-duche-com-porta-com-moldura-de-metal-preto-plantas-da-casa-em-vaso_81262-1729.jpg',
    alt: 'Cabine de duche com moldura de metal preto',
  },
  {
    id: 2,
    src: 'https://img.freepik.com/fotos-gratis/interior-de-um-edificio-moderno-com-janelas-de-vidro-e-ambiente-branco_181624-8808.jpg',
    alt: 'Interior moderno com janelas de vidro',
  },
  {
    id: 3,
    src: 'https://img.freepik.com/psd-premium/maquete-do-logotipo-da-parede-do-escritorio_779229-19.jpg',
    alt: 'Mockup de logotipo em parede de escritório',
  },
  {
    id: 4,
    src: 'https://img.freepik.com/fotos-gratis/design-de-interiores-de-cozinha-minimalista_23-2151008708.jpg',
    alt: 'Cozinha minimalista branca',
  },
  {
    id: 5,
    src: 'https://img.freepik.com/fotos-gratis/entrada-da-casa-e-escadas-cultura-japonesa_23-2149301065.jpg',
    alt: 'Entrada de casa com escadas estilo japonês',
  },
  {
    id: 6,
    src: 'https://img.freepik.com/fotos-premium/armarios-de-cozinha-modernos-com-gavetas-retrateis_716147-5283.jpg',
    alt: 'Armários modernos com gavetas retráteis',
  },
];

export const Portifolio = () => {
  useEffect(() => {
    Aos.init();
  }, []);

  return (
    <section className="w-full min-h-[35rem] h-auto flex items-center p-8 md:p-16 " id='portfolio'>
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
          <div className="flex col-span-4 md:flex-col gap-5">
            <img
              src={galleryImages[0].src}
              alt={galleryImages[0].alt}
              className="h-[20rem] md:h-[36rem] w-full object-cover rounded-lg"
              data-aos="zoom-in"
              data-aos-duration="1000"
            />
          </div>

          {/* Coluna 2 */}
          <div className="flex flex-col md:flex-row col-span-4 gap-5">
            <img
              src={galleryImages[1].src}
              alt={galleryImages[1].alt}
              className="h-[14.75rem] w-full object-cover rounded-lg"
              data-aos="zoom-in"
              data-aos-duration="1000"
            />
            <img
              src={galleryImages[2].src}
              alt={galleryImages[2].alt}
              className="h-[20rem] w-full object-cover rounded-lg"
              data-aos="zoom-in"
              data-aos-duration="1000"
            />
          </div>

          {/* Coluna 3 */}
          <div className="flex flex-col  col-span-4 md:flex-row gap-5">
            <img
              src={galleryImages[3].src}
              alt={galleryImages[3].alt}
              className="h-[20rem] h-[20rem]md:h-[36rem] w-full object-cover rounded-lg"
              data-aos="zoom-in"
              data-aos-duration="1000"
            />
          </div>

          {/* Coluna 4 */}
          <div className="flex flex-col md:flex-row col-span-4 gap-5">
            <img
              src={galleryImages[4].src}
              alt={galleryImages[4].alt}
              className="h-[14.75rem] w-full object-cover rounded-lg"
              data-aos="zoom-in"
              data-aos-duration="1000"
            />
            <img
              src={galleryImages[5].src}
              alt={galleryImages[5].alt}
              className="md:h-[20rem] w-full object-cover rounded-lg"
              data-aos="zoom-in"
              data-aos-duration="1000"
            />
          </div>
        </div>
      </div>
    </section>
  );
};
