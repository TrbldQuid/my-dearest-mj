import { supabase } from '@/integrations/supabase/client';

export { supabase };

// Type for our love notes
export type LoveNote = {
  id: string;
  content: string;
  created_at: string;
  response_type: 'yes' | 'thinking';
  is_special_person?: boolean;
};