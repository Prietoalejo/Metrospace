import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../firebase"; // Ajusta la ruta según tu configuración
import { useAuth } from "../contexto/AuthContext"; // Ajusta según tu contexto de autenticación
import "../estilos/style.css";
import Breadcrumbs from "../componetes/Breadcrumbs";


function MisReservas() {
  const navigate = useNavigate();
  const { currentUser } = useAuth(); // Obtener usuario actual
  const [reservas, setReservas] = useState([]);
  const [loading, setLoading] = useState(true);


  // Obtener reservas del usuario
  useEffect(() => {
    const fetchReservas = async () => {
      if (!currentUser) return;
     
      setLoading(true);
      try {
        const q = query(
          collection(db, "reservas"),
          where("usuarioId", "==", currentUser.uid)
        );
       
        const querySnapshot = await getDocs(q);
        const reservasData = [];
       
        querySnapshot.forEach((doc) => {
          reservasData.push({ id: doc.id, ...doc.data() });
        });


        setReservas(reservasData);
      } catch (error) {
        console.error("Error fetching reservas:", error);
      } finally {
        setLoading(false);
      }
    };


    fetchReservas();
  }, [currentUser]);


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
          justifyContent: "space-between",
          padding: "0 40px",
          height: 100,
          background: "#fff",
          borderBottom: "4px solid #2196f3",
          boxSizing: "border-box",
          position: "relative",
          zIndex: 4,
        }}
      >
        <div style={{ display: "flex", alignItems: "center" }}>
          {/* Logo gris */}
          <div
            style={{
              width: 48,
              height: 48,
              marginRight: 24,
              background: "#e0e0e0",
              borderRadius: 8,
            }}
          />
          <div
            style={{
              color: "#f78628",
              fontWeight: 700,
              fontSize: 40,
              letterSpacing: "-1.44px",
              fontFamily: "Roboto Condensed, Helvetica, Arial, sans-serif",
              whiteSpace: "nowrap",
              lineHeight: "48px",
              letterSpacing: "-1.44px",
            }}
          >
            METROSPACE
          </div>
        </div>
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
              marginRight: 8,
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
              padding: "8px 18px 8px 8px",
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


      {/* Cabecera de tabla */}
      <div
        style={{
          maxWidth: 1100,
          margin: "32px auto 0 auto",
          width: "100%",
          display: "flex",
          gap: 20,
          padding: "0 0",
        }}
      >
        {/* Espacio */}
        <div style={{ minWidth: 120, flex: 1 }}>
          <div
            style={{
              color: "#888",
              fontWeight: 600,
              fontSize: 16,
              marginBottom: 8,
            }}
          >
            Espacio
          </div>
        </div>
        {/* Nombre */}
        <div style={{ minWidth: 150, flex: 1 }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 6,
              color: "#888",
              fontWeight: 600,
              fontSize: 16,
            }}
          >
            Nombre
            <div
              style={{
                width: 16,
                height: 16,
                background: "#bbb",
                borderRadius: 4,
                display: "inline-block",
              }}
            />
          </div>
        </div>
        {/* Fecha */}
        <div style={{ minWidth: 150, flex: 1 }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 6,
              color: "#888",
              fontWeight: 600,
              fontSize: 16,
            }}
          >
            Fecha
            <div
              style={{
                width: 16,
                height: 16,
                background: "#bbb",
                borderRadius: 4,
                display: "inline-block",
              }}
            />
          </div>
        </div>
        {/* Hora */}
        <div style={{ minWidth: 150, flex: 1 }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 6,
              color: "#888",
              fontWeight: 600,
              fontSize: 16,
            }}
          >
            Hora
            <div
              style={{
                width: 16,
                height: 16,
                background: "#bbb",
                borderRadius: 4,
                display: "inline-block",
              }}
            />
          </div>
        </div>
        {/* Detalles */}
        <div style={{ minWidth: 120, flex: 1 }}>
          <div
            style={{
              color: "#888",
              fontWeight: 600,
              fontSize: 16,
            }}
          >
            Detalles
          </div>
        </div>
      </div>


      {/* Lista de reservas */}
      <div style={{ maxWidth: 1100, margin: "0 auto", width: "100%" }}>
        {loading ? (
          <div style={{ textAlign: "center", padding: 40 }}>
            Cargando reservas...
          </div>
        ) : reservas.length === 0 ? (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              minHeight: 120,
              marginTop: 40,
            }}
          >
            <div
              style={{
                color: "#222",
                fontSize: 20,
                fontWeight: 400,
                textAlign: "center",
              }}
            >
              No tienes reservas activas
            </div>
          </div>
        ) : (
          reservas.map((reserva) => (
            <div
              key={reserva.id}
              style={{
                display: "flex",
                gap: 20,
                padding: "16px 0",
                borderBottom: "1px solid #eee",
                alignItems: "center",
              }}
            >
              {/* Espacio */}
              <div style={{ minWidth: 120, flex: 1 }}>{reserva.espacioTipo}</div>
             
              {/* Nombre (nombre) */}
              <div style={{ minWidth: 150, flex: 1 }}>{reserva.espacioNombre}</div>
             
              {/* Fecha */}
              <div style={{ minWidth: 150, flex: 1 }}>
                {new Date(reserva.fecha).toLocaleDateString("es-ES")}
              </div>
             
              {/* Hora */}
              <div style={{ minWidth: 150, flex: 1 }}>
                {reserva.horaInicio} - {reserva.horaFin}
              </div>
             
              {/* Detalles */}
              <div style={{ minWidth: 120, flex: 1 }}>
                <button
                  style={{
                    background: "#fff",
                    border: "1px solid #ddd",
                    borderRadius: 8,
                    padding: "8px 16px",
                    cursor: "pointer",
                  }}
                  onClick={() => navigate(`/reserva/${reserva.id}`)}
                >
                  Ver
                </button>
              </div>
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




