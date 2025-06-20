import React from "react";
import { useNavigate } from "react-router-dom";
import "../estilos/style.css";

function DashboardUsuario() {
  const navigate = useNavigate();

  return (
    <div className="landing">
      <header
        className="header"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "0 90px",
          height: 100,
          background: "#fff",
          boxSizing: "border-box",
        }}
      >
        {/* Izquierda: Logo y título */}
        <div style={{ display: "flex", alignItems: "center" }}>
          <div
            className="logo"
            style={{
              width: 27,
              height: 48,
              background: "#e0e0e0",
              borderRadius: 4,
              marginRight: 24,
            }}
          />
          <div
            className="div"
            style={{
              color: "#f78628",
              fontWeight: 700,
              fontSize: 48,
              letterSpacing: "-1.44px",
              fontFamily: "Roboto Condensed, Helvetica, Arial, sans-serif",
              whiteSpace: "nowrap",
            }}
          >
            METROSPACE
          </div>
        </div>
        {/* Derecha: Botones */}
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <button
            className="button-instance"
            style={{
              background: "#222",
              color: "#fff",
              border: "none",
              borderRadius: 8,
              padding: "10px 24px",
              fontWeight: 600,
              fontSize: 16,
              cursor: "pointer",
            }}
            onClick={() => navigate("/reservas")}
          >
            Mis reservas
          </button>
          <button
            className="button-2"
            style={{
              background: "rgba(219, 132, 17, 0.05)",
              border: "1px solid #ccc",
              borderRadius: 8,
              padding: "8px 18px 8px 8px",
              display: "flex",
              alignItems: "center",
              gap: 8,
              fontSize: 16,
              fontWeight: 500,
              cursor: "pointer",
            }}
            onClick={() => navigate("/perfil")}
          >
            <div
              style={{
                width: 32,
                height: 32,
                borderRadius: "50%",
                background: "#e0e0e0",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 18,
                color: "#888",
              }}
            >
              <span role="img" aria-label="user">👤</span>
            </div>
            Mi perfil
          </button>
        </div>
      </header>
      <div className="banner" style={{ background: "#cfcfcf" }}>
        <button
          className="button-4"
          style={{
            borderRadius: 16,
            display: "flex",
            height: 69,
            left: 80,
            position: "absolute",
            top: 445,
            width: 282,
          }}
          onClick={() => navigate("/agendar")}
        >
          Agendar espacios
        </button>
        <p className="p">
          Metrospaces es la plataforma oficial de la Dirección de Gestión de
          Eventos y Protocolo de la Universidad Metropolitana, diseñada para
          que estudiantes, profesores, investigadores reserven espacios de
          manera rápida y segura.
        </p>
        <p className="title">¿Necesitas un espacio para próximo evento?</p>
      </div>

      <div className="panel">
        <p className="tu-universidad-tus">
          Tu Universidad, Tus Espacios!
          <br />
          Plataforma Oficial de Alquiler para Estudiantes y Profesores.
        </p>
      </div>

      <div className="conoce-nuestros">
        <div className="text-wrapper-3">Conoce nuestros espacios</div>
        <div className="carrusel">
          <div className="div-2">
            <div className="img" style={{ height: 341, width: 454, background: "#e0e0e0", borderRadius: 8, marginBottom: 8, display: "flex", alignItems: "center", justifyContent: "center" }} />
            <div className="text-wrapper-4">Laboratorios</div>
          </div>
          <div className="div-2">
            <div className="img" style={{ height: 341, width: 454, background: "#e0e0e0", borderRadius: 8, marginBottom: 8, display: "flex", alignItems: "center", justifyContent: "center" }} />
            <div className="text-wrapper-4">Auditorios</div>
          </div>
          <div className="div-2">
            <div className="img" style={{ height: 341, width: 454, background: "#e0e0e0", borderRadius: 8, marginBottom: 8, display: "flex", alignItems: "center", justifyContent: "center" }} />
            <div className="text-wrapper-4">Áreas recreativas</div>
          </div>
        </div>
      </div>

      <footer className="footer">
        <div className="text">
          <p className="text-wrapper-5">
            Copyright © 2025 - Universidad Metropolitana
          </p>
          <div className="line" style={{ height: 30, width: 1, background: "#fff", display: "inline-block" }} />
          <p className="siguenos-en-intagram">
            <span className="span">Siguenos en </span>
            <span className="text-wrapper-6">Instagram </span>
          </p>
          <div className="line" style={{ height: 30, width: 1, background: "#fff", display: "inline-block" }} />
          <div className="text-wrapper-5">Contactanos</div>
        </div>
      </footer>
    </div>
  );
}

export default DashboardUsuario;