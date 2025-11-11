import { type ReactNode } from 'react'
import { UserContextProvider } from './UserContext'
import { ClientContextProvider } from './ClientContext'
import { OrderProductContextProvider } from './OrderProductContext'
interface AppProviderProps {
  children: ReactNode
}

export const AppProvider = ({ children }: AppProviderProps) => {
  return (
    <UserContextProvider>
      <OrderProductContextProvider>
        <ClientContextProvider >{children}</ClientContextProvider>
      </OrderProductContextProvider>
    </UserContextProvider>
  )
}