import { useState } from "react";
import Icon from "@/components/ui/icon";
import type { Category, Module } from "@/lib/api";
import { cn } from "@/lib/utils";

interface Props {
  categories: Category[];
  onBack: () => void;
  onCreated: (module: Module) => void;
}

export default function AIModuleGenerator({ categories, onBack, onCreated }: Props) {
  const [step, setStep] = useState<"form" | "generating" | "done">("form");
  const [topic, setTopic] = useState("");
  const [description, setDescription] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [lessonsCount, setLessonsCount] = useState(5);
  const [generatedModule, setGeneratedModule] = useState<{title: string; description: string; lessons: GeneratedLesson[]} | null>(null);
  const [progress, setProgress] = useState(0);
  const [progressText, setProgressText] = useState("");

  interface GeneratedLesson {
    title: string;
    type: string;
    content: string;
    quiz?: {question: string; options: {text: string; is_correct: boolean}[]; explanation: string}[];
  }

  const simulateGeneration = async () => {
    if (!topic.trim()) return;
    setStep("generating");
    setProgress(0);

    const steps = [
      { text: "Анализирую тему...", progress: 15 },
      { text: "Разрабатываю структуру модуля...", progress: 30 },
      { text: "Создаю учебные материалы...", progress: 55 },
      { text: "Генерирую тесты и вопросы...", progress: 75 },
      { text: "Оформляю модуль...", progress: 90 },
      { text: "Готово!", progress: 100 },
    ];

    for (const s of steps) {
      await new Promise((r) => setTimeout(r, 600 + Math.random() * 400));
      setProgress(s.progress);
      setProgressText(s.text);
    }

    // Generate demo module
    const module = {
      title: `Обучающий модуль: ${topic}`,
      description: description || `Комплексный учебный модуль по теме "${topic}". Охватывает ключевые аспекты, практические задания и проверочные тесты.`,
      lessons: Array.from({ length: lessonsCount }, (_, i) => ({
        title: i === 0 ? `Введение в "${topic}"` :
               i === lessonsCount - 1 ? "Практика и закрепление" :
               `Урок ${i + 1}: ${["Основные понятия", "Ключевые принципы", "Практические методы", "Случаи и примеры"][i % 4]}`,
        type: i === lessonsCount - 1 ? "quiz" : "text",
        content: `## ${i === 0 ? "Введение" : `Урок ${i + 1}`}\n\nДанный урок посвящён изучению темы **"${topic}"**.\n\n### Цели урока\n- Понять ключевые концепции\n- Освоить практические навыки\n- Подготовиться к тесту\n\n### Основной материал\n\nЗдесь расположен детальный учебный материал по теме. Внимательно изучите все разделы перед прохождением теста.\n\n### Выводы\nПосле изучения этого урока вы сможете применять полученные знания на практике.`,
        quiz: [
          {
            question: `Что является ключевым принципом в теме "${topic}"?`,
            options: [
              { text: "Системный подход и практика", is_correct: true },
              { text: "Только теоретические знания", is_correct: false },
              { text: "Игнорирование стандартов", is_correct: false },
            ],
            explanation: "Правильно! Системный подход и регулярная практика — основа успеха в любой области.",
          },
        ],
      })),
    };

    setGeneratedModule(module);
    setStep("done");
  };

  const handleSave = () => {
    if (!generatedModule) return;
    const newModule: Module = {
      id: `generated-${Date.now()}`,
      company_id: "demo",
      category_id: categoryId || null,
      title: generatedModule.title,
      description: generatedModule.description,
      status: "draft",
      is_ai_generated: true,
      ai_topic: topic,
      estimated_duration: lessonsCount * 10,
      points_reward: 20,
      is_mandatory: false,
      lesson_count: generatedModule.lessons.length,
      completion_count: 0,
      category_name: categories.find((c) => c.id === categoryId)?.name,
      category_color: categories.find((c) => c.id === categoryId)?.color,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };
    onCreated(newModule);
  };

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <div className="flex items-center gap-3 mb-6">
        <button onClick={onBack} className="p-2 hover:bg-gray-100 rounded-lg text-gray-500">
          <Icon name="ArrowLeft" className="w-4 h-4" />
        </button>
        <div>
          <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
            <Icon name="Sparkles" className="w-5 h-5 text-violet-600" />
            Создать модуль с ИИ
          </h2>
          <p className="text-sm text-gray-500">ИИ-ассистент автоматически создаст уроки, материалы и тесты</p>
        </div>
      </div>

      {step === "form" && (
        <div className="bg-white rounded-2xl border border-gray-100 p-6 space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">
              Тема обучения <span className="text-red-500">*</span>
            </label>
            <input
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              placeholder="Например: Техники активных продаж, Работа в CRM, Онбординг нового сотрудника..."
              className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Дополнительный контекст</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Расскажите подробнее о специфике вашей компании, целевой аудитории, особых требованиях..."
              rows={3}
              className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Категория</label>
              <select
                value={categoryId}
                onChange={(e) => setCategoryId(e.target.value)}
                className="w-full px-3 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                <option value="">Без категории</option>
                {categories.map((cat) => (
                  <option key={cat.id} value={cat.id}>{cat.name}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                Количество уроков: <span className="text-indigo-600 font-bold">{lessonsCount}</span>
              </label>
              <input
                type="range"
                min={3}
                max={10}
                value={lessonsCount}
                onChange={(e) => setLessonsCount(Number(e.target.value))}
                className="w-full mt-2 accent-indigo-600"
              />
              <div className="flex justify-between text-xs text-gray-400 mt-1">
                <span>3</span><span>10</span>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-r from-violet-50 to-indigo-50 rounded-xl p-4 border border-indigo-100">
            <p className="text-sm font-medium text-indigo-900 mb-2 flex items-center gap-2">
              <Icon name="Wand2" className="w-4 h-4 text-violet-600" />
              ИИ создаст для вас:
            </p>
            <div className="grid grid-cols-2 gap-2">
              {[
                `${lessonsCount} полных уроков с материалами`,
                "Тесты и вопросы к каждому уроку",
                "Структурированный контент в markdown",
                "Объяснения правильных ответов",
              ].map((item) => (
                <div key={item} className="flex items-center gap-1.5 text-xs text-indigo-700">
                  <Icon name="Check" className="w-3 h-3 text-emerald-600 shrink-0" />
                  {item}
                </div>
              ))}
            </div>
          </div>

          <button
            onClick={simulateGeneration}
            disabled={!topic.trim()}
            className="w-full py-3 bg-indigo-600 text-white rounded-xl font-medium hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-2"
          >
            <Icon name="Sparkles" className="w-4 h-4" />
            Сгенерировать модуль
          </button>
        </div>
      )}

      {step === "generating" && (
        <div className="bg-white rounded-2xl border border-gray-100 p-8 text-center">
          <div className="w-16 h-16 bg-violet-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <Icon name="Brain" className="w-8 h-8 text-violet-600 animate-pulse" />
          </div>
          <h3 className="font-semibold text-gray-900 mb-1">ИИ создаёт модуль...</h3>
          <p className="text-sm text-gray-500 mb-6">{progressText}</p>
          <div className="w-full bg-gray-100 rounded-full h-2 mb-2">
            <div
              className="h-2 bg-gradient-to-r from-indigo-500 to-violet-500 rounded-full transition-all duration-500"
              style={{ width: `${progress}%` }}
            />
          </div>
          <p className="text-xs text-gray-400">{progress}%</p>
        </div>
      )}

      {step === "done" && generatedModule && (
        <div className="space-y-4">
          <div className="bg-white rounded-2xl border border-gray-100 p-5">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-emerald-100 rounded-lg flex items-center justify-center">
                <Icon name="CheckCircle2" className="w-4 h-4 text-emerald-600" />
              </div>
              <div>
                <p className="font-semibold text-gray-900">Модуль создан!</p>
                <p className="text-xs text-gray-500">{generatedModule.lessons.length} уроков с тестами</p>
              </div>
            </div>

            <h3 className="font-semibold text-gray-900 mb-1">{generatedModule.title}</h3>
            <p className="text-sm text-gray-500 mb-4">{generatedModule.description}</p>

            <div className="space-y-2">
              {generatedModule.lessons.map((lesson, idx) => (
                <div key={idx} className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
                  <div className={cn(
                    "w-7 h-7 rounded-lg flex items-center justify-center shrink-0 text-xs font-bold",
                    lesson.type === "quiz" ? "bg-amber-100 text-amber-700" : "bg-indigo-100 text-indigo-700"
                  )}>
                    {idx + 1}
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-800">{lesson.title}</p>
                    <p className="text-xs text-gray-400">
                      {lesson.type === "quiz" ? "Тест" : "Урок"} · {lesson.quiz?.length || 0} вопросов
                    </p>
                  </div>
                  <Icon name={lesson.type === "quiz" ? "HelpCircle" : "BookOpen"} className="w-4 h-4 text-gray-300" />
                </div>
              ))}
            </div>
          </div>

          <div className="flex gap-3">
            <button
              onClick={() => { setStep("form"); setGeneratedModule(null); setProgress(0); }}
              className="flex-1 py-2.5 border border-gray-200 text-gray-700 rounded-xl text-sm font-medium hover:bg-gray-50"
            >
              Создать новый
            </button>
            <button
              onClick={handleSave}
              className="flex-1 py-2.5 bg-indigo-600 text-white rounded-xl text-sm font-medium hover:bg-indigo-700 flex items-center justify-center gap-2"
            >
              <Icon name="Save" className="w-4 h-4" />
              Сохранить модуль
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
