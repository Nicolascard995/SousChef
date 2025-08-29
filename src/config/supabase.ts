import { createClient } from '@supabase/supabase-js'

// Configuración de Supabase desde variables de entorno
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY

// Verificar que las variables estén configuradas
if (!supabaseUrl || !supabaseAnonKey) {
  console.error('❌ ERROR: Variables de Supabase no configuradas!')
  console.error('📋 Configura las siguientes variables en tu archivo .env:')
  console.error('   VITE_SUPABASE_URL=https://tu-project-id.supabase.co')
  console.error('   VITE_SUPABASE_PUBLISHABLE_KEY=tu_publishable_key_aqui')
  console.error('')
  console.error('🔗 Obtén estos valores desde: https://supabase.com/dashboard')
  console.error('   Settings > API > Project URL y anon key')
  
  throw new Error('Variables de Supabase no configuradas')
}

// Crear cliente de Supabase
export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true
  },
  realtime: {
    params: {
      eventsPerSecond: 10
    }
  }
})

// Función para verificar conexión
export const testSupabaseConnection = async () => {
  try {
    const { data, error } = await supabase.from('_dummy_table_').select('*').limit(1)
    
    if (error && error.code === 'PGRST116') {
      // Error esperado - tabla no existe, pero conexión funciona
      console.log('✅ Conexión a Supabase exitosa')
      return true
    }
    
    if (error) {
      console.error('❌ Error de conexión a Supabase:', error)
      return false
    }
    
    return true
  } catch (error) {
    console.error('❌ Error crítico de conexión:', error)
    return false
  }
}

// Exportar configuración
export const supabaseConfig = {
  url: supabaseUrl,
  hasConfig: !!(supabaseUrl && supabaseAnonKey)
}
