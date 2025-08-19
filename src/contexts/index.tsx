import { type ReactNode } from 'react'
import { UserContextProvider } from './UserContext'
import { ClientContextProvider } from './ClientContext'


interface AppProviderProps {
  children: ReactNode
}

export const AppProvider = ({ children }: AppProviderProps) => {
  return (
    <UserContextProvider>
      <ClientContextProvider >{children}</ClientContextProvider>
    </UserContextProvider>
  )
}