-- Script para aplicar todas las migraciones de aislamiento de proyectos
-- Ejecuta este script en tu base de datos de Supabase para implementar el aislamiento completo

-- 1. Crear esquemas y sistema de control
\echo '🔐 Creando esquemas separados por proyecto...'
\i supabase/migrations/001_create_project_schemas.sql

\echo '📊 Migrando tablas existentes...'
\i supabase/migrations/002_migrate_existing_tables.sql

\echo '🛡️ Implementando control de acceso...'
\i supabase/migrations/003_create_project_access_control.sql

-- 2. Verificar que todo se creó correctamente
\echo '✅ Verificando implementación...'

-- Verificar esquemas creados
SELECT 
    schema_name,
    schema_owner
FROM information_schema.schemata 
WHERE schema_name IN ('kuechen_meister', 'sous_chef', 'restaurant_analytics', 'blog_system', 'session_management')
ORDER BY schema_name;

-- Verificar tabla de registro de proyectos
SELECT 
    project_name,
    schema_name,
    is_active,
    created_at
FROM public.project_registry
ORDER BY project_name;

-- Verificar funciones creadas
SELECT 
    routine_name,
    routine_type
FROM information_schema.routines 
WHERE routine_schema = 'public' 
AND routine_name LIKE '%project%'
ORDER BY routine_name;

-- Verificar políticas RLS
SELECT 
    schemaname,
    tablename,
    policyname,
    permissive,
    roles,
    cmd,
    qual
FROM pg_policies 
WHERE schemaname IN ('kuechen_meister', 'sous_chef', 'restaurant_analytics', 'blog_system', 'session_management')
ORDER BY schemaname, tablename;

\echo '🎉 ¡Migración completada exitosamente!'
\echo ''
\echo '📋 Resumen de lo implementado:'
\echo '   ✅ Esquemas separados por proyecto'
\echo '   ✅ Sistema de control de acceso'
\echo '   ✅ Políticas RLS para aislamiento'
\echo '   ✅ Funciones de gestión de proyectos'
\echo '   ✅ Tablas existentes migradas'
\echo ''
\echo '🚀 Próximos pasos:'
\echo '   1. Configurar usuarios por proyecto en project_users'
\echo '   2. Probar el aislamiento con diferentes usuarios'
\echo '   3. Usar el cliente ProjectIsolatedSupabaseClient en tu código'
\echo '   4. Ejecutar: npm run dev para probar la aplicación'
