export type Json =
    | string
    | number
    | boolean
    | null
    | { [key: string]: Json | undefined }
    | Json[]

export interface Database {
    public: {
        Tables: {
            profiles: {
                Row: {
                    id: string
                    display_name: string | null
                    avatar_url: string | null
                    timezone: string
                    theme: string
                    created_at: string
                    updated_at: string
                }
                Insert: {
                    id: string
                    display_name?: string | null
                    avatar_url?: string | null
                    timezone?: string
                    theme?: string
                    created_at?: string
                    updated_at?: string
                }
                Update: {
                    id?: string
                    display_name?: string | null
                    avatar_url?: string | null
                    timezone?: string
                    theme?: string
                    updated_at?: string
                }
            }
            events: {
                Row: {
                    id: string
                    user_id: string
                    title: string
                    description: string | null
                    location: string | null
                    start_time: string
                    end_time: string
                    all_day: boolean
                    color: string
                    recurrence_rule: string | null
                    created_at: string
                    updated_at: string
                }
                Insert: {
                    id?: string
                    user_id: string
                    title: string
                    description?: string | null
                    location?: string | null
                    start_time: string
                    end_time: string
                    all_day?: boolean
                    color?: string
                    recurrence_rule?: string | null
                    created_at?: string
                    updated_at?: string
                }
                Update: {
                    title?: string
                    description?: string | null
                    location?: string | null
                    start_time?: string
                    end_time?: string
                    all_day?: boolean
                    color?: string
                    recurrence_rule?: string | null
                    updated_at?: string
                }
            }
            tasks: {
                Row: {
                    id: string
                    user_id: string
                    title: string
                    description: string | null
                    status: 'todo' | 'in_progress' | 'done'
                    priority: 'low' | 'medium' | 'high' | 'urgent'
                    due_date: string | null
                    block_date: string | null
                    block_start_time: string | null
                    block_end_time: string | null
                    created_at: string
                    updated_at: string
                }
                Insert: {
                    id?: string
                    user_id: string
                    title: string
                    description?: string | null
                    status?: 'todo' | 'in_progress' | 'done'
                    priority?: 'low' | 'medium' | 'high' | 'urgent'
                    due_date?: string | null
                    block_date?: string | null
                    block_start_time?: string | null
                    block_end_time?: string | null
                    created_at?: string
                    updated_at?: string
                }
                Update: {
                    title?: string
                    description?: string | null
                    status?: 'todo' | 'in_progress' | 'done'
                    priority?: 'low' | 'medium' | 'high' | 'urgent'
                    due_date?: string | null
                    block_date?: string | null
                    block_start_time?: string | null
                    block_end_time?: string | null
                    updated_at?: string
                }
            }
            habits: {
                Row: {
                    id: string
                    user_id: string
                    title: string
                    description: string | null
                    color: string
                    icon: string | null
                    frequency: 'daily' | 'weekly' | 'custom'
                    custom_days: number[] | null
                    target_count: number
                    created_at: string
                    updated_at: string
                }
                Insert: {
                    id?: string
                    user_id: string
                    title: string
                    description?: string | null
                    color?: string
                    icon?: string | null
                    frequency?: 'daily' | 'weekly' | 'custom'
                    custom_days?: number[] | null
                    target_count?: number
                    created_at?: string
                    updated_at?: string
                }
                Update: {
                    title?: string
                    description?: string | null
                    color?: string
                    icon?: string | null
                    frequency?: 'daily' | 'weekly' | 'custom'
                    custom_days?: number[] | null
                    target_count?: number
                    updated_at?: string
                }
            }
            habit_logs: {
                Row: {
                    id: string
                    habit_id: string
                    user_id: string
                    logged_date: string
                    count: number
                    created_at: string
                }
                Insert: {
                    id?: string
                    habit_id: string
                    user_id: string
                    logged_date: string
                    count?: number
                    created_at?: string
                }
                Update: {
                    count?: number
                }
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
    }
}

// Convenience type aliases
export type Profile = Database['public']['Tables']['profiles']['Row']
export type Event = Database['public']['Tables']['events']['Row']
export type Task = Database['public']['Tables']['tasks']['Row']
export type Habit = Database['public']['Tables']['habits']['Row']
export type HabitLog = Database['public']['Tables']['habit_logs']['Row']
