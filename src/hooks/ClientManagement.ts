
import { ClientManagementContext } from '@/contexts/ClientManagementContext'
import { useContext } from 'react'

export const useClientManagement = () => {
  const context = useContext(ClientManagementContext)
  return context
}