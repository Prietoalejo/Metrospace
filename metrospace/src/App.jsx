import React from "react";
import MisReservas from "./paginas/MisReservas";
import PerfilUsuario from "./paginas/PerfilUsuario";
import DashboardUsuario from "./paginas/DashboardUsuario";
import RutaProtegida from "./componetes/RutaProtegida"; // Corrige la ruta: 'componetes' -> 'componentes'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import BarraNavegacion from "./componetes/BarraNavegar";
import Inicio from "./paginas/Incio"; // O "./paginas/Inicio" si renombras el archivo
import Registro from "./paginas/Registro";
import IniciarSesion from "./paginas/IniciarSesion";
import { AuthProvider } from "./contexto/AuthContext"; // Asegúrate de envolver el Router

function App() {
  return (
    <AuthProvider>
      <Router>
        {/* <BarraNavegacion /> */}
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
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;