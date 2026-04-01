import Icon from "@/components/ui/icon";
import { cn } from "@/lib/utils";

const plans = [
  {
    id: "free",
    name: "Бесплатный",
    price: 0,
    period: "навсегда",
    color: "border-gray-200",
    headerBg: "bg-gray-50",
    badge: null,
    description: "Для малых команд и тестирования платформы",
    features: [
      { label: "До 5 сотрудников", included: true },
      { label: "До 3 учебных модулей", included: true },
      { label: "До 5 регламентов", included: true },
      { label: "Базовая аналитика", included: true },
      { label: "ИИ-генерация (3 в месяц)", included: true },
      { label: "Аттестации", included: false },
      { label: "Расширенная аналитика", included: false },
      { label: "Приоритетная поддержка", included: false },
      { label: "Брендирование", included: false },
      { label: "API интеграции", included: false },
    ],
  },
  {
    id: "starter",
    name: "Стартер",
    price: 1990,
    period: "в месяц",
    color: "border-indigo-200",
    headerBg: "bg-indigo-50",
    badge: null,
    description: "Для растущих компаний до 25 человек",
    features: [
      { label: "До 25 сотрудников", included: true },
      { label: "Неограниченные модули", included: true },
      { label: "Неограниченные регламенты", included: true },
      { label: "Базовая аналитика", included: true },
      { label: "ИИ-генерация (30 в месяц)", included: true },
      { label: "Аттестации (3 активных)", included: true },
      { label: "Расширенная аналитика", included: false },
      { label: "Приоритетная поддержка", included: false },
      { label: "Брендирование", included: false },
      { label: "API интеграции", included: false },
    ],
  },
  {
    id: "business",
    name: "Бизнес",
    price: 4990,
    period: "в месяц",
    color: "border-indigo-500",
    headerBg: "bg-gradient-to-br from-indigo-600 to-violet-600",
    badge: "Популярный",
    description: "Полный функционал для компаний до 100 человек",
    features: [
      { label: "До 100 сотрудников", included: true },
      { label: "Неограниченные модули", included: true },
      { label: "Неограниченные регламенты", included: true },
      { label: "Полная аналитика по отделам", included: true },
      { label: "ИИ-генерация (неограниченно)", included: true },
      { label: "Неограниченные аттестации", included: true },
      { label: "Расширенная аналитика", included: true },
      { label: "Приоритетная поддержка", included: true },
      { label: "Брендирование платформы", included: false },
      { label: "API интеграции", included: false },
    ],
  },
  {
    id: "enterprise",
    name: "Enterprise",
    price: 12990,
    period: "в месяц",
    color: "border-amber-400",
    headerBg: "bg-gradient-to-br from-amber-500 to-orange-500",
    badge: "Для крупных",
    description: "Максимальные возможности для больших организаций",
    features: [
      { label: "Неограниченные сотрудники", included: true },
      { label: "Неограниченные модули", included: true },
      { label: "Неограниченные регламенты", included: true },
      { label: "Полная аналитика + экспорт", included: true },
      { label: "ИИ-генерация (неограниченно)", included: true },
      { label: "Неограниченные аттестации", included: true },
      { label: "Расширенная аналитика", included: true },
      { label: "Выделенная поддержка 24/7", included: true },
      { label: "Кастомное брендирование", included: true },
      { label: "API интеграции + вебхуки", included: true },
    ],
  },
];

const comparisons = [
  { feature: "Ispring", price: "от 2 700 ₽/пользователь", modules: "Есть", ai: "Нет", bitrix: "Нет" },
  { feature: "Talenttech LMS", price: "от 1 200 ₽/пользователь", modules: "Есть", ai: "Базовый", bitrix: "Частично" },
  { feature: "GetCourse", price: "от 4 490 ₽/месяц", modules: "Есть", ai: "Нет", bitrix: "Нет" },
  { feature: "KnowledgeAI", price: "от 0 ₽/месяц", modules: "Неогр.", ai: "Полный", bitrix: "Встроен", highlight: true },
];

