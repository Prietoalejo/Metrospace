import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "../estilos/style.css";
import Header from "../componetes/HeaderNavigation";
import Footer from "../componetes/Footer";
import Breadcrumbs from "../componetes/Breadcrumbs";

import { getEspacios } from "../logica/supabaseEspacios";

const DetallesReserva = ({ espacio, onPagar, loadingPagar }) => {
  // Calcular promedio de estrellas
  const totalEstrellas = espacio.comentarios.reduce((acc, c) => acc + (c.estrellas || 0), 0);
  const cantidad = espacio.comentarios.filter(c => c.estrellas).length;
  const promedio = cantidad > 0 ? totalEstrellas / cantidad : 0;
  return (
    <div className="checkout-box" style={{ display: 'flex', background: '#fff', borderRadius: 16, boxShadow: '0 2px 8px #0001', padding: 24, marginBottom: 32, alignItems: 'flex-start', gap: 32 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 24, flex: 1 }}>
        <img src={espacio.imagen} alt={espacio.nombre} style={{ width: 120, height: 90, objectFit: 'cover', borderRadius: 12 }} />
        <div>
          <div style={{ fontWeight: 600, fontSize: 18, color: '#222' }}>{espacio.nombre}</div>
          <div style={{ color: '#757575', fontSize: 14 }}>Capacidad para {espacio.capacidad} personas</div>
          <div style={{ marginTop: 8 }}>
            <span style={{ color: '#FFC107', fontSize: 20 }}>
              {'★ '.repeat(Math.round(promedio)) + '☆ '.repeat(5 - Math.round(promedio))}
            </span>
            <span style={{ color: '#757575', fontSize: 14, marginLeft: 8 }}>
              {cantidad > 0 ? `(${promedio.toFixed(1)} de 5)` : 'Sin calificaciones'}
            </span>
          </div>
        </div>
      </div>
      <div style={{ minWidth: 260, background: '#fafafa', borderRadius: 12, padding: 20, boxShadow: '0 1px 4px #0001', color: '#222' }}>
        <div style={{ fontWeight: 600, marginBottom: 8 }}>Checkout</div>
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 14 }}>
          <span>Subtotal</span><span>${espacio.subtotal.toFixed(2)}</span>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 14 }}>
          <span>Impuesto</span><span>${espacio.impuesto.toFixed(2)}</span>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 600, margin: '8px 0' }}>
          <span>Total</span><span>${espacio.total.toFixed(2)}</span>
        </div>
        <button
          style={{ background: '#f78628', color: '#fff', border: 'none', borderRadius: 8, padding: '8px 0', width: '100%', fontWeight: 600, marginTop: 8, cursor: loadingPagar ? 'not-allowed' : 'pointer', opacity: loadingPagar ? 0.7 : 1 }}
          onClick={onPagar}
          disabled={loadingPagar}
        >
          {loadingPagar ? 'Procesando...' : 'Pagar'}
        </button>
      </div>
    </div>
  );
};

