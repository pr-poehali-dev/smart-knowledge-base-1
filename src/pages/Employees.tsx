import { useState } from "react";
import Icon from "@/components/ui/icon";
import { cn } from "@/lib/utils";
import { mockEmployees, mockModules, mockRegulations } from "@/lib/mockData";
import type { Employee } from "@/lib/api";

export default function Employees() {
  const [selected, setSelected] = useState<Employee | null>(null);
  const [search, setSearch] = useState("");
  const [filterDept, setFilterDept] = useState("all");

  const departments = [...new Set(mockEmployees.map((e) => e.department).filter(Boolean))];

  const filtered = mockEmployees.filter((e) => {
    if (filterDept !== "all" && e.department !== filterDept) return false;
    if (search && !e.name.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  if (selected) {
    const completionRate = Math.round(((selected.completed_modules || 0) / Math.max(mockModules.filter((m) => m.status === "published").length, 1)) * 100);

    return (
      <div className="p-6 max-w-2xl mx-auto">
        <div className="flex items-center gap-3 mb-6">
          <button onClick={() => setSelected(null)} className="p-2 hover:bg-gray-100 rounded-lg text-gray-500">
            <Icon name="ArrowLeft" className="w-4 h-4" />
          </button>
          <h2 className="text-lg font-semibold text-gray-900">Профиль сотрудника</h2>
        </div>

        <div className="space-y-4">
          {/* Profile card */}
          <div className="bg-white rounded-2xl border border-gray-100 p-6">
            <div className="flex items-center gap-4 mb-5">
              <div className="w-16 h-16 bg-gradient-to-br from-indigo-500 to-violet-600 rounded-2xl flex items-center justify-center">
                <span className="text-2xl font-bold text-white">{selected.name.charAt(0)}</span>
              </div>
              <div>
                <h2 className="text-xl font-bold text-gray-900">{selected.name}</h2>
                <p className="text-gray-500">{selected.position}</p>
                <p className="text-sm text-indigo-600">{selected.department}</p>
              </div>
              <div className="ml-auto text-right">
                <p className="text-2xl font-bold text-indigo-600">{selected.total_points}</p>
                <p className="text-xs text-gray-400">баллов</p>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-3">
              {[
                { label: "Завершено модулей", value: selected.completed_modules || 0, icon: "CheckCircle2", color: "bg-emerald-50 text-emerald-700" },
                { label: "Регламентов прочитано", value: selected.acknowledged_regulations || 0, icon: "FileCheck", color: "bg-blue-50 text-blue-700" },
                { label: "Прогресс аттестации", value: `${completionRate}%`, icon: "Award", color: "bg-amber-50 text-amber-700" },
              ].map((stat) => (
                <div key={stat.label} className={cn("rounded-xl p-3 text-center", stat.color)}>
                  <Icon name={stat.icon as "Award"} className="w-4 h-4 mx-auto mb-1 opacity-70" />
                  <p className="text-lg font-bold">{stat.value}</p>
                  <p className="text-xs opacity-70">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Module progress */}
          <div className="bg-white rounded-2xl border border-gray-100 p-5">
            <h3 className="font-semibold text-gray-900 mb-3">Прогресс по модулям</h3>
            <div className="space-y-3">
              {mockModules.filter((m) => m.status === "published").map((mod) => {
                const isCompleted = selected.completed_modules && selected.completed_modules > 0 && Math.random() > 0.4;
                return (
                  <div key={mod.id} className="flex items-center gap-3">
                    <div className={cn(
                      "w-6 h-6 rounded-full flex items-center justify-center shrink-0",
                      isCompleted ? "bg-emerald-100" : "bg-gray-100"
                    )}>
                      <Icon name={isCompleted ? "Check" : "Clock"} className={cn("w-3 h-3", isCompleted ? "text-emerald-600" : "text-gray-400")} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-gray-800 truncate">{mod.title}</p>
                    </div>
                    <span className={cn(
                      "text-xs px-2 py-0.5 rounded-full",
                      isCompleted ? "bg-emerald-50 text-emerald-700" : "bg-gray-100 text-gray-500"
                    )}>
                      {isCompleted ? "Завершён" : "Не начат"}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Regulations */}
          <div className="bg-white rounded-2xl border border-gray-100 p-5">
            <h3 className="font-semibold text-gray-900 mb-3">Ознакомление с регламентами</h3>
            <div className="space-y-3">
              {mockRegulations.filter((r) => r.status === "published").map((reg) => {
                const acknowledged = selected.acknowledged_regulations && selected.acknowledged_regulations > 0 && Math.random() > 0.3;
                return (
                  <div key={reg.id} className="flex items-center gap-3">
                    <Icon
                      name={acknowledged ? "CheckCircle2" : "AlertCircle"}
                      className={cn("w-4 h-4 shrink-0", acknowledged ? "text-emerald-500" : "text-amber-400")}
                    />
                    <span className="text-sm text-gray-700 flex-1">{reg.title}</span>
                    <span className="text-xs text-gray-400">{acknowledged ? "Ознакомлен" : "Ожидает"}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold text-gray-900">Сотрудники</h2>
          <p className="text-sm text-gray-500">{mockEmployees.length} сотрудников</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-200 rounded-lg hover:bg-gray-50">
          <Icon name="RefreshCw" className="w-4 h-4" />
          Синхронизировать с Битрикс24
        </button>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl border border-gray-100 p-4 flex gap-3">
        <div className="relative">
          <Icon name="Search" className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Поиск сотрудников..."
            className="pl-9 pr-4 py-2 text-sm border border-gray-200 rounded-lg w-52 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>
        <select
          value={filterDept}
          onChange={(e) => setFilterDept(e.target.value)}
          className="px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          <option value="all">Все отделы</option>
          {departments.map((d) => <option key={d} value={d}>{d}</option>)}
        </select>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {filtered.map((emp) => {
          const publishedCount = mockModules.filter((m) => m.status === "published").length;
          const completionRate = publishedCount > 0 ? Math.round(((emp.completed_modules || 0) / publishedCount) * 100) : 0;

          return (
            <button
              key={emp.id}
              onClick={() => setSelected(emp)}
              className="bg-white rounded-xl border border-gray-100 p-5 text-left hover:shadow-sm hover:border-indigo-100 transition-all"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-11 h-11 bg-gradient-to-br from-indigo-400 to-violet-500 rounded-xl flex items-center justify-center">
                  <span className="text-sm font-bold text-white">{emp.name.charAt(0)}</span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-gray-900 truncate">{emp.name}</p>
                  <p className="text-xs text-gray-500 truncate">{emp.position}</p>
                </div>
                {emp.is_admin && (
                  <span className="text-xs bg-violet-50 text-violet-700 px-2 py-0.5 rounded-full">Админ</span>
                )}
              </div>

              <div className="flex items-center gap-1.5 mb-3">
                <div className="w-1.5 h-1.5 rounded-full bg-indigo-400" />
                <span className="text-xs text-gray-500">{emp.department}</span>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between text-xs text-gray-500">
                  <span>Прогресс обучения</span>
                  <span className="font-medium text-gray-700">{completionRate}%</span>
                </div>
                <div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden">
                  <div
                    className={cn(
                      "h-full rounded-full transition-all",
                      completionRate >= 80 ? "bg-emerald-500" : completionRate >= 40 ? "bg-amber-500" : "bg-gray-300"
                    )}
                    style={{ width: `${completionRate}%` }}
                  />
                </div>
              </div>

              <div className="flex items-center justify-between mt-3 pt-3 border-t border-gray-50">
                <span className="text-xs text-gray-400">{emp.completed_modules || 0} из {publishedCount} модулей</span>
                <span className="text-sm font-bold text-indigo-600">{emp.total_points} б.</span>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
