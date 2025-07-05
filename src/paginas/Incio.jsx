import React from "react";
import HeaderNavigation from "../componetes/HeaderNavigation";
import "../estilos/style.css";
import { useNavigate } from "react-router-dom";

function Inicio() {
  const navigate = useNavigate();
  return (
    <div className="landing">
      <HeaderNavigation variant="home" />

      <div className="banner">
        <h1 className="hero-title">¿Necesitas un espacio para tu próximo evento?</h1>
        <p className="hero-description">
          Metrospaces, plataforma oficial de la Dirección de Gestión de Eventos
          y Protocolo de la Universidad Metropolitana, diseñada para
          que estudiantes, profesores, investigadores reserven espacios de
          manera rápida y segura.
        </p>
        <button className="hero-button" onClick={() => navigate("/nueva-reserva")}>
          Agendar espacios
        </button>
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
            <img
              src="https://images.pexels.com/photos/954585/pexels-photo-954585.jpeg"
              alt="Laboratorios"
              className="img"
            />
            <div className="text-wrapper-3">Laboratorios</div>
          </div>
          <div className="div-2">
            <img
              src="https://www.unimet.edu.ve/wp-content/uploads/2024/04/FOTOS-METAVERSO-ELECTIVA-DE-JUEGOS-74-p.jpg"
              alt="Auditorios"
              className="img"
            />
            <div className="text-wrapper-3">Auditorios</div>
          </div>
          <div className="div-2">
            <img
              src="https://www.unimet.edu.ve/wp-content/uploads/2025/02/WhatsApp-Image-2025-02-19-at-2.16.35-PM-1024x790.jpeg"
              alt="Áreas recreativas"
              className="img"
            />
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