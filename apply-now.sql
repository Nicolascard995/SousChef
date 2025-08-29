-- 🚀 APLICAR MIGRACIONES DE AISLAMIENTO DE PROYECTOS
-- Ejecuta este script directamente en tu Supabase SQL Editor

-- =====================================================
-- 1. CREAR ESQUEMAS SEPARADOS POR PROYECTO
-- =====================================================

-- Crear esquemas para cada proyecto
CREATE SCHEMA IF NOT EXISTS kuechen_meister;
CREATE SCHEMA IF NOT EXISTS sous_chef;
CREATE SCHEMA IF NOT EXISTS restaurant_analytics;
CREATE SCHEMA IF NOT EXISTS blog_system;
CREATE SCHEMA IF NOT EXISTS session_management;

-- Crear tabla de control de proyectos
CREATE TABLE IF NOT EXISTS public.project_registry (
    id SERIAL PRIMARY KEY,
    project_name VARCHAR(100) UNIQUE NOT NULL,
    schema_name VARCHAR(100) UNIQUE NOT NULL,
    description TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    is_active BOOLEAN DEFAULT true,
    owner_email VARCHAR(255)
);

-- Insertar proyectos existentes
INSERT INTO public.project_registry (project_name, schema_name, description) VALUES
    ('Kuechen Meister', 'kuechen_meister', 'Sistema principal de gestión de cocina'),
    ('Sous Chef', 'sous_chef', 'Sistema de asistente culinario'),
    ('Restaurant Analytics', 'restaurant_analytics', 'Análisis de restaurantes'),
    ('Blog System', 'blog_system', 'Sistema de blog'),
    ('Session Management', 'session_management', 'Control de sesiones')
ON CONFLICT (project_name) DO NOTHING;

-- Crear función para cambiar al esquema del proyecto activo
CREATE OR REPLACE FUNCTION switch_to_project_schema(project_schema VARCHAR)
RETURNS VOID AS $$
BEGIN
    -- Verificar que el esquema existe
    IF NOT EXISTS (SELECT 1 FROM information_schema.schemata WHERE schema_name = project_schema) THEN
        RAISE EXCEPTION 'Schema % does not exist', project_schema;
    END IF;
    
    -- Cambiar search_path al esquema del proyecto
    SET search_path TO project_schema, public;
    
    RAISE NOTICE 'Switched to project schema: %', project_schema;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Crear función para obtener el esquema del proyecto actual
CREATE OR REPLACE FUNCTION get_current_project_schema()
RETURNS VARCHAR AS $$
BEGIN
    RETURN current_setting('search_path', true);
END;
$$ LANGUAGE plpgsql;

-- Crear función para limpiar esquemas de proyectos inactivos
CREATE OR REPLACE FUNCTION cleanup_inactive_projects()
RETURNS VOID AS $$
DECLARE
    project_record RECORD;
BEGIN
    FOR project_record IN 
        SELECT schema_name 
        FROM public.project_registry 
        WHERE is_active = false
    LOOP
        EXECUTE 'DROP SCHEMA IF EXISTS ' || quote_ident(project_record.schema_name) || ' CASCADE';
        RAISE NOTICE 'Dropped inactive project schema: %', project_record.schema_name;
    END LOOP;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Crear índices para mejorar rendimiento
CREATE INDEX IF NOT EXISTS idx_project_registry_active ON public.project_registry(is_active);
CREATE INDEX IF NOT EXISTS idx_project_registry_name ON public.project_registry(project_name);

-- =====================================================
-- 2. MIGRAR TABLAS EXISTENTES A ESQUEMAS CORRESPONDIENTES
-- =====================================================

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

-- Crear vistas para mantener compatibilidad temporal
CREATE OR REPLACE VIEW public.restaurant_analyses AS 
SELECT * FROM restaurant_analytics.restaurant_analyses;

CREATE OR REPLACE VIEW public.ai_advice AS 
SELECT * FROM restaurant_analytics.ai_advice;

CREATE OR REPLACE VIEW public.blog_posts AS 
SELECT * FROM blog_system.blog_posts;

CREATE OR REPLACE VIEW public.posts AS 
SELECT * FROM blog_system.posts;

CREATE OR REPLACE VIEW public.session_control AS 
SELECT * FROM session_management.session_control;

-- =====================================================
-- 3. IMPLEMENTAR CONTROL DE ACCESO POR PROYECTO
-- =====================================================

