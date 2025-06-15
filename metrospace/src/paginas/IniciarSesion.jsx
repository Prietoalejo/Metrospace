import React from "react";
import "../estilos/style.css";

function IniciarSesion() {
  return (
    <div className="login">
      {/* Imagen de fondo */}
      <div
        className="bg-image"
        style={{
          height: "1024px",
          width: "934px",
          background: "#e0e0e0",
          position: "absolute",
          left: 0,
          top: 0,
        }}
      >
        {/* Aquí irá la imagen de fondo */}
        <div
          style={{
            color: "#fff",
            fontSize: 48,
            fontWeight: "bold",
            position: "absolute",
            left: 80,
            top: 400,
            textShadow: "2px 2px 8px #000",
          }}
        >
          METROSPACE
        </div>
      </div>

      {/* Panel derecho */}
      <div
        style={{
          position: "absolute",
          left: 934,
          top: 0,
          width: 666,
          height: 1024,
          background: "#fff",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "0 80px",
        }}
      >
        <div style={{ marginBottom: 32, color: "#273b80", fontSize: 32, fontWeight: 600 }}>
          Inicio de sesión
        </div>
        <form>
          <div style={{ marginBottom: 16 }}>
            <label style={{ fontWeight: 500 }}>Correo electrónico</label>
            <input
              type="email"
              placeholder="ejemplo@unimet.com"
              style={{
                width: "100%",
                padding: 12,
                marginTop: 8,
                borderRadius: 8,
                border: "1px solid #ccc",
                fontSize: 16,
              }}
            />
          </div>
          <div style={{ marginBottom: 8 }}>
            <label style={{ fontWeight: 500 }}>Contraseña</label>
            <input
              type="password"
              placeholder="********"
              style={{
                width: "100%",
                padding: 12,
                marginTop: 8,
                borderRadius: 8,
                border: "1px solid #ccc",
                fontSize: 16,
              }}
            />
            <div style={{ textAlign: "right", marginTop: 4 }}>
              <a href="#" style={{ color: "#0a72d4", fontSize: 12, textDecoration: "underline" }}>
                Olvidé mi contraseña
              </a>
            </div>
          </div>
          <button
            type="submit"
            style={{
              width: "100%",
              padding: 12,
              background: "#222",
              color: "#fff",
              border: "none",
              borderRadius: 8,
              fontSize: 16,
              fontWeight: 600,
              marginTop: 16,
              marginBottom: 16,
            }}
          >
            Ingresar
          </button>
        </form>
        <div style={{ textAlign: "center", marginBottom: 16, fontSize: 12 }}>
          ¿No tienes cuenta?{" "}
          <a href="/registro" style={{ color: "#0a72d4", textDecoration: "underline" }}>
            Regístrate
          </a>
        </div>
        <button
          style={{
            width: "100%",
            padding: 12,
            background: "#fff",
            border: "1px solid #ccc",
            borderRadius: 8,
            display: "flex",
            alignItems: "center",
            gap: 8,
            fontSize: 14,
            marginBottom: 24,
            cursor: "pointer",
          }}
        >
          {/* Aquí iría el icono de Google */}
          <span style={{ fontWeight: 500, color: "#222" }}>Iniciar sesión con Google</span>
        </button>
        <div style={{ textAlign: "center" }}>
          <a href="/" style={{ color: "#5A5A5A", textDecoration: "underline", fontSize: 16 }}>
            Volver al inicio
          </a>
        </div>
      </div>
    </div>
  );
}

export default IniciarSesion;