import Whatsapp from '@/assets/whatsapp.png'

export const WhatsappButton = () => {
  return (
    <a href='https://wa.me/' target='_blank' className="w-[3.5rem] fixed right-8 bottom-8 z-50 rounded-full whatsapp" rel='noreferrer' >
      <img src={Whatsapp} alt="" />
    </a>
  )
}

