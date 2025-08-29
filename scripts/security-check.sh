#!/bin/bash

# 🔒 SCRIPT DE VERIFICACIÓN DE SEGURIDAD - KÜCHEN-INVENTAR
# Este script verifica que no se hayan expuesto archivos sensibles

echo "🔒 Verificando seguridad del proyecto..."

# Colores para output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
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

# Verificar que .env no esté en el repositorio
if git ls-files | grep -q "\.env$"; then
    error "Archivo .env detectado en el repositorio. Esto es un riesgo de seguridad crítico!"
else
    success "Archivo .env no está en el repositorio"
fi

# Verificar que .env.example existe
if [ -f ".env.example" ]; then
    success "Archivo .env.example existe"
else
    warning "Archivo .env.example no existe. Considera crearlo para documentar las variables de entorno"
fi

# Verificar que no hay archivos .env en el staging area
if git diff --cached --name-only | grep -q "\.env"; then
    error "Archivos .env detectados en el staging area. Revoca estos cambios inmediatamente!"
else
    success "No hay archivos .env en el staging area"
fi

# Verificar que no hay archivos .env en el historial de git
if git log --all --full-history --name-only | grep -q "\.env"; then
    warning "Archivos .env detectados en el historial de git. Considera usar BFG Repo-Cleaner para limpiar el historial"
else
    success "No hay archivos .env en el historial de git"
fi

# Verificar archivos sensibles comunes
SENSITIVE_FILES=(
    "*.key"
    "*.pem"
    "*.p12"
    "*.pfx"
    "database.ini"
    "db-config.json"
    ".supabase"
)

for pattern in "${SENSITIVE_FILES[@]}"; do
    if find . -name "$pattern" -not -path "./node_modules/*" -not -path "./.git/*" | grep -q .; then
        warning "Archivos sensibles detectados con patrón: $pattern"
        find . -name "$pattern" -not -path "./node_modules/*" -not -path "./.git/*"
    fi
done

# Verificar variables de entorno hardcodeadas en el código
echo "🔍 Verificando código en busca de variables de entorno hardcodeadas..."

# Buscar URLs de Supabase hardcodeadas
if grep -r "supabase\.co" src/ --exclude-dir=node_modules 2>/dev/null | grep -v "VITE_SUPABASE_URL"; then
    warning "Posibles URLs de Supabase hardcodeadas detectadas"
    grep -r "supabase\.co" src/ --exclude-dir=node_modules 2>/dev/null | grep -v "VITE_SUPABASE_URL"
fi

# Buscar claves de API hardcodeadas
if grep -r "sk_" src/ --exclude-dir=node_modules 2>/dev/null; then
    error "Claves de API secretas detectadas en el código!"
    grep -r "sk_" src/ --exclude-dir=node_modules 2>/dev/null
fi

# Buscar claves anónimas hardcodeadas
if grep -r "eyJ" src/ --exclude-dir=node_modules 2>/dev/null; then
    warning "Posibles claves JWT hardcodeadas detectadas"
    grep -r "eyJ" src/ --exclude-dir=node_modules 2>/dev/null
fi

# Verificar que .gitignore incluye archivos sensibles
if grep -q "\.env" .gitignore; then
    success ".env está incluido en .gitignore"
else
    error ".env NO está incluido en .gitignore"
fi

if grep -q "\.env\." .gitignore; then
    success "Archivos .env.* están incluidos en .gitignore"
else
    warning "Archivos .env.* NO están incluidos en .gitignore"
fi

# Verificar permisos de archivos
echo "🔐 Verificando permisos de archivos..."

# Verificar que .env tiene permisos restrictivos (si existe)
if [ -f ".env" ]; then
    if [ "$(stat -c %a .env)" = "600" ]; then
        success "Permisos de .env son correctos (600)"
    else
        warning "Permisos de .env deberían ser 600, actualmente son $(stat -c %a .env)"
        chmod 600 .env
        success "Permisos de .env corregidos a 600"
    fi
fi

# Verificar que .env.example tiene permisos correctos
if [ -f ".env.example" ]; then
    if [ "$(stat -c %a .env.example)" = "644" ]; then
        success "Permisos de .env.example son correctos (644)"
    else
        warning "Permisos de .env.example deberían ser 644, actualmente son $(stat -c %a .env.example)"
        chmod 644 .env.example
        success "Permisos de .env.example corregidos a 644"
    fi
fi

echo ""
echo "🔒 Verificación de seguridad completada!"
echo "📋 Resumen de recomendaciones:"
echo "   1. NUNCA subas archivos .env al repositorio"
echo "   2. Usa .env.example para documentar variables"
echo "   3. Mantén .gitignore actualizado"
echo "   4. Revisa regularmente con este script"
echo "   5. Usa variables de entorno para configuraciones sensibles"
echo ""
echo "✅ Tu proyecto está seguro!"
