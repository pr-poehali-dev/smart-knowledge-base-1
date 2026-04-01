import { mockDashboard, mockModules } from "@/lib/mockData";
import Icon from "@/components/ui/icon";
import { cn } from "@/lib/utils";

interface DashboardProps {
  onSectionChange: (section: string) => void;
}

export default function Dashboard({ onSectionChange }: DashboardProps) {
  const data = mockDashboard;

  const stats = [
    { label: "Модулей опубликовано", value: data.stats.modules, icon: "BookOpen", color: "bg-indigo-500", change: "+2 за месяц" },
    { label: "Регламентов", value: data.stats.regulations, icon: "FileText", color: "bg-emerald-500", change: "+1 за неделю" },
    { label: "Сотрудников", value: data.stats.employees, icon: "Users", color: "bg-violet-500", change: "Активных" },
    { label: "Завершений обучения", value: data.stats.completions, icon: "CheckCircle2", color: "bg-amber-500", change: "+3 за неделю" },
  ];

  return (
    <div className="p-6 space-y-6">
      {/* Welcome banner */}
      <div className="bg-gradient-to-r from-indigo-600 to-violet-600 rounded-2xl p-6 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold mb-1">Умная база знаний</h2>
            <p className="text-indigo-200 text-sm">
              Создавайте учебные материалы с ИИ, отслеживайте прогресс сотрудников и проводите аттестации
            </p>
          </div>
          <div className="hidden md:flex items-center gap-3">
            <button
              onClick={() => onSectionChange("modules")}
              className="bg-white text-indigo-600 px-4 py-2 rounded-lg text-sm font-medium hover:bg-indigo-50 transition-colors flex items-center gap-2"
            >
              <Icon name="Sparkles" className="w-4 h-4" />
              Создать с ИИ
            </button>
            <button
              onClick={() => onSectionChange("regulations")}
              className="bg-indigo-500 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-indigo-400 transition-colors flex items-center gap-2"
            >
              <Icon name="Plus" className="w-4 h-4" />
              Новый регламент
            </button>
          </div>
        </div>
      </div>

      {/* Stats grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <div key={stat.label} className="bg-white rounded-xl p-4 border border-gray-100 hover:shadow-sm transition-shadow">
            <div className="flex items-center justify-between mb-3">
              <div className={cn("w-9 h-9 rounded-lg flex items-center justify-center", stat.color)}>
                <Icon name={stat.icon as "BookOpen"} className="w-4 h-4 text-white" />
              </div>
              <span className="text-xs text-gray-400">{stat.change}</span>
            </div>
            <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
            <p className="text-xs text-gray-500 mt-0.5">{stat.label}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent modules */}
        <div className="lg:col-span-2 bg-white rounded-xl border border-gray-100 p-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-gray-900">Последние модули</h3>
            <button
              onClick={() => onSectionChange("modules")}
              className="text-xs text-indigo-600 hover:text-indigo-700 font-medium flex items-center gap-1"
            >
              Все модули <Icon name="ChevronRight" className="w-3 h-3" />
            </button>
          </div>
          <div className="space-y-3">
            {mockModules.slice(0, 4).map((mod) => (
              <div key={mod.id} className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors">
                <div
                  className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0"
                  style={{ backgroundColor: `${mod.category_color}20` }}
                >
                  <Icon name="BookOpen" className="w-4 h-4" style={{ color: mod.category_color }} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 truncate">{mod.title}</p>
                  <div className="flex items-center gap-2 mt-0.5">
                    <span className="text-xs text-gray-400">{mod.category_name}</span>
                    <span className="text-gray-200">•</span>
                    <span className="text-xs text-gray-400">{mod.estimated_duration} мин</span>
                    {mod.is_ai_generated && (
                      <>
                        <span className="text-gray-200">•</span>
                        <span className="text-xs text-violet-600 flex items-center gap-0.5">
                          <Icon name="Sparkles" className="w-3 h-3" /> ИИ
                        </span>
                      </>
                    )}
                  </div>
                </div>
                <div className="shrink-0 text-right">
                  <span className={cn(
                    "text-xs px-2 py-0.5 rounded-full font-medium",
                    mod.status === "published" ? "bg-emerald-50 text-emerald-700" : "bg-gray-100 text-gray-500"
                  )}>
                    {mod.status === "published" ? "Опубликован" : "Черновик"}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Top employees leaderboard */}
        <div className="bg-white rounded-xl border border-gray-100 p-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-gray-900">Лидеры обучения</h3>
            <button
              onClick={() => onSectionChange("analytics")}
              className="text-xs text-indigo-600 hover:text-indigo-700 font-medium flex items-center gap-1"
            >
              Аналитика <Icon name="ChevronRight" className="w-3 h-3" />
            </button>
          </div>
          <div className="space-y-3">
            {data.topEmployees.map((emp, idx) => (
              <div key={emp.name} className="flex items-center gap-3">
                <div className={cn(
                  "w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold shrink-0",
                  idx === 0 ? "bg-amber-100 text-amber-700" :
                  idx === 1 ? "bg-gray-100 text-gray-600" :
                  idx === 2 ? "bg-orange-100 text-orange-600" :
                  "bg-gray-50 text-gray-400"
                )}>
                  {idx + 1}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 truncate">{emp.name}</p>
                  <p className="text-xs text-gray-400 truncate">{emp.department}</p>
                </div>
                <div className="shrink-0 text-right">
                  <p className="text-sm font-bold text-indigo-600">{emp.total_points}</p>
                  <p className="text-xs text-gray-400">баллов</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Quick actions */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {[
          { icon: "Sparkles", label: "Создать модуль с ИИ", desc: "ИИ напишет уроки и тесты", color: "text-violet-600 bg-violet-50", section: "modules" },
          { icon: "FileText", label: "Новый регламент", desc: "С ИИ или вручную", color: "text-emerald-600 bg-emerald-50", section: "regulations" },
          { icon: "BarChart3", label: "Просмотр аналитики", desc: "Прогресс по отделам", color: "text-blue-600 bg-blue-50", section: "analytics" },
          { icon: "Award", label: "Создать аттестацию", desc: "Назначить тестирование", color: "text-amber-600 bg-amber-50", section: "certifications" },
        ].map((action) => (
          <button
            key={action.label}
            onClick={() => onSectionChange(action.section)}
            className="bg-white border border-gray-100 rounded-xl p-4 text-left hover:shadow-sm hover:border-gray-200 transition-all"
          >
            <div className={cn("w-8 h-8 rounded-lg flex items-center justify-center mb-2", action.color)}>
              <Icon name={action.icon as "Sparkles"} className="w-4 h-4" />
            </div>
            <p className="text-sm font-medium text-gray-900">{action.label}</p>
            <p className="text-xs text-gray-400 mt-0.5">{action.desc}</p>
          </button>
        ))}
      </div>
    </div>
  );
}
