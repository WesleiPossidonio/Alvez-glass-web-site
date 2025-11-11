/* eslint-disable react-refresh/only-export-components */
import {
  type ReactNode,
  createContext,
  useCallback,
  useEffect,
  useState,
} from 'react'
import { toast } from 'react-toastify'

import api from '../services/api'

interface AddOrderProductProps {
  order_number: string
  client_id: string
  status_description: string
  status: string
  total: number
  products: Array<{
    product_name: string
    quantity: number
    price: number
  }>
}

interface OrderProductProps {
  id: string
  order_number: string
  client_id: string
  status_description: string
  status: string
  total: number
  products: Array<{
    id: string
    product_name: string
    quantity: number
    price: number
  }>
}

interface ProjectImageUploadProps {
  url_image: string
  description: string
  name_image: string
}

interface OrderProductContextType {
  handleCreateOrderProduct: (data: AddOrderProductProps) => Promise<void>
  handleUpdateOrderProduct: (data: OrderProductProps) => Promise<void>
  handleProjectImageUpload: (data: ProjectImageUploadProps) => Promise<void>
  listOrderProduct: OrderProductProps[]
}

interface OrderProductContextProviderProps {
  children: ReactNode
}

export const OrderProductContext = createContext({} as OrderProductContextType)

export const OrderProductContextProvider = ({ children }: OrderProductContextProviderProps) => {

  const [listOrderProduct, setListOrderProducts] = useState<OrderProductProps[]>([])

  const getListOrderProducts = useCallback(async () => {
    try {
      const listProducts = await api.get('getListOrderProducts')
      setListOrderProducts(listProducts.data)
    } catch (error) {
      console.log(error, 'error no servidor')
    }
  }, [])

  useEffect(() => {
    void getListOrderProducts()
  }, [getListOrderProducts])

  const handleCreateOrderProduct = useCallback(async (data: AddOrderProductProps) => {
    try {
      const response = await toast.promise(
        api.post('createOrderProducts', data),
        {
          pending: 'Enviando Dados',
          success: 'Produto Cadastrado com Sucesso!',
          error: 'Poduto cadastrado, Reveja os dados digitados 🤯',
        }
      )

      setListOrderProducts((prevState) => [...prevState, response.data])
    } catch (error) {
      console.log(error)
    }
  }, [])

  const handleUpdateOrderProduct = useCallback(async (data: OrderProductProps) => {
    const { id } = data
    try {
      await toast.promise(api.put(`updateListOrder/${id}`, data), {
        pending: 'Verificando seus dados',
        success: 'Senha Atualizada com Sucesso!',
        error: 'Ops! Verifique os Dados Digitados',
      })
    } catch (error) {
      console.log(error)
    }
  }, [])

  const handleProjectImageUpload = useCallback(async (data: ProjectImageUploadProps) => {
    const formData = new FormData()
    formData.append('file', data.url_image)
    formData.append('description', data.description)
    formData.append('name_image', data.name_image)

    try {
      await toast.promise(
        api.post('addImagesServices', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }),
        {
          pending: 'Enviando Imagem',
          success: 'Imagem Enviada com Sucesso!',
          error: 'Erro ao enviar imagem, tente novamente 🤯',
        }
      )
    } catch (error) {
      console.log(error)
    }
  }, [])

  return (
    <OrderProductContext.Provider
      value={{
        handleCreateOrderProduct,
        handleUpdateOrderProduct,
        handleProjectImageUpload,
        listOrderProduct
      }}
    >
      {children}
    </OrderProductContext.Provider>
  )
}