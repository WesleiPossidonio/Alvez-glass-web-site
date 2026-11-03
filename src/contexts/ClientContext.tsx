/* eslint-disable react-refresh/only-export-components */
import {
  type ReactNode,
  createContext,
  useState,
  useCallback,
  useEffect,
} from 'react'
import { toast } from 'react-toastify'

import api from '../services/api'

export interface GetBudgetProps {
  id: string,
  name_budget: string,
  description_budget: string
  expiration_date: string
  total_value: string
  pdf_object_name: string
  created_at: string
}

export interface ResponseLoginDataClient {
  clientNumber: string
  id: string
  name: string
  token: string
  email: string
  cpf_cnpj?: string
}

interface MyOrdersProps {
  id: string
  order_number: string
  status_description: string
  status: string,
  total: number
}

interface ConfirmMailProps {
  email: string
}

interface ClientContextType {
  setClientDataLogin: (data: ResponseLoginDataClient) => void
  confirmMail: (data: ConfirmMailProps) => Promise<void>
  handleGetBudget: (date: string) => Promise<void>
  budgetData: GetBudgetProps[]
  ClientDataLogin: ResponseLoginDataClient
  myOrders: MyOrdersProps[]
}

interface ClientContextProviderProps {
  children: ReactNode
}

export const ClientContext = createContext({} as ClientContextType)

export const ClientContextProvider = ({ children }: ClientContextProviderProps) => {
  const [ClientDataLogin, setClientDataLogin] = useState<ResponseLoginDataClient>(
    {} as ResponseLoginDataClient
  )
  const [myOrders, setMyorders] = useState<MyOrdersProps[]>([])
  const [budgetData, setBudgetData] = useState<GetBudgetProps[]>([])

  const getMyOrders = async () => {
      try {
      const listOrders = await api.get("/order/me");
      setMyorders(listOrders.data);
    } catch (error) {
      console.log(error, "error no servidor");
    }
  }

    const handleGetBudget = useCallback(async (clientId: string) => {
      try {
        const { data } = await api.get(`budget/client/${clientId}`);
  
        setBudgetData(data);
      } catch (error) {
        console.error("Erro ao buscar orçamentos:", error);
      }
    }, []);

  useEffect(() => {
    getMyOrders()
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

  return (
    <ClientContext.Provider
      value={{
        setClientDataLogin,
        ClientDataLogin,
        handleGetBudget,
        myOrders,
        confirmMail,
        budgetData
      }}
    >
      {children}
    </ClientContext.Provider>
  )
}