import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

import { User } from "lucide-react"


export const MyData = () => {
  return (
    <section className="flex flex-col items-center col-span-4 p-8 space-y-16">
      <div className='w-full flex justify-between items-center'>
        <p className='font-semibold text-2xl'>
          Meus Dados
        </p>

        <div>
          <div className='flex items-center'>
            <span className='text-sm font-semibold'>Olá |</span>
            <User className='size-5' />
          </div>
          <p>Weslei Possidonio</p>
        </div>
      </div>

      <form className="w-2/3 h-auto mt-36 flex flex-col items-center justify-center gap-3 py-8 px-6 border-2 rounded-md shadow-md">

        <Avatar className="w-32 h-32">
          <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>

        <div className="w-full space-y-3 mt-6">
          <Input className="py-4" placeholder="Nome" />
          <Input className="py-4" placeholder="Email" />
          <Input className="py-4" placeholder="Senha" />
        </div>

        <Button className="self-start mt-1 p-5 font-semibold bg-base-blue hover:bg-base-blue 
        hover:opacity-90 border-0 active:opacity-85 cursor-pointer"
        >
          Atualizar Perfil
        </Button>

      </form>
    </section>
  )
}


