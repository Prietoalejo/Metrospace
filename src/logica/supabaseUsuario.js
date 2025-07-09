import { createClient } from '@supabase/supabase-js';
import { supabase } from '../../supabaseCredentials';

// Crear o actualizar usuario en Supabase
export async function upsertUsuario({ nombre, apellido, cedula, correo, telefono, contrasena = null, categoria = 'usuario' }) {
  // Si el usuario ya existe (por correo), actualiza; si no, inserta
  const { data, error } = await supabase
    .from('usuarios')
    .upsert([
      { nombre, apellido, cedula, correo, telefono, contrasena, categoria }
    ], { onConflict: ['correo'] });
  if (error) throw error;
  return data;
}

// Obtener usuario por correo
export async function getUsuarioByCorreo(correo) {
  const { data, error } = await supabase
    .from('usuarios')
    .select('*')
    .eq('correo', correo)
    .single();
  if (error) throw error;
  return data;
}
