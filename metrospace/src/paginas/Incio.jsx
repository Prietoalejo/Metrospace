import React from "react";
import "../estilos/style.css";

function Inicio() {
  return (
    <div className="landing">
      <header className="header">
        <div className="logo" style={{ width: 27, height: 48, background: "#eee", position: "absolute", left: 80, top: 26, borderRadius: 4, display: "flex", alignItems: "center", justifyContent: "center" }}>
          {/* Logo aquí */}
        </div>
        <div className="div">METROSPACE</div>
        <button className="button-instance">Registrarme</button>
        <button className="design-component-instance-node">Ingresar</button>
      </header>

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