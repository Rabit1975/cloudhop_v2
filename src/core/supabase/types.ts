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
      users: {
        Row: {
          id: string
          email: string | null
          username: string | null
          display_name: string | null
          avatar_url: string | null
          bio: string | null
          phone: string | null
          created_at: string
        }
        Insert: {
          id?: string
          email?: string | null
          username?: string | null
          display_name?: string | null
          avatar_url?: string | null
          bio?: string | null
          phone?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          email?: string | null
          username?: string | null
          display_name?: string | null
          avatar_url?: string | null
          bio?: string | null
          phone?: string | null
          created_at?: string
        }
      }
      chats: {
        Row: {
          id: string
          title: string
          is_group: boolean
          type: string
          category: string | null
          created_by: string
          description: string | null
          is_private: boolean
          avatar: string | null
          created_at: string
        }
        Insert: {
          id?: string
          title: string
          is_group?: boolean
          type?: string
          category?: string | null
          created_by: string
          description?: string | null
          is_private?: boolean
          avatar?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          title?: string
          is_group?: boolean
          type?: string
          category?: string | null
          created_by?: string
          description?: string | null
          is_private?: boolean
          avatar?: string | null
          created_at?: string
        }
      }
      messages: {
        Row: {
          id: string
          chat_id: string
          sender_id: string
          content: string
          created_at: string
          edited_at: string | null
        }
        Insert: {
          id?: string
          chat_id: string
          sender_id: string
          content: string
          created_at?: string
          edited_at?: string | null
        }
        Update: {
          id?: string
          chat_id?: string
          sender_id?: string
          content?: string
          created_at?: string
          edited_at?: string | null
        }
      }
      message_reactions: {
        Row: {
          id: string
          message_id: string
          user_id: string
          emoji: string
          created_at: string
        }
        Insert: {
          id?: string
          message_id: string
          user_id: string
          emoji: string
          created_at?: string
        }
        Update: {
          id?: string
          message_id?: string
          user_id?: string
          emoji?: string
          created_at?: string
        }
      }
      call_history: {
        Row: {
          id: string
          caller_id: string
          receiver_id: string
          started_at: string
          ended_at: string | null
          duration: number | null
        }
        Insert: {
          id?: string
          caller_id: string
          receiver_id: string
          started_at?: string
          ended_at?: string | null
          duration?: number | null
        }
        Update: {
          id?: string
          caller_id?: string
          receiver_id?: string
          started_at?: string
          ended_at?: string | null
          duration?: number | null
        }
      }
    }
  }
}
