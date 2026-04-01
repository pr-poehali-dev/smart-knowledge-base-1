import Icon from "@/components/ui/icon";

const services = [
  {
    icon: "Layers",
    title: "Стратегия",
    desc: "Глубокое погружение в задачу. Анализ рынка, аудитории и конкурентов перед каждым решением.",
  },
  {
    icon: "Feather",
    title: "Дизайн",
    desc: "Визуальные системы, которые не просто красивы — они работают на бизнес-результат.",
  },
  {
    icon: "Code2",
    title: "Разработка",
    desc: "Чистый код, быстрые интерфейсы. Продукты, которые легко масштабировать и поддерживать.",
  },
  {
    icon: "Zap",
    title: "Запуск",
    desc: "От концепции до продакшена. Минимальные сроки без компромиссов по качеству.",
  },
];

const cases = [
  {
    tag: "Финтех",
    title: "Цифровой банк нового поколения",
    result: "+340% конверсия онбординга",
    year: "2024",
  },
  {
    tag: "E-commerce",
    title: "Платформа премиальных товаров",
    result: "×2.8 средний чек",
    year: "2024",
  },
  {
    tag: "SaaS",
    title: "B2B-аналитика для ритейла",
    result: "−60% время внедрения",
    year: "2023",
  },
];

const testimonials = [
  {
    name: "Алексей Воронов",
    role: "CEO, Meridian Capital",
    text: "Редкое сочетание — понимают бизнес и делают красиво. Работать легко, результат превзошёл ожидания.",
  },
  {
    name: "Мария Соколова",
    role: "Product Director, Arka",
    text: "За три недели получили то, что обычно занимает три месяца. Без компромиссов по качеству.",
  },
  {
    name: "Дмитрий Лебедев",
    role: "Founder, Strata",
    text: "Не агентство, а партнёр. Думают вместе с тобой, а не просто исполняют задачи.",
  },
];

