import React from "react";
import { useNavigate } from "react-router-dom";
import HeaderNavigation from "../componetes/HeaderNavigation";
import "../estilos/style.css";


function DashboardUsuario() {
  const navigate = useNavigate();


  return (
    <div className="landing">
      <HeaderNavigation variant="dashboard" />
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
          Metrospaces es la plataforma oficial de la Dirección de Gestión de
          Eventos y Protocolo de la Universidad Metropolitana, diseñada para
          que estudiantes, profesores, investigadores reserven espacios de
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



