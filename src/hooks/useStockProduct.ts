
import { StockProductContext } from '@/contexts/StockProductContext'
import { useContext } from 'react'


export const useStockProduct = () => {
  const context = useContext(StockProductContext)
  return context
}