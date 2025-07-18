import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../estilos/style.css";
import Breadcrumbs from "../componetes/Breadcrumbs";
import Logo from '../assets/logo.png';
import { supabase } from '../../supabaseCredentials';
import { useAuth } from '../contexto/AuthContext';

function MisReservas() {
  const navigate = useNavigate();
  const { profile } = useAuth();
  const [reservas, setReservas] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchReservas() {
      if (!profile || !profile.id) return;
      setLoading(true);
      // Traer reservas del usuario y datos del espacio relacionado
      const { data, error } = await supabase
        .from('reserva')
        .select('id, fecha, hora_inicio, hora_fin, estado, espacio:espacio_id(id, nombre, imagenes)')
        .eq('usuario_id', profile.id)
        .order('fecha', { ascending: false });
      if (!error && data) {
        setReservas(data);
      }
      setLoading(false);
    }
    fetchReservas();
  }, [profile]);

  return (
    <div
      className="my-books"
      style={{
        minHeight: "100vh",
        background: "#f9f9f9",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* Header */}
      <header
        className="header"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between", // Mantiene el espacio entre los elementos
          padding: "0 40px",
          height: 100,
          background: "#fff",
          borderBottom: "4px solid #ffffff",
          boxSizing: "border-box",
          position: "relative",
          zIndex: 4,
        }}
      >
        {/* Sección Izquierda: Logo */}
        <div style={{ display: "flex", alignItems: "center" }}>
          <img
            src={Logo} 
            alt="Logo de Metrospace" 
            style={{
              width: 48,
              height: 48,
              marginRight: 24,
              objectFit: "contain",
            }} 
          />
        </div>

        <div
          style={{
            flex: 1, 
            display: "flex",
            justifyContent: "center", // Centra el contenido horizontalmente
            alignItems: "center",
            minWidth: 0, // Previene el desbordamiento en pantallas pequeñas
            marginLeft: 200 // Empuja el logo a la derecha
          }}
        >
          <div
            style={{
              color: "#f78628",
              fontWeight: 700,
              fontSize: 40,
              letterSpacing: "-1.44px",
              fontFamily: "Roboto Condensed, Helvetica, Arial, sans-serif",
              whiteSpace: "nowrap",
              lineHeight: "48px",
            }}
          >
            METROSPACE
          </div>
        </div>

        {/* Sección Derecha: Botones */}
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <button
            style={{
              background: "#222",
              color: "#fff",
              border: "none",
              borderRadius: 8,
              padding: "10px 24px",
              fontWeight: 700,
              fontSize: 16,
              cursor: "pointer",
              marginRight: 8, // Mantiene la separación entre los botones
            }}
            onClick={() => navigate("/reservas")}
          >
            Reservas
          </button>
          <button
            style={{
              background: "#fff",
              border: "1px solid #ccc",
              borderRadius: 8,
              padding: "10px 20px",
              display: "flex",
              alignItems: "center",
              gap: 8,
              fontSize: 16,
              fontWeight: 500,
              cursor: "pointer",
              color: "#222",
            }}
            onClick={() => navigate("/perfil")}
          >
            {/* Espacio para icono usuario */}
            <div
              style={{
                width: 24,
                height: 24,
                background: "#e0e0e0",
                borderRadius: "50%",
              }}
            />
            Mi perfil
          </button>
        </div>
      </header>
      <Breadcrumbs />

      {/* Filtros y acciones */}
      <div
        style={{
          maxWidth: 1100,
          margin: "0 auto",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          gap: 8,
        }}
      >
        <div style={{ color: "#888", fontSize: 16, marginBottom: 8 }}>
          Filtrar por:
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div style={{ display: "flex", gap: 24 }}>
            {/* Selector de fecha */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                background: "#fff",
                border: "1.5px solid #495a6e33",
                borderRadius: 8,
                padding: "12px 14px",
                gap: 14,
                width: 220,
              }}
            >
              {/* Icono calendario gris */}
              <div
                style={{
                  width: 24,
                  height: 24,
                  background: "#e0e0e0",
                  borderRadius: 4,
                }}
              />
              <div
                style={{
                  flex: 1,
                  fontWeight: 500,
                  fontSize: 13,
                  color: "#1a2027",
                }}
              >
                Fecha
              </div>
              {/* Chevron gris */}
              <div
                style={{
                  width: 16,
                  height: 16,
                  background: "#bbb",
                  borderRadius: 4,
                }}
              />
            </div>
            {/* Selector de espacio */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                background: "#fff",
                border: "1.5px solid #495a6e33",
                borderRadius: 8,
                padding: "12px 14px",
                gap: 14,
                width: 220,
              }}
            >
              {/* Icono edificio gris */}
              <div
                style={{
                  width: 24,
                  height: 24,
                  background: "#e0e0e0",
                  borderRadius: 4,
                }}
              />
              <div
                style={{
                  flex: 1,
                  fontWeight: 500,
                  fontSize: 13,
                  color: "#1a2027",
                }}
              >
                Espacio
              </div>
              {/* Chevron gris */}
              <div
                style={{
                  width: 16,
                  height: 16,
                  background: "#bbb",
                  borderRadius: 4,
                }}
              />
            </div>
          </div>
          {/* Botón nueva reserva */}
          <button
            style={{
              background: "#f78628",
              color: "#fff",
              border: "none",
              borderRadius: 8,
              padding: "12px 24px",
              fontWeight: 600,
              fontSize: 16,
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              gap: 8,
            }}
            onClick={() => navigate('/nueva-reserva')}
          >
            Nueva reserva
            <div
              style={{
                width: 22,
                height: 22,
                background: "#fff",
                borderRadius: "50%",
                border: "2px solid #f78628",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#f78628",
                fontWeight: "bold",
                fontSize: 18,
                marginLeft: 4,
              }}
            >
              +
            </div>
          </button>
        </div>
      </div>


      {/* Tabla de reservas */}
      <div
        style={{
          maxWidth: 1100,
          margin: "32px auto 0 auto",
          width: "100%",
        }}
      >
        {/* Encabezados */}
        <div style={{ display: "flex", gap: 20, padding: "0 0" }}>
          <div style={{ minWidth: 120, flex: 1, color: "#888", fontWeight: 600, fontSize: 16 }}>Espacio</div>
          <div style={{ minWidth: 150, flex: 1, color: "#888", fontWeight: 600, fontSize: 16 }}>Nombre</div>
          <div style={{ minWidth: 150, flex: 1, color: "#888", fontWeight: 600, fontSize: 16 }}>Fecha</div>
          <div style={{ minWidth: 150, flex: 1, color: "#888", fontWeight: 600, fontSize: 16 }}>Hora</div>
          <div style={{ minWidth: 120, flex: 1, color: "#888", fontWeight: 600, fontSize: 16 }}>Estado</div>
        </div>
        {/* Filas de reservas */}
        {loading ? (
          <div style={{ color: '#888', fontSize: 18, margin: '40px 0', textAlign: 'center' }}>Cargando reservas...</div>
        ) : reservas.length === 0 ? (
          <div style={{ color: "#222", fontSize: 20, fontWeight: 400, textAlign: "center", margin: '40px 0' }}>
            No tienes reservas activas
          </div>
        ) : (
          reservas.map(reserva => (
            <div key={reserva.id} style={{ display: "flex", gap: 20, alignItems: "center", background: "#fff", borderRadius: 10, margin: "18px 0", boxShadow: "0 1px 4px #0001", padding: "12px 0" }}>
              {/* Miniatura */}
              <div style={{ minWidth: 120, flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <img
                  src={Array.isArray(reserva.espacio?.imagenes) && reserva.espacio.imagenes.length > 0 ? reserva.espacio.imagenes[0] : (reserva.espacio?.imagen || "https://via.placeholder.com/120x90?text=Sin+foto")}
                  alt={reserva.espacio?.nombre || "Espacio"}
                  style={{ width: 80, height: 60, objectFit: 'cover', borderRadius: 8 }}
                />
              </div>
              {/* Nombre */}
              <div style={{ minWidth: 150, flex: 1, fontWeight: 500, color: '#222' }}>{reserva.espacio?.nombre || '-'}</div>
              {/* Fecha */}
              <div style={{ minWidth: 150, flex: 1, color: '#444' }}>{reserva.fecha}</div>
              {/* Hora */}
              <div style={{ minWidth: 150, flex: 1, color: '#444' }}>{reserva.hora_inicio} - {reserva.hora_fin}</div>
              {/* Estado */}
              <div style={{ minWidth: 120, flex: 1, color: reserva.estado === 'pendiente' ? '#f78628' : '#388e3c', fontWeight: 600, textTransform: 'capitalize' }}>{reserva.estado}</div>
            </div>
          ))
        )}
      </div>

      {/* Footer siempre abajo */}
      <footer
        className="footer"
        style={{
          background: "#f78628",
          marginTop: "auto",
          width: "100%",
          minHeight: 80,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div
          className="text"
          style={{
            display: "flex",
            alignItems: "center",
            gap: 16,
            color: "#fff",
            fontWeight: 700,
            fontSize: 16,
          }}
        >
          <span>Copyright © 2025 - Universidad Metropolitana</span>
          <div
            className="line"
            style={{
              height: 30,
              width: 1,
              background: "#fff",
              display: "inline-block",
            }}
          />
          <span>
            <span>Siguenos en </span>
            <span style={{ fontWeight: 700 }}>Instagram </span>
          </span>
          <div
            className="line"
            style={{
              height: 30,
              width: 1,
              background: "#fff",
              display: "inline-block",
            }}
          />
          <span>Contactanos</span>
        </div>
      </footer>
    </div>
  );
}

export default MisReservas;