import { useState } from "react";
import Icon from "@/components/ui/icon";
import { cn } from "@/lib/utils";
import { mockEmployees, mockModules, mockRegulations } from "@/lib/mockData";
import type { Employee } from "@/lib/api";

// Мок данных из Битрикс24 (в реальном приложении — запрос к API Битрикс24)
const bitrixEmployees = [
  { id: "b1", name: "Иванов Сергей Петрович", position: "Менеджер по продажам", department: "Продажи", email: "ivanov@company.ru", bitrixId: 12 },
  { id: "b2", name: "Смирнова Анна Владимировна", position: "HR-специалист", department: "HR", email: "smirnova@company.ru", bitrixId: 14 },
  { id: "b3", name: "Козлов Дмитрий Сергеевич", position: "Разработчик", department: "IT", email: "kozlov@company.ru", bitrixId: 17 },
  { id: "b4", name: "Петрова Елена Игоревна", position: "Бухгалтер", department: "Бухгалтерия", email: "petrova@company.ru", bitrixId: 19 },
  { id: "b5", name: "Сидоров Алексей Николаевич", position: "Системный администратор", department: "IT", email: "sidorov@company.ru", bitrixId: 23 },
  { id: "b6", name: "Федорова Мария Андреевна", position: "Маркетолог", department: "Маркетинг", email: "fedorova@company.ru", bitrixId: 25 },
];

