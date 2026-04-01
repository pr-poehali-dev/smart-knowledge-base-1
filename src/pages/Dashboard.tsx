import { useState } from "react";
import { mockDashboard, mockModules } from "@/lib/mockData";
import Icon from "@/components/ui/icon";
import { cn } from "@/lib/utils";
import { useUser } from "@/context/UserContext";

interface DashboardProps {
  onSectionChange: (section: string) => void;
}

// Геймификация: достижения
const achievements = [
  { id: "first_module", icon: "BookOpen", label: "Первый модуль", desc: "Завершите первый учебный модуль", xp: 50, unlocked: true, color: "text-indigo-600 bg-indigo-50" },
  { id: "quiz_master", icon: "Brain", label: "Знаток тестов", desc: "Пройдите 5 тестов подряд на 90%+", xp: 150, unlocked: true, color: "text-violet-600 bg-violet-50" },
  { id: "streak_7", icon: "Flame", label: "Неделя без пропусков", desc: "Учитесь 7 дней подряд", xp: 200, unlocked: false, color: "text-amber-600 bg-amber-50" },
  { id: "top3", icon: "Trophy", label: "Топ-3 команды", desc: "Войдите в топ-3 по баллам", xp: 300, unlocked: false, color: "text-yellow-600 bg-yellow-50" },
];

const dailyChallenges = [
  { id: "c1", label: "Пройти 1 урок сегодня", xp: 20, done: true },
  { id: "c2", label: "Ответить на тест с 1-й попытки", xp: 30, done: false },
  { id: "c3", label: "Прочитать регламент", xp: 15, done: false },
];

