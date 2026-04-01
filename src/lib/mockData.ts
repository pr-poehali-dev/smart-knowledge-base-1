// Mock data for demo mode (when backend is not connected)
import type { DashboardData, Module, Regulation, Category, Employee, Analytics, Certification, Widget } from "./api";

export const mockCategories: Category[] = [
  { id: "10000000-0000-0000-0000-000000000001", company_id: "demo", name: "Онбординг", description: "Материалы для новых сотрудников", color: "#6366f1", icon: "UserPlus", sort_order: 1 },
  { id: "10000000-0000-0000-0000-000000000002", company_id: "demo", name: "Продажи", description: "Обучение отдела продаж", color: "#10b981", icon: "TrendingUp", sort_order: 2 },
  { id: "10000000-0000-0000-0000-000000000003", company_id: "demo", name: "IT и Безопасность", description: "Технические регламенты", color: "#f59e0b", icon: "Shield", sort_order: 3 },
  { id: "10000000-0000-0000-0000-000000000004", company_id: "demo", name: "HR процессы", description: "Кадровые процедуры", color: "#ec4899", icon: "Users", sort_order: 4 },
];

export const mockModules: Module[] = [
  {
    id: "30000000-0000-0000-0000-000000000001", company_id: "demo", category_id: "10000000-0000-0000-0000-000000000001",
    title: "Добро пожаловать в компанию", description: "Базовый модуль для новых сотрудников", status: "published",
    is_ai_generated: false, ai_topic: null, estimated_duration: 45, points_reward: 20, is_mandatory: true,
    lesson_count: 4, completion_count: 3, category_name: "Онбординг", category_color: "#6366f1",
    created_at: new Date(Date.now() - 5 * 86400000).toISOString(), updated_at: new Date().toISOString(),
  },
  {
    id: "30000000-0000-0000-0000-000000000002", company_id: "demo", category_id: "10000000-0000-0000-0000-000000000002",
    title: "Техники продаж B2B", description: "Эффективные методы работы с корпоративными клиентами", status: "published",
    is_ai_generated: true, ai_topic: "Техники продаж B2B", estimated_duration: 60, points_reward: 30, is_mandatory: false,
    lesson_count: 6, completion_count: 2, category_name: "Продажи", category_color: "#10b981",
    created_at: new Date(Date.now() - 3 * 86400000).toISOString(), updated_at: new Date().toISOString(),
  },
  {
    id: "30000000-0000-0000-0000-000000000003", company_id: "demo", category_id: "10000000-0000-0000-0000-000000000003",
    title: "Информационная безопасность", description: "Правила работы с корпоративными данными", status: "published",
    is_ai_generated: false, ai_topic: null, estimated_duration: 30, points_reward: 15, is_mandatory: true,
    lesson_count: 3, completion_count: 4, category_name: "IT и Безопасность", category_color: "#f59e0b",
    created_at: new Date(Date.now() - 10 * 86400000).toISOString(), updated_at: new Date().toISOString(),
  },
  {
    id: "30000000-0000-0000-0000-000000000004", company_id: "demo", category_id: "10000000-0000-0000-0000-000000000004",
    title: "Кадровый документооборот", description: "Процедуры оформления кадровых документов", status: "published",
    is_ai_generated: false, ai_topic: null, estimated_duration: 40, points_reward: 10, is_mandatory: false,
    lesson_count: 5, completion_count: 1, category_name: "HR процессы", category_color: "#ec4899",
    created_at: new Date(Date.now() - 7 * 86400000).toISOString(), updated_at: new Date().toISOString(),
  },
  {
    id: "30000000-0000-0000-0000-000000000005", company_id: "demo", category_id: "10000000-0000-0000-0000-000000000002",
    title: "Работа с CRM системой", description: "Обучение работе в Битрикс24 CRM", status: "draft",
    is_ai_generated: true, ai_topic: "CRM Битрикс24", estimated_duration: 50, points_reward: 25, is_mandatory: false,
    lesson_count: 0, completion_count: 0, category_name: "Продажи", category_color: "#10b981",
    created_at: new Date(Date.now() - 1 * 86400000).toISOString(), updated_at: new Date().toISOString(),
  },
];

