import { useState } from "react";
import Icon from "@/components/ui/icon";
import { cn } from "@/lib/utils";

interface LayoutProps {
  activeSection: string;
  onSectionChange: (section: string) => void;
  children: React.ReactNode;
}

const navItems = [
  { id: "dashboard", label: "Дашборд", icon: "LayoutDashboard" },
  { id: "modules", label: "Обучение", icon: "BookOpen" },
  { id: "regulations", label: "Регламенты", icon: "FileText" },
  { id: "analytics", label: "Аналитика", icon: "BarChart3" },
  { id: "certifications", label: "Аттестация", icon: "Award" },
  { id: "employees", label: "Сотрудники", icon: "Users" },
  { id: "widgets", label: "Виджеты", icon: "Layout" },
  { id: "pricing", label: "Тарифы", icon: "CreditCard" },
];

export default function Layout({ activeSection, onSectionChange, children }: LayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden">
      {/* Sidebar */}
      <aside
        className={cn(
          "flex flex-col bg-white border-r border-gray-200 transition-all duration-300 shrink-0",
          sidebarOpen ? "w-60" : "w-16"
        )}
      >
        {/* Logo */}
        <div className="flex items-center gap-3 px-4 py-4 border-b border-gray-100">
          <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center shrink-0">
            <Icon name="Brain" className="w-4 h-4 text-white" />
          </div>
          {sidebarOpen && (
            <div className="overflow-hidden">
              <p className="font-bold text-gray-900 text-sm leading-tight">KnowledgeAI</p>
              <p className="text-xs text-gray-400 leading-tight">База знаний</p>
            </div>
          )}
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className={cn("ml-auto p-1 rounded text-gray-400 hover:text-gray-600 hover:bg-gray-100", !sidebarOpen && "mx-auto ml-0")}
          >
            <Icon name={sidebarOpen ? "ChevronLeft" : "ChevronRight"} className="w-4 h-4" />
          </button>
        </div>

        {/* Nav */}
        <nav className="flex-1 py-3 px-2 space-y-0.5 overflow-y-auto">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => onSectionChange(item.id)}
              className={cn(
                "w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-150",
                activeSection === item.id
                  ? "bg-indigo-50 text-indigo-700"
                  : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
              )}
              title={!sidebarOpen ? item.label : undefined}
            >
              <Icon name={item.icon as "LayoutDashboard"} className="w-4 h-4 shrink-0" />
              {sidebarOpen && <span>{item.label}</span>}
              {sidebarOpen && activeSection === item.id && (
                <div className="ml-auto w-1.5 h-1.5 rounded-full bg-indigo-600" />
              )}
            </button>
          ))}
        </nav>

        {/* Footer */}
        {sidebarOpen && (
          <div className="p-3 border-t border-gray-100">
            <div className="flex items-center gap-2 px-2 py-2 rounded-lg bg-indigo-50">
              <div className="w-7 h-7 rounded-full bg-indigo-200 flex items-center justify-center">
                <Icon name="User" className="w-3.5 h-3.5 text-indigo-700" />
              </div>
              <div className="overflow-hidden">
                <p className="text-xs font-medium text-gray-900 truncate">Администратор</p>
                <p className="text-xs text-indigo-600">Business план</p>
              </div>
            </div>
          </div>
        )}
      </aside>

      {/* Main content */}
      <main className="flex-1 flex flex-col overflow-hidden">
        {/* Top bar */}
        <header className="bg-white border-b border-gray-200 px-6 py-3.5 flex items-center gap-4">
          <div>
            <h1 className="text-base font-semibold text-gray-900">
              {navItems.find((i) => i.id === activeSection)?.label || ""}
            </h1>
          </div>
          <div className="ml-auto flex items-center gap-3">
            <div className="flex items-center gap-1.5 text-xs text-amber-600 bg-amber-50 border border-amber-200 rounded-full px-3 py-1">
              <Icon name="Zap" className="w-3 h-3" />
              <span>Демо-режим</span>
            </div>
            <button className="relative p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg">
              <Icon name="Bell" className="w-4 h-4" />
              <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 bg-red-500 rounded-full" />
            </button>
            <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg">
              <Icon name="Settings" className="w-4 h-4" />
            </button>
          </div>
        </header>

        {/* Page content */}
        <div className="flex-1 overflow-y-auto">
          {children}
        </div>
      </main>
    </div>
  );
}
