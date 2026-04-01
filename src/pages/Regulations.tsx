import { useState } from "react";
import Icon from "@/components/ui/icon";
import { cn } from "@/lib/utils";
import { mockRegulations, mockCategories } from "@/lib/mockData";
import type { Regulation } from "@/lib/api";
import AIRegulationGenerator from "@/components/AIRegulationGenerator";
import RegulationEditor from "@/components/RegulationEditor";
import RegulationViewer from "@/components/RegulationViewer";

type View = "list" | "create-ai" | "create-manual" | "edit" | "view";

export default function Regulations() {
  const [view, setView] = useState<View>("list");
  const [regulations, setRegulations] = useState<Regulation[]>(mockRegulations);
  const [selected, setSelected] = useState<Regulation | null>(null);
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");

  const filtered = regulations.filter((r) => {
    if (filterStatus !== "all" && r.status !== filterStatus) return false;
    if (search && !r.title.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  const handleCreated = (reg: Regulation) => {
    setRegulations((prev) => [reg, ...prev]);
    setView("list");
  };

  if (view === "create-ai") return <AIRegulationGenerator categories={mockCategories} onBack={() => setView("list")} onCreated={handleCreated} />;
  if (view === "create-manual") return <RegulationEditor categories={mockCategories} onBack={() => setView("list")} onSaved={handleCreated} />;
  if (view === "edit" && selected) return (
    <RegulationEditor
      regulation={selected}
      categories={mockCategories}
      onBack={() => setView("list")}
      onSaved={(reg) => { setRegulations((prev) => prev.map((r) => r.id === reg.id ? reg : r)); setView("list"); }}
    />
  );
  if (view === "view" && selected) return <RegulationViewer regulation={selected} onBack={() => setView("list")} onEdit={() => setView("edit")} />;

  return (
    <div className="p-6 space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold text-gray-900">Регламенты</h2>
          <p className="text-sm text-gray-500">{regulations.length} документов</p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setView("create-manual")}
            className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-200 rounded-lg hover:bg-gray-50"
          >
            <Icon name="Plus" className="w-4 h-4" />
            Создать вручную
          </button>
          <button
            onClick={() => setView("create-ai")}
            className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-lg hover:bg-indigo-700"
          >
            <Icon name="Sparkles" className="w-4 h-4" />
            Создать с ИИ
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-3">
        {[
          { label: "Опубликовано", value: regulations.filter((r) => r.status === "published").length, color: "text-emerald-600 bg-emerald-50", icon: "CheckCircle2" },
          { label: "Черновики", value: regulations.filter((r) => r.status === "draft").length, color: "text-amber-600 bg-amber-50", icon: "Clock" },
          { label: "Требуют ознакомления", value: regulations.filter((r) => r.requires_acknowledgment && r.status === "published").length, color: "text-red-600 bg-red-50", icon: "AlertCircle" },
        ].map((stat) => (
          <div key={stat.label} className="bg-white rounded-xl border border-gray-100 p-4 flex items-center gap-3">
            <div className={cn("w-9 h-9 rounded-lg flex items-center justify-center", stat.color)}>
              <Icon name={stat.icon as "CheckCircle2"} className="w-4 h-4" />
            </div>
            <div>
              <p className="text-xl font-bold text-gray-900">{stat.value}</p>
              <p className="text-xs text-gray-500">{stat.label}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl border border-gray-100 p-4 flex gap-3">
        <div className="relative">
          <Icon name="Search" className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Поиск регламентов..."
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
        </select>
      </div>

      {/* List */}
      <div className="space-y-3">
        {filtered.map((reg) => (
          <div key={reg.id} className="bg-white rounded-xl border border-gray-100 p-4 hover:shadow-sm transition-shadow">
            <div className="flex items-start gap-4">
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 mt-0.5"
                style={{ backgroundColor: `${reg.category_color || "#6366f1"}20` }}
              >
                <Icon name="FileText" className="w-5 h-5" style={{ color: reg.category_color || "#6366f1" }} />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="font-semibold text-gray-900">{reg.title}</h3>
                  {reg.is_ai_generated && (
                    <span className="text-xs bg-violet-50 text-violet-700 px-2 py-0.5 rounded-full flex items-center gap-1">
                      <Icon name="Sparkles" className="w-3 h-3" /> ИИ
                    </span>
                  )}
                </div>
                <div className="flex items-center gap-3 text-xs text-gray-400">
                  <span>v{reg.version}</span>
                  {reg.category_name && (
                    <>
                      <span>·</span>
                      <span style={{ color: reg.category_color }}>{reg.category_name}</span>
                    </>
                  )}
                  {reg.requires_acknowledgment && (
                    <>
                      <span>·</span>
                      <span className="flex items-center gap-1 text-orange-500">
                        <Icon name="Bell" className="w-3 h-3" />
                        {reg.ack_count || 0} ознакомились
                      </span>
                    </>
                  )}
                  {reg.effective_date && (
                    <>
                      <span>·</span>
                      <span>С {new Date(reg.effective_date).toLocaleDateString("ru-RU")}</span>
                    </>
                  )}
                </div>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <span className={cn(
                  "text-xs px-2 py-0.5 rounded-full font-medium",
                  reg.status === "published" ? "bg-emerald-50 text-emerald-700" : "bg-gray-100 text-gray-500"
                )}>
                  {reg.status === "published" ? "Опубликован" : "Черновик"}
                </span>
                <button
                  onClick={() => { setSelected(reg); setView("view"); }}
                  className="p-1.5 text-gray-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors"
                >
                  <Icon name="Eye" className="w-4 h-4" />
                </button>
                <button
                  onClick={() => { setSelected(reg); setView("edit"); }}
                  className="p-1.5 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <Icon name="Edit2" className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setRegulations((prev) => prev.map((r) => r.id === reg.id ? { ...r, status: r.status === "published" ? "draft" : "published" as "draft" | "published" | "archived" } : r))}
                  className="p-1.5 text-gray-400 hover:text-emerald-600 hover:bg-emerald-50 rounded-lg transition-colors"
                >
                  <Icon name={reg.status === "published" ? "EyeOff" : "Send"} className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}

        {filtered.length === 0 && (
          <div className="bg-white rounded-xl border border-dashed border-gray-200 p-10 text-center">
            <Icon name="FileText" className="w-10 h-10 text-gray-300 mx-auto mb-3" />
            <p className="text-gray-500">Регламенты не найдены</p>
            <button
              onClick={() => setView("create-ai")}
              className="mt-4 inline-flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white text-sm rounded-lg"
            >
              <Icon name="Sparkles" className="w-4 h-4" />
              Создать с ИИ
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