export default function Index() {
  return (
    <div
      className="min-h-screen font-body text-stone-100"
      style={{
        background: "var(--bg-base)",
        "--bg-base": "#0e0d0b",
        "--bg-card": "#161512",
        "--bg-card-hover": "#1e1c18",
        "--gold": "#c9a96e",
        "--gold-light": "#e8d5a3",
        "--gold-dim": "#7a6240",
        "--text-muted": "#7a7570",
        "--border": "#2a2720",
      } as React.CSSProperties}
    >
      {/* Grain overlay */}
      <div
        className="fixed inset-0 pointer-events-none z-50 opacity-[0.03]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='1'/%3E%3C/svg%3E")`,
          backgroundRepeat: "repeat",
          backgroundSize: "150px 150px",
        }}
      />

      {/* ── NAV ── */}
      <nav
        className="fixed top-0 left-0 right-0 z-40 flex items-center justify-between px-8 py-5"
        style={{ borderBottom: "1px solid var(--border)", background: "rgba(14,13,11,0.85)", backdropFilter: "blur(16px)" }}
      >
        <span className="font-display text-xl font-light tracking-widest" style={{ color: "var(--gold)", letterSpacing: "0.25em" }}>
          STUDIO
        </span>
        <div className="hidden md:flex items-center gap-8">
          {["Услуги", "Кейсы", "О нас", "Контакт"].map((item) => (
            <a
              key={item}
              href="#"
              className="text-sm tracking-widest transition-colors duration-300"
              style={{ color: "var(--text-muted)", letterSpacing: "0.15em" }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "var(--gold)")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "var(--text-muted)")}
            >
              {item.toUpperCase()}
            </a>
          ))}
        </div>
        <button
          className="text-xs tracking-widest px-5 py-2.5 transition-all duration-300"
          style={{
            border: "1px solid var(--gold-dim)",
            color: "var(--gold-light)",
            letterSpacing: "0.2em",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = "var(--gold)";
            e.currentTarget.style.color = "#0e0d0b";
            e.currentTarget.style.borderColor = "var(--gold)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = "transparent";
            e.currentTarget.style.color = "var(--gold-light)";
            e.currentTarget.style.borderColor = "var(--gold-dim)";
          }}
        >
          СВЯЗАТЬСЯ
        </button>
      </nav>

      {/* ── HERO ── */}
      <section className="relative min-h-screen flex flex-col justify-center px-8 md:px-16 pt-24 overflow-hidden">
        {/* Background glow */}
        <div
          className="absolute top-1/3 left-1/4 w-[600px] h-[600px] rounded-full pointer-events-none"
          style={{
            background: "radial-gradient(circle, rgba(201,169,110,0.06) 0%, transparent 70%)",
            transform: "translate(-50%, -50%)",
          }}
        />
        <div
          className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] rounded-full pointer-events-none"
          style={{
            background: "radial-gradient(circle, rgba(201,169,110,0.04) 0%, transparent 70%)",
          }}
        />

        <div className="relative max-w-5xl">
          {/* Eyebrow */}
          <div className="flex items-center gap-3 mb-8 opacity-0 animate-fade-in" style={{ animationDelay: "0.1s" }}>
            <div className="w-10 h-[1px] origin-left animate-line-grow" style={{ background: "var(--gold)", animationDelay: "0.4s" }} />
            <span className="text-xs tracking-[0.3em]" style={{ color: "var(--gold)", letterSpacing: "0.3em" }}>
              DIGITAL STUDIO
            </span>
          </div>

          {/* Heading */}
          <h1
            className="font-display font-light leading-none mb-8 opacity-0 animate-fade-in"
            style={{ fontSize: "clamp(3.5rem, 8vw, 7rem)", color: "#f0ece4", animationDelay: "0.2s" }}
          >
            Создаём продукты,
            <br />
            <em className="italic font-light" style={{ color: "var(--gold)" }}>
              которые помнят
            </em>
          </h1>

          <p
            className="max-w-xl text-lg font-light leading-relaxed mb-12 opacity-0 animate-fade-in"
            style={{ color: "var(--text-muted)", animationDelay: "0.35s" }}
          >
            Стратегия, дизайн и разработка цифровых продуктов для компаний, которым важен результат,&nbsp;а&nbsp;не&nbsp;процесс.
          </p>

          <div className="flex flex-wrap gap-4 opacity-0 animate-fade-in" style={{ animationDelay: "0.5s" }}>
            <button
              className="px-8 py-4 text-sm tracking-widest transition-all duration-300 font-medium"
              style={{
                background: "var(--gold)",
                color: "#0e0d0b",
                letterSpacing: "0.2em",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.background = "var(--gold-light)")}
              onMouseLeave={(e) => (e.currentTarget.style.background = "var(--gold)")}
            >
              НАШИ КЕЙСЫ
            </button>
            <button
              className="px-8 py-4 text-sm tracking-widest transition-all duration-300"
              style={{
                border: "1px solid var(--border)",
                color: "var(--text-muted)",
                letterSpacing: "0.2em",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = "var(--gold-dim)";
                e.currentTarget.style.color = "var(--gold-light)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "var(--border)";
                e.currentTarget.style.color = "var(--text-muted)";
              }}
            >
              О СТУДИИ
            </button>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-10 left-8 md:left-16 flex items-center gap-3 opacity-0 animate-fade-in-slow" style={{ animationDelay: "1s" }}>
          <div className="w-[1px] h-10 animate-float" style={{ background: "linear-gradient(to bottom, transparent, var(--gold-dim))" }} />
          <span className="text-xs tracking-widest" style={{ color: "var(--text-muted)", writingMode: "vertical-rl", transform: "rotate(180deg)" }}>
            SCROLL
          </span>
        </div>

        {/* Stats */}
        <div
          className="absolute bottom-10 right-8 md:right-16 hidden md:flex gap-10 opacity-0 animate-fade-in"
          style={{ animationDelay: "0.7s" }}
        >
          {[["7+", "лет опыта"], ["120+", "проектов"], ["94%", "повторных клиентов"]].map(([num, label]) => (
            <div key={num} className="text-right">
              <div className="font-display text-3xl font-light" style={{ color: "var(--gold)" }}>
                {num}
              </div>
              <div className="text-xs tracking-widest mt-1" style={{ color: "var(--text-muted)" }}>
                {label.toUpperCase()}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── SERVICES ── */}
      <section className="py-32 px-8 md:px-16" style={{ borderTop: "1px solid var(--border)" }}>
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-8 h-[1px]" style={{ background: "var(--gold)" }} />
            <span className="text-xs tracking-[0.3em]" style={{ color: "var(--gold)" }}>
              ЧТО МЫ ДЕЛАЕМ
            </span>
          </div>
          <h2
            className="font-display font-light mb-16"
            style={{ fontSize: "clamp(2rem, 4vw, 3.5rem)", color: "#f0ece4" }}
          >
            Полный цикл
            <br />
            <em className="italic" style={{ color: "var(--gold)" }}>цифрового продукта</em>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px" style={{ background: "var(--border)" }}>
            {services.map((s, i) => (
              <div
                key={i}
                className="p-8 group transition-colors duration-300 cursor-default"
                style={{ background: "var(--bg-card)" }}
                onMouseEnter={(e) => (e.currentTarget.style.background = "var(--bg-card-hover)")}
                onMouseLeave={(e) => (e.currentTarget.style.background = "var(--bg-card)")}
              >
                <div
                  className="w-10 h-10 flex items-center justify-center mb-6 transition-colors duration-300"
                  style={{ border: "1px solid var(--border)" }}
                >
                  <Icon name={s.icon as any} size={18} style={{ color: "var(--gold)" }} />
                </div>
                <h3 className="font-display text-xl font-light mb-3" style={{ color: "#f0ece4" }}>
                  {s.title}
                </h3>
                <p className="text-sm leading-relaxed" style={{ color: "var(--text-muted)" }}>
                  {s.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CASES ── */}
      <section className="py-32 px-8 md:px-16" style={{ borderTop: "1px solid var(--border)" }}>
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-between mb-16">
            <div>
              <div className="flex items-center gap-4 mb-4">
                <div className="w-8 h-[1px]" style={{ background: "var(--gold)" }} />
                <span className="text-xs tracking-[0.3em]" style={{ color: "var(--gold)" }}>
                  ИЗБРАННЫЕ РАБОТЫ
                </span>
              </div>
              <h2
                className="font-display font-light"
                style={{ fontSize: "clamp(2rem, 4vw, 3.5rem)", color: "#f0ece4" }}
              >
                Кейсы,
                <em className="italic" style={{ color: "var(--gold)" }}> которые говорят</em>
              </h2>
            </div>
            <a
              href="#"
              className="hidden md:flex items-center gap-2 text-sm tracking-widest transition-colors duration-300"
              style={{ color: "var(--text-muted)", letterSpacing: "0.15em" }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "var(--gold)")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "var(--text-muted)")}
            >
              ВСЕ РАБОТЫ
              <Icon name="ArrowRight" size={14} />
            </a>
          </div>

          <div className="space-y-px" style={{ background: "var(--border)" }}>
            {cases.map((c, i) => (
              <div
                key={i}
                className="group flex flex-col md:flex-row md:items-center justify-between p-8 md:p-10 cursor-pointer transition-colors duration-300"
                style={{ background: "var(--bg-card)" }}
                onMouseEnter={(e) => (e.currentTarget.style.background = "var(--bg-card-hover)")}
                onMouseLeave={(e) => (e.currentTarget.style.background = "var(--bg-card)")}
              >
                <div className="flex items-start md:items-center gap-6 md:gap-10">
                  <span className="text-xs tracking-widest mt-1" style={{ color: "var(--text-muted)" }}>
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <span
                      className="text-xs tracking-widest inline-block mb-2 px-2 py-0.5"
                      style={{ color: "var(--gold)", border: "1px solid var(--gold-dim)", letterSpacing: "0.2em" }}
                    >
                      {c.tag.toUpperCase()}
                    </span>
                    <h3 className="font-display text-2xl md:text-3xl font-light" style={{ color: "#f0ece4" }}>
                      {c.title}
                    </h3>
                  </div>
                </div>
                <div className="flex items-center gap-6 mt-4 md:mt-0 ml-10 md:ml-0">
                  <div className="text-right">
                    <div className="font-display text-lg font-light" style={{ color: "var(--gold)" }}>
                      {c.result}
                    </div>
                    <div className="text-xs tracking-widest" style={{ color: "var(--text-muted)" }}>
                      {c.year}
                    </div>
                  </div>
                  <Icon
                    name="ArrowUpRight"
                    size={20}
                    className="opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    style={{ color: "var(--gold)" }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ── */}
      <section className="py-32 px-8 md:px-16" style={{ borderTop: "1px solid var(--border)" }}>
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-8 h-[1px]" style={{ background: "var(--gold)" }} />
            <span className="text-xs tracking-[0.3em]" style={{ color: "var(--gold)" }}>
              ГОВОРЯТ КЛИЕНТЫ
            </span>
          </div>
          <h2
            className="font-display font-light mb-16"
            style={{ fontSize: "clamp(2rem, 4vw, 3.5rem)", color: "#f0ece4" }}
          >
            Их словами
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-px" style={{ background: "var(--border)" }}>
            {testimonials.map((t, i) => (
              <div key={i} className="p-8 md:p-10" style={{ background: "var(--bg-card)" }}>
                <div className="font-display text-4xl mb-6" style={{ color: "var(--gold)", lineHeight: 1 }}>
                  "
                </div>
                <p className="text-base leading-relaxed mb-8" style={{ color: "#c8c4bc" }}>
                  {t.text}
                </p>
                <div>
                  <div className="font-display text-lg font-light" style={{ color: "#f0ece4" }}>
                    {t.name}
                  </div>
                  <div className="text-xs tracking-widest mt-1" style={{ color: "var(--text-muted)", letterSpacing: "0.15em" }}>
                    {t.role.toUpperCase()}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section
        className="py-32 px-8 md:px-16 text-center relative overflow-hidden"
        style={{ borderTop: "1px solid var(--border)" }}
      >
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: "radial-gradient(ellipse at center, rgba(201,169,110,0.07) 0%, transparent 70%)",
          }}
        />
        <div className="relative max-w-3xl mx-auto">
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="w-8 h-[1px]" style={{ background: "var(--gold)" }} />
            <span className="text-xs tracking-[0.3em]" style={{ color: "var(--gold)" }}>
              НАЧНЁМ?
            </span>
            <div className="w-8 h-[1px]" style={{ background: "var(--gold)" }} />
          </div>
          <h2
            className="font-display font-light mb-6"
            style={{ fontSize: "clamp(2.5rem, 6vw, 5rem)", color: "#f0ece4", lineHeight: 1.1 }}
          >
            У вас есть идея —<br />
            <em className="italic" style={{ color: "var(--gold)" }}>мы её реализуем</em>
          </h2>
          <p className="text-base mb-12 font-light" style={{ color: "var(--text-muted)" }}>
            Расскажите о задаче. Первая консультация — бесплатно.
          </p>
          <button
            className="inline-flex items-center gap-3 px-10 py-5 text-sm tracking-widest transition-all duration-300 font-medium"
            style={{
              background: "var(--gold)",
              color: "#0e0d0b",
              letterSpacing: "0.2em",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "var(--gold-light)";
              (e.currentTarget.querySelector("svg") as HTMLElement | null)?.style.setProperty("transform", "translateX(4px)");
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "var(--gold)";
              (e.currentTarget.querySelector("svg") as HTMLElement | null)?.style.setProperty("transform", "translateX(0)");
            }}
          >
            ОБСУДИТЬ ПРОЕКТ
            <Icon name="ArrowRight" size={16} style={{ transition: "transform 0.3s" }} />
          </button>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer
        className="py-10 px-8 md:px-16 flex flex-col md:flex-row items-center justify-between gap-4"
        style={{ borderTop: "1px solid var(--border)" }}
      >
        <span className="font-display text-lg font-light tracking-widest" style={{ color: "var(--gold)" }}>
          STUDIO
        </span>
        <div className="flex items-center gap-6">
          {["Instagram", "Telegram", "Behance"].map((s) => (
            <a
              key={s}
              href="#"
              className="text-xs tracking-widest transition-colors duration-300"
              style={{ color: "var(--text-muted)", letterSpacing: "0.15em" }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "var(--gold)")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "var(--text-muted)")}
            >
              {s.toUpperCase()}
            </a>
          ))}
        </div>
        <span className="text-xs" style={{ color: "var(--text-muted)" }}>
          © 2024 Studio. Все права защищены.
        </span>
      </footer>
    </div>
  );
}
