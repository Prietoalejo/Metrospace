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

import PerfilAdmin from "./paginas/PerfilAdmin";
import Reportes from "./paginas/Reportes";
import NuevaReservaCompleta from "./paginas/NuevaReservaCompleta";
import NuevaReserva from "./paginas/NuevaReserva";
import NuevaReservaSalones from "./paginas/NuevaReservaSalones";

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
          <Route
            path="/nueva-reserva"
            element={
              <RutaProtegida>
                <NuevaReserva />
              </RutaProtegida>
            }
          />
          <Route
            path="/nueva-reserva/:id"
            element={
              <RutaProtegida>
                <NuevaReservaCompleta />
              </RutaProtegida>
            }
          />
          <Route
            path="/nueva-reserva-completa/:id"
            element={
              <RutaProtegida>
                <NuevaReservaCompleta />
              </RutaProtegida>
            }
          />
          <Route
            path="/nueva-reserva/salones"
            element={
              <RutaProtegida>
                <NuevaReservaSalones />
              </RutaProtegida>
            }
          />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;