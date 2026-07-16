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
    PostgrestVersion: "14.5"
  }
  public: {
    Tables: {
      achievements: {
        Row: {
          category: string
          description: string | null
          id: string
          name: string
          objective: number
          rarity: string
        }
        Insert: {
          category: string
          description?: string | null
          id: string
          name: string
          objective?: number
          rarity: string
        }
        Update: {
          category?: string
          description?: string | null
          id?: string
          name?: string
          objective?: number
          rarity?: string
        }
        Relationships: []
      }
      cardio_logs: {
        Row: {
          distance: number | null
          duration: number
          id: string
          logged_exercise_id: string
        }
        Insert: {
          distance?: number | null
          duration?: number
          id?: string
          logged_exercise_id: string
        }
        Update: {
          distance?: number | null
          duration?: number
          id?: string
          logged_exercise_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "cardio_logs_logged_exercise_id_fkey"
            columns: ["logged_exercise_id"]
            isOneToOne: false
            referencedRelation: "logged_exercises"
            referencedColumns: ["id"]
          },
        ]
      }
      characters: {
        Row: {
          best_streak: number
          created_at: string
          current_streak: number
          discipline: number
          endurance: number
          gold: number
          id: string
          level: number
          lifetime_distance: number
          lifetime_endurance: number
          lifetime_prs: number
          lifetime_training_weeks: number
          lifetime_volume: number
          lifetime_workouts: number
          name: string
          strength: number
          updated_at: string
          user_id: string
          vitality: number
          xp: number
        }
        Insert: {
          best_streak?: number
          created_at?: string
          current_streak?: number
          discipline?: number
          endurance?: number
          gold?: number
          id?: string
          level?: number
          lifetime_distance?: number
          lifetime_endurance?: number
          lifetime_prs?: number
          lifetime_training_weeks?: number
          lifetime_volume?: number
          lifetime_workouts?: number
          name: string
          strength?: number
          updated_at?: string
          user_id: string
          vitality?: number
          xp?: number
        }
        Update: {
          best_streak?: number
          created_at?: string
          current_streak?: number
          discipline?: number
          endurance?: number
          gold?: number
          id?: string
          level?: number
          lifetime_distance?: number
          lifetime_endurance?: number
          lifetime_prs?: number
          lifetime_training_weeks?: number
          lifetime_volume?: number
          lifetime_workouts?: number
          name?: string
          strength?: number
          updated_at?: string
          user_id?: string
          vitality?: number
          xp?: number
        }
        Relationships: []
      }
      exercise_sets: {
        Row: {
          id: string
          logged_exercise_id: string
          position: number
          reps: number
          weight: number
        }
        Insert: {
          id?: string
          logged_exercise_id: string
          position?: number
          reps?: number
          weight?: number
        }
        Update: {
          id?: string
          logged_exercise_id?: string
          position?: number
          reps?: number
          weight?: number
        }
        Relationships: [
          {
            foreignKeyName: "exercise_sets_logged_exercise_id_fkey"
            columns: ["logged_exercise_id"]
            isOneToOne: false
            referencedRelation: "logged_exercises"
            referencedColumns: ["id"]
          },
        ]
      }
      exercises: {
        Row: {
          allows_added_weight: boolean | null
          description: string | null
          distance_multiplier: number | null
          endurance_coefficient: number | null
          equipment: string | null
          id: string
          name: string
          track_distance: boolean | null
          type: string
        }
        Insert: {
          allows_added_weight?: boolean | null
          description?: string | null
          distance_multiplier?: number | null
          endurance_coefficient?: number | null
          equipment?: string | null
          id: string
          name: string
          track_distance?: boolean | null
          type: string
        }
        Update: {
          allows_added_weight?: boolean | null
          description?: string | null
          distance_multiplier?: number | null
          endurance_coefficient?: number | null
          equipment?: string | null
          id?: string
          name?: string
          track_distance?: boolean | null
          type?: string
        }
        Relationships: []
      }
      logged_exercises: {
        Row: {
          exercise_id: string
          id: string
          session_id: string
          type: string
        }
        Insert: {
          exercise_id: string
          id?: string
          session_id: string
          type: string
        }
        Update: {
          exercise_id?: string
          id?: string
          session_id?: string
          type?: string
        }
        Relationships: [
          {
            foreignKeyName: "logged_exercises_exercise_id_fkey"
            columns: ["exercise_id"]
            isOneToOne: false
            referencedRelation: "exercises"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "logged_exercises_session_id_fkey"
            columns: ["session_id"]
            isOneToOne: false
            referencedRelation: "workout_sessions"
            referencedColumns: ["id"]
          },
        ]
      }
      quests: {
        Row: {
          description: string | null
          goal: number
          gold_reward: number
          id: string
          title: string
          type: string
          xp_reward: number
        }
        Insert: {
          description?: string | null
          goal?: number
          gold_reward?: number
          id: string
          title: string
          type: string
          xp_reward?: number
        }
        Update: {
          description?: string | null
          goal?: number
          gold_reward?: number
          id?: string
          title?: string
          type?: string
          xp_reward?: number
        }
        Relationships: []
      }
      user_achievements: {
        Row: {
          achievement_id: string
          id: string
          unlocked_at: string
          user_id: string
        }
        Insert: {
          achievement_id: string
          id?: string
          unlocked_at?: string
          user_id: string
        }
        Update: {
          achievement_id?: string
          id?: string
          unlocked_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_achievements_achievement_id_fkey"
            columns: ["achievement_id"]
            isOneToOne: false
            referencedRelation: "achievements"
            referencedColumns: ["id"]
          },
        ]
      }
      user_quests: {
        Row: {
          completed_at: string | null
          created_at: string
          id: string
          progression: number
          quest_id: string
          user_id: string
        }
        Insert: {
          completed_at?: string | null
          created_at?: string
          id?: string
          progression?: number
          quest_id: string
          user_id: string
        }
        Update: {
          completed_at?: string | null
          created_at?: string
          id?: string
          progression?: number
          quest_id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_quests_quest_id_fkey"
            columns: ["quest_id"]
            isOneToOne: false
            referencedRelation: "quests"
            referencedColumns: ["id"]
          },
        ]
      }
      workout_sessions: {
        Row: {
          created_at: string
          date: string
          duration: number
          id: string
          notes: string | null
          template_id: string | null
          user_id: string
        }
        Insert: {
          created_at?: string
          date?: string
          duration?: number
          id?: string
          notes?: string | null
          template_id?: string | null
          user_id: string
        }
        Update: {
          created_at?: string
          date?: string
          duration?: number
          id?: string
          notes?: string | null
          template_id?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "workout_sessions_template_id_fkey"
            columns: ["template_id"]
            isOneToOne: false
            referencedRelation: "workout_templates"
            referencedColumns: ["id"]
          },
        ]
      }
      workout_template_exercises: {
        Row: {
          exercise_id: string
          id: string
          position: number
          template_id: string
        }
        Insert: {
          exercise_id: string
          id?: string
          position?: number
          template_id: string
        }
        Update: {
          exercise_id?: string
          id?: string
          position?: number
          template_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "workout_template_exercises_exercise_id_fkey"
            columns: ["exercise_id"]
            isOneToOne: false
            referencedRelation: "exercises"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "workout_template_exercises_template_id_fkey"
            columns: ["template_id"]
            isOneToOne: false
            referencedRelation: "workout_templates"
            referencedColumns: ["id"]
          },
        ]
      }
      workout_templates: {
        Row: {
          created_at: string
          id: string
          name: string
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          name: string
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          name?: string
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
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
