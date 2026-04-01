import { useState } from "react";
import Icon from "@/components/ui/icon";
import { cn } from "@/lib/utils";
import { mockModules, mockCategories } from "@/lib/mockData";
import type { Module } from "@/lib/api";
import AIModuleGenerator from "@/components/AIModuleGenerator";
import ModuleEditor from "@/components/ModuleEditor";
import ModuleViewer from "@/components/ModuleViewer";

type View = "list" | "create-ai" | "create-manual" | "edit" | "view";
type DisplayMode = "grid" | "list" | "compact";

// Departments with icons and colors
const departments = [
  { id: "all", name: "Все отделы", icon: "LayoutGrid", color: "#6366f1" },
  { id: "sales", name: "Отдел продаж", icon: "TrendingUp", color: "#10b981" },
  { id: "legal", name: "Юристы", icon: "Scale", color: "#f59e0b" },
  { id: "hr", name: "HR", icon: "Users", color: "#ec4899" },
  { id: "it", name: "IT отдел", icon: "Monitor", color: "#3b82f6" },
  { id: "onboarding", name: "Онбординг", icon: "UserPlus", color: "#8b5cf6" },
];

// Map categories to departments
const categoryToDept: Record<string, string> = {
  "10000000-0000-0000-0000-000000000001": "onboarding",
  "10000000-0000-0000-0000-000000000002": "sales",
  "10000000-0000-0000-0000-000000000003": "it",
  "10000000-0000-0000-0000-000000000004": "hr",
};

