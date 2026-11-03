
import { useState } from "react";

import {
  Box,
  ShoppingBagIcon,
  User,
  Users,
} from "lucide-react";

import {
  ClientsSection,
  MyData,
  ProductsSection,
  Stock,
  UsersSection,
} from "./components";

import { useAuth } from "@/hooks/authSession";
import { MenuDashboard } from "@/components/MenuDashboard";

type AdminSection =
  | "Meus-Dados"
  | "usuarios"
  | "Produtos"
  | "Clientes"
  | "estoque";

const isAdmin = import.meta.env.VITE_PROVIDER_ROLE;

export const AdminDashboard = () => {
  const [activeSection, setActiveSection] =
    useState<AdminSection | "">("");

  const { role } = useAuth();

  const navigation = [
    {
      label: "Meus dados",
      value: "Meus-Dados",
      icon: User,
    },
    {
      label: "Usuários",
      value: "usuarios",
      icon: Users,
    },
    {
      label: "Vendas",
      value: "Produtos",
      icon: ShoppingBagIcon,
    },
    {
      label: "Clientes",
      value: "Clientes",
      icon: Users,
    },
    {
      label: "Estoque",
      value: "estoque",
      icon: Box,
    },
  ];

  const renderContent = () => {
    switch (activeSection) {
      case "Meus-Dados":
        return <MyData />;

      case "usuarios":
        return role === isAdmin ? <UsersSection /> : null;

      case "Produtos":
        return <ProductsSection />;

      case "Clientes":
        return <ClientsSection />;

      case "estoque":
        return <Stock />;

      default:
        return (
          <div className="flex min-h-[calc(100vh-4rem)] flex-col items-center justify-center gap-4 text-center lg:min-h-screen">
            <h1 className="text-2xl font-bold text-neutral-900">
              Bem-vindo ao painel administrativo!
            </h1>

            <p className="text-neutral-600">
              Selecione uma opção no menu para começar.
            </p>
          </div>
        );
    }
  };

  return (
    <MenuDashboard
      navigation={navigation}
      activeSection={activeSection}
      onSectionChange={(value) =>
        setActiveSection(value as AdminSection)
      }
    >
      {renderContent()}
    </MenuDashboard>
  );
};