export default function Employees() {
  const [selected, setSelected] = useState<Employee | null>(null);
  const [search, setSearch] = useState("");
  const [filterDept, setFilterDept] = useState("all");
  const [showBitrixModal, setShowBitrixModal] = useState(false);
  const [bitrixSearch, setBitrixSearch] = useState("");
  const [selectedBitrix, setSelectedBitrix] = useState<Set<string>>(new Set());
  const [importing, setImporting] = useState(false);
  const [importDone, setImportDone] = useState(false);

  const departments = [...new Set(mockEmployees.map((e) => e.department).filter(Boolean))];

  const filtered = mockEmployees.filter((e) => {
    if (filterDept !== "all" && e.department !== filterDept) return false;
    if (search && !e.name.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  const filteredBitrix = bitrixEmployees.filter((e) =>
    e.name.toLowerCase().includes(bitrixSearch.toLowerCase()) ||
    e.position.toLowerCase().includes(bitrixSearch.toLowerCase()) ||
    e.department.toLowerCase().includes(bitrixSearch.toLowerCase())
  );

  const toggleBitrix = (id: string) => {
    setSelectedBitrix((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const handleImport = () => {
    setImporting(true);
    setTimeout(() => {
      setImporting(false);
      setImportDone(true);
      setTimeout(() => {
        setImportDone(false);
        setShowBitrixModal(false);
        setSelectedBitrix(new Set());
        setBitrixSearch("");
      }, 1500);
    }, 1800);
  };

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
        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowBitrixModal(true)}
            className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 transition-colors shadow-sm"
          >
            <Icon name="UserPlus" className="w-4 h-4" />
            Добавить из Битрикс24
          </button>
          <button className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-200 rounded-lg hover:bg-gray-50">
            <Icon name="RefreshCw" className="w-4 h-4" />
            Синхронизировать
          </button>
        </div>
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

              <div className="space-y-2">
                <div className="flex justify-between text-xs text-gray-500">
                  <span>{emp.department}</span>
                  <span className="font-medium text-indigo-600">{emp.total_points} баллов</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="flex-1 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-indigo-500 rounded-full"
                      style={{ width: `${completionRate}%` }}
                    />
                  </div>
                  <span className="text-xs text-gray-400 shrink-0">{completionRate}%</span>
                </div>
              </div>
            </button>
          );
        })}
      </div>

      {/* Bitrix24 Import Modal */}
      {showBitrixModal && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg flex flex-col max-h-[90vh]">
            {/* Header */}
            <div className="flex items-center justify-between p-5 border-b border-gray-100">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 bg-indigo-600 rounded-xl flex items-center justify-center">
                  <Icon name="Users" className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">Импорт из Битрикс24</h3>
                  <p className="text-xs text-gray-400">Выберите сотрудников для добавления</p>
                </div>
              </div>
              <button
                onClick={() => { setShowBitrixModal(false); setSelectedBitrix(new Set()); setBitrixSearch(""); }}
                className="p-2 hover:bg-gray-100 rounded-lg text-gray-400"
              >
                <Icon name="X" className="w-4 h-4" />
              </button>
            </div>

            {/* Search */}
            <div className="p-4 border-b border-gray-50">
              <div className="relative">
                <Icon name="Search" className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  value={bitrixSearch}
                  onChange={(e) => setBitrixSearch(e.target.value)}
                  placeholder="Поиск по имени, должности, отделу..."
                  className="pl-9 pr-4 py-2 text-sm border border-gray-200 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
            </div>

            {/* Select all */}
            <div className="px-4 py-2 border-b border-gray-50 flex items-center justify-between">
              <span className="text-xs text-gray-500">
                Выбрано: <span className="font-semibold text-indigo-600">{selectedBitrix.size}</span> из {filteredBitrix.length}
              </span>
              <button
                onClick={() => {
                  if (selectedBitrix.size === filteredBitrix.length) {
                    setSelectedBitrix(new Set());
                  } else {
                    setSelectedBitrix(new Set(filteredBitrix.map((e) => e.id)));
                  }
                }}
                className="text-xs text-indigo-600 hover:underline"
              >
                {selectedBitrix.size === filteredBitrix.length ? "Снять всех" : "Выбрать всех"}
              </button>
            </div>

            {/* List */}
            <div className="flex-1 overflow-y-auto p-3 space-y-1.5">
              {filteredBitrix.map((emp) => {
                const checked = selectedBitrix.has(emp.id);
                return (
                  <button
                    key={emp.id}
                    onClick={() => toggleBitrix(emp.id)}
                    className={cn(
                      "w-full flex items-center gap-3 p-3 rounded-xl border transition-all text-left",
                      checked ? "border-indigo-200 bg-indigo-50" : "border-gray-100 hover:border-gray-200 hover:bg-gray-50"
                    )}
                  >
                    <div className={cn(
                      "w-9 h-9 rounded-xl flex items-center justify-center shrink-0 font-bold text-sm",
                      checked ? "bg-indigo-600 text-white" : "bg-gray-100 text-gray-600"
                    )}>
                      {checked ? <Icon name="Check" className="w-4 h-4" /> : emp.name.charAt(0)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900 truncate">{emp.name}</p>
                      <p className="text-xs text-gray-400 truncate">{emp.position} · {emp.department}</p>
                    </div>
                    <div className="shrink-0">
                      <span className="text-xs text-gray-400 bg-gray-100 px-2 py-0.5 rounded-full">
                        ID {emp.bitrixId}
                      </span>
                    </div>
                  </button>
                );
              })}
              {filteredBitrix.length === 0 && (
                <div className="py-8 text-center text-gray-400 text-sm">
                  <Icon name="SearchX" className="w-8 h-8 mx-auto mb-2 opacity-40" />
                  Сотрудники не найдены
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="p-4 border-t border-gray-100 flex items-center gap-3">
              <button
                onClick={() => { setShowBitrixModal(false); setSelectedBitrix(new Set()); setBitrixSearch(""); }}
                className="flex-1 py-2.5 border border-gray-200 text-sm font-medium text-gray-600 rounded-xl hover:bg-gray-50 transition-colors"
              >
                Отмена
              </button>
              <button
                onClick={handleImport}
                disabled={selectedBitrix.size === 0 || importing || importDone}
                className={cn(
                  "flex-1 py-2.5 text-sm font-semibold rounded-xl transition-all flex items-center justify-center gap-2",
                  importDone
                    ? "bg-emerald-500 text-white"
                    : selectedBitrix.size === 0
                    ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                    : "bg-indigo-600 text-white hover:bg-indigo-700"
                )}
              >
                {importDone ? (
                  <><Icon name="CheckCircle2" className="w-4 h-4" />Добавлено!</>
                ) : importing ? (
                  <><Icon name="Loader2" className="w-4 h-4 animate-spin" />Импорт...</>
                ) : (
                  <><Icon name="UserPlus" className="w-4 h-4" />Добавить {selectedBitrix.size > 0 ? `(${selectedBitrix.size})` : ""}</>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
