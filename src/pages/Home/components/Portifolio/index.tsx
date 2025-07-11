import Image from '@/assets/ImageAbout.jpg'
import Aos from 'aos';
import { useEffect } from 'react';

export const Portifolio = () => {
  useEffect(() => {
    Aos.init();
  }, [])

  return (
    <section className="w-full min-h-[35rem] h-auto flex items-center p-16">
      <div className="container mx-auto h-full grid grid-cols-3 gap-5">

        <div className="col-span-3 flex flex-col items-center justify-center gap-1 mb-8" data-aos="zoom-in" data-aos-duration="1000">
          <p className="font-bold">Portifólio</p>
          <h3 className="text-3xl font-bold">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Porro repellendus tempora non provident vel
          </h3>
        </div>

        <img src={Image} alt="" className="col-span-1" data-aos="zoom-in" data-aos-duration="1000" />
        <img src={Image} alt="" className="col-span-1" data-aos="zoom-in" data-aos-duration="1000" />
        <img src={Image} alt="" className="col-span-1" data-aos="zoom-in" data-aos-duration="1000" />

      </div>
    </section>
  )
}

