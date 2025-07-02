import React, { useState } from "react";
import "../estilos/style.css";
import { useNavigate } from "react-router-dom";
import Breadcrumbs from "../componetes/Breadcrumbs";

const espaciosEjemplo = [
	{
		id: 1,
		nombre: "Auditorio Pensiari",
		capacidad: 200,
		tipo: "Auditorio",
		ubicacion: "Edificio Principal",
		imagen: "https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=400&q=80",
	},
	{
		id: 3,
		nombre: "Laboratorios",
		capacidad: 30,
		tipo: "Laboratorio",
		ubicacion: "Edificio B",
		imagen: "https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?auto=format&fit=crop&w=400&q=80",
	},
	{
		id: 4,
		nombre: "Eugenio Mendoza",
		capacidad: 35,
		tipo: "Salón",
		ubicacion: "EMG",
		imagen: "https://images.unsplash.com/photo-1521737852567-6949f3f9f2b5?auto=format&fit=crop&w=400&q=80",
	},
	{
		id: 5,
		nombre: "Auditorio Paraninfo Luisa Rodríguez De Mendoza",
		capacidad: 150,
		tipo: "Auditorio",
		ubicacion: "Edificio Paraninfo",
		imagen: "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=400&q=80",
	},
	{
		id: 6,
		nombre: "Salones",
		capacidad: 40,
		tipo: "Salón",
		ubicacion: "Edificio Principal",
		imagen: "https://images.unsplash.com/photo-1503676382389-4809596d5290?auto=format&fit=crop&w=400&q=80",
	},
];

const tipos = ["Todos", "Auditorio", "Salón", "Laboratorio"];
const capacidades = ["Todas", 30, 35, 40, 150, 200];
const ubicaciones = ["Todas", "Edificio Principal", "A1", "A2", "EMG", "Edificio Paraninfo", "Edificio B"];

function NuevaReserva() {
	const [tipo, setTipo] = useState("Todos");
	const [capacidad, setCapacidad] = useState("Todas");
	const [ubicacion, setUbicacion] = useState("Todas");
	const navigate = useNavigate();

	const filtrarEspacios = () => {
		return espaciosEjemplo.filter((espacio) => {
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
}

export default NuevaReserva;