-- Crear roles para cada proyecto
DO $$ 
BEGIN
    -- Crear rol para Kuechen Meister
    IF NOT EXISTS (SELECT 1 FROM pg_roles WHERE rolname = 'kuechen_meister_user') THEN
        CREATE ROLE kuechen_meister_user;
    END IF;
    
    -- Crear rol para Sous Chef
    IF NOT EXISTS (SELECT 1 FROM pg_roles WHERE rolname = 'sous_chef_user') THEN
        CREATE ROLE sous_chef_user;
    END IF;
    
    -- Crear rol para Restaurant Analytics
    IF NOT EXISTS (SELECT 1 FROM pg_roles WHERE rolname = 'restaurant_analytics_user') THEN
        CREATE ROLE restaurant_analytics_user;
    END IF;
    
    -- Crear rol para Blog System
    IF NOT EXISTS (SELECT 1 FROM pg_roles WHERE rolname = 'blog_system_user') THEN
        CREATE ROLE blog_system_user;
    END IF;
    
    -- Crear rol para Session Management
    IF NOT EXISTS (SELECT 1 FROM pg_roles WHERE rolname = 'session_management_user') THEN
        CREATE ROLE session_management_user;
    END IF;
END $$;

-- Crear tabla de usuarios por proyecto
CREATE TABLE IF NOT EXISTS public.project_users (
    id SERIAL PRIMARY KEY,
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    project_id INTEGER REFERENCES public.project_registry(id) ON DELETE CASCADE,
    role VARCHAR(50) DEFAULT 'user',
    permissions JSONB DEFAULT '{}',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    last_access TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    is_active BOOLEAN DEFAULT true,
    UNIQUE(user_id, project_id)
);

-- Crear índices para mejorar rendimiento
CREATE INDEX IF NOT EXISTS idx_project_users_user_id ON public.project_users(user_id);
CREATE INDEX IF NOT EXISTS idx_project_users_project_id ON public.project_users(project_id);
CREATE INDEX IF NOT EXISTS idx_project_users_active ON public.project_users(is_active);

-- Función para verificar acceso a proyecto
CREATE OR REPLACE FUNCTION check_project_access(
    user_uuid UUID,
    project_schema VARCHAR
)
RETURNS BOOLEAN AS $$
DECLARE
    has_access BOOLEAN := FALSE;
BEGIN
    -- Verificar si el usuario tiene acceso al proyecto
    SELECT EXISTS(
        SELECT 1 
        FROM public.project_users pu
        JOIN public.project_registry pr ON pr.id = pu.project_id
        WHERE pu.user_id = user_uuid 
        AND pr.schema_name = project_schema
        AND pu.is_active = true
        AND pr.is_active = true
    ) INTO has_access;
    
    RETURN has_access;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Función para obtener esquema del proyecto del usuario
CREATE OR REPLACE FUNCTION get_user_project_schema(user_uuid UUID)
RETURNS VARCHAR AS $$
DECLARE
    project_schema VARCHAR;
BEGIN
    SELECT pr.schema_name INTO project_schema
    FROM public.project_users pu
    JOIN public.project_registry pr ON pr.id = pu.project_id
    WHERE pu.user_id = user_uuid 
    AND pu.is_active = true
    AND pr.is_active = true
    LIMIT 1;
    
    RETURN project_schema;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- =====================================================
-- 4. VERIFICAR IMPLEMENTACIÓN
-- =====================================================

-- Verificar esquemas creados
SELECT '✅ Esquemas creados:' as status;
SELECT 
    schema_name,
    schema_owner
FROM information_schema.schemata 
WHERE schema_name IN ('kuechen_meister', 'sous_chef', 'restaurant_analytics', 'blog_system', 'session_management')
ORDER BY schema_name;

-- Verificar tabla de registro de proyectos
SELECT '✅ Proyectos registrados:' as status;
SELECT 
    project_name,
    schema_name,
    is_active,
    created_at
FROM public.project_registry
ORDER BY project_name;

-- Verificar funciones creadas
SELECT '✅ Funciones del sistema:' as status;
SELECT 
    routine_name,
    routine_type
FROM information_schema.routines 
WHERE routine_schema = 'public' 
AND routine_name LIKE '%project%'
ORDER BY routine_name;

-- Verificar roles creados
SELECT '✅ Roles de proyecto:' as status;
SELECT rolname FROM pg_roles WHERE rolname LIKE '%_user';

-- =====================================================
-- 5. CONFIGURACIÓN INMEDIATA
-- =====================================================

-- Asignar tu usuario actual al proyecto Kuechen Meister (ajusta el UUID)
-- Descomenta y ajusta la siguiente línea con tu UUID real:
-- INSERT INTO public.project_users (user_id, project_id, role) VALUES (
--     'tu-uuid-aqui',
--     (SELECT id FROM public.project_registry WHERE project_name = 'Kuechen Meister'),
--     'admin'
-- );

SELECT '🎉 ¡Migración completada exitosamente!' as resultado;
SELECT '📋 Esquemas creados: kuechen_meister, sous_chef, restaurant_analytics, blog_system, session_management' as detalles;
SELECT '🛡️ Sistema de aislamiento activo' as seguridad;
SELECT '🚀 Tu base de datos está lista para usar con aislamiento por proyecto' as siguiente_paso;