export default function Dashboard({ onSectionChange }: DashboardProps) {
  const data = mockDashboard;
  const { user } = useUser();
  const isEmployee = user.role === "employee";
  const [claimedReward, setClaimedReward] = useState(false);

  const stats = isEmployee
    ? [
        { label: "Завершено модулей", value: 3, icon: "BookOpen", color: "bg-indigo-500", change: "из 8 назначенных" },
        { label: "Мои баллы", value: 740, icon: "Zap", color: "bg-amber-500", change: "+50 сегодня" },
        { label: "Серия дней", value: 4, icon: "Flame", color: "bg-rose-500", change: "дня подряд" },
        { label: "Мой ранг", value: "🥈 2", icon: "Trophy", color: "bg-violet-500", change: "в команде" },
      ]
    : [
        { label: "Модулей опубликовано", value: data.stats.modules, icon: "BookOpen", color: "bg-indigo-500", change: "+2 за месяц" },
        { label: "Регламентов", value: data.stats.regulations, icon: "FileText", color: "bg-emerald-500", change: "+1 за неделю" },
        { label: "Сотрудников", value: data.stats.employees, icon: "Users", color: "bg-violet-500", change: "Активных" },
        { label: "Завершений обучения", value: data.stats.completions, icon: "CheckCircle2", color: "bg-amber-500", change: "+3 за неделю" },
      ];

  return (
    <div className="p-4 md:p-6 space-y-5 md:space-y-6">
      {/* Welcome banner */}
      <div className="bg-gradient-to-r from-indigo-600 to-violet-600 rounded-2xl p-5 md:p-6 text-white">
        <div className="flex items-start md:items-center justify-between gap-4">
          <div className="flex-1 min-w-0">
            {isEmployee ? (
              <>
                <h2 className="text-lg md:text-xl font-bold mb-1">Привет, {user.name}! 👋</h2>
                <p className="text-indigo-200 text-sm">
                  Продолжайте обучение и набирайте баллы. До следующего уровня — <span className="text-white font-semibold">260 XP</span>
                </p>
                {/* XP progress bar */}
                <div className="mt-3 flex items-center gap-3">
                  <span className="text-xs text-indigo-200 whitespace-nowrap">Уровень 5</span>
                  <div className="flex-1 h-2 bg-white/20 rounded-full">
                    <div className="h-full bg-white rounded-full" style={{ width: "74%" }} />
                  </div>
                  <span className="text-xs text-indigo-200 whitespace-nowrap">Уровень 6</span>
                </div>
              </>
            ) : (
              <>
                <h2 className="text-lg md:text-xl font-bold mb-1">Умная база знаний</h2>
                <p className="text-indigo-200 text-sm">
                  Создавайте учебные материалы с ИИ, отслеживайте прогресс сотрудников и проводите аттестации
                </p>
              </>
            )}
          </div>
          {!isEmployee && (
            <div className="hidden md:flex items-center gap-3 shrink-0">
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
          )}
          {isEmployee && (
            <div className="shrink-0 text-right">
              <p className="text-2xl md:text-3xl font-bold">740</p>
              <p className="text-xs text-indigo-200">баллов</p>
            </div>
          )}
        </div>
      </div>

      {/* Stats grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
        {stats.map((stat) => (
          <div key={stat.label} className="bg-white rounded-xl p-3 md:p-4 border border-gray-100 hover:shadow-sm transition-shadow">
            <div className="flex items-center justify-between mb-2 md:mb-3">
              <div className={cn("w-8 h-8 md:w-9 md:h-9 rounded-lg flex items-center justify-center", stat.color)}>
                <Icon name={stat.icon as "BookOpen"} className="w-4 h-4 text-white" />
              </div>
              <span className="text-xs text-gray-400 text-right leading-tight">{stat.change}</span>
            </div>
            <p className="text-xl md:text-2xl font-bold text-gray-900">{stat.value}</p>
            <p className="text-xs text-gray-500 mt-0.5 leading-tight">{stat.label}</p>
          </div>
        ))}
      </div>

      {/* Employee-only gamification block */}
      {isEmployee && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
          {/* Daily challenges */}
          <div className="bg-white rounded-xl border border-gray-100 p-5">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-amber-50 rounded-lg flex items-center justify-center">
                <Icon name="Target" className="w-4 h-4 text-amber-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 text-sm">Ежедневные задания</h3>
                <p className="text-xs text-gray-400">Обновляются каждый день</p>
              </div>
              <div className="ml-auto text-xs font-semibold text-amber-600 bg-amber-50 px-2 py-1 rounded-full">
                1/3 выполнено
              </div>
            </div>
            <div className="space-y-3">
              {dailyChallenges.map((c) => (
                <div key={c.id} className={cn(
                  "flex items-center gap-3 p-3 rounded-lg transition-colors",
                  c.done ? "bg-emerald-50" : "bg-gray-50"
                )}>
                  <div className={cn(
                    "w-6 h-6 rounded-full flex items-center justify-center shrink-0",
                    c.done ? "bg-emerald-500" : "bg-white border-2 border-gray-200"
                  )}>
                    {c.done && <Icon name="Check" className="w-3 h-3 text-white" />}
                  </div>
                  <span className={cn("text-sm flex-1", c.done ? "line-through text-gray-400" : "text-gray-700")}>
                    {c.label}
                  </span>
                  <span className={cn(
                    "text-xs font-semibold px-2 py-0.5 rounded-full",
                    c.done ? "text-emerald-700 bg-emerald-100" : "text-amber-700 bg-amber-100"
                  )}>
                    +{c.xp} XP
                  </span>
                </div>
              ))}
            </div>
            {!claimedReward && (
              <button
                onClick={() => setClaimedReward(true)}
                className="mt-3 w-full py-2 rounded-lg bg-amber-500 hover:bg-amber-600 text-white text-sm font-semibold transition-colors flex items-center justify-center gap-2"
              >
                <Icon name="Gift" className="w-4 h-4" />
                Забрать ежедневную награду
              </button>
            )}
            {claimedReward && (
              <div className="mt-3 w-full py-2 rounded-lg bg-emerald-50 text-emerald-700 text-sm font-semibold flex items-center justify-center gap-2">
                <Icon name="CheckCircle2" className="w-4 h-4" />
                Награда получена! +20 XP
              </div>
            )}
          </div>

          {/* Achievements */}
          <div className="bg-white rounded-xl border border-gray-100 p-5">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-violet-50 rounded-lg flex items-center justify-center">
                <Icon name="Trophy" className="w-4 h-4 text-violet-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 text-sm">Достижения</h3>
                <p className="text-xs text-gray-400">2 из 4 разблокировано</p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-2">
              {achievements.map((a) => (
                <div key={a.id} className={cn(
                  "p-3 rounded-xl border transition-all",
                  a.unlocked ? "border-gray-100 bg-white" : "border-dashed border-gray-200 bg-gray-50 opacity-60"
                )}>
                  <div className={cn("w-8 h-8 rounded-lg flex items-center justify-center mb-2", a.color)}>
                    <Icon name={a.icon as "BookOpen"} className="w-4 h-4" />
                  </div>
                  <p className="text-xs font-semibold text-gray-900 leading-tight">{a.label}</p>
                  <p className="text-xs text-amber-600 font-medium mt-1">+{a.xp} XP</p>
                  {!a.unlocked && <p className="text-xs text-gray-400 mt-0.5 leading-tight">{a.desc}</p>}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6">
        {/* Recent modules */}
        <div className="lg:col-span-2 bg-white rounded-xl border border-gray-100 p-4 md:p-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-gray-900">
              {isEmployee ? "Мои модули" : "Последние модули"}
            </h3>
            <button
              onClick={() => onSectionChange("modules")}
              className="text-xs text-indigo-600 hover:text-indigo-700 font-medium flex items-center gap-1"
            >
              {isEmployee ? "Все задания" : "Все модули"} <Icon name="ChevronRight" className="w-3 h-3" />
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
                  <div className="flex items-center gap-2 mt-0.5 flex-wrap">
                    <span className="text-xs text-gray-400">{mod.category_name}</span>
                    <span className="text-gray-200">•</span>
                    <span className="text-xs text-gray-400">{mod.estimated_duration} мин</span>
                    {isEmployee && (
                      <>
                        <span className="text-gray-200">•</span>
                        <span className="text-xs text-amber-600 font-medium flex items-center gap-0.5">
                          <Icon name="Zap" className="w-3 h-3" /> +50 XP
                        </span>
                      </>
                    )}
                  </div>
                </div>
                <div className="shrink-0 text-right">
                  {isEmployee ? (
                    <button
                      onClick={() => onSectionChange("modules")}
                      className="text-xs px-3 py-1 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors font-medium"
                    >
                      Начать
                    </button>
                  ) : (
                    <span className={cn(
                      "text-xs px-2 py-0.5 rounded-full font-medium",
                      mod.status === "published" ? "bg-emerald-50 text-emerald-700" : "bg-gray-100 text-gray-500"
                    )}>
                      {mod.status === "published" ? "Опубликован" : "Черновик"}
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Top employees leaderboard */}
        <div className="bg-white rounded-xl border border-gray-100 p-4 md:p-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-gray-900">
              {isEmployee ? "Рейтинг команды" : "Лидеры обучения"}
            </h3>
            {!isEmployee && (
              <button
                onClick={() => onSectionChange("analytics")}
                className="text-xs text-indigo-600 hover:text-indigo-700 font-medium flex items-center gap-1"
              >
                Аналитика <Icon name="ChevronRight" className="w-3 h-3" />
              </button>
            )}
          </div>
          <div className="space-y-3">
            {data.topEmployees.map((emp, idx) => (
              <div key={emp.name} className={cn(
                "flex items-center gap-3 p-2 rounded-lg",
                isEmployee && emp.name === "Иван Петров" ? "bg-indigo-50 border border-indigo-100" : ""
              )}>
                <div className={cn(
                  "w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold shrink-0",
                  idx === 0 ? "bg-amber-100 text-amber-700" :
                  idx === 1 ? "bg-gray-100 text-gray-600" :
                  idx === 2 ? "bg-orange-100 text-orange-600" :
                  "bg-gray-50 text-gray-400"
                )}>
                  {idx === 0 ? "🥇" : idx === 1 ? "🥈" : idx === 2 ? "🥉" : idx + 1}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 truncate">{emp.name}</p>
                  <p className="text-xs text-gray-400 truncate">{emp.department}</p>
                </div>
                <div className="shrink-0 text-right">
                  <p className="text-sm font-bold text-indigo-600">{emp.total_points}</p>
                  <p className="text-xs text-gray-400">XP</p>
                </div>
              </div>
            ))}
          </div>
          {isEmployee && (
            <div className="mt-3 p-3 bg-amber-50 rounded-lg border border-amber-100">
              <p className="text-xs text-amber-700 font-medium flex items-center gap-1">
                <Icon name="TrendingUp" className="w-3 h-3" />
                Вы на 2-м месте! До 1-го — 210 XP
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Quick actions — скрываем для сотрудников создание контента */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {(isEmployee
          ? [
              { icon: "BookOpen", label: "Продолжить обучение", desc: "3 модуля в прогрессе", color: "text-indigo-600 bg-indigo-50", section: "modules" },
              { icon: "Award", label: "Мои аттестации", desc: "1 назначена", color: "text-amber-600 bg-amber-50", section: "certifications" },
              { icon: "FileText", label: "Регламенты", desc: "2 ожидают прочтения", color: "text-emerald-600 bg-emerald-50", section: "regulations" },
              { icon: "Trophy", label: "Мои достижения", desc: "2 из 4 открыто", color: "text-violet-600 bg-violet-50", section: "widgets" },
            ]
          : [
              { icon: "Sparkles", label: "Создать модуль с ИИ", desc: "ИИ напишет уроки и тесты", color: "text-violet-600 bg-violet-50", section: "modules" },
              { icon: "FileText", label: "Новый регламент", desc: "С ИИ или вручную", color: "text-emerald-600 bg-emerald-50", section: "regulations" },
              { icon: "BarChart3", label: "Просмотр аналитики", desc: "Прогресс по отделам", color: "text-blue-600 bg-blue-50", section: "analytics" },
              { icon: "Award", label: "Создать аттестацию", desc: "Назначить тестирование", color: "text-amber-600 bg-amber-50", section: "certifications" },
            ]
        ).map((action) => (
          <button
            key={action.label}
            onClick={() => onSectionChange(action.section)}
            className="bg-white border border-gray-100 rounded-xl p-3 md:p-4 text-left hover:shadow-sm hover:border-gray-200 transition-all"
          >
            <div className={cn("w-8 h-8 rounded-lg flex items-center justify-center mb-2", action.color)}>
              <Icon name={action.icon as "Sparkles"} className="w-4 h-4" />
            </div>
            <p className="text-sm font-medium text-gray-900 leading-tight">{action.label}</p>
            <p className="text-xs text-gray-400 mt-0.5">{action.desc}</p>
          </button>
        ))}
      </div>
    </div>
  );
}
