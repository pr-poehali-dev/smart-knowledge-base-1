import { useState } from "react";
import Icon from "@/components/ui/icon";
import type { Module } from "@/lib/api";
import { cn } from "@/lib/utils";

interface Props {
  module: Module;
  onBack: () => void;
  onEdit: () => void;
}

const demoLessons = [
  { id: "l1", title: "Введение в тему", content: "## Введение\n\nДобро пожаловать в этот учебный модуль! В этом уроке мы рассмотрим основные понятия и цели обучения.\n\n### Что вы изучите\n- Ключевые концепции темы\n- Практические навыки применения\n- Методы оценки результатов\n\n### Важность темы\n\nПонимание данной темы критически важно для успешной работы в компании и достижения поставленных целей.", content_type: "text", sort_order: 0 },
  { id: "l2", title: "Основные принципы", content: "## Основные принципы\n\nВ этом уроке мы глубже погрузимся в ключевые принципы и методологию.\n\n### Принцип 1: Системность\nСистематический подход позволяет структурировать знания и применять их эффективно.\n\n### Принцип 2: Практика\nТеория должна подкрепляться практическими упражнениями и реальными кейсами.\n\n### Принцип 3: Обратная связь\nРегулярная обратная связь помогает корректировать курс и улучшать результаты.", content_type: "text", sort_order: 1 },
  { id: "l3", title: "Практические задания", content: "## Практические задания\n\n### Задание 1\nОпишите, как вы планируете применять полученные знания в своей работе.\n\n### Задание 2\nПриведите три примера ситуаций, где данные знания будут наиболее полезны.\n\n### Задание 3\nСоставьте план личного развития на основе материалов этого модуля.", content_type: "text", sort_order: 2 },
  { id: "l4", title: "Итоговый тест", content: "", content_type: "quiz", sort_order: 3 },
];

const demoQuiz = [
  { id: "q1", question: "Какой принцип является ключевым в данной теме?", options: ["Системный подход", "Интуитивный метод", "Случайный выбор"], correct: 0 },
  { id: "q2", question: "Как часто рекомендуется применять полученные знания?", options: ["Только при необходимости", "Регулярно на практике", "Никогда"], correct: 1 },
  { id: "q3", question: "Что помогает улучшить результаты обучения?", options: ["Игнорирование обратной связи", "Отказ от практики", "Регулярная обратная связь"], correct: 2 },
];

