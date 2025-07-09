
import { supabase } from '../../supabaseCredentials';

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
export async function eliminarEspacio(id) {
  const { error } = await supabase
    .from('espacio')
    .delete()
    .eq('id', id);
  if (error) throw error;
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
