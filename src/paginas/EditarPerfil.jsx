
import React, { useState, useEffect } from "react";
import { useAuth } from "../contexto/AuthContext";
import { upsertUsuario } from "../logica/supabaseUsuario";
import { useNavigate } from "react-router-dom";

function EditarPerfil() {
  const { currentUser, profile, setProfile } = useAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    nombre: "",
    apellido: "",
    cedula: "",
    telefono: "",
    categoria: "Estudiante"
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    if (profile) {
      setFormData({
        nombre: profile.nombre || "",
        apellido: profile.apellido || "",
        cedula: profile.cedula || "",
        telefono: profile.telefono || "",
        categoria: profile.categoria || "Estudiante"
      });
    }
  }, [profile]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.nombre.trim()) newErrors.nombre = "El nombre es requerido";
    if (!formData.apellido.trim()) newErrors.apellido = "El apellido es requerido";
    if (!formData.cedula.trim()) newErrors.cedula = "La cédula es requerida";
    if (!formData.telefono.trim()) newErrors.telefono = "El teléfono es requerido";
    else if (!/^\d{11}$/.test(formData.telefono.replace(/\D/g, ""))) newErrors.telefono = "El teléfono debe tener 11 dígitos";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    setLoading(true);
    try {
      const updated = await upsertUsuario({
        ...formData,
        correo: currentUser.email,
        contrasena: null,
        rol: profile?.rol || "usuario"
      });
      const usuario = Array.isArray(updated) ? updated[0] : updated;
      setProfile(usuario);
      setSuccess(true);
      setTimeout(() => {
        navigate("/perfil");
      }, 1500);
    } catch (error) {
      alert("Error al actualizar el perfil: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  if (!currentUser) {
    return <div style={{ textAlign: "center", marginTop: 80, color: '#dc3545' }}>Debes iniciar sesión para editar tu perfil.</div>;
  }

  return (
    <div style={{ maxWidth: 400, margin: "60px auto", background: "#fff", borderRadius: 12, boxShadow: "0 2px 12px #0001", padding: 32 }}>
      <h2 style={{ color: "#273b80", fontWeight: 700, marginBottom: 24, textAlign: "center" }}>Editar mi perfil</h2>
      {success && (
        <div style={{
          background: '#e6f9ec',
          color: '#218838',
          border: '1.5px solid #b2e2c7',
          borderRadius: 8,
          padding: '12px 0',
          textAlign: 'center',
          marginBottom: 18,
          fontWeight: 600
        }}>
          ¡Perfil actualizado correctamente!
        </div>
      )}
      <form onSubmit={handleSubmit}>
        <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
          <label>
            Nombre *
            <input
              type="text"
              name="nombre"
              value={formData.nombre}
              onChange={handleChange}
              style={{ width: "100%", padding: 10, borderRadius: 6, border: errors.nombre ? "2px solid #dc3545" : "1px solid #ccc", marginTop: 4 }}
              placeholder="Ingresa tu nombre"
            />
            {errors.nombre && <span style={{ color: "#dc3545", fontSize: 13 }}>{errors.nombre}</span>}
          </label>
          <label>
            Apellido *
            <input
              type="text"
              name="apellido"
              value={formData.apellido}
              onChange={handleChange}
              style={{ width: "100%", padding: 10, borderRadius: 6, border: errors.apellido ? "2px solid #dc3545" : "1px solid #ccc", marginTop: 4 }}
              placeholder="Ingresa tu apellido"
            />
            {errors.apellido && <span style={{ color: "#dc3545", fontSize: 13 }}>{errors.apellido}</span>}
          </label>
          <label>
            Cédula *
            <input
              type="text"
              name="cedula"
              value={formData.cedula}
              onChange={handleChange}
              style={{ width: "100%", padding: 10, borderRadius: 6, border: errors.cedula ? "2px solid #dc3545" : "1px solid #ccc", marginTop: 4 }}
              placeholder="Ej: V12345678"
            />
            {errors.cedula && <span style={{ color: "#dc3545", fontSize: 13 }}>{errors.cedula}</span>}
          </label>
          <label>
            Teléfono *
            <input
              type="tel"
              name="telefono"
              value={formData.telefono}
              onChange={handleChange}
              style={{ width: "100%", padding: 10, borderRadius: 6, border: errors.telefono ? "2px solid #dc3545" : "1px solid #ccc", marginTop: 4 }}
              placeholder="Ej: 04121234567"
            />
            {errors.telefono && <span style={{ color: "#dc3545", fontSize: 13 }}>{errors.telefono}</span>}
          </label>
          <div>
            <span>Categoría *</span>
            <div style={{ display: "flex", gap: 16, marginTop: 6 }}>
              <label style={{ display: "flex", alignItems: "center", gap: 6 }}>
                <input
                  type="radio"
                  name="categoria"
                  value="Estudiante"
                  checked={formData.categoria === "Estudiante"}
                  onChange={handleChange}
                /> Estudiante
              </label>
              <label style={{ display: "flex", alignItems: "center", gap: 6 }}>
                <input
                  type="radio"
                  name="categoria"
                  value="Profesor"
                  checked={formData.categoria === "Profesor"}
                  onChange={handleChange}
                /> Profesor
              </label>
            </div>
          </div>
          <div style={{ marginTop: 8, color: '#888', fontSize: 14 }}>
            <b>Correo:</b> {currentUser.email}
          </div>
          <button
            type="submit"
            disabled={loading}
            style={{ marginTop: 18, background: loading ? "#ccc" : "#f78628", color: "#fff", border: "none", borderRadius: 6, padding: "12px 0", fontWeight: 600, fontSize: 16, cursor: loading ? "not-allowed" : "pointer" }}
          >
            {loading ? "Guardando..." : "Guardar cambios"}
          </button>
        </div>
      </form>
    </div>
  );
}

export default EditarPerfil;