import * as zod from 'zod'

import { Button } from '@/components/ui/button'
import { DialogContent } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { useClient } from '@/hooks/useClient'

interface UpdateDialogClientsProps {
  id: string
}

const updateClientFormSchema = zod.object({
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

type updateClientFormData = zod.infer<typeof updateClientFormSchema>


export const UpdateDialogClients = ({ id }: UpdateDialogClientsProps) => {
  const {
    register,
    handleSubmit,
    // formState: { errors },
    reset,
    getValues,
  } = useForm<updateClientFormData>({
    resolver: zodResolver(updateClientFormSchema),
  })
  const { handleUpdateClient, listClients } = useClient()

  const clientToUpdate = listClients.find(client => client.id === id)

  const updateClient = (data: updateClientFormData) => {
    const dataClient = {
      id,
      ...data,
    }
    handleUpdateClient(dataClient)
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

      <form action="" className='w-full space-y-4' onSubmit={handleSubmit(updateClient)}>
        <Input defaultValue={clientToUpdate?.name} className='p-5' placeholder='Nome ' {...register('name')} />
        <Input defaultValue={clientToUpdate?.cpf_cnpj} className='p-5' placeholder='CPF ou CNPJ' {...register('cpf_cnpj')} />
        <Input defaultValue={clientToUpdate?.email} className='p-5' placeholder='Email' {...register('email')} />
        <Input defaultValue={clientToUpdate?.phone} className='p-5' placeholder='Nª Telefone' {...register('phone')} />
        <p>Endereço Residencial</p>
        <Input defaultValue={clientToUpdate?.cep} className='p-5' placeholder='Cep'
          {...register('cep')} onBlur={(e) => searchCep(e.target.value)}
        />
        <Input defaultValue={clientToUpdate?.rua} className='p-5' placeholder='Nome da Rua' {...register('rua')} />
        <Input defaultValue={clientToUpdate?.bairro} className='p-5' placeholder='Bairro' {...register('bairro')} />
        <Input defaultValue={clientToUpdate?.cidade} className='p-5' placeholder='Cidade' {...register('cidade')} />
        <Input defaultValue={clientToUpdate?.uf} className='p-5' placeholder='Uf' {...register('uf')} />
        <Input defaultValue={clientToUpdate?.numberHouse} className='p-5' placeholder='Nª Casa' {...register('numberHouse')} />
        <Button type='submit' className='bg-base-blue hover:bg-blue-800 py-6 font-semibold text-md
          cursor-pointer transform ease-in duration-75 mt-5'>
          Adicionar Cliente
        </Button>
      </form>
    </DialogContent>
  )
}


