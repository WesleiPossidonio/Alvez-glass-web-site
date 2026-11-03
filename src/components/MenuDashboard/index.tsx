
import { useState } from "react";
import type { LucideIcon } from "lucide-react";

import Logo from "@/assets/Logo.png";
import { Button } from "@/components/ui/button";
import { LogOut, Menu, X } from "lucide-react";

export interface DashboardNavigationItem {
  label: string;
  value: string;
  icon: LucideIcon;
}

interface DashboardLayoutProps {
  navigation: DashboardNavigationItem[];
  activeSection: string;
  onSectionChange: (value: string) => void;
  children: React.ReactNode;
  onLogout?: () => void;
}

export const MenuDashboard = ({
  navigation,
  activeSection,
  onSectionChange,
  children,
  onLogout,
}: DashboardLayoutProps) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const activeLabel = navigation.find(
    (item) => item.value === activeSection
  )?.label;

  const selectSection = (value: string) => {
    onSectionChange(value);
    setIsSidebarOpen(false);
  };

  return (
    <main className="min-h-svh w-full bg-slate-50">
      {/* Header mobile */}
      <header className="sticky top-0 z-30 flex h-16 items-center gap-3 border-b border-slate-200 bg-white px-4 lg:hidden">
        <Button
          type="button"
          variant="outline"
          size="icon"
          aria-label="Abrir menu de navegação"
          aria-expanded={isSidebarOpen}
          onClick={() => setIsSidebarOpen(true)}
        >
          <Menu className="size-5" />
        </Button>

        <img
          src={Logo}
          alt="Alves Glass"
          className="h-auto w-20 object-contain"
        />

        <span className="ml-auto max-w-[45%] truncate text-sm font-medium text-slate-500">
          {activeLabel}
        </span>
      </header>

      {/* Overlay mobile */}
      {isSidebarOpen && (
        <button
          type="button"
          aria-label="Fechar menu"
          className="fixed inset-0 z-40 bg-slate-950/40 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed inset-y-0 left-0 z-50 w-[min(82vw,280px)]
          border-r border-slate-200 transition-transform
          duration-200 ease-out lg:w-60
          ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}
          lg:translate-x-0
        `}
      >
        <div className="flex h-full min-h-0 flex-col bg-white p-5">
          <div className="mb-10 flex items-center justify-between">
            <a href="/" aria-label="Alves Glass - início">
              <img
                src={Logo}
                alt="Alves Glass"
                className="h-auto w-36 object-contain"
              />
            </a>

            <button
              type="button"
              aria-label="Fechar menu"
              onClick={() => setIsSidebarOpen(false)}
              className="rounded-lg p-2 text-slate-500 hover:bg-slate-100 lg:hidden"
            >
              <X className="size-5" />
            </button>
          </div>

          <p className="mb-3 px-3 text-xs font-semibold uppercase tracking-wider text-slate-400">
            Menu principal
          </p>

          <nav
            aria-label="Menu de navegação"
            className="flex flex-col gap-1.5"
          >
            {navigation.map((item) => {
              const Icon = item.icon;
              const isActive = activeSection === item.value;

              return (
                <button
                  key={item.value}
                  type="button"
                  onClick={() => selectSection(item.value)}
                  aria-current={isActive ? "page" : undefined}
                  className={`
                    flex w-full items-center gap-3 rounded-xl
                    border-l-4 px-3 py-3.5 text-left
                    text-sm font-semibold transition-colors
                    ${
                      isActive
                        ? "border-base-blue bg-blue-50 text-base-blue"
                        : "border-transparent text-slate-500 hover:bg-slate-50 hover:text-slate-900"
                    }
                  `}
                >
                  <Icon className="size-5 shrink-0" />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>

          {onLogout && (
            <div className="mt-auto border-t border-slate-100 pt-4">
              <Button
                type="button"
                variant="ghost"
                className="w-full justify-start gap-3 text-slate-500 hover:bg-red-50 hover:text-red-600"
                onClick={onLogout}
              >
                <LogOut className="size-5" />
                Sair da conta
              </Button>
            </div>
          )}
        </div>
      </aside>

      {/* Conteúdo */}
      <div className="min-w-0 lg:pl-60">
        {children}
      </div>
    </main>
  );
};
