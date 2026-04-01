import { useState } from "react";
import Icon from "@/components/ui/icon";
import type { Category, Regulation } from "@/lib/api";

interface Props {
  regulation?: Regulation;
  categories: Category[];
  onBack: () => void;
  onSaved: (regulation: Regulation) => void;
}

export default function RegulationEditor({ regulation, categories, onBack, onSaved }: Props) {
  const [title, setTitle] = useState(regulation?.title || "");
  const [content, setContent] = useState(regulation?.content || "");
  const [categoryId, setCategoryId] = useState(regulation?.category_id || "");
  const [status, setStatus] = useState(regulation?.status || "draft");
  const [requiresAck, setRequiresAck] = useState(regulation?.requires_acknowledgment !== false);
  const [version, setVersion] = useState(regulation?.version || "1.0");
  const [activeTab, setActiveTab] = useState<"edit" | "preview">("edit");

  const handleSave = () => {
    const saved: Regulation = {
      id: regulation?.id || `reg-${Date.now()}`,
      company_id: "demo",
      category_id: categoryId || null,
      title,
      content,
      version,
      status: status as "draft" | "published" | "archived",
      is_ai_generated: false,
      requires_acknowledgment: requiresAck,
      effective_date: null,
      tags: [],
      ack_count: regulation?.ack_count || 0,
      category_name: categories.find((c) => c.id === categoryId)?.name,
      category_color: categories.find((c) => c.id === categoryId)?.color,
      created_at: regulation?.created_at || new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };
    onSaved(saved);
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="flex items-center gap-3 mb-6">
        <button onClick={onBack} className="p-2 hover:bg-gray-100 rounded-lg text-gray-500">
          <Icon name="ArrowLeft" className="w-4 h-4" />
        </button>
        <div className="flex-1">
          <h2 className="text-lg font-semibold text-gray-900">
            {regulation ? "Редактировать регламент" : "Новый регламент"}
          </h2>
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

      <div className="grid grid-cols-3 gap-5">
        {/* Main editor */}
        <div className="col-span-2 space-y-4">
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Название регламента *"
            className="w-full px-4 py-3 border border-gray-200 rounded-xl text-base font-medium focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />

          {/* Editor/Preview tabs */}
          <div className="bg-white rounded-xl border border-gray-100 overflow-hidden">
            <div className="flex border-b border-gray-100">
              <button
                onClick={() => setActiveTab("edit")}
                className={`px-4 py-2.5 text-sm font-medium transition-colors ${activeTab === "edit" ? "border-b-2 border-indigo-600 text-indigo-600" : "text-gray-500 hover:text-gray-700"}`}
              >
                <span className="flex items-center gap-1.5"><Icon name="Edit2" className="w-3.5 h-3.5" /> Редактор</span>
              </button>
              <button
                onClick={() => setActiveTab("preview")}
                className={`px-4 py-2.5 text-sm font-medium transition-colors ${activeTab === "preview" ? "border-b-2 border-indigo-600 text-indigo-600" : "text-gray-500 hover:text-gray-700"}`}
              >
                <span className="flex items-center gap-1.5"><Icon name="Eye" className="w-3.5 h-3.5" /> Предпросмотр</span>
              </button>
              <div className="ml-auto px-3 py-2 text-xs text-gray-400 flex items-center gap-1">
                <Icon name="Code2" className="w-3 h-3" />
                Markdown
              </div>
            </div>

            {activeTab === "edit" ? (
              <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="## Введение&#10;&#10;Текст регламента в формате Markdown...&#10;&#10;### Раздел 1&#10;- Пункт 1&#10;- Пункт 2"
                rows={20}
                className="w-full p-4 text-sm font-mono focus:outline-none resize-none"
              />
            ) : (
              <div className="p-4 min-h-96">
                {content ? (
                  <div className="prose prose-sm max-w-none text-gray-700">
                    {content.split("\n").map((line, i) => {
                      if (line.startsWith("# ")) return <h1 key={i} className="text-xl font-bold text-gray-900 mt-4 mb-2">{line.slice(2)}</h1>;
                      if (line.startsWith("## ")) return <h2 key={i} className="text-lg font-bold text-gray-900 mt-4 mb-2">{line.slice(3)}</h2>;
                      if (line.startsWith("### ")) return <h3 key={i} className="text-base font-semibold text-gray-800 mt-3 mb-1">{line.slice(4)}</h3>;
                      if (line.startsWith("- ")) return <li key={i} className="text-sm text-gray-700 ml-4 mb-0.5">{line.slice(2)}</li>;
                      if (line.startsWith("**") && line.endsWith("**")) return <p key={i} className="text-sm font-bold text-gray-900">{line.slice(2, -2)}</p>;
                      if (line === "") return <div key={i} className="h-2" />;
                      if (line.startsWith("---")) return <hr key={i} className="my-3 border-gray-200" />;
                      return <p key={i} className="text-sm text-gray-700 mb-1">{line}</p>;
                    })}
                  </div>
                ) : (
                  <p className="text-gray-400 text-sm">Предпросмотр появится после ввода текста</p>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Settings panel */}
        <div className="space-y-4">
          <div className="bg-white rounded-xl border border-gray-100 p-4 space-y-4">
            <h3 className="font-medium text-gray-900 text-sm">Настройки</h3>

            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">Статус</label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                <option value="draft">Черновик</option>
                <option value="published">Опубликован</option>
                <option value="archived">Архив</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">Категория</label>
              <select
                value={categoryId}
                onChange={(e) => setCategoryId(e.target.value)}
                className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                <option value="">Без категории</option>
                {categories.map((cat) => (
                  <option key={cat.id} value={cat.id}>{cat.name}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">Версия</label>
              <input
                value={version}
                onChange={(e) => setVersion(e.target.value)}
                className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            <div className="flex items-center gap-2.5 pt-1">
              <button
                onClick={() => setRequiresAck(!requiresAck)}
                className={`w-9 h-5 rounded-full relative transition-colors ${requiresAck ? "bg-indigo-600" : "bg-gray-300"}`}
              >
                <div className={`w-3.5 h-3.5 bg-white rounded-full absolute top-0.5 transition-all ${requiresAck ? "left-4" : "left-0.5"}`} />
              </button>
              <div>
                <p className="text-xs font-medium text-gray-700">Требует ознакомления</p>
                <p className="text-xs text-gray-400">Сотрудники должны подтвердить</p>
              </div>
            </div>
          </div>

          <div className="bg-blue-50 rounded-xl p-4 border border-blue-100">
            <p className="text-xs font-medium text-blue-800 mb-1 flex items-center gap-1">
              <Icon name="Info" className="w-3 h-3" />
              Markdown подсказки
            </p>
            <div className="space-y-1 text-xs text-blue-700 font-mono">
              <p># Заголовок 1</p>
              <p>## Заголовок 2</p>
              <p>**жирный**</p>
              <p>- список</p>
              <p>---  разделитель</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
