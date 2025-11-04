import { ClientContext } from '@/contexts/ClientContext'
import { useContext } from 'react'



export const useClient = () => {
  const context = useContext(ClientContext)
  return context
}