export const mockRegulations: Regulation[] = [
  {
    id: "40000000-0000-0000-0000-000000000001", company_id: "demo", category_id: "10000000-0000-0000-0000-000000000003",
    title: "Политика информационной безопасности", content: `## Политика информационной безопасности\n\nДанный документ устанавливает правила работы с информацией в компании.\n\n### 1. Общие положения\n- Все сотрудники обязаны соблюдать настоящую политику\n- Нарушение политики влечёт дисциплинарную ответственность\n\n### 2. Пароли\n- Длина не менее 12 символов\n- Смена каждые 90 дней\n\n### 3. Данные клиентов\n- Запрещена передача третьим лицам\n- Хранение только в корпоративных системах`,
    version: "1.0", status: "published", is_ai_generated: false, requires_acknowledgment: true,
    effective_date: new Date().toISOString().split("T")[0], tags: ["безопасность", "IT"], ack_count: 4,
    category_name: "IT и Безопасность", category_color: "#f59e0b",
    created_at: new Date(Date.now() - 30 * 86400000).toISOString(), updated_at: new Date().toISOString(),
  },
  {
    id: "40000000-0000-0000-0000-000000000002", company_id: "demo", category_id: "10000000-0000-0000-0000-000000000004",
    title: "Правила внутреннего трудового распорядка", content: `## Правила внутреннего трудового распорядка\n\n### Рабочее время\n- Начало рабочего дня: 9:00\n- Окончание: 18:00\n- Обеденный перерыв: 13:00-14:00`,
    version: "2.1", status: "published", is_ai_generated: false, requires_acknowledgment: true,
    effective_date: new Date().toISOString().split("T")[0], tags: ["HR", "распорядок"], ack_count: 2,
    category_name: "HR процессы", category_color: "#ec4899",
    created_at: new Date(Date.now() - 60 * 86400000).toISOString(), updated_at: new Date().toISOString(),
  },
  {
    id: "40000000-0000-0000-0000-000000000003", company_id: "demo", category_id: "10000000-0000-0000-0000-000000000002",
    title: "Стандарт обслуживания клиентов", content: `## Стандарт обслуживания клиентов\n\n### Принципы\n- Клиент всегда прав\n- Быстрый отклик в течение 2 часов\n- Вежливость и профессионализм`,
    version: "1.0", status: "published", is_ai_generated: false, requires_acknowledgment: true,
    effective_date: new Date().toISOString().split("T")[0], tags: ["продажи", "клиенты"], ack_count: 1,
    category_name: "Продажи", category_color: "#10b981",
    created_at: new Date(Date.now() - 15 * 86400000).toISOString(), updated_at: new Date().toISOString(),
  },
];

export const mockEmployees: Employee[] = [
  { id: "20000000-0000-0000-0000-000000000001", company_id: "demo", bitrix_user_id: "1", name: "Иван Петров", email: "ivan@demo.com", department: "Продажи", position: "Менеджер по продажам", avatar_url: null, is_admin: false, total_points: 85, completed_modules: 1, acknowledged_regulations: 1 },
  { id: "20000000-0000-0000-0000-000000000002", company_id: "demo", bitrix_user_id: "2", name: "Мария Сидорова", email: "maria@demo.com", department: "HR", position: "HR-менеджер", avatar_url: null, is_admin: true, total_points: 120, completed_modules: 2, acknowledged_regulations: 2 },
  { id: "20000000-0000-0000-0000-000000000003", company_id: "demo", bitrix_user_id: "3", name: "Алексей Козлов", email: "alexey@demo.com", department: "IT", position: "Разработчик", avatar_url: null, is_admin: false, total_points: 200, completed_modules: 1, acknowledged_regulations: 1 },
  { id: "20000000-0000-0000-0000-000000000004", company_id: "demo", bitrix_user_id: "4", name: "Елена Новикова", email: "elena@demo.com", department: "Продажи", position: "Руководитель отдела", avatar_url: null, is_admin: false, total_points: 150, completed_modules: 1, acknowledged_regulations: 1 },
  { id: "20000000-0000-0000-0000-000000000005", company_id: "demo", bitrix_user_id: "5", name: "Дмитрий Волков", email: "dmitry@demo.com", department: "Маркетинг", position: "Маркетолог", avatar_url: null, is_admin: false, total_points: 45, completed_modules: 0, acknowledged_regulations: 0 },
];

