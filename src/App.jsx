import React from "react";
import MisReservas from "./paginas/MisReservas";
import EditarPerfil from "./paginas/EditarPerfil";
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
import Espacios from "./paginas/Espacios";
import CrearEspacio from "./paginas/CrearEspacio";
import VerReportes from "./paginas/VerReportes";
import EditarPerfilEspacio from "./paginas/EditarPerfilEspacio";

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
          <Route path="/espacios" element={<Espacios />} />
          <Route path="/crear-espacio" element={<CrearEspacio />} /> {/* Nueva ruta */}
          <Route path="/ver-reportes" element={<VerReportes />} />
          <Route path="/editar-espacio/:id" element={<EditarPerfilEspacio />} />
        <Route
          path="/editar-perfil"
          element={
            <RutaProtegida>
              <EditarPerfil />
            </RutaProtegida>
          }
        />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;