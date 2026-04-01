import { useState } from "react";
import Icon from "@/components/ui/icon";
import { cn } from "@/lib/utils";
import { mockModules, mockCategories } from "@/lib/mockData";
import type { Module } from "@/lib/api";
import AIModuleGenerator from "@/components/AIModuleGenerator";
import ModuleEditor from "@/components/ModuleEditor";
import ModuleViewer from "@/components/ModuleViewer";

type View = "list" | "create-ai" | "create-manual" | "edit" | "view";

export default function Modules() {
  const [view, setView] = useState<View>("list");
  const [modules, setModules] = useState<Module[]>(mockModules);
  const [selectedModule, setSelectedModule] = useState<Module | null>(null);
  const [filterStatus, setFilterStatus] = useState<string>("all");
  const [filterCategory, setFilterCategory] = useState<string>("all");
  const [search, setSearch] = useState("");

  const filtered = modules.filter((m) => {
    if (filterStatus !== "all" && m.status !== filterStatus) return false;
    if (filterCategory !== "all" && m.category_id !== filterCategory) return false;
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

      {/* Filters */}
      <div className="bg-white rounded-xl border border-gray-100 p-4 flex flex-wrap gap-3">
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
        <div className="ml-auto flex items-center gap-1.5 text-sm text-gray-500">
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
      ) : (
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
          {mod.lesson_count || 0} уроков
        </span>
        <span className="flex items-center gap-1">
          <Icon name="Trophy" className="w-3 h-3" />
          {mod.points_reward} балл.
        </span>
        <span className="flex items-center gap-1">
          <Icon name="CheckCircle2" className="w-3 h-3" />
          {mod.completion_count || 0}
        </span>
      </div>

      {mod.category_name && (
        <div className="flex items-center gap-1.5 mb-4">
          <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: mod.category_color || "#6366f1" }} />
          <span className="text-xs text-gray-500">{mod.category_name}</span>
        </div>
      )}

      <div className="flex items-center gap-2 pt-3 border-t border-gray-50">
        <button
          onClick={onView}
          className="flex-1 py-1.5 text-xs font-medium text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors"
        >
          Открыть
        </button>
        <button
          onClick={onEdit}
          className="flex-1 py-1.5 text-xs font-medium text-gray-600 hover:bg-gray-50 rounded-lg transition-colors"
        >
          Редактировать
        </button>
        <button
          onClick={onPublish}
          className={cn(
            "flex-1 py-1.5 text-xs font-medium rounded-lg transition-colors",
            mod.status === "published"
              ? "text-orange-600 hover:bg-orange-50"
              : "text-emerald-600 hover:bg-emerald-50"
          )}
        >
          {mod.status === "published" ? "Снять" : "Опубликовать"}
        </button>
      </div>
    </div>
  );
}
