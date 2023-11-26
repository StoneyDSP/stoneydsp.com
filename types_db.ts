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
      countries: {
        Row: {
          continent: Database["public"]["Enums"]["continents"] | null
          id: number
          iso2: string
          iso3: string | null
          local_name: string | null
          name: string | null
        }
        Insert: {
          continent?: Database["public"]["Enums"]["continents"] | null
          id?: number
          iso2: string
          iso3?: string | null
          local_name?: string | null
          name?: string | null
        }
        Update: {
          continent?: Database["public"]["Enums"]["continents"] | null
          id?: number
          iso2?: string
          iso3?: string | null
          local_name?: string | null
          name?: string | null
        }
        Relationships: []
      }
      posts: {
        Row: {
          content: string
          createdAt: string
          description: string | null
          id: number
          image: string | null
          imageBlurhash: string | null
          published: boolean
          siteId: string | null
          title: string | null
          updatedAt: string | null
          user_id: string | null
        }
        Insert: {
          content: string
          createdAt?: string
          description?: string | null
          id?: number
          image?: string | null
          imageBlurhash?: string | null
          published?: boolean
          siteId?: string | null
          title?: string | null
          updatedAt?: string | null
          user_id?: string | null
        }
        Update: {
          content?: string
          createdAt?: string
          description?: string | null
          id?: number
          image?: string | null
          imageBlurhash?: string | null
          published?: boolean
          siteId?: string | null
          title?: string | null
          updatedAt?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      profiles: {
        Row: {
          avatar_url: string | null
          full_name: string | null
          id: string
          updated_at: string | null
          username: string | null
          website: string | null
        }
        Insert: {
          avatar_url?: string | null
          full_name?: string | null
          id: string
          updated_at?: string | null
          username?: string | null
          website?: string | null
        }
        Update: {
          avatar_url?: string | null
          full_name?: string | null
          id?: string
          updated_at?: string | null
          username?: string | null
          website?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "profiles_id_fkey"
            columns: ["id"]
            isOneToOne: true
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      projects: {
        Row: {
          description: string | null
          id: number
          name: string | null
        }
        Insert: {
          description?: string | null
          id?: number
          name?: string | null
        }
        Update: {
          description?: string | null
          id?: number
          name?: string | null
        }
        Relationships: []
      }
      site: {
        Row: {
          createdAt: string
          customDomain: string | null
          description: string | null
          id: number
          name: string | null
          subdomain: string | null
          updatedAt: string | null
        }
        Insert: {
          createdAt?: string
          customDomain?: string | null
          description?: string | null
          id?: number
          name?: string | null
          subdomain?: string | null
          updatedAt?: string | null
        }
        Update: {
          createdAt?: string
          customDomain?: string | null
          description?: string | null
          id?: number
          name?: string | null
          subdomain?: string | null
          updatedAt?: string | null
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
      continents:
        | "Africa"
        | "Antarctica"
        | "Asia"
        | "Europe"
        | "Oceania"
        | "North America"
        | "South America"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  },
}
