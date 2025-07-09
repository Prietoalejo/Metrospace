import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { signInWithGoogle } from "../firebase";
import { supabase } from "../../supabaseCredentials";
import Modal from '../componetes/Modal';
import "../estilos/style.css";


function IniciarSesion() {
  // const navigate = useNavigate(); // Ya está declarado arriba
  // Redirigir automáticamente si el usuario ya está autenticado (por Google o email)
  // Eliminado el useEffect de Supabase Auth para dejar solo la lógica de Firebase
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalMsg, setModalMsg] = useState("");
  const navigate = useNavigate();

  // Función para iniciar sesión con Firebase Auth (correo y contraseña)
  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      // Consultar datos del usuario para saber si es admin
      const { data: userData, error: userError } = await supabase
        .from('usuarios')
        .select('categoria')
        .eq('correo', email)
        .single();
      if (userError) throw userError;
      if (userData && userData.categoria && userData.categoria.toLowerCase() === "administrador") {
        navigate("/reportes");
      } else {
        navigate("/dashboard");
      }
    } catch (error) {
      let msg = error.message || "Error al iniciar sesión";
      if (msg.includes("auth/wrong-password")) msg = "Contraseña incorrecta.";
      if (msg.includes("auth/user-not-found")) msg = "Usuario no encontrado.";
      setModalMsg(msg);
      setModalOpen(true);
    } finally {
      setLoading(false);
    }
  };

  // Función para iniciar sesión con Google usando Firebase utilitario
  const handleGoogleLogin = async () => {
    setLoading(true);
    try {
      const user = await signInWithGoogle();
      if (!user) {
        setLoading(false);
        return;
      }
      // Consultar datos del usuario para saber si es admin
      const { data: userData, error: userError } = await supabase
        .from('usuarios')
        .select('categoria')
        .eq('correo', user.email)
        .single();
      if (userError) throw userError;
      if (userData && userData.categoria && userData.categoria.toLowerCase() === "administrador") {
        navigate("/reportes");
      } else {
        navigate("/dashboard");
      }
    } catch (error) {
      let msg = error.message || "Error al iniciar sesión con Google";
      setModalMsg(msg);
      setModalOpen(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)}>
        <div style={{ color: '#222', fontSize: 14, textAlign: 'center', fontWeight: 500, padding: '12px 0' }}>{modalMsg}</div>
      </Modal>
      <div className="login">
        {/* Panel izquierdo (imagen de fondo) */}
        <div
          className="bg-image"
          style={{
            height: "1024px",
            width: "934px",
            backgroundImage: `url('https://univnoticias.com/wp-content/uploads/2021/03/Universidad-Metropolitana-Unimet-1024x684.jpg')`, 
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            backgroundColor: "rgb(224, 224, 224)", 
            position: "absolute",
            left: 0,
            top: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div
            style={{
              color: "#fff",
              fontSize: 48,
              fontWeight: "bold",
              textShadow: "2px 2px 8px #000",
              fontFamily: "Roboto Condensed-Bold, Helvetica",
              letterSpacing: "-3%",
            }}
          >
            METROSPACE
          </div>
        </div>

        {/* Panel derecho (formulario) */}
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

          <form onSubmit={handleLogin}>
            <div style={{ marginBottom: 16 }}>
              <label style={{ fontWeight: 500 }}>Correo electrónico</label>
              <input
                type="email"
                placeholder="ejemplo@unimet.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                style={{ width: "100%", padding: 12, marginTop: 8, borderRadius: 8, border: "1px solid #ccc", fontSize: 16 }}
              />
            </div>
            <div style={{ marginBottom: 8 }}>
              <label style={{ fontWeight: 500 }}>Contraseña</label>
              <input
                type="password"
                placeholder="********"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                style={{ width: "100%", padding: 12, marginTop: 8, borderRadius: 8, border: "1px solid #ccc", fontSize: 16 }}
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              style={{
                width: "100%",
                padding: 12,
                background: loading ? "#ccc" : "#222",
                color: "#fff",
                border: "none",
                borderRadius: 8,
                fontSize: 16,
                fontWeight: 600,
                marginTop: 16,
                marginBottom: 16,
                cursor: loading ? "not-allowed" : "pointer",
              }}
            >
              {loading ? "Ingresando..." : "Ingresar"}
            </button>
          </form>

          <div style={{ textAlign: "center", marginBottom: 16, fontSize: 12 }}>
            ¿No tienes cuenta?{" "}
            <a href="/registro" style={{ color: "#0a72d4", textDecoration: "underline" }}>
              Regístrate
            </a>
          </div>

          {/* 4. Botón de Google actualizado con el onClick y el estado 'disabled' */}
          <button
            onClick={handleGoogleLogin}
            disabled={loading}
            style={{
              width: "100%",
              padding: 12,
              background: "#fff",
              border: "1px solid #ccc",
              borderRadius: 8,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 8,
              fontSize: 14,
              marginBottom: 24,
              cursor: loading ? "not-allowed" : "pointer",
              opacity: loading ? 0.6 : 1,
            }}
          >
            {/* Icono de Google (SVG simple) */}
            <svg width="18" height="18" viewBox="0 0 18 18">
              <path fill="#4285F4" d="M17.64 9.20455c0-.63864-.05727-1.25182-.16818-1.84091H9.18182v3.48182h4.79182c-.20864 1.125-.84409 2.07818-1.77727 2.71364v2.25818h2.90818c1.70182-1.56682 2.68409-3.87409 2.68409-6.61273z" />
              <path fill="#34A853" d="M9.18182 18c2.43 0 4.46727-.80591 5.95636-2.18182l-2.90818-2.25818c-.80591.54-1.84091.86182-3.04818.86182-2.34545 0-4.32955-1.58318-5.03591-3.71091H1.24182v2.33182C2.72591 16.3377 5.70182 18 9.18182 18z" />
              <path fill="#FBBC05" d="M4.14591 10.8909c-.18727-.54-.29545-1.11727-.29545-1.72727s.10818-1.18727.29545-1.72727V5.09909H1.24182C.45 6.62318 0 8.09318 0 9.16364s.45 2.54045 1.24182 4.06455l2.90409-2.33728z" />
              <path fill="#EA4335" d="M9.18182 3.63636c1.32273 0 2.50773.45545 3.44 1.34636l2.58182-2.58182C13.6455.95545 11.6141 0 9.18182 0 2.70182 0 .725909 2.66227 1.24182 5.09909l2.90409 2.33727C4.85227 5.22 6.83636 3.63636 9.18182 3.63636z" />
            </svg>
            <span style={{ fontWeight: 500, color: "#222" }}>Iniciar sesión con Google</span>
          </button>

          <div style={{ textAlign: "center" }}>
            <a href="/" style={{ color: "#5A5A5A", textDecoration: "underline", fontSize: 16 }}>
              Volver al inicio
            </a>
          </div>
        </div>
      </div>
    </>
  );
}

export default IniciarSesion;


