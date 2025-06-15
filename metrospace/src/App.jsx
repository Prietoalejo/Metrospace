import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import BarraNavegacion from "./componetes/BarraNavegar";
import Inicio from "./paginas/Incio"; // O "./paginas/Inicio" si renombras el archivo
import Registro from "./paginas/Registro";
import IniciarSesion from "./paginas/IniciarSesion";

function App() {
  return (
    <Router>
      {/* <BarraNavegacion /> */}
      <Routes>
        <Route path="/" element={<Inicio />} />
        <Route path="/registro" element={<Registro />} />
        <Route path="/iniciar-sesion" element={<IniciarSesion />} />
      </Routes>
    </Router>
  );
}

export default App;