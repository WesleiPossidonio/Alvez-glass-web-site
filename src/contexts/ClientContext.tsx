/* eslint-disable react-refresh/only-export-components */
import {
  type ReactNode,
  createContext,
  useState,
  useCallback,
} from 'react'
import { toast } from 'react-toastify'

import api from '../services/api'
export interface ResponseLoginDataClient {
  clientNumber: string
  id: string
  name: string
  token: string
  email: string
  cpf_cnpj?: string
}

interface ConfirmMailProps {
  email: string
}
// interface UpdatePasswordProps {
//   password: string
//   update_number: string
// }
interface ClientContextType {
  setClientDataLogin: (data: ResponseLoginDataClient) => void
  confirmMail: (data: ConfirmMailProps) => Promise<void>
  // updatePassword: (data: UpdatePasswordProps) => Promise<void>
  ClientDataLogin: ResponseLoginDataClient
}

interface ClientContextProviderProps {
  children: ReactNode
}

export const ClientContext = createContext({} as ClientContextType)

export const ClientContextProvider = ({ children }: ClientContextProviderProps) => {
  const [ClientDataLogin, setClientDataLogin] = useState<ResponseLoginDataClient>(
    {} as ResponseLoginDataClient
  )

  const confirmMail = useCallback(async (data: ConfirmMailProps) => {
    const { email } = data

    try {
      const response = await toast.promise(api.post('confirmMail', { email }), {
        pending: 'Verificando seus dados',
        success: 'Email Encontrado! verifique seu email para atualizar a senha.',
        error: 'E-mail não encontrado digite novamente 🤯',
      })
      const { data } = response
      await localStorage.setItem(
        'Emam:DataConfirmEmail',
        JSON.stringify(data)
      )

      setClientDataLogin(data)
    } catch (error) {
      console.log(error)
    }
  }, [])

  // const updatePassword = useCallback(async (data: UpdatePasswordProps) => {
  //   try {
  //     await toast.promise(
  //       api.patch(`updatePassword/${data.}`, data),
  //       {
  //         pending: 'Verificando seus dados',
  //         success: 'Senha Atualizada com Sucesso!',
  //         error: 'Ops! Verifique os Dados Digitados',
  //       }
  //     )
  //   } catch (error) {
  //     console.log(error)
  //   }
  // }, [])

  return (
    <ClientContext.Provider
      value={{
        setClientDataLogin,
        ClientDataLogin,
        confirmMail,
        // updatePassword,
      }}
    >
      {children}
    </ClientContext.Provider>
  )
}