export default function Pricing() {
  return (
    <div className="p-6 space-y-8">
      <div className="text-center max-w-2xl mx-auto">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Тарифные планы</h2>
        <p className="text-gray-500">
          Выберите план, подходящий для вашей команды. Все планы включают интеграцию с Битрикс24.
        </p>
      </div>

      {/* Plans grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
        {plans.map((plan) => (
          <div
            key={plan.id}
            className={cn(
              "bg-white rounded-2xl border-2 overflow-hidden flex flex-col",
              plan.color,
              plan.badge ? "scale-105 shadow-lg" : ""
            )}
          >
            {/* Header */}
            <div className={cn("p-5", plan.headerBg)}>
              {plan.badge && (
                <span className="inline-block text-xs font-bold text-white bg-white/20 px-2.5 py-0.5 rounded-full mb-2">
                  {plan.badge}
                </span>
              )}
              <h3 className={cn("font-bold text-lg", plan.id === "business" || plan.id === "enterprise" ? "text-white" : "text-gray-900")}>
                {plan.name}
              </h3>
              <p className={cn("text-xs mt-0.5", plan.id === "business" || plan.id === "enterprise" ? "text-white/70" : "text-gray-500")}>
                {plan.description}
              </p>
              <div className={cn("mt-3 flex items-baseline gap-1", plan.id === "business" || plan.id === "enterprise" ? "text-white" : "text-gray-900")}>
                <span className="text-3xl font-bold">{plan.price === 0 ? "0" : plan.price.toLocaleString("ru-RU")}</span>
                {plan.price > 0 && <span className="text-sm">₽</span>}
                <span className={cn("text-sm", plan.id === "business" || plan.id === "enterprise" ? "text-white/60" : "text-gray-400")}>
                  {plan.period}
                </span>
              </div>
            </div>

            {/* Features */}
            <div className="p-5 flex-1 space-y-2.5">
              {plan.features.map((feature) => (
                <div key={feature.label} className="flex items-start gap-2">
                  <div className={cn("w-4 h-4 rounded-full flex items-center justify-center shrink-0 mt-0.5", feature.included ? "bg-emerald-100" : "bg-gray-100")}>
                    <Icon
                      name={feature.included ? "Check" : "X"}
                      className={cn("w-2.5 h-2.5", feature.included ? "text-emerald-600" : "text-gray-300")}
                    />
                  </div>
                  <span className={cn("text-sm", feature.included ? "text-gray-700" : "text-gray-400")}>{feature.label}</span>
                </div>
              ))}
            </div>

            {/* CTA */}
            <div className="p-5 pt-0">
              <button className={cn(
                "w-full py-2.5 rounded-xl text-sm font-semibold transition-all",
                plan.id === "business"
                  ? "bg-indigo-600 text-white hover:bg-indigo-700"
                  : plan.id === "enterprise"
                  ? "bg-amber-500 text-white hover:bg-amber-600"
                  : plan.id === "free"
                  ? "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  : "border-2 border-indigo-600 text-indigo-600 hover:bg-indigo-50"
              )}>
                {plan.id === "free" ? "Начать бесплатно" : plan.id === "enterprise" ? "Связаться с нами" : "Подключить"}
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Annual discount */}
      <div className="bg-gradient-to-r from-indigo-600 to-violet-600 rounded-2xl p-6 text-white flex items-center justify-between">
        <div>
          <h3 className="font-bold text-lg mb-1">Годовая подписка — экономия 20%</h3>
          <p className="text-indigo-200 text-sm">При оплате за год вы экономите 2 месяца. Автоматическое продление.</p>
        </div>
        <button className="shrink-0 px-6 py-3 bg-white text-indigo-600 rounded-xl font-semibold hover:bg-indigo-50 transition-colors">
          Попробовать бесплатно
        </button>
      </div>

      {/* Comparison with competitors */}
      <div>
        <h3 className="text-lg font-bold text-gray-900 mb-4 text-center">Сравнение с конкурентами</h3>
        <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-gray-50">
              <tr>
                <th className="text-left px-5 py-3 font-semibold text-gray-500">Продукт</th>
                <th className="text-center px-4 py-3 font-semibold text-gray-500">Стоимость</th>
                <th className="text-center px-4 py-3 font-semibold text-gray-500">Модули</th>
                <th className="text-center px-4 py-3 font-semibold text-gray-500">ИИ-генерация</th>
                <th className="text-center px-4 py-3 font-semibold text-gray-500">Битрикс24</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {comparisons.map((row) => (
                <tr key={row.feature} className={cn("transition-colors", row.highlight ? "bg-indigo-50" : "hover:bg-gray-50")}>
                  <td className="px-5 py-3.5">
                    <span className={cn("font-medium", row.highlight ? "text-indigo-700" : "text-gray-900")}>
                      {row.feature}
                    </span>
                    {row.highlight && <span className="ml-2 text-xs bg-indigo-100 text-indigo-700 px-1.5 py-0.5 rounded-full">Вы здесь</span>}
                  </td>
                  <td className={cn("px-4 py-3.5 text-center text-xs", row.highlight ? "text-indigo-700 font-bold" : "text-gray-600")}>{row.price}</td>
                  <td className="px-4 py-3.5 text-center">
                    <span className={cn("text-xs px-2 py-0.5 rounded-full", row.modules === "Неогр." ? "bg-emerald-50 text-emerald-700 font-bold" : "bg-gray-100 text-gray-500")}>{row.modules}</span>
                  </td>
                  <td className="px-4 py-3.5 text-center">
                    <span className={cn("text-xs px-2 py-0.5 rounded-full", row.ai === "Полный" ? "bg-violet-50 text-violet-700 font-bold" : row.ai === "Нет" ? "bg-red-50 text-red-400" : "bg-amber-50 text-amber-600")}>{row.ai}</span>
                  </td>
                  <td className="px-4 py-3.5 text-center">
                    <span className={cn("text-xs px-2 py-0.5 rounded-full", row.bitrix === "Встроен" ? "bg-emerald-50 text-emerald-700 font-bold" : row.bitrix === "Нет" ? "bg-red-50 text-red-400" : "bg-amber-50 text-amber-600")}>{row.bitrix}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* FAQ */}
      <div className="max-w-2xl mx-auto space-y-3">
        <h3 className="text-lg font-bold text-gray-900 text-center mb-4">Часто задаваемые вопросы</h3>
        {[
          { q: "Можно ли менять тарифный план?", a: "Да, вы можете перейти на более высокий или более низкий тариф в любое время. При повышении тарифа доступ к функционалу открывается сразу." },
          { q: "Как работает интеграция с Битрикс24?", a: "Приложение устанавливается через маркет Битрикс24. Сотрудники синхронизируются автоматически, авторизация через корпоративный аккаунт." },
          { q: "Есть ли пробный период?", a: "Бесплатный план доступен без ограничений по времени. Для платных тарифов действует 14-дневный пробный период." },
          { q: "Как работает ИИ-генерация?", a: "Вы вводите тему, ИИ автоматически создаёт структуру модуля, уроки, тесты и вопросы. Для работы ИИ требуется API ключ OpenAI." },
        ].map((faq, i) => (
          <div key={i} className="bg-white rounded-xl border border-gray-100 p-4">
            <p className="font-medium text-gray-900 mb-1.5 flex items-start gap-2">
              <Icon name="HelpCircle" className="w-4 h-4 text-indigo-400 shrink-0 mt-0.5" />
              {faq.q}
            </p>
            <p className="text-sm text-gray-500 ml-6">{faq.a}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
