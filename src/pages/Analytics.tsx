import { useState } from "react";
import Icon from "@/components/ui/icon";
import { cn } from "@/lib/utils";
import { mockAnalytics, mockEmployees } from "@/lib/mockData";

// Утилита для генерации CSV
function exportToCSV(rows: string[][], filename: string) {
  const bom = "\uFEFF"; // BOM для корректного отображения кириллицы в Excel
  const csv = bom + rows.map((r) => r.map((cell) => `"${String(cell).replace(/"/g, '""')}"`).join(";")).join("\n");
  const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}

export default function Analytics() {
  const [activeTab, setActiveTab] = useState<"employees" | "modules" | "departments">("employees");
  const data = mockAnalytics;

  const handleExport = () => {
    if (activeTab === "employees") {
      const headers = ["Сотрудник", "Должность", "Отдел", "Завершено", "В процессе", "Регламентов", "Ср. балл (%)", "Баллы"];
      const rows = data.employeeStats.map((emp) => [
        emp.name,
        emp.position,
        emp.department,
        String(emp.completed),
        String(emp.in_progress),
        String(emp.regulations_read),
        emp.avg_score > 0 ? String(Math.round(emp.avg_score)) : "—",
        String(emp.total_points),
      ]);
      exportToCSV([headers, ...rows], "аналитика_сотрудники.csv");
    } else if (activeTab === "modules") {
      const headers = ["Модуль", "Попыток", "Завершений", "Ср. балл (%)", "Завершаемость (%)"];
      const rows = data.moduleStats.map((mod) => [
        mod.title,
        String(mod.total_attempts),
        String(mod.completions),
        mod.avg_score > 0 ? String(Math.round(mod.avg_score)) : "—",
        mod.total_attempts > 0 ? String(Math.round((mod.completions / mod.total_attempts) * 100)) : "0",
      ]);
      exportToCSV([headers, ...rows], "аналитика_модули.csv");
    } else if (activeTab === "departments") {
      const headers = ["Отдел", "Сотрудников", "Завершено модулей", "Средний балл"];
      const rows = data.deptStats.map((dept) => [
        dept.department,
        String(dept.employee_count),
        String(dept.completed_modules),
        String(Math.round(Number(dept.avg_points))),
      ]);
      exportToCSV([headers, ...rows], "аналитика_отделы.csv");
    }
  };

  const tabLabels: Record<string, string> = {
    employees: "аналитика_сотрудники",
    modules: "аналитика_модули",
    departments: "аналитика_отделы",
  };

  return (
    <div className="p-6 space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold text-gray-900">Аналитика обучения</h2>
          <p className="text-sm text-gray-500">Детальная статистика по сотрудникам, модулям и отделам</p>
        </div>
        <button
          onClick={handleExport}
          className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 transition-colors shadow-sm"
        >
          <Icon name="Download" className="w-4 h-4" />
          Экспорт в Excel
        </button>
      </div>

      {/* Summary stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {[
          { label: "Среднее завершение", value: "58%", icon: "CheckCircle2", color: "bg-emerald-500", desc: "модулей на сотрудника" },
          { label: "Средний балл", value: "93%", icon: "Trophy", color: "bg-amber-500", desc: "по всем тестам" },
          { label: "Активных сотрудников", value: "4/5", icon: "Users", color: "bg-indigo-500", desc: "проходят обучение" },
          { label: "Регламентов прочитано", value: "9", icon: "FileCheck", color: "bg-violet-500", desc: "суммарно" },
        ].map((s) => (
          <div key={s.label} className="bg-white rounded-xl border border-gray-100 p-4">
            <div className={cn("w-8 h-8 rounded-lg flex items-center justify-center mb-2.5", s.color)}>
              <Icon name={s.icon as "Trophy"} className="w-4 h-4 text-white" />
            </div>
            <p className="text-2xl font-bold text-gray-900">{s.value}</p>
            <p className="text-xs font-medium text-gray-700 mt-0.5">{s.label}</p>
            <p className="text-xs text-gray-400">{s.desc}</p>
          </div>
        ))}
      </div>

      {/* Activity chart */}
      <div className="bg-white rounded-xl border border-gray-100 p-5">
        <h3 className="font-semibold text-gray-900 mb-4">Активность за последние 14 дней</h3>
        <div className="flex items-end gap-1 h-24">
          {data.weeklyActivity.map((point, i) => {
            const max = Math.max(...data.weeklyActivity.map((p) => p.completions));
            const height = max > 0 ? (point.completions / max) * 100 : 0;
            return (
              <div key={i} className="flex-1 flex flex-col items-center gap-1">
                <div
                  className="w-full bg-indigo-500 rounded-t transition-all hover:bg-indigo-600 min-h-1"
                  style={{ height: `${Math.max(height, 4)}%`, opacity: height === 0 ? 0.3 : 1 }}
                  title={`${new Date(point.day).toLocaleDateString("ru-RU")}: ${point.completions} завершений`}
                />
                {i % 7 === 0 && (
                  <span className="text-xs text-gray-400">{new Date(point.day).toLocaleDateString("ru-RU", { day: "numeric", month: "short" })}</span>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 bg-gray-100 rounded-xl p-1">
        {(["employees", "modules", "departments"] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={cn(
              "flex-1 py-2 text-sm font-medium rounded-lg transition-all",
              activeTab === tab ? "bg-white text-gray-900 shadow-sm" : "text-gray-500 hover:text-gray-700"
            )}
          >
            {tab === "employees" ? "По сотрудникам" : tab === "modules" ? "По модулям" : "По отделам"}
          </button>
        ))}
      </div>

      {/* Employees tab */}
      {activeTab === "employees" && (
        <div className="bg-white rounded-xl border border-gray-100 overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase">Сотрудник</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase">Отдел</th>
                <th className="text-center px-4 py-3 text-xs font-semibold text-gray-500 uppercase">Завершено</th>
                <th className="text-center px-4 py-3 text-xs font-semibold text-gray-500 uppercase">В процессе</th>
                <th className="text-center px-4 py-3 text-xs font-semibold text-gray-500 uppercase">Регламентов</th>
                <th className="text-center px-4 py-3 text-xs font-semibold text-gray-500 uppercase">Ср. балл</th>
                <th className="text-center px-4 py-3 text-xs font-semibold text-gray-500 uppercase">Баллы</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {data.employeeStats.map((emp, idx) => (
                <tr key={idx} className="hover:bg-gray-50 transition-colors">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center">
                        <span className="text-xs font-bold text-indigo-700">{emp.name.charAt(0)}</span>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-900">{emp.name}</p>
                        <p className="text-xs text-gray-400">{emp.position}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-600">{emp.department}</td>
                  <td className="px-4 py-3 text-center">
                    <span className="inline-flex items-center justify-center w-7 h-7 bg-emerald-50 text-emerald-700 rounded-full text-sm font-bold">
                      {emp.completed}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-center">
                    <span className="inline-flex items-center justify-center w-7 h-7 bg-amber-50 text-amber-700 rounded-full text-sm font-bold">
                      {emp.in_progress}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-center">
                    <span className="inline-flex items-center justify-center w-7 h-7 bg-blue-50 text-blue-700 rounded-full text-sm font-bold">
                      {emp.regulations_read}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-center">
                    {emp.avg_score > 0 ? (
                      <span className={cn(
                        "text-sm font-bold",
                        emp.avg_score >= 90 ? "text-emerald-600" : emp.avg_score >= 70 ? "text-amber-600" : "text-red-500"
                      )}>
                        {Math.round(emp.avg_score)}%
                      </span>
                    ) : <span className="text-gray-300">—</span>}
                  </td>
                  <td className="px-4 py-3 text-center">
                    <span className="text-sm font-bold text-indigo-600">{emp.total_points}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Modules tab */}
      {activeTab === "modules" && (
        <div className="space-y-3">
          {data.moduleStats.map((mod, idx) => (
            <div key={idx} className="bg-white rounded-xl border border-gray-100 p-4">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-indigo-100 rounded-lg flex items-center justify-center">
                    <Icon name="BookOpen" className="w-4 h-4 text-indigo-600" />
                  </div>
                  <p className="font-medium text-gray-900">{mod.title}</p>
                </div>
                <div className="flex items-center gap-4 text-sm">
                  <span className="text-gray-400">{mod.total_attempts} попыток</span>
                  <span className="font-bold text-emerald-600">{mod.completions} завершений</span>
                  {mod.avg_score > 0 && <span className="font-bold text-indigo-600">{Math.round(mod.avg_score)}% avg</span>}
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-emerald-500 rounded-full"
                    style={{ width: `${mod.total_attempts > 0 ? (mod.completions / mod.total_attempts) * 100 : 0}%` }}
                  />
                </div>
                <span className="text-xs text-gray-400 shrink-0">
                  {mod.total_attempts > 0 ? Math.round((mod.completions / mod.total_attempts) * 100) : 0}% завершаемость
                </span>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Departments tab */}
      {activeTab === "departments" && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {data.deptStats.map((dept, idx) => (
            <div key={idx} className="bg-white rounded-xl border border-gray-100 p-5">
              <div className="flex items-center justify-between mb-3">
                <div>
                  <h3 className="font-semibold text-gray-900">{dept.department}</h3>
                  <p className="text-xs text-gray-400">{dept.employee_count} сотрудников</p>
                </div>
                <div className="text-right">
                  <p className="text-xl font-bold text-indigo-600">{Math.round(Number(dept.avg_points))}</p>
                  <p className="text-xs text-gray-400">средний балл</p>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-xs text-gray-500">
                  <span>Завершено модулей</span>
                  <span className="font-medium text-gray-800">{dept.completed_modules}</span>
                </div>
                <div className="w-full h-1.5 bg-gray-100 rounded-full">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-indigo-500 to-violet-500"
                    style={{ width: `${Math.min((Number(dept.avg_points) / 200) * 100, 100)}%` }}
                  />
                </div>
              </div>

              {/* Employees in dept */}
              <div className="mt-3 flex -space-x-2">
                {mockEmployees
                  .filter((e) => e.department === dept.department)
                  .slice(0, 4)
                  .map((emp) => (
                    <div
                      key={emp.id}
                      className="w-7 h-7 rounded-full bg-indigo-100 border-2 border-white flex items-center justify-center"
                      title={emp.name}
                    >
                      <span className="text-xs font-bold text-indigo-700">{emp.name.charAt(0)}</span>
                    </div>
                  ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
