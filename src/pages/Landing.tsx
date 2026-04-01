import Icon from "@/components/ui/icon";

export default function Landing() {
  return (
    <div className="min-h-screen bg-white font-sans">

      {/* Navigation */}
      <nav className="fixed top-0 inset-x-0 z-50 bg-white/90 backdrop-blur-sm border-b border-gray-100">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center">
              <Icon name="Brain" className="w-4 h-4 text-white" />
            </div>
            <span className="font-bold text-gray-900 text-lg">KnowledgeAI</span>
            <span className="text-xs bg-indigo-100 text-indigo-700 px-2 py-0.5 rounded-full font-medium">by Cast Dev</span>
          </div>
          <div className="hidden md:flex items-center gap-8 text-sm text-gray-600">
            <a href="#features" className="hover:text-indigo-600 transition-colors">Возможности</a>
            <a href="#how-it-works" className="hover:text-indigo-600 transition-colors">Как работает</a>
            <a href="#pricing" className="hover:text-indigo-600 transition-colors">Тарифы</a>
            <a href="#faq" className="hover:text-indigo-600 transition-colors">FAQ</a>
          </div>
          <div className="flex items-center gap-3">
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
              className="flex items-center gap-1.5 px-4 py-2 bg-indigo-600 text-white text-sm font-semibold rounded-lg hover:bg-indigo-700 transition-colors"
            >
              <Icon name="Download" className="w-3.5 h-3.5" />
              Установить
            </a>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="pt-32 pb-20 px-6 bg-gradient-to-b from-indigo-50/50 to-white">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-indigo-100 text-indigo-700 text-xs font-semibold px-3 py-1.5 rounded-full mb-6">
            <Icon name="Zap" className="w-3 h-3" />
            Приложение для Битрикс24
          </div>
          <h1 className="text-4xl md:text-6xl font-extrabold text-gray-900 leading-tight mb-6">
            Умная база знаний<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-violet-600">с ИИ-генерацией</span>
          </h1>
          <p className="text-xl text-gray-500 max-w-2xl mx-auto mb-10 leading-relaxed">
            Создавайте учебные модули, регламенты и аттестации за минуты с помощью ИИ. Отслеживайте прогресс сотрудников прямо в Битрикс24.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <a
              href="https://www.bitrix24.ru/apps/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-8 py-4 bg-indigo-600 text-white font-semibold rounded-xl hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-200 text-base"
            >
              <Icon name="Download" className="w-5 h-5" />
              Установить бесплатно
            </a>
            <a
              href="/"
              className="flex items-center gap-2 px-8 py-4 bg-white border-2 border-gray-200 text-gray-700 font-semibold rounded-xl hover:border-indigo-300 hover:text-indigo-600 transition-all text-base"
            >
              <Icon name="Play" className="w-5 h-5" />
              Демо
            </a>
          </div>
          <p className="text-xs text-gray-400 mt-4">Бесплатный план — без кредитной карты</p>
        </div>

        {/* App preview */}
        <div className="max-w-5xl mx-auto mt-16 bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden">
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
          <div className="flex h-80">
            {/* Sidebar */}
            <div className="w-52 bg-white border-r border-gray-100 p-4 space-y-1">
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
            <div className="flex-1 p-5 bg-gray-50">
              <div className="grid grid-cols-2 gap-3 mb-4">
                {[
                  { label: "Модулей", value: "12", color: "bg-indigo-500" },
                  { label: "Сотрудников", value: "48", color: "bg-emerald-500" },
                  { label: "Завершений", value: "234", color: "bg-amber-500" },
                  { label: "Средний балл", value: "94%", color: "bg-violet-500" },
                ].map((s) => (
                  <div key={s.label} className="bg-white rounded-xl p-3 border border-gray-100">
                    <div className={`w-6 h-6 ${s.color} rounded-lg mb-2`} />
                    <p className="text-lg font-bold text-gray-900">{s.value}</p>
                    <p className="text-xs text-gray-400">{s.label}</p>
                  </div>
                ))}
              </div>
              <div className="bg-white rounded-xl border border-gray-100 p-3">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-4 h-4 bg-indigo-100 rounded" />
                  <span className="text-xs font-medium text-gray-700">Онбординг для новых сотрудников</span>
                  <span className="ml-auto text-xs bg-emerald-50 text-emerald-700 px-1.5 py-0.5 rounded-full">ИИ</span>
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
      <section className="py-12 bg-indigo-600">
        <div className="max-w-5xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8 text-center text-white">
          {[
            { value: "2 мин", label: "создание модуля с ИИ" },
            { value: "94%", label: "средний балл аттестаций" },
            { value: "3×", label: "быстрее онбординг" },
            { value: "0 ₽", label: "для старта" },
          ].map((s) => (
            <div key={s.label}>
              <p className="text-3xl font-extrabold mb-1">{s.value}</p>
              <p className="text-indigo-200 text-sm">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Всё для обучения команды</h2>
            <p className="text-gray-500 text-lg max-w-xl mx-auto">Единая платформа для создания, управления и аналитики корпоративного обучения</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                icon: "Sparkles",
                color: "bg-indigo-600",
                title: "ИИ-генерация контента",
                desc: "Создавайте полноценные учебные модули, тесты и регламенты за 2 минуты. Просто введите тему — ИИ сделает остальное.",
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
                icon: "Users",
                color: "bg-rose-500",
                title: "Интеграция с Битрикс24",
                desc: "Автоматическая синхронизация сотрудников, ролей и отделов. Добавляйте пользователей прямо из Битрикс24.",
              },
            ].map((f) => (
              <div key={f.title} className="bg-white rounded-2xl border border-gray-100 p-6 hover:shadow-md hover:border-indigo-100 transition-all">
                <div className={`w-11 h-11 ${f.color} rounded-xl flex items-center justify-center mb-4`}>
                  <Icon name={f.icon as "Sparkles"} className="w-5 h-5 text-white" />
                </div>
                <h3 className="font-bold text-gray-900 mb-2 text-lg">{f.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section id="how-it-works" className="py-20 px-6 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Запуск за 3 шага</h2>
            <p className="text-gray-500 text-lg">Начните обучать команду уже сегодня</p>
          </div>
          <div className="space-y-8">
            {[
              {
                step: "01",
                title: "Установите приложение",
                desc: "Найдите KnowledgeAI в маркетплейсе Битрикс24 и установите в один клик. Сотрудники синхронизируются автоматически.",
                icon: "Download",
              },
              {
                step: "02",
                title: "Создайте первый модуль с ИИ",
                desc: "Введите тему обучения — например «Работа с CRM» — и ИИ сгенерирует полноценный курс с уроками и тестами за 2 минуты.",
                icon: "Sparkles",
              },
              {
                step: "03",
                title: "Назначьте и отслеживайте",
                desc: "Назначьте модули сотрудникам или отделам. Следите за прогрессом в режиме реального времени через удобную аналитику.",
                icon: "BarChart3",
              },
            ].map((item, i) => (
              <div key={i} className="flex gap-6 items-start">
                <div className="shrink-0 w-14 h-14 bg-indigo-600 rounded-2xl flex items-center justify-center">
                  <Icon name={item.icon as "Download"} className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1 pt-1">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-xs font-bold text-indigo-400 bg-indigo-50 px-2 py-0.5 rounded-full">Шаг {item.step}</span>
                    <h3 className="font-bold text-gray-900 text-lg">{item.title}</h3>
                  </div>
                  <p className="text-gray-500 leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="py-20 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Простые тарифы</h2>
            <p className="text-gray-500 text-lg">Начните бесплатно, масштабируйтесь по мере роста команды</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                name: "Бесплатный",
                price: "0",
                period: "навсегда",
                desc: "Для малых команд",
                features: ["До 5 сотрудников", "3 учебных модуля", "ИИ-генерация (3/мес)", "Базовая аналитика"],
                cta: "Начать бесплатно",
                highlight: false,
              },
              {
                name: "Бизнес",
                price: "4 990",
                period: "₽/мес",
                desc: "Для компаний до 100 чел.",
                features: ["До 100 сотрудников", "Неограниченные модули", "ИИ-генерация без лимита", "Расширенная аналитика", "Приоритетная поддержка", "Экспорт в Excel"],
                cta: "Попробовать 14 дней",
                highlight: true,
              },
              {
                name: "Enterprise",
                price: "12 990",
                period: "₽/мес",
                desc: "Для крупных организаций",
                features: ["Неограниченно сотрудников", "API интеграции", "Кастомное брендирование", "Поддержка 24/7", "SLA"],
                cta: "Связаться с нами",
                highlight: false,
              },
            ].map((plan) => (
              <div
                key={plan.name}
                className={`rounded-2xl border-2 p-6 flex flex-col ${
                  plan.highlight
                    ? "border-indigo-500 bg-indigo-600 text-white shadow-xl scale-105"
                    : "border-gray-200 bg-white"
                }`}
              >
                <h3 className={`font-bold text-xl mb-1 ${plan.highlight ? "text-white" : "text-gray-900"}`}>{plan.name}</h3>
                <p className={`text-sm mb-4 ${plan.highlight ? "text-indigo-200" : "text-gray-400"}`}>{plan.desc}</p>
                <div className={`flex items-baseline gap-1 mb-6 ${plan.highlight ? "text-white" : "text-gray-900"}`}>
                  <span className="text-4xl font-extrabold">{plan.price}</span>
                  <span className={`text-sm ${plan.highlight ? "text-indigo-200" : "text-gray-400"}`}>{plan.period}</span>
                </div>
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
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 px-6 bg-gray-50">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-3">Что говорят клиенты</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                name: "Анна Петрова",
                role: "HR-директор, ТехноГрупп",
                text: "Сократили время онбординга с 2 недель до 3 дней. ИИ генерирует материалы быстрее, чем мы успеваем придумывать темы.",
              },
              {
                name: "Дмитрий Козлов",
                role: "CEO, СтройПроект",
                text: "Наконец-то сотрудники читают регламенты и подтверждают ознакомление. Аналитика показывает всё — кто прошёл, кто нет.",
              },
              {
                name: "Мария Соколова",
                role: "Руководитель отдела обучения",
                text: "Интеграция с Битрикс24 работает идеально. Никакой лишней работы — всё синхронизируется автоматически.",
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
      <section id="faq" className="py-20 px-6">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-3">Частые вопросы</h2>
          </div>
          <div className="space-y-4">
            {[
              {
                q: "Нужно ли устанавливать отдельно или оно встроено в Битрикс24?",
                a: "KnowledgeAI — это приложение для Битрикс24. Устанавливается из маркетплейса в один клик и работает внутри вашего корпоративного портала.",
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
              {
                q: "Можно ли экспортировать данные аналитики?",
                a: "Да, аналитику по сотрудникам, модулям и отделам можно экспортировать в формат CSV (открывается в Excel и Google Таблицах).",
              },
            ].map((faq, i) => (
              <div key={i} className="bg-white rounded-xl border border-gray-100 p-5">
                <p className="font-semibold text-gray-900 mb-2 flex items-start gap-2">
                  <Icon name="HelpCircle" className="w-4 h-4 text-indigo-400 shrink-0 mt-0.5" />
                  {faq.q}
                </p>
                <p className="text-sm text-gray-500 ml-6 leading-relaxed">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-6 bg-gradient-to-br from-indigo-600 to-violet-700">
        <div className="max-w-3xl mx-auto text-center text-white">
          <h2 className="text-3xl md:text-4xl font-extrabold mb-4">Начните обучать команду сегодня</h2>
          <p className="text-indigo-200 text-lg mb-10 max-w-xl mx-auto">
            Бесплатный план без ограничений по времени. Первый модуль — за 2 минуты.
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
      <footer className="bg-gray-900 text-gray-400 py-12 px-6">
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
                Умная база знаний с ИИ для корпоративного обучения в Битрикс24.
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