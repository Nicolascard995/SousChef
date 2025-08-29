export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "13.0.4"
  }
  public: {
    Tables: {
      ai_advice: {
        Row: {
          advice: string
          created_at: string | null
          demographic_data: Json | null
          economic_indicators: Json | null
          financial_data: Json | null
          id: number
          market_analysis: Json | null
          restaurant_data: Json
        }
        Insert: {
          advice: string
          created_at?: string | null
          demographic_data?: Json | null
          economic_indicators?: Json | null
          financial_data?: Json | null
          id?: number
          market_analysis?: Json | null
          restaurant_data: Json
        }
        Update: {
          advice?: string
          created_at?: string | null
          demographic_data?: Json | null
          economic_indicators?: Json | null
          financial_data?: Json | null
          id?: number
          market_analysis?: Json | null
          restaurant_data?: Json
        }
        Relationships: []
      }
      blog_posts: {
        Row: {
          categoria: string | null
          contenido: string
          fecha_actualizacion: string | null
          fecha_creacion: string | null
          fecha_publicacion: string | null
          id: number
          imagen_url: string | null
          meta_description: string | null
          meta_keywords: string | null
          publicado: boolean | null
          resumen: string | null
          slug: string
          tags: string | null
          titulo: string
          vistas: number | null
        }
        Insert: {
          categoria?: string | null
          contenido: string
          fecha_actualizacion?: string | null
          fecha_creacion?: string | null
          fecha_publicacion?: string | null
          id?: number
          imagen_url?: string | null
          meta_description?: string | null
          meta_keywords?: string | null
          publicado?: boolean | null
          resumen?: string | null
          slug: string
          tags?: string | null
          titulo: string
          vistas?: number | null
        }
        Update: {
          categoria?: string | null
          contenido?: string
          fecha_actualizacion?: string | null
          fecha_creacion?: string | null
          fecha_publicacion?: string | null
          id?: number
          imagen_url?: string | null
          meta_description?: string | null
          meta_keywords?: string | null
          publicado?: boolean | null
          resumen?: string | null
          slug?: string
          tags?: string | null
          titulo?: string
          vistas?: number | null
        }
        Relationships: []
      }
      chat_logs: {
        Row: {
          archivo_nombre: string | null
          archivo_tipo: string | null
          fecha_creacion: string | null
          id: number
          intencion_detectada: string | null
          ip_address: string | null
          mensaje_usuario: string | null
          modelo_usado: string | null
          respuesta_llm: string | null
          respuesta_tipo: string | null
          session_id: string
          tiempo_respuesta: number | null
          tipo_interaccion: string
          tokens_utilizados: number | null
        }
        Insert: {
          archivo_nombre?: string | null
          archivo_tipo?: string | null
          fecha_creacion?: string | null
          id?: number
          intencion_detectada?: string | null
          ip_address?: string | null
          mensaje_usuario?: string | null
          modelo_usado?: string | null
          respuesta_llm?: string | null
          respuesta_tipo?: string | null
          session_id: string
          tiempo_respuesta?: number | null
          tipo_interaccion: string
          tokens_utilizados?: number | null
        }
        Update: {
          archivo_nombre?: string | null
          archivo_tipo?: string | null
          fecha_creacion?: string | null
          id?: number
          intencion_detectada?: string | null
          ip_address?: string | null
          mensaje_usuario?: string | null
          modelo_usado?: string | null
          respuesta_llm?: string | null
          respuesta_tipo?: string | null
          session_id?: string
          tiempo_respuesta?: number | null
          tipo_interaccion?: string
          tokens_utilizados?: number | null
        }
        Relationships: []
      }
      images: {
        Row: {
          alt_text: string
          created_at: string | null
          id: string
          post_id: string | null
          prompt_foto: string | null
          url: string
        }
        Insert: {
          alt_text: string
          created_at?: string | null
          id?: string
          post_id?: string | null
          prompt_foto?: string | null
          url: string
        }
        Update: {
          alt_text?: string
          created_at?: string | null
          id?: string
          post_id?: string | null
          prompt_foto?: string | null
          url?: string
        }
        Relationships: [
          {
            foreignKeyName: "images_post_id_fkey"
            columns: ["post_id"]
            isOneToOne: false
            referencedRelation: "posts"
            referencedColumns: ["id"]
          },
        ]
      }
      leads: {
        Row: {
          email: string
          empresa: string | null
          fecha_creacion: string | null
          id: number
          ip_address: string | null
          mensaje: string | null
          nombre: string
          processed: boolean | null
          sector: string | null
          telefono: string | null
          user_agent: string | null
        }
        Insert: {
          email: string
          empresa?: string | null
          fecha_creacion?: string | null
          id?: number
          ip_address?: string | null
          mensaje?: string | null
          nombre: string
          processed?: boolean | null
          sector?: string | null
          telefono?: string | null
          user_agent?: string | null
        }
        Update: {
          email?: string
          empresa?: string | null
          fecha_creacion?: string | null
          id?: number
          ip_address?: string | null
          mensaje?: string | null
          nombre?: string
          processed?: boolean | null
          sector?: string | null
          telefono?: string | null
          user_agent?: string | null
        }
        Relationships: []
      }
      posts: {
        Row: {
          cover_url: string | null
          created_at: string | null
          description: string | null
          featured: boolean | null
          id: string
          locale: string
          markdown_content: string | null
          meta_description: string | null
          meta_title: string | null
          slug: string
          source_url: string | null
          tags: string[] | null
          title: string
          views: number | null
          week: string | null
        }
        Insert: {
          cover_url?: string | null
          created_at?: string | null
          description?: string | null
          featured?: boolean | null
          id?: string
          locale?: string
          markdown_content?: string | null
          meta_description?: string | null
          meta_title?: string | null
          slug: string
          source_url?: string | null
          tags?: string[] | null
          title: string
          views?: number | null
          week?: string | null
        }
        Update: {
          cover_url?: string | null
          created_at?: string | null
          description?: string | null
          featured?: boolean | null
          id?: string
          locale?: string
          markdown_content?: string | null
          meta_description?: string | null
          meta_title?: string | null
          slug?: string
          source_url?: string | null
          tags?: string[] | null
          title?: string
          views?: number | null
          week?: string | null
        }
        Relationships: []
      }
      restaurant_analyses: {
        Row: {
          average_age: number | null
          average_household_income: number | null
          average_meal_price: number | null
          city_type: string | null
          created_at: string | null
          demographic_data: Json | null
          economic_indicators: Json | null
          expected_daily_customers: number | null
          financial_data: Json | null
          food_cost_percentage: number | null
          gdp_growth_rate: number | null
          id: number
          inflation_rate: number | null
          initial_investment: number | null
          market_analysis: Json | null
          market_saturation_level: string | null
          monthly_operating_costs: number | null
          number_of_competitors: number | null
          opening_date: string | null
          population_density: string | null
          restaurant_data: Json
          restaurant_type: string | null
          revenue_estimate: number
          seasonal_demand_factor: string | null
          unemployment_rate: number | null
          viability_analysis: Json
        }
        Insert: {
          average_age?: number | null
          average_household_income?: number | null
          average_meal_price?: number | null
          city_type?: string | null
          created_at?: string | null
          demographic_data?: Json | null
          economic_indicators?: Json | null
          expected_daily_customers?: number | null
          financial_data?: Json | null
          food_cost_percentage?: number | null
          gdp_growth_rate?: number | null
          id?: number
          inflation_rate?: number | null
          initial_investment?: number | null
          market_analysis?: Json | null
          market_saturation_level?: string | null
          monthly_operating_costs?: number | null
          number_of_competitors?: number | null
          opening_date?: string | null
          population_density?: string | null
          restaurant_data: Json
          restaurant_type?: string | null
          revenue_estimate: number
          seasonal_demand_factor?: string | null
          unemployment_rate?: number | null
          viability_analysis: Json
        }
        Update: {
          average_age?: number | null
          average_household_income?: number | null
          average_meal_price?: number | null
          city_type?: string | null
          created_at?: string | null
          demographic_data?: Json | null
          economic_indicators?: Json | null
          expected_daily_customers?: number | null
          financial_data?: Json | null
          food_cost_percentage?: number | null
          gdp_growth_rate?: number | null
          id?: number
          inflation_rate?: number | null
          initial_investment?: number | null
          market_analysis?: Json | null
          market_saturation_level?: string | null
          monthly_operating_costs?: number | null
          number_of_competitors?: number | null
          opening_date?: string | null
          population_density?: string | null
          restaurant_data?: Json
          restaurant_type?: string | null
          revenue_estimate?: number
          seasonal_demand_factor?: string | null
          unemployment_rate?: number | null
          viability_analysis?: Json
        }
        Relationships: []
      }
      session_control: {
        Row: {
          cita_agendada: boolean | null
          esta_activa: boolean | null
          fecha_creacion: string | null
          fecha_ultimo_mensaje: string | null
          id: number
          ip_address: string | null
          lead_capturado: boolean | null
          limite_turnos: number | null
          session_id: string
          tipo_bot: string | null
          turnos_count: number | null
        }
        Insert: {
          cita_agendada?: boolean | null
          esta_activa?: boolean | null
          fecha_creacion?: string | null
          fecha_ultimo_mensaje?: string | null
          id?: number
          ip_address?: string | null
          lead_capturado?: boolean | null
          limite_turnos?: number | null
          session_id: string
          tipo_bot?: string | null
          turnos_count?: number | null
        }
        Update: {
          cita_agendada?: boolean | null
          esta_activa?: boolean | null
          fecha_creacion?: string | null
          fecha_ultimo_mensaje?: string | null
          id?: number
          ip_address?: string | null
          lead_capturado?: boolean | null
          limite_turnos?: number | null
          session_id?: string
          tipo_bot?: string | null
          turnos_count?: number | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      increment_post_views: {
        Args: { p_locale?: string; p_slug: string }
        Returns: number
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