export const mockDashboard: DashboardData = {
  stats: { modules: 4, regulations: 3, employees: 5, completions: 7 },
  recentModules: mockModules.slice(0, 3),
  topEmployees: [
    { name: "Алексей Козлов", department: "IT", total_points: 200, completed_count: 1 },
    { name: "Елена Новикова", department: "Продажи", total_points: 150, completed_count: 1 },
    { name: "Мария Сидорова", department: "HR", total_points: 120, completed_count: 2 },
    { name: "Иван Петров", department: "Продажи", total_points: 85, completed_count: 1 },
    { name: "Дмитрий Волков", department: "Маркетинг", total_points: 45, completed_count: 0 },
  ],
};

export const mockAnalytics: Analytics = {
  employeeStats: [
    { name: "Алексей Козлов", department: "IT", position: "Разработчик", total_points: 200, completed: 1, in_progress: 0, regulations_read: 1, avg_score: 100 },
    { name: "Елена Новикова", department: "Продажи", position: "Руководитель отдела", total_points: 150, completed: 1, in_progress: 0, regulations_read: 1, avg_score: 88 },
    { name: "Мария Сидорова", department: "HR", position: "HR-менеджер", total_points: 120, completed: 2, in_progress: 0, regulations_read: 2, avg_score: 96 },
    { name: "Иван Петров", department: "Продажи", position: "Менеджер по продажам", total_points: 85, completed: 1, in_progress: 1, regulations_read: 1, avg_score: 92 },
    { name: "Дмитрий Волков", department: "Маркетинг", position: "Маркетолог", total_points: 45, completed: 0, in_progress: 1, regulations_read: 0, avg_score: 0 },
  ],
  moduleStats: [
    { title: "Информационная безопасность", status: "published", points_reward: 15, total_attempts: 4, completions: 4, avg_score: 97, avg_time: 1800 },
    { title: "Добро пожаловать в компанию", status: "published", points_reward: 20, total_attempts: 3, completions: 2, avg_score: 94, avg_time: 2700 },
    { title: "Техники продаж B2B", status: "published", points_reward: 30, total_attempts: 2, completions: 1, avg_score: 88, avg_time: 3600 },
  ],
  deptStats: [
    { department: "IT", employee_count: 1, completed_modules: 1, avg_points: 200 },
    { department: "HR", employee_count: 1, completed_modules: 2, avg_points: 120 },
    { department: "Продажи", employee_count: 2, completed_modules: 2, avg_points: 117 },
    { department: "Маркетинг", employee_count: 1, completed_modules: 0, avg_points: 45 },
  ],
  weeklyActivity: Array.from({ length: 14 }, (_, i) => ({
    day: new Date(Date.now() - (13 - i) * 86400000).toISOString(),
    completions: Math.floor(Math.random() * 3),
  })),
};

export const mockCertifications: Certification[] = [
  {
    id: "cert-001", company_id: "demo", title: "Базовая аттестация сотрудника",
    description: "Обязательная аттестация для всех сотрудников по итогам онбординга",
    module_ids: ["30000000-0000-0000-0000-000000000001", "30000000-0000-0000-0000-000000000003"],
    passing_score: 80, validity_period: 365, is_active: true, total_attempts: 3, passed_count: 3,
    created_at: new Date(Date.now() - 20 * 86400000).toISOString(),
  },
  {
    id: "cert-002", company_id: "demo", title: "Специалист по продажам",
    description: "Аттестация для менеджеров отдела продаж",
    module_ids: ["30000000-0000-0000-0000-000000000002"],
    passing_score: 85, validity_period: 180, is_active: true, total_attempts: 2, passed_count: 1,
    created_at: new Date(Date.now() - 5 * 86400000).toISOString(),
  },
];

export const mockWidgets: Widget[] = [
  { id: "w1", company_id: "demo", widget_type: "progress_chart", title: "Прогресс обучения", config: { show_legend: true }, is_active: true, position: 0 },
  { id: "w2", company_id: "demo", widget_type: "leaderboard", title: "Рейтинг сотрудников", config: { limit: 5 }, is_active: true, position: 1 },
  { id: "w3", company_id: "demo", widget_type: "new_modules", title: "Новые модули", config: { limit: 3 }, is_active: true, position: 2 },
  { id: "w4", company_id: "demo", widget_type: "pending_regulations", title: "Ожидают ознакомления", config: {}, is_active: false, position: 3 },
];
