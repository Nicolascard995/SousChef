import { createClient, SupabaseClient } from '@supabase/supabase-js'
import type { Database } from './database.types'

/**
 * Cliente de Supabase con aislamiento automático por proyecto
 * Cada MVP solo puede acceder a sus propios datos
 */
export class ProjectIsolatedSupabaseClient {
  private supabase: SupabaseClient<Database>
  private currentProject: string | null = null

  constructor() {
    const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
    const supabaseKey = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY

    if (!supabaseUrl || !supabaseKey) {
      throw new Error('Missing Supabase environment variables')
    }

    this.supabase = createClient<Database>(supabaseUrl, supabaseKey, {
      auth: {
        autoRefreshToken: true,
        persistSession: true,
        detectSessionInUrl: true
      }
    })
  }

  /**
   * Obtener el cliente de Supabase base
   */
  getClient(): SupabaseClient<Database> {
    return this.supabase
  }

  /**
   * Cambiar al proyecto especificado
   */
  async switchToProject(projectName: string): Promise<void> {
    try {
      // Verificar que el usuario tiene acceso al proyecto
      const { data: userProject, error } = await this.supabase
        .rpc('get_user_project_schema', { user_uuid: this.getCurrentUserId() })

      if (error) {
        throw new Error(`Error al verificar acceso al proyecto: ${error.message}`)
      }

      if (userProject && userProject.includes(projectName.toLowerCase())) {
        this.currentProject = projectName
        console.log(`✅ Cambiado al proyecto: ${projectName}`)
      } else {
        throw new Error(`No tienes acceso al proyecto: ${projectName}`)
      }
    } catch (error) {
      console.error('Error al cambiar de proyecto:', error)
      throw error
    }
  }

  /**
   * Obtener el proyecto actual
   */
  getCurrentProject(): string | null {
    return this.currentProject
  }

  /**
   * Obtener el ID del usuario actual
   */
  private getCurrentUserId(): string | null {
    const session = this.supabase.auth.getSession()
    return session?.user?.id || null
  }

  /**
   * Ejecutar consulta en el contexto del proyecto actual
   */
  async queryInProject<T = any>(
    queryFn: (client: SupabaseClient<Database>) => Promise<{ data: T | null; error: any }>
  ): Promise<{ data: T | null; error: any }> {
    if (!this.currentProject) {
      throw new Error('No hay proyecto seleccionado. Usa switchToProject() primero.')
    }

    try {
      // Cambiar al esquema del proyecto
      await this.supabase.rpc('switch_to_project_schema', { 
        project_schema: this.currentProject.toLowerCase().replace(' ', '_') 
      })

      // Ejecutar la consulta
      return await queryFn(this.supabase)
    } catch (error) {
      console.error(`Error en consulta del proyecto ${this.currentProject}:`, error)
      return { data: null, error }
    }
  }

  /**
   * Obtener estadísticas de uso por proyecto
   */
  async getProjectUsageStats() {
    try {
      const { data, error } = await this.supabase
        .rpc('get_project_usage_stats')

      if (error) throw error
      return { data, error: null }
    } catch (error) {
      console.error('Error al obtener estadísticas de proyecto:', error)
      return { data: null, error }
    }
  }

  /**
   * Crear nuevo proyecto
   */
  async createNewProject(projectName: string, description: string, ownerEmail: string) {
    try {
      const { data, error } = await this.supabase
        .rpc('create_new_project', {
          project_name: projectName,
          project_description: description,
          owner_email: ownerEmail
        })

      if (error) throw error
      return { data, error: null }
    } catch (error) {
      console.error('Error al crear nuevo proyecto:', error)
      return { data: null, error }
    }
  }

  /**
   * Desactivar proyecto
   */
  async deactivateProject(projectId: number) {
    try {
      const { data, error } = await this.supabase
        .rpc('deactivate_project', { project_id: projectId })

      if (error) throw error
      return { data, error: null }
    } catch (error) {
      console.error('Error al desactivar proyecto:', error)
      return { data: null, error }
    }
  }

  /**
   * Verificar acceso a proyecto específico
   */
  async checkProjectAccess(projectSchema: string): Promise<boolean> {
    try {
      const { data, error } = await this.supabase
        .rpc('check_project_access', {
          user_uuid: this.getCurrentUserId(),
          project_schema: projectSchema
        })

      if (error) throw error
      return data || false
    } catch (error) {
      console.error('Error al verificar acceso al proyecto:', error)
      return false
    }
  }

  /**
   * Limpiar datos de proyecto específico
   */
  async cleanupProjectData(projectSchema: string) {
    try {
      const { data, error } = await this.supabase
        .rpc('cleanup_project_data', { project_schema: projectSchema })

      if (error) throw error
      return { data, error: null }
    } catch (error) {
      console.error('Error al limpiar datos del proyecto:', error)
      return { data: null, error }
    }
  }
}

// Instancia singleton del cliente
export const projectSupabase = new ProjectIsolatedSupabaseClient()

// Exportar también el cliente base para compatibilidad
export const supabase = projectSupabase.getClient()
