import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
/* @ts-ignore */
const supabase = createClient(supabaseUrl, supabaseKey);

export interface ReturnApiType<T> {
  data: T;
  count: number;
}

export default supabase;
