import { type ReactNode } from 'react'
import { AuthProvider } from './AuthContext'
import { ApplicationProvider } from './AplicationProvider';
export interface AppProviderProps {
  children: ReactNode
}

export function AppProvider({ children }: AppProviderProps) {
  return (
    <AuthProvider>
      <ApplicationProvider>
        {children}
      </ApplicationProvider>
    </AuthProvider>
  );

}