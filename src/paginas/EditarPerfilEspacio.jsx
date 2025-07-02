import React from "react";
import Footer from "../componetes/Footer";
import Breadcrumbs from "../componetes/Breadcrumbs";

const mockFotos = [
  "https://images.unsplash.com/photo-1464983953574-0892a716854b",
  "https://images.unsplash.com/photo-1506744038136-46273834b3fb",
  "https://images.unsplash.com/photo-1515378791036-0648a3ef77b2"
];

const EditarPerfilEspacio = () => {
  // Aquí normalmente obtendrías los datos del espacio por id (params)
  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column", background: "#fff" }}>
      <header style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 40px", height: 80, background: "#fff", borderBottom: "1px solid #eee" }}>
        <div style={{ width: 32, height: 48, background: "#e0e0e0", borderRadius: 4 }} />
        <span style={{ color: "#f78628", fontWeight: 700, fontSize: 40, letterSpacing: "-1.44px", fontFamily: "Roboto Condensed, Helvetica, Arial, sans-serif" }}>METROSPACE</span>
        <button style={{ background: "none", border: "none", display: "flex", alignItems: "center", cursor: "pointer", color: "#222", fontWeight: 500, fontSize: 16, padding: 0 }}>
          Mi perfil <span style={{ width: 28, height: 28, borderRadius: "50%", background: "#e0e0e0", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18, color: "#888", marginLeft: 8 }}>👤</span>
        </button>
      </header>
      <Breadcrumbs />
      <div style={{ maxWidth: 1200, margin: "0 auto", width: "100%", padding: "0 20px", flex: 1 }}>
        <div style={{ display: "flex", marginTop: 32, gap: 40 }}>
          <div style={{ flex: 1 }}>
            <h2 style={{ fontWeight: 500, fontSize: 22, marginBottom: 24 }}>Datos del espacio</h2>
            <div style={{ marginBottom: 18 }}>
              <label style={{ display: "block", marginBottom: 6, color: "#444" }}>Nombre</label>
              <input value="Auditorio Pensairi" disabled style={{ width: "100%", padding: 12, borderRadius: 8, border: "1px solid #ccc", background: "#ededed", color: "#888", fontSize: 16 }} />
            </div>
            <div style={{ marginBottom: 18 }}>
              <label style={{ display: "block", marginBottom: 6, color: "#444" }}>Tipo de espacio</label>
              <input value="Auditorio" disabled style={{ width: "100%", padding: 12, borderRadius: 8, border: "1px solid #ccc", background: "#ededed", color: "#888", fontSize: 16 }} />
            </div>
            <div style={{ marginBottom: 18 }}>
              <label style={{ display: "block", marginBottom: 6, color: "#444" }}>Capacidad máxima de personas</label>
              <input value="100" disabled style={{ width: "100%", padding: 12, borderRadius: 8, border: "1px solid #ccc", background: "#ededed", color: "#888", fontSize: 16 }} />
            </div>
            <div style={{ marginBottom: 18 }}>
              <label style={{ display: "block", marginBottom: 6, color: "#444" }}>Precio de alquiler</label>
              <input value="$ 50,00" disabled style={{ width: "100%", padding: 12, borderRadius: 8, border: "1px solid #ccc", background: "#ededed", color: "#888", fontSize: 16 }} />
            </div>
          </div>
          <div style={{ flex: 2 }}>
            <h3 style={{ fontWeight: 500, fontSize: 18, marginBottom: 16 }}>Fotos del espacio</h3>
            <div style={{ display: "flex", gap: 32 }}>
              {mockFotos.map((foto, idx) => (
                <img key={idx} src={foto} alt="foto espacio" style={{ width: 220, height: 180, objectFit: "cover", borderRadius: 8, boxShadow: "0 2px 8px #0001" }} />
              ))}
            </div>
          </div>
        </div>
        <div style={{ display: "flex", justifyContent: "flex-end", alignItems: "center", gap: 32, marginTop: 40 }}>
          <button style={{ background: "#f78628", color: "#fff", border: "none", borderRadius: 8, padding: "12px 48px", fontWeight: 500, fontSize: 18, cursor: "pointer" }}>Editar</button>
          <button style={{ background: "none", color: "#f78628", border: "none", fontWeight: 500, fontSize: 18, cursor: "pointer" }}>Eliminar</button>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default EditarPerfilEspacio;
