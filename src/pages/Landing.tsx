import { useState } from "react";
import Icon from "@/components/ui/icon";

export default function Landing() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-white font-sans">

      {/* Navigation */}
      <nav className="fixed top-0 inset-x-0 z-50 bg-white/90 backdrop-blur-sm border-b border-gray-100">
        <div className="max-w-6xl mx-auto px-4 md:px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center">
              <Icon name="Brain" className="w-4 h-4 text-white" />
            </div>
            <span className="font-bold text-gray-900 text-lg">KnowledgeAI</span>
            <span className="hidden sm:inline text-xs bg-indigo-100 text-indigo-700 px-2 py-0.5 rounded-full font-medium">by Cast Dev</span>
          </div>
          <div className="hidden md:flex items-center gap-8 text-sm text-gray-600">
            <a href="#features" className="hover:text-indigo-600 transition-colors">Возможности</a>
            <a href="#gamification" className="hover:text-indigo-600 transition-colors">Геймификация</a>
            <a href="#how-it-works" className="hover:text-indigo-600 transition-colors">Как работает</a>
            <a href="#pricing" className="hover:text-indigo-600 transition-colors">Тарифы</a>
            <a href="#faq" className="hover:text-indigo-600 transition-colors">FAQ</a>
          </div>
          <div className="flex items-center gap-2 md:gap-3">
            <a
              href="/"
              className="hidden md:block text-sm text-gray-600 hover:text-indigo-600 transition-colors"
            >
              Войти
            </a>
            <a
              href="https://www.bitrix24.ru/apps/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 px-3 md:px-4 py-2 bg-indigo-600 text-white text-sm font-semibold rounded-lg hover:bg-indigo-700 transition-colors"
            >
              <Icon name="Download" className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Установить</span>
              <span className="sm:hidden">Старт</span>
            </a>
            <button
              className="md:hidden p-2 rounded-lg text-gray-500 hover:bg-gray-100"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              <Icon name={mobileMenuOpen ? "X" : "Menu"} className="w-5 h-5" />
            </button>
          </div>
        </div>
        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-gray-100 bg-white px-4 py-3 space-y-1">
            {[
              { href: "#features", label: "Возможности" },
              { href: "#gamification", label: "Геймификация" },
              { href: "#how-it-works", label: "Как работает" },
              { href: "#pricing", label: "Тарифы" },
              { href: "#faq", label: "FAQ" },
            ].map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="block py-2.5 px-3 text-sm text-gray-700 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                {item.label}
              </a>
            ))}
            <a href="/" className="block py-2.5 px-3 text-sm text-gray-700 hover:bg-gray-50 rounded-lg">Войти</a>
          </div>
        )}
      </nav>

      {/* Hero */}
      <section className="pt-28 md:pt-32 pb-16 md:pb-20 px-4 md:px-6 bg-gradient-to-b from-indigo-50/50 to-white">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-indigo-100 text-indigo-700 text-xs font-semibold px-3 py-1.5 rounded-full mb-6">
            <Icon name="Zap" className="w-3 h-3" />
            Приложение для Битрикс24
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-6xl font-extrabold text-gray-900 leading-tight mb-6">
            Умная база знаний<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-violet-600">с ИИ и геймификацией</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-500 max-w-2xl mx-auto mb-10 leading-relaxed">
            Создавайте учебные модули с ИИ, мотивируйте сотрудников баллами и достижениями, загружайте видео-уроки, управляйте подразделениями — всё в Битрикс24.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <a
              href="https://www.bitrix24.ru/apps/"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-4 bg-indigo-600 text-white font-semibold rounded-xl hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-200 text-base"
            >
              <Icon name="Download" className="w-5 h-5" />
              Установить бесплатно
            </a>
            <a
              href="/"
              className="w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-4 bg-white border-2 border-gray-200 text-gray-700 font-semibold rounded-xl hover:border-indigo-300 hover:text-indigo-600 transition-all text-base"
            >
              <Icon name="Play" className="w-5 h-5" />
              Демо
            </a>
          </div>
          <p className="text-xs text-gray-400 mt-4">Бесплатный план — без кредитной карты</p>
        </div>

        {/* App preview */}
        <div className="max-w-5xl mx-auto mt-12 md:mt-16 bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden">
          <div className="bg-gray-50 border-b border-gray-100 px-4 py-3 flex items-center gap-2">
            <div className="flex gap-1.5">
              <div className="w-3 h-3 rounded-full bg-red-400" />
              <div className="w-3 h-3 rounded-full bg-amber-400" />
              <div className="w-3 h-3 rounded-full bg-emerald-400" />
            </div>
            <div className="flex-1 mx-4 bg-white border border-gray-200 rounded-md px-3 py-1 text-xs text-gray-400">
              bitrix24.ru → Приложения → KnowledgeAI
            </div>
          </div>
          <div className="flex h-64 md:h-80">
            {/* Sidebar */}
            <div className="hidden sm:block w-44 md:w-52 bg-white border-r border-gray-100 p-4 space-y-1">
              <div className="flex items-center gap-2.5 px-3 py-2 bg-indigo-50 rounded-lg">
                <Icon name="LayoutDashboard" className="w-4 h-4 text-indigo-600" />
                <span className="text-sm font-medium text-indigo-700">Дашборд</span>
              </div>
              {[
                { icon: "BookOpen", label: "Обучение" },
                { icon: "FileText", label: "Регламенты" },
                { icon: "BarChart3", label: "Аналитика" },
                { icon: "Award", label: "Аттестация" },
                { icon: "Users", label: "Сотрудники" },
              ].map((item) => (
                <div key={item.label} className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-gray-500">
                  <Icon name={item.icon as "BookOpen"} className="w-4 h-4" />
                  <span className="text-sm">{item.label}</span>
                </div>
              ))}
            </div>
            {/* Content */}
            <div className="flex-1 p-4 md:p-5 bg-gray-50 overflow-hidden">
              <div className="grid grid-cols-2 gap-2 md:gap-3 mb-3 md:mb-4">
                {[
                  { label: "Модулей", value: "12", color: "bg-indigo-500" },
                  { label: "Сотрудников", value: "48", color: "bg-emerald-500" },
                  { label: "Мои баллы", value: "740", color: "bg-amber-500" },
                  { label: "Серия дней", value: "4🔥", color: "bg-rose-500" },
                ].map((s) => (
                  <div key={s.label} className="bg-white rounded-xl p-2 md:p-3 border border-gray-100">
                    <div className={`w-5 h-5 md:w-6 md:h-6 ${s.color} rounded-lg mb-1 md:mb-2`} />
                    <p className="text-base md:text-lg font-bold text-gray-900">{s.value}</p>
                    <p className="text-xs text-gray-400">{s.label}</p>
                  </div>
                ))}
              </div>
              {/* XP bar */}
              <div className="bg-white rounded-xl border border-gray-100 p-3 mb-2">
                <div className="flex items-center justify-between text-xs mb-1.5">
                  <span className="text-gray-500 font-medium">Уровень 5</span>
                  <span className="text-indigo-600 font-semibold">+50 XP за урок</span>
                </div>
                <div className="h-1.5 bg-gray-100 rounded-full">
                  <div className="h-full w-3/4 bg-indigo-500 rounded-full" />
                </div>
              </div>
              <div className="bg-white rounded-xl border border-gray-100 p-3">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-4 h-4 bg-indigo-100 rounded" />
                  <span className="text-xs font-medium text-gray-700">Онбординг для новых сотрудников</span>
                  <span className="ml-auto text-xs bg-amber-50 text-amber-700 px-1.5 py-0.5 rounded-full font-medium">+50 XP</span>
                </div>
                <div className="h-1.5 bg-gray-100 rounded-full">
                  <div className="h-full w-2/3 bg-indigo-500 rounded-full" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-10 md:py-12 bg-indigo-600">
        <div className="max-w-5xl mx-auto px-4 md:px-6 grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 text-center text-white">
          {[
            { value: "2 мин", label: "создание модуля с ИИ" },
            { value: "94%", label: "средний балл аттестаций" },
            { value: "3×", label: "быстрее онбординг" },
            { value: "0 ₽", label: "для старта" },
          ].map((s) => (
            <div key={s.label}>
              <p className="text-2xl md:text-3xl font-extrabold mb-1">{s.value}</p>
              <p className="text-indigo-200 text-sm">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-16 md:py-20 px-4 md:px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12 md:mb-14">
            <h2 className="text-2xl md:text-4xl font-bold text-gray-900 mb-4">Всё для обучения команды</h2>
            <p className="text-gray-500 text-base md:text-lg max-w-xl mx-auto">Единая платформа для создания, управления и аналитики корпоративного обучения</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
            {[
              {
                icon: "Sparkles",
                color: "bg-indigo-600",
                title: "ИИ-генерация контента",
                desc: "Создавайте полноценные учебные модули, тесты и регламенты за 2 минуты. Просто введите тему — ИИ сделает остальное.",
              },
              {
                icon: "Video",
                color: "bg-rose-600",
                title: "Загрузка видео",
                desc: "Загружайте видео-уроки прямо с компьютера или указывайте ссылки YouTube/Vimeo. Хранилище до 50 ГБ на Enterprise-тарифе.",
              },
              {
                icon: "Trophy",
                color: "bg-amber-500",
                title: "Геймификация",
                desc: "Система XP, уровней, ежедневных заданий и достижений. Сотрудники соревнуются в рейтинге и охотнее проходят обучение.",
              },
              {
                icon: "Building2",
                color: "bg-teal-600",
                title: "Управление подразделениями",
                desc: "Создавайте и управляйте структурой компании. Назначайте модули и регламенты конкретным отделам.",
              },
              {
                icon: "Award",
                color: "bg-amber-500",
                title: "Аттестации и тесты",
                desc: "Создавайте экзамены с автоматической проверкой. Выдавайте сертификаты и следите за сроком их действия.",
              },
              {
                icon: "BarChart3",
                color: "bg-emerald-600",
                title: "Аналитика обучения",
                desc: "Детальные отчёты по сотрудникам, отделам и модулям. Экспорт данных в Excel одним кликом.",
              },
              {
                icon: "BookOpen",
                color: "bg-violet-600",
                title: "Учебные модули",
                desc: "Структурированные курсы с уроками, видео, тестами и заданиями. Прогресс каждого сотрудника под контролем.",
              },
              {
                icon: "FileText",
                color: "bg-blue-600",
                title: "База регламентов",
                desc: "Храните все корпоративные документы в одном месте. Отслеживайте ознакомление и получайте электронные подписи.",
              },
              {
                icon: "Users",
                color: "bg-rose-500",
                title: "Интеграция с Битрикс24",
                desc: "Автоматическая синхронизация сотрудников, ролей и отделов. Добавляйте пользователей прямо из Битрикс24.",
              },
            ].map((f) => (
              <div key={f.title} className="bg-white rounded-2xl border border-gray-100 p-5 md:p-6 hover:shadow-md hover:border-indigo-100 transition-all">
                <div className={`w-10 h-10 md:w-11 md:h-11 ${f.color} rounded-xl flex items-center justify-center mb-4`}>
                  <Icon name={f.icon as "Sparkles"} className="w-5 h-5 text-white" />
                </div>
                <h3 className="font-bold text-gray-900 mb-2 text-base md:text-lg">{f.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Gamification section */}
      <section id="gamification" className="py-16 md:py-20 px-4 md:px-6 bg-gradient-to-br from-indigo-50 to-violet-50">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-amber-100 text-amber-700 text-xs font-semibold px-3 py-1.5 rounded-full mb-4">
              <Icon name="Trophy" className="w-3 h-3" />
              Геймификация обучения
            </div>
            <h2 className="text-2xl md:text-4xl font-bold text-gray-900 mb-4">Сотрудники учатся с удовольствием</h2>
            <p className="text-gray-500 text-base md:text-lg max-w-2xl mx-auto">
              Система мотивации превращает скучное обучение в увлекательную игру. Результат — вовлечённость растёт до 3 раз.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 items-center">
            {/* Left: mechanics list */}
            <div className="space-y-4">
              {[
                {
                  icon: "Zap",
                  color: "bg-amber-500",
                  title: "Система XP и уровней",
                  desc: "За каждый пройденный урок, тест или регламент — очки опыта. Сотрудники прокачивают свой уровень и статус в команде.",
                },
                {
                  icon: "Target",
                  color: "bg-indigo-500",
                  title: "Ежедневные задания",
                  desc: "Каждый день — новые задачи с наградами. Ежедневный логин и выполнение поддерживают серию дней подряд.",
                },
                {
                  icon: "Medal",
                  color: "bg-violet-500",
                  title: "Достижения и значки",
                  desc: "Разблокируйте уникальные ачивки: «Знаток тестов», «Неделя без пропусков», «Топ-3 команды» — и многие другие.",
                },
                {
                  icon: "Trophy",
                  color: "bg-rose-500",
                  title: "Рейтинг и соревнование",
                  desc: "Таблица лидеров по отделу и компании. Сотрудники видят своё место и стараются обогнать коллег.",
                },
              ].map((item) => (
                <div key={item.title} className="flex gap-4 bg-white rounded-xl p-4 border border-gray-100 shadow-sm">
                  <div className={`w-10 h-10 ${item.color} rounded-xl flex items-center justify-center shrink-0`}>
                    <Icon name={item.icon as "Zap"} className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">{item.title}</h4>
                    <p className="text-sm text-gray-500 leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Right: visual card */}
            <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-6 space-y-4">
              {/* XP Bar */}
              <div className="flex items-center gap-3 p-4 bg-indigo-50 rounded-xl">
                <div className="w-12 h-12 bg-indigo-600 rounded-xl flex items-center justify-center">
                  <span className="text-white font-bold text-lg">5</span>
                </div>
                <div className="flex-1">
                  <div className="flex justify-between text-xs mb-1">
                    <span className="font-semibold text-gray-900">Иван Петров</span>
                    <span className="text-indigo-600 font-bold">740 XP</span>
                  </div>
                  <div className="h-2 bg-indigo-100 rounded-full">
                    <div className="h-full w-3/4 bg-indigo-600 rounded-full" />
                  </div>
                  <p className="text-xs text-indigo-500 mt-0.5">До уровня 6: 260 XP</p>
                </div>
              </div>

              {/* Daily challenges */}
              <div>
                <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">Ежедневные задания</p>
                <div className="space-y-2">
                  {[
                    { label: "Пройти 1 урок сегодня", xp: 20, done: true },
                    { label: "Ответить на тест с 1-й попытки", xp: 30, done: false },
                    { label: "Прочитать регламент", xp: 15, done: false },
                  ].map((c) => (
                    <div key={c.label} className={`flex items-center gap-2 p-2 rounded-lg ${c.done ? "bg-emerald-50" : "bg-gray-50"}`}>
                      <div className={`w-4 h-4 rounded-full flex items-center justify-center ${c.done ? "bg-emerald-500" : "border-2 border-gray-200 bg-white"}`}>
                        {c.done && <Icon name="Check" className="w-2.5 h-2.5 text-white" />}
                      </div>
                      <span className={`text-xs flex-1 ${c.done ? "line-through text-gray-400" : "text-gray-700"}`}>{c.label}</span>
                      <span className="text-xs font-semibold text-amber-600">+{c.xp} XP</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Leaderboard */}
              <div>
                <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">Топ команды</p>
                <div className="space-y-2">
                  {[
                    { name: "Анна С.", pts: 950, medal: "🥇" },
                    { name: "Иван П.", pts: 740, medal: "🥈" },
                    { name: "Мария К.", pts: 620, medal: "🥉" },
                  ].map((e) => (
                    <div key={e.name} className="flex items-center gap-2">
                      <span className="text-base">{e.medal}</span>
                      <span className="text-sm text-gray-700 flex-1">{e.name}</span>
                      <span className="text-sm font-bold text-indigo-600">{e.pts} XP</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section id="how-it-works" className="py-16 md:py-20 px-4 md:px-6 bg-white">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12 md:mb-14">
            <h2 className="text-2xl md:text-4xl font-bold text-gray-900 mb-4">Запуск за 3 шага</h2>
            <p className="text-gray-500 text-base md:text-lg">Начните обучать команду уже сегодня</p>
          </div>
          <div className="space-y-6 md:space-y-8">
            {[
              {
                step: "01",
                title: "Установите приложение",
                desc: "Найдите KnowledgeAI в маркетплейсе Битрикс24 и установите в один клик. Сотрудники синхронизируются автоматически. Настройте подразделения под структуру вашей компании.",
                icon: "Download",
              },
              {
                step: "02",
                title: "Создайте первый модуль с ИИ",
                desc: "Введите тему обучения — ИИ сгенерирует полноценный курс с уроками и тестами за 2 минуты. Добавьте видео по ссылке или загрузите файл с компьютера.",
                icon: "Sparkles",
              },
              {
                step: "03",
                title: "Назначьте и мотивируйте",
                desc: "Назначьте модули сотрудникам. Система геймификации автоматически выдаёт XP, достижения и обновляет рейтинг — сотрудники сами хотят учиться.",
                icon: "Trophy",
              },
            ].map((item, i) => (
              <div key={i} className="flex gap-4 md:gap-6 items-start">
                <div className="shrink-0 w-12 h-12 md:w-14 md:h-14 bg-indigo-600 rounded-2xl flex items-center justify-center">
                  <Icon name={item.icon as "Download"} className="w-5 h-5 md:w-6 md:h-6 text-white" />
                </div>
                <div className="flex-1 pt-1">
                  <div className="flex items-center gap-3 mb-2 flex-wrap">
                    <span className="text-xs font-bold text-indigo-400 bg-indigo-50 px-2 py-0.5 rounded-full">Шаг {item.step}</span>
                    <h3 className="font-bold text-gray-900 text-base md:text-lg">{item.title}</h3>
                  </div>
                  <p className="text-gray-500 leading-relaxed text-sm md:text-base">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="py-16 md:py-20 px-4 md:px-6 bg-gray-50">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12 md:mb-14">
            <h2 className="text-2xl md:text-4xl font-bold text-gray-900 mb-4">Простые тарифы</h2>
            <p className="text-gray-500 text-base md:text-lg">Начните бесплатно, масштабируйтесь по мере роста команды</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 md:gap-6">
            {[
              {
                name: "Бесплатный",
                price: "0",
                period: "навсегда",
                desc: "Для малых команд",
                features: ["До 5 сотрудников", "3 учебных модуля", "ИИ-генерация (3/мес)", "Базовая аналитика", "Геймификация (XP + рейтинг)"],
                cta: "Начать бесплатно",
                highlight: false,
                storage: null,
              },
              {
                name: "Бизнес",
                price: "4 990",
                period: "₽/мес",
                desc: "Для компаний до 100 чел.",
                features: ["До 100 сотрудников", "Неограниченные модули", "ИИ-генерация без лимита", "Загрузка видео (5 ГБ)", "Все механики геймификации", "Расширенная аналитика", "Приоритетная поддержка", "Экспорт в Excel"],
                cta: "Подключить",
                highlight: true,
                storage: "5 ГБ",
              },
              {
                name: "Enterprise",
                price: "12 990",
                period: "₽/мес",
                desc: "Для крупных организаций",
                features: ["Неограниченно сотрудников", "Загрузка видео (50 ГБ)", "API интеграции", "Кастомное брендирование", "Поддержка 24/7", "SLA", "Неограниченные подразделения"],
                cta: "Подключить",
                highlight: false,
                storage: "50 ГБ",
              },
            ].map((plan) => (
              <div
                key={plan.name}
                className={`rounded-2xl border-2 p-6 flex flex-col ${
                  plan.highlight
                    ? "border-indigo-500 bg-indigo-600 text-white shadow-xl sm:scale-105"
                    : "border-gray-200 bg-white"
                }`}
              >
                <h3 className={`font-bold text-xl mb-1 ${plan.highlight ? "text-white" : "text-gray-900"}`}>{plan.name}</h3>
                <p className={`text-sm mb-4 ${plan.highlight ? "text-indigo-200" : "text-gray-400"}`}>{plan.desc}</p>
                <div className={`flex items-baseline gap-1 mb-6 ${plan.highlight ? "text-white" : "text-gray-900"}`}>
                  <span className="text-4xl font-extrabold">{plan.price}</span>
                  <span className={`text-sm ${plan.highlight ? "text-indigo-200" : "text-gray-400"}`}>{plan.period}</span>
                </div>
                {plan.storage && (
                  <div className={`flex items-center gap-1.5 mb-4 text-xs font-semibold px-3 py-1.5 rounded-full w-fit ${plan.highlight ? "bg-white/20 text-white" : "bg-indigo-50 text-indigo-700"}`}>
                    <Icon name="HardDrive" className="w-3 h-3" />
                    Видео-хранилище: {plan.storage}
                  </div>
                )}
                <ul className="space-y-2.5 mb-8 flex-1">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-center gap-2 text-sm">
                      <Icon name="Check" className={`w-4 h-4 shrink-0 ${plan.highlight ? "text-indigo-200" : "text-emerald-500"}`} />
                      <span className={plan.highlight ? "text-indigo-100" : "text-gray-600"}>{f}</span>
                    </li>
                  ))}
                </ul>
                <a
                  href="https://www.bitrix24.ru/apps/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`block text-center py-3 rounded-xl font-semibold text-sm transition-all ${
                    plan.highlight
                      ? "bg-white text-indigo-600 hover:bg-indigo-50"
                      : "border-2 border-indigo-600 text-indigo-600 hover:bg-indigo-50"
                  }`}
                >
                  {plan.cta}
                </a>
              </div>
            ))}
          </div>
          {/* Starter note */}
          <p className="text-center text-sm text-gray-400 mt-6">
            Также доступен тариф <span className="font-semibold text-gray-600">Стартер — 1 990 ₽/мес</span> для команд до 25 человек с хранилищем 500 МБ для видео.{" "}
            <a href="/" className="text-indigo-600 hover:underline">Подробнее в приложении →</a>
          </p>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 md:py-20 px-4 md:px-6 bg-white">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-10 md:mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">Что говорят клиенты</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-6">
            {[
              {
                name: "Анна Петрова",
                role: "HR-директор, ТехноГрупп",
                text: "Сократили время онбординга с 2 недель до 3 дней. Геймификация — сотрудники сами просят новые модули!",
              },
              {
                name: "Дмитрий Козлов",
                role: "CEO, СтройПроект",
                text: "Управление подразделениями и видео-загрузка — то, чего нам не хватало. Наконец вся база знаний в одном месте.",
              },
              {
                name: "Мария Соколова",
                role: "Руководитель отдела обучения",
                text: "Рейтинг сотрудников поднял вовлечённость в 2 раза. Теперь люди реально соревнуются за первое место!",
              },
            ].map((t) => (
              <div key={t.name} className="bg-white rounded-2xl border border-gray-100 p-6">
                <div className="flex mb-3">
                  {[...Array(5)].map((_, i) => (
                    <Icon key={i} name="Star" className="w-4 h-4 text-amber-400" fill="#fbbf24" />
                  ))}
                </div>
                <p className="text-gray-600 text-sm leading-relaxed mb-4">"{t.text}"</p>
                <div>
                  <p className="font-semibold text-gray-900 text-sm">{t.name}</p>
                  <p className="text-xs text-gray-400">{t.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="py-16 md:py-20 px-4 md:px-6 bg-gray-50">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-10 md:mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">Частые вопросы</h2>
          </div>
          <div className="space-y-3">
            {[
              {
                q: "Нужно ли устанавливать отдельно или оно встроено в Битрикс24?",
                a: "KnowledgeAI — это приложение для Битрикс24. Устанавливается из маркетплейса в один клик и работает внутри вашего корпоративного портала.",
              },
              {
                q: "Как работает геймификация?",
                a: "Каждый сотрудник получает XP за прохождение уроков, тестов и регламентов. Очки формируют уровень и место в рейтинге. Ежедневные задания поддерживают серию дней. Достижения разблокируются за особые результаты.",
              },
              {
                q: "Можно ли загружать видео файлами, а не по ссылке?",
                a: "Да! Начиная с тарифа Стартер доступна загрузка видео-файлов напрямую (500 МБ). На тарифе Бизнес — 5 ГБ, на Enterprise — 50 ГБ. Также всегда можно добавить ссылку YouTube или Vimeo.",
              },
              {
                q: "Как добавить новые подразделения?",
                a: "В разделе «Сотрудники» нажмите кнопку «Подразделения» — откроется модальное окно, где можно добавлять и удалять отделы. Структура сразу отражается в фильтрах и аналитике.",
              },
              {
                q: "Как работает ИИ-генерация?",
                a: "Вы вводите тему, ИИ автоматически создаёт структуру модуля, уроки, тесты и вопросы. На создание полноценного курса уходит около 2 минут.",
              },
              {
                q: "Могу ли я добавить сотрудников из Битрикс24?",
                a: "Да! Сотрудники синхронизируются автоматически из вашего Битрикс24. Также можно вручную выбрать нужных пользователей через кнопку «Добавить из Битрикс24».",
              },
              {
                q: "Есть ли бесплатный период для платных тарифов?",
                a: "Да, все платные тарифы включают 14-дневный бесплатный пробный период. Кредитная карта не нужна.",
              },
            ].map((faq, i) => (
              <div key={i} className="bg-white rounded-xl border border-gray-100 overflow-hidden">
                <button
                  className="w-full p-5 text-left flex items-start gap-2"
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                >
                  <Icon name="HelpCircle" className="w-4 h-4 text-indigo-400 shrink-0 mt-0.5" />
                  <span className="font-semibold text-gray-900 flex-1 text-sm md:text-base">{faq.q}</span>
                  <Icon name={openFaq === i ? "ChevronUp" : "ChevronDown"} className="w-4 h-4 text-gray-400 shrink-0 mt-0.5" />
                </button>
                {openFaq === i && (
                  <div className="px-5 pb-5 pt-0 ml-6">
                    <p className="text-sm text-gray-500 leading-relaxed">{faq.a}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 md:py-20 px-4 md:px-6 bg-gradient-to-br from-indigo-600 to-violet-700">
        <div className="max-w-3xl mx-auto text-center text-white">
          <h2 className="text-2xl md:text-4xl font-extrabold mb-4">Начните обучать команду сегодня</h2>
          <p className="text-indigo-200 text-base md:text-lg mb-8 md:mb-10 max-w-xl mx-auto">
            Бесплатный план, геймификация, ИИ и загрузка видео — всё готово.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="https://www.bitrix24.ru/apps/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 px-8 py-4 bg-white text-indigo-600 font-bold rounded-xl hover:bg-indigo-50 transition-all shadow-xl text-base"
            >
              <Icon name="Download" className="w-5 h-5" />
              Установить в Битрикс24
            </a>
            <a
              href="/"
              className="flex items-center justify-center gap-2 px-8 py-4 border-2 border-white/40 text-white font-semibold rounded-xl hover:bg-white/10 transition-all text-base"
            >
              <Icon name="Play" className="w-5 h-5" />
              Смотреть демо
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400 py-10 md:py-12 px-4 md:px-6">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2.5 mb-3">
                <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center">
                  <Icon name="Brain" className="w-4 h-4 text-white" />
                </div>
                <span className="font-bold text-white text-lg">KnowledgeAI</span>
              </div>
              <p className="text-sm max-w-xs leading-relaxed">
                Умная база знаний с ИИ и геймификацией для корпоративного обучения в Битрикс24.
              </p>
              <p className="text-xs mt-3 text-gray-500">
                Разработано{" "}
                <span className="text-indigo-400 font-medium">Cast Dev</span>
              </p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-8 text-sm">
              <div>
                <p className="font-semibold text-white mb-3">Продукт</p>
                <ul className="space-y-2">
                  <li><a href="#features" className="hover:text-white transition-colors">Возможности</a></li>
                  <li><a href="#gamification" className="hover:text-white transition-colors">Геймификация</a></li>
                  <li><a href="#pricing" className="hover:text-white transition-colors">Тарифы</a></li>
                  <li><a href="#faq" className="hover:text-white transition-colors">FAQ</a></li>
                </ul>
              </div>
              <div>
                <p className="font-semibold text-white mb-3">Приложение</p>
                <ul className="space-y-2">
                  <li><a href="/" className="hover:text-white transition-colors">Демо</a></li>
                  <li>
                    <a
                      href="https://www.bitrix24.ru/apps/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-white transition-colors"
                    >
                      Маркетплейс Битрикс24
                    </a>
                  </li>
                </ul>
              </div>
              <div>
                <p className="font-semibold text-white mb-3">Компания</p>
                <ul className="space-y-2">
                  <li><span className="text-indigo-400">Cast Dev</span></li>
                </ul>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-6 flex flex-col md:flex-row justify-between gap-3 text-xs">
            <p>© 2024 KnowledgeAI by Cast Dev. Все права защищены.</p>
            <p>Приложение для Битрикс24</p>
          </div>
        </div>
      </footer>

    </div>
  );
}
