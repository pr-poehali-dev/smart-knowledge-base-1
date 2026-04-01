import { useState } from "react";
import Icon from "@/components/ui/icon";
import type { Regulation } from "@/lib/api";
import { cn } from "@/lib/utils";

interface Props {
  regulation: Regulation;
  onBack: () => void;
  onEdit: () => void;
}

export default function RegulationViewer({ regulation, onBack, onEdit }: Props) {
  const [acknowledged, setAcknowledged] = useState(false);

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <div className="flex items-center gap-3 mb-6">
        <button onClick={onBack} className="p-2 hover:bg-gray-100 rounded-lg text-gray-500">
          <Icon name="ArrowLeft" className="w-4 h-4" />
        </button>
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <span className="text-xs bg-gray-100 text-gray-500 px-2 py-0.5 rounded-full">v{regulation.version}</span>
            <span className={cn(
              "text-xs px-2 py-0.5 rounded-full",
              regulation.status === "published" ? "bg-emerald-50 text-emerald-700" : "bg-gray-100 text-gray-500"
            )}>
              {regulation.status === "published" ? "Опубликован" : "Черновик"}
            </span>
            {regulation.is_ai_generated && (
              <span className="text-xs bg-violet-50 text-violet-700 px-2 py-0.5 rounded-full flex items-center gap-1">
                <Icon name="Sparkles" className="w-3 h-3" /> ИИ
              </span>
            )}
          </div>
        </div>
        <button onClick={onEdit} className="flex items-center gap-1.5 px-3 py-1.5 border border-gray-200 text-gray-600 rounded-lg text-sm hover:bg-gray-50">
          <Icon name="Edit2" className="w-3.5 h-3.5" />
          Редактировать
        </button>
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 p-6">
        <h1 className="text-xl font-bold text-gray-900 mb-2">{regulation.title}</h1>

        {regulation.category_name && (
          <div className="flex items-center gap-2 mb-4">
            <div className="w-2 h-2 rounded-full" style={{ backgroundColor: regulation.category_color || "#6366f1" }} />
            <span className="text-sm text-gray-500">{regulation.category_name}</span>
            {regulation.effective_date && (
              <>
                <span className="text-gray-300">·</span>
                <span className="text-sm text-gray-500">
                  Действует с {new Date(regulation.effective_date).toLocaleDateString("ru-RU")}
                </span>
              </>
            )}
          </div>
        )}

        <div className="border-t border-gray-100 pt-4">
          <div className="prose prose-sm max-w-none text-gray-700">
            {(regulation.content || "").split("\n").map((line, i) => {
              if (line.startsWith("# ")) return <h1 key={i} className="text-xl font-bold text-gray-900 mt-4 mb-2">{line.slice(2)}</h1>;
              if (line.startsWith("## ")) return <h2 key={i} className="text-lg font-bold text-gray-900 mt-4 mb-2 pb-1 border-b border-gray-100">{line.slice(3)}</h2>;
              if (line.startsWith("### ")) return <h3 key={i} className="text-base font-semibold text-gray-800 mt-3 mb-1.5">{line.slice(4)}</h3>;
              if (line.startsWith("- ")) return <li key={i} className="text-sm text-gray-700 ml-4 mb-1">{line.slice(2)}</li>;
              if (line.startsWith("| ")) {
                const cells = line.split("|").filter(Boolean).map((c) => c.trim());
                const isHeader = line.includes("---");
                if (isHeader) return null;
                return (
                  <div key={i} className="flex gap-2 text-sm border-b border-gray-50 py-1.5">
                    {cells.map((cell, ci) => <span key={ci} className={cn("flex-1", ci === 0 ? "font-medium text-gray-800" : "text-gray-600")}>{cell}</span>)}
                  </div>
                );
              }
              if (line === "") return <div key={i} className="h-2" />;
              if (line.startsWith("---")) return <hr key={i} className="my-3 border-gray-200" />;
              if (line.startsWith("*") && line.endsWith("*")) return <p key={i} className="text-xs text-gray-400 italic mt-4">{line.slice(1, -1)}</p>;
              return <p key={i} className="text-sm text-gray-700 mb-1.5">{line}</p>;
            })}
          </div>
        </div>
      </div>

      {regulation.requires_acknowledgment && (
        <div className={cn(
          "mt-4 rounded-xl p-4 border",
          acknowledged ? "bg-emerald-50 border-emerald-200" : "bg-amber-50 border-amber-200"
        )}>
          {acknowledged ? (
            <div className="flex items-center gap-3">
              <Icon name="CheckCircle2" className="w-5 h-5 text-emerald-600 shrink-0" />
              <p className="text-sm text-emerald-700 font-medium">Вы ознакомились с регламентом</p>
            </div>
          ) : (
            <div className="flex items-center gap-3">
              <Icon name="AlertCircle" className="w-5 h-5 text-amber-600 shrink-0" />
              <div className="flex-1">
                <p className="text-sm font-medium text-amber-800">Требуется подтверждение ознакомления</p>
                <p className="text-xs text-amber-600 mt-0.5">Нажмите кнопку, чтобы подтвердить, что вы прочитали документ</p>
              </div>
              <button
                onClick={() => setAcknowledged(true)}
                className="px-4 py-2 bg-amber-600 text-white rounded-lg text-sm font-medium hover:bg-amber-700 whitespace-nowrap"
              >
                Подтвердить
              </button>
            </div>
          )}
        </div>
      )}

      {/* Acknowledgment stats */}
      <div className="mt-4 bg-white rounded-xl border border-gray-100 p-4">
        <p className="text-sm font-medium text-gray-900 mb-2">Статистика ознакомления</p>
        <div className="flex items-center gap-4 text-sm">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-emerald-100 rounded flex items-center justify-center">
              <Icon name="Check" className="w-3 h-3 text-emerald-600" />
            </div>
            <span className="text-gray-700"><span className="font-bold">{(regulation.ack_count || 0)}</span> ознакомились</span>
          </div>
        </div>
      </div>
    </div>
  );
}
