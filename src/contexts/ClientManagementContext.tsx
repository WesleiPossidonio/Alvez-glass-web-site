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
import type { CreaterClient } from './AuthContext';

interface Pagination {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

export interface ListDataClient extends CreaterClient {
  id: string
  token: string
  clientNumber: string
}

interface UpdateClient extends CreaterClient {
  id: string
  password?: string
}

interface SearchClientProps {
  search: string,
  page?: number
}

interface ClientManagementContextType {
  handleUpdateClient: (data: UpdateClient) => Promise<void>
  setCurrentPage: (data: number) => void
  handleSearchClients: (data: SearchClientProps) => Promise<void>
  handleResendActivationCode: (clientId: string) => Promise<void>
  pagination: Pagination
  currentPage: number
  listClients: ListDataClient[]
}

interface ClientManagementContextProviderProps {
  children: ReactNode
}

export const ClientManagementContext = createContext({} as ClientManagementContextType)

export const ClientManagementProvider = ({ children }: ClientManagementContextProviderProps) => {
  const [listClients, setListClients] = useState<ListDataClient[]>([])
  const [currentPage, setCurrentPage] = useState(1);
  const [pagination, setPagination] = useState<Pagination>({
    page: 1,
    limit: 10,
    total: 0,
    totalPages: 0,
  });

  const getListClients = async (page = 1) => {
    try {
      const { data } = await api.get("client/all", {
        params: {
          page,
          limit: 10,
        },
      });

      setListClients(data.clients);
      setPagination(data.pagination);

    } catch (error) {
      console.log(error);
    }
  };



  useEffect(() => {
    getListClients()
  }, [currentPage])

  const handleSearchClients = useCallback(async (dataSearch: SearchClientProps) => {
    const { search, page } = dataSearch
    const { data } = await api.get("/client/all", {
      params: {
        search,
        page,
        limit: 10,
      },
    });

    setListClients(data.clients);
    setPagination(data.pagination);
  }, [])

  const handleUpdateClient = useCallback(async (data: UpdateClient) => {
    const { id } = data
    try {
      await toast.promise(api.put(`Clients/${id}`, data), {
        pending: 'Verificando seus dados',
        success: 'Senha Atualizada com Sucesso!',
        error: 'Ops! Verifique os Dados Digitados',
      })
    } catch (error) {
      console.log(error)
    }
  }, [])


  const handleResendActivationCode = useCallback(
    async (clientId: string) => {
      try {
        await toast.promise(
          api.post(`/client/${clientId}/resend-activation`),
          {
            pending: 'Gerando e enviando novo código...',
            success: 'Novo código de ativação enviado com sucesso!',
            error: 'Não foi possível reenviar o código de ativação.',
          }
        )
      } catch (error) {
        console.error('Erro ao reenviar código de ativação:', error)
      }
    },
    []
  )
  return (
    <ClientManagementContext.Provider
      value={{
        currentPage,
        pagination,
        listClients,
        handleUpdateClient,
        handleSearchClients,
        setCurrentPage,
        handleResendActivationCode,
      }}
    >
      {children}
    </ClientManagementContext.Provider>
  )
}