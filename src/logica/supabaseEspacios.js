
import { supabase } from '../../supabaseCredentials';
import { eliminarImagenEspacioPorUrl } from './supabaseDeleteImage';

// Obtener todos los espacios
export async function getEspacios() {
  const { data, error } = await supabase
    .from('espacio')
    .select('*')
    .order('id', { ascending: true });
  if (error) throw error;
  return data;
}

// Crear un nuevo espacio
export async function crearEspacio(espacio) {
  const { data, error } = await supabase
    .from('espacio')
    .insert([espacio])
    .select()
    .single();
  if (error) throw error;
  return data;
}

// Editar un espacio existente
export async function editarEspacio(id, updates) {
  const { data, error } = await supabase
    .from('espacio')
    .update(updates)
    .eq('id', id)
    .select()
    .single();
  if (error) throw error;
  return data;
}

// Eliminar un espacio
// Elimina un espacio y sus imágenes del bucket
export async function eliminarEspacio(id) {
  // Obtener las imágenes antes de eliminar
  const { data, error: fetchError } = await supabase
    .from('espacio')
    .select('imagenes')
    .eq('id', id)
    .single();
  if (fetchError) throw fetchError;
  const imagenes = Array.isArray(data?.imagenes) ? data.imagenes : [];

  // Eliminar el espacio
  const { error } = await supabase
    .from('espacio')
    .delete()
    .eq('id', id);
  if (error) throw error;

  // Eliminar imágenes del bucket (no bloquear si falla alguna)
  for (const url of imagenes) {
    await eliminarImagenEspacioPorUrl(url);
  }
  return true;
}

// Obtener todas las categorías
export async function getCategorias() {
  const { data, error } = await supabase
    .from('categorias_espacios')
    .select('*')
    .order('id', { ascending: true });
  if (error) throw error;
  return data;
}

// CRUD de categorías
export async function crearCategoria(categoria) {
  const { data, error } = await supabase
    .from('categorias_espacios')
    .insert([categoria])
    .select()
    .single();
  if (error) throw error;
  return data;
}

export async function editarCategoria(id, updates) {
  const { data, error } = await supabase
    .from('categorias_espacios')
    .update(updates)
    .eq('id', id)
    .select()
    .single();
  if (error) throw error;
  return data;
}

export async function eliminarCategoria(id) {
  const { error } = await supabase
    .from('categorias_espacios')
    .delete()
    .eq('id', id);
  if (error) throw error;
  return true;
}
