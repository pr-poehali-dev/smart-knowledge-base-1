import { useState } from "react";
import Icon from "@/components/ui/icon";
import { cn } from "@/lib/utils";
import { useUser, useIsAdmin, useIsManager, UserRole } from "@/context/UserContext";

interface LayoutProps {
  activeSection: string;
  onSectionChange: (section: string) => void;
  onSearchOpen?: () => void;
  children: React.ReactNode;
}

interface NavItem {
  id: string;
  label: string;
  icon: string;
  roles: UserRole[];
}

// Все пункты меню с доступом по ролям (без реферальной — она внизу)
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

export default function Layout({ activeSection, onSectionChange, onSearchOpen, children }: LayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const { user, branding, setUser } = useUser();
  const isAdmin = useIsAdmin();
  const isManager = useIsManager();

  // Фильтруем меню по роли
  const navItems = allNavItems.filter((item) => item.roles.includes(user.role));

  // Если активная секция недоступна для роли — переходим на дашборд
  const safeActiveSection = navItems.find((i) => i.id === activeSection) || activeSection === "referral"
    ? activeSection
    : "dashboard";

  // Переключение роли (для демо)
  const switchRole = (role: UserRole) => {
    setUser({ ...user, role });
    onSectionChange("dashboard");
  };

  const primaryColor = branding.primaryColor;

  const handleNavClick = (id: string) => {
    onSectionChange(id);
    setMobileSidebarOpen(false);
  };

  const SidebarContent = ({ collapsed }: { collapsed: boolean }) => (
    <>
      {/* Logo + toggle */}
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
        {!collapsed && (
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
            "hidden md:flex p-1.5 rounded-lg transition-all",
            collapsed ? "mx-auto" : "ml-auto",
            "bg-gray-100 hover:bg-gray-200 text-gray-500 hover:text-gray-700"
          )}
          title={collapsed ? "Развернуть меню" : "Свернуть меню"}
        >
          <Icon name={collapsed ? "ChevronRight" : "ChevronLeft"} className="w-4 h-4" />
        </button>
      </div>

      {/* Nav */}
      <nav className="flex-1 py-3 px-2 space-y-0.5 overflow-y-auto">
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => handleNavClick(item.id)}
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
            title={collapsed ? item.label : undefined}
          >
            <Icon name={item.icon as "LayoutDashboard"} className="w-4 h-4 shrink-0" />
            {!collapsed && <span>{item.label}</span>}
            {!collapsed && safeActiveSection === item.id && (
              <div
                className="ml-auto w-1.5 h-1.5 rounded-full"
                style={{ backgroundColor: primaryColor }}
              />
            )}
          </button>
        ))}
      </nav>

      {/* Реферальная программа — отдельно внизу */}
      {user.role === "admin" && (
        <div className="px-2 pb-2 border-t border-gray-100 pt-2">
          <button
            onClick={() => handleNavClick("referral")}
            className={cn(
              "w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-150",
              safeActiveSection === "referral"
                ? "text-white"
                : "text-gray-500 hover:bg-gray-50 hover:text-gray-700"
            )}
            style={
              safeActiveSection === "referral"
                ? { backgroundColor: primaryColor + "18", color: primaryColor }
                : {}
            }
            title={collapsed ? "Реферальная программа" : undefined}
          >
            <Icon name="Gift" className="w-4 h-4 shrink-0" />
            {!collapsed && <span>Реферальная программа</span>}
          </button>
        </div>
      )}

      {/* Footer — user info + demo role switcher */}
      {!collapsed && (
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
    </>
  );

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden">
      {/* Mobile overlay */}
      {mobileSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-30 md:hidden"
          onClick={() => setMobileSidebarOpen(false)}
        />
      )}

      {/* Mobile sidebar */}
      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-40 flex flex-col bg-white border-r border-gray-200 transition-transform duration-300 w-64 md:hidden",
          mobileSidebarOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <SidebarContent collapsed={false} />
      </aside>

      {/* Desktop sidebar */}
      <aside
        className={cn(
          "hidden md:flex flex-col bg-white border-r border-gray-200 transition-all duration-300 shrink-0",
          sidebarOpen ? "w-60" : "w-16"
        )}
      >
        <SidebarContent collapsed={!sidebarOpen} />
      </aside>

      {/* Main content */}
      <main className="flex-1 flex flex-col overflow-hidden min-w-0">
        {/* Top bar */}
        <header className="bg-white border-b border-gray-200 px-4 md:px-6 py-3.5 flex items-center gap-3">
          {/* Mobile menu button */}
          <button
            onClick={() => setMobileSidebarOpen(true)}
            className="md:hidden p-2 rounded-lg bg-indigo-50 hover:bg-indigo-100 text-indigo-600 transition-colors"
            title="Открыть меню"
          >
            <Icon name="Menu" className="w-5 h-5" />
          </button>
          <div>
            <h1 className="text-base font-semibold text-gray-900">
              {[...navItems, { id: "referral", label: "Реферальная программа" }].find((i) => i.id === safeActiveSection)?.label || ""}
            </h1>
          </div>
          <div className="ml-auto flex items-center gap-2 md:gap-3">
            {/* Search button */}
            <button
              onClick={onSearchOpen}
              className="flex items-center gap-2 px-3 py-1.5 text-sm text-gray-500 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
            >
              <Icon name="Search" className="w-4 h-4" />
              <span className="hidden sm:inline">Поиск по базе...</span>
              <kbd className="hidden sm:inline-flex text-xs bg-white text-gray-400 px-1.5 py-0.5 rounded border border-gray-200">⌘K</kbd>
            </button>
            <div className="flex items-center gap-1.5 text-xs text-amber-600 bg-amber-50 border border-amber-200 rounded-full px-2 md:px-3 py-1">
              <Icon name="Zap" className="w-3 h-3" />
              <span className="hidden sm:inline">Демо-режим</span>
            </div>
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
