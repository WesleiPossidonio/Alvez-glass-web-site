import Image from '@/assets/ImageAbout.jpg'
import Aos from 'aos';
import { useEffect } from 'react';

export const InstagramSection = () => {
  useEffect(() => {
    Aos.init();
  }, [])
  return (
    <section className="w-full h-[35rem] bg-neutral-100 py-16 px-8">
      <div className="w-full text-center space-y-1" data-aos="zoom-in" data-aos-duration="1000">
        <h1 className="text-4xl font-semibold">Instagram</h1>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Quam delectus enim
        </p>
      </div>

      <div className="container mx-auto h-full grid grid-cols-4 gap-8 items-center">
        <img src={Image} alt="" className="col-span-1 w-full h-64 rounded object-cover" data-aos="zoom-in" data-aos-duration="1000" />
        <img src={Image} alt="" className="col-span-1 w-full h-64 rounded object-cover mt-20" data-aos="zoom-in" data-aos-duration="1000" />
        <img src={Image} alt="" className="col-span-1 w-full h-64 rounded object-cover" data-aos="zoom-in" data-aos-duration="1000" />
        <img src={Image} alt="" className="col-span-1 w-full h-64 rounded object-cover mt-20" data-aos="zoom-in" data-aos-duration="1000" />
      </div>
    </section>
  )
}


