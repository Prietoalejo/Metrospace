import { createClient } from '@supabase/supabase-js';

// Configura aquí tu URL y clave de Supabase (puedes usar variables de entorno si quieres más seguridad)
const supabaseUrl = 'https://sgvowqkjbtupbsdzjycq.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNndm93cWtqYnR1cGJzZHpqeWNxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTIwMTIyODAsImV4cCI6MjA2NzU4ODI4MH0.F4WIp4seeTlVg_DyNjQAljMNqj4GrISnONY8BMQknys';

// Exporta ambos métodos: la instancia y las claves
export const supabase = createClient(supabaseUrl, supabaseKey);
export { supabaseUrl, supabaseKey };