import { useState } from "react";
import Icon from "@/components/ui/icon";
import { cn } from "@/lib/utils";

const REFERRAL_CODE = "SMART2024";
const REFERRAL_LINK = "https://app.smartknowledge.ru/ref/SMART2024";

// QR code via public API (no external dependency)
const QR_URL = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(REFERRAL_LINK)}`;

interface ReferralEntry {
  id: string;
  name: string;
  email: string;
  date: string;
  status: "registered" | "trial" | "paid";
  reward: number;
}

const mockReferrals: ReferralEntry[] = [
  { id: "1", name: "ООО «Технологии»", email: "tech@company.ru", date: "2024-03-15", status: "paid", reward: 500 },
  { id: "2", name: "ИП Смирнов А.В.", email: "smirnov@mail.ru", date: "2024-03-20", status: "trial", reward: 0 },
  { id: "3", name: "ООО «Бизнес Плюс»", email: "info@bizplus.ru", date: "2024-03-28", status: "registered", reward: 0 },
];

const statusLabels: Record<ReferralEntry["status"], { label: string; color: string }> = {
  registered: { label: "Зарегистрировался", color: "bg-gray-100 text-gray-600" },
  trial: { label: "Пробный период", color: "bg-amber-50 text-amber-700" },
  paid: { label: "Оплатил подписку", color: "bg-emerald-50 text-emerald-700" },
};

export default function Referral() {
  const [copied, setCopied] = useState<"link" | "code" | null>(null);
  const [showQr, setShowQr] = useState(false);

  const copyToClipboard = (text: string, type: "link" | "code") => {
    navigator.clipboard.writeText(text).then(() => {
      setCopied(type);
      setTimeout(() => setCopied(null), 2000);
    });
  };

  const totalEarned = mockReferrals.filter((r) => r.status === "paid").reduce((acc, r) => acc + r.reward, 0);
  const totalReferrals = mockReferrals.length;
  const paidReferrals = mockReferrals.filter((r) => r.status === "paid").length;

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="text-center max-w-xl mx-auto">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-indigo-50 text-indigo-700 rounded-full text-sm font-medium mb-3">
          <Icon name="Gift" className="w-4 h-4" />
          Реферальная программа
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Приглашайте и зарабатывайте</h2>
        <p className="text-gray-500 text-sm">
          За каждого клиента, который оплатит подписку по вашей ссылке, вы получите <strong>500 ₽</strong> на счёт.
          Без ограничений по количеству приглашений.
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4">
        {[
          { label: "Всего приглашено", value: totalReferrals, icon: "Users", color: "text-indigo-600 bg-indigo-50" },
          { label: "Оплатили подписку", value: paidReferrals, icon: "CheckCircle2", color: "text-emerald-600 bg-emerald-50" },
          { label: "Заработано", value: `${totalEarned} ₽`, icon: "Banknote", color: "text-amber-600 bg-amber-50" },
        ].map((stat) => (
          <div key={stat.label} className="bg-white rounded-xl border border-gray-100 p-4 flex items-center gap-3">
            <div className={cn("w-10 h-10 rounded-xl flex items-center justify-center", stat.color)}>
              <Icon name={stat.icon as "Users"} className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xl font-bold text-gray-900">{stat.value}</p>
              <p className="text-xs text-gray-500">{stat.label}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Referral tools */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Referral link */}
        <div className="bg-white rounded-xl border border-gray-100 p-5">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-8 h-8 bg-indigo-50 rounded-lg flex items-center justify-center">
              <Icon name="Link" className="w-4 h-4 text-indigo-600" />
            </div>
            <div>
              <p className="font-semibold text-gray-900 text-sm">Реферальная ссылка</p>
              <p className="text-xs text-gray-400">Поделитесь ссылкой с коллегами</p>
            </div>
          </div>
          <div className="flex items-center gap-2 bg-gray-50 rounded-lg px-3 py-2.5 border border-gray-200">
            <Icon name="Globe" className="w-3.5 h-3.5 text-gray-400 shrink-0" />
            <span className="text-xs text-gray-600 flex-1 truncate font-mono">{REFERRAL_LINK}</span>
          </div>
          <button
            onClick={() => copyToClipboard(REFERRAL_LINK, "link")}
            className={cn(
              "mt-3 w-full flex items-center justify-center gap-2 py-2.5 rounded-lg text-sm font-medium transition-all",
              copied === "link"
                ? "bg-emerald-100 text-emerald-700"
                : "bg-indigo-600 text-white hover:bg-indigo-700"
            )}
          >
            <Icon name={copied === "link" ? "Check" : "Copy"} className="w-4 h-4" />
            {copied === "link" ? "Скопировано!" : "Скопировать ссылку"}
          </button>
        </div>

        {/* Promo code */}
        <div className="bg-white rounded-xl border border-gray-100 p-5">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-8 h-8 bg-violet-50 rounded-lg flex items-center justify-center">
              <Icon name="Tag" className="w-4 h-4 text-violet-600" />
            </div>
            <div>
              <p className="font-semibold text-gray-900 text-sm">Промокод</p>
              <p className="text-xs text-gray-400">Скидка 10% для нового клиента</p>
            </div>
          </div>
          <div className="flex items-center justify-center bg-gradient-to-r from-violet-50 to-indigo-50 rounded-lg py-4 border border-violet-100 mb-3">
            <span className="text-3xl font-black tracking-widest text-violet-700 select-all">{REFERRAL_CODE}</span>
          </div>
          <button
            onClick={() => copyToClipboard(REFERRAL_CODE, "code")}
            className={cn(
              "w-full flex items-center justify-center gap-2 py-2.5 rounded-lg text-sm font-medium transition-all",
              copied === "code"
                ? "bg-emerald-100 text-emerald-700"
                : "bg-violet-600 text-white hover:bg-violet-700"
            )}
          >
            <Icon name={copied === "code" ? "Check" : "Copy"} className="w-4 h-4" />
            {copied === "code" ? "Скопировано!" : "Скопировать промокод"}
          </button>
        </div>
      </div>

      {/* QR Code */}
      <div className="bg-white rounded-xl border border-gray-100 p-5">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-emerald-50 rounded-lg flex items-center justify-center">
              <Icon name="QrCode" className="w-4 h-4 text-emerald-600" />
            </div>
            <div>
              <p className="font-semibold text-gray-900 text-sm">QR-код</p>
              <p className="text-xs text-gray-400">Для офлайн-презентаций и раздаточных материалов</p>
            </div>
          </div>
          <button
            onClick={() => setShowQr(!showQr)}
            className="flex items-center gap-2 px-3 py-1.5 text-sm text-gray-600 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
          >
            <Icon name={showQr ? "EyeOff" : "Eye"} className="w-4 h-4" />
            {showQr ? "Скрыть" : "Показать"}
          </button>
        </div>
        {showQr && (
          <div className="flex flex-col items-center gap-4 py-4">
            <div className="p-4 bg-white border-2 border-gray-100 rounded-2xl shadow-sm">
              <img
                src={QR_URL}
                alt="QR-код реферальной ссылки"
                className="w-48 h-48"
              />
            </div>
            <p className="text-sm text-gray-500 text-center">
              Отсканируйте QR-код для перехода по реферальной ссылке
            </p>
            <a
              href={QR_URL}
              download="referral-qr.png"
              className="flex items-center gap-2 px-4 py-2 bg-emerald-600 text-white text-sm rounded-lg hover:bg-emerald-700 transition-colors"
            >
              <Icon name="Download" className="w-4 h-4" />
              Скачать QR-код
            </a>
          </div>
        )}
      </div>

      {/* How it works */}
      <div className="bg-gradient-to-r from-indigo-50 to-violet-50 rounded-xl border border-indigo-100 p-5">
        <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
          <Icon name="HelpCircle" className="w-4 h-4 text-indigo-500" />
          Как это работает
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            { step: "1", icon: "Share2", title: "Поделитесь ссылкой", desc: "Отправьте реферальную ссылку или промокод коллегам и партнёрам" },
            { step: "2", icon: "UserPlus", title: "Клиент регистрируется", desc: "Новый пользователь регистрируется по вашей ссылке и получает скидку 10%" },
            { step: "3", icon: "Banknote", title: "Вы получаете 500 ₽", desc: "После оплаты подписки на счёт зачисляется 500 ₽, которые можно использовать для оплаты своего тарифа" },
          ].map((item) => (
            <div key={item.step} className="flex items-start gap-3">
              <div className="w-8 h-8 bg-indigo-600 text-white rounded-full flex items-center justify-center text-sm font-bold shrink-0">
                {item.step}
              </div>
              <div>
                <p className="font-semibold text-gray-900 text-sm">{item.title}</p>
                <p className="text-xs text-gray-500 mt-0.5">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Referrals table */}
      <div>
        <h3 className="font-semibold text-gray-900 mb-3">История приглашений</h3>
        <div className="bg-white rounded-xl border border-gray-100 overflow-hidden">
          {mockReferrals.length === 0 ? (
            <div className="p-12 text-center">
              <Icon name="Users" className="w-10 h-10 text-gray-300 mx-auto mb-3" />
              <p className="text-gray-500">Пока нет приглашённых пользователей</p>
              <p className="text-gray-400 text-sm mt-1">Поделитесь ссылкой, чтобы начать зарабатывать</p>
            </div>
          ) : (
            <table className="w-full text-sm">
              <thead className="bg-gray-50 border-b border-gray-100">
                <tr>
                  <th className="text-left px-5 py-3 font-semibold text-gray-500">Клиент</th>
                  <th className="text-left px-5 py-3 font-semibold text-gray-500">Дата</th>
                  <th className="text-center px-5 py-3 font-semibold text-gray-500">Статус</th>
                  <th className="text-right px-5 py-3 font-semibold text-gray-500">Вознаграждение</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {mockReferrals.map((ref) => {
                  const s = statusLabels[ref.status];
                  return (
                    <tr key={ref.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-5 py-3.5">
                        <p className="font-medium text-gray-900">{ref.name}</p>
                        <p className="text-xs text-gray-400">{ref.email}</p>
                      </td>
                      <td className="px-5 py-3.5 text-gray-500 text-xs">
                        {new Date(ref.date).toLocaleDateString("ru-RU")}
                      </td>
                      <td className="px-5 py-3.5 text-center">
                        <span className={cn("text-xs px-2.5 py-1 rounded-full font-medium", s.color)}>{s.label}</span>
                      </td>
                      <td className="px-5 py-3.5 text-right">
                        {ref.reward > 0 ? (
                          <span className="font-bold text-emerald-600">+{ref.reward} ₽</span>
                        ) : (
                          <span className="text-gray-400">—</span>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
              <tfoot className="bg-gray-50 border-t border-gray-100">
                <tr>
                  <td colSpan={3} className="px-5 py-3 text-sm font-semibold text-gray-700">Итого заработано:</td>
                  <td className="px-5 py-3 text-right font-bold text-emerald-600 text-sm">{totalEarned} ₽</td>
                </tr>
              </tfoot>
            </table>
          )}
        </div>
      </div>
    </div>
  );
}
