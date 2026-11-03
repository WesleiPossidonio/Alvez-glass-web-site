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

interface SectionsCategoriesProps {
  id: number;
  name: string;
  createdAt: string;
  updatedAt: string;
}

interface CreatedCategoryStock {
  name: string
}

interface CreateProductCategoryProps {
  name: string,
  category_section_id: number,
}

interface ProducsCategoriesProps extends CreateProductCategoryProps{
  id: number,
  createdAt: string,
  updatedAt: string,
}

interface ProductProps {
  id: string;
  product_category_id: number;
  control_level: "FREE" | "RESTRICTED";
  item_name: string;
  unit: string;
  sector_name: string;
  code: string;
  quantity: number;
  min_quantity: number;
  location: string;
  createdAt: string;
  updatedAt: string;
}


interface AddProductProps {
  category_id: number;
  control_level: "FREE" | "RESTRICTED";
  item_name: string;
  unit: string;
  sector_name: string;
  code: string;
  quantity: number;
  min_quantity: number;
  location: string;
}

interface UpdateProductProps {
  id: string;
  category_id?: number;
  control_level?: "FREE" | "RESTRICTED";
  item_name?: string;
  unit?: string;
  sector_name?: string;
  code?: string;
  quantity?: number;
  min_quantity?: number;
  location?: string;
}


interface PaginationProps {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}


interface ProductListResponse {
  products: ProductProps[];
  pagination: PaginationProps;
}


interface StockProductContextType {
  sectionsCategories: SectionsCategoriesProps[];
  productCategories: ProducsCategoriesProps[];
  listProduct: ProductProps[];
  pagination: PaginationProps;
  loading: boolean;
  search: string;
  handleCreateProduct: (
    data: AddProductProps
  ) => Promise<void>;

  handleCreateProductCategory: (
    data: CreateProductCategoryProps
  ) => Promise<void>

  handleCreateCategory: (
    data: CreatedCategoryStock
  ) => Promise<void>

  handleUpdateProduct: (
    data: UpdateProductProps
  ) => Promise<void>;

  handleDeleteProduct: (
    id: string
  ) => Promise<void>;

  handleGetProductById: (
    id: string
  ) => Promise<ProductProps | null>;

  handleGetProductByCode: (
    code: string
  ) => Promise<ProductProps | null>;

  handleGetProductsByCategory: (
    productCategoryId: number
  ) => Promise<ProductProps[]>;

  getListProducts: (
    page?: number,
    limit?: number,
    search?: string
  ) => Promise<void>;

  setSearch: (search: string) => void;

  setPage: (page: number) => void;

}


interface StockProductContextProviderProps {
  children: ReactNode;
}


export const StockProductContext =
  createContext({} as StockProductContextType);


