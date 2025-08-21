import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://rxyojqzashayrkimxdsk.supabase.co';
const supabaseAnonKey =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJ4eW9qcXphc2hheXJraW14ZHNrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTU3NjE4MTMsImV4cCI6MjA3MTMzNzgxM30.vIwBVL6CTogfyzWjMdp-j7UwhSUF9B6QHSga-jO08Zs';

if (!supabaseUrl) {
  throw new Error('Отсутствует VITE_SUPABASE_URL в .env');
}
if (!supabaseAnonKey) {
  throw new Error('Отсутствует VITE_SUPABASE_ANON_KEY в .env');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
