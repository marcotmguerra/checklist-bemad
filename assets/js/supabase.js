import { createClient } from "https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm";

const SUPABASE_URL = "https://rufiecqyshxpqafrdlnr.supabase.co";
const SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJ1ZmllY3F5c2h4cHFhZnJkbG5yIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njc4MzEyOTUsImV4cCI6MjA4MzQwNzI5NX0.-yFNxshGhHjKeMhzO31ye75Om9gOJKzn6-emrqfpvjM";

export const supabase = createClient(
  SUPABASE_URL,
  SUPABASE_KEY
);
