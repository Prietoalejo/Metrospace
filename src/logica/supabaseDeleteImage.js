import { supabase } from '../../supabaseCredentials';

// Elimina una imagen del bucket de Supabase Storage a partir de la URL pública
export async function eliminarImagenEspacioPorUrl(publicUrl) {
  if (!publicUrl) return;
  try {
    // Extraer el path relativo a partir de la URL pública
    // Ejemplo: https://xxxx.supabase.co/storage/v1/object/public/espacios/espacio_123.jpg
    const match = publicUrl.match(/\/espacios\/(.+)$/);
    if (!match) throw new Error('No se pudo extraer el path de la imagen');
    const filePath = `espacios/${match[1]}`;
    const { error } = await supabase.storage.from('espacios').remove([filePath]);
    if (error) throw error;
    return true;
  } catch (e) {
    // No lanzar error para no bloquear el flujo si ya no existe
    return false;
  }
}
