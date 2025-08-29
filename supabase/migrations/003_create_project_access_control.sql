-- Sistema de control de acceso por proyecto
-- Esto garantiza que cada MVP solo pueda acceder a sus propios datos

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

-- Políticas RLS (Row Level Security) para cada esquema de proyecto

-- Política para kuechen_meister
CREATE POLICY IF NOT EXISTS "Users can only access their own project data" ON kuechen_meister.*
    FOR ALL USING (
        check_project_access(auth.uid(), 'kuechen_meister')
    );

-- Política para sous_chef
CREATE POLICY IF NOT EXISTS "Users can only access their own project data" ON sous_chef.*
    FOR ALL USING (
        check_project_access(auth.uid(), 'sous_chef')
    );

-- Política para restaurant_analytics
CREATE POLICY IF NOT EXISTS "Users can only access their own project data" ON restaurant_analytics.*
    FOR ALL USING (
        check_project_access(auth.uid(), 'restaurant_analytics')
    );

-- Política para blog_system
CREATE POLICY IF NOT EXISTS "Users can only access their own project data" ON blog_system.*
    FOR ALL USING (
        check_project_access(auth.uid(), 'blog_system')
    );

-- Política para session_management
CREATE POLICY IF NOT EXISTS "Users can only access their own project data" ON session_management.*
    FOR ALL USING (
        check_project_access(auth.uid(), 'session_management')
    );

-- Función para cambiar automáticamente al esquema del proyecto del usuario
CREATE OR REPLACE FUNCTION auto_switch_to_user_project()
RETURNS VOID AS $$
DECLARE
    user_schema VARCHAR;
BEGIN
    -- Obtener el esquema del proyecto del usuario actual
    user_schema := get_user_project_schema(auth.uid());
    
    IF user_schema IS NOT NULL THEN
        -- Cambiar al esquema del proyecto del usuario
        PERFORM switch_to_project_schema(user_schema);
    ELSE
        -- Si no hay proyecto específico, usar el esquema por defecto
        SET search_path TO public;
    END IF;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger para ejecutar auto_switch_to_user_project antes de cada consulta
CREATE OR REPLACE FUNCTION trigger_project_schema_switch()
RETURNS TRIGGER AS $$
BEGIN
    PERFORM auto_switch_to_user_project();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Crear triggers en las tablas principales para cambiar automáticamente de esquema
-- Esto se puede hacer manualmente según las necesidades específicas

-- Función para crear nuevo proyecto con esquema aislado
CREATE OR REPLACE FUNCTION create_new_project(
    project_name VARCHAR,
    project_description TEXT,
    owner_email VARCHAR
)
RETURNS INTEGER AS $$
DECLARE
    new_project_id INTEGER;
    schema_name VARCHAR;
BEGIN
    -- Generar nombre de esquema único
    schema_name := 'project_' || lower(replace(project_name, ' ', '_')) || '_' || extract(epoch from now())::integer;
    
    -- Crear nuevo proyecto
    INSERT INTO public.project_registry (project_name, schema_name, description, owner_email)
    VALUES (project_name, schema_name, project_description, owner_email)
    RETURNING id INTO new_project_id;
    
    -- Crear esquema para el proyecto
    EXECUTE 'CREATE SCHEMA IF NOT EXISTS ' || quote_ident(schema_name);
    
    -- Crear rol para el proyecto
    EXECUTE 'CREATE ROLE IF NOT EXISTS ' || quote_ident(schema_name || '_user');
    
    RAISE NOTICE 'Created new project: % with schema: %', project_name, schema_name;
    
    RETURN new_project_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Función para desactivar proyecto (soft delete)
CREATE OR REPLACE FUNCTION deactivate_project(project_id INTEGER)
RETURNS VOID AS $$
BEGIN
    UPDATE public.project_registry 
    SET is_active = false 
    WHERE id = project_id;
    
    RAISE NOTICE 'Project % deactivated', project_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
