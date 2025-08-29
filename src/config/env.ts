// 🔒 CONFIGURACIÓN SEGURA DE VARIABLES DE ENTORNO - KÜCHEN-INVENTAR
// Este archivo carga y valida las variables de entorno de forma segura

// =============================================================================
// 🔐 VALIDACIÓN DE VARIABLES REQUERIDAS
// =============================================================================

const requiredEnvVars = [
  'VITE_SUPABASE_URL',
  'VITE_SUPABASE_ANON_KEY',
] as const;

// Verificar que todas las variables requeridas estén definidas
for (const envVar of requiredEnvVars) {
  if (!import.meta.env[envVar]) {
    throw new Error(
      `🚨 ERROR CRÍTICO: Variable de entorno requerida no definida: ${envVar}\n` +
      `📋 Asegúrate de:\n` +
      `   1. Copiar .env.example a .env\n` +
      `   2. Llenar todas las variables requeridas\n` +
      `   3. Verificar que .env no esté en el repositorio\n` +
      `🔒 Consulta SECURITY.md para más información`
    );
  }
}

// =============================================================================
// 🌐 CONFIGURACIÓN DE SUPABASE
// =============================================================================

export const supabaseConfig = {
  url: import.meta.env.VITE_SUPABASE_URL as string,
  anonKey: import.meta.env.VITE_SUPABASE_ANON_KEY as string,
  
  // Validar formato de URL de Supabase
  get isValidUrl() {
    return this.url.includes('supabase.co') && this.url.startsWith('https://');
  },
  
  // Validar formato de clave anónima
  get isValidKey() {
    return this.anonKey.startsWith('eyJ') && this.anonKey.length > 100;
  }
};

// Validar configuración de Supabase
if (!supabaseConfig.isValidUrl) {
  console.warn('⚠️  ADVERTENCIA: URL de Supabase parece inválida');
}

if (!supabaseConfig.isValidKey) {
  console.warn('⚠️  ADVERTENCIA: Clave anónima de Supabase parece inválida');
}

// =============================================================================
// 🌍 CONFIGURACIÓN DE API
// =============================================================================

export const apiConfig = {
  baseUrl: import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000',
  apiKey: import.meta.env.VITE_API_KEY,
  
  // Headers por defecto para requests
  get defaultHeaders() {
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
    };
    
    if (this.apiKey) {
      headers['Authorization'] = `Bearer ${this.apiKey}`;
    }
    
    return headers;
  }
};

// =============================================================================
// 📊 CONFIGURACIÓN DE ANALYTICS
// =============================================================================

export const analyticsConfig = {
  googleAnalytics: import.meta.env.VITE_GA_TRACKING_ID,
  sentry: import.meta.env.VITE_SENTRY_DSN,
  
  // Verificar si analytics está habilitado
  get isEnabled() {
    return !!(this.googleAnalytics || this.sentry);
  }
};

// =============================================================================
// 🔔 CONFIGURACIÓN DE NOTIFICACIONES
// =============================================================================

export const notificationConfig = {
  email: {
    serviceKey: import.meta.env.VITE_EMAIL_SERVICE_API_KEY,
    enabled: !!import.meta.env.VITE_EMAIL_SERVICE_API_KEY,
  },
  sms: {
    serviceKey: import.meta.env.VITE_SMS_SERVICE_API_KEY,
    enabled: !!import.meta.env.VITE_SMS_SERVICE_API_KEY,
  },
  push: {
    key: import.meta.env.VITE_PUSH_NOTIFICATION_KEY,
    enabled: !!import.meta.env.VITE_PUSH_NOTIFICATION_KEY,
  }
};

// =============================================================================
// 🏪 CONFIGURACIÓN DEL NEGOCIO
// =============================================================================

export const businessConfig = {
  name: import.meta.env.VITE_BUSINESS_NAME || 'Küchen-Inventar',
  timezone: import.meta.env.VITE_BUSINESS_TIMEZONE || 'Europe/Berlin',
  currency: import.meta.env.VITE_CURRENCY || 'EUR',
  
  // Configuración por defecto
  get displayName() {
    return this.name;
  },
  
  get locale() {
    return this.timezone.includes('Europe') ? 'de-DE' : 'en-US';
  }
};

