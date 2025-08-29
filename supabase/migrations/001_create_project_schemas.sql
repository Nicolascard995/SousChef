-- Migración para crear esquemas separados por proyecto
-- Esto asegura que cada MVP esté completamente aislado

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

-- Comentarios para documentación
COMMENT ON TABLE public.project_registry IS 'Registro central de todos los proyectos en la base de datos';
COMMENT ON FUNCTION switch_to_project_schema IS 'Cambia al esquema del proyecto especificado';
COMMENT ON FUNCTION get_current_project_schema IS 'Obtiene el esquema del proyecto actualmente activo';
COMMENT ON FUNCTION cleanup_inactive_projects IS 'Limpia esquemas de proyectos inactivos';