const FormularioReserva = ({ fecha, setFecha, horaInicio, setHoraInicio, horaFin, setHoraFin, requerimientos, setRequerimientos }) => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: 16, marginBottom: 32 }}>
    <div style={{ display: 'flex', gap: 24 }}>
      <div style={{ flex: 1 }}>
        <label style={{ fontWeight: 500, fontSize: 14, color: '#222' }}>Fecha</label>
        <input type="date" value={fecha} onChange={e => setFecha(e.target.value)} style={{ width: '100%', padding: 8, borderRadius: 8, border: '1px solid #ccc', marginTop: 4, color: '#111', background: '#f5f5f5' }} />
      </div>
      <div style={{ flex: 1, display: 'flex', gap: 8, alignItems: 'end' }}>
        <div style={{ flex: 'none' }}>
          <label style={{ fontWeight: 500, fontSize: 14, color: '#222' }}>Hora inicio</label>
          <input type="time" value={horaInicio} onChange={e => setHoraInicio(e.target.value)} style={{ width: 90, padding: 8, borderRadius: 8, border: '1px solid #ccc', marginTop: 4, color: '#111', background: '#f5f5f5' }} />
        </div>
        <div style={{ flex: 'none' }}>
          <label style={{ fontWeight: 500, fontSize: 14, color: '#222' }}>Hora fin</label>
          <input type="time" value={horaFin} onChange={e => setHoraFin(e.target.value)} style={{ width: 90, padding: 8, borderRadius: 8, border: '1px solid #ccc', marginTop: 4, color: '#111', background: '#f5f5f5' }} />
        </div>
      </div>
    </div>
    <div style={{ width: '100%' }}>
      <label style={{ fontWeight: 500, fontSize: 14, color: '#222' }}>Requerimientos adicionales</label>
      <input type="text" value={requerimientos} onChange={e => setRequerimientos(e.target.value)} placeholder="ejem. equipos, material..." style={{ width: '100%', padding: 8, borderRadius: 8, border: '1px solid #ccc', marginTop: 4, color: '#111', background: '#f5f5f5' }} />
    </div>
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', marginTop: 8 }}>
      <div style={{ background: '#fff', borderRadius: 12, padding: 16, boxShadow: '0 2px 8px #0001', display: 'flex', alignItems: 'center', gap: 12 }}>
        <input type="radio" checked readOnly style={{ accentColor: '#f78628', width: 20, height: 20 }} />
        <img src="https://www.paypalobjects.com/webstatic/icon/pp258.png" alt="PayPal" style={{ height: 32 }} />
      </div>
    </div>
  </div>
);

const Comentarios = ({ comentarios }) => (
  <div style={{ marginTop: 40 }}>
    <div style={{ fontWeight: 700, fontSize: 24, marginBottom: 24 }}>Comentarios</div>
    {/* Comentario para publicar */}
    <div style={{ background: '#fff', borderRadius: 16, padding: 24, marginBottom: 24, display: 'flex', alignItems: 'center', gap: 16 }}>
      <img src="https://randomuser.me/api/portraits/women/44.jpg" alt="user" style={{ width: 48, height: 48, borderRadius: '50%' }} />
      <div style={{ flex: 1 }}>
        <div style={{ fontWeight: 600 }}>Yuvritzaira Perez</div>
        <div style={{ color: '#FFC107', fontSize: 20 }}>☆ ☆ ☆ ☆ ☆</div>
        <input type="text" placeholder="Escribe tu comentario..." style={{ width: '100%', padding: 8, borderRadius: 8, border: '1px solid #ccc', marginTop: 8 }} />
      </div>
      <button style={{ background: '#f78628', color: '#fff', border: 'none', borderRadius: 8, padding: '8px 24px', fontWeight: 600, cursor: 'pointer' }}>Publicar</button>
    </div>
    {/* Comentarios publicados */}
    {comentarios.map(comentario => (
      <div key={comentario.id} style={{ background: '#fff', borderRadius: 16, padding: 24, marginBottom: 16 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 8 }}>
          <img src="https://randomuser.me/api/portraits/men/32.jpg" alt="user" style={{ width: 40, height: 40, borderRadius: '50%' }} />
          <div style={{ fontWeight: 600 }}>{comentario.usuario}</div>
          <div style={{ color: '#757575', fontSize: 14 }}>{comentario.fecha}</div>
          <div style={{ color: '#FFC107', fontSize: 20, marginLeft: 'auto' }}>
            {'★ '.repeat(comentario.estrellas) + '☆ '.repeat(5 - comentario.estrellas)}
          </div>
        </div>
        <div style={{ color: '#333', fontSize: 15, marginBottom: 8 }}>
          {comentario.texto}
        </div>
        <div style={{ color: '#f78628', fontWeight: 600, cursor: 'pointer', fontSize: 15 }}>Read More</div>
      </div>
    ))}
  </div>
);


