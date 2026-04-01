import os
import json
import psycopg
from http.server import BaseHTTPRequestHandler, HTTPServer
from urllib.parse import urlparse, parse_qs
import urllib.request

DB_URL = os.environ.get("DATABASE_URL", "")
SCHEMA = os.environ.get("MAIN_DB_SCHEMA", "t_p79635719_smart_knowledge_base")
OPENAI_KEY = os.environ.get("OPENAI_API_KEY", "")
PORT = int(os.environ.get("PORT", 3000))

CORS = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
    "Access-Control-Allow-Methods": "GET, POST, PUT, OPTIONS",
    "Content-Type": "application/json",
}

def db_query(sql, params=None):
    with psycopg.connect(DB_URL) as conn:
        with conn.cursor(row_factory=psycopg.rows.dict_row) as cur:
            cur.execute(sql, params or [])
            if sql.strip().upper().startswith("SELECT"):
                return cur.fetchall()
            conn.commit()
            try:
                return [cur.fetchone()]
            except Exception:
                return []

def ai_complete(prompt):
    if not OPENAI_KEY:
        return None
    try:
        data = json.dumps({
            "model": "gpt-4o-mini",
            "messages": [{"role": "user", "content": prompt}],
            "temperature": 0.7,
            "max_tokens": 3000
        }).encode()
        req = urllib.request.Request(
            "https://api.openai.com/v1/chat/completions",
            data=data,
            headers={"Authorization": f"Bearer {OPENAI_KEY}", "Content-Type": "application/json"},
            method="POST"
        )
        with urllib.request.urlopen(req, timeout=30) as resp:
            result = json.loads(resp.read())
            return result["choices"][0]["message"]["content"]
    except Exception as e:
        print(f"AI error: {e}")
        return None

