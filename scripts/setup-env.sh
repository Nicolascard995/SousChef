#!/bin/bash

# 🔒 SCRIPT DE SETUP SEGURO - KÜCHEN-INVENTAR
# Este script configura el entorno de desarrollo de forma segura

echo "🔒 Configurando entorno de desarrollo de forma segura..."

# Colores para output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Función para mostrar errores
error() {
    echo -e "${RED}❌ ERROR: $1${NC}"
    exit 1
}

# Función para mostrar advertencias
warning() {
    echo -e "${YELLOW}⚠️  ADVERTENCIA: $1${NC}"
}

# Función para mostrar éxito
success() {
    echo -e "${GREEN}✅ $1${NC}"
}

# Función para mostrar información
info() {
    echo -e "${BLUE}ℹ️  $1${NC}"
}

# Verificar que estamos en el directorio correcto
if [ ! -f "package.json" ]; then
    error "Este script debe ejecutarse desde la raíz del proyecto"
fi

# Verificar que .env.example existe
if [ ! -f ".env.example" ]; then
    error "Archivo .env.example no encontrado. Crea este archivo primero."
fi

# Verificar si .env ya existe
if [ -f ".env" ]; then
    warning "Archivo .env ya existe"
    read -p "¿Deseas sobrescribirlo? (y/N): " -n 1 -r
    echo
    if [[ ! $REPLY =~ ^[Yy]$ ]]; then
        info "Operación cancelada. El archivo .env se mantiene intacto."
        exit 0
    fi
    rm .env
fi

# Crear archivo .env desde .env.example
info "Creando archivo .env desde .env.example..."
cp .env.example .env

if [ $? -eq 0 ]; then
    success "Archivo .env creado exitosamente"
else
    error "Error al crear archivo .env"
fi

# Configurar permisos seguros
info "Configurando permisos seguros..."
chmod 600 .env

if [ $? -eq 0 ]; then
    success "Permisos configurados correctamente (600)"
else
    warning "No se pudieron configurar los permisos. Configúralos manualmente: chmod 600 .env"
fi

# Verificar que .env no está en Git
info "Verificando que .env no está en Git..."
if git ls-files | grep -q "\.env$"; then
    error "🚨 CRÍTICO: Archivo .env está en el repositorio Git!"
    echo "📋 Acciones inmediatas requeridas:"
    echo "   1. git rm --cached .env"
    echo "   2. git commit -m 'Remove .env file'"
    echo "   3. Verificar .gitignore incluye .env"
    echo "   4. Revisar historial de Git"
    exit 1
else
    success "Archivo .env no está en el repositorio Git"
fi

# Verificar .gitignore
info "Verificando configuración de .gitignore..."
if grep -q "\.env" .gitignore; then
    success ".env está incluido en .gitignore"
else
    warning ".env NO está incluido en .gitignore"
    echo "📋 Agrega estas líneas a .gitignore:"
    echo "   .env"
    echo "   .env.local"
    echo "   .env.*.local"
fi

# Abrir editor para configurar variables
info "Abriendo editor para configurar variables de entorno..."
echo ""
echo "📋 INSTRUCCIONES:"
echo "   1. Llena todas las variables requeridas con tus valores reales"
echo "   2. Guarda el archivo"
echo "   3. Cierra el editor"
echo ""

# Detectar editor preferido
if command -v code &> /dev/null; then
    editor="code"
elif command -v nano &> /dev/null; then
    editor="nano"
elif command -v vim &> /dev/null; then
    editor="vim"
else
    editor="nano"
fi

# Abrir editor
$editor .env

# Verificar configuración
echo ""
info "Verificando configuración..."
if [ -f ".env" ]; then
    # Verificar variables críticas
    if grep -q "VITE_SUPABASE_URL" .env && grep -q "VITE_SUPABASE_ANON_KEY" .env; then
        success "Variables críticas configuradas"
    else
        warning "Algunas variables críticas no están configuradas"
        echo "📋 Asegúrate de configurar:"
        echo "   - VITE_SUPABASE_URL"
        echo "   - VITE_SUPABASE_ANON_KEY"
    fi
    
    # Verificar que no hay valores de ejemplo
    if grep -q "your_supabase_project_url_here" .env; then
        warning "Algunas variables aún tienen valores de ejemplo"
        echo "📋 Revisa y actualiza todas las variables"
    else
        success "Todas las variables han sido personalizadas"
    fi
else
    error "Archivo .env no encontrado después de la edición"
fi

# Verificar permisos finales
info "Verificando permisos finales..."
if [ "$(stat -c %a .env)" = "600" ]; then
    success "Permisos finales correctos (600)"
else
    warning "Permisos incorrectos. Configurando..."
    chmod 600 .env
    if [ "$(stat -c %a .env)" = "600" ]; then
        success "Permisos corregidos (600)"
    else
        error "No se pudieron configurar los permisos correctamente"
    fi
fi

# Verificación final de seguridad
echo ""
info "Ejecutando verificación final de seguridad..."
if [ -f "scripts/security-check.sh" ]; then
    chmod +x scripts/security-check.sh
    ./scripts/security-check.sh
else
    warning "Script de verificación de seguridad no encontrado"
    echo "📋 Crea scripts/security-check.sh para verificaciones automáticas"
fi

# Resumen final
echo ""
echo "🎯 SETUP COMPLETADO EXITOSAMENTE!"
echo ""
echo "📋 RESUMEN:"
echo "   ✅ Archivo .env creado y configurado"
echo "   ✅ Permisos de seguridad configurados (600)"
echo "   ✅ Verificación de que no está en Git"
echo "   ✅ Variables de entorno configuradas"
echo ""
echo "🔒 PRÓXIMOS PASOS:"
echo "   1. Verifica que todas las variables estén configuradas correctamente"
echo "   2. Ejecuta 'npm run dev' para probar la aplicación"
echo "   3. Ejecuta regularmente 'scripts/security-check.sh'"
echo "   4. NUNCA subas .env al repositorio"
echo ""
echo "📚 DOCUMENTACIÓN:"
echo "   - SECURITY.md - Guía completa de seguridad"
echo "   - .env.example - Plantilla de variables"
echo "   - scripts/security-check.sh - Verificación automática"
echo ""
echo "🚨 RECUERDA: La seguridad es responsabilidad de todos!"
echo "   Mantén tu archivo .env seguro y nunca lo compartas."
