import { useState } from "react";
import Icon from "@/components/ui/icon";
import type { Category, Module } from "@/lib/api";
import { cn } from "@/lib/utils";

interface Props {
  module?: Module;
  categories: Category[];
  onBack: () => void;
  onSaved: (module: Module) => void;
}

interface LessonDraft {
  id: string;
  title: string;
  content: string;
  content_type: string;
  video_url: string;
}

export default function ModuleEditor({ module, categories, onBack, onSaved }: Props) {
  const [title, setTitle] = useState(module?.title || "");
  const [description, setDescription] = useState(module?.description || "");
  const [categoryId, setCategoryId] = useState(module?.category_id || "");
  const [status, setStatus] = useState(module?.status || "draft");
  const [pointsReward, setPointsReward] = useState(module?.points_reward || 10);
  const [estimatedDuration, setEstimatedDuration] = useState(module?.estimated_duration || 30);
  const [isMandatory, setIsMandatory] = useState(module?.is_mandatory || false);
  const [lessons, setLessons] = useState<LessonDraft[]>([]);
  const [activeTab, setActiveTab] = useState<"info" | "lessons">("info");
  const [editingLesson, setEditingLesson] = useState<string | null>(null);

  const handleSave = () => {
    const saved: Module = {
      id: module?.id || `manual-${Date.now()}`,
      company_id: "demo",
      category_id: categoryId || null,
      title,
      description,
      status: status as "draft" | "published" | "archived",
      is_ai_generated: false,
      ai_topic: null,
      estimated_duration: estimatedDuration,
      points_reward: pointsReward,
      is_mandatory: isMandatory,
      lesson_count: lessons.length,
      completion_count: module?.completion_count || 0,
      category_name: categories.find((c) => c.id === categoryId)?.name,
      category_color: categories.find((c) => c.id === categoryId)?.color,
      created_at: module?.created_at || new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };
    onSaved(saved);
  };

  const addLesson = () => {
    const id = `lesson-${Date.now()}`;
    setLessons((prev) => [...prev, { id, title: `Урок ${prev.length + 1}`, content: "", content_type: "text", video_url: "" }]);
    setEditingLesson(id);
  };

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <div className="flex items-center gap-3 mb-6">
        <button onClick={onBack} className="p-2 hover:bg-gray-100 rounded-lg text-gray-500">
          <Icon name="ArrowLeft" className="w-4 h-4" />
        </button>
        <div className="flex-1">
          <h2 className="text-lg font-semibold text-gray-900">
            {module ? "Редактировать модуль" : "Создать модуль"}
          </h2>
          <p className="text-sm text-gray-500">Заполните информацию и добавьте уроки</p>
        </div>
        <button
          onClick={handleSave}
          disabled={!title.trim()}
          className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm font-medium hover:bg-indigo-700 disabled:opacity-50"
        >
          <Icon name="Save" className="w-4 h-4" />
          Сохранить
        </button>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 bg-gray-100 rounded-xl p-1 mb-5">
        {(["info", "lessons"] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={cn(
              "flex-1 py-2 text-sm font-medium rounded-lg transition-all",
              activeTab === tab ? "bg-white text-gray-900 shadow-sm" : "text-gray-500 hover:text-gray-700"
            )}
          >
            {tab === "info" ? "Информация" : `Уроки (${lessons.length})`}
          </button>
        ))}
      </div>

      {activeTab === "info" && (
        <div className="bg-white rounded-2xl border border-gray-100 p-6 space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">
              Название <span className="text-red-500">*</span>
            </label>
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Название учебного модуля"
              className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Описание</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Краткое описание модуля и его цели"
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
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Статус</label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className="w-full px-3 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                <option value="draft">Черновик</option>
                <option value="published">Опубликован</option>
                <option value="archived">Архив</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Баллы за прохождение</label>
              <input
                type="number"
                min={0}
                max={100}
                value={pointsReward}
                onChange={(e) => setPointsReward(Number(e.target.value))}
                className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Длительность (мин)</label>
              <input
                type="number"
                min={5}
                max={480}
                value={estimatedDuration}
                onChange={(e) => setEstimatedDuration(Number(e.target.value))}
                className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
          </div>

          <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
            <button
              onClick={() => setIsMandatory(!isMandatory)}
              className={cn(
                "w-10 h-6 rounded-full transition-all relative",
                isMandatory ? "bg-indigo-600" : "bg-gray-300"
              )}
            >
              <div className={cn(
                "w-4 h-4 bg-white rounded-full absolute top-1 transition-all",
                isMandatory ? "left-5" : "left-1"
              )} />
            </button>
            <div>
              <p className="text-sm font-medium text-gray-700">Обязательный модуль</p>
              <p className="text-xs text-gray-400">Все сотрудники должны пройти этот модуль</p>
            </div>
          </div>
        </div>
      )}

      {activeTab === "lessons" && (
        <div className="space-y-3">
          {lessons.length === 0 && (
            <div className="bg-white rounded-2xl border border-dashed border-gray-200 p-8 text-center">
              <Icon name="BookOpen" className="w-8 h-8 text-gray-300 mx-auto mb-2" />
              <p className="text-sm text-gray-500 mb-3">Уроки ещё не добавлены</p>
              <button
                onClick={addLesson}
                className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white text-sm rounded-lg"
              >
                <Icon name="Plus" className="w-4 h-4" />
                Добавить урок
              </button>
            </div>
          )}

          {lessons.map((lesson, idx) => (
            <div key={lesson.id} className="bg-white rounded-xl border border-gray-100">
              <div
                className="flex items-center gap-3 p-4 cursor-pointer"
                onClick={() => setEditingLesson(editingLesson === lesson.id ? null : lesson.id)}
              >
                <div className="w-7 h-7 bg-indigo-100 text-indigo-700 rounded-lg flex items-center justify-center text-xs font-bold shrink-0">
                  {idx + 1}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 truncate">{lesson.title}</p>
                  <p className="text-xs text-gray-400">
                    {lesson.content_type === "video" ? "Видео" : lesson.content_type === "quiz" ? "Тест" : "Текстовый урок"}
                  </p>
                </div>
                <button
                  onClick={(e) => { e.stopPropagation(); setLessons((prev) => prev.filter((l) => l.id !== lesson.id)); }}
                  className="p-1.5 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg"
                >
                  <Icon name="Trash2" className="w-3.5 h-3.5" />
                </button>
                <Icon name={editingLesson === lesson.id ? "ChevronUp" : "ChevronDown"} className="w-4 h-4 text-gray-400" />
              </div>

              {editingLesson === lesson.id && (
                <div className="px-4 pb-4 space-y-3 border-t border-gray-50 pt-3">
                  <input
                    value={lesson.title}
                    onChange={(e) => setLessons((prev) => prev.map((l) => l.id === lesson.id ? { ...l, title: e.target.value } : l))}
                    placeholder="Название урока"
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                  <select
                    value={lesson.content_type}
                    onChange={(e) => setLessons((prev) => prev.map((l) => l.id === lesson.id ? { ...l, content_type: e.target.value } : l))}
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  >
                    <option value="text">Текстовый материал</option>
                    <option value="video">Видео</option>
                    <option value="quiz">Тест</option>
                    <option value="pdf">PDF документ</option>
                  </select>
                  {lesson.content_type === "video" && (
                    <input
                      value={lesson.video_url}
                      onChange={(e) => setLessons((prev) => prev.map((l) => l.id === lesson.id ? { ...l, video_url: e.target.value } : l))}
                      placeholder="URL видео (YouTube, Vimeo...)"
                      className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                  )}
                  {lesson.content_type !== "video" && (
                    <textarea
                      value={lesson.content}
                      onChange={(e) => setLessons((prev) => prev.map((l) => l.id === lesson.id ? { ...l, content: e.target.value } : l))}
                      placeholder="Содержание урока (поддерживается Markdown)..."
                      rows={6}
                      className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none font-mono"
                    />
                  )}
                </div>
              )}
            </div>
          ))}

          {lessons.length > 0 && (
            <button
              onClick={addLesson}
              className="w-full py-3 border border-dashed border-gray-200 text-gray-500 rounded-xl text-sm hover:border-indigo-300 hover:text-indigo-600 transition-colors flex items-center justify-center gap-2"
            >
              <Icon name="Plus" className="w-4 h-4" />
              Добавить урок
            </button>
          )}
        </div>
      )}
    </div>
  );
}