class Handler(BaseHTTPRequestHandler):
    def log_message(self, format, *args):
        pass

    def send_json(self, data, status=200):
        body = json.dumps(data, default=str).encode()
        self.send_response(status)
        for k, v in CORS.items():
            self.send_header(k, v)
        self.send_header("Content-Length", str(len(body)))
        self.end_headers()
        self.wfile.write(body)

    def do_OPTIONS(self):
        self.send_response(204)
        for k, v in CORS.items():
            self.send_header(k, v)
        self.end_headers()

    def get_body(self):
        length = int(self.headers.get("Content-Length", 0))
        if length:
            return json.loads(self.rfile.read(length))
        return {}

    def do_GET(self):
        self.handle_request("GET")

    def do_POST(self):
        self.handle_request("POST")

    def do_PUT(self):
        self.handle_request("PUT")

    def handle_request(self, method):
        parsed = urlparse(self.path)
        path = parsed.path.replace("/api", "", 1)
        qs = parse_qs(parsed.query)
        cid = qs.get("company_id", ["00000000-0000-0000-0000-000000000001"])[0]

        try:
            if path == "/dashboard" and method == "GET":
                mods = db_query(f"SELECT COUNT(*) as c FROM {SCHEMA}.learning_modules WHERE company_id=%s AND status='published'", [cid])
                regs = db_query(f"SELECT COUNT(*) as c FROM {SCHEMA}.regulations WHERE company_id=%s AND status='published'", [cid])
                emps = db_query(f"SELECT COUNT(*) as c FROM {SCHEMA}.employees WHERE company_id=%s", [cid])
                done = db_query(f"SELECT COUNT(*) as c FROM {SCHEMA}.module_progress WHERE status='completed' AND employee_id IN (SELECT id FROM {SCHEMA}.employees WHERE company_id=%s)", [cid])
                recent = db_query(f"SELECT lm.*, c.name as category_name, c.color as category_color FROM {SCHEMA}.learning_modules lm LEFT JOIN {SCHEMA}.categories c ON c.id=lm.category_id WHERE lm.company_id=%s ORDER BY lm.created_at DESC LIMIT 5", [cid])
                top = db_query(f"SELECT e.name, e.department, e.total_points FROM {SCHEMA}.employees e WHERE e.company_id=%s ORDER BY e.total_points DESC LIMIT 5", [cid])
                return self.send_json({"stats": {"modules": int(mods[0]["c"]), "regulations": int(regs[0]["c"]), "employees": int(emps[0]["c"]), "completions": int(done[0]["c"])}, "recentModules": recent, "topEmployees": top})

            elif path == "/modules" and method == "GET":
                rows = db_query(f"SELECT lm.*, c.name as category_name, c.color as category_color, (SELECT COUNT(*) FROM {SCHEMA}.lessons l WHERE l.module_id=lm.id) as lesson_count FROM {SCHEMA}.learning_modules lm LEFT JOIN {SCHEMA}.categories c ON c.id=lm.category_id WHERE lm.company_id=%s ORDER BY lm.sort_order, lm.created_at DESC", [cid])
                return self.send_json(rows)

            elif path == "/modules" and method == "POST":
                b = self.get_body()
                r = db_query(f"INSERT INTO {SCHEMA}.learning_modules (company_id,category_id,title,description,status,is_ai_generated,ai_topic,estimated_duration,points_reward,is_mandatory) VALUES (%s,%s,%s,%s,%s,%s,%s,%s,%s,%s) RETURNING *",
                    [cid, b.get("category_id"), b.get("title"), b.get("description",""), b.get("status","draft"), b.get("is_ai_generated",False), b.get("ai_topic"), b.get("estimated_duration",30), b.get("points_reward",10), b.get("is_mandatory",False)])
                return self.send_json(r[0], 201)

            elif path == "/regulations" and method == "GET":
                rows = db_query(f"SELECT r.*, c.name as category_name, c.color as category_color, (SELECT COUNT(*) FROM {SCHEMA}.regulation_acknowledgments ra WHERE ra.regulation_id=r.id) as ack_count FROM {SCHEMA}.regulations r LEFT JOIN {SCHEMA}.categories c ON c.id=r.category_id WHERE r.company_id=%s ORDER BY r.created_at DESC", [cid])
                return self.send_json(rows)

            elif path == "/regulations" and method == "POST":
                b = self.get_body()
                r = db_query(f"INSERT INTO {SCHEMA}.regulations (company_id,category_id,title,content,status,is_ai_generated,requires_acknowledgment,effective_date) VALUES (%s,%s,%s,%s,%s,%s,%s,%s) RETURNING *",
                    [cid, b.get("category_id"), b.get("title"), b.get("content",""), b.get("status","draft"), b.get("is_ai_generated",False), b.get("requires_acknowledgment",True), b.get("effective_date")])
                return self.send_json(r[0], 201)

            elif path == "/categories" and method == "GET":
                return self.send_json(db_query(f"SELECT * FROM {SCHEMA}.categories WHERE company_id=%s ORDER BY sort_order", [cid]))

            elif path == "/employees" and method == "GET":
                return self.send_json(db_query(f"SELECT e.*, COUNT(mp.id) FILTER (WHERE mp.status='completed') as completed_modules FROM {SCHEMA}.employees e LEFT JOIN {SCHEMA}.module_progress mp ON mp.employee_id=e.id WHERE e.company_id=%s GROUP BY e.id ORDER BY e.name", [cid]))

            elif path == "/analytics" and method == "GET":
                emp = db_query(f"SELECT e.name, e.department, e.position, e.total_points, COUNT(mp.id) FILTER (WHERE mp.status='completed') as completed, COUNT(mp.id) FILTER (WHERE mp.status='in_progress') as in_progress, COUNT(ra.id) as regulations_read, COALESCE(AVG(mp.score) FILTER (WHERE mp.score IS NOT NULL), 0) as avg_score FROM {SCHEMA}.employees e LEFT JOIN {SCHEMA}.module_progress mp ON mp.employee_id=e.id LEFT JOIN {SCHEMA}.regulation_acknowledgments ra ON ra.employee_id=e.id WHERE e.company_id=%s GROUP BY e.id ORDER BY e.total_points DESC", [cid])
                mods = db_query(f"SELECT lm.title, COUNT(mp.id) as total_attempts, COUNT(mp.id) FILTER (WHERE mp.status='completed') as completions, COALESCE(AVG(mp.score) FILTER (WHERE mp.score IS NOT NULL), 0) as avg_score FROM {SCHEMA}.learning_modules lm LEFT JOIN {SCHEMA}.module_progress mp ON mp.module_id=lm.id WHERE lm.company_id=%s GROUP BY lm.id", [cid])
                dept = db_query(f"SELECT e.department, COUNT(DISTINCT e.id) as employee_count, COUNT(mp.id) FILTER (WHERE mp.status='completed') as completed_modules, COALESCE(AVG(e.total_points), 0) as avg_points FROM {SCHEMA}.employees e LEFT JOIN {SCHEMA}.module_progress mp ON mp.employee_id=e.id WHERE e.company_id=%s AND e.department IS NOT NULL GROUP BY e.department ORDER BY avg_points DESC", [cid])
                return self.send_json({"employeeStats": emp, "moduleStats": mods, "deptStats": dept, "weeklyActivity": []})

            elif path == "/ai/generate-module" and method == "POST":
                b = self.get_body()
                topic = b.get("topic", "")
                cnt = int(b.get("lessons_count", 5))
                title = f"Модуль: {topic}"
                description = f"Учебный модуль по теме \"{topic}\""
                lessons = [{"title": f"Введение: {topic}" if i == 0 else f"Урок {i+1}", "type": "text", "content": f"## Урок {i+1}\n\nМатериал по теме **\"{topic}\"**.\n\n### Ключевые принципы\n- Системный подход\n- Практическое применение", "quiz": [{"question": "Главный принцип?", "options": [{"text": "Системный подход", "is_correct": True}, {"text": "Случайный метод", "is_correct": False}], "explanation": "Системный подход — основа"}]} for i in range(cnt)]

                if OPENAI_KEY:
                    prompt = f'Create learning module about "{topic}". {cnt} lessons in Russian. Return JSON only no markdown: {{"title":"","description":"","lessons":[{{"title":"","type":"text","content":"markdown","quiz":[{{"question":"","options":[{{"text":"","is_correct":true}}],"explanation":""}}]}}]}}'
                    ai_result = ai_complete(prompt)
                    if ai_result:
                        try:
                            parsed = json.loads(ai_result)
                            title = parsed.get("title", title)
                            description = parsed.get("description", description)
                            lessons = parsed.get("lessons", lessons)
                        except Exception:
                            pass

                r = db_query(f"INSERT INTO {SCHEMA}.learning_modules (company_id,category_id,title,description,status,is_ai_generated,ai_topic,estimated_duration,points_reward) VALUES (%s,%s,%s,%s,'draft',true,%s,%s,20) RETURNING *",
                    [cid, b.get("category_id"), title, description, topic, cnt * 9])
                return self.send_json({"module": r[0], "lessons": lessons})

            elif path == "/ai/generate-regulation" and method == "POST":
                b = self.get_body()
                topic = b.get("topic", "")
                content = f"# {topic}\n\n## 1. Общие положения\n\nНастоящий регламент устанавливает правила в области \"{topic}\".\n\n## 2. Требования\n\n- Соблюдение порядка\n- Документирование\n- Контроль\n\n## 3. Ответственность\n\nКонтроль возлагается на руководителей."
                if OPENAI_KEY:
                    prompt = f'Create corporate regulation about "{topic}" in Russian. Return JSON: {{"title":"","content":"markdown regulation text"}}'
                    ai_result = ai_complete(prompt)
                    if ai_result:
                        try:
                            parsed = json.loads(ai_result)
                            content = parsed.get("content", content)
                        except Exception:
                            pass
                r = db_query(f"INSERT INTO {SCHEMA}.regulations (company_id,category_id,title,content,status,is_ai_generated,requires_acknowledgment) VALUES (%s,%s,%s,%s,'draft',true,true) RETURNING *",
                    [cid, b.get("category_id"), f"Регламент: {topic}", content])
                return self.send_json(r[0])

            elif path == "/progress" and method == "POST":
                b = self.get_body()
                r = db_query(f"INSERT INTO {SCHEMA}.module_progress (employee_id,module_id,status,progress_percent,score,attempts,started_at,completed_at,time_spent) VALUES (%s,%s,%s,%s,%s,%s,NOW(),CASE WHEN %s='completed' THEN NOW() ELSE NULL END,%s) ON CONFLICT (employee_id,module_id) DO UPDATE SET status=%s,progress_percent=%s,completed_at=CASE WHEN %s='completed' THEN NOW() ELSE module_progress.completed_at END,time_spent=module_progress.time_spent+%s,updated_at=NOW() RETURNING *",
                    [b.get("employee_id"), b.get("module_id"), b.get("status"), b.get("progress_percent",0), b.get("score"), b.get("attempts",1), b.get("status"), b.get("time_spent",0), b.get("status"), b.get("progress_percent",0), b.get("status"), b.get("time_spent",0)])
                return self.send_json(r[0] if r else {})

            elif path == "/certifications" and method == "GET":
                return self.send_json(db_query(f"SELECT c.*, COUNT(cr.id) as total_attempts, COUNT(cr.id) FILTER (WHERE cr.passed=true) as passed_count FROM {SCHEMA}.certifications c LEFT JOIN {SCHEMA}.certification_results cr ON cr.certification_id=c.id WHERE c.company_id=%s GROUP BY c.id ORDER BY c.created_at DESC", [cid]))

            elif path == "/certifications" and method == "POST":
                b = self.get_body()
                r = db_query(f"INSERT INTO {SCHEMA}.certifications (company_id,title,description,module_ids,passing_score,validity_period) VALUES (%s,%s,%s,%s,%s,%s) RETURNING *",
                    [cid, b.get("title"), b.get("description",""), b.get("module_ids",[]), b.get("passing_score",80), b.get("validity_period")])
                return self.send_json(r[0], 201)

            elif path == "/widgets" and method == "GET":
                return self.send_json(db_query(f"SELECT * FROM {SCHEMA}.widget_settings WHERE company_id=%s ORDER BY position", [cid]))

            else:
                return self.send_json({"error": "Not found"}, 404)

        except Exception as e:
            print(f"Error: {e}")
            return self.send_json({"error": str(e)}, 500)

if __name__ == "__main__":
    print(f"KnowledgeAI API on port {PORT}")
    HTTPServer(("0.0.0.0", PORT), Handler).serve_forever()
