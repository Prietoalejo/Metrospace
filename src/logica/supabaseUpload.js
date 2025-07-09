import { supabase } from '../../supabaseCredentials';

// Sube una imagen a Supabase Storage y retorna la URL pública
export async function subirImagenEspacio(file) {
  if (!file) throw new Error('No se seleccionó archivo');
  const ext = file.name.split('.').pop();
  const fileName = `espacio_${Date.now()}_${Math.random().toString(36).substr(2, 8)}.${ext}`;
  const filePath = `espacios/${fileName}`;

  // Subir archivo
  const { error } = await supabase.storage.from('espacios').upload(filePath, file, {
    cacheControl: '3600',
    upsert: false
  });
  if (error) throw error;

  // Obtener URL pública
  const { data } = supabase.storage.from('espacios').getPublicUrl(filePath);
  if (!data || !data.publicUrl) throw new Error('No se pudo obtener la URL pública');
  return data.publicUrl;
}