export const StockProductContextProvider = ({
  children,
}: StockProductContextProviderProps) => {
  const [sectionsCategories, setSectionsCategories] =
    useState<SectionsCategoriesProps[]>([]);

  const [productCategories, setProductCategories] =
    useState<ProducsCategoriesProps[]>([]);

  const [listProduct, setListProduct] = useState<
    ProductProps[]
  >([]);

  const [pagination, setPagination] =
    useState<PaginationProps>({
      page: 1,
      limit: 10,
      total: 0,
      totalPages: 0,
    });

  const [loading, setLoading] =
    useState(false);

  const [search, setSearch] =
    useState("");


  const getSectionsCategories = useCallback(
    async () => {
      try {
        const response =
          await api.get(
            "category/section"
          );

        setSectionsCategories(
          response.data
        );

      } catch (error) {

        console.log(
          error,
          "Erro ao buscar seções de categorias"
        );

        return [];

      }

    }, [])

  const getProductCategories = useCallback(
    async () => {
      try {
        const response =
          await api.get(
            "product-category"
          );

        setProductCategories(response.data);

      } catch (error) {

        console.log(
          error,
          "Erro ao buscar categorias"
        );

        return [];

      }

    }, [])

  const getListProducts = useCallback(
    async (
      page = 1,
      limit = 10,
      searchValue = search
    ) => {

      setLoading(true);

      try {

        const response =
          await api.get<ProductListResponse>(
            "product",
            {
              params: {
                page,
                limit,
                search: searchValue || undefined,
              },
            }
          );

        setListProduct(
          response.data.products
        );

        setPagination(
          response.data.pagination
        );

      } catch (error) {

        console.log(
          error,
          "Erro ao buscar produtos"
        );

      } finally {
        setLoading(false);
      }

    },
    [search]
  );

  useEffect(() => {
    void getListProducts();
    getProductCategories()
    getSectionsCategories()
  }, [getListProducts, getProductCategories, getSectionsCategories]);


  const handleCreateCategory = useCallback(
    async (data: CreatedCategoryStock) => {
    try {
      const categoryData = await toast.promise(
        api.post("category/section", data),
        {
          pending: "Cadastrando Categoria...",
          success:
            "Categoria cadastrada com sucesso!",
          error:
            "Erro ao cadastrar a Categorya.",
        }
      );

      setSectionsCategories(prev => [...prev, categoryData.data])
    } catch (error) {
      console.log(
        error,
        "Erro ao cadastrar produto"
      );
    }
  }, [])


  const handleCreateProductCategory = useCallback(
    async (data: CreateProductCategoryProps) => {
    try {
      const categoryProductData = await toast.promise(
        api.post("product-category", data),
        {
          pending: "Cadastrando Categoria do Produto...",
          success:
            "Categoria do Produto cadastrada com sucesso!",
          error:
            "Erro ao cadastrar a Categorya.",
        }
      );


     setProductCategories(prev => [...prev, categoryProductData.data])
    } catch (error) {
      console.log(
        error,
        "Erro ao cadastrar produto"
      );
    }
  }, [])

  const handleCreateProduct = useCallback(
    async (data: AddProductProps) => {
      
      try {

        const dataProduct = await toast.promise(
          api.post("product", data),
          {
            pending: "Cadastrando produto...",
            success:
              "Produto cadastrado com sucesso!",
            error:
              "Erro ao cadastrar produto.",
          }
        );

        const {product} = dataProduct.data

        setListProduct(prev => [...prev, product])

      } catch (error) {

        console.log(
          error,
          "Erro ao cadastrar produto"
        );

      }

    },
    []
  );


  const handleUpdateProduct = useCallback(
    async (data: UpdateProductProps) => {

      const { id, ...productData } = data;

      try {

        await toast.promise(
          api.put(
            `product/${id}`,
            productData
          ),
          {
            pending: "Atualizando produto...",
            success:
              "Produto atualizado com sucesso!",
            error:
              "Erro ao atualizar produto.",
          }
        );

        await getListProducts(
          pagination.page,
          pagination.limit,
          search
        );

      } catch (error) {

        console.log(
          error,
          "Erro ao atualizar produto"
        );

      }

    },
    [
      getListProducts,
      pagination.page,
      pagination.limit,
      search,
    ]
  );


  const handleDeleteProduct = useCallback(
    async (id: string) => {

      try {

        await toast.promise(
          api.delete(`product/${id}`),
          {
            pending: "Excluindo produto...",
            success:
              "Produto excluído com sucesso!",
            error:
              "Erro ao excluir produto.",
          }
        );

        await getListProducts(
          pagination.page,
          pagination.limit,
          search
        );

      } catch (error) {

        console.log(
          error,
          "Erro ao excluir produto"
        );

      }

    },
    [
      getListProducts,
      pagination.page,
      pagination.limit,
      search,
    ]
  );


  const handleGetProductById = useCallback(
    async (id: string) => {

      try {

        const response =
          await api.get<ProductProps>(
            `product/${id}`
          );

        return response.data;

      } catch (error) {

        console.log(
          error,
          "Erro ao buscar produto"
        );

        toast.error(
          "Produto não encontrado."
        );

        return null;

      }

    },
    []
  );


  const handleGetProductByCode = useCallback(
    async (code: string) => {

      try {

        const response =
          await api.get<ProductProps>(
            `product/code/${code}`
          );

        return response.data;

      } catch (error) {

        console.log(
          error,
          "Erro ao buscar produto pelo código"
        );

        toast.error(
          "Produto não encontrado."
        );

        return null;

      }

    },
    []
  );

  const handleGetProductsByCategory =
    useCallback(
      async (productCategoryId: number) => {

        try {

          const response =
            await api.get<ProductProps[]>(
              `product/category/${productCategoryId}`
            );

          return response.data;

        } catch (error) {

          console.log(
            error,
            "Erro ao buscar produtos por categoria"
          );

          toast.error(
            "Erro ao buscar produtos da categoria."
          );

          return [];

        }

      },
      []
    );


  const setPage = useCallback(
    (page: number) => {

      void getListProducts(
        page,
        pagination.limit,
        search
      );

    },
    [
      getListProducts,
      pagination.limit,
      search,
    ]
  );


  return (
    <StockProductContext.Provider
      value={{
        productCategories,
        sectionsCategories,
        listProduct,
        pagination,
        loading,
        search,
        handleCreateProductCategory,
        handleCreateCategory,
        handleCreateProduct,
        handleUpdateProduct,
        handleDeleteProduct,
        handleGetProductById,
        handleGetProductByCode,
        handleGetProductsByCategory,
        getListProducts,
        setSearch,
        setPage,
      }}
    >
      {children}
    </StockProductContext.Provider>
  );

};

