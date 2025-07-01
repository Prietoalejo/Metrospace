import React from "react";
import { useParams } from "react-router-dom";
import "../estilos/style.css";
import Header from "../componetes/HeaderNavigation";
import Footer from "../componetes/Footer";

const espaciosEjemplo = [
  {
    id: 1,
    nombre: "Sala de Juntas A",
    capacidad: 10,
    calificacion: 4,
    subtotal: 100,
    impuesto: 16,
    total: 116,
    imagen: "https://via.placeholder.com/120x90",
    comentarios: [
      {
        id: 1,
        usuario: "Juan Perez",
        fecha: "2023-10-01",
        estrellas: 5,
        texto: "Excelente lugar para reuniones.",
      },
      {
        id: 2,
        usuario: "Maria Lopez",
        fecha: "2023-10-02",
        estrellas: 4,
        texto: "Muy buen servicio, aunque la sala estaba un poco fría.",
      },
    ],
  },
  {
    id: 2,
    nombre: "Sala de Juntas B",
    capacidad: 8,
    calificacion: 3,
    subtotal: 80,
    impuesto: 12.8,
    total: 92.8,
    imagen: "https://via.placeholder.com/120x90",
    comentarios: [],
  },
  // Salón de A1 para pruebas
  {
    id: "A1-208",
    nombre: "A1-208",
    capacidad: 200,
    calificacion: 5,
    subtotal: 120,
    impuesto: 19.2,
    total: 139.2,
    imagen: "https://images.unsplash.com/photo-1503676382389-4809596d5290?auto=format&fit=crop&w=400&q=80",
    comentarios: [],
  },
  // Salón de A2 para pruebas
  {
    id: "A2-101",
    nombre: "A2-101",
    capacidad: 120,
    calificacion: 4,
    subtotal: 90,
    impuesto: 14.4,
    total: 104.4,
    imagen: "https://images.unsplash.com/photo-1511453672303-1d7b7af2c9b2?auto=format&fit=crop&w=400&q=80",
    comentarios: [],
  },
];

const DetallesReserva = ({ espacio }) => {
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
        <button style={{ background: '#f78628', color: '#fff', border: 'none', borderRadius: 8, padding: '8px 0', width: '100%', fontWeight: 600, marginTop: 8, cursor: 'pointer' }}>Pagar</button>
      </div>
    </div>
  );
};

const FormularioReserva = () => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: 16, marginBottom: 32 }}>
    <div style={{ display: 'flex', gap: 24 }}>
      <div style={{ flex: 1 }}>
        <label style={{ fontWeight: 500, fontSize: 14, color: '#222' }}>Fecha</label>
        <input type="date" style={{ width: '100%', padding: 8, borderRadius: 8, border: '1px solid #ccc', marginTop: 4, color: '#222' }} />
      </div>
      <div style={{ flex: 1 }}>
        <label style={{ fontWeight: 500, fontSize: 14, color: '#222' }}>Horario</label>
        <input type="text" placeholder="02:00 pm - 03:00 pm" style={{ width: '100%', padding: 8, borderRadius: 8, border: '1px solid #ccc', marginTop: 4, color: '#222' }} />
      </div>
    </div>
    <div style={{ width: '100%' }}>
      <label style={{ fontWeight: 500, fontSize: 14, color: '#222' }}>Requerimientos adicionales</label>
      <input type="text" placeholder="ejem. equipos, material..." style={{ width: '100%', padding: 8, borderRadius: 8, border: '1px solid #ccc', marginTop: 4, color: '#222' }} />
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

const NuevaReservaCompleta = () => {
  const { id } = useParams();
  // Buscar el espacio seleccionado por id
  const espacio = espaciosEjemplo.find(e => String(e.id) === String(id));

  return (
    <div className="landing">
      <Header />
      <main className="container">
        <div style={{ fontWeight: 600, fontSize: 20, marginBottom: 24, color: '#222' }}>Completa la información</div>
        {/* Mostrar detalles del espacio seleccionado */}
        {espacio && (
          <DetallesReserva espacio={espacio} />
        )}
        <FormularioReserva />
        <Comentarios comentarios={espacio ? espacio.comentarios : []} />
      </main>
      <Footer />
    </div>
  );
};

export default NuevaReservaCompleta;
