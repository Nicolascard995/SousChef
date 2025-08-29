-- Migración para mover tablas existentes a esquemas de proyecto
-- Esto asegura que cada MVP tenga sus datos completamente aislados

-- Mover tablas de Kuechen Meister al esquema correspondiente
-- (Estas serán las tablas principales del proyecto actual)

-- Mover tablas de Restaurant Analytics
DO $$ 
BEGIN
    -- Verificar si la tabla existe antes de moverla
    IF EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'restaurant_analyses' AND table_schema = 'public') THEN
        ALTER TABLE public.restaurant_analyses SET SCHEMA restaurant_analytics;
        RAISE NOTICE 'Moved restaurant_analyses to restaurant_analytics schema';
    END IF;
    
    IF EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'ai_advice' AND table_schema = 'public') THEN
        ALTER TABLE public.ai_advice SET SCHEMA restaurant_analytics;
        RAISE NOTICE 'Moved ai_advice to restaurant_analytics schema';
    END IF;
END $$;

-- Mover tablas de Blog System
DO $$ 
BEGIN
    IF EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'blog_posts' AND table_schema = 'public') THEN
        ALTER TABLE public.blog_posts SET SCHEMA blog_system;
        RAISE NOTICE 'Moved blog_posts to blog_system schema';
    END IF;
    
    IF EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'posts' AND table_schema = 'public') THEN
        ALTER TABLE public.posts SET SCHEMA blog_system;
        RAISE NOTICE 'Moved posts to blog_system schema';
    END IF;
END $$;

-- Mover tablas de Session Management
DO $$ 
BEGIN
    IF EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'session_control' AND table_schema = 'public') THEN
        ALTER TABLE public.session_control SET SCHEMA session_management;
        RAISE NOTICE 'Moved session_control to session_management schema';
    END IF;
END $$;

-- Crear vistas para mantener compatibilidad temporal (opcional)
-- Estas vistas permiten que el código existente siga funcionando mientras se migra

-- Vista para restaurant_analyses
CREATE OR REPLACE VIEW public.restaurant_analyses AS 
SELECT * FROM restaurant_analytics.restaurant_analyses;

-- Vista para ai_advice
CREATE OR REPLACE VIEW public.ai_advice AS 
SELECT * FROM restaurant_analytics.ai_advice;

-- Vista para blog_posts
CREATE OR REPLACE VIEW public.blog_posts AS 
SELECT * FROM blog_system.blog_posts;

-- Vista para posts
CREATE OR REPLACE VIEW public.posts AS 
SELECT * FROM blog_system.posts;

-- Vista para session_control
CREATE OR REPLACE VIEW public.session_control AS 
SELECT * FROM session_management.session_control;

-- Crear función para obtener estadísticas de uso por proyecto
CREATE OR REPLACE FUNCTION get_project_usage_stats()
RETURNS TABLE (
    project_name VARCHAR,
    schema_name VARCHAR,
    table_count BIGINT,
    total_rows BIGINT,
    last_activity TIMESTAMP WITH TIME ZONE
) AS $$
BEGIN
    RETURN QUERY
    SELECT 
        pr.project_name,
        pr.schema_name,
        COALESCE(table_stats.table_count, 0) as table_count,
        COALESCE(table_stats.total_rows, 0) as total_rows,
        pr.created_at as last_activity
    FROM public.project_registry pr
    LEFT JOIN (
        SELECT 
            table_schema,
            COUNT(*) as table_count,
            SUM(reltuples) as total_rows
        FROM information_schema.tables t
        JOIN pg_class c ON c.relname = t.table_name
        WHERE table_schema IN ('kuechen_meister', 'sous_chef', 'restaurant_analytics', 'blog_system', 'session_management')
        GROUP BY table_schema
    ) table_stats ON table_stats.table_schema = pr.schema_name
    WHERE pr.is_active = true
    ORDER BY pr.project_name;
END;
$$ LANGUAGE plpgsql;

-- Crear función para limpiar datos de proyectos específicos
CREATE OR REPLACE FUNCTION cleanup_project_data(project_schema VARCHAR)
RETURNS VOID AS $$
DECLARE
    table_record RECORD;
BEGIN
    -- Verificar que el esquema existe
    IF NOT EXISTS (SELECT 1 FROM information_schema.schemata WHERE schema_name = project_schema) THEN
        RAISE EXCEPTION 'Schema % does not exist', project_schema;
    END IF;
    
    -- Limpiar todas las tablas del esquema del proyecto
    FOR table_record IN 
        SELECT table_name 
        FROM information_schema.tables 
        WHERE table_schema = project_schema
    LOOP
        EXECUTE 'TRUNCATE TABLE ' || quote_ident(project_schema) || '.' || quote_ident(table_record.table_name) || ' RESTART IDENTITY CASCADE';
        RAISE NOTICE 'Cleaned table: %.%', project_schema, table_record.table_name;
    END LOOP;
    
    RAISE NOTICE 'All data cleaned from project schema: %', project_schema;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Crear índices en las vistas para mejorar rendimiento
CREATE INDEX IF NOT EXISTS idx_restaurant_analyses_view ON public.restaurant_analyses(id);
CREATE INDEX IF NOT EXISTS idx_ai_advice_view ON public.ai_advice(id);
CREATE INDEX IF NOT EXISTS idx_blog_posts_view ON public.blog_posts(id);
CREATE INDEX IF NOT EXISTS idx_posts_view ON public.posts(id);
CREATE INDEX IF NOT EXISTS idx_session_control_view ON public.session_control(id);
