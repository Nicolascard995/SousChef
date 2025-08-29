# 🔒 Guía de Seguridad - Küchen-Inventar

## 🚨 **ADVERTENCIA CRÍTICA**

**NUNCA subas archivos `.env` al repositorio Git. Esto puede exponer claves de API, credenciales de base de datos y otra información sensible.**

## 📋 **Índice**

1. [Protección de Variables de Entorno](#protección-de-variables-de-entorno)
2. [Configuración de .gitignore](#configuración-de-gitignore)
3. [Script de Verificación de Seguridad](#script-de-verificación-de-seguridad)
4. [Buenas Prácticas](#buenas-prácticas)
5. [Procedimientos de Emergencia](#procedimientos-de-emergencia)
6. [Checklist de Seguridad](#checklist-de-seguridad)

## 🔐 **Protección de Variables de Entorno**

### **¿Qué son las Variables de Entorno?**

Las variables de entorno son configuraciones que contienen información sensible como:
- 🔑 Claves de API
- 🗄️ Credenciales de base de datos
- 🌐 URLs de servicios
- 🔒 Claves de encriptación
- 📧 Configuraciones de email

### **¿Por qué son Peligrosas?**

Si se exponen en un repositorio público:
- ❌ Cualquiera puede acceder a tu base de datos
- ❌ Pueden usar tus claves de API
- ❌ Pueden comprometer tu infraestructura
- ❌ Pueden incurrir en costos en tu nombre

## 📁 **Configuración de .gitignore**

### **Archivos que DEBEN estar en .gitignore**

```gitignore
# Environment Variables - CRÍTICO PARA SEGURIDAD
.env
.env.local
.env.development
.env.production
.env.test
.env.*.local

# API Keys and Secrets
*.key
*.pem
*.p12
*.pfx

# Database credentials
database.ini
db-config.json

# Supabase
.supabase
```

### **Archivos que SÍ pueden estar en el repositorio**

- ✅ `.env.example` - Plantilla de variables de entorno
- ✅ `SECURITY.md` - Esta guía de seguridad
- ✅ `scripts/security-check.sh` - Script de verificación

## 🔍 **Script de Verificación de Seguridad**

### **Ejecutar el Script**

```bash
# Dar permisos de ejecución
chmod +x scripts/security-check.sh

# Ejecutar verificación
./scripts/security-check.sh
```

### **Qué Verifica el Script**

1. **Archivos .env en el repositorio**
2. **Archivos .env en staging area**
3. **Archivos .env en historial de Git**
4. **Archivos sensibles comunes**
5. **Variables hardcodeadas en el código**
6. **Configuración de .gitignore**
7. **Permisos de archivos**

## ✅ **Buenas Prácticas**

### **1. Gestión de Variables de Entorno**

```bash
# ✅ CORRECTO: Usar .env.example
cp .env.example .env
# Editar .env con valores reales

# ❌ INCORRECTO: Subir .env al repositorio
git add .env  # ¡NUNCA HAGAS ESTO!
```

### **2. Estructura de Archivos**

```
proyecto/
├── .env.example          # ✅ Plantilla (puede estar en repo)
├── .env                  # ❌ Variables reales (NUNCA en repo)
├── .gitignore           # ✅ Configuración de Git
├── src/
│   └── config/
│       └── env.ts       # ✅ Carga de variables de entorno
└── scripts/
    └── security-check.sh # ✅ Script de verificación
```

### **3. Carga Segura de Variables**

```typescript
// ✅ CORRECTO: src/config/env.ts
export const config = {
  supabaseUrl: import.meta.env.VITE_SUPABASE_URL,
  supabaseAnonKey: import.meta.env.VITE_SUPABASE_ANON_KEY,
  apiBaseUrl: import.meta.env.VITE_API_BASE_URL,
};

// ❌ INCORRECTO: Hardcodear valores
export const config = {
  supabaseUrl: "https://abc123.supabase.co", // ¡NUNCA!
  supabaseAnonKey: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...", // ¡NUNCA!
};
```

### **4. Validación de Variables**

```typescript
// ✅ CORRECTO: Validar variables requeridas
const requiredEnvVars = [
  'VITE_SUPABASE_URL',
  'VITE_SUPABASE_ANON_KEY',
];

for (const envVar of requiredEnvVars) {
  if (!import.meta.env[envVar]) {
    throw new Error(`Variable de entorno requerida: ${envVar}`);
  }
}
```

## 🚨 **Procedimientos de Emergencia**

### **Si se Expuso un Archivo .env**

#### **Paso 1: Revocar Acceso Inmediatamente**
```bash
# Revocar claves de API
# Cambiar contraseñas de base de datos
# Rotar claves de encriptación
```

#### **Paso 2: Limpiar el Repositorio**
```bash
# Remover archivo del staging area
git reset HEAD .env

# Remover del historial (si ya se subió)
git filter-branch --force --index-filter \
  'git rm --cached --ignore-unmatch .env' \
  --prune-empty --tag-name-filter cat -- --all
```

#### **Paso 3: Forzar Push**
```bash
# Forzar actualización del repositorio remoto
git push origin --force --all
git push origin --force --tags
```

#### **Paso 4: Verificar Limpieza**
```bash
# Ejecutar script de seguridad
./scripts/security-check.sh
```

### **Herramientas de Limpieza**

- **BFG Repo-Cleaner**: Para limpiar historial de Git
- **git filter-branch**: Para remover archivos del historial
- **GitHub Security Advisories**: Para reportar vulnerabilidades

## 📋 **Checklist de Seguridad**

### **Antes de Cada Commit**

- [ ] Verificar que `.env` no esté en staging area
- [ ] Verificar que no hay credenciales hardcodeadas
- [ ] Ejecutar script de seguridad
- [ ] Revisar cambios con `git diff --cached`

### **Antes de Cada Push**

- [ ] Verificar que `.env` no esté en el repositorio
- [ ] Verificar que `.gitignore` esté actualizado
- [ ] Ejecutar script de seguridad completo
- [ ] Revisar que no hay información sensible expuesta

### **Mensualmente**

- [ ] Revisar permisos de archivos
- [ ] Actualizar claves de API
- [ ] Revisar accesos a servicios
- [ ] Ejecutar auditoría de seguridad completa

## 🔧 **Configuración de Entorno de Desarrollo**

### **Crear Archivo .env**

```bash
# 1. Copiar plantilla
cp .env.example .env

# 2. Editar con valores reales
nano .env

# 3. Verificar permisos
chmod 600 .env

# 4. Verificar que no está en Git
git status
```

### **Variables de Entorno Recomendadas**

```bash
# Supabase
VITE_SUPABASE_URL=https://tu-proyecto.supabase.co
VITE_SUPABASE_ANON_KEY=tu_clave_anonima_aqui

# Desarrollo
NODE_ENV=development
VITE_DEBUG_MODE=true

# Seguridad
VITE_ENCRYPTION_KEY=tu_clave_de_32_caracteres
VITE_SESSION_TIMEOUT=480
```

## 📚 **Recursos Adicionales**

### **Documentación Oficial**

- [Git Security Best Practices](https://git-scm.com/book/en/v2/Git-Tools-Rewriting-History)
- [Environment Variables Security](https://owasp.org/www-project-cheat-sheets/cheatsheets/Environment_Variable_Security_Cheat_Sheet.html)
- [GitHub Security](https://docs.github.com/en/code-security)

### **Herramientas de Seguridad**

- **GitGuardian**: Detección de secretos en repositorios
- **TruffleHog**: Búsqueda de secretos en historial de Git
- **BFG Repo-Cleaner**: Limpieza de repositorios
- **GitHub Security Advisories**: Reporte de vulnerabilidades

## 🆘 **Contacto de Emergencia**

Si detectas una brecha de seguridad:

1. **NO comitees** más cambios
2. **Ejecuta** el script de seguridad
3. **Sigue** los procedimientos de emergencia
4. **Reporta** la vulnerabilidad si es necesario

## 🎯 **Conclusión**

La seguridad de las variables de entorno es **CRÍTICA** para la integridad de tu proyecto. Sigue estas guías estrictamente y ejecuta regularmente el script de verificación de seguridad.

**Recuerda**: Es mejor prevenir que curar. Una vez que se exponen las credenciales, el daño puede ser irreversible.

---

*Última actualización: $(date)*
*Versión: 1.0*
