import React from "react";
import { useNavigate } from "react-router-dom";
import "../estilos/style.css";

function Inicio() {
  const navigate = useNavigate();

  return (
    <div className="landing">
      <header className="header" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 40px", height: 100 }}>
        <div style={{ display: "flex", alignItems: "center" }}>
          <div className="logo" style={{ width: 27, height: 48, background: "#eee", borderRadius: 4 }} />
          <div className="div" style={{ marginLeft: 24 }}>METROSPACE</div>
        </div>
        <div>
          <button
            className="button-instance"
            onClick={() => navigate("/registro")}
          >
            Registrarme
          </button>
          <button
            className="design-component-instance-node"
            onClick={() => navigate("/iniciar-sesion")}
          >
            Ingresar
          </button>
        </div>
      </header>

      {/* ...resto del código igual... */}
      <div className="banner">
        <button className="button-3">Agendar espacios</button>
        <p className="p">
          Metrospaces, plataforma oficial de la Dirección de Gestión de Eventos
          y Protocolo de la Universidad Metropolitana, diseñada para
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
        <div className="text-wrapper-2">Conoce nuestros espacios</div>
        <div className="carrusel">
          <div className="div-2">
            <div className="img" style={{ width: 454, height: 341, background: "#ddd", borderRadius: 8, marginBottom: 8, display: "flex", alignItems: "center", justifyContent: "center" }}>
              {/* Imagen Laboratorios */}
            </div>
            <div className="text-wrapper-3">Laboratorios</div>
          </div>
          <div className="div-2">
            <div className="img" style={{ width: 454, height: 341, background: "#ddd", borderRadius: 8, marginBottom: 8, display: "flex", alignItems: "center", justifyContent: "center" }}>
              {/* Imagen Auditorios */}
            </div>
            <div className="text-wrapper-3">Auditorios</div>
          </div>
          <div className="div-2">
            <div className="img" style={{ width: 454, height: 341, background: "#ddd", borderRadius: 8, marginBottom: 8, display: "flex", alignItems: "center", justifyContent: "center" }}>
              {/* Imagen Áreas recreativas */}
            </div>
            <div className="text-wrapper-3">Áreas recreativas</div>
          </div>
        </div>
      </div>

      <footer className="footer">
        <div className="text">
          <p className="text-wrapper-4">
            Copyright © 2025 - Universidad Metropolitana
          </p>
          <div className="line" style={{ width: 1, height: 30, background: "#fff" }} />
          <p className="siguenos-en-intagram">
            <span className="span">Siguenos en </span>
            <span className="text-wrapper-5">Instagram </span>
          </p>
          <div className="line" style={{ width: 1, height: 30, background: "#fff" }} />
          <div className="text-wrapper-4">Contactanos</div>
        </div>
      </footer>
    </div>
  );
}

export default Inicio;