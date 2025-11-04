import * as zod from 'zod'

import { Button } from '@/components/ui/button'
import { DialogContent } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { useClient } from '@/hooks/useClient'

const addClientFormSchema = zod.object({
  name: zod.string().min(1, 'Marca é obrigatória'),
  email: zod.email('email é obrigatório'),
  cpf_cnpj: zod.string().min(11, 'CPF ou CNPJ é obrigatório').max(14, 'Máximo 14 caracteres'),
  phone: zod.string().min(9, 'Nª Celular é obrigatório').max(11, 'Máximo 11 caracteres'),
  rua: zod.string().min(3, 'o Nome da Rua é obrigatório'),
  numberHouse: zod.string().min(1, 'Número é obrigatório'),
  bairro: zod.string().min(3, 'Bairro é obrigatório'),
  cidade: zod.string().min(3, 'Cidade é obrigatório'),
  uf: zod.string().min(2, 'Estado é obrigatório'),
  cep: zod.string().min(8, 'CEP é obrigatório').max(8, 'Máximo 8 caracteres'),
})

type AddClientFormData = zod.infer<typeof addClientFormSchema>


export const DialogClients = () => {
  const {
    register,
    handleSubmit,
    // formState: { errors },
    reset,
    getValues,
  } = useForm<AddClientFormData>({
    resolver: zodResolver(addClientFormSchema),
    defaultValues: {
      cep: "",
      rua: "",
      bairro: "",
      cidade: "",
      uf: "",
    },
  })
  const { handleCreateClient } = useClient()

  const addClient = (data: AddClientFormData) => {
    handleCreateClient(data)
    reset()
  }

  const searchCep = async (cep: string) => {
    const cleanCep = cep.replace(/\D/g, "") // Remove caracteres não numéricos
    if (cleanCep.length !== 8) return

    try {
      const response = await fetch(`https://viacep.com.br/ws/${cleanCep}/json/`)
      const data = await response.json()

      if (data.erro) {
        console.error("CEP não encontrado")
        return
      }

      // Preenche os campos automaticamente
      reset({
        ...getValues(),
        rua: data.logradouro || "",
        bairro: data.bairro || "",
        cidade: data.localidade || "",
        uf: data.uf || "",
      })
    } catch (error) {
      console.error("Erro ao buscar CEP:", error)
    }
  }

  return (
    <DialogContent className='md:max-w-[90%] md:h-[90%]'>
      <h1 className='text-xl font-semibold mt-5'>Criar Cliente</h1>

      <form action="" className='w-full space-y-4' onSubmit={handleSubmit(addClient)}>
        <Input className='p-5' placeholder='Nome ' {...register('name')} />
        <Input className='p-5' placeholder='CPF ou CNPJ' {...register('cpf_cnpj')} />
        <Input className='p-5' placeholder='Email' {...register('email')} />
        <Input className='p-5' placeholder='Nª Telefone' {...register('phone')} />
        <p>Endereço Residencial</p>
        <Input className='p-5' placeholder='Cep'
          {...register('cep')} onBlur={(e) => searchCep(e.target.value)}
        />
        <Input className='p-5' placeholder='Nome da Rua' {...register('rua')} />
        <Input className='p-5' placeholder='Bairro' {...register('bairro')} />
        <Input className='p-5' placeholder='Cidade' {...register('cidade')} />
        <Input className='p-5' placeholder='Uf' {...register('uf')} />
        <Input className='p-5' placeholder='Nª Casa' {...register('numberHouse')} />
        <Button type='submit' className='bg-base-blue hover:bg-blue-800 py-6 font-semibold text-md
          cursor-pointer transform ease-in duration-75 mt-5'>
          Adicionar Cliente
        </Button>
      </form>
    </DialogContent>
  )
}


