import { useState } from "react";
import Icon from "@/components/ui/icon";
import { cn } from "@/lib/utils";
import { mockCertifications, mockModules, mockEmployees } from "@/lib/mockData";
import type { Certification } from "@/lib/api";

export default function Certifications() {
  const [certifications, setCertifications] = useState<Certification[]>(mockCertifications);
  const [showCreate, setShowCreate] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const [newDesc, setNewDesc] = useState("");
  const [selectedModules, setSelectedModules] = useState<string[]>([]);
  const [passingScore, setPassingScore] = useState(80);
  const [validityPeriod, setValidityPeriod] = useState<number | null>(365);
  const [showAssign, setShowAssign] = useState<string | null>(null);

  const handleCreate = () => {
    if (!newTitle.trim()) return;
    const cert: Certification = {
      id: `cert-${Date.now()}`,
      company_id: "demo",
      title: newTitle,
      description: newDesc,
      module_ids: selectedModules,
      passing_score: passingScore,
      validity_period: validityPeriod,
      is_active: true,
      total_attempts: 0,
      passed_count: 0,
      created_at: new Date().toISOString(),
    };
    setCertifications((prev) => [cert, ...prev]);
    setShowCreate(false);
    setNewTitle(""); setNewDesc(""); setSelectedModules([]); setPassingScore(80);
  };

  return (
    <div className="p-6 space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold text-gray-900">Аттестации</h2>
          <p className="text-sm text-gray-500">Создавайте аттестации и назначайте их сотрудникам</p>
        </div>
        <button
          onClick={() => setShowCreate(true)}
          className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm font-medium hover:bg-indigo-700"
        >
          <Icon name="Plus" className="w-4 h-4" />
          Новая аттестация
        </button>
      </div>

      {/* Create modal */}
      {showCreate && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl w-full max-w-lg p-6 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold text-gray-900">Создать аттестацию</h3>
              <button onClick={() => setShowCreate(false)} className="p-1 text-gray-400 hover:text-gray-600">
                <Icon name="X" className="w-5 h-5" />
              </button>
            </div>

            <input
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              placeholder="Название аттестации *"
              className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />

            <textarea
              value={newDesc}
              onChange={(e) => setNewDesc(e.target.value)}
              placeholder="Описание"
              rows={2}
              className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none"
            />

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Модули для аттестации</label>
              <div className="space-y-2 max-h-40 overflow-y-auto">
                {mockModules.filter((m) => m.status === "published").map((mod) => (
                  <label key={mod.id} className="flex items-center gap-2.5 p-2 hover:bg-gray-50 rounded-lg cursor-pointer">
                    <input
                      type="checkbox"
                      checked={selectedModules.includes(mod.id)}
                      onChange={(e) => {
                        if (e.target.checked) setSelectedModules((prev) => [...prev, mod.id]);
                        else setSelectedModules((prev) => prev.filter((id) => id !== mod.id));
                      }}
                      className="w-4 h-4 text-indigo-600 rounded"
                    />
                    <span className="text-sm text-gray-700">{mod.title}</span>
                    <span className="ml-auto text-xs text-gray-400">{mod.points_reward} б.</span>
                  </label>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1">Проходной балл: <span className="text-indigo-600">{passingScore}%</span></label>
                <input type="range" min={50} max={100} value={passingScore} onChange={(e) => setPassingScore(Number(e.target.value))} className="w-full accent-indigo-600" />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1">Срок действия (дни)</label>
                <input
                  type="number"
                  value={validityPeriod || ""}
                  onChange={(e) => setValidityPeriod(e.target.value ? Number(e.target.value) : null)}
                  placeholder="Бессрочно"
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
            </div>

            <div className="flex gap-3 pt-2">
              <button onClick={() => setShowCreate(false)} className="flex-1 py-2.5 border border-gray-200 text-gray-700 rounded-xl text-sm">Отмена</button>
              <button
                onClick={handleCreate}
                disabled={!newTitle.trim()}
                className="flex-1 py-2.5 bg-indigo-600 text-white rounded-xl text-sm font-medium hover:bg-indigo-700 disabled:opacity-50"
              >
                Создать
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Assign modal */}
      {showAssign && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl w-full max-w-md p-6 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold text-gray-900">Назначить аттестацию</h3>
              <button onClick={() => setShowAssign(null)} className="p-1 text-gray-400 hover:text-gray-600">
                <Icon name="X" className="w-5 h-5" />
              </button>
            </div>
            <div className="space-y-2">
              {mockEmployees.map((emp) => (
                <div key={emp.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 bg-indigo-100 rounded-full flex items-center justify-center">
                      <span className="text-xs font-bold text-indigo-700">{emp.name.charAt(0)}</span>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900">{emp.name}</p>
                      <p className="text-xs text-gray-400">{emp.department}</p>
                    </div>
                  </div>
                  <button className="text-xs px-3 py-1.5 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700">
                    Назначить
                  </button>
                </div>
              ))}
            </div>
            <button onClick={() => setShowAssign(null)} className="w-full py-2.5 border border-gray-200 text-gray-700 rounded-xl text-sm">
              Закрыть
            </button>
          </div>
        </div>
      )}

      {/* Certifications list */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {certifications.map((cert) => {
          const passRate = cert.total_attempts ? Math.round((cert.passed_count! / cert.total_attempts) * 100) : 0;
          const totalPoints = cert.module_ids.reduce((sum, id) => {
            const mod = mockModules.find((m) => m.id === id);
            return sum + (mod?.points_reward || 0);
          }, 0);

          return (
            <div key={cert.id} className="bg-white rounded-xl border border-gray-100 p-5">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-amber-100 rounded-xl flex items-center justify-center">
                    <Icon name="Award" className="w-5 h-5 text-amber-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">{cert.title}</h3>
                    <p className="text-xs text-gray-400">{cert.module_ids.length} модулей · {totalPoints} баллов</p>
                  </div>
                </div>
                <span className={cn("text-xs px-2 py-0.5 rounded-full", cert.is_active ? "bg-emerald-50 text-emerald-700" : "bg-gray-100 text-gray-500")}>
                  {cert.is_active ? "Активна" : "Неактивна"}
                </span>
              </div>

              {cert.description && <p className="text-sm text-gray-500 mb-3">{cert.description}</p>}

              <div className="grid grid-cols-3 gap-2 mb-3">
                <div className="text-center p-2 bg-gray-50 rounded-lg">
                  <p className="text-base font-bold text-gray-900">{cert.total_attempts || 0}</p>
                  <p className="text-xs text-gray-400">попыток</p>
                </div>
                <div className="text-center p-2 bg-emerald-50 rounded-lg">
                  <p className="text-base font-bold text-emerald-700">{cert.passed_count || 0}</p>
                  <p className="text-xs text-gray-400">прошли</p>
                </div>
                <div className="text-center p-2 bg-indigo-50 rounded-lg">
                  <p className="text-base font-bold text-indigo-700">{passRate}%</p>
                  <p className="text-xs text-gray-400">успех</p>
                </div>
              </div>

              <div className="flex items-center gap-2 text-xs text-gray-400 mb-4">
                <Icon name="Target" className="w-3 h-3" />
                <span>Проходной балл: {cert.passing_score}%</span>
                {cert.validity_period && (
                  <>
                    <span>·</span>
                    <Icon name="Calendar" className="w-3 h-3" />
                    <span>Действует {cert.validity_period} дней</span>
                  </>
                )}
              </div>

              <button
                onClick={() => setShowAssign(cert.id)}
                className="w-full py-2 text-sm font-medium text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors flex items-center justify-center gap-1.5"
              >
                <Icon name="UserPlus" className="w-3.5 h-3.5" />
                Назначить сотрудникам
              </button>
            </div>
          );
        })}
      </div>

      {/* Employees certification progress */}
      <div className="bg-white rounded-xl border border-gray-100 p-5">
        <h3 className="font-semibold text-gray-900 mb-4">Прогресс аттестации сотрудников</h3>
        <div className="space-y-3">
          {mockEmployees.map((emp) => {
            const progress = Math.min(((emp.total_points || 0) / 200) * 100, 100);
            return (
              <div key={emp.id} className="flex items-center gap-3">
                <div className="w-8 h-8 bg-indigo-100 rounded-full flex items-center justify-center shrink-0">
                  <span className="text-xs font-bold text-indigo-700">{emp.name.charAt(0)}</span>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-center mb-1">
                    <p className="text-sm font-medium text-gray-900 truncate">{emp.name}</p>
                    <span className="text-xs text-gray-400 shrink-0 ml-2">{emp.total_points} / 200 баллов</span>
                  </div>
                  <div className="w-full h-1.5 bg-gray-100 rounded-full">
                    <div
                      className={cn("h-full rounded-full transition-all", progress >= 80 ? "bg-emerald-500" : progress >= 50 ? "bg-amber-500" : "bg-gray-300")}
                      style={{ width: `${progress}%` }}
                    />
                  </div>
                </div>
                <span className={cn(
                  "text-xs px-2 py-0.5 rounded-full font-medium shrink-0",
                  progress >= 80 ? "bg-emerald-50 text-emerald-700" :
                  progress >= 50 ? "bg-amber-50 text-amber-700" :
                  "bg-gray-100 text-gray-500"
                )}>
                  {progress >= 80 ? "Аттестован" : progress >= 50 ? "В процессе" : "Не начато"}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
