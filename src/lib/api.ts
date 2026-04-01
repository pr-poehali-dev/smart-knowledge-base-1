// API client for KnowledgeBase backend
const COMPANY_ID = "00000000-0000-0000-0000-000000000001";

// Will be replaced with actual backend URL after deployment
let API_BASE = "";

export function setApiBase(url: string) {
  API_BASE = url;
}

async function request<T>(path: string, options: RequestInit = {}): Promise<T> {
  const sep = path.includes("?") ? "&" : "?";
  const url = `${API_BASE}${path}${sep}company_id=${COMPANY_ID}`;
  const res = await fetch(url, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(options.headers || {}),
    },
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({ error: "Unknown error" }));
    throw new Error(err.error || `HTTP ${res.status}`);
  }
  return res.json();
}

export const api = {
  // Dashboard
  getDashboard: () => request<DashboardData>("/dashboard"),

  // Modules
  getModules: (status?: string) =>
    request<Module[]>(`/modules${status ? `?status=${status}` : ""}`),
  getModule: (id: string) => request<ModuleDetail>(`/modules/${id}`),
  createModule: (data: Partial<Module>) =>
    request<Module>("/modules", { method: "POST", body: JSON.stringify(data) }),
  updateModule: (id: string, data: Partial<Module>) =>
    request<Module>(`/modules/${id}`, { method: "PUT", body: JSON.stringify(data) }),

  // Lessons
  createLesson: (moduleId: string, data: Partial<Lesson>) =>
    request<Lesson>(`/modules/${moduleId}/lessons`, { method: "POST", body: JSON.stringify(data) }),

  // Regulations
  getRegulations: () => request<Regulation[]>("/regulations"),
  createRegulation: (data: Partial<Regulation>) =>
    request<Regulation>("/regulations", { method: "POST", body: JSON.stringify(data) }),
  updateRegulation: (id: string, data: Partial<Regulation>) =>
    request<Regulation>(`/regulations/${id}`, { method: "PUT", body: JSON.stringify(data) }),
  acknowledgeRegulation: (id: string, employeeId: string) =>
    request(`/regulations/${id}/acknowledge`, { method: "POST", body: JSON.stringify({ employee_id: employeeId }) }),

  // Categories
  getCategories: () => request<Category[]>("/categories"),
  createCategory: (data: Partial<Category>) =>
    request<Category>("/categories", { method: "POST", body: JSON.stringify(data) }),

  // Employees
  getEmployees: () => request<Employee[]>("/employees"),

  // Analytics
  getAnalytics: () => request<Analytics>("/analytics"),

  // Certifications
  getCertifications: () => request<Certification[]>("/certifications"),
  createCertification: (data: Partial<Certification>) =>
    request<Certification>("/certifications", { method: "POST", body: JSON.stringify(data) }),

  // AI Generation
  generateModule: (data: AIGenerateModuleRequest) =>
    request<AIGenerateModuleResponse>("/ai/generate-module", { method: "POST", body: JSON.stringify(data) }),
  generateRegulation: (data: AIGenerateRegulationRequest) =>
    request<Regulation>("/ai/generate-regulation", { method: "POST", body: JSON.stringify(data) }),

  // Progress
  updateProgress: (data: ProgressUpdate) =>
    request<Progress>("/progress", { method: "POST", body: JSON.stringify(data) }),

  // Widgets
  getWidgets: () => request<Widget[]>("/widgets"),
  createWidget: (data: Partial<Widget>) =>
    request<Widget>("/widgets", { method: "POST", body: JSON.stringify(data) }),
  updateWidget: (id: string, data: Partial<Widget>) =>
    request<Widget>(`/widgets/${id}`, { method: "PUT", body: JSON.stringify(data) }),
};

// Types
export interface DashboardData {
  stats: { modules: number; regulations: number; employees: number; completions: number };
  recentModules: Module[];
  topEmployees: EmployeeRank[];
}

export interface Module {
  id: string;
  company_id: string;
  category_id: string | null;
  title: string;
  description: string;
  status: "draft" | "published" | "archived";
  is_ai_generated: boolean;
  ai_topic: string | null;
  estimated_duration: number;
  points_reward: number;
  is_mandatory: boolean;
  lesson_count?: number;
  completion_count?: number;
  category_name?: string;
  category_color?: string;
  created_at: string;
  updated_at: string;
}

export interface ModuleDetail extends Module {
  lessons: Lesson[];
}

export interface Lesson {
  id: string;
  module_id: string;
  title: string;
  content: string;
  content_type: "text" | "video" | "pdf" | "quiz" | "interactive";
  video_url: string | null;
  duration: number;
  sort_order: number;
  is_ai_generated: boolean;
  created_at: string;
}

export interface Regulation {
  id: string;
  company_id: string;
  category_id: string | null;
  title: string;
  content: string;
  version: string;
  status: "draft" | "published" | "archived";
  is_ai_generated: boolean;
  requires_acknowledgment: boolean;
  effective_date: string | null;
  tags: string[];
  ack_count?: number;
  category_name?: string;
  category_color?: string;
  created_at: string;
  updated_at: string;
}

export interface Category {
  id: string;
  company_id: string;
  name: string;
  description: string;
  color: string;
  icon: string;
  sort_order: number;
}

export interface Employee {
  id: string;
  company_id: string;
  bitrix_user_id: string;
  name: string;
  email: string;
  department: string;
  position: string;
  avatar_url: string | null;
  is_admin: boolean;
  total_points: number;
  completed_modules?: number;
  acknowledged_regulations?: number;
}

export interface EmployeeRank {
  name: string;
  department: string;
  total_points: number;
  completed_count: number;
}

export interface Analytics {
  employeeStats: EmployeeStats[];
  moduleStats: ModuleStats[];
  deptStats: DeptStats[];
  weeklyActivity: ActivityPoint[];
}

export interface EmployeeStats {
  name: string;
  department: string;
  position: string;
  total_points: number;
  completed: number;
  in_progress: number;
  regulations_read: number;
  avg_score: number;
}

export interface ModuleStats {
  title: string;
  status: string;
  points_reward: number;
  total_attempts: number;
  completions: number;
  avg_score: number;
  avg_time: number;
}

export interface DeptStats {
  department: string;
  employee_count: number;
  completed_modules: number;
  avg_points: number;
}

export interface ActivityPoint {
  day: string;
  completions: number;
}

export interface Certification {
  id: string;
  company_id: string;
  title: string;
  description: string;
  module_ids: string[];
  passing_score: number;
  validity_period: number | null;
  is_active: boolean;
  total_attempts?: number;
  passed_count?: number;
  created_at: string;
}

export interface Progress {
  id: string;
  employee_id: string;
  module_id: string;
  status: string;
  progress_percent: number;
  score: number | null;
  attempts: number;
}

export interface ProgressUpdate {
  employee_id: string;
  module_id: string;
  status: string;
  progress_percent: number;
  score?: number;
  time_spent?: number;
  attempts?: number;
}

export interface Widget {
  id: string;
  company_id: string;
  widget_type: string;
  title: string;
  config: Record<string, unknown>;
  is_active: boolean;
  position: number;
}

export interface AIGenerateModuleRequest {
  topic: string;
  description?: string;
  category_id?: string;
  lessons_count?: number;
}

export interface AIGenerateModuleResponse {
  module: Module;
  lessons: Lesson[];
}

export interface AIGenerateRegulationRequest {
  topic: string;
  description?: string;
  category_id?: string;
}
