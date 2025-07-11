import Image from '@/assets/ImageAbout.jpg'
import Icones from '@/assets/IconsAboutOne.svg'
import { useEffect } from 'react';
import Aos from 'aos';

export const AdjectsSection = () => {
  useEffect(() => {
    Aos.init();
  }, [])

  return (
    <section className="w-full h-[45rem] bg-white">
      <div className="container max-w-[85rem] h-full mx-auto flex items-center justify-evenly">

        <div className="w-1/2 flex items-center justify-start" data-aos="fade-right" data-aos-duration="1000">
          <div className='w-86 relative'>
            <img className='w-full border-t-4 border-l-4 border-blue-500 pt-4 pl-4' src={Image} alt="" />

            <div className="w-44 h-32 flex flex-col items-center justify-center bg-base-blue p-4 rounded-2xl shadow-md absolute -bottom-10 -right-14">
              <span className="text-4xl font-bold text-white">+500</span>
              <span className="text-md font-semibold text-white">
                Clientes Atendidos
              </span>
            </div>
          </div>
        </div>

        <div className="w-1/2 space-y-8" data-aos="fade-left" data-aos-duration="1000">
          <p className='text-3xl font-semibold'>
            Lorem ipsum, dolor sit amet consectetur adipisicing elit.
            Culpa vitae ipsa expedita ducimus porro quos
          </p>

          <div className='space-y-9'>
            <div className='flex items-center gap-4'>
              <img className='w-18' src={Icones} alt="" />
              <div>
                <h2 className='text-xl font-semibold'>
                  Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                </h2>
                <p className='w-2/3'>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Beatae quis excepturi tenetur illum laudantium lib
                </p>
              </div>
            </div>

            <div className='flex items-center gap-4 ml-11'>
              <img className='w-18' src={Icones} alt="" />
              <div>
                <h2 className='text-xl font-semibold'>
                  Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                </h2>
                <p className='w-2/3'>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Beatae quis excepturi tenetur illum laudantium lib
                </p>
              </div>
            </div>

            <div className='flex items-center gap-4'>
              <img className='w-18' src={Icones} alt="" />
              <div>
                <h2 className='text-xl font-semibold'>
                  Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                </h2>
                <p className='w-2/3'>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Beatae quis excepturi tenetur illum laudantium lib
                </p>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  )
}


