import Image from '@/assets/ImageAbout.jpg'
import Aos from 'aos';
import { useEffect } from 'react';
import { FaInstagram } from 'react-icons/fa';

export const InstagramSection = () => {
  useEffect(() => {
    Aos.init();
  }, [])
  return (
    <section className="w-full min-h-[35rem] h-auto bg-neutral-100 py-16 px-8">
      <div className="w-full text-center space-y-4 md:space-y-1 mb-10 md:mb-0" data-aos="zoom-in" data-aos-duration="1000">
        <h1 className="text-4xl font-semibold">Instagram</h1>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Quam delectus enim
        </p>
      </div>

      <div className="container mx-auto w-full h-full grid grid-cols-4 gap-8 items-center">

        <div
          className=" col-span-4 md:col-span-1 w-full h-64 rounded-lg relative bg-center bg-cover bg-no-repeat"
          style={{ backgroundImage: `url(https://img.freepik.com/fotos-gratis/design-de-interiores-de-cozinha-minimalista_23-2151008708.jpg)` }}
          data-aos="zoom-in"
          data-aos-duration="1000"
        >
          <FaInstagram className='absolute bottom-4 right-4 size-7 text-white' />
        </div>

        <div
          className=" col-span-4 md:col-span-1 w-full h-64 rounded-lg relative md:mt-20 bg-center bg-cover bg-no-repeat"
          style={{ backgroundImage: `url(https://img.freepik.com/fotos-gratis/banheiro-pequeno-com-estilo-e-decoracao-modernos_23-2150836697.jpg)` }}
          data-aos="zoom-in"
          data-aos-duration="1000"
        >
          <FaInstagram className='absolute bottom-4 right-4 size-7 text-white' />
        </div>

        <div
          className=" col-span-4 md:col-span-1 w-full h-64 rounded-lg relative bg-center bg-cover bg-no-repeat"
          style={{ backgroundImage: `url(https://img.freepik.com/fotos-gratis/interior-de-um-edificio-moderno-com-janelas-de-vidro-e-ambiente-branco_181624-8808.jpg)` }}
          data-aos="zoom-in"
          data-aos-duration="1000"
        >
          <FaInstagram className='absolute bottom-4 right-4 size-7 text-white' />
        </div>

        <div
          className=" col-span-4 md:col-span-1 w-full h-64 rounded-lg relative md:mt-20 bg-center bg-cover bg-no-repeat"
          style={{ backgroundImage: `url(${Image})` }}
          data-aos="zoom-in"
          data-aos-duration="1000"
        >
          <FaInstagram className='absolute bottom-4 right-4 size-7 text-white' />
        </div>
      </div>

    </section>
  )
}


