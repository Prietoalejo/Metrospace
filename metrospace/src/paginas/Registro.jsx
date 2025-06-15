import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../estilos/style.css";

function Registro() {
  const [paso, setPaso] = useState(1);
  const [form, setForm] = useState({
    nombre: "",
    apellido: "",
    cedula: "",
    correo: "",
    telefono: "",
    categoria: "",
    contrasena: "",
    repetirContrasena: "",
  });
  const [exito, setExito] = useState(false);
  const navigate = useNavigate();

  // Maneja cambios en los campos
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  // Paso 1: Datos personales
  const PasoUno = (
    <div style={{ maxWidth: 400, margin: "40px auto", padding: 24, background: "#fff", borderRadius: 8 }}>
      <h2 style={{ color: "#273b80" }}>Registro</h2>
      <div style={{ fontSize: 14, color: "#222", marginBottom: 16, textAlign: "right" }}>Paso 1 de 2</div>
      <form>
        <div style={{ marginBottom: 12 }}>
          <label>Nombre</label>
          <input name="nombre" value={form.nombre} onChange={handleChange} placeholder="ejm. alejandro" style={{ width: "100%", padding: 8, marginTop: 4 }} />
        </div>
        <div style={{ marginBottom: 12 }}>
          <label>Apellido</label>
          <input name="apellido" value={form.apellido} onChange={handleChange} placeholder="ejm. prieto" style={{ width: "100%", padding: 8, marginTop: 4 }} />
        </div>
        <div style={{ marginBottom: 12 }}>
          <label>Número de cédula</label>
          <input name="cedula" value={form.cedula} onChange={handleChange} placeholder="ejm. v12345678" style={{ width: "100%", padding: 8, marginTop: 4 }} />
        </div>
        <div style={{ marginBottom: 12 }}>
          <label>Correo institucional</label>
          <input name="correo" value={form.correo} onChange={handleChange} placeholder="ejm@unimet.com" style={{ width: "100%", padding: 8, marginTop: 4 }} />
        </div>
        <div style={{ marginBottom: 12 }}>
          <label>Número de teléfono</label>
          <input name="telefono" value={form.telefono} onChange={handleChange} placeholder="ejm. 04121234567" style={{ width: "100%", padding: 8, marginTop: 4 }} />
        </div>
        <div style={{ marginBottom: 12 }}>
          <label>Categoría</label>
          <div>
            <label>
              <input type="radio" name="categoria" value="Estudiante" checked={form.categoria === "Estudiante"} onChange={handleChange} />
              Estudiante
            </label>
            <label style={{ marginLeft: 16 }}>
              <input type="radio" name="categoria" value="Profesor" checked={form.categoria === "Profesor"} onChange={handleChange} />
              Profesor
            </label>
          </div>
        </div>
        <div style={{ display: "flex", gap: 8, marginTop: 24 }}>
          <button type="button" style={{ flex: 1, background: "#eee", border: "none", padding: 10, borderRadius: 6 }} onClick={() => navigate("/")}>
            Cancelar
          </button>
          <button type="button" style={{ flex: 1, background: "#222", color: "#fff", border: "none", padding: 10, borderRadius: 6 }} onClick={() => setPaso(2)}>
            Continuar
          </button>
        </div>
      </form>
    </div>
  );

  // Paso 2: Contraseña
  const PasoDos = (
    <div style={{ maxWidth: 400, margin: "40px auto", padding: 24, background: "#fff", borderRadius: 8 }}>
      <h2 style={{ color: "#273b80" }}>Registro</h2>
      <div style={{ fontSize: 14, color: "#222", marginBottom: 16, textAlign: "right" }}>Paso 2 de 2</div>
      <form>
        <div style={{ marginBottom: 12 }}>
          <label>Contraseña</label>
          <input type="password" name="contrasena" value={form.contrasena} onChange={handleChange} placeholder="Ingresa tu contraseña" style={{ width: "100%", padding: 8, marginTop: 4 }} />
        </div>
        <div style={{ marginBottom: 12 }}>
          <label>Confirma tu contraseña</label>
          <input type="password" name="repetirContrasena" value={form.repetirContrasena} onChange={handleChange} placeholder="Repite tu contraseña" style={{ width: "100%", padding: 8, marginTop: 4 }} />
        </div>
        <div style={{ display: "flex", gap: 8, marginTop: 24 }}>
          <button type="button" style={{ flex: 1, background: "#eee", border: "none", padding: 10, borderRadius: 6 }} onClick={() => setPaso(1)}>
            Regresar
          </button>
          <button type="button" style={{ flex: 1, background: "#222", color: "#fff", border: "none", padding: 10, borderRadius: 6 }} onClick={() => setExito(true)}>
            Finalizar
          </button>
        </div>
      </form>
    </div>
  );

  // Éxito
  const Exito = (
    <div style={{ maxWidth: 400, margin: "40px auto", padding: 24, background: "#fff", borderRadius: 8, textAlign: "center" }}>
      <div style={{ fontSize: 64, color: "#273b80", marginBottom: 16 }}>✔️</div>
      <h2 style={{ color: "#273b80" }}>¡Registro exitoso!</h2>
      <div style={{ marginBottom: 24 }}>Ya puedes ingresar a nuestro portal</div>
      <button style={{ width: "100%", background: "#222", color: "#fff", border: "none", padding: 12, borderRadius: 6 }} onClick={() => navigate("/iniciar-sesion")}>
        Ir al inicio
      </button>
    </div>
  );

  // Fondo y layout igual a tus capturas
  return (
    <div className="login">
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
        {!exito ? (paso === 1 ? PasoUno : PasoDos) : Exito}
      </div>
    </div>
  );
}

export default Registro;