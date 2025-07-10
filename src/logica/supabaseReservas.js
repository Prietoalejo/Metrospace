/**
 * Inserta una nueva reserva en la tabla reserva
 * @param {Object} reserva - Datos de la reserva
 * @returns {Promise<{data, error}>}
 */
const insertReserva = async (reserva) => {
  // reserva debe tener: usuario_id, espacio_id, fecha, hora_inicio, hora_fin, requerimientos (opcional), pago
  const { supabase } = await import('../../supabaseCredentials');
  return await supabase
    .from('reserva')
    .insert([
      {
        usuario_id: reserva.usuario_id,
        espacio_id: reserva.espacio_id,
        fecha: reserva.fecha,
        hora_inicio: reserva.hora_inicio,
        hora_fin: reserva.hora_fin,
        requerimientos: reserva.requerimientos || null, // corregido a plural
        estado: 'pendiente',
        pago: Math.round(reserva.pago) || 0, // redondea a entero
      }
    ]);
};


/**
 * Elimina una reserva por ID en la tabla reserva
 * @param {number} reservaId - ID de la reserva a eliminar
 * @returns {Promise<{data, error}>}
 */
const deleteReserva = async (reservaId) => {
  const { supabase } = await import('../../supabaseCredentials');
  return await supabase
    .from('reserva')
    .delete()
    .eq('id', reservaId);
};


/**
 * Obtiene el reporte histórico de reservas por espacio desde la tabla reporte_espacio_estado
 * @returns {Promise<{data, error}>}
 */
const getReporteEspacioEstado = async () => {
  const { supabase } = await import('../../supabaseCredentials');
  return await supabase
    .from('reporte_espacio_estado')
    .select('*')
    .order('fecha_actualizacion', { ascending: false });
};

export { insertReserva, deleteReserva, getReporteEspacioEstado };
