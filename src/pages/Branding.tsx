import { useState } from "react";
import Icon from "@/components/ui/icon";
import { useUser } from "@/context/UserContext";
import { cn } from "@/lib/utils";

const PRESET_COLORS = [
  { name: "Индиго", primary: "#4f46e5", accent: "#7c3aed" },
  { name: "Синий", primary: "#2563eb", accent: "#1d4ed8" },
  { name: "Изумрудный", primary: "#059669", accent: "#047857" },
  { name: "Фиолетовый", primary: "#7c3aed", accent: "#6d28d9" },
  { name: "Розовый", primary: "#db2777", accent: "#be185d" },
  { name: "Оранжевый", primary: "#ea580c", accent: "#c2410c" },
  { name: "Тёмный", primary: "#1e293b", accent: "#334155" },
  { name: "Бирюзовый", primary: "#0891b2", accent: "#0e7490" },
];

export default function Branding() {
  const { branding, setBranding } = useUser();
  const [form, setForm] = useState({ ...branding });
  const [saved, setSaved] = useState(false);
  const [logoPreview, setLogoPreview] = useState<string | null>(branding.logoUrl);

  const handleSave = () => {
    setBranding(form);
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  const handleReset = () => {
    const defaults = {
      companyName: "Умная база знаний",
      logoUrl: null,
      primaryColor: "#4f46e5",
      accentColor: "#7c3aed",
      favicon: null,
    };
    setForm(defaults);
    setLogoPreview(null);
    setBranding(defaults);
  };

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      const result = ev.target?.result as string;
      setLogoPreview(result);
      setForm((f) => ({ ...f, logoUrl: result }));
    };
    reader.readAsDataURL(file);
  };

  const removeLogo = () => {
    setLogoPreview(null);
    setForm((f) => ({ ...f, logoUrl: null }));
  };

  return (
    <div className="p-6 max-w-3xl mx-auto space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-xl font-bold text-gray-900">Брендирование</h2>
        <p className="text-sm text-gray-500 mt-1">
          Настройте внешний вид платформы под бренд вашей компании
        </p>
      </div>

      {/* Preview banner */}
      <div
        className="rounded-2xl p-5 text-white relative overflow-hidden"
        style={{
          background: `linear-gradient(135deg, ${form.primaryColor}, ${form.accentColor})`,
        }}
      >
        <div className="flex items-center gap-3 mb-3">
          <div className="w-9 h-9 rounded-lg bg-white/20 flex items-center justify-center">
            {logoPreview ? (
              <img src={logoPreview} alt="logo" className="w-7 h-7 object-contain rounded" />
            ) : (
              <Icon name="Brain" className="w-5 h-5 text-white" />
            )}
          </div>
          <div>
            <p className="font-bold text-sm">{form.companyName || "Название компании"}</p>
            <p className="text-white/70 text-xs">База знаний</p>
          </div>
        </div>
        <p className="text-sm text-white/80">Предпросмотр вашего бренда</p>
        <div className="absolute -right-4 -bottom-4 w-24 h-24 rounded-full bg-white/5" />
        <div className="absolute -right-8 -bottom-8 w-36 h-36 rounded-full bg-white/5" />
      </div>

      {/* Form */}
      <div className="bg-white rounded-xl border border-gray-200 divide-y divide-gray-100">

        {/* Название */}
        <div className="p-5">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Название компании / платформы
          </label>
          <input
            type="text"
            value={form.companyName}
            onChange={(e) => setForm((f) => ({ ...f, companyName: e.target.value }))}
            placeholder="Умная база знаний"
            className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-300 focus:border-indigo-400"
          />
          <p className="text-xs text-gray-400 mt-1">
            Отображается в боковом меню и на главной странице
          </p>
        </div>

        {/* Логотип */}
        <div className="p-5">
          <label className="block text-sm font-medium text-gray-700 mb-3">Логотип</label>
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-xl border-2 border-dashed border-gray-200 flex items-center justify-center bg-gray-50 overflow-hidden">
              {logoPreview ? (
                <img src={logoPreview} alt="logo" className="w-full h-full object-contain" />
              ) : (
                <Icon name="ImagePlus" className="w-6 h-6 text-gray-300" />
              )}
            </div>
            <div className="space-y-2">
              <label className="cursor-pointer inline-flex items-center gap-2 text-sm text-indigo-600 hover:text-indigo-700 font-medium">
                <Icon name="Upload" className="w-4 h-4" />
                Загрузить логотип
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleLogoUpload}
                />
              </label>
              {logoPreview && (
                <button
                  onClick={removeLogo}
                  className="flex items-center gap-2 text-sm text-red-500 hover:text-red-600"
                >
                  <Icon name="Trash2" className="w-4 h-4" />
                  Удалить
                </button>
              )}
              <p className="text-xs text-gray-400">PNG, SVG, JPG до 2 МБ. Рекомендуется квадратный формат.</p>
            </div>
          </div>
        </div>

        {/* Цвет — пресеты */}
        <div className="p-5">
          <label className="block text-sm font-medium text-gray-700 mb-3">Цветовая схема</label>
          <div className="grid grid-cols-4 gap-2 mb-4">
            {PRESET_COLORS.map((preset) => (
              <button
                key={preset.name}
                onClick={() =>
                  setForm((f) => ({
                    ...f,
                    primaryColor: preset.primary,
                    accentColor: preset.accent,
                  }))
                }
                className={cn(
                  "relative rounded-lg h-12 overflow-hidden border-2 transition-all",
                  form.primaryColor === preset.primary
                    ? "border-gray-900 scale-105 shadow-md"
                    : "border-transparent hover:border-gray-300"
                )}
                title={preset.name}
              >
                <div
                  className="w-full h-full"
                  style={{
                    background: `linear-gradient(135deg, ${preset.primary}, ${preset.accent})`,
                  }}
                />
                <span className="absolute bottom-1 left-0 right-0 text-center text-[10px] text-white font-medium drop-shadow">
                  {preset.name}
                </span>
              </button>
            ))}
          </div>

          {/* Кастомные цвета */}
          <div className="flex gap-4">
            <div className="flex-1">
              <label className="text-xs text-gray-500 mb-1 block">Основной цвет</label>
              <div className="flex items-center gap-2 border border-gray-200 rounded-lg px-3 py-2">
                <input
                  type="color"
                  value={form.primaryColor}
                  onChange={(e) => setForm((f) => ({ ...f, primaryColor: e.target.value }))}
                  className="w-6 h-6 rounded cursor-pointer border-0 p-0 bg-transparent"
                />
                <span className="text-sm text-gray-700 font-mono">{form.primaryColor}</span>
              </div>
            </div>
            <div className="flex-1">
              <label className="text-xs text-gray-500 mb-1 block">Акцентный цвет</label>
              <div className="flex items-center gap-2 border border-gray-200 rounded-lg px-3 py-2">
                <input
                  type="color"
                  value={form.accentColor}
                  onChange={(e) => setForm((f) => ({ ...f, accentColor: e.target.value }))}
                  className="w-6 h-6 rounded cursor-pointer border-0 p-0 bg-transparent"
                />
                <span className="text-sm text-gray-700 font-mono">{form.accentColor}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Тариф */}
        <div className="p-5 bg-amber-50">
          <div className="flex items-start gap-3">
            <Icon name="Crown" className="w-5 h-5 text-amber-500 mt-0.5 shrink-0" />
            <div>
              <p className="text-sm font-medium text-gray-800">Enterprise-функция</p>
              <p className="text-xs text-gray-500 mt-0.5">
                Полное кастомное брендирование, включая домен, кастомный CSS и скрытие логотипа
                платформы, доступно на тарифе Enterprise. Базовое брендирование (название, логотип,
                цвета) доступно с тарифа Business.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="flex items-center justify-between">
        <button
          onClick={handleReset}
          className="flex items-center gap-2 text-sm text-gray-500 hover:text-gray-700 px-4 py-2 rounded-lg border border-gray-200 hover:bg-gray-50 transition-all"
        >
          <Icon name="RotateCcw" className="w-4 h-4" />
          Сбросить к стандарту
        </button>
        <button
          onClick={handleSave}
          className="flex items-center gap-2 text-sm text-white px-5 py-2 rounded-lg font-medium transition-all"
          style={{ backgroundColor: form.primaryColor }}
        >
          {saved ? (
            <>
              <Icon name="Check" className="w-4 h-4" />
              Сохранено!
            </>
          ) : (
            <>
              <Icon name="Save" className="w-4 h-4" />
              Сохранить изменения
            </>
          )}
        </button>
      </div>
    </div>
  );
}
