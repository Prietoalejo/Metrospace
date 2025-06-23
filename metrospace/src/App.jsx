import React from "react";
import MisReservas from "./paginas/MisReservas";
import PerfilUsuario from "./paginas/PerfilUsuario";
import DashboardUsuario from "./paginas/DashboardUsuario";
import RutaProtegida from "./componetes/RutaProtegida";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Inicio from "./paginas/Incio";
import Registro from "./paginas/Registro";
import IniciarSesion from "./paginas/IniciarSesion";
import { AuthProvider } from "./contexto/AuthContext";
import { uploadImage } from "../supabaseCredentials.js";

import PerfilAdmin from "./paginas/PerfilAdmin";
import Reportes from "./paginas/Reportes";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Inicio />} />
          <Route path="/registro" element={<Registro />} />
          <Route path="/iniciar-sesion" element={<IniciarSesion />} />
          <Route
            path="/dashboard"
            element={
              <RutaProtegida>
                <DashboardUsuario />
              </RutaProtegida>
            }
          />
          <Route
            path="/perfil"
            element={
              <RutaProtegida>
                <PerfilUsuario />
              </RutaProtegida>
            }
          />
          <Route
            path="/reservas"
            element={
              <RutaProtegida>
                <MisReservas />
              </RutaProtegida>
            }
          />
          {/* Nueva ruta para el perfil de administrador */}
          <Route path="/perfil-admin" element={<PerfilAdmin />} />

          <Route path="/reportes" element={<Reportes />} />
          
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;