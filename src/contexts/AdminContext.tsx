
/* eslint-disable react-refresh/only-export-components */
import {
  type ReactNode,
  createContext,
  useCallback,
} from "react";
import { toast } from "react-toastify";

import api from "../services/api";

interface CreaterUser {
  admin: boolean;
  name: string;
  password: string;
  registration: string;
  email: string;
}

interface UpdateUser {
  id: string;
  name: string;
  password?: string;
  registration: string;
  email: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role?: string;
  registration?: string;
}

interface AdminContextType {
  handleCreateUser: (data: CreaterUser) => Promise<void>;
  handleUpdateUser: (data: UpdateUser) => Promise<void>;
  getAllUsers: () => Promise<User[]>;
  handleDeleteUser: (id: string) => Promise<void>;
}

interface AdminContextProviderProps {
  children: ReactNode;
}

export const AdminContext = createContext({} as AdminContextType);

export const AdminContextProvider = ({
  children,
}: AdminContextProviderProps) => {
  const handleCreateUser = useCallback(async (data: CreaterUser) => {
    const { password, admin, name, registration, email } = data;

    try {
      await toast.promise(
        api.post("user", {
          password,
          admin,
          name,
          registration,
          email,
        }),
        {
          pending: "Enviando dados...",
          success: "Usuário criado com sucesso!",
          error: "Não foi possível criar o usuário.",
        },
      );
    } catch (error) {
      console.error(error);
    }
  }, []);

  const handleUpdateUser = useCallback(async (data: UpdateUser) => {
    const { email, id, name, password, registration } = data;

    const updatedData = {
      email,
      name,
      password,
      registration,
    };

    try {
      await toast.promise(api.put(`user/${id}`, updatedData), {
        pending: "Atualizando dados...",
        success: "Usuário atualizado com sucesso!",
        error: "Não foi possível atualizar o usuário.",
      });
    } catch (error) {
      console.error(error);
    }
  }, []);

  const getAllUsers = useCallback(async (): Promise<User[]> => {
    try {
      const { data } = await api.get("user/all");

      // Aceita tanto uma lista direta quanto { users: [...] }.
      return Array.isArray(data) ? data : (data.users ?? []);
    } catch (error) {
      console.error("Erro ao buscar usuários:", error);
      return [];
    }
  }, []);

  const handleDeleteUser = useCallback(async (id: string) => {
    try {
      await toast.promise(api.delete(`users/${id}`), {
        pending: "Excluindo usuário...",
        success: "Usuário excluído com sucesso!",
        error: "Não foi possível excluir o usuário.",
      });
    } catch (error) {
      console.error(error);
    }
  }, []);

  return (
    <AdminContext.Provider
      value={{
        handleCreateUser,
        handleUpdateUser,
        getAllUsers,
        handleDeleteUser,
      }}
    >
      {children}
    </AdminContext.Provider>
  );
};
