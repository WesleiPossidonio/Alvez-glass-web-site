
import { useState } from "react";

import {
  CardSim,
  FileText,
  UserRound,
} from "lucide-react";

import { MyBudgets, MyData, MyProducts } from "./components";
import { useClient } from "@/hooks/useClient";
import { useAuth } from "@/hooks/authSession";
import { MenuDashboard } from "@/components/MenuDashboard";

type ClientSection =
  | "Meus-Dados"
  | "Minhas-Compras"
  | "Orcamentos";

export const DashboardClient = () => {
  const [activeSection, setActiveSection] =
    useState<ClientSection>("Minhas-Compras");

  const { handleGetBudget } = useClient();
  const { client } = useAuth();

  const navigation = [
    {
      label: "Meus dados",
      value: "Meus-Dados",
      icon: UserRound,
    },
    {
      label: "Minhas compras",
      value: "Minhas-Compras",
      icon: CardSim,
    },
    {
      label: "Orçamentos",
      value: "Orcamentos",
      icon: FileText,
    },
  ];

  const handleSectionChange = (value: string) => {
    const section = value as ClientSection;

    if (section === "Orcamentos" && client) {
      handleGetBudget(client.id);
    }

    setActiveSection(section);
  };

  const renderContent = () => {
    switch (activeSection) {
      case "Meus-Dados":
        return <MyData />;

      case "Orcamentos":
        return <MyBudgets />;

      case "Minhas-Compras":
      default:
        return <MyProducts />;
    }
  };

  return (
    <MenuDashboard
      navigation={navigation}
      activeSection={activeSection}
      onSectionChange={handleSectionChange}
    >
      {renderContent()}
    </MenuDashboard>
  );
};
