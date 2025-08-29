# 🛡️ Sistema de Aislamiento de Proyectos

## 📋 **Descripción General**

Este sistema garantiza que cada MVP en tu base de datos de Supabase esté completamente aislado, evitando cualquier cruce de datos entre proyectos. Cada proyecto tiene su propio esquema PostgreSQL y sistema de control de acceso.

## 🏗️ **Arquitectura del Sistema**

### **Esquemas de Base de Datos**
- `kuechen_meister` - Proyecto principal de gestión de cocina
- `sous_chef` - Sistema de asistente culinario
- `restaurant_analytics` - Análisis de restaurantes
- `blog_system` - Sistema de blog
- `session_management` - Control de sesiones
- `public` - Esquema compartido (solo metadatos y control)

### **Componentes de Seguridad**
1. **Esquemas Separados**: Cada proyecto tiene su propio namespace
2. **Control de Acceso**: Usuarios solo pueden acceder a proyectos autorizados
3. **Políticas RLS**: Row Level Security a nivel de esquema
4. **Roles de Usuario**: Permisos específicos por proyecto
5. **Auditoría**: Registro de acceso y cambios

## 🚀 **Implementación**

### **1. Aplicar Migraciones**
```sql
-- Ejecutar en Supabase SQL Editor
\i apply-migrations.sql
```

### **2. Configurar Usuarios por Proyecto**
```sql
-- Asignar usuario a proyecto específico
INSERT INTO public.project_users (user_id, project_id, role, permissions)
VALUES (
    'uuid-del-usuario',
    (SELECT id FROM public.project_registry WHERE project_name = 'Kuechen Meister'),
    'admin',
    '{"read": true, "write": true, "delete": true}'
);
```

### **3. Usar en el Código**
```typescript
import { projectSupabase } from '@/integrations/supabase/project-client'

// Cambiar al proyecto específico
await projectSupabase.switchToProject('Kuechen Meister')

// Ejecutar consultas aisladas
const { data, error } = await projectSupabase.queryInProject(async (client) => {
  return await client
    .from('recipes')
    .select('*')
    .limit(10)
})
```

## 🔒 **Características de Seguridad**

### **Aislamiento de Datos**
- ✅ **Esquemas Separados**: Cada proyecto tiene su propio esquema
- ✅ **Sin Cruces**: Imposible acceder a datos de otros proyectos
- ✅ **Políticas RLS**: Control a nivel de fila por proyecto
- ✅ **Roles Específicos**: Permisos granulares por proyecto

### **Control de Acceso**
- ✅ **Verificación de Usuario**: Solo usuarios autorizados pueden acceder
- ✅ **Validación de Proyecto**: Verificación automática de permisos
- ✅ **Auditoría**: Registro de todas las operaciones
- ✅ **Soft Delete**: Proyectos se pueden desactivar sin perder datos

### **Funciones de Gestión**
- ✅ **Crear Proyectos**: Nuevos MVPs con esquemas aislados
- ✅ **Desactivar Proyectos**: Desactivar sin eliminar datos
- ✅ **Limpiar Datos**: Función para limpiar datos específicos
- ✅ **Estadísticas**: Monitoreo de uso por proyecto

## 📊 **Estructura de Datos**

### **Tabla de Registro de Proyectos**
```sql
CREATE TABLE public.project_registry (
    id SERIAL PRIMARY KEY,
    project_name VARCHAR(100) UNIQUE NOT NULL,
    schema_name VARCHAR(100) UNIQUE NOT NULL,
    description TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    is_active BOOLEAN DEFAULT true,
    owner_email VARCHAR(255)
);
```

### **Tabla de Usuarios por Proyecto**
```sql
CREATE TABLE public.project_users (
    id SERIAL PRIMARY KEY,
    user_id UUID REFERENCES auth.users(id),
    project_id INTEGER REFERENCES public.project_registry(id),
    role VARCHAR(50) DEFAULT 'user',
    permissions JSONB DEFAULT '{}',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    last_access TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    is_active BOOLEAN DEFAULT true
);
```

