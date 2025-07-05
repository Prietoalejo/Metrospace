import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Breadcrumbs from "../componetes/Breadcrumbs";

// Datos estáticos de secciones y salones
const secciones = [
	{
		id: "A1",
		nombre: "Salones del A1",
		descripcion:
			"Estos salones son espacios funcionales para clases, que cuentan con pupitres, pizarras y pantallas de proyección. Cuenta con buena iluminación y ventilación. Su objetivo principal es facilitar el proceso de enseñanza-aprendizaje de manera práctica.",
		imagen:
			"https://images.unsplash.com/photo-1503676382389-4809596d5290?auto=format&fit=crop&w=400&q=80",
		salones: [
			{
				id: "A1-208",
				nombre: "A1-208",
				capacidad: 200,
			},
			{
				id: "A1-304",
				nombre: "A1-304",
				capacidad: 150,
			},
			{
				id: "A1-102",
				nombre: "A1-102",
				capacidad: 100,
			},
			{
				id: "A1-207",
				nombre: "A1-207",
				capacidad: 200,
			},
		],
	},
	{
		id: "A2",
		nombre: "Salones del A2",
		descripcion:
			"Salones modernos y equipados para clases y actividades académicas, con mobiliario ergonómico y recursos audiovisuales.",
		imagen:
			"https://images.unsplash.com/photo-1511453672303-1d7b7af2c9b2?auto=format&fit=crop&w=400&q=80",
		salones: [
			{
				id: "A2-101",
				nombre: "A2-101",
				capacidad: 120,
			},
			{
				id: "A2-201",
				nombre: "A2-201",
				capacidad: 90,
			},
			{
				id: "A2-305",
				nombre: "A2-305",
				capacidad: 110,
			},
		],
	},
];

function NuevaReservaSalones() {
	const [seccionSeleccionada, setSeccionSeleccionada] = useState(secciones[0].id);
	const navigate = useNavigate();
	const seccion = secciones.find((s) => s.id === seccionSeleccionada);

	return (
		<div className="landing" style={{ minHeight: "100vh", background: "#fff" }}>
			<header style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 40px', height: 80, background: '#fff', borderBottom: '1px solid #eee' }}>
				<div style={{ width: 48, height: 48, background: '#e0e0e0', borderRadius: 8, marginRight: 24 }}></div>
				<div style={{ fontWeight: 700, fontSize: 32, color: '#f78628', letterSpacing: -1.2 }}>METROSPACE</div>
				<div style={{ display: 'flex', gap: 16 }}>
					<button className="nav-button" style={{ background: '#fff', border: '1px solid #f78628', color: '#f78628', borderRadius: 8, padding: '8px 24px', fontWeight: 600, cursor: 'pointer' }} onClick={() => navigate('/reservas')}>Reservas</button>
					<button className="nav-button" style={{ background: '#fff', border: '1px solid #f78628', color: '#f78628', borderRadius: 8, padding: '8px 24px', fontWeight: 600, cursor: 'pointer' }} onClick={() => navigate('/perfil')}>Mi perfil</button>
				</div>
			</header>
			<Breadcrumbs />
			<main className="container">
				<h2 className="text-wrapper-2" style={{ marginBottom: 16 }}>Selecciona la sección</h2>
				{/* Listado de secciones como tarjetas en fila */}
				<div style={{ display: 'flex', gap: 32, justifyContent: 'center', margin: '0 auto 32px auto', maxWidth: 900 }}>
					{secciones.map((s) => (
						<div
							key={s.id}
							className="div-2"
							style={{
								background: seccionSeleccionada === s.id ? '#f78628' : '#fff',
								borderRadius: 16,
								boxShadow: '0 2px 8px #0001',
								display: 'flex',
								flexDirection: 'column',
								alignItems: 'flex-start',
								width: 340,
								minHeight: 220,
								marginBottom: 0,
								cursor: 'pointer',
								transition: 'box-shadow 0.2s',
								padding: '24px 24px',
								border: seccionSeleccionada === s.id ? '2px solid #f78628' : '2px solid #eee',
							}}
							onClick={() => setSeccionSeleccionada(s.id)}
						>
							<img src={s.imagen} alt={s.nombre} style={{ width: '100%', height: 100, objectFit: 'cover', borderRadius: 12, marginBottom: 16 }} />
							<div style={{ flex: 1 }}>
								<div className="text-wrapper-3" style={{ fontWeight: 600, fontSize: 18, color: seccionSeleccionada === s.id ? '#fff' : '#273b80' }}>{s.nombre}</div>
								<div style={{ color: seccionSeleccionada === s.id ? '#fff' : '#444', fontSize: 15, marginTop: 8 }}>{s.descripcion}</div>
							</div>
							<div style={{ marginLeft: 'auto', fontSize: 28, color: seccionSeleccionada === s.id ? '#fff' : '#BDBDBD', marginTop: 8 }}>&#8250;</div>
						</div>
					))}
				</div>
				{/* Listado de salones de la sección seleccionada */}
				<h3 style={{ margin: '32px 0 16px 0', fontSize: 20, color: '#273b80', fontWeight: 700 }}>Salones disponibles</h3>
				<div style={{ maxWidth: 700, margin: '0 auto' }}>
					{seccion.salones.map((salon) => (
						<div
							key={salon.id}
							className="div-2"
							style={{
								background: '#fff',
								borderRadius: 16,
								boxShadow: '0 2px 8px #0001',
								display: 'flex',
								alignItems: 'center',
								width: '100%',
								marginBottom: 16,
								cursor: 'pointer',
								transition: 'box-shadow 0.2s',
								padding: '24px 32px',
							}}
							onClick={() => navigate(`/nueva-reserva-completa/${salon.id}`)}
						>
							<div style={{ flex: 1 }}>
								<div className="text-wrapper-3" style={{ fontWeight: 600, fontSize: 18 }}>{salon.nombre}</div>
								<div style={{ color: '#757575', fontSize: 14, margin: '4px 0' }}>
									Capacidad para {salon.capacidad} personas
								</div>
								<div style={{ color: '#757575', fontSize: 14 }}>Salones</div>
							</div>
							<div style={{ marginLeft: 24, fontSize: 28, color: '#BDBDBD' }}>&#8250;</div>
						</div>
					))}
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

export default NuevaReservaSalones;
