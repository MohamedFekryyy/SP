import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://tsptyfgxkrfiujltwwtg.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRzcHR5Zmd4a3JmaXVqbHR3d3RnIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTE2MDI4MjAsImV4cCI6MjAwNzE3ODgyMH0.A57TgbZxHYrYzNbAP228Y0M0bzO7_rlEbXfuA-bh6cU';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
