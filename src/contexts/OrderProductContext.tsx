/* eslint-disable react-refresh/only-export-components */
import {
  type ReactNode,
  createContext,
  useCallback,
  useEffect,
  useState,
} from "react";
import { toast } from "react-toastify";

import api from "../services/api";

interface AddOrderProductProps {
  order_number: string;
  client_id: string;
  status_description: string;
  status: string;
  products: Array<{
    product_name: string;
    quantity: number;
    unit_price: number;
  }>;
  address: {
    cep: string;
    rua: string;
    number_house: string;
    bairro: string;
    cidade: string;
    uf: string;
  }
}
interface UpdateOrderProductProps {
  id: string;
  order_number: string;
  client_id: string;
  status_description: string;
  status: string;
  products: Array<{
    id: string;
    product_name: string;
    quantity: number;
    unit_price: number;
  }>;
}
interface OrderProductProps extends UpdateOrderProductProps {
  total: number;
}

interface Budget {
  id: string
  name_budget: string
  description_budget: string
  expiration_date: string
  total_value: number
  client_id: string
  pdf_object_name?: string
}

interface ProjectImageUploadProps {
  url_image: string;
  description: string;
  name_image: string;
}

interface OrderProductContextType {
  handleCreateOrderProduct: (data: AddOrderProductProps) => Promise<void>;
  handleUpdateOrderProduct: (data: UpdateOrderProductProps) => Promise<void>;
  handleProjectImageUpload: (data: ProjectImageUploadProps) => Promise<void>;
  handleCreateBudget: (data: FormData) => Promise<void>;
  getListBudgets: (clientId: string) => Promise<void>;
  handleUpdateBudget: (id: string, data: FormData) => Promise<void>;
  handleDeleteBudget: (id: string) => Promise<void>;
  listOrderProduct: OrderProductProps[];
  budgets: Budget[];
  loading: boolean;
}

interface OrderProductContextProviderProps {
  children: ReactNode;
}

export const OrderProductContext = createContext({} as OrderProductContextType);

export const OrderProductContextProvider = ({
  children,
}: OrderProductContextProviderProps) => {
  const [listOrderProduct, setListOrderProducts] = useState<
    OrderProductProps[]
  >([]);
  const [budgets, setBudgets] = useState<Budget[]>([])
  const [loading, setLoading] = useState(false)

  const getListOrderProducts = useCallback(async () => {
    try {
      const listProducts = await api.get("order/all");
      setListOrderProducts(listProducts.data);
    } catch (error) {
      console.log(error, "error no servidor");
    }
  }, []);

  const getListBudgets = useCallback(async (clientId: string) => {
    try {
      setLoading(true)
      const response = await api.get(`/budget/client/${clientId}`)
      setBudgets(response.data)
    } catch (error) {
      console.error('Erro ao buscar orçamentos:', error)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    void getListOrderProducts();
  }, [getListOrderProducts]);

  const handleCreateOrderProduct = useCallback(
    async (data: AddOrderProductProps) => {
      try {
        const response = await toast.promise(
          api.post("order", data),
          {
            pending: "Enviando Dados",
            success: "Produto Cadastrado com Sucesso!",
            error: "Poduto cadastrado, Reveja os dados digitados 🤯",
          },
        );

        setListOrderProducts((prevState) => [...prevState, response.data]);
      } catch (error) {
        console.log(error);
      }
    },
    [],
  );

  const handleUpdateOrderProduct = useCallback(
    async (data: UpdateOrderProductProps) => {
      const { id } = data;

      try {
        await toast.promise(api.put(`order/${id}`, data), {
          pending: "Verificando seus dados",
          success: "Status do serviço atualisado com sucesso!",
          error: "Ops! Verifique os Dados Digitados",
        });
      } catch (error) {
        console.log(error);
      }
    },
    [],
  );

  const handleProjectImageUpload = useCallback(
    async (data: ProjectImageUploadProps) => {
      const formData = new FormData();
      formData.append("file", data.url_image);
      formData.append("description", data.description);
      formData.append("name_image", data.name_image);

      try {
        await toast.promise(
          api.post("addImagesServices", formData, {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }),
          {
            pending: "Enviando Imagem",
            success: "Imagem Enviada com Sucesso!",
            error: "Erro ao enviar imagem, tente novamente 🤯",
          },
        );
      } catch (error) {
        console.log(error);
      }
    },
    [],
  );

  const handleCreateBudget = useCallback(
    async (data: FormData) => {
      try {
        const budget = await toast.promise(api.post("budget", data), {
          pending: "Enviando Orçamento",
          success: "Orçamento Enviado com Sucesso!",
          error: "Erro ao enviar orçamento, tente novamente 🤯",
        });
        console.log(budget.data, "budget.data")
        setBudgets((prevState) => [...prevState, budget.data]);
      } catch (error) {
        console.log(error);
      }
    },
    [],
  );

  const handleUpdateBudget = useCallback(
    async (id: string, data: FormData) => {
      try {
        await toast.promise(
          api.put(`/budget/${id}`, data),
          {
            pending: "Atualizando orçamento...",
            success: "Orçamento atualizado com sucesso!",
            error: "Erro ao atualizar orçamento.",
          }
        );

        await getListBudgets(data.get("client_id") as string);
      } catch (error) {
        console.error(error);
      }
    },
    [getListBudgets]
  );

  const handleDeleteBudget = useCallback(
    async (id: string) => {
      try {
        await toast.promise(
          api.delete(`/budget/${id}`),
          {
            pending: "Excluindo orçamento...",
            success: "Orçamento excluído com sucesso!",
            error: "Erro ao excluir orçamento.",
          }
        );

        setBudgets((prev) =>
          prev.filter((budget) => budget.id !== id)
        );
      } catch (error) {
        console.error(error);
      }
    },
    []
  );

  return (
    <OrderProductContext.Provider
      value={{
        handleCreateOrderProduct,
        handleUpdateOrderProduct,
        handleProjectImageUpload,
        handleCreateBudget,
        getListBudgets,
        handleUpdateBudget,
        handleDeleteBudget,
        listOrderProduct,
        budgets,
        loading,
      }}
    >
      {children}
    </OrderProductContext.Provider>
  );
};
