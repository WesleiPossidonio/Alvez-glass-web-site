/* eslint-disable react-refresh/only-export-components */
import {
  type ReactNode,
  createContext,
  useState,
  useCallback,
} from 'react'
import { toast } from 'react-toastify'

import api from '../services/api'

export interface ResponseDataUser {
  admin: boolean
  id: string
  name: string
  token: string
  email: string
}

interface CreaterUser {
  admin: boolean
  name: string
  password?: string
  email: string
}

interface UpdateUser {
  id: string
  name: string
  password: string
  email: string
  admin: string
}

interface ConfirmMailProps {
  email: string
}

// interface UpdatePasswordProps {
//   password: string
//   confirmPassword: string
//   updateNumber: string
// }

interface UserContextType {
  handleCreateUser: (data: CreaterUser) => Promise<void>
  confirmMail: (data: ConfirmMailProps) => Promise<void>
  // updatePassword: (data: UpdatePasswordProps) => Promise<void>
  handleUpdateUser: (data: UpdateUser) => Promise<void>
  setUserDataLogin: (data: ResponseDataUser) => void
  userDataLogin: ResponseDataUser
}

interface UserContextProviderProps {
  children: ReactNode
}


export const UserContext = createContext({} as UserContextType)

export const UserContextProvider = ({ children }: UserContextProviderProps) => {
  const [userDataLogin, setUserDataLogin] = useState<ResponseDataUser>(
    {} as ResponseDataUser
  )

  const isAdmin = import.meta.env.VITE_PROVIDER_ROLE
  const user = import.meta.env.VITE_PROVIDER_ROLE2

  const handleCreateUser = useCallback(async (data: CreaterUser) => {
    const { password, admin, name, email } = data

    const dataUser = {
      password,
      name,
      email,
      role: admin ? isAdmin : user
    }

    try {
      await toast.promise(
        api.post('user', dataUser),
        {
          pending: 'Enviando Dados',
          success: 'Usuário Criado com Sucesso!',
          error: 'Usuário existente Verifique seu email e senha 🤯',
        }
      )
    } catch (error) {
      console.log(error)
    }
  }, [isAdmin, user])

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
        'AlvesClass:DataConfirmEmail',
        JSON.stringify(data)
      )

      setUserDataLogin(data)
    } catch (error) {
      console.log(error)
    }
  }, [])

  const handleUpdateUser = useCallback(async (data: UpdateUser) => {
    const { email, id, name, password, } = data

    const updatedData = {
      email,
      name,
      password,
    }

    try {
      await toast.promise(api.put(`users/${id}`, updatedData), {
        pending: 'Verificando seus dados',
        success: 'Senha Atualizada com Sucesso!',
        error: 'Ops! Verifique os Dados Digitados',
      })
    } catch (error) {
      console.log(error)
    }
  }, [])

  return (
    <UserContext.Provider
      value={{
        userDataLogin,
        setUserDataLogin,
        handleCreateUser,
        confirmMail,
        // updatePassword,
        handleUpdateUser,
      }}
    >
      {children}
    </UserContext.Provider>
  )
}