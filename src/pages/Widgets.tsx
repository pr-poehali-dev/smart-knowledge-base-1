import { useState } from "react";
import Icon from "@/components/ui/icon";
import { cn } from "@/lib/utils";
import { mockWidgets } from "@/lib/mockData";
import type { Widget } from "@/lib/api";

const WIDGET_TYPES = [
  { type: "progress_chart", label: "График прогресса", icon: "BarChart3", desc: "Визуализация прогресса обучения команды" },
  { type: "leaderboard", label: "Рейтинг сотрудников", icon: "Trophy", desc: "Топ сотрудников по баллам" },
  { type: "new_modules", label: "Новые модули", icon: "BookOpen", desc: "Последние добавленные материалы" },
  { type: "pending_regulations", label: "Ожидающие ознакомления", icon: "AlertCircle", desc: "Регламенты без подтверждения" },
  { type: "completion_stats", label: "Статистика завершений", icon: "CheckCircle2", desc: "Количество пройденных модулей" },
  { type: "my_tasks", label: "Мои задания", icon: "ListTodo", desc: "Назначенные обучения для текущего пользователя" },
];

export default function Widgets() {
  const [widgets, setWidgets] = useState<Widget[]>(mockWidgets);
  const [showAdd, setShowAdd] = useState(false);
  const [editingWidget, setEditingWidget] = useState<Widget | null>(null);

  const toggleWidget = (id: string) => {
    setWidgets((prev) => prev.map((w) => w.id === id ? { ...w, is_active: !w.is_active } : w));
  };

  const removeWidget = (id: string) => {
    setWidgets((prev) => prev.filter((w) => w.id !== id));
  };

  const addWidget = (type: string) => {
    const wt = WIDGET_TYPES.find((t) => t.type === type);
    const newWidget: Widget = {
      id: `w-${Date.now()}`,
      company_id: "demo",
      widget_type: type,
      title: wt?.label || type,
      config: {},
      is_active: true,
      position: widgets.length,
    };
    setWidgets((prev) => [...prev, newWidget]);
    setShowAdd(false);
  };

  return (
    <div className="p-6 space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold text-gray-900">Виджеты</h2>
          <p className="text-sm text-gray-500">Настройте дашборд — выберите виджеты и их расположение</p>
        </div>
        <button
          onClick={() => setShowAdd(true)}
          className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm font-medium hover:bg-indigo-700"
        >
          <Icon name="Plus" className="w-4 h-4" />
          Добавить виджет
        </button>
      </div>

      {/* Add widget modal */}
      {showAdd && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl w-full max-w-lg p-6">
            <div className="flex items-center justify-between mb-5">
              <h3 className="font-semibold text-gray-900">Выберите виджет</h3>
              <button onClick={() => setShowAdd(false)} className="p-1 text-gray-400 hover:text-gray-600">
                <Icon name="X" className="w-5 h-5" />
              </button>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {WIDGET_TYPES.map((wt) => {
                const alreadyAdded = widgets.some((w) => w.widget_type === wt.type);
                return (
                  <button
                    key={wt.type}
                    onClick={() => !alreadyAdded && addWidget(wt.type)}
                    disabled={alreadyAdded}
                    className={cn(
                      "p-4 rounded-xl border text-left transition-all",
                      alreadyAdded ? "opacity-50 cursor-not-allowed bg-gray-50 border-gray-100" : "hover:border-indigo-300 hover:bg-indigo-50 border-gray-200"
                    )}
                  >
                    <div className="w-8 h-8 bg-indigo-100 rounded-lg flex items-center justify-center mb-2">
                      <Icon name={wt.icon as "Trophy"} className="w-4 h-4 text-indigo-600" />
                    </div>
                    <p className="text-sm font-medium text-gray-900">{wt.label}</p>
                    <p className="text-xs text-gray-400 mt-0.5">{wt.desc}</p>
                    {alreadyAdded && <p className="text-xs text-indigo-500 mt-1">Уже добавлен</p>}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* Edit widget modal */}
      {editingWidget && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl w-full max-w-md p-6 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold text-gray-900">Настройка виджета</h3>
              <button onClick={() => setEditingWidget(null)} className="p-1 text-gray-400 hover:text-gray-600">
                <Icon name="X" className="w-5 h-5" />
              </button>
            </div>

            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">Заголовок виджета</label>
              <input
                value={editingWidget.title}
                onChange={(e) => setEditingWidget({ ...editingWidget, title: e.target.value })}
                className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            {editingWidget.widget_type === "leaderboard" && (
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1">Количество записей</label>
                <input
                  type="number"
                  min={3}
                  max={20}
                  value={(editingWidget.config.limit as number) || 5}
                  onChange={(e) => setEditingWidget({ ...editingWidget, config: { ...editingWidget.config, limit: Number(e.target.value) } })}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
            )}

            <div className="flex gap-3 pt-2">
              <button onClick={() => setEditingWidget(null)} className="flex-1 py-2.5 border border-gray-200 text-gray-700 rounded-xl text-sm">Отмена</button>
              <button
                onClick={() => {
                  setWidgets((prev) => prev.map((w) => w.id === editingWidget.id ? editingWidget : w));
                  setEditingWidget(null);
                }}
                className="flex-1 py-2.5 bg-indigo-600 text-white rounded-xl text-sm font-medium"
              >
                Сохранить
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Widgets list */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {widgets.map((widget, idx) => {
          const wt = WIDGET_TYPES.find((t) => t.type === widget.widget_type);
          return (
            <div key={widget.id} className={cn(
              "bg-white rounded-xl border p-5 transition-all",
              widget.is_active ? "border-gray-100" : "border-dashed border-gray-200 opacity-60"
            )}>
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className={cn("w-10 h-10 rounded-xl flex items-center justify-center", widget.is_active ? "bg-indigo-100" : "bg-gray-100")}>
                    <Icon name={(wt?.icon || "Layout") as "Trophy"} className={cn("w-5 h-5", widget.is_active ? "text-indigo-600" : "text-gray-400")} />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">{widget.title}</p>
                    <p className="text-xs text-gray-400">{wt?.desc || widget.widget_type}</p>
                  </div>
                </div>
                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => setEditingWidget(widget)}
                    className="p-1.5 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg"
                  >
                    <Icon name="Settings" className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => removeWidget(widget.id)}
                    className="p-1.5 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg"
                  >
                    <Icon name="Trash2" className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-xs text-gray-400">
                  <span>Позиция: {idx + 1}</span>
                  {Object.keys(widget.config).length > 0 && (
                    <>
                      <span>·</span>
                      <span>Настроен</span>
                    </>
                  )}
                </div>
                <button
                  onClick={() => toggleWidget(widget.id)}
                  className={cn("w-9 h-5 rounded-full relative transition-colors", widget.is_active ? "bg-indigo-600" : "bg-gray-300")}
                >
                  <div className={cn("w-3.5 h-3.5 bg-white rounded-full absolute top-0.5 transition-all", widget.is_active ? "left-4" : "left-0.5")} />
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Preview section */}
      <div className="bg-gradient-to-br from-indigo-50 to-violet-50 rounded-xl p-5 border border-indigo-100">
        <h3 className="font-semibold text-gray-900 mb-1 flex items-center gap-2">
          <Icon name="Eye" className="w-4 h-4 text-indigo-600" />
          Активные виджеты в дашборде
        </h3>
        <p className="text-sm text-gray-500 mb-3">{widgets.filter((w) => w.is_active).length} виджетов отображается</p>
        <div className="flex flex-wrap gap-2">
          {widgets.filter((w) => w.is_active).map((w) => {
            const wt = WIDGET_TYPES.find((t) => t.type === w.widget_type);
            return (
              <span key={w.id} className="flex items-center gap-1.5 text-xs bg-white text-indigo-700 px-3 py-1.5 rounded-full border border-indigo-200">
                <Icon name={(wt?.icon || "Layout") as "Trophy"} className="w-3 h-3" />
                {w.title}
              </span>
            );
          })}
        </div>
      </div>
    </div>
  );
}
