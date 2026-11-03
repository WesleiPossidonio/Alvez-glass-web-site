
import { AdminContext } from '@/contexts/AdminContext'
import { useContext } from 'react'

export const useAdmin = () => {
  const context = useContext(AdminContext)
  return context
}