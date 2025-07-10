import React, { useState, useEffect } from "react";
import "../estilos/style.css";
import { useNavigate } from "react-router-dom";
import Breadcrumbs from "../componetes/Breadcrumbs";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";


const tipos = ["Todos", "Auditorio", "Salón", "Laboratorio"];
const capacidades = ["Todas", 30, 35, 40, 150, 200];
const ubicaciones = ["Todas", "Edificio Principal", "A1", "A2", "EMG", "Edificio Paraninfo", "Edificio B"];


function NuevaReserva() {
  const [tipo, setTipo] = useState("Todos");
  const [capacidad, setCapacidad] = useState("Todas");
  const [ubicacion, setUbicacion] = useState("Todas");
  const [espacios, setEspacios] = useState([]);
  const [cargando, setCargando] = useState(true);
  const navigate = useNavigate();


  // Cargar espacios desde Firestore
  useEffect(() => {
    const cargarEspacios = async () => {
      try {
        const espaciosRef = collection(db, "espacios");
        const querySnapshot = await getDocs(espaciosRef);
       
        const espaciosData = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
       
        setEspacios(espaciosData);
      } catch (error) {
        console.error("Error cargando espacios:", error);
      } finally {
        setCargando(false);
      }
    };

<<<<<<< HEAD
<<<<<<< HEAD
	return (
		<div className="landing" style={{ minHeight: "100vh", background: "#fff" }}>
			<header
				style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 40px", height: 100, background: "#fff", borderBottom: "4px solid #f78628", boxSizing: "border-box", position: "relative", zIndex: 4 }}
			>
				<img
					src={Logo} 
					alt="Logo de Metrospace" 
					style={{
						width: 48,
						height: 48,
						marginRight: 24,
						objectFit: "contain",
					}} 
					/>
				<div style={{ fontWeight: 700, fontSize: 40, color: '#f78628',letterSpacing: "-1.44px", marginLeft: 80,whiteSpace: "nowrap",
              lineHeight: "48px", }}>METROSPACE</div>
				<div style={{ display: 'flex', gap: 16 }}>
					<button className="nav-button" style={{ background: '#222', color: '#fff', borderRadius: 8, padding: '8px 24px', fontWeight: 600, cursor: 'pointer' }} onClick={() => navigate('/reservas')}>Reservas</button>
					<button className="nav-button" style={{ background: '#fff',border: "1px solid #ccc", color: '#222', borderRadius: 8, padding: '8px 24px', fontWeight: 600, cursor: 'pointer' }} onClick={() => navigate('/perfil')}>Mi perfil</button>
				</div>
			</header>
			<Breadcrumbs />
			<main className="container">
				<h2 className="text-wrapper-2" style={{ marginBottom: 16 }}>Espacios disponibles</h2>
				<div style={{ display: "flex", gap: 12, marginBottom: 24 }}>
					<select value={tipo} onChange={e => setTipo(e.target.value)}>
						{tipos.map(t => <option key={t} value={t}>{t}</option>)}
					</select>
					<select value={capacidad} onChange={e => setCapacidad(e.target.value === "Todas" ? "Todas" : Number(e.target.value))}>
						{capacidades.map(c => <option key={c} value={c}>{c}</option>)}
					</select>
					<select value={ubicacion} onChange={e => setUbicacion(e.target.value)}>
						{ubicaciones.map(u => <option key={u} value={u}>{u}</option>)}
					</select>
					<button onClick={limpiarFiltros} className="nav-button" style={{ background: "none", border: "none", color: "#757575", cursor: "pointer" }}>Quitar filtros</button>
				</div>
				<div className="carrusel" style={{ flexWrap: "wrap", gap: 24 }}>
					{filtrarEspacios().length === 0 ? (
						<div style={{ color: '#888', fontStyle: 'italic' }}>No hay espacios disponibles con los filtros actuales.</div>
					) : (
						filtrarEspacios().map((espacio) => (
							<div
								key={espacio.id}
								className="div-2"
								style={{
									background: "#fff",
									borderRadius: 16,
									boxShadow: "0 2px 8px #0001",
									display: "flex",
									alignItems: "center",
									width: 480,
									marginBottom: 16,
									cursor: "pointer",
									transition: "box-shadow 0.2s",
								}}
								onClick={() => {
									if (espacio.nombre === "Salones") {
										navigate("/nueva-reserva/salones");
									} else {
										navigate(`/nueva-reserva/${espacio.id}`);
									}
								}}
							>
								<img src={espacio.imagen} alt={espacio.nombre} className="img" style={{ width: 100, height: 100, objectFit: "cover", borderRadius: 12, margin: 16 }} />
								<div style={{ flex: 1 }}>
									<div className="text-wrapper-3" style={{ fontWeight: 600, fontSize: 18 }}>{espacio.nombre}</div>
									<div style={{ color: "#757575", fontSize: 14, margin: "4px 0" }}>
										{espacio.capacidad ? `Capacidad para ${espacio.capacidad} personas` : null}
									</div>
									<div style={{ color: "#757575", fontSize: 14 }}>{espacio.tipo}</div>
								</div>
								<div style={{ marginRight: 24, fontSize: 28, color: "#BDBDBD" }}>&#8250;</div>
							</div>
						))
					)}
				</div>
			</main>
			<footer className="footer">
				<div className="text">
					<span className="text-wrapper-4">Copyright © 2025 - Universidad Metropolitana</span>
					<span className="line" style={{background: '#fff', width: 1, height: 30}}></span>
					<span className="siguenos-en-intagram">Síguenos en <span className="text-wrapper-5">Intagram</span></span>
					<span className="line" style={{background: '#fff', width: 1, height: 30}}></span>
					<span className="span">Contactanos</span>
				</div>
			</footer>
		</div>
	);
=======
=======
>>>>>>> 824fac8aff7794f5cf475833f7bd39874ff1ca52

    cargarEspacios();
  }, []);


  const filtrarEspacios = () => {
    return espacios.filter((espacio) => {
      return (
        (tipo === "Todos" || espacio.tipo === tipo) &&
        (capacidad === "Todas" || espacio.capacidad === capacidad) &&
        (ubicacion === "Todas" || espacio.ubicacion === ubicacion)
      );
    });
  };


  const limpiarFiltros = () => {
    setTipo("Todos");
    setCapacidad("Todas");
    setUbicacion("Todas");
  };


  return (
    <div className="landing" style={{ minHeight: "100vh", background: "#fff" }}>
      <header
        style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 40px", height: 100, background: "#fff", borderBottom: "4px solid #f78628", boxSizing: "border-box", position: "relative", zIndex: 4 }}
      >
        {/* Logo o espacio gris */}
        <div style={{ width: 48, height: 48, background: '#e0e0e0', borderRadius: 8, marginRight: 24 }}></div>
        <div style={{ fontWeight: 700, fontSize: 32, color: '#f78628', letterSpacing: -1.2 }}>METROSPACE</div>
        <div style={{ display: 'flex', gap: 16 }}>
          <button className="nav-button" style={{ background: '#fff', border: '1px solid #f78628', color: '#f78628', borderRadius: 8, padding: '8px 24px', fontWeight: 600, cursor: 'pointer' }} onClick={() => navigate('/reservas')}>Reservas</button>
          <button className="nav-button" style={{ background: '#fff', border: '1px solid #f78628', color: '#f78628', borderRadius: 8, padding: '8px 24px', fontWeight: 600, cursor: 'pointer' }} onClick={() => navigate('/perfil')}>Mi perfil</button>
        </div>
      </header>
      <Breadcrumbs />
      <main className="container">
        <h2 className="text-wrapper-2" style={{ marginBottom: 16 }}>Espacios disponibles</h2>
        <div style={{ display: "flex", gap: 12, marginBottom: 24 }}>
          <select
            value={tipo}
            onChange={e => setTipo(e.target.value)}
            style={{ padding: '8px 12px', borderRadius: 8, border: '1px solid #ddd' }}
          >
            {tipos.map(t => <option key={t} value={t}>{t}</option>)}
          </select>
          <select
            value={capacidad}
            onChange={e => setCapacidad(e.target.value === "Todas" ? "Todas" : Number(e.target.value))}
            style={{ padding: '8px 12px', borderRadius: 8, border: '1px solid #ddd' }}
          >
            {capacidades.map(c => <option key={c} value={c}>{c}</option>)}
          </select>
          <select
            value={ubicacion}
            onChange={e => setUbicacion(e.target.value)}
            style={{ padding: '8px 12px', borderRadius: 8, border: '1px solid #ddd' }}
          >
            {ubicaciones.map(u => <option key={u} value={u}>{u}</option>)}
          </select>
          <button
            onClick={limpiarFiltros}
            className="nav-button"
            style={{
              background: "none",
              border: "1px solid #ddd",
              color: "#757575",
              cursor: "pointer",
              padding: '8px 12px',
              borderRadius: 8,
            }}
          >
            Quitar filtros
          </button>
        </div>
       
        {cargando ? (
          <div style={{ textAlign: 'center', padding: '40px 0' }}>
            <div className="spinner"></div>
            <p style={{ marginTop: 16 }}>Cargando espacios disponibles...</p>
          </div>
        ) : (
          <div className="carrusel" style={{ flexWrap: "wrap", gap: 24 }}>
            {filtrarEspacios().length === 0 ? (
              <div style={{ color: '#888', fontStyle: 'italic' }}>No hay espacios disponibles con los filtros actuales.</div>
            ) : (
              filtrarEspacios().map((espacio) => (
                <div
                  key={espacio.id}
                  className="div-2"
                  style={{
                    background: "#fff",
                    borderRadius: 16,
                    boxShadow: "0 2px 8px #0001",
                    display: "flex",
                    alignItems: "center",
                    width: 480,
                    marginBottom: 16,
                    cursor: "pointer",
                    transition: "box-shadow 0.2s",
                    ':hover': {
                      boxShadow: "0 4px 12px #0002"
                    }
                  }}
                  onClick={() => {
                    if (espacio.nombre === "Salones") {
                      navigate("/nueva-reserva/salones");
                    } else {
                      navigate(`/nueva-reserva/${espacio.id}`);
                    }
                  }}
                >
                  <img
                    src={espacio.imagen}
                    alt={espacio.nombre}
                    className="img"
                    style={{
                      width: 100,
                      height: 100,
                      objectFit: "cover",
                      borderRadius: 12,
                      margin: 16
                    }}
                  />
                  <div style={{ flex: 1 }}>
                    <div
                      className="text-wrapper-3"
                      style={{
                        fontWeight: 600,
                        fontSize: 18,
                        whiteSpace: 'nowrap',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis'
                      }}
                    >
                      {espacio.nombre}
                    </div>
                    <div style={{ color: "#757575", fontSize: 14, margin: "4px 0" }}>
                      {espacio.capacidad ? `Capacidad para ${espacio.capacidad} personas` : null}
                    </div>
                    <div style={{ color: "#757575", fontSize: 14 }}>
                      {espacio.tipo} • {espacio.ubicacion}
                    </div>
                  </div>
                  <div style={{ marginRight: 24, fontSize: 28, color: "#BDBDBD" }}>&#8250;</div>
                </div>
              ))
            )}
          </div>
        )}
      </main>
      <footer className="footer">
        <div className="text">
          <span className="text-wrapper-4">Copyright © 2025 - Universidad Metropolitana</span>
          <span className="line" style={{background: '#fff', width: 1, height: 30}}></span>
          <span className="siguenos-en-intagram">Síguenos en <span className="text-wrapper-5">Intagram</span></span>
          <span className="line" style={{background: '#fff', width: 1, height: 30}}></span>
          <span className="span">Contactanos</span>
        </div>
      </footer>
     
      {/* Estilos para el spinner de carga */}
      <style jsx>{`
        @keyframes spinner {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        .spinner {
          border: 4px solid rgba(0, 0, 0, 0.1);
          width: 40px;
          height: 40px;
          border-radius: 50%;
          border-left-color: #f78628;
          animation: spinner 1s linear infinite;
          margin: 0 auto;
        }
      `}</style>
    </div>
  );
<<<<<<< HEAD
>>>>>>> 824fac8aff7794f5cf475833f7bd39874ff1ca52
=======
>>>>>>> 824fac8aff7794f5cf475833f7bd39874ff1ca52
}


export default NuevaReserva;




