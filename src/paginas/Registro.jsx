import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { upsertUsuario } from '../logica/supabaseUsuario';
import "../estilos/style.css";

function Registro() {
  const [paso, setPaso] = useState(1);
  const [form, setForm] = useState({
    nombre: "",
    apellido: "",
    cedula: "",
    correo: "",
    telefono: "",
    categoria: "Estudiante", // Por defecto estudiante
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

  const PasoUno = (
    <div
      style={{
        maxWidth: 400,
        margin: "40px auto",
        padding: 24,
        background: "#fff",
        borderRadius: 8,
      }}
    >
      <h2 style={{ color: "#273b80" }}>Registro</h2>
      <div style={{ fontSize: 14, color: "#222", marginBottom: 16, textAlign: "right" }}>
        Paso 1 de 2
      </div>
      <form>
        <div style={{ marginBottom: 12 }}>
          <label>Nombre</label>
          <label style={{ display: "block", marginBottom: 4, color: "#273b80", fontWeight: 500 }}>Nombre</label>
          <input
            name="nombre"
            value={form.nombre}
            onChange={handleChange}
            placeholder="Ejemplo: Alejandro"
            style={{ width: "100%", padding: 10, marginTop: 2, borderRadius: 8, border: "1px solid #ccc", background: "#f5f6fa", color: "#222", fontSize: 16 }}
          />
        </div>
        <div style={{ marginBottom: 12 }}>
          <label>Apellido</label>
          <label style={{ display: "block", marginBottom: 4, color: "#273b80", fontWeight: 500 }}>Apellido</label>
          <input
            name="apellido"
            value={form.apellido}
            onChange={handleChange}
            placeholder="Ejemplo: Prieto"
            style={{ width: "100%", padding: 10, marginTop: 2, borderRadius: 8, border: "1px solid #ccc", background: "#f5f6fa", color: "#222", fontSize: 16 }}
          />
        </div>
        <div style={{ marginBottom: 12 }}>
          <label>Número de cédula</label>
          <label style={{ display: "block", marginBottom: 4, color: "#273b80", fontWeight: 500 }}>Número de cédula</label>
          <input
            name="cedula"
            value={form.cedula}
            onChange={handleChange}
            placeholder="Ejemplo: V12345678"
            style={{ width: "100%", padding: 10, marginTop: 2, borderRadius: 8, border: "1px solid #ccc", background: "#f5f6fa", color: "#222", fontSize: 16 }}
          />
        </div>
        <div style={{ marginBottom: 12 }}>
          <label>Correo institucional</label>
          <label style={{ display: "block", marginBottom: 4, color: "#273b80", fontWeight: 500 }}>Correo institucional</label>
          <input
            name="correo"
            value={form.correo}
            onChange={handleChange}
            placeholder="Ejemplo: ejemplo@unimet.com"
            style={{ width: "100%", padding: 10, marginTop: 2, borderRadius: 8, border: "1px solid #ccc", background: "#f5f6fa", color: "#222", fontSize: 16 }}
          />
        </div>
        <div style={{ marginBottom: 12 }}>
          <label>Número de teléfono</label>
          <label style={{ display: "block", marginBottom: 4, color: "#273b80", fontWeight: 500 }}>Número de teléfono</label>
          <input
            name="telefono"
            value={form.telefono}
            onChange={handleChange}
            placeholder="Ejemplo: 04121234567"
            style={{ width: "100%", padding: 10, marginTop: 2, borderRadius: 8, border: "1px solid #ccc", background: "#f5f6fa", color: "#222", fontSize: 16 }}
          />
        </div>
        <div style={{ marginBottom: 12 }}>
          <label style={{ display: "block", marginBottom: 4, color: "#273b80", fontWeight: 500 }}>Categoría</label>
          <div>
            <label style={{ color: "#2c2c2c" }}>
              <input
                type="radio"
                name="categoria"
                value="Estudiante"
                checked={form.categoria === "Estudiante"}
                onChange={handleChange}
              />
              Estudiante
            </label>
            <label style={{ marginLeft: 16, color: "#2c2c2c" }}>
              <input
                type="radio"
                name="categoria"
                value="Profesor"
                checked={form.categoria === "Profesor"}
                onChange={handleChange}
              />
              Profesor
            </label>
          </div>
        </div>
        <div style={{ display: "flex", gap: 8, marginTop: 24 }}>
          <button
            type="button"
            style={{
              flex: 1,
              background: "#eee",
              border: "none",
              padding: 10,
              borderRadius: 6,
              color: "#767676",
            }}
            onClick={() => navigate("/")}
          >
            Cancelar
          </button>
          <button
            type="button"
            style={{
              flex: 1,
              background: "#222",
              color: "#fff",
              border: "none",
              padding: 10,
              borderRadius: 6,
            }}
            onClick={() => {
              // Validar solo los campos de la primera pantalla
              if (!form.nombre || !form.apellido || !form.cedula || !form.correo || !form.telefono || !form.categoria) {
                setError("Todos los campos son obligatorios");
                return;
              }
              if (!/^[A-Za-z]+$/.test(form.nombre)) {
                setError("El nombre solo debe contener letras (sin espacios ni tildes)");
                return;
              }
              if (!/^[A-Za-z]+$/.test(form.apellido)) {
                setError("El apellido solo debe contener letras (sin espacios ni tildes)");
                return;
              }
              if (!/^\d+$/.test(form.cedula)) {
                setError("La cédula solo debe contener números, sin puntos ni guiones");
                return;
              }
              if (!/^\d{10,15}$/.test(form.telefono)) {
                setError("El número de teléfono debe contener solo números (10 a 15 dígitos)");
                return;
              }
              if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(form.correo)) {
                setError("Correo inválido");
                return;
              }
              setError("");
              setPaso(2);
            }}
          >
            Continuar
          </button>
        </div>
      </form>
    </div>
  );
  const [error, setError] = useState(""); 
  // Validación de campos
  const validateForm = () => {
    // Validar campos obligatorios
    if (!form.nombre || !form.apellido || !form.cedula || !form.correo || !form.telefono || !form.categoria) {
      setError("Todos los campos son obligatorios");
      return false;
    }
    // Nombre y apellido: solo letras (sin tildes, sin espacios, sin caracteres especiales)
    if (!/^[A-Za-z]+$/.test(form.nombre)) {
      setError("El nombre solo debe contener letras (sin espacios ni tildes)");
      return false;
    }
    if (!/^[A-Za-z]+$/.test(form.apellido)) {
      setError("El apellido solo debe contener letras (sin espacios ni tildes)");
      return false;
    }
    // Cédula: solo números, sin caracteres especiales
    if (!/^\d+$/.test(form.cedula)) {
      setError("La cédula solo debe contener números, sin puntos ni guiones");
      return false;
    }
    // Teléfono: solo números, sin caracteres especiales
    if (!/^\d{10,15}$/.test(form.telefono)) {
      setError("El número de teléfono debe contener solo números (10 a 15 dígitos)");
      return false;
    }
    // Correo: formato válido y dominio institucional
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(form.correo)) {
      setError("Correo inválido");
      return false;
    }
    // Contraseña: mínimo 6 caracteres
    if (form.contrasena.length < 6) {
      setError("La contraseña debe tener al menos 6 caracteres");
      return false;
    }
    // Contraseñas iguales
    if (form.contrasena !== form.repetirContrasena) {
      setError("Las contraseñas no coinciden");
      return false;
    }
    setError("");
    return true;
  };

  // Función para registrar usuario y login automático SOLO con Firebase
  const handleRegister = async () => {
    setError("");
    if (!validateForm()) return;
    try {
      // Crear usuario en Firebase Auth
      const userCredential = await createUserWithEmailAndPassword(auth, form.correo, form.contrasena);
      const user = userCredential.user;
      // Guardar datos adicionales en la tabla usuarios
      await upsertUsuario({
        nombre: form.nombre,
        apellido: form.apellido,
        cedula: form.cedula,
        telefono: form.telefono,
        categoria: form.categoria,
        correo: form.correo,
        contrasena: null // Nunca guardar la contraseña en texto plano
      });
      // Redirigir al dashboard
      navigate("/dashboard");
    } catch (error) {
      if (error.code === "auth/email-already-in-use") {
        setError("El correo ya está registrado");
      } else {
        setError(error.message || 'Error al registrar usuario');
      }
    }
  };

  const PasoDos = (
    <div
      style={{
        maxWidth: 400,
        margin: "40px auto",
        padding: 24,
        background: "#fff",
        borderRadius: 8,
      }}
    >
      <h2 style={{ color: "#273b80" }}>Registro</h2>
      <div style={{ fontSize: 14, color: "#222", marginBottom: 16, textAlign: "right" }}>
        Paso 2 de 2
      </div>
      <form>
        <div style={{ marginBottom: 12 }}>
          <label>Contraseña</label>
          <label style={{ display: "block", marginBottom: 4, color: "#273b80", fontWeight: 500 }}>Contraseña</label>
          <input
            type="password"
            name="contrasena"
            value={form.contrasena}
            onChange={handleChange}
            placeholder="Ingresa tu contraseña"
            style={{ width: "100%", padding: 10, marginTop: 2, borderRadius: 8, border: "1px solid #ccc", background: "#f5f6fa", color: "#222", fontSize: 16 }}
          />
        </div>
        <div style={{ marginBottom: 12 }}>
          <label>Confirma tu contraseña</label>
          <label style={{ display: "block", marginBottom: 4, color: "#273b80", fontWeight: 500 }}>Confirma tu contraseña</label>
          <input
            type="password"
            name="repetirContrasena"
            value={form.repetirContrasena}
            onChange={handleChange}
            placeholder="Repite tu contraseña"
            style={{ width: "100%", padding: 10, marginTop: 2, borderRadius: 8, border: "1px solid #ccc", background: "#f5f6fa", color: "#222", fontSize: 16 }}
          />
        </div>
        <div style={{ display: "flex", gap: 8, marginTop: 24 }}>
          <button
            type="button"
            style={{
              flex: 1,
              background: "#eee",
              border: "none",
              padding: 10,
              borderRadius: 6,
              color: "#767676",
            }}
            onClick={() => setPaso(1)}
          >
            Regresar
          </button>
          <button
            type="button"
            style={{
              flex: 1,
              background: "#222",
              color: "#fff",
              border: "none",
              padding: 10,
              borderRadius: 6,
            }}
            onClick={handleRegister} 
          >
            Finalizar
          </button>
        </div>
      </form>
    </div>
  );

  const Exito = (
    <div
      style={{
        maxWidth: 400,
        margin: "40px auto",
        padding: 24,
        background: "#fff",
        borderRadius: 8,
        textAlign: "center",
      }}
    >
      <div style={{ fontSize: 64, color: "#273b80", marginBottom: 16 }}>✔️</div>
      <h2 style={{ color: "#273b80" }}>¡Registro exitoso!</h2>
      <div style={{ marginBottom: 24 }}>Ya puedes ingresar a nuestro portal</div>
      <button
        style={{
          width: "100%",
          background: "#222",
          color: "#fff",
          border: "none",
          padding: 12,
          borderRadius: 6,
        }}
        onClick={() => navigate("/")}
      >
        Ir al inicio
      </button>
    </div>
  );

  return (
    <div
      className="login"
      style={{
        display: "flex", 
        height: "100vh", 
        width: "100vw", 
        overflow: "hidden", 
      }}
    >
      <div
        className="bg-image"
        style={{
          height: "100%", 
          width: "934px", 
          background: "#e0e0e0",
          backgroundImage: `url('https://univnoticias.com/wp-content/uploads/2021/03/Universidad-Metropolitana-Unimet-1024x684.jpg')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          backgroundColor: "rgb(224, 224, 224)",
          display: "flex", 
          justifyContent: "center",
          alignItems: "center",
          flexShrink: 0, 
        }}
      >
        <div
          style={{
            color: "#fff",
            fontSize: 48,
            fontWeight: "bold",
            textShadow: "2px 2px 8px #000",
          }}
        >
          METROSPACE
        </div>
      </div>

      {/* Contenedor del formulario */}
      <div
        style={{
          flexGrow: 1, 
          background: "#fff",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "0 80px",
        }}
      >
        {!exito ? (paso === 1 ? PasoUno : PasoDos) : Exito}
        {error && (
          <div
            style={{
              color: "red",
              textAlign: "center",
              marginTop: "10px",
              fontSize: "14px",
            }}
          >
            {error}
          </div>
        )}
      </div>
    </div>
  );
}

export default Registro;


