import { Button } from "@/components/ui/button";
import Aos from "aos";
import { useEffect } from "react";

import Pergolado from "@/assets/ImageAboutMe-Two.webp";
import Esquadrilha from "@/assets/esquadrilahs.jpeg";
import Moveis from "@/assets/ImageAboutMeTree.webp";

export const About = () => {
  useEffect(() => {
    Aos.init();
  }, []);

  return (
    <section
      className="lg;w-[90%] h-auto mx-auto bg-white mb-13 bg-cover bg-no-repeat overflow-x-hidden"
      id="about"
    >
      <div className="container my-0 mx-auto grid grid-cols-2 sm:gap-0 md:gap-6 lg:gap-0 min-h-auto px-6 lg:px-10 py-24">
        <div
          className="col-span-2 md:col-span-1 flex items-center justify-center lg:justify-start 
        gap-3 relative order-2 lg:order-1 mt-11 md:mt-0"
          data-aos="fade-right"
          data-aos-duration="1000"
        >
          <div className="space-y-6">
            <div className="w-42 h-42 lg:w-74 lg:h-74">
              <img
                className="w-full h-full object-cover rounded-lg shadow"
                loading="lazy"
                src={Esquadrilha}
                alt=""
              />
            </div>

            <div className="w-32 h-32 lg:w-64 lg:h-54 ml-16">
              <img
                className="w-full h-full object-cover rounded-lg shadow"
                loading="lazy"
                src={Pergolado}
                alt=""
              />
            </div>
          </div>

          <div className=" w-56 h-56 lg:w-84 lg:h-64 -mt-27 lg:mr-25">
            <img
              className="w-full h-full object-cover rounded-lg shadow"
              loading="lazy"
              src={Moveis}
              alt=""
            />
          </div>
        </div>

        <div
          className="col-span-2 md:col-span-1 flex flex-col items-start justify-center gap-5 order-1 lg:order-2"
          data-aos="fade-left"
          data-aos-duration="1000"
        >
          <div className="space-y-1">
            <p className="text-md font-bold text-base-blue">- Sobre Nós</p>
            <h1 className=" text-2xl md:text-5xl font-bold text-neutral-700">
              Soluções sob medida em alumínio, vidro e móveis{" "}
              <span className="text-base-blue"> com precisão, elegância.</span>
            </h1>
          </div>
          <p className="text-sm md:text-md lg:text-lg text-gray-600">
            Somos uma empresa especializada em{" "}
            <strong>
              vidros em geral, esquadrias de alumínio e móveis planejados
            </strong>
            , unindo tecnologia, design e sofisticação para criar ambientes
            únicos. Atendemos tanto projetos residenciais quanto comerciais e
            industriais.
          </p>
          <p className="text-sm md:text-md lg:text-lg text-gray-600">
            Mais do que produtos, entregamos
            <strong> soluções personalizadas </strong> que refletem confiança,
            estilo e durabilidade — sempre com atendimento próximo e cuidadoso.
          </p>
          <Button
            className="w-56 py-6 mt-4 text-lg bg-base-blue border
           border-base-blue text-white font-semibold hover:bg-base-blue-hover"
          >
            <a href="https://wa.me/22981445335" target="_blank">
              Solicite um orçamento!
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
};
