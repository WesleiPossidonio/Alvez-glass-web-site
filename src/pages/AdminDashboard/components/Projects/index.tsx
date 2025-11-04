import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { User } from "lucide-react"

export const Projects = () => {
  return (
    <section className="w-full h-svh p-8 flex flex-col">
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

      <div>
        <h2>Adicionar Novos Projetos</h2>
      </div>

      <form className="w-2/3 min-h-[25rem] h-auto mt-[12%] self-center flex flex-col items-start justify-center gap-4 py-8 px-6 border-2 rounded-md shadow-md">

        <Input type="text" placeholder="Nome do Projeto" className="ps-4 py-5" />
        <Input type="file" placeholder="Imagem do Projeto" className="border-0 border-b " />
        <Textarea placeholder="Descrição do Projeto" className="h-20 ps-4" />


        <button type="submit" className="bg-base-blue text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors">
          Adicionar Projeto
        </button>

      </form>
    </section>
  )
}


