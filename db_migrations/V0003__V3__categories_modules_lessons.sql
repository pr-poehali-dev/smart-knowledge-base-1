CREATE TABLE IF NOT EXISTS categories (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    company_id UUID NOT NULL REFERENCES companies(id),
    name VARCHAR(255) NOT NULL,
    description TEXT,
    color VARCHAR(50) DEFAULT '#6366f1',
    icon VARCHAR(50) DEFAULT 'BookOpen',
    parent_id UUID REFERENCES categories(id),
    sort_order INTEGER DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS learning_modules (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    company_id UUID NOT NULL REFERENCES companies(id),
    category_id UUID REFERENCES categories(id),
    created_by UUID REFERENCES employees(id),
    title VARCHAR(500) NOT NULL,
    description TEXT,
    cover_image TEXT,
    status VARCHAR(50) DEFAULT 'draft',
    is_ai_generated BOOLEAN DEFAULT false,
    ai_topic TEXT,
    ai_prompt TEXT,
    estimated_duration INTEGER DEFAULT 30,
    passing_score INTEGER DEFAULT 80,
    points_reward INTEGER DEFAULT 10,
    is_mandatory BOOLEAN DEFAULT false,
    sort_order INTEGER DEFAULT 0,
    metadata JSONB DEFAULT '{}',
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS lessons (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    module_id UUID NOT NULL REFERENCES learning_modules(id),
    title VARCHAR(500) NOT NULL,
    content TEXT,
    content_type VARCHAR(50) DEFAULT 'text',
    video_url TEXT,
    duration INTEGER DEFAULT 0,
    sort_order INTEGER DEFAULT 0,
    is_ai_generated BOOLEAN DEFAULT false,
    metadata JSONB DEFAULT '{}',
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS quiz_questions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    lesson_id UUID NOT NULL REFERENCES lessons(id),
    question TEXT NOT NULL,
    question_type VARCHAR(50) DEFAULT 'single',
    options JSONB DEFAULT '[]',
    explanation TEXT,
    points INTEGER DEFAULT 1,
    sort_order INTEGER DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW()
);
