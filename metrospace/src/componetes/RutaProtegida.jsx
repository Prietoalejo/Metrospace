import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexto/AuthContext';


const RutaProtegida = ({ children }) => {
  const { currentUser, loading } = useAuth();


  if (loading) {
    return (
      <div style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        background: "#f7f7f7"
      }}>
        <div>Cargando...</div>
      </div>
    );
  }


  if (!currentUser) {
    return <Navigate to="/iniciar-sesion" replace />;
  }


  return children;
};


export default RutaProtegida;



