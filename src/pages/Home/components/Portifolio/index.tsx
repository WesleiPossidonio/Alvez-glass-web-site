import imageCozinha from "@/assets/cozinhaTwo.webp";
import imageSacada from "@/assets/IMG_9432.webp";
import imagePorteiro from "@/assets/IMG_9638.webp";
import imageEscada from "@/assets/IMG_9882.webp";
import imageMoveis from "@/assets/IMG_8615.webp";
import ImageTwo from "@/assets/IMG_8173.webp";

const WHATSAPP_URL =
  "https://wa.me/5522981445335?text=" +
  encodeURIComponent(
    "Gostei desse projeto e quero entender melhor como funciona. Pode me ajudar?",
  );

const galleryImages = [
  {
    id: 1,
    src: imageMoveis,
    alt: "Projeto de móveis planejados em vidro",
    className: "md:row-span-2",
  },
  {
    id: 2,
    src: imageSacada,
    alt: "Projeto de fechamento de sacada com vidro",
    className: "md:row-span-1",
  },
  {
    id: 3,
    src: imageEscada,
    alt: "Projeto de escada com elementos em vidro",
    className: "md:row-span-1",
  },
  {
    id: 4,
    src: imagePorteiro,
    alt: "Projeto de instalação de vidro",
    className: "md:row-span-2",
  },
  {
    id: 5,
    src: ImageTwo,
    alt: "Projeto de vidro em ambiente residencial",
    className: "md:row-span-1",
  },
  {
    id: 6,
    src: imageCozinha,
    alt: "Projeto de cozinha com móveis planejados",
    className: "md:row-span-1",
  },
];

export const Portifolio = () => {
  return (
    <section
      id="portfolio"
      aria-labelledby="portfolio-title"
      className="w-full scroll-mt-24 px-4 py-12 sm:px-6 md:py-16 lg:px-16 lg:py-20"
    >
      <div className="container mx-auto flex flex-col gap-8 md:gap-10">
        <header className="flex w-full flex-col items-center justify-center gap-3 text-center md:gap-4">
          <p className="font-bold text-base-blue">Portfólio</p>

          <h2
            id="portfolio-title"
            className="max-w-6xl text-2xl font-semibold md:text-4xl lg:text-5xl"
          >
            Nosso portfólio de projetos realizados com{" "}
            <span className="text-base-blue">
              excelência e inovação
            </span>
          </h2>

          <p className="max-w-xl text-sm text-gray-500 md:text-base lg:text-lg">
            Conheça alguns dos nossos trabalhos e inspire-se para o seu próximo
            projeto.
          </p>
        </header>

        <div
          className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-4 md:auto-rows-[14rem] md:gap-5 lg:auto-rows-[16rem]"
          data-aos="zoom-in-up"
        >
          {galleryImages.map((image) => (
            <a
              key={image.id}
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Consultar pelo WhatsApp sobre: ${image.alt}`}
              className={`group relative block min-w-0 overflow-hidden rounded-lg bg-gray-100 outline-none focus-visible:ring-2 focus-visible:ring-base-blue focus-visible:ring-offset-2 ${image.className}`}
            >
              <img
                src={image.src}
                alt={image.alt}
                loading="lazy"
                decoding="async"
                className="h-40 w-full object-cover transition-transform duration-500 ease-out group-hover:scale-105 group-focus-visible:scale-105 sm:h-52 md:h-full"
              />

              <div className="absolute inset-0 flex items-end bg-gradient-to-t from-black/60 via-transparent to-transparent p-3 opacity-100 transition-opacity duration-300 sm:p-4 md:opacity-0 md:group-hover:opacity-100 md:group-focus-visible:opacity-100">
                <span className="text-sm font-medium text-white sm:text-base">
                  Converse com nossa equipe
                  <span aria-hidden="true"> ↗</span>
                </span>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};