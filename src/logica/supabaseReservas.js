import { createClient } from '@supabase/supabase-js';
import { supabaseUrl, supabaseKey } from '../../supabaseCredentials';

const supabase = createClient(supabaseUrl, supabaseKey);

/**
 * Inserta una nueva reserva en la tabla reservas
 * @param {Object} reserva - Datos de la reserva
 * @returns {Promise<{data, error}>}
 */
export async function insertReserva(reserva) {
  // reserva debe tener: usuario_id, espacio_id, fecha, hora_inicio, hora_fin, requerimientos (opcional), pago
  return await supabase
    .from('reserva')
    .insert([
      {
        usuario_id: reserva.usuario_id,
        espacio_id: reserva.espacio_id,
        fecha: reserva.fecha,
        hora_inicio: reserva.hora_inicio,
        hora_fin: reserva.hora_fin,
        requerimientos: reserva.requerimientos || null,
        estado: 'pendiente',
        pago: reserva.pago || 0,
      }
    ]);
}
