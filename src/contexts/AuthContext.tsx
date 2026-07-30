/* eslint-disable react-refresh/only-export-components */
import {
  createContext,
  useCallback,
  useEffect,
  useState,
  type ReactNode,
} from "react";

import api from "../services/api";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

type Role = "admin" | "client";

interface User {
  id: number;
  name: string;
  email: string;
}

interface Client {
  id: number;
  name: string;
  email: string;
}

interface AuthContextData {
  loading: boolean;
  authenticated: boolean;
  role: Role | null;
  user: User | null;
  client: Client | null;
  loginAdmin(email: string, password: string): Promise<void>;
  loginClient(email: string, password: string): Promise<void>;
  logout(): Promise<void>;
  refreshUser(): Promise<void>;
}

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthContext = createContext({} as AuthContextData);

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [loading, setLoading] = useState(true);
  const [authenticated, setAuthenticated] = useState(false);
  const [role, setRole] = useState<Role | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [client, setClient] = useState<Client | null>(null);

  const navigate = useNavigate()

  const refreshUser = useCallback(async () => {
    try {
      const { data } = await api.get("/check-auth");
      setAuthenticated(true);
      setRole(data.role);

      if (data.role === "admin") {
        setUser(data.user);
        setClient(null);
      }

      if (data.role === "client") {
        setClient(data.client);
        setUser(null);
      }
    } catch {
      setAuthenticated(false);
      setRole(null);
      setUser(null);
      setClient(null);
    } finally {
      setLoading(false);
    }
  }, []);

  async function loginAdmin(email: string, password: string) {
    try {
      await toast.promise(
        api.post('session/user', { email, password }),
        {
          pending: 'Verificando seus dados',
          success: 'Seja bem-vindo(a)!',
          error: 'Verifique o nome do usuário e senha 🤯',
        }
      )
      await refreshUser();
      navigate('/dashboard-admin')
    } catch (error) {
      console.log(error)
    }
  }

  async function loginClient(email: string, password: string) {
    try {
       await toast.promise(
        api.post('session/client', { email, password }),
        {
          pending: 'Verificando seus dados',
          success: 'Seja bem-vindo(a)!',
          error: 'Verifique o nome do usuário e senha 🤯',
        }
      )
      await refreshUser()
      navigate('/area-cliente')
    } catch (error) {
      console.log(error)
    }
  }

  async function logout() {
    await api.post("/auth/logout");

    setAuthenticated(false);

    setRole(null);

    setUser(null);

    setClient(null);
  }

  useEffect(() => {
    refreshUser();
  }, [refreshUser]);

  return (
    <AuthContext.Provider
      value={{
        loading,
        authenticated,
        role,
        user,
        client,
        loginAdmin,
        loginClient,
        logout,
        refreshUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

