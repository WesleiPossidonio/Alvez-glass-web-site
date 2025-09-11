/* eslint-disable react-refresh/only-export-components */
import {
  type ReactNode,
  createContext,
  useState,
  useCallback,
  useEffect,
} from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

import api from '../services/api'
import { decodeToken } from '../utils/DecodeToken'

interface ClientLoginProps {
  email: string
  password: string
  typeSessions?: string
}

export interface ResponseDataClient {
  clientNumber: string
  id: string
  name: string
  token: string
  email: string
}

interface CreaterClient {
  clientNumber: string
  name: string
  password: string
  registration: string
  email: string
}

interface UpdateClient {
  id: string
  name: string
  password: string
  registration: string
  email: string
}

interface ConfirmMailProps {
  email: string
}

interface UpdatePasswordProps {
  password: string
  confirmPassword: string
  updateNumber: string
}

interface ClientContextType {
  handleCreateClient: (data: CreaterClient) => Promise<void>
  handleLoginClient: (data: ClientLoginProps) => Promise<void>
  confirmMail: (data: ConfirmMailProps) => Promise<void>
  updatePassword: (data: UpdatePasswordProps) => Promise<void>
  handleUpdateClient: (data: UpdateClient) => Promise<void>
  ClientDataLogin: ResponseDataClient
}

interface ClientContextProviderProps {
  children: ReactNode
}

export const ClientContext = createContext({} as ClientContextType)

export const ClientContextProvider = ({ children }: ClientContextProviderProps) => {
  const navigate = useNavigate()
  const [ClientDataLogin, setClientDataLogin] = useState<ResponseDataClient>(
    {} as ResponseDataClient
  )

  const handleLoginClient = useCallback(
    async (data: ClientLoginProps) => {
      const { email, password, typeSessions, } = data

      try {
        const response = await toast.promise(
          api.post('session', { email, password }),
          {
            pending: 'Verificando seus dados',
            success: 'Seja bem-vindo(a)!',
            error: 'Verifique o nome do usuário e senha 🤯',
          }
        )
        const dataClient = response.data
        const decodeClientId = decodeToken(dataClient)
        await localStorage.setItem('AlvesGlass:UserData1.0', JSON.stringify(dataClient))

        setClientDataLogin({ ...dataClient, id: decodeClientId?.id })

        void (typeSessions === 'client' ? navigate('/portal-client') : navigate('/login'))
      } catch (error) {
        console.log(error)
      }
    },
    [navigate]
  )

  useEffect(() => {
    const LoadDataClient = async () => {
      const dataClientLogin = await localStorage.getItem('AlvesClass:ClientData1.0')

      if (dataClientLogin) {
        const { token, name, email, clientNumber }: ResponseDataClient = JSON.parse(dataClientLogin)
        const decodeClientId = decodeToken(token)
        if (decodeClientId !== null) {
          setClientDataLogin({ name, email, id: decodeClientId.id, clientNumber, token: token })
        }
      }
    }

    LoadDataClient()

  }, [])

  const handleCreateClient = useCallback(async (data: CreaterClient) => {
    const { password, clientNumber, name, registration, email } = data

    try {
      await toast.promise(
        api.post('Clients', { password, clientNumber, name, registration, email }),
        {
          pending: 'Enviando Dados',
          success: 'Usuário Criado com Sucesso!',
          error: 'Usuário existente Verifique seu email e senha 🤯',
        }
      )
    } catch (error) {
      console.log(error)
    }
  }, [])

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

  const handleUpdateClient = useCallback(async (data: UpdateClient) => {
    const { email, id, name, password, registration } = data

    const updatedData = {
      email,
      name,
      password,
      registration,
    }

    try {
      await toast.promise(api.put(`Clients/${id}`, updatedData), {
        pending: 'Verificando seus dados',
        success: 'Senha Atualizada com Sucesso!',
        error: 'Ops! Verifique os Dados Digitados',
      })
    } catch (error) {
      console.log(error)
    }
  }, [])

  const updatePassword = useCallback(async (data: UpdatePasswordProps) => {
    const confirmEmailId = localStorage.getItem('Emam:DataConfirmEmail')
    const idClient = decodeToken(confirmEmailId)

    const { password, updateNumber } = data

    if (idClient) {
      const updateData = { password, updateNumber }

      try {
        await toast.promise(
          api.patch(`updatePassword/${idClient.id}`, updateData),
          {
            pending: 'Verificando seus dados',
            success: 'Senha Atualizada com Sucesso!',
            error: 'Ops! Verifique os Dados Digitados',
          }
        )
      } catch (error) {
        console.log(error)
      }
    }
  }, [])

  return (
    <ClientContext.Provider
      value={{
        handleLoginClient,
        ClientDataLogin,
        handleCreateClient,
        confirmMail,
        updatePassword,
        handleUpdateClient,
      }}
    >
      {children}
    </ClientContext.Provider>
  )
}