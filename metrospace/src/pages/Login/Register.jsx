import React from "react";
import GoogleButton from "../components/GoogleButton";
import { useNavigate } from "react-router-dom";

const Auth = () => {
  const navigate = useNavigate();

  const handleGoogleLogin = () => {
    // Simulación (luego se reemplazará con Firebase)
    alert("Redirigiendo a Google para autenticación...");
    setTimeout(() => {
      navigate("/"); // Redirige al home tras "éxito"
    }, 1500);
  };

  return (
    <div className="auth-page">
      <h1>Bienvenido a MetroSpace</h1>
      <p>Alquila espacios universitarios con tu cuenta de Google</p>
      <GoogleButton onClick={handleGoogleLogin} />
    </div>
  );
};

export default Auth;