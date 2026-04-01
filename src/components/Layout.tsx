import { useState } from "react";
import Icon from "@/components/ui/icon";
import { cn } from "@/lib/utils";
import { useUser, useIsAdmin, useIsManager, UserRole } from "@/context/UserContext";

interface LayoutProps {
  activeSection: string;
  onSectionChange: (section: string) => void;
  children: React.ReactNode;
}

interface NavItem {
  id: string;
  label: string;
  icon: string;
  roles: UserRole[];
}

// Все пункты меню с доступом по ролям
const allNavItems: NavItem[] = [
  { id: "dashboard", label: "Дашборд", icon: "LayoutDashboard", roles: ["admin", "manager", "employee"] },
  { id: "modules", label: "Обучение", icon: "BookOpen", roles: ["admin", "manager", "employee"] },
  { id: "regulations", label: "Регламенты", icon: "FileText", roles: ["admin", "manager", "employee"] },
  { id: "analytics", label: "Аналитика", icon: "BarChart3", roles: ["admin", "manager"] },
  { id: "certifications", label: "Аттестация", icon: "Award", roles: ["admin", "manager", "employee"] },
  { id: "employees", label: "Сотрудники", icon: "Users", roles: ["admin", "manager"] },
  { id: "widgets", label: "Виджеты", icon: "Layout", roles: ["admin", "manager", "employee"] },
  { id: "branding", label: "Брендирование", icon: "Palette", roles: ["admin"] },
  { id: "pricing", label: "Тарифы", icon: "CreditCard", roles: ["admin"] },
];

const roleLabels: Record<UserRole, string> = {
  admin: "Администратор",
  manager: "Руководитель",
  employee: "Сотрудник",
};

const roleBadgeColors: Record<UserRole, string> = {
  admin: "text-indigo-600",
  manager: "text-emerald-600",
  employee: "text-gray-500",
};

export default function Layout({ activeSection, onSectionChange, children }: LayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const { user, branding, setUser } = useUser();
  const isAdmin = useIsAdmin();
  const isManager = useIsManager();

  // Фильтруем меню по роли
  const navItems = allNavItems.filter((item) => item.roles.includes(user.role));

  // Если активная секция недоступна для роли — переходим на дашборд
  const safeActiveSection = navItems.find((i) => i.id === activeSection)
    ? activeSection
    : "dashboard";

  // Переключение роли (для демо)
  const switchRole = (role: UserRole) => {
    setUser({ ...user, role });
    onSectionChange("dashboard");
  };

  const primaryColor = branding.primaryColor;

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
          <div
            className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0"
            style={{ backgroundColor: primaryColor }}
          >
            {branding.logoUrl ? (
              <img src={branding.logoUrl} alt="logo" className="w-6 h-6 object-contain rounded" />
            ) : (
              <Icon name="Brain" className="w-4 h-4 text-white" />
            )}
          </div>
          {sidebarOpen && (
            <div className="overflow-hidden">
              <p className="font-bold text-gray-900 text-sm leading-tight truncate">
                {branding.companyName}
              </p>
              <p className="text-xs text-gray-400 leading-tight">База знаний</p>
            </div>
          )}
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className={cn(
              "ml-auto p-1 rounded text-gray-400 hover:text-gray-600 hover:bg-gray-100",
              !sidebarOpen && "mx-auto ml-0"
            )}
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
                safeActiveSection === item.id
                  ? "text-white"
                  : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
              )}
              style={
                safeActiveSection === item.id
                  ? { backgroundColor: primaryColor + "18", color: primaryColor }
                  : {}
              }
              title={!sidebarOpen ? item.label : undefined}
            >
              <Icon name={item.icon as "LayoutDashboard"} className="w-4 h-4 shrink-0" />
              {sidebarOpen && <span>{item.label}</span>}
              {sidebarOpen && safeActiveSection === item.id && (
                <div
                  className="ml-auto w-1.5 h-1.5 rounded-full"
                  style={{ backgroundColor: primaryColor }}
                />
              )}
            </button>
          ))}
        </nav>

        {/* Footer — user info + demo role switcher */}
        {sidebarOpen && (
          <div className="p-3 border-t border-gray-100 space-y-2">
            <div
              className="flex items-center gap-2 px-2 py-2 rounded-lg"
              style={{ backgroundColor: primaryColor + "10" }}
            >
              <div
                className="w-7 h-7 rounded-full flex items-center justify-center"
                style={{ backgroundColor: primaryColor + "30" }}
              >
                <Icon name="User" className="w-3.5 h-3.5" style={{ color: primaryColor }} />
              </div>
              <div className="overflow-hidden flex-1">
                <p className="text-xs font-medium text-gray-900 truncate">{user.name}</p>
                <p className="text-xs truncate" style={{ color: primaryColor }}>
                  {user.plan} план
                </p>
              </div>
            </div>

            {/* Демо: переключатель ролей */}
            <div className="px-1">
              <p className="text-[10px] text-gray-400 mb-1 px-1">Демо: роль пользователя</p>
              <div className="flex gap-1">
                {(["admin", "manager", "employee"] as UserRole[]).map((r) => (
                  <button
                    key={r}
                    onClick={() => switchRole(r)}
                    className={cn(
                      "flex-1 text-[10px] py-1 rounded font-medium border transition-all",
                      user.role === r
                        ? "border-transparent text-white"
                        : "border-gray-200 text-gray-500 hover:border-gray-300"
                    )}
                    style={user.role === r ? { backgroundColor: primaryColor } : {}}
                  >
                    {r === "admin" ? "Адм" : r === "manager" ? "Рук" : "Сотр"}
                  </button>
                ))}
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
              {navItems.find((i) => i.id === safeActiveSection)?.label || ""}
            </h1>
          </div>
          <div className="ml-auto flex items-center gap-3">
            <div className="flex items-center gap-1.5 text-xs text-amber-600 bg-amber-50 border border-amber-200 rounded-full px-3 py-1">
              <Icon name="Zap" className="w-3 h-3" />
              <span>Демо-режим</span>
            </div>
            {/* Бейдж роли */}
            <div
              className={cn(
                "flex items-center gap-1.5 text-xs rounded-full px-3 py-1 border",
                user.role === "admin"
                  ? "text-indigo-700 bg-indigo-50 border-indigo-200"
                  : user.role === "manager"
                  ? "text-emerald-700 bg-emerald-50 border-emerald-200"
                  : "text-gray-600 bg-gray-50 border-gray-200"
              )}
            >
              <Icon
                name={user.role === "admin" ? "ShieldCheck" : user.role === "manager" ? "UserCog" : "User"}
                className="w-3 h-3"
              />
              <span>{roleLabels[user.role]}</span>
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
        <div className="flex-1 overflow-y-auto">{children}</div>
      </main>
    </div>
  );
}
