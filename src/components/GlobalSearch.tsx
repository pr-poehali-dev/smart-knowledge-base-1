import { useState, useEffect, useRef } from "react";
import Icon from "@/components/ui/icon";
import { cn } from "@/lib/utils";
import { mockModules, mockRegulations, mockCategories } from "@/lib/mockData";

interface GlobalSearchProps {
  onClose: () => void;
  onNavigate: (section: string) => void;
}

interface SearchResult {
  id: string;
  type: "module" | "regulation" | "category";
  title: string;
  subtitle?: string;
  section: string;
  color?: string;
  icon: string;
}

function buildSearchIndex(): SearchResult[] {
  const results: SearchResult[] = [];

  mockModules.forEach((m) => {
    results.push({
      id: m.id,
      type: "module",
      title: m.title,
      subtitle: `${m.category_name} · ${m.estimated_duration} мин · ${m.lesson_count} уроков`,
      section: "modules",
      color: m.category_color,
      icon: "BookOpen",
    });
  });

  mockRegulations.forEach((r) => {
    results.push({
      id: r.id,
      type: "regulation",
      title: r.title,
      subtitle: `${r.category_name} · v${r.version} · ${r.status === "published" ? "Опубликован" : "Черновик"}`,
      section: "regulations",
      color: r.category_color,
      icon: "FileText",
    });
  });

  mockCategories.forEach((c) => {
    results.push({
      id: c.id,
      type: "category",
      title: c.name,
      subtitle: c.description,
      section: "modules",
      color: c.color,
      icon: c.icon || "FolderOpen",
    });
  });

  return results;
}

const searchIndex = buildSearchIndex();

const typeLabels: Record<SearchResult["type"], string> = {
  module: "Модуль",
  regulation: "Регламент",
  category: "Категория",
};

const typeBg: Record<SearchResult["type"], string> = {
  module: "bg-indigo-50 text-indigo-600",
  regulation: "bg-amber-50 text-amber-600",
  category: "bg-emerald-50 text-emerald-600",
};

export default function GlobalSearch({ onClose, onNavigate }: GlobalSearchProps) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchResult[]>([]);
  const [activeIdx, setActiveIdx] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      setActiveIdx(0);
      return;
    }
    const q = query.toLowerCase();
    const found = searchIndex.filter(
      (r) =>
        r.title.toLowerCase().includes(q) ||
        (r.subtitle && r.subtitle.toLowerCase().includes(q))
    );
    setResults(found.slice(0, 10));
    setActiveIdx(0);
  }, [query]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") {
      onClose();
      return;
    }
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActiveIdx((i) => Math.min(i + 1, results.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActiveIdx((i) => Math.max(i - 1, 0));
    } else if (e.key === "Enter" && results[activeIdx]) {
      onNavigate(results[activeIdx].section);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4"
      onClick={onClose}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" />

      {/* Search modal */}
      <div
        className="relative bg-white rounded-2xl shadow-2xl w-full max-w-xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search input */}
        <div className="flex items-center gap-3 px-4 py-3.5 border-b border-gray-100">
          <Icon name="Search" className="w-5 h-5 text-gray-400 shrink-0" />
          <input
            ref={inputRef}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Поиск по всей базе знаний..."
            className="flex-1 text-base text-gray-900 placeholder-gray-400 outline-none bg-transparent"
          />
          {query && (
            <button
              onClick={() => setQuery("")}
              className="p-1 text-gray-400 hover:text-gray-600 rounded"
            >
              <Icon name="X" className="w-4 h-4" />
            </button>
          )}
          <kbd className="shrink-0 text-xs bg-gray-100 text-gray-500 px-2 py-0.5 rounded border border-gray-200">
            Esc
          </kbd>
        </div>

        {/* Results */}
        {results.length > 0 ? (
          <ul className="max-h-96 overflow-y-auto py-2">
            {results.map((result, idx) => (
              <li key={result.id}>
                <button
                  onClick={() => onNavigate(result.section)}
                  className={cn(
                    "w-full flex items-center gap-3 px-4 py-3 text-left transition-colors",
                    idx === activeIdx ? "bg-indigo-50" : "hover:bg-gray-50"
                  )}
                  onMouseEnter={() => setActiveIdx(idx)}
                >
                  <div
                    className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0"
                    style={{ backgroundColor: `${result.color || "#6366f1"}20` }}
                  >
                    <Icon
                      name={result.icon as "BookOpen"}
                      className="w-4 h-4"
                      style={{ color: result.color || "#6366f1" }}
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 truncate">{result.title}</p>
                    {result.subtitle && (
                      <p className="text-xs text-gray-400 truncate">{result.subtitle}</p>
                    )}
                  </div>
                  <span className={cn("shrink-0 text-xs px-2 py-0.5 rounded-full font-medium", typeBg[result.type])}>
                    {typeLabels[result.type]}
                  </span>
                </button>
              </li>
            ))}
          </ul>
        ) : query.trim() ? (
          <div className="p-8 text-center">
            <Icon name="SearchX" className="w-10 h-10 text-gray-300 mx-auto mb-3" />
            <p className="text-gray-500 font-medium">Ничего не найдено</p>
            <p className="text-gray-400 text-sm mt-1">Попробуйте другой запрос</p>
          </div>
        ) : (
          <div className="px-4 py-3 space-y-1">
            <p className="text-xs text-gray-400 mb-2 font-medium uppercase tracking-wide">Быстрый переход</p>
            {[
              { section: "modules", label: "Учебные модули", icon: "BookOpen", color: "#6366f1" },
              { section: "regulations", label: "Регламенты", icon: "FileText", color: "#f59e0b" },
              { section: "analytics", label: "Аналитика", icon: "BarChart3", color: "#10b981" },
              { section: "employees", label: "Сотрудники", icon: "Users", color: "#ec4899" },
            ].map((item) => (
              <button
                key={item.section}
                onClick={() => onNavigate(item.section)}
                className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-gray-50 transition-colors text-left"
              >
                <div
                  className="w-7 h-7 rounded-lg flex items-center justify-center shrink-0"
                  style={{ backgroundColor: `${item.color}20` }}
                >
                  <Icon name={item.icon as "BookOpen"} className="w-3.5 h-3.5" style={{ color: item.color }} />
                </div>
                <span className="text-sm text-gray-700">{item.label}</span>
                <Icon name="ArrowRight" className="w-3.5 h-3.5 text-gray-300 ml-auto" />
              </button>
            ))}
          </div>
        )}

        {/* Footer hint */}
        <div className="px-4 py-2.5 border-t border-gray-100 flex items-center gap-4 text-xs text-gray-400">
          <span className="flex items-center gap-1"><kbd className="bg-gray-100 px-1.5 py-0.5 rounded border border-gray-200">↑↓</kbd> навигация</span>
          <span className="flex items-center gap-1"><kbd className="bg-gray-100 px-1.5 py-0.5 rounded border border-gray-200">Enter</kbd> выбрать</span>
          <span className="flex items-center gap-1"><kbd className="bg-gray-100 px-1.5 py-0.5 rounded border border-gray-200">Esc</kbd> закрыть</span>
        </div>
      </div>
    </div>
  );
}