// =============================================================================
// 🔧 CONFIGURACIÓN DE DESARROLLO
// =============================================================================

export const devConfig = {
  nodeEnv: import.meta.env.NODE_ENV || 'development',
  devServerPort: parseInt(import.meta.env.VITE_DEV_SERVER_PORT || '5173'),
  debugMode: import.meta.env.VITE_DEBUG_MODE === 'true',
  
  // Verificar si estamos en desarrollo
  get isDevelopment() {
    return this.nodeEnv === 'development';
  },
  
  // Verificar si estamos en producción
  get isProduction() {
    return this.nodeEnv === 'production';
  },
  
  // Verificar si debug está habilitado
  get isDebugEnabled() {
    return this.isDevelopment && this.debugMode;
  }
};

// =============================================================================
// 📱 CONFIGURACIÓN DE PWA
// =============================================================================

export const pwaConfig = {
  enabled: import.meta.env.VITE_PWA_ENABLED === 'true',
  name: import.meta.env.VITE_PWA_NAME || 'Küchen-Inventar',
  shortName: import.meta.env.VITE_PWA_SHORT_NAME || 'Küchen',
  
  // Verificar si PWA está habilitado
  get isEnabled() {
    return this.enabled;
  }
};

// =============================================================================
// 🚨 CONFIGURACIÓN DE SEGURIDAD
// =============================================================================

export const securityConfig = {
  encryptionKey: import.meta.env.VITE_ENCRYPTION_KEY,
  sessionTimeout: parseInt(import.meta.env.VITE_SESSION_TIMEOUT || '480'),
  
  // Verificar si la encriptación está configurada
  get isEncryptionEnabled() {
    return !!this.encryptionKey && this.encryptionKey.length >= 32;
  },
  
  // Obtener timeout de sesión en milisegundos
  get sessionTimeoutMs() {
    return this.sessionTimeout * 60 * 1000;
  }
};

// =============================================================================
// 🔍 VALIDACIÓN FINAL DE CONFIGURACIÓN
// =============================================================================

export const config = {
  supabase: supabaseConfig,
  api: apiConfig,
  analytics: analyticsConfig,
  notifications: notificationConfig,
  business: businessConfig,
  dev: devConfig,
  pwa: pwaConfig,
  security: securityConfig,
  
  // Verificar que la configuración sea válida
  get isValid() {
    return (
      supabaseConfig.isValidUrl &&
      supabaseConfig.isValidKey &&
      securityConfig.isEncryptionEnabled
    );
  },
  
  // Obtener resumen de configuración
  get summary() {
    return {
      environment: devConfig.nodeEnv,
      supabase: supabaseConfig.isValidUrl ? '✅ Configurado' : '❌ Error',
      security: securityConfig.isEncryptionEnabled ? '✅ Habilitado' : '❌ Deshabilitado',
      analytics: analyticsConfig.isEnabled ? '✅ Habilitado' : '❌ Deshabilitado',
      notifications: {
        email: notificationConfig.email.enabled ? '✅' : '❌',
        sms: notificationConfig.sms.enabled ? '✅' : '❌',
        push: notificationConfig.push.enabled ? '✅' : '❌',
      },
      pwa: pwaConfig.isEnabled ? '✅ Habilitado' : '❌ Deshabilitado',
    };
  }
};

// =============================================================================
// 🚨 VALIDACIÓN FINAL
// =============================================================================

if (!config.isValid) {
  console.error('🚨 ERROR: Configuración de entorno inválida');
  console.error('📋 Resumen:', config.summary);
  
  if (devConfig.isDevelopment) {
    console.error('🔧 En desarrollo, verifica tu archivo .env');
  } else {
    throw new Error('🚨 Configuración de entorno inválida en producción');
  }
}

// =============================================================================
// 📤 EXPORTACIÓN
// =============================================================================

export default config;

// =============================================================================
// 🔒 INFORMACIÓN DE SEGURIDAD
// =============================================================================

if (devConfig.isDebugEnabled) {
  console.log('🔒 Configuración de entorno cargada correctamente');
  console.log('📋 Resumen:', config.summary);
  console.log('⚠️  ADVERTENCIA: Modo debug habilitado - no usar en producción');
}
