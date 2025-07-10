import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "../estilos/style.css";
import Header from "../componetes/HeaderNavigation";
import Footer from "../componetes/Footer";
import Breadcrumbs from "../componetes/Breadcrumbs";
import { doc, getDoc, collection, addDoc, Timestamp, query, where, getDocs } from "firebase/firestore";
import { db } from "../firebase";
import { getAuth } from "firebase/auth";


const DetallesReserva = ({ espacio }) => {
  // Calcular promedio de estrellas
  const comentarios = espacio.comentarios || [];
  const totalEstrellas = comentarios.reduce((acc, c) => acc + (c.estrellas || 0), 0);
  const cantidad = comentarios.filter(c => c.estrellas).length;
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
          <span>Subtotal</span><span>${espacio.subtotal?.toFixed(2) || '0.00'}</span>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 14 }}>
          <span>Impuesto</span><span>${espacio.impuesto?.toFixed(2) || '0.00'}</span>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 600, margin: '8px 0' }}>
          <span>Total</span><span>${espacio.total?.toFixed(2) || '0.00'}</span>
        </div>
      </div>
    </div>
  );
};


const NuevaReservaCompleta = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [espacio, setEspacio] = useState(null);
  const [fecha, setFecha] = useState("");
  const [horaInicio, setHoraInicio] = useState("09:00");
  const [horaFin, setHoraFin] = useState("10:00");
  const [actividad, setActividad] = useState("");
  const [error, setError] = useState("");
  const [cargando, setCargando] = useState(true);
  const [cargandoReserva, setCargandoReserva] = useState(false);
 
  // Calcular la fecha mínima (hoy)
  const hoy = new Date();
  const minDate = hoy.toISOString().split('T')[0];


  // Cargar espacio desde Firestore
  useEffect(() => {
    const cargarEspacio = async () => {
      try {
        const espacioRef = doc(db, "espacios", id);
        const espacioSnap = await getDoc(espacioRef);
       
        if (espacioSnap.exists()) {
          setEspacio({
            id: espacioSnap.id,
            ...espacioSnap.data(),
            // Valores predeterminados para campos que podrían faltar
            subtotal: espacioSnap.data().subtotal || 0,
            impuesto: espacioSnap.data().impuesto || 0,
            total: espacioSnap.data().total || 0,
            comentarios: espacioSnap.data().comentarios || []
          });
        } else {
          setError("Espacio no encontrado");
        }
      } catch (error) {
        console.error("Error cargando espacio:", error);
        setError("Error al cargar el espacio");
      } finally {
        setCargando(false);
      }
    };


    cargarEspacio();
  }, [id]);


  // Verificar disponibilidad del espacio
  const verificarDisponibilidad = async () => {
    try {
      const reservasRef = collection(db, "reservas");
      const q = query(
        reservasRef,
        where("espacioId", "==", id),
        where("fecha", "==", fecha),
        where("estado", "in", ["pendiente", "confirmada"])
      );
     
      const querySnapshot = await getDocs(q);
     
      // Verificar solapamiento de horarios
      const haySolapamiento = querySnapshot.docs.some(doc => {
        const reserva = doc.data();
        const inicioReserva = reserva.horaInicio;
        const finReserva = reserva.horaFin;
       
        return (
          (horaInicio >= inicioReserva && horaInicio < finReserva) ||
          (horaFin > inicioReserva && horaFin <= finReserva) ||
          (horaInicio <= inicioReserva && horaFin >= finReserva)
        );
      });
     
      return !haySolapamiento;
    } catch (error) {
      console.error("Error verificando disponibilidad:", error);
      return false;
    }
  };


  // Crear reserva
  const crearReserva = async () => {
    if (!fecha || !horaInicio || !horaFin || !actividad) {
      setError("Todos los campos son obligatorios");
      return;
    }
   
    if (horaInicio >= horaFin) {
      setError("La hora de fin debe ser posterior a la hora de inicio");
      return;
    }


    try {
      setCargandoReserva(true);
      setError("");
     
      // Verificar autenticación
      const auth = getAuth();
      const usuario = auth.currentUser;
      if (!usuario) {
        navigate('/login');
        return;
      }
      const usuarioId = usuario.uid;


      // Verificar disponibilidad
      const disponible = await verificarDisponibilidad();
      if (!disponible) {
        throw new Error("El espacio no está disponible en ese horario");
      }


      // Crear reserva
      const reservasRef = collection(db, "reservas");
      await addDoc(reservasRef, {
        espacioId: id,
        usuarioId,
        fecha,
        horaInicio,
        horaFin,
        actividad,
        estado: "confirmada",
        timestamp: Timestamp.now(),
        espacioNombre: espacio.nombre,
        espacioImagen: espacio.imagen,
        espacioTipo: espacio.tipo,
      });


      // Redirigir a página de confirmación
      navigate(`/reservas`);
    } catch (error) {
      console.error("Error creando reserva:", error);
      setError(error.message || "Error al crear la reserva");
    } finally {
      setCargandoReserva(false);
    }
  };


  if (cargando) {
    return (
      <div className="landing">
        <Header />
        <Breadcrumbs />
        <main className="container">
          <div style={{ textAlign: 'center', padding: '40px 0' }}>
            <div className="spinner"></div>
            <p style={{ marginTop: 16 }}>Cargando espacio...</p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }


  if (!espacio) {
    return (
      <div className="landing">
        <Header />
        <Breadcrumbs />
        <main className="container">
          <div style={{ textAlign: 'center', padding: '40px 0' }}>
            <p>Error: {error}</p>
            <button
              onClick={() => navigate(-1)}
              style={{
                background: '#f78628',
                color: 'white',
                border: 'none',
                borderRadius: 8,
                padding: '12px 24px',
                fontWeight: 600,
                cursor: 'pointer',
                marginTop: 16
              }}
            >
              Volver
            </button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }


  return (
    <div className="landing">
      <Header />
      <Breadcrumbs />
      <main className="container">
        <div style={{ fontWeight: 600, fontSize: 20, marginBottom: 24, color: '#222' }}>Completa la información</div>
        <DetallesReserva espacio={espacio} />
       
        {/* Formulario de reserva mejorado */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16, marginBottom: 32 }}>
          <div style={{ display: 'flex', gap: 24 }}>
            <div style={{ flex: 1 }}>
              <label style={{ fontWeight: 500, fontSize: 14, color: '#222' }}>Fecha</label>
              <input
                type="date"
                value={fecha}
                onChange={(e) => setFecha(e.target.value)}
                min={minDate}
                style={{ width: '100%', padding: 8, borderRadius: 8, border: '1px solid #ccc', marginTop: 4, color: '#222' }}
              />
            </div>
            <div style={{ flex: 1 }}>
              <label style={{ fontWeight: 500, fontSize: 14, color: '#222' }}>Horario</label>
              <div style={{ display: 'flex', gap: 8, marginTop: 4 }}>
                <select
                  value={horaInicio}
                  onChange={(e) => setHoraInicio(e.target.value)}
                  style={{ width: '50%', padding: 8, borderRadius: 8, border: '1px solid #ccc', color: '#222' }}
                >
                  {Array.from({length: 13}, (_, i) => {
                    const hora = i + 8;
                    return hora < 10 ? `0${hora}:00` : `${hora}:00`;
                  }).map(hora => (
                    <option key={`inicio-${hora}`} value={hora}>{hora}</option>
                  ))}
                </select>
                <select
                  value={horaFin}
                  onChange={(e) => setHoraFin(e.target.value)}
                  style={{ width: '50%', padding: 8, borderRadius: 8, border: '1px solid #ccc', color: '#222' }}
                >
                  {Array.from({length: 13}, (_, i) => {
                    const hora = i + 9;
                    return hora < 10 ? `0${hora}:00` : `${hora}:00`;
                  }).map(hora => (
                    <option key={`fin-${hora}`} value={hora}>{hora}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>
          <div style={{ width: '100%' }}>
            <label style={{ fontWeight: 500, fontSize: 14, color: '#222' }}>Actividad a realizar</label>
            <input
              type="text"
              placeholder="Describe la actividad que realizarás en este espacio"
              value={actividad}
              onChange={(e) => setActividad(e.target.value)}
              style={{ width: '100%', padding: 8, borderRadius: 8, border: '1px solid #ccc', marginTop: 4, color: '#222' }}
            />
          </div>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', marginTop: 8 }}>
            <div style={{ background: '#fff', borderRadius: 12, padding: 16, boxShadow: '0 2px 8px #0001', display: 'flex', alignItems: 'center', gap: 12 }}>
              <input type="radio" checked readOnly style={{ accentColor: '#f78628', width: 20, height: 20 }} />
              <img src="https://www.paypalobjects.com/webstatic/icon/pp258.png" alt="PayPal" style={{ height: 32 }} />
            </div>
          </div>
        </div>


        {error && (
          <div style={{
            background: '#ffebee',
            color: '#c62828',
            padding: 12,
            borderRadius: 8,
            marginBottom: 20,
            display: 'flex',
            alignItems: 'center'
          }}>
            <span style={{ marginRight: 8 }}>⚠️</span>
            {error}
          </div>
        )}


        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
          <button
            onClick={crearReserva}
            disabled={cargandoReserva}
            style={{
              background: '#f78628',
              color: '#fff',
              border: 'none',
              borderRadius: 8,
              padding: '12px 32px',
              fontWeight: 600,
              cursor: 'pointer',
              fontSize: 16,
              opacity: cargandoReserva ? 0.7 : 1
            }}
          >
            {cargandoReserva ? "Procesando..." : "Pagar"}
          </button>
        </div>


        <Comentarios comentarios={espacio.comentarios || []} />
      </main>
      <Footer />
     
      {/* Estilos para el spinner de carga */}
      <style jsx>{`
        @keyframes spinner {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        .spinner {
          border: 4px solid rgba(0, 0, 0, 0.1);
          width: 40px;
          height: 40px;
          border-radius: 50%;
          border-left-color: #f78628;
          animation: spinner 1s linear infinite;
          margin: 0 auto;
        }
      `}</style>
    </div>
  );
};


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


export default NuevaReservaCompleta;