export default function ModuleViewer({ module: mod, onBack, onEdit }: Props) {
  const [activeLesson, setActiveLesson] = useState(0);
  const [completedLessons, setCompletedLessons] = useState<Set<number>>(new Set());
  const [quizAnswers, setQuizAnswers] = useState<Record<string, number>>({});
  const [quizSubmitted, setQuizSubmitted] = useState(false);
  const [showCongrats, setShowCongrats] = useState(false);

  const currentLesson = demoLessons[activeLesson];
  const progress = (completedLessons.size / demoLessons.length) * 100;

  const markComplete = () => {
    const newCompleted = new Set(completedLessons);
    newCompleted.add(activeLesson);
    setCompletedLessons(newCompleted);
    if (activeLesson < demoLessons.length - 1) {
      setActiveLesson(activeLesson + 1);
    } else if (newCompleted.size === demoLessons.length) {
      setShowCongrats(true);
    }
  };

  const handleQuizSubmit = () => {
    setQuizSubmitted(true);
    setTimeout(() => { markComplete(); setShowCongrats(true); }, 1500);
  };

  const correctCount = demoQuiz.filter((q, idx) => quizAnswers[`q${idx + 1}`] === q.correct).length;
  const score = Math.round((correctCount / demoQuiz.length) * 100);

  if (showCongrats) {
    return (
      <div className="p-6 flex items-center justify-center min-h-96">
        <div className="text-center max-w-md">
          <div className="w-20 h-20 bg-gradient-to-br from-amber-400 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-4">
            <Icon name="Trophy" className="w-10 h-10 text-white" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Модуль завершён!</h2>
          <p className="text-gray-500 mb-1">Результат теста: <span className="font-bold text-indigo-600">{score}%</span></p>
          <p className="text-gray-500 mb-6">+{mod.points_reward} баллов начислено</p>
          <button onClick={onBack} className="px-6 py-2.5 bg-indigo-600 text-white rounded-xl font-medium hover:bg-indigo-700">
            Назад к модулям
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-full">
      {/* Sidebar */}
      <div className="w-72 bg-white border-r border-gray-100 flex flex-col shrink-0">
        <div className="p-4 border-b border-gray-100">
          <button onClick={onBack} className="flex items-center gap-2 text-sm text-gray-500 hover:text-gray-700 mb-3">
            <Icon name="ArrowLeft" className="w-3.5 h-3.5" />
            Назад
          </button>
          <h3 className="font-semibold text-gray-900 text-sm line-clamp-2">{mod.title}</h3>
          <div className="flex items-center justify-between mt-2 text-xs text-gray-400">
            <span>{completedLessons.size}/{demoLessons.length} уроков</span>
            <span>{Math.round(progress)}%</span>
          </div>
          <div className="w-full bg-gray-100 rounded-full h-1.5 mt-2">
            <div className="h-1.5 bg-indigo-500 rounded-full transition-all" style={{ width: `${progress}%` }} />
          </div>
        </div>

        <nav className="flex-1 overflow-y-auto p-3 space-y-1">
          {demoLessons.map((lesson, idx) => (
            <button
              key={lesson.id}
              onClick={() => setActiveLesson(idx)}
              className={cn(
                "w-full flex items-center gap-3 p-3 rounded-xl text-left transition-all",
                activeLesson === idx ? "bg-indigo-50 text-indigo-700" : "hover:bg-gray-50 text-gray-700"
              )}
            >
              <div className={cn(
                "w-6 h-6 rounded-full flex items-center justify-center shrink-0",
                completedLessons.has(idx) ? "bg-emerald-500" :
                activeLesson === idx ? "bg-indigo-500" : "bg-gray-200"
              )}>
                {completedLessons.has(idx) ? (
                  <Icon name="Check" className="w-3 h-3 text-white" />
                ) : lesson.content_type === "quiz" ? (
                  <Icon name="HelpCircle" className="w-3 h-3 text-white" />
                ) : (
                  <span className="text-xs text-white font-medium">{idx + 1}</span>
                )}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs font-medium truncate">{lesson.title}</p>
                <p className="text-xs text-gray-400">
                  {lesson.content_type === "quiz" ? "Тест" : "Урок"}
                </p>
              </div>
            </button>
          ))}
        </nav>

        <div className="p-3 border-t border-gray-100">
          <button
            onClick={onEdit}
            className="w-full flex items-center justify-center gap-2 py-2 text-xs text-gray-500 hover:text-gray-700 hover:bg-gray-50 rounded-lg"
          >
            <Icon name="Edit2" className="w-3.5 h-3.5" />
            Редактировать
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto">
        <div className="max-w-2xl mx-auto p-6">
          <div className="flex items-center gap-2 text-xs text-gray-400 mb-4">
            <span className="bg-gray-100 px-2 py-1 rounded">
              {currentLesson.content_type === "quiz" ? "Тест" : `Урок ${activeLesson + 1}`}
            </span>
            <span>из {demoLessons.length}</span>
          </div>

          <h2 className="text-xl font-bold text-gray-900 mb-4">{currentLesson.title}</h2>

          {currentLesson.content_type !== "quiz" ? (
            <>
              <div className="prose prose-sm max-w-none text-gray-700">
                {currentLesson.content.split("\n").map((line, i) => {
                  if (line.startsWith("## ")) return <h2 key={i} className="text-lg font-bold text-gray-900 mt-4 mb-2">{line.slice(3)}</h2>;
                  if (line.startsWith("### ")) return <h3 key={i} className="text-base font-semibold text-gray-800 mt-3 mb-1.5">{line.slice(4)}</h3>;
                  if (line.startsWith("- ")) return <li key={i} className="text-sm text-gray-700 ml-4 mb-1">{line.slice(2)}</li>;
                  if (line === "") return <div key={i} className="h-2" />;
                  return <p key={i} className="text-sm text-gray-700 mb-2">{line}</p>;
                })}
              </div>
              <button
                onClick={markComplete}
                className="mt-6 w-full py-3 bg-indigo-600 text-white rounded-xl font-medium hover:bg-indigo-700 flex items-center justify-center gap-2"
              >
                {completedLessons.has(activeLesson) ? (
                  <><Icon name="CheckCircle2" className="w-4 h-4" /> Прочитано</>
                ) : (
                  <><Icon name="ChevronRight" className="w-4 h-4" /> Отметить как прочитанное</>
                )}
              </button>
            </>
          ) : (
            <div className="space-y-5">
              {!quizSubmitted ? (
                <>
                  {demoQuiz.map((q, qi) => (
                    <div key={q.id} className="bg-gray-50 rounded-xl p-4">
                      <p className="text-sm font-semibold text-gray-900 mb-3">{qi + 1}. {q.question}</p>
                      <div className="space-y-2">
                        {q.options.map((opt, oi) => (
                          <label
                            key={oi}
                            className={cn(
                              "flex items-center gap-3 p-3 rounded-lg cursor-pointer border transition-all",
                              quizAnswers[`q${qi + 1}`] === oi
                                ? "border-indigo-500 bg-indigo-50"
                                : "border-gray-200 hover:bg-white"
                            )}
                          >
                            <div className={cn(
                              "w-4 h-4 rounded-full border-2 shrink-0",
                              quizAnswers[`q${qi + 1}`] === oi ? "border-indigo-500 bg-indigo-500" : "border-gray-300"
                            )}>
                              {quizAnswers[`q${qi + 1}`] === oi && (
                                <div className="w-2 h-2 bg-white rounded-full mx-auto mt-0.5" />
                              )}
                            </div>
                            <input
                              type="radio"
                              name={`q${qi + 1}`}
                              value={oi}
                              className="hidden"
                              onChange={() => setQuizAnswers((prev) => ({ ...prev, [`q${qi + 1}`]: oi }))}
                            />
                            <span className="text-sm text-gray-700">{opt}</span>
                          </label>
                        ))}
                      </div>
                    </div>
                  ))}
                  <button
                    onClick={handleQuizSubmit}
                    disabled={Object.keys(quizAnswers).length < demoQuiz.length}
                    className="w-full py-3 bg-indigo-600 text-white rounded-xl font-medium hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Отправить ответы
                  </button>
                </>
              ) : (
                <div className="text-center py-6">
                  <div className={cn(
                    "w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-3",
                    score >= 70 ? "bg-emerald-100" : "bg-red-100"
                  )}>
                    <Icon name={score >= 70 ? "CheckCircle2" : "XCircle"} className={cn("w-8 h-8", score >= 70 ? "text-emerald-600" : "text-red-500")} />
                  </div>
                  <p className="text-2xl font-bold text-gray-900">{score}%</p>
                  <p className="text-gray-500 text-sm mt-1">{correctCount} из {demoQuiz.length} правильных ответов</p>
                  <p className={cn("text-sm font-medium mt-2", score >= 70 ? "text-emerald-600" : "text-red-500")}>
                    {score >= 70 ? "Тест пройден!" : "Тест не пройден"}
                  </p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