## 🧪 **Pruebas de Aislamiento**

### **Verificar Aislamiento**
```sql
-- Cambiar a proyecto específico
SELECT switch_to_project_schema('kuechen_meister');

-- Verificar que solo se ven las tablas del proyecto
SELECT table_name FROM information_schema.tables 
WHERE table_schema = 'kuechen_meister';

-- Verificar acceso de usuario
SELECT check_project_access('uuid-usuario', 'kuechen_meister');
```

### **Probar Cruce de Datos**
```sql
-- Esto debería fallar si el usuario no tiene acceso
SELECT * FROM restaurant_analytics.restaurant_analyses;
-- Error: permission denied for schema restaurant_analytics
```

## 🚨 **Consideraciones Importantes**

### **Antes de la Migración**
1. **Backup**: Hacer backup completo de la base de datos
2. **Testing**: Probar en un entorno de desarrollo
3. **Downtime**: Planificar ventana de mantenimiento
4. **Rollback**: Tener plan de reversión

### **Durante la Migración**
1. **Verificación**: Confirmar que cada tabla se movió correctamente
2. **Vistas**: Las vistas mantienen compatibilidad temporal
3. **Permisos**: Verificar que los usuarios mantienen acceso
4. **Testing**: Probar funcionalidad después de cada paso

### **Después de la Migración**
1. **Monitoreo**: Verificar que no hay errores de acceso
2. **Performance**: Monitorear rendimiento de consultas
3. **Limpieza**: Remover vistas temporales cuando sea seguro
4. **Documentación**: Actualizar código para usar nuevos esquemas

## 🔧 **Mantenimiento**

### **Comandos Útiles**
```sql
-- Ver estadísticas de uso por proyecto
SELECT * FROM get_project_usage_stats();

-- Limpiar datos de proyecto específico
SELECT cleanup_project_data('restaurant_analytics');

-- Desactivar proyecto
SELECT deactivate_project(1);

-- Verificar políticas RLS
SELECT * FROM pg_policies WHERE schemaname = 'kuechen_meister';
```

### **Monitoreo Continuo**
- ✅ **Logs de Acceso**: Revisar intentos de acceso no autorizado
- ✅ **Uso de Recursos**: Monitorear espacio y rendimiento por proyecto
- ✅ **Políticas RLS**: Verificar que las políticas estén activas
- ✅ **Usuarios Activos**: Revisar usuarios con acceso a cada proyecto

## 📞 **Soporte y Troubleshooting**

### **Problemas Comunes**
1. **Error de Permisos**: Verificar que el usuario esté en `project_users`
2. **Esquema No Encontrado**: Confirmar que el esquema existe y está activo
3. **Políticas RLS**: Verificar que las políticas estén habilitadas
4. **Vistas Rotas**: Confirmar que las tablas base existen en el esquema correcto

### **Comandos de Diagnóstico**
```sql
-- Verificar estado de esquemas
SELECT schema_name, schema_owner FROM information_schema.schemata;

-- Verificar políticas RLS
SELECT * FROM pg_policies;

-- Verificar usuarios por proyecto
SELECT * FROM public.project_users WHERE is_active = true;

-- Verificar funciones del sistema
SELECT routine_name FROM information_schema.routines 
WHERE routine_schema = 'public' AND routine_name LIKE '%project%';
```

---

## 🎯 **Resumen de Beneficios**

✅ **Aislamiento Total**: Cada MVP está completamente separado  
✅ **Seguridad Robusta**: Control de acceso granular y políticas RLS  
✅ **Escalabilidad**: Fácil agregar nuevos proyectos sin afectar existentes  
✅ **Mantenimiento**: Gestión centralizada de todos los proyectos  
✅ **Compliance**: Cumple con estándares de seguridad de datos  
✅ **Performance**: Consultas optimizadas por esquema  

**¡Tu base de datos ahora está completamente protegida contra cruces de datos entre proyectos!**
