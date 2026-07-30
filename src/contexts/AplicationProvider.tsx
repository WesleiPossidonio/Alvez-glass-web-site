import { useAuth } from "@/hooks/authSession";
import { OrderProductContextProvider } from "./OrderProductContext";
import { UserContextProvider } from "./UserContext";
import { ClientContextProvider } from "./ClientContext";
import type { AppProviderProps } from ".";
import { ClientManagementProvider } from "./ClientManagementContext";

export const ApplicationProvider = ({ children }: AppProviderProps) => {
  const { role, loading } = useAuth();

  if (loading) {
    return null;
  }

switch (role) {
  case 'admin':
    return (
      <UserContextProvider>
        <ClientManagementProvider>
          <OrderProductContextProvider>
            {children}
          </OrderProductContextProvider>
        </ClientManagementProvider>
      </UserContextProvider>
    );
  
  case 'client':
    return (
      <ClientContextProvider>
          {children}
      </ClientContextProvider>
    ); 

  default:
    return children;
}}