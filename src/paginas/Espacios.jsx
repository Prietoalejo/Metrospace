import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
// Eliminado: No se usa HeaderNavigation aquí
import Footer from "../componetes/Footer";
import Breadcrumbs from "../componetes/Breadcrumbs";
import "../estilos/style.css";

import { getEspacios, eliminarEspacio } from "../logica/supabaseEspacios";


const Espacios = () => {
  const navigate = useNavigate();
  const [espacios, setEspacios] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [eliminando, setEliminando] = useState(null);

  useEffect(() => {
	async function fetchEspacios() {
	  setLoading(true);
	  try {
		const data = await getEspacios();
		setEspacios(data || []);
		setError(null);
	  } catch (err) {
		setError("Error al cargar los espacios");
	  } finally {
		setLoading(false);
	  }
	}
	fetchEspacios();
  }, []);

  const handleEditarEspacio = (espacio) => {
	navigate(`/editar-espacio/${espacio.id}`);
  };

  const handleEliminarEspacio = async (espacio) => {
	if (!window.confirm(`¿Seguro que deseas eliminar el espacio "${espacio.nombre}"? Esta acción no se puede deshacer.`)) return;
	setEliminando(espacio.id);
	try {
	  await eliminarEspacio(espacio.id);
	  setEspacios((prev) => prev.filter((e) => e.id !== espacio.id));
	} catch (err) {
	  alert("Error al eliminar el espacio");
	} finally {
	  setEliminando(null);
	}
  };


  const handlePerfilClick = () => {
	window.location.href = "/perfil-admin";
  };

  const handleCrearEspacio = () => {
	window.location.href = "/crear-espacio";
  };

	return (
		<div className="landing" style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
			<header
				style={{
					display: "flex",
					alignItems: "center",
					justifyContent: "space-between", // Esto ayuda a separar los elementos
					padding: "0 40px",
					height: 80,
					background: "#fff",
					boxSizing: "border-box",
					borderBottom: "1px solid #eee",
				}}
			>
				{/* Contenedor izquierdo (logo) */}
				<div style={{ display: "flex", alignItems: "center", gap: 16, flex: 1 }}>
					<div
						style={{
							width: 32,
							height: 48,
							background: "#e0e0e0",
							borderRadius: 4,
						}}
					/>
				</div>

				{/* Contenedor central (título) */}
				<div style={{ flex: 2, textAlign: "center" }}>
					<span
						style={{
							color: "#f78628",
							fontWeight: 700,
							fontSize: 40,
							letterSpacing: "-1.44px",
							fontFamily: "Roboto Condensed, Helvetica, Arial, sans-serif",
						}}
					>
						METROSPACE
					</span>
				</div>

				{/* Contenedor derecho (botón de perfil) */}
				<div style={{ display: "flex", alignItems: "center", gap: 16, flex: 1, justifyContent: "flex-end" }}>
					<button
						onClick={handlePerfilClick}
						style={{
							background: "none",
							border: "none",
							display: "flex",
							alignItems: "center",
							cursor: "pointer",
							color: "#222",
							fontWeight: 500,
							fontSize: 16,
							padding: 0,
							outline: "none",
						}}
					>
						Mi perfil
						<span
							style={{
								width: 28,
								height: 28,
								borderRadius: "50%",
								background: "#e0e0e0",
								display: "flex",
								alignItems: "center",
								justifyContent: "center",
								fontSize: 18,
								color: "#888",
								marginLeft: 8,
							}}
						>
							<span role="img" aria-label="user">
								👤
							</span>
						</span>
					</button>
				</div>
			</header>
			<Breadcrumbs />
			<div
				style={{
					maxWidth: 1200,
					margin: "0 auto",
					width: "100%",
					padding: "0 20px",
					flex: 1,
				}}
			>
				<h2
					style={{
						color: "#BDBDBD",
						fontWeight: 400,
						fontSize: 24,
						margin: "32px 0 0 0",
					}}
				>
					Espacios disponibles
				</h2>
				<div
					style={{
						display: "flex",
						justifyContent: "flex-end",
						margin: "24px 0",
					}}
				>
					<button
						onClick={handleCrearEspacio}
						style={{
							background: "#f78628",
							color: "#fff",
							border: "none",
							borderRadius: 8,
							padding: "10px 24px",
							fontWeight: 600,
							fontSize: 16,
							cursor: "pointer",
							display: "flex",
							alignItems: "center",
							gap: 8,
						}}
					>
						Crear nuevo espacio{" "}
						<span style={{ fontSize: 20, fontWeight: 700 }}>+</span>
					</button>
				</div>
				<div
					style={{
						display: "flex",
						flexWrap: "wrap",
						gap: 32,
					}}
				>
					{/* Renderizar tarjetas de espacios en dos columnas */}
					<div style={{ flex: 1, minWidth: 400 }}>
						{espacios
							.filter((_, i) => i % 2 === 0)
							.map((espacio, idx) => (
								<button
									key={idx}
									onClick={() => handleEditarEspacio(espacio)}
									style={{
										display: "flex",
										alignItems: "center",
										background: "#fff",
										borderRadius: 16,
										marginBottom: 24,
										boxShadow: "0 2px 8px #0001",
										overflow: "hidden",
										cursor: "pointer",
										border: "none",
										width: "100%",
										textAlign: "left",
										padding: 0,
									}}
								>
									<img
										src={espacio.imagen}
										alt={espacio.nombre}
										style={{
											width: 140,
											height: 100,
											objectFit: "cover",
										}}
									/>
									<div
										style={{
											padding: 24,
											flex: 1,
											color: "#888" // Aplica el color a todo el contenido de la tarjeta
										}}
									>
										<div
											style={{
												fontWeight: 600,
												fontSize: 18,
												color: "#888"
											}}
										>
											{espacio.nombre}
										</div>
										{espacio.capacidad && (
											<div
												style={{
													color: "#888",
													fontSize: 15,
												}}
											>
												Capacidad para {espacio.capacidad} personas
											</div>
										)}
										<div
											style={{
												color: "#888",
												fontSize: 15,
											}}
										>
											{espacio.tipo}
										</div>
									</div>
									<div
										style={{
											marginRight: 24,
											color: "#888",
											fontSize: 28,
										}}
									>
										&#8250;
									</div>
								</button>
						))}
					</div>
					<div style={{ flex: 1, minWidth: 400 }}>
						{espacios
							.filter((_, i) => i % 2 === 1)
							.map((espacio, idx) => (
								<button
									key={idx}
									onClick={() => handleEditarEspacio(espacio)}
									style={{
										display: "flex",
										alignItems: "center",
										background: "#fff",
										borderRadius: 16,
										marginBottom: 24,
										boxShadow: "0 2px 8px #0001",
										overflow: "hidden",
										cursor: "pointer",
										border: "none",
										width: "100%",
										textAlign: "left",
										padding: 0,
									}}
								>
									<img
										src={espacio.imagen}
										alt={espacio.nombre}
										style={{
											width: 140,
											height: 100,
											objectFit: "cover",
										}}
									/>
									<div
										style={{
											padding: 24,
											flex: 1,
										}}
									>
										<div
											style={{
												fontWeight: 600,
												fontSize: 18,
											}}
										>
											{espacio.nombre}
										</div>
										{espacio.capacidad && (
											<div
												style={{
													color: "#888",
												fontSize: 15,
												}}
											>
												Capacidad para {espacio.capacidad} personas
											</div>
										)}
										<div
											style={{
												color: "#888",
												fontSize: 15,
											}}
										>
											{espacio.tipo}
										</div>
									</div>
									<div
										style={{
											marginRight: 24,
											color: "#888",
											fontSize: 28,
										}}
									>
										&#8250;
									</div>
								</button>
						))}
					</div>
				</div>
			</div>
			<Footer />
		</div>
	);
};

export default Espacios;
