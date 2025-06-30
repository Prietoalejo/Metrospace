import React from "react";
import { Link, useLocation } from "react-router-dom";

const breadcrumbMap = {
  "/": { label: "Inicio", to: "/" },
  "/reservas": { label: "Mis reservas", to: "/reservas" },
  "/nueva-reserva": { label: "Nueva reserva", to: "/nueva-reserva" },
  "/perfil": { label: "Mi perfil", to: "/perfil" },
  "/dashboard": { label: "Dashboard", to: "/dashboard" },
  "/perfil-admin": { label: "Perfil admin", to: "/perfil-admin" },
  "/reportes": { label: "Reportes", to: "/reportes" },
};

const Breadcrumbs = () => {
  const location = useLocation();
  const paths = location.pathname.split("/").filter(Boolean);
  let pathAcc = "";
  const crumbs = paths.map((p, idx) => {
    pathAcc += "/" + p;
    const isLast = idx === paths.length - 1;
    const crumb = breadcrumbMap[pathAcc] || { label: p, to: pathAcc };
    return isLast ? (
      <span key={pathAcc} style={{ fontWeight: "bold", color: "#222" }}>{crumb.label}</span>
    ) : (
      <span key={pathAcc}>
        <Link to={crumb.to} style={{ color: "#BDBDBD", textDecoration: "none" }}>{crumb.label}</Link>
        {" > "}
      </span>
    );
  });
  // Siempre incluir Inicio al principio
  return (
    <div style={{ marginBottom: 16 }}>
      <Link to="/" style={{ color: "#BDBDBD", textDecoration: "none" }}>Inicio</Link>
      {paths.length > 0 && " > "}
      {crumbs}
    </div>
  );
};

export default Breadcrumbs;