export default function Modules() {
  const [view, setView] = useState<View>("list");
  const [modules, setModules] = useState<Module[]>(mockModules);
  const [selectedModule, setSelectedModule] = useState<Module | null>(null);
  const [filterStatus, setFilterStatus] = useState<string>("all");
  const [filterCategory, setFilterCategory] = useState<string>("all");
  const [activeDept, setActiveDept] = useState<string>("all");
  const [search, setSearch] = useState("");
  const [displayMode, setDisplayMode] = useState<DisplayMode>("grid");

  const filtered = modules.filter((m) => {
    if (filterStatus !== "all" && m.status !== filterStatus) return false;
    if (filterCategory !== "all" && m.category_id !== filterCategory) return false;
    if (activeDept !== "all") {
      const deptForModule = categoryToDept[m.category_id] || "other";
      if (deptForModule !== activeDept) return false;
    }
    if (search && !m.title.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  const handleModuleCreated = (mod: Module) => {
    setModules((prev) => [mod, ...prev]);
    setView("list");
  };

  if (view === "create-ai") {
    return (
      <AIModuleGenerator
        categories={mockCategories}
        onBack={() => setView("list")}
        onCreated={handleModuleCreated}
      />
    );
  }

  if (view === "create-manual") {
    return (
      <ModuleEditor
        categories={mockCategories}
        onBack={() => setView("list")}
        onSaved={handleModuleCreated}
      />
    );
  }

  if (view === "edit" && selectedModule) {
    return (
      <ModuleEditor
        module={selectedModule}
        categories={mockCategories}
        onBack={() => setView("list")}
        onSaved={(mod) => {
          setModules((prev) => prev.map((m) => m.id === mod.id ? mod : m));
          setView("list");
        }}
      />
    );
  }

  if (view === "view" && selectedModule) {
    return (
      <ModuleViewer
        module={selectedModule}
        onBack={() => setView("list")}
        onEdit={() => setView("edit")}
      />
    );
  }

  const activeDeptInfo = departments.find((d) => d.id === activeDept)!;

  return (
    <div className="p-6 space-y-5">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold text-gray-900">Учебные модули</h2>
          <p className="text-sm text-gray-500">{modules.length} модулей в базе</p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setView("create-manual")}
            className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <Icon name="Plus" className="w-4 h-4" />
            Создать вручную
          </button>
          <button
            onClick={() => setView("create-ai")}
            className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 transition-colors"
          >
            <Icon name="Sparkles" className="w-4 h-4" />
            Создать с ИИ
          </button>
        </div>
      </div>

      {/* Departments tabs */}
      <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
        {departments.map((dept) => {
          const count = dept.id === "all"
            ? modules.length
            : modules.filter((m) => categoryToDept[m.category_id] === dept.id).length;
          return (
            <button
              key={dept.id}
              onClick={() => setActiveDept(dept.id)}
              className={cn(
                "flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium whitespace-nowrap transition-all border shrink-0",
                activeDept === dept.id
                  ? "text-white border-transparent shadow-sm"
                  : "bg-white text-gray-600 border-gray-200 hover:bg-gray-50"
              )}
              style={activeDept === dept.id ? { backgroundColor: dept.color, borderColor: dept.color } : {}}
            >
              <Icon name={dept.icon as "LayoutGrid"} className="w-4 h-4" />
              {dept.name}
              <span
                className={cn(
                  "text-xs px-1.5 py-0.5 rounded-full font-bold",
                  activeDept === dept.id ? "bg-white/20 text-white" : "bg-gray-100 text-gray-500"
                )}
              >
                {count}
              </span>
            </button>
          );
        })}
      </div>

      {/* Department header */}
      {activeDept !== "all" && (
        <div
          className="rounded-xl p-4 flex items-center gap-3"
          style={{ backgroundColor: activeDeptInfo.color + "15", borderLeft: `3px solid ${activeDeptInfo.color}` }}
        >
          <div
            className="w-10 h-10 rounded-xl flex items-center justify-center"
            style={{ backgroundColor: activeDeptInfo.color + "25" }}
          >
            <Icon name={activeDeptInfo.icon as "TrendingUp"} className="w-5 h-5" style={{ color: activeDeptInfo.color }} />
          </div>
          <div>
            <p className="font-semibold text-gray-900">{activeDeptInfo.name}</p>
            <p className="text-xs text-gray-500">База знаний отдела · {filtered.length} модулей</p>
          </div>
        </div>
      )}

      {/* Filters */}
      <div className="bg-white rounded-xl border border-gray-100 p-4 flex flex-wrap gap-3 items-center">
        <div className="relative">
          <Icon name="Search" className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Поиск модулей..."
            className="pl-9 pr-4 py-2 text-sm border border-gray-200 rounded-lg w-52 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>
        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          className="px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          <option value="all">Все статусы</option>
          <option value="published">Опубликованные</option>
          <option value="draft">Черновики</option>
          <option value="archived">Архив</option>
        </select>
        <select
          value={filterCategory}
          onChange={(e) => setFilterCategory(e.target.value)}
          className="px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          <option value="all">Все категории</option>
          {mockCategories.map((cat) => (
            <option key={cat.id} value={cat.id}>{cat.name}</option>
          ))}
        </select>

        {/* Display mode switcher */}
        <div className="ml-auto flex items-center gap-1 bg-gray-100 rounded-lg p-1">
          <button
            onClick={() => setDisplayMode("grid")}
            className={cn(
              "p-1.5 rounded-md transition-all",
              displayMode === "grid" ? "bg-white shadow-sm text-indigo-600" : "text-gray-400 hover:text-gray-600"
            )}
            title="Блоками"
          >
            <Icon name="LayoutGrid" className="w-4 h-4" />
          </button>
          <button
            onClick={() => setDisplayMode("list")}
            className={cn(
              "p-1.5 rounded-md transition-all",
              displayMode === "list" ? "bg-white shadow-sm text-indigo-600" : "text-gray-400 hover:text-gray-600"
            )}
            title="Списком"
          >
            <Icon name="List" className="w-4 h-4" />
          </button>
          <button
            onClick={() => setDisplayMode("compact")}
            className={cn(
              "p-1.5 rounded-md transition-all",
              displayMode === "compact" ? "bg-white shadow-sm text-indigo-600" : "text-gray-400 hover:text-gray-600"
            )}
            title="Компактно"
          >
            <Icon name="AlignJustify" className="w-4 h-4" />
          </button>
        </div>

        <div className="flex items-center gap-1.5 text-sm text-gray-500">
          <Icon name="Filter" className="w-3.5 h-3.5" />
          {filtered.length} из {modules.length}
        </div>
      </div>

      {/* Module cards */}
      {filtered.length === 0 ? (
        <div className="bg-white rounded-xl border border-gray-100 p-12 text-center">
          <Icon name="BookOpen" className="w-10 h-10 text-gray-300 mx-auto mb-3" />
          <p className="text-gray-500 font-medium">Модули не найдены</p>
          <p className="text-gray-400 text-sm mt-1">Попробуйте изменить фильтры или создайте новый модуль</p>
          <button
            onClick={() => setView("create-ai")}
            className="mt-4 inline-flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white text-sm rounded-lg hover:bg-indigo-700"
          >
            <Icon name="Sparkles" className="w-4 h-4" />
            Создать с ИИ
          </button>
        </div>
      ) : displayMode === "grid" ? (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {filtered.map((mod) => (
            <ModuleCard
              key={mod.id}
              module={mod}
              onView={() => { setSelectedModule(mod); setView("view"); }}
              onEdit={() => { setSelectedModule(mod); setView("edit"); }}
              onPublish={() => {
                setModules((prev) => prev.map((m) => m.id === mod.id ? { ...m, status: m.status === "published" ? "draft" : "published" } : m));
              }}
            />
          ))}
        </div>
      ) : displayMode === "list" ? (
        <div className="space-y-3">
          {filtered.map((mod) => (
            <ModuleListRow
              key={mod.id}
              module={mod}
              onView={() => { setSelectedModule(mod); setView("view"); }}
              onEdit={() => { setSelectedModule(mod); setView("edit"); }}
              onPublish={() => {
                setModules((prev) => prev.map((m) => m.id === mod.id ? { ...m, status: m.status === "published" ? "draft" : "published" } : m));
              }}
            />
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-xl border border-gray-100 overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 border-b border-gray-100">
              <tr>
                <th className="text-left px-4 py-3 font-semibold text-gray-500">Модуль</th>
                <th className="text-left px-4 py-3 font-semibold text-gray-500">Категория</th>
                <th className="text-center px-4 py-3 font-semibold text-gray-500">Уроков</th>
                <th className="text-center px-4 py-3 font-semibold text-gray-500">Мин</th>
                <th className="text-center px-4 py-3 font-semibold text-gray-500">Статус</th>
                <th className="text-right px-4 py-3 font-semibold text-gray-500">Действия</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {filtered.map((mod) => (
                <tr key={mod.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <div
                        className="w-7 h-7 rounded-lg flex items-center justify-center shrink-0"
                        style={{ backgroundColor: `${mod.category_color || "#6366f1"}20` }}
                      >
                        <Icon name="BookOpen" className="w-3.5 h-3.5" style={{ color: mod.category_color || "#6366f1" }} />
                      </div>
                      <div>
                        <p className="font-medium text-gray-900 line-clamp-1">{mod.title}</p>
                        {mod.is_ai_generated && (
                          <span className="text-[10px] text-violet-600 flex items-center gap-0.5">
                            <Icon name="Sparkles" className="w-2.5 h-2.5" /> ИИ-генерация
                          </span>
                        )}
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <span className="text-xs font-medium" style={{ color: mod.category_color }}>{mod.category_name}</span>
                  </td>
                  <td className="px-4 py-3 text-center text-gray-600">{mod.lesson_count}</td>
                  <td className="px-4 py-3 text-center text-gray-600">{mod.estimated_duration}</td>
                  <td className="px-4 py-3 text-center">
                    <span className={cn(
                      "text-xs px-2 py-0.5 rounded-full font-medium",
                      mod.status === "published" ? "bg-emerald-50 text-emerald-700" :
                      mod.status === "draft" ? "bg-gray-100 text-gray-500" :
                      "bg-orange-50 text-orange-600"
                    )}>
                      {mod.status === "published" ? "Опубликован" : mod.status === "draft" ? "Черновик" : "Архив"}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-1 justify-end">
                      <button
                        onClick={() => { setSelectedModule(mod); setView("view"); }}
                        className="p-1.5 text-gray-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors"
                      >
                        <Icon name="Eye" className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => { setSelectedModule(mod); setView("edit"); }}
                        className="p-1.5 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                      >
                        <Icon name="Edit2" className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

function ModuleCard({
  module: mod,
  onView,
  onEdit,
  onPublish,
}: {
  module: Module;
  onView: () => void;
  onEdit: () => void;
  onPublish: () => void;
}) {
  return (
    <div className="bg-white rounded-xl border border-gray-100 p-5 hover:shadow-sm transition-shadow group">
      <div className="flex items-start justify-between mb-3">
        <div
          className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
          style={{ backgroundColor: `${mod.category_color || "#6366f1"}20` }}
        >
          <Icon name="BookOpen" className="w-5 h-5" style={{ color: mod.category_color || "#6366f1" }} />
        </div>
        <div className="flex items-center gap-1.5">
          {mod.is_ai_generated && (
            <span className="flex items-center gap-1 text-xs bg-violet-50 text-violet-700 px-2 py-0.5 rounded-full">
              <Icon name="Sparkles" className="w-3 h-3" /> ИИ
            </span>
          )}
          {mod.is_mandatory && (
            <span className="text-xs bg-red-50 text-red-600 px-2 py-0.5 rounded-full">Обяз.</span>
          )}
          <span className={cn(
            "text-xs px-2 py-0.5 rounded-full font-medium",
            mod.status === "published" ? "bg-emerald-50 text-emerald-700" :
            mod.status === "draft" ? "bg-gray-100 text-gray-500" :
            "bg-orange-50 text-orange-600"
          )}>
            {mod.status === "published" ? "Опубликован" : mod.status === "draft" ? "Черновик" : "Архив"}
          </span>
        </div>
      </div>

      <h3 className="font-semibold text-gray-900 mb-1 line-clamp-2 leading-snug">{mod.title}</h3>
      <p className="text-xs text-gray-500 mb-3 line-clamp-2">{mod.description}</p>

      <div className="flex items-center gap-3 text-xs text-gray-400 mb-4">
        <span className="flex items-center gap-1">
          <Icon name="Clock" className="w-3 h-3" />
          {mod.estimated_duration} мин
        </span>
        <span className="flex items-center gap-1">
          <Icon name="BookMarked" className="w-3 h-3" />
          {mod.lesson_count} уроков
        </span>
        {mod.category_name && (
          <span className="font-medium" style={{ color: mod.category_color }}>{mod.category_name}</span>
        )}
      </div>

      <div className="flex items-center gap-2 border-t border-gray-50 pt-3">
        <button
          onClick={onView}
          className="flex-1 text-xs font-medium py-1.5 px-3 rounded-lg text-indigo-600 bg-indigo-50 hover:bg-indigo-100 transition-colors"
        >
          Открыть
        </button>
        <button
          onClick={onEdit}
          className="p-1.5 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <Icon name="Edit2" className="w-3.5 h-3.5" />
        </button>
        <button
          onClick={onPublish}
          className="p-1.5 text-gray-400 hover:text-emerald-600 hover:bg-emerald-50 rounded-lg transition-colors"
        >
          <Icon name={mod.status === "published" ? "EyeOff" : "Send"} className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
}

function ModuleListRow({
  module: mod,
  onView,
  onEdit,
  onPublish,
}: {
  module: Module;
  onView: () => void;
  onEdit: () => void;
  onPublish: () => void;
}) {
  return (
    <div className="bg-white rounded-xl border border-gray-100 p-4 hover:shadow-sm transition-shadow flex items-center gap-4">
      <div
        className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
        style={{ backgroundColor: `${mod.category_color || "#6366f1"}20` }}
      >
        <Icon name="BookOpen" className="w-5 h-5" style={{ color: mod.category_color || "#6366f1" }} />
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-0.5">
          <h3 className="font-semibold text-gray-900 truncate">{mod.title}</h3>
          {mod.is_ai_generated && (
            <span className="flex items-center gap-1 text-xs bg-violet-50 text-violet-700 px-2 py-0.5 rounded-full shrink-0">
              <Icon name="Sparkles" className="w-3 h-3" /> ИИ
            </span>
          )}
          {mod.is_mandatory && (
            <span className="text-xs bg-red-50 text-red-600 px-2 py-0.5 rounded-full shrink-0">Обяз.</span>
          )}
        </div>
        <div className="flex items-center gap-3 text-xs text-gray-400">
          <span className="font-medium" style={{ color: mod.category_color }}>{mod.category_name}</span>
          <span>·</span>
          <span className="flex items-center gap-1"><Icon name="Clock" className="w-3 h-3" />{mod.estimated_duration} мин</span>
          <span>·</span>
          <span className="flex items-center gap-1"><Icon name="BookMarked" className="w-3 h-3" />{mod.lesson_count} уроков</span>
        </div>
      </div>
      <div className="flex items-center gap-2 shrink-0">
        <span className={cn(
          "text-xs px-2 py-0.5 rounded-full font-medium",
          mod.status === "published" ? "bg-emerald-50 text-emerald-700" :
          mod.status === "draft" ? "bg-gray-100 text-gray-500" :
          "bg-orange-50 text-orange-600"
        )}>
          {mod.status === "published" ? "Опубликован" : mod.status === "draft" ? "Черновик" : "Архив"}
        </span>
        <button
          onClick={onView}
          className="p-1.5 text-gray-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors"
        >
          <Icon name="Eye" className="w-4 h-4" />
        </button>
        <button
          onClick={onEdit}
          className="p-1.5 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <Icon name="Edit2" className="w-4 h-4" />
        </button>
        <button
          onClick={onPublish}
          className="p-1.5 text-gray-400 hover:text-emerald-600 hover:bg-emerald-50 rounded-lg transition-colors"
        >
          <Icon name={mod.status === "published" ? "EyeOff" : "Send"} className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
