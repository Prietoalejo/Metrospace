import React from "react";
import Footer from "../componetes/Footer";
import Breadcrumbs from "../componetes/Breadcrumbs";
import "../estilos/style.css";

const CrearEspacio = () => {

  const handlePerfilClick = () => {
		window.location.href = "/perfil-admin";
	};

  const handleGuardar = () => {
    // Aquí irá la lógica para guardar los datos del formulario
    console.log("Guardando datos...");
    // Redirigir a la página de espacios
    window.location.href = "/espacios";
  };

  const handleCancelar = () => {
    window.location.href = "/espacios";
  };

  return (
    <div className="landing" style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <header
				style={{
					display: "flex",
					alignItems: "center",
					justifyContent: "space-between",
					padding: "0 40px",
					height: 80,
					background: "#fff",
					boxSizing: "border-box",
					borderBottom: "1px solid #eee",
				}}
			>
				<div style={{ display: "flex", alignItems: "center", gap: 16, flex: 1 }}>
					<div
						style={{
							width: 32,
							height: 48,
							background: "#e0e0e0",
							borderRadius: 4,
						}}
					/>
				</div>

				<div style={{ flex: 2, textAlign: 'center' }}>
					<span
						style={{
							color: "#f78628",
							fontWeight: 700,
							fontSize: 40,
							letterSpacing: "-1.44px",
							fontFamily: "Roboto Condensed, Helvetica, Arial, sans-serif",
						}}
					>
						METROSPACE
					</span>
				</div>

				<div style={{ display: "flex", alignItems: "center", gap: 16, flex: 1, justifyContent: 'flex-end' }}>
					<button
						onClick={handlePerfilClick}
						style={{
							background: "none",
							border: "none",
							display: "flex",
							alignItems: "center",
							cursor: "pointer",
							color: "#222",
							fontWeight: 500,
							fontSize: 16,
							padding: 0,
							outline: "none",
						}}
					>
						Mi perfil
						<span
							style={{
								width: 28,
								height: 28,
								borderRadius: "50%",
								background: "#e0e0e0",
								display: "flex",
								alignItems: "center",
								justifyContent: "center",
								fontSize: 18,
								color: "#888",
								marginLeft: 8,
							}}
						>
							<span role="img" aria-label="user">
								👤
							</span>
						</span>
					</button>
				</div>
			</header>
      <Breadcrumbs />
      <div style={{ maxWidth: 1200, margin: "0 auto", width: "100%", padding: "0 20px", flex: 1 }}>
        <h2 style={{ fontWeight: 500, fontSize: 24, margin: "32px 0 0 0" }}>Completa los datos</h2>
        
        <div style={{ display: "flex", gap: 32, marginTop: 24 }}>
          {/* Formulario */}
          <div style={{ flex: 1 }}>
            <div style={{ marginBottom: 16 }}>
              <label style={{ display: "block", marginBottom: 8, fontWeight: 500 }}>Nombre</label>
              <input type="text" placeholder="ejem. espacio de prueba" style={{ width: "100%", padding: 12, borderRadius: 8, border: "1px solid #ccc" }} />
            </div>
            <div style={{ marginBottom: 16 }}>
              <label style={{ display: "block", marginBottom: 8, fontWeight: 500 }}>Tipo de espacio</label>
              <input type="text" placeholder="ejem. auditorio" style={{ width: "100%", padding: 12, borderRadius: 8, border: "1px solid #ccc" }} />
            </div>
            <div style={{ marginBottom: 16 }}>
              <label style={{ display: "block", marginBottom: 8, fontWeight: 500 }}>Capacidad máxima de personas</label>
              <input type="text" placeholder="ejem. 100" style={{ width: "100%", padding: 12, borderRadius: 8, border: "1px solid #ccc" }} />
            </div>
            <div>
              <label style={{ display: "block", marginBottom: 8, fontWeight: 500 }}>Precio de alquiler</label>
              <input type="text" placeholder="ejem. $ 50,00" style={{ width: "100%", padding: 12, borderRadius: 8, border: "1px solid #ccc" }} />
            </div>
          </div>

          {/* Carga de fotos */}
          <div style={{ flex: 1 }}>
            <label style={{ display: "block", marginBottom: 8, fontWeight: 500 }}>Fotos del espacio</label>
            <div style={{ border: "2px dashed #ccc", borderRadius: 8, padding: 24, textAlign: "center", height: 200, display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
              <span style={{ fontSize: 48, color: "#ccc" }}>🖼️</span>
              <p>Arrastra y suelta una imagen aquí</p>
              <p style={{ fontSize: 12, color: "#888" }}>PNG, JPG, GIF de no mas de 10MB</p>
              <button style={{ background: "#e0e0e0", border: "none", borderRadius: 8, padding: "8px 16px", cursor: "pointer", marginTop: 8 }}>Explorar</button>
            </div>
          </div>
        </div>

        <div style={{ display: "flex", justifyContent: "flex-end", gap: 16, marginTop: 32 }}>
          <button onClick={handleCancelar} style={{ background: "none", border: "1px solid #ccc", borderRadius: 8, padding: "10px 24px", fontWeight: 600, cursor: "pointer" }}>Cancelar</button>
          <button onClick={handleGuardar} style={{ background: "#f78628", color: "#fff", border: "none", borderRadius: 8, padding: "10px 24px", fontWeight: 600, cursor: "pointer" }}>Guardar</button>
        </div>

      </div>
      <Footer />
    </div>
  );
};

export default CrearEspacio;
