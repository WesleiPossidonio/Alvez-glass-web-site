import { useAuth } from "@/hooks/authSession";
import { OrderProductContextProvider } from "./OrderProductContext";
import { UserContextProvider } from "./UserContext";
import { ClientContextProvider } from "./ClientContext";
import type { AppProviderProps } from ".";
import { ClientManagementProvider } from "./ClientManagementContext";
import { StockProductContextProvider } from "./StockProductContext";
import { AdminContextProvider } from "./AdminContext";


export const ApplicationProvider = ({ children }: AppProviderProps) => {
  const { role, loading } = useAuth();

  if (loading) {
    return null;
  }

  switch (role) {
    case import.meta.env.VITE_PROVIDER_ROLE:
      return (
        <AdminContextProvider>
          <UserContextProvider>
            <ClientManagementProvider>
              <OrderProductContextProvider>
                <StockProductContextProvider>
                  {children}
                </StockProductContextProvider>
              </OrderProductContextProvider>
            </ClientManagementProvider>
          </UserContextProvider>
        </AdminContextProvider>
      );

    case import.meta.env.VITE_PROVIDER_ROLE2:
      return (
        <UserContextProvider>
          <ClientManagementProvider>
            <OrderProductContextProvider>
              <StockProductContextProvider>
                {children}
              </StockProductContextProvider>
            </OrderProductContextProvider>
          </ClientManagementProvider>
        </UserContextProvider>
      );

    case import.meta.env.VITE_PROVIDER_ROLE3:
      return (
        <ClientContextProvider>
          {children}
        </ClientContextProvider>
      );

    default:
      return children;
  }
}