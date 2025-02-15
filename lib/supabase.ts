import "react-native-url-polyfill"
import { createClient } from "@supabase/supabase-js"

const supabaseUrl = "https://ghmuvkxchihugnlfheff.supabase.co"
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdobXV2a3hjaGlodWdubGZoZWZmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mzk2MjcwMzEsImV4cCI6MjA1NTIwMzAzMX0.KrDo5OKnfSxMaa38hE_YScnT1AbyZ1tmMjL3XUf5p8U"
 
export const supabase = createClient(supabaseUrl, supabaseAnonKey);