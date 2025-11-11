import { useContext } from 'react'

import { OrderProductContext } from '../contexts/OrderProductContext'

export const useOrderProduct = () => {
  const context = useContext(OrderProductContext)
  return context
}