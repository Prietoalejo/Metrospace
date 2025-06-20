import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../contexto/AuthContext";

export default function RutaProtegida({ children, rol }) {
  const { usuario } = useAuth();

  if (!usuario) return <Navigate to="/iniciar-sesion" />;
  if (rol && usuario.rol !== rol) return <Navigate to="/" />;

  return children;
}