import { insertReserva } from "../logica/supabaseReservas";
import { useAuth } from "../contexto/AuthContext";

const NuevaReservaCompleta = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [espacio, setEspacio] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [fecha, setFecha] = useState("");
  const [horaInicio, setHoraInicio] = useState("");
  const [horaFin, setHoraFin] = useState("");
  const [requerimientos, setRequerimientos] = useState("");
  const [loadingPagar, setLoadingPagar] = useState(false);
  const [feedback, setFeedback] = useState("");
  const { profile } = useAuth();

  useEffect(() => {
    async function fetchEspacio() {
      setLoading(true);
      try {
        const espacios = await getEspacios();
        const found = espacios.find(e => String(e.id) === String(id));
        if (!found) throw new Error("Espacio no encontrado");
        setEspacio(found);
        setError(null);
      } catch (err) {
        setError("Error al cargar el espacio");
      } finally {
        setLoading(false);
      }
    }
    fetchEspacio();
  }, [id]);

  const handlePagar = async () => {
    setFeedback("");
    if (!fecha || !horaInicio || !horaFin) {
      setFeedback("Completa todos los campos de fecha y hora.");
      return;
    }
    if (!profile || !profile.id) {
      setFeedback("No se encontró el usuario autenticado.");
      return;
    }
    setLoadingPagar(true);
    try {
      const totalConImpuesto = (espacio.precio || 0) * 1.16;
      const reserva = {
        usuario_id: profile.id,
        espacio_id: espacio.id,
        fecha,
        hora_inicio: horaInicio,
        hora_fin: horaFin,
        requerimientos: requerimientos, // corregido a plural
        pago: totalConImpuesto,
      };
      console.log('Reserva a enviar:', reserva);
      const { error } = await insertReserva(reserva);
      if (error) {
        setFeedback("Error al registrar la reserva: " + (error.message || JSON.stringify(error)));
      } else {
        setFeedback("¡Reserva realizada con éxito!");
        setFecha(""); setHoraInicio(""); setHoraFin(""); setRequerimientos("");
        setTimeout(() => {
          navigate("/reservas");
        }, 1200);
      }
    } catch (e) {
      setFeedback("Error inesperado al reservar.");
    } finally {
      setLoadingPagar(false);
    }
  };

  return (
    <div className="landing">
      <Header />
      <Breadcrumbs />
      <main className="container">
        <div style={{ fontWeight: 600, fontSize: 20, marginBottom: 24, color: '#222' }}>Completa la información</div>
        {loading ? (
          <div style={{ color: '#888', fontStyle: 'italic' }}>Cargando espacio...</div>
        ) : error ? (
          <div style={{ color: '#d32f2f', fontStyle: 'italic' }}>{error}</div>
        ) : espacio && (
          <>
            <DetallesReserva
              espacio={{
                ...espacio,
                imagen: Array.isArray(espacio.imagenes) && espacio.imagenes.length > 0 ? espacio.imagenes[0] : (espacio.imagen || "https://via.placeholder.com/120x90?text=Sin+foto"),
                comentarios: espacio.comentarios || [],
                subtotal: espacio.precio || 0,
                impuesto: (espacio.precio || 0) * 0.16,
                total: (espacio.precio || 0) * 1.16,
              }}
              onPagar={handlePagar}
              loadingPagar={loadingPagar}
            />
            <FormularioReserva
              fecha={fecha}
              setFecha={setFecha}
              horaInicio={horaInicio}
              setHoraInicio={setHoraInicio}
              horaFin={horaFin}
              setHoraFin={setHoraFin}
              requerimientos={requerimientos}
              setRequerimientos={setRequerimientos}
            />
            {feedback && <div style={{ color: feedback.includes('éxito') ? '#388e3c' : '#d32f2f', fontWeight: 500, marginBottom: 16 }}>{feedback}</div>}
            <Comentarios comentarios={espacio.comentarios || []} />
          </>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default NuevaReservaCompleta;
