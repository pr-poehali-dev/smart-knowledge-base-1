CREATE TABLE IF NOT EXISTS certifications (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    company_id UUID NOT NULL REFERENCES companies(id),
    title VARCHAR(500) NOT NULL,
    description TEXT,
    module_ids UUID[] DEFAULT '{}',
    passing_score INTEGER DEFAULT 80,
    certificate_template TEXT,
    validity_period INTEGER,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS certification_results (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    employee_id UUID NOT NULL REFERENCES employees(id),
    certification_id UUID NOT NULL REFERENCES certifications(id),
    score INTEGER NOT NULL,
    passed BOOLEAN NOT NULL,
    completed_at TIMESTAMPTZ DEFAULT NOW(),
    expires_at TIMESTAMPTZ,
    certificate_url TEXT
);

CREATE TABLE IF NOT EXISTS training_assignments (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    company_id UUID NOT NULL REFERENCES companies(id),
    employee_id UUID REFERENCES employees(id),
    department VARCHAR(255),
    module_id UUID REFERENCES learning_modules(id),
    regulation_id UUID REFERENCES regulations(id),
    due_date TIMESTAMPTZ,
    assigned_by UUID REFERENCES employees(id),
    is_mandatory BOOLEAN DEFAULT false,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS notifications (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    company_id UUID NOT NULL REFERENCES companies(id),
    employee_id UUID REFERENCES employees(id),
    type VARCHAR(100) NOT NULL,
    title VARCHAR(500) NOT NULL,
    body TEXT,
    is_read BOOLEAN DEFAULT false,
    metadata JSONB DEFAULT '{}',
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS widget_settings (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    company_id UUID NOT NULL REFERENCES companies(id),
    widget_type VARCHAR(100) NOT NULL,
    title VARCHAR(255),
    config JSONB DEFAULT '{}',
    is_active BOOLEAN DEFAULT true,
    position INTEGER DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS ai_generations (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    company_id UUID NOT NULL REFERENCES companies(id),
    employee_id UUID REFERENCES employees(id),
    type VARCHAR(50) NOT NULL,
    topic TEXT NOT NULL,
    prompt TEXT,
    result_id UUID,
    tokens_used INTEGER DEFAULT 0,
    status VARCHAR(50) DEFAULT 'pending',
    error_message TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_employees_company ON employees(company_id);
CREATE INDEX IF NOT EXISTS idx_modules_company ON learning_modules(company_id);
CREATE INDEX IF NOT EXISTS idx_lessons_module ON lessons(module_id);
CREATE INDEX IF NOT EXISTS idx_regulations_company ON regulations(company_id);
CREATE INDEX IF NOT EXISTS idx_module_progress_employee ON module_progress(employee_id);
CREATE INDEX IF NOT EXISTS idx_regulation_ack_employee ON regulation_acknowledgments(employee_id);
CREATE INDEX IF NOT EXISTS idx_notifications_employee ON notifications(employee_id, is_read);
