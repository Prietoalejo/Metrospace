import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexto/AuthContext";
import { getFirestore, doc, updateDoc } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { app } from "../firebase";
import HeaderNavigation from "../componetes/HeaderNavigation";
import "../estilos/style.css";

const db = getFirestore(app);
const auth = getAuth(app);

function EditarPerfil() {
    const navigate = useNavigate();
    const { currentUser, setCurrentUser } = useAuth();
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        nombre: "",
        apellido: "",
        cedula: "",
        telefono: "",
        categoria: "Estudiante"
    });
    const [errors, setErrors] = useState({});

    // Cargar datos actuales del usuario
    useEffect(() => {
        if (currentUser?.userData) {
            setFormData({
                nombre: currentUser.userData.nombre || "",
                apellido: currentUser.userData.apellido || "",
                cedula: currentUser.userData.cedula || "",
                telefono: currentUser.userData.telefono || "",
                categoria: currentUser.userData.categoria || "Estudiante"
            });
        }
    }, [currentUser]);

    // Manejar cambios en los campos
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));

        // Limpiar error del campo cuando el usuario empiece a escribir
        if (errors[name]) {
            setErrors(prev => ({
                ...prev,
                [name]: ""
            }));
        }
    };

    // Validar formulario
    const validateForm = () => {
        const newErrors = {};

        if (!formData.nombre.trim()) {
            newErrors.nombre = "El nombre es requerido";
        }
        if (!formData.apellido.trim()) {
            newErrors.apellido = "El apellido es requerido";
        }
        if (!formData.cedula.trim()) {
            newErrors.cedula = "La cédula es requerida";
        }
        if (!formData.telefono.trim()) {
            newErrors.telefono = "El teléfono es requerido";
        } else if (!/^\d{11}$/.test(formData.telefono.replace(/\D/g, ''))) {
            newErrors.telefono = "El teléfono debe tener 11 dígitos";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    // Guardar cambios
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateForm()) {
            return;
        }

        setLoading(true);
        try {
            const user = auth.currentUser;
            const userDocRef = doc(db, "usuarios", user.uid);

            // Actualizar en Firestore
            await updateDoc(userDocRef, {
                nombre: formData.nombre.trim(),
                apellido: formData.apellido.trim(),
                cedula: formData.cedula.trim(),
                telefono: formData.telefono.trim(),
                categoria: formData.categoria,
                fechaActualizacion: new Date()
            });

            // Actualizar contexto local
            setCurrentUser(prev => ({
                ...prev,
                userData: {
                    ...prev.userData,
                    ...formData,
                    nombre: formData.nombre.trim(),
                    apellido: formData.apellido.trim(),
                    cedula: formData.cedula.trim(),
                    telefono: formData.telefono.trim(),
                    categoria: formData.categoria
                }
            }));

            alert("Perfil actualizado exitosamente");
            navigate("/perfil");
        } catch (error) {
            console.error("Error al actualizar perfil:", error);
            alert("Error al actualizar el perfil: " + error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="landing" style={{ background: "#f7f7f7", minHeight: "100vh" }}>
            <HeaderNavigation variant="dashboard" />

            <div style={{ maxWidth: 800, margin: "40px auto", padding: "0 20px" }}>
                {/* Breadcrumb */}
                <div style={{ color: "#888", fontSize: 16, marginBottom: 24 }}>
                    <span
                        style={{ cursor: "pointer", color: "#f78628" }}
                        onClick={() => navigate("/")}
                    >
                        Inicio
                    </span>
                    {' > '}
                    <span
                        style={{ cursor: "pointer", color: "#f78628" }}
                        onClick={() => navigate("/perfil")}
                    >
                        Mi perfil
                    </span>
                    {' > '}
                    <b>Editar perfil</b>
                </div>

                {/* Formulario de edición */}
                <div style={{
                    background: "#fff",
                    borderRadius: 16,
                    boxShadow: "0 4px 16px rgba(0, 0, 0, 0.1)",
                    padding: 40,
                    marginBottom: 40
                }}>
                    <div style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        marginBottom: 32
                    }}>
                        <h2 style={{
                            color: "#273b80",
                            fontSize: 28,
                            fontWeight: 700,
                            margin: 0
                        }}>
                            Editar mi perfil
                        </h2>
                        <button
                            style={{
                                background: "transparent",
                                border: "2px solid #dc3545",
                                color: "#dc3545",
                                borderRadius: 8,
                                padding: "8px 16px",
                                cursor: "pointer",
                                fontWeight: 500
                            }}
                            onClick={() => navigate("/perfil")}
                        >
                            Cancelar
                        </button>
                    </div>

                    <form onSubmit={handleSubmit}>
                        <div style={{ display: "grid", gap: 24 }}>
                            {/* Nombre */}
                            <div>
                                <label style={{
                                    display: "block",
                                    marginBottom: 8,
                                    fontWeight: 600,
                                    color: "#273b80"
                                }}>
                                    Nombre *
                                </label>
                                <input
                                    type="text"
                                    name="nombre"
                                    value={formData.nombre}
                                    onChange={handleChange}
                                    style={{
                                        width: "100%",
                                        padding: 12,
                                        border: errors.nombre ? "2px solid #dc3545" : "2px solid #e0e0e0",
                                        borderRadius: 8,
                                        fontSize: 16,
                                        outline: "none",
                                        transition: "border-color 0.2s"
                                    }}
                                    placeholder="Ingresa tu nombre"
                                />
                                {errors.nombre && (
                                    <div style={{ color: "#dc3545", fontSize: 14, marginTop: 4 }}>
                                        {errors.nombre}
                                    </div>
                                )}
                            </div>

                            {/* Apellido */}
                            <div>
                                <label style={{
                                    display: "block",
                                    marginBottom: 8,
                                    fontWeight: 600,
                                    color: "#273b80"
                                }}>
                                    Apellido *
                                </label>
                                <input
                                    type="text"
                                    name="apellido"
                                    value={formData.apellido}
                                    onChange={handleChange}
                                    style={{
                                        width: "100%",
                                        padding: 12,
                                        border: errors.apellido ? "2px solid #dc3545" : "2px solid #e0e0e0",
                                        borderRadius: 8,
                                        fontSize: 16,
                                        outline: "none",
                                        transition: "border-color 0.2s"
                                    }}
                                    placeholder="Ingresa tu apellido"
                                />
                                {errors.apellido && (
                                    <div style={{ color: "#dc3545", fontSize: 14, marginTop: 4 }}>
                                        {errors.apellido}
                                    </div>
                                )}
                            </div>

                            {/* Cédula */}
                            <div>
                                <label style={{
                                    display: "block",
                                    marginBottom: 8,
                                    fontWeight: 600,
                                    color: "#273b80"
                                }}>
                                    Cédula *
                                </label>
                                <input
                                    type="text"
                                    name="cedula"
                                    value={formData.cedula}
                                    onChange={handleChange}
                                    style={{
                                        width: "100%",
                                        padding: 12,
                                        border: errors.cedula ? "2px solid #dc3545" : "2px solid #e0e0e0",
                                        borderRadius: 8,
                                        fontSize: 16,
                                        outline: "none",
                                        transition: "border-color 0.2s"
                                    }}
                                    placeholder="Ej: V12345678"
                                />
                                {errors.cedula && (
                                    <div style={{ color: "#dc3545", fontSize: 14, marginTop: 4 }}>
                                        {errors.cedula}
                                    </div>
                                )}
                            </div>

                            {/* Teléfono */}
                            <div>
                                <label style={{
                                    display: "block",
                                    marginBottom: 8,
                                    fontWeight: 600,
                                    color: "#273b80"
                                }}>
                                    Teléfono *
                                </label>
                                <input
                                    type="tel"
                                    name="telefono"
                                    value={formData.telefono}
                                    onChange={handleChange}
                                    style={{
                                        width: "100%",
                                        padding: 12,
                                        border: errors.telefono ? "2px solid #dc3545" : "2px solid #e0e0e0",
                                        borderRadius: 8,
                                        fontSize: 16,
                                        outline: "none",
                                        transition: "border-color 0.2s"
                                    }}
                                    placeholder="Ej: 04121234567"
                                />
                                {errors.telefono && (
                                    <div style={{ color: "#dc3545", fontSize: 14, marginTop: 4 }}>
                                        {errors.telefono}
                                    </div>
                                )}
                            </div>

                            {/* Categoría */}
                            <div>
                                <label style={{
                                    display: "block",
                                    marginBottom: 8,
                                    fontWeight: 600,
                                    color: "#273b80"
                                }}>
                                    Categoría *
                                </label>
                                <div style={{ display: "flex", gap: 20 }}>
                                    <label style={{ display: "flex", alignItems: "center", gap: 8 }}>
                                        <input
                                            type="radio"
                                            name="categoria"
                                            value="Estudiante"
                                            checked={formData.categoria === "Estudiante"}
                                            onChange={handleChange}
                                            style={{ width: 16, height: 16 }}
                                        />
                                        <span style={{ fontSize: 16 }}>Estudiante</span>
                                    </label>
                                    <label style={{ display: "flex", alignItems: "center", gap: 8 }}>
                                        <input
                                            type="radio"
                                            name="categoria"
                                            value="Profesor"
                                            checked={formData.categoria === "Profesor"}
                                            onChange={handleChange}
                                            style={{ width: 16, height: 16 }}
                                        />
                                        <span style={{ fontSize: 16 }}>Profesor</span>
                                    </label>
                                </div>
                            </div>

                            {/* Botones */}
                            <div style={{
                                display: "flex",
                                gap: 16,
                                marginTop: 24,
                                justifyContent: "flex-end"
                            }}>
                                <button
                                    type="button"
                                    style={{
                                        background: "#f5f5f5",
                                        color: "#666",
                                        border: "2px solid #e0e0e0",
                                        borderRadius: 8,
                                        padding: "12px 24px",
                                        fontSize: 16,
                                        fontWeight: 600,
                                        cursor: "pointer",
                                        transition: "all 0.2s"
                                    }}
                                    onClick={() => navigate("/perfil")}
                                >
                                    Cancelar
                                </button>
                                <button
                                    type="submit"
                                    disabled={loading}
                                    style={{
                                        background: loading ? "#cccccc" : "#f78628",
                                        color: "#fff",
                                        border: "none",
                                        borderRadius: 8,
                                        padding: "12px 32px",
                                        fontSize: 16,
                                        fontWeight: 600,
                                        cursor: loading ? "not-allowed" : "pointer",
                                        transition: "all 0.2s"
                                    }}
                                >
                                    {loading ? "Guardando..." : "Guardar cambios"}
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>

            {/* Footer */}
            <footer className="footer" style={{
                background: "#273b80",
                color: "#fff",
                padding: "40px 0",
                marginTop: "auto"
            }}>
                <div style={{
                    maxWidth: 1100,
                    margin: "0 auto",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    gap: 16
                }}>
                    <p style={{ margin: 0 }}>
                        Copyright © 2025 - Universidad Metropolitana
                    </p>
                    <div style={{
                        height: 30,
                        width: 1,
                        background: "#fff",
                        opacity: 0.5
                    }} />
                    <p style={{ margin: 0 }}>
                        <span>Siguenos en </span>
                        <span style={{ fontWeight: 700 }}>Instagram</span>
                    </p>
                    <div style={{
                        height: 30,
                        width: 1,
                        background: "#fff",
                        opacity: 0.5
                    }} />
                    <p style={{ margin: 0 }}>Contáctanos</p>
                </div>
            </footer>
        </div>
    );
}

export default EditarPerfil; 