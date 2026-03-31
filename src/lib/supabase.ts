import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string | undefined;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string | undefined;

if (!supabaseUrl) {
  throw new Error("Falta VITE_SUPABASE_URL en el archivo .env");
}

if (!supabaseKey) {
  throw new Error("Falta VITE_SUPABASE_ANON_KEY en el archivo .env");
}

export const supabase = createClient(supabaseUrl, supabaseKey);
