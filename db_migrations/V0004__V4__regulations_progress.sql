CREATE TABLE IF NOT EXISTS regulations (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    company_id UUID NOT NULL REFERENCES companies(id),
    category_id UUID REFERENCES categories(id),
    created_by UUID REFERENCES employees(id),
    title VARCHAR(500) NOT NULL,
    content TEXT,
    version VARCHAR(50) DEFAULT '1.0',
    status VARCHAR(50) DEFAULT 'draft',
    is_ai_generated BOOLEAN DEFAULT false,
    requires_acknowledgment BOOLEAN DEFAULT true,
    effective_date DATE,
    tags TEXT[] DEFAULT '{}',
    metadata JSONB DEFAULT '{}',
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS module_progress (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    employee_id UUID NOT NULL REFERENCES employees(id),
    module_id UUID NOT NULL REFERENCES learning_modules(id),
    status VARCHAR(50) DEFAULT 'not_started',
    progress_percent INTEGER DEFAULT 0,
    score INTEGER,
    attempts INTEGER DEFAULT 0,
    started_at TIMESTAMPTZ,
    completed_at TIMESTAMPTZ,
    time_spent INTEGER DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(employee_id, module_id)
);

CREATE TABLE IF NOT EXISTS lesson_progress (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    employee_id UUID NOT NULL REFERENCES employees(id),
    lesson_id UUID NOT NULL REFERENCES lessons(id),
    is_completed BOOLEAN DEFAULT false,
    time_spent INTEGER DEFAULT 0,
    completed_at TIMESTAMPTZ,
    UNIQUE(employee_id, lesson_id)
);

CREATE TABLE IF NOT EXISTS regulation_acknowledgments (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    employee_id UUID NOT NULL REFERENCES employees(id),
    regulation_id UUID NOT NULL REFERENCES regulations(id),
    acknowledged_at TIMESTAMPTZ DEFAULT NOW(),
    ip_address VARCHAR(50),
    UNIQUE(employee_id, regulation_id)
);
