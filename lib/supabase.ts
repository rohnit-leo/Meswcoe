import { createClient } from "@supabase/supabase-js"

const supabaseUrl = "https://outsfyaqtogswgcbbrlw.supabase.co"
const supabaseAnonKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im91dHNmeWFxdG9nc3dnY2Jicmx3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTMxMjUyODcsImV4cCI6MjA2ODcwMTI4N30.aXVRtnkfM9ncQIJHjSdkcClbFhqjWpQdyrzI1Qphg3Y"

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
    flowType: "implicit",
  },
})

// Database types remain the same...
export interface User {
  id: string
  email: string
  name?: string
  role: "prospective" | "current" | "alumni" | "teacher"
  phone?: string
  branch?: string
  batch_year?: number
  city?: string
  profile_image_url?: string
  bio?: string
  linkedin_url?: string
  github_url?: string
  is_verified: boolean
  last_active: string
  created_at: string
  updated_at: string
}

export interface Message {
  id: string
  content: string
  user_id: string
  channel: string
  anonymous: boolean
  created_at: string
  updated_at: string
  users?: User
}

export interface Product {
  id: string
  name: string
  description?: string
  price: number
  image_url?: string
  stock: number
  available_sizes?: string[]
  category?: string
  active: boolean
  created_at: string
  updated_at: string
}

export interface Order {
  id: string
  user_id: string
  product_id: string
  quantity: number
  size?: string
  total_amount: number
  payment_status: "pending" | "completed" | "failed" | "refunded"
  razorpay_payment_id?: string
  razorpay_order_id?: string
  shipping_address?: string
  created_at: string
  updated_at: string
  products?: Product
  users?: User
}

export interface Event {
  id: string
  title: string
  description?: string
  event_date?: string
  event_time?: string
  location?: string
  category: string
  image_url?: string
  registration_required: boolean
  registration_link?: string
  created_by?: string
  created_at: string
  updated_at: string
}

export interface FAQ {
  id: string
  question: string
  answer: string
  category: string
  tags?: string[]
  view_count: number
  helpful_count: number
  created_by?: string
  created_at: string
  updated_at: string
}

export interface JobPosting {
  id: string
  title: string
  company_name: string
  company_logo_url?: string
  description: string
  requirements?: string
  location?: string
  job_type: "full-time" | "part-time" | "internship" | "contract"
  experience_level: "entry" | "mid" | "senior"
  salary_range?: string
  application_deadline?: string
  application_url?: string
  contact_email?: string
  posted_by?: string
  active: boolean
  featured: boolean
  created_at: string
  updated_at: string
}

// Helper functions remain the same...
export const createUserProfile = async (userData: Partial<User>) => {
  const { data, error } = await supabase.from("users").insert([userData]).select().single()
  return { data, error }
}

export const getUserProfile = async (userId: string) => {
  const { data, error } = await supabase.from("users").select("*").eq("id", userId).single()
  return { data, error }
}

export const updateUserProfile = async (userId: string, updates: Partial<User>) => {
  const { data, error } = await supabase.from("users").update(updates).eq("id", userId).select().single()
  return { data, error }
}

export const getMessages = async (channel: string, limit = 50) => {
  const { data, error } = await supabase
    .from("messages")
    .select(`
      *,
      users (
        id,
        name,
        email,
        role
      )
    `)
    .eq("channel", channel)
    .order("created_at", { ascending: true })
    .limit(limit)

  return { data, error }
}

export const sendMessage = async (messageData: {
  content: string
  user_id: string
  channel: string
  anonymous: boolean
}) => {
  const { data, error } = await supabase.from("messages").insert([messageData]).select().single()
  return { data, error }
}
