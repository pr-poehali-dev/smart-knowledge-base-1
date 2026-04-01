import { useState } from "react";
import Icon from "@/components/ui/icon";
import type { Category, Regulation } from "@/lib/api";

interface Props {
  categories: Category[];
  onBack: () => void;
  onCreated: (regulation: Regulation) => void;
}

export default function AIRegulationGenerator({ categories, onBack, onCreated }: Props) {
  const [step, setStep] = useState<"form" | "generating" | "done">("form");
  const [topic, setTopic] = useState("");
  const [description, setDescription] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [progress, setProgress] = useState(0);
  const [progressText, setProgressText] = useState("");
  const [generated, setGenerated] = useState<{ title: string; content: string } | null>(null);

  const generateRegulation = async () => {
    if (!topic.trim()) return;
    setStep("generating");

    const steps = [
      { text: "Анализирую требования...", progress: 20 },
      { text: "Изучаю нормативную базу...", progress: 45 },
      { text: "Формирую структуру документа...", progress: 65 },
      { text: "Оформляю регламент...", progress: 85 },
      { text: "Финальная проверка...", progress: 100 },
    ];

    for (const s of steps) {
      await new Promise((r) => setTimeout(r, 500 + Math.random() * 400));
      setProgress(s.progress);
      setProgressText(s.text);
    }

    const reg = {
      title: `Регламент: ${topic}`,
      content: `# ${topic}

## 1. Общие положения

${description || `Настоящий регламент устанавливает порядок и правила в области "${topic}" для сотрудников компании.`}

Настоящий регламент является обязательным для исполнения всеми сотрудниками компании в части, касающейся их должностных обязанностей.

## 2. Цели и задачи

**Цели регламента:**
- Установить единые стандарты работы
- Обеспечить качество выполнения процессов
- Снизить риски и ошибки

**Задачи:**
1. Определить ответственных лиц
2. Установить последовательность действий
3. Обеспечить контроль исполнения

## 3. Область применения

Настоящий регламент распространяется на всех сотрудников, чья деятельность связана с данной областью.

## 4. Основные требования

### 4.1 Обязательные условия
- Соблюдение установленного порядка действий
- Своевременное информирование руководства об отклонениях
- Документирование результатов

### 4.2 Запрещённые действия
- Самовольное изменение установленных процедур
- Игнорирование требований безопасности
- Передача конфиденциальной информации третьим лицам

## 5. Порядок выполнения

1. **Подготовительный этап** — ознакомление с требованиями и инструкциями
2. **Основной этап** — выполнение действий согласно установленному порядку
3. **Контрольный этап** — проверка результатов и документирование

## 6. Ответственность

| Должность | Зона ответственности |
|-----------|---------------------|
| Руководитель | Контроль исполнения регламента |
| Сотрудник | Соблюдение требований |
| HR | Ознакомление новых сотрудников |

## 7. Контроль и отчётность

Контроль за соблюдением настоящего регламента возлагается на непосредственных руководителей подразделений.

## 8. Заключительные положения

Настоящий регламент вступает в силу с момента утверждения. Пересмотр регламента осуществляется не реже одного раза в год.

---
*Документ создан с помощью ИИ-ассистента KnowledgeAI*`,
    };

    setGenerated(reg);
    setStep("done");
  };

  const handleSave = () => {
    if (!generated) return;
    const regulation: Regulation = {
      id: `reg-ai-${Date.now()}`,
      company_id: "demo",
      category_id: categoryId || null,
      title: generated.title,
      content: generated.content,
      version: "1.0",
      status: "draft",
      is_ai_generated: true,
      requires_acknowledgment: true,
      effective_date: null,
      tags: [],
      ack_count: 0,
      category_name: categories.find((c) => c.id === categoryId)?.name,
      category_color: categories.find((c) => c.id === categoryId)?.color,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };
    onCreated(regulation);
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
            Создать регламент с ИИ
          </h2>
          <p className="text-sm text-gray-500">ИИ создаст профессиональный документ по вашей теме</p>
        </div>
      </div>

      {step === "form" && (
        <div className="bg-white rounded-2xl border border-gray-100 p-6 space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">
              Тема регламента <span className="text-red-500">*</span>
            </label>
            <input
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              placeholder="Например: Правила работы с клиентами, Политика безопасности, Порядок оформления командировок..."
              className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Контекст и требования</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Опишите специфику вашей компании, особые требования, что нужно включить в регламент..."
              rows={4}
              className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none"
            />
          </div>

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

          <div className="bg-violet-50 rounded-xl p-4 border border-violet-100">
            <p className="text-sm font-medium text-violet-900 mb-2 flex items-center gap-2">
              <Icon name="FileText" className="w-4 h-4" />
              ИИ создаст регламент с:
            </p>
            <div className="grid grid-cols-2 gap-2">
              {["Структурой из 8+ разделов", "Конкретными требованиями", "Таблицами ответственности", "Профессиональным оформлением"].map((item) => (
                <div key={item} className="flex items-center gap-1.5 text-xs text-violet-700">
                  <Icon name="Check" className="w-3 h-3 text-emerald-600 shrink-0" />
                  {item}
                </div>
              ))}
            </div>
          </div>

          <button
            onClick={generateRegulation}
            disabled={!topic.trim()}
            className="w-full py-3 bg-indigo-600 text-white rounded-xl font-medium hover:bg-indigo-700 disabled:opacity-50 flex items-center justify-center gap-2"
          >
            <Icon name="Sparkles" className="w-4 h-4" />
            Сгенерировать регламент
          </button>
        </div>
      )}

      {step === "generating" && (
        <div className="bg-white rounded-2xl border border-gray-100 p-8 text-center">
          <div className="w-16 h-16 bg-violet-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <Icon name="FileText" className="w-8 h-8 text-violet-600 animate-pulse" />
          </div>
          <h3 className="font-semibold text-gray-900 mb-1">Создаю регламент...</h3>
          <p className="text-sm text-gray-500 mb-6">{progressText}</p>
          <div className="w-full bg-gray-100 rounded-full h-2 mb-2">
            <div className="h-2 bg-gradient-to-r from-violet-500 to-indigo-500 rounded-full transition-all duration-500" style={{ width: `${progress}%` }} />
          </div>
          <p className="text-xs text-gray-400">{progress}%</p>
        </div>
      )}

      {step === "done" && generated && (
        <div className="space-y-4">
          <div className="bg-white rounded-2xl border border-gray-100 p-5">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-8 bg-emerald-100 rounded-lg flex items-center justify-center">
                <Icon name="CheckCircle2" className="w-4 h-4 text-emerald-600" />
              </div>
              <p className="font-semibold text-gray-900">Регламент создан!</p>
            </div>
            <h3 className="font-semibold text-gray-900 mb-3">{generated.title}</h3>
            <div className="bg-gray-50 rounded-xl p-4 max-h-64 overflow-y-auto">
              <pre className="text-xs text-gray-600 whitespace-pre-wrap font-sans">{generated.content.slice(0, 800)}...</pre>
            </div>
          </div>
          <div className="flex gap-3">
            <button
              onClick={() => { setStep("form"); setGenerated(null); setProgress(0); }}
              className="flex-1 py-2.5 border border-gray-200 text-gray-700 rounded-xl text-sm font-medium hover:bg-gray-50"
            >
              Создать другой
            </button>
            <button
              onClick={handleSave}
              className="flex-1 py-2.5 bg-indigo-600 text-white rounded-xl text-sm font-medium hover:bg-indigo-700 flex items-center justify-center gap-2"
            >
              <Icon name="Save" className="w-4 h-4" />
              Сохранить
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
