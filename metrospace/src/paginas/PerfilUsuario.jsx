import React from "react";
import { useNavigate } from "react-router-dom";
import "../estilos/style.css";

function PerfilUsuario() {
  const navigate = useNavigate();

  return (
    <div className="landing" style={{ background: "#f7f7f7", minHeight: "100vh" }}>
      {/* Header */}
      <header
        className="header"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "0 24px",
          height: 100,
          background: "#fff",
          boxSizing: "border-box",
        }}
      >
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
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
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

      {/* CONTENIDO CENTRAL DEL PERFIL */}
      <div style={{ maxWidth: 1100, margin: "40px auto 0 auto" }}>
        {/* Breadcrumb */}
        <div style={{ color: "#888", fontSize: 16, marginBottom: 16 }}>
          Inicio <span style={{ color: "#222" }}>{' > '}</span> <b>Mi perfil</b>
        </div>

        {/* Banner superior */}
        <div style={{
          width: "100%",
          height: 120,
          borderRadius: 16,
          background: "#d9d9d9",
          marginBottom: -60,
          position: "relative",
          overflow: "hidden"
        }}>
          {/* Imagen de portada (puedes poner una real luego) */}
        </div>

        {/* Avatar */}
        <div style={{
          width: 120,
          height: 120,
          borderRadius: "50%",
          background: "#fff",
          border: "6px solid #f7f7f7",
          position: "relative",
          top: -60,
          left: 32,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          boxShadow: "0 2px 8px #0001"
        }}>
          <span style={{ fontSize: 64, color: "#bbb" }}>👤</span>
          {/* Icono de editar */}
          <div style={{
            position: "absolute",
            bottom: 12,
            right: 12,
            background: "#fff",
            borderRadius: "50%",
            width: 32,
            height: 32,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            boxShadow: "0 1px 4px #0002"
          }}>
            <span role="img" aria-label="edit" style={{ fontSize: 18, color: "#888" }}>✏️</span>
          </div>
        </div>

        {/* Contenido principal */}
        <div style={{ display: "flex", gap: 32, marginTop: -40 }}>
          {/* Menú lateral */}
          <div style={{
            width: 240,
            background: "#fff",
            borderRadius: 16,
            boxShadow: "0 2px 8px #0001",
            padding: "32px 0",
            display: "flex",
            flexDirection: "column",
            gap: 8,
            minHeight: 260
          }}>
            <div style={{
              padding: "12px 32px",
              background: "#ffe7c2",
              borderRadius: 8,
              color: "#222",
              fontWeight: 500,
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between"
            }}>
              Mis datos
              <span style={{ color: "#f78628" }}>{'>'}</span>
            </div>
            <div style={{
              padding: "12px 32px",
              cursor: "pointer",
              color: "#222"
            }}>
              Ver mis reservas
            </div>
            <div style={{
              padding: "12px 32px",
              cursor: "pointer",
              color: "#222"
            }}>
              Cerrar sesión
            </div>
          </div>

          {/* Datos del usuario */}
          <div style={{
            flex: 1,
            background: "#fff",
            borderRadius: 16,
            boxShadow: "0 2px 8px #0001",
            padding: 32,
            minWidth: 320
          }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24 }}>
              <div style={{ fontSize: 22, fontWeight: 600, color: "#273b80" }}>Mis datos</div>
              <button style={{ background: "none", border: "none", cursor: "pointer", color: "#888", fontSize: 18 }}>
                <span role="img" aria-label="edit">✏️</span> Editar
              </button>
            </div>
            <table style={{ width: "100%", fontSize: 16, color: "#222" }}>
              <tbody>
                <tr>
                  <td style={{ padding: "8px 0", color: "#888" }}>Nombres</td>
                  <td style={{ padding: "8px 0" }}>Alejandro</td>
                </tr>
                <tr>
                  <td style={{ padding: "8px 0", color: "#888" }}>Apellidos</td>
                  <td style={{ padding: "8px 0" }}>Prieto</td>
                </tr>
                <tr>
                  <td style={{ padding: "8px 0", color: "#888" }}>Correo electrónico</td>
                  <td style={{ padding: "8px 0" }}>prueba123@correo.unimet.edu.ve</td>
                </tr>
                <tr>
                  <td style={{ padding: "8px 0", color: "#888" }}>Número telefónico</td>
                  <td style={{ padding: "8px 0" }}>(0412) 123 45 67</td>
                </tr>
                <tr>
                  <td style={{ padding: "8px 0", color: "#888" }}>Categoría</td>
                  <td style={{ padding: "8px 0" }}>Estudiante</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Footer */}
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

export default PerfilUsuario;