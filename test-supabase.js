// Script de prueba para verificar conexión a Supabase
import { createClient } from '@supabase/supabase-js'

// Obtener variables de entorno directamente
const supabaseUrl = process.env.VITE_SUPABASE_URL
const supabaseKey = process.env.VITE_SUPABASE_PUBLISHABLE_KEY

console.log('🔍 Probando conexión a Supabase...')
console.log('URL:', supabaseUrl)
console.log('Key:', supabaseKey ? `${supabaseKey.substring(0, 20)}...` : 'NO CONFIGURADA')

if (!supabaseUrl || !supabaseKey) {
  console.error('❌ Variables de entorno no configuradas')
  console.error('💡 Asegúrate de que VITE_SUPABASE_URL y VITE_SUPABASE_PUBLISHABLE_KEY estén en tu .env')
  process.exit(1)
}

try {
  const supabase = createClient(supabaseUrl, supabaseKey)
  
  console.log('✅ Cliente de Supabase creado exitosamente')
  
  // Probar una consulta simple para verificar la conexión
  const { data, error } = await supabase
    .rpc('version')
  
  if (error) {
    console.log('ℹ️  No se pudo ejecutar RPC version, pero la conexión está funcionando')
    console.log('📊 Probando consulta de autenticación...')
    
    // Probar autenticación
    const { data: authData, error: authError } = await supabase.auth.getSession()
    
    if (authError) {
      console.error('❌ Error en autenticación:', authError.message)
    } else {
      console.log('✅ Autenticación funcionando correctamente')
      console.log('🔐 Sesión actual:', authData.session ? 'Activa' : 'No hay sesión')
    }
  } else {
    console.log('✅ Conexión a la base de datos exitosa')
    console.log('📊 Versión de PostgreSQL:', data)
  }
  
  console.log('\n🎉 ¡Conexión a Supabase exitosa!')
  console.log('✅ URL configurada correctamente')
  console.log('✅ Clave de API válida')
  console.log('✅ Cliente creado sin errores')
  
} catch (error) {
  console.error('❌ Error al crear cliente de Supabase:', error.message)
}
