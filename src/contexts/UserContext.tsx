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

interface UserLoginProps {
  email: string
  password: string
  typeSessions?: string
}

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
  password: string
  registration: string
  email: string
}

interface UpdateUser {
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

interface UserContextType {
  handleCreateUser: (data: CreaterUser) => Promise<void>
  handleLoginUser: (data: UserLoginProps) => Promise<void>
  confirmMail: (data: ConfirmMailProps) => Promise<void>
  updatePassword: (data: UpdatePasswordProps) => Promise<void>
  handleUpdateUser: (data: UpdateUser) => Promise<void>
  userDataLogin: ResponseDataUser
}

interface UserContextProviderProps {
  children: ReactNode
}

export const UserContext = createContext({} as UserContextType)

export const UserContextProvider = ({ children }: UserContextProviderProps) => {
  const navigate = useNavigate()
  const [userDataLogin, setUserDataLogin] = useState<ResponseDataUser>(
    {} as ResponseDataUser
  )

  const handleLoginUser = useCallback(
    async (data: UserLoginProps) => {
      const { email, password } = data

      try {
        const response = await toast.promise(
          api.post('session', { email, password }),
          {
            pending: 'Verificando seus dados',
            success: 'Seja bem-vindo(a)!',
            error: 'Verifique o nome do usuário e senha 🤯',
          }
        )
        const dataUser = response.data
        const decodeUserId = decodeToken(dataUser)
        await localStorage.setItem('AlvesClass:userData1.0', JSON.stringify(dataUser))

        setUserDataLogin({ ...dataUser, id: decodeUserId?.id })

        void (dataUser.role === 'admin' ? navigate('/dashboard') : navigate('/login'))
      } catch (error) {
        console.log(error)
      }
    },
    [navigate]
  )

  useEffect(() => {
    const LoadDataUser = async () => {
      const dataUserLogin = await localStorage.getItem('AlvesClass:userData1.0')

      if (dataUserLogin) {
        const { token, name, email }: ResponseDataUser = JSON.parse(dataUserLogin)
        const decodeUserId = decodeToken(token)
        if (decodeUserId !== null) {
          setUserDataLogin({ name, email, id: decodeUserId.id, admin: false, token: token })
        }
      }
    }

    LoadDataUser()

  }, [])

  const handleCreateUser = useCallback(async (data: CreaterUser) => {
    const { password, admin, name, registration, email } = data

    try {
      await toast.promise(
        api.post('users', { password, admin, name, registration, email }),
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
        'AlvesClass:DataConfirmEmail',
        JSON.stringify(data)
      )

      setUserDataLogin(data)
    } catch (error) {
      console.log(error)
    }
  }, [])

  const handleUpdateUser = useCallback(async (data: UpdateUser) => {
    const { email, id, name, password, registration } = data

    const updatedData = {
      email,
      name,
      password,
      registration,
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

  const updatePassword = useCallback(async (data: UpdatePasswordProps) => {
    const confirmEmailId = localStorage.getItem('AlvesClass:DataConfirmEmail')
    const idUser = decodeToken(confirmEmailId)

    const { password, updateNumber } = data

    if (idUser) {
      const updateData = { password, updateNumber }

      try {
        await toast.promise(
          api.patch(`updatePassword/${idUser.id}`, updateData),
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
    <UserContext.Provider
      value={{
        handleLoginUser,
        userDataLogin,
        handleCreateUser,
        confirmMail,
        updatePassword,
        handleUpdateUser,
      }}
    >
      {children}
    </UserContext.Provider>
  )
}