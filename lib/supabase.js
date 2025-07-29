import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://epszhoenlllypillitrv.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVwc3pob2VubGxseXBpbGxpdHJ2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTM3NjE0NDYsImV4cCI6MjA2OTMzNzQ0Nn0.nJGgMtdKsUXdkP56XuEskyTV4FdTktTA3sR4qU5GdrY'

export const supabase = createClient(supabaseUrl, supabaseKey)
