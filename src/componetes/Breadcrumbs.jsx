import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

// Mapeo de rutas a nombres legibles
import { useAuth } from "../contexto/AuthContext";

const routeNames = {
  "/": "Inicio",
  "/reservas": "Mis reservas",
  "/nueva-reserva": "Nueva reserva",
  "/nueva-reserva/salones": "Salones",
  "/nueva-reserva-completa/:id": "Completar reserva",
  "/nueva-reserva/:id": "Completar reserva", // <-- Añadido
  "/perfil": "Mi perfil",
  "/editar-perfil": "Editar perfil",
  "/perfil-admin": "Perfil admin",
  "/reportes": "Reportes",
  "/ver-reportes": "Ver reportes",
  "/espacios": "Espacios",
  "/crear-espacio": "Crear espacio",
  "/editar-espacio/:nombre": "Editar espacio",
};

// Mapeo de rutas a su ruta padre lógica
const parentRoutes = {
  "/nueva-reserva": "/reservas",
  "/nueva-reserva/salones": "/nueva-reserva",
  "/nueva-reserva-completa/:id": "/nueva-reserva/salones",
  "/nueva-reserva/:id": "/nueva-reserva/salones", // <-- Añadido
  "/editar-perfil": "/perfil",
  "/ver-reportes": "/reportes",
  // --- ADMIN: Añadir flujo lógico para espacios desde reportes ---
  "/espacios": "/reportes",
  "/crear-espacio": "/espacios",
  "/editar-espacio/:nombre": "/espacios",
};

// Devuelve la key de ruta dinámica que coincide con el path
function matchDynamicRoute(pathname) {
  for (const key in routeNames) {
    if (key.includes(":")) {
      const base = key.split(":")[0];
      if (pathname.startsWith(base)) {
        // Además, debe tener la misma cantidad de segmentos
        const keySegments = key.split("/").filter(Boolean);
        const pathSegments = pathname.split("/").filter(Boolean);
        if (keySegments.length === pathSegments.length) {
          return key;
        }
      }
    }
  }
  return null;
}

// Obtiene el nombre legible de la ruta
function getRouteName(pathname) {
  if (routeNames[pathname]) return routeNames[pathname];
  const dynamicKey = matchDynamicRoute(pathname);
  if (dynamicKey) return routeNames[dynamicKey];
  // Si no hay coincidencia, capitaliza el último segmento
  const last = pathname.split("/").filter(Boolean).pop();
  return last ? last.charAt(0).toUpperCase() + last.slice(1) : "Inicio";
}

// Obtiene la ruta padre lógica
function getParentRoute(pathname) {
  if (parentRoutes[pathname]) return parentRoutes[pathname];
  const dynamicKey = matchDynamicRoute(pathname);
  if (dynamicKey && parentRoutes[dynamicKey]) return parentRoutes[dynamicKey];
  return null;
}

// Reconstruye la secuencia lógica completa de breadcrumbs
function getLogicalCrumbs(pathname) {
  let crumbs = [];
  let current = pathname;
  let safety = 0;
  while (current && safety < 10) {
    let label = getRouteName(current);
    let navTo = current;
    // Si es ruta dinámica, navega a la ruta base lógica (sin el parámetro)
    const dynamicKey = matchDynamicRoute(current);
    if (dynamicKey) {
      navTo = dynamicKey.split(":")[0].replace(/\/$/, "");
      if (!navTo) navTo = "/";
    }
    crumbs.unshift({ to: navTo, label });
    current = getParentRoute(current);
    safety++;
  }
  if (!crumbs.length || crumbs[0].to !== "/") {
    crumbs.unshift({ to: "/", label: routeNames["/"] });
  }
  // Elimina duplicados consecutivos (por rutas base iguales)
  return crumbs.filter((c, i, arr) => i === 0 || c.to !== arr[i - 1].to);
}


const Breadcrumbs = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { profile } = useAuth ? useAuth() : { profile: null };
  const logicalCrumbs = getLogicalCrumbs(location.pathname);

  // Detectar si el usuario es admin
  const isAdmin = profile && profile.categoria && profile.categoria.toLowerCase() === "administrador";

  // Sobrescribir el destino de "Inicio" según el tipo de usuario
  const handleNavigate = (to) => {
    if (to === "/") {
      if (isAdmin) {
        navigate("/reportes");
        return;
      }
    }
    navigate(to);
  };

  return (
    <nav aria-label="breadcrumb" style={{ color: "#888", fontSize: 16, margin: "16px auto 24px auto", userSelect: "none", display: "flex", justifyContent: "center", alignItems: "center", width: "100%", maxWidth: 900 }}>
      {logicalCrumbs.map((crumb, idx) =>
        idx < logicalCrumbs.length - 1 ? (
          <span
            key={crumb.to + idx}
            style={{ cursor: "pointer", color: "#888", textDecoration: "none" }}
            onClick={() => handleNavigate(crumb.to)}
          >
            {crumb.label} <span style={{ color: "#bbb" }}>{'>'}</span>{' '}
          </span>
        ) : (
          <span key={crumb.to + idx} style={{ color: "#222", fontWeight: "bold" }}>{crumb.label}</span>
        )
      )}
    </nav>
  );
};

export default Breadcrumbs;
