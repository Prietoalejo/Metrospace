import React, { useState } from "react";
import Footer from "../componetes/Footer";
import Breadcrumbs from "../componetes/Breadcrumbs";
import "../estilos/style.css";

const reportesData = [
	{
		espacio: "Auditorio Pensairi",
		reservas: 12,
		estatus: "Cancelado",
	},
	{
		espacio: "A1-201",
		reservas: 16,
		estatus: "Finalizado",
	},
	{
		espacio: "Laboratorio de Química",
		reservas: 8,
		estatus: "Pendiente",
	},
	{
		espacio: "Auditorio Paraninfo Luisa Rodríguez De Mendoza",
		reservas: 5,
		estatus: "Pendiente",
	},
];

const VerReportes = () => {
	const handlePerfilClick = () => {
		window.location.href = "/perfil-admin";
	};

	// Estados para el ordenamiento (solo visual por ahora)
	const [ordenReservasAsc, setOrdenReservasAsc] = useState(true);
	const [ordenEstatusAsc, setOrdenEstatusAsc] = useState(true);

	// Handlers de click (solo cambian la flecha)
	const handleOrdenReservas = () => setOrdenReservasAsc((prev) => !prev);
	const handleOrdenEstatus = () => setOrdenEstatusAsc((prev) => !prev);

	return (
		<div
			className="landing"
			style={{
				display: "flex",
				flexDirection: "column",
				minHeight: "100vh",
				color: "#111",
			}}
		>
			<header
				style={{
					display: "flex",
					alignItems: "center",
					justifyContent: "space-between",
					padding: "0 40px",
					height: 80,
					background: "#fff",
					boxSizing: "border-box",
					borderBottom: "1px solid #eee",
					color: "#111",
				}}
			>
				<div
					style={{
						display: "flex",
						alignItems: "center",
						gap: 16,
						flex: 1,
					}}
				>
					<div
						style={{
							width: 32,
							height: 48,
							background: "#e0e0e0",
							borderRadius: 4,
						}}
					/>
				</div>

				<div style={{ flex: 2, textAlign: "center" }}>
					<span
						style={{
							color: "#f78628",
							fontWeight: 700,
							fontSize: 40,
							letterSpacing: "-1.44px",
							fontFamily:
								"Roboto Condensed, Helvetica, Arial, sans-serif",
						}}
					>
						METROSPACE
					</span>
				</div>

				<div
					style={{
						display: "flex",
						alignItems: "center",
						gap: 16,
						flex: 1,
						justifyContent: "flex-end",
					}}
				>
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
					color: "#111",
				}}
			>
				<div
					style={{
						display: "flex",
						justifyContent: "space-between",
						alignItems: "center",
						marginTop: 32,
						color: "#111",
					}}
				>
					<div>
						<label
							style={{
								display: "block",
								marginBottom: 8,
								fontWeight: 500,
								color: "#111",
							}}
						>
							Rango de fechas
						</label>
						<div
							style={{
								display: "flex",
								gap: 16,
								alignItems: "center",
								color: "#111",
							}}
						>
							<input
								type="date"
								style={{
									padding: 12,
									borderRadius: 8,
									border: "1px solid #ccc",
									color: "#111",
								}}
							/>
							<span style={{ color: "#111" }}>Hasta</span>
							<input
								type="date"
								style={{
									padding: 12,
									borderRadius: 8,
									border: "1px solid #ccc",
									color: "#111",
								}}
							/>
							<button
								style={{
									background: "none",
									border: "none",
									color: "#f78628",
									cursor: "pointer",
									fontWeight: "bold",
								}}
							>
								Restablecer
							</button>
						</div>
					</div>
				</div>

				<div
					style={{
						display: "flex",
						gap: 32,
						marginTop: 24,
						color: "#111",
					}}
				>
					{/* Filtros */}
					<div style={{ flex: 1, color: "#111" }}>
						<h3
							style={{
								fontWeight: 500,
								fontSize: 18,
								color: "#111",
							}}
						>
							Filtros
						</h3>
						<h4
							style={{
								fontWeight: 500,
								fontSize: 16,
								marginTop: 16,
								color: "#111",
							}}
						>
							Estatus
						</h4>
						<div>
							<input type="checkbox" id="finalizado" />
							<label
								htmlFor="finalizado"
								style={{
									marginLeft: 8,
									color: "#111",
								}}
							>
								Finalizado
							</label>
						</div>
						<div>
							<input type="checkbox" id="pendiente" />
							<label
								htmlFor="pendiente"
								style={{
									marginLeft: 8,
									color: "#111",
								}}
							>
								Pendiente
							</label>
						</div>
						<div>
							<input type="checkbox" id="cancelado" />
							<label
								htmlFor="cancelado"
								style={{
									marginLeft: 8,
									color: "#111",
								}}
							>
								Cancelado
							</label>
						</div>
					</div>

					{/* Tabla de reportes */}
					<div style={{ flex: 3, color: "#111" }}>
						<table
							style={{
								width: "100%",
								borderCollapse: "collapse",
								color: "#111",
							}}
						>
							<thead>
								<tr
									style={{
										borderBottom: "1px solid #eee",
										color: "#111",
									}}
								>
									<th
										style={{
											textAlign: "left",
											padding: "16px 0",
											fontWeight: 500,
											color: "#111",
										}}
									>
										Espacio
									</th>
									<th
										style={{
											textAlign: "left",
											padding: "16px 0",
											fontWeight: 500,
											color: "#111",
											cursor: "pointer",
											userSelect: "none",
										}}
										onClick={handleOrdenReservas}
									>
										N° de reservas
										<span
											style={{
												marginLeft: 6,
												fontSize: 14,
												verticalAlign: "middle",
											}}
										>
											{ordenReservasAsc ? "▲" : "▼"}
										</span>
									</th>
									<th
										style={{
											textAlign: "left",
											padding: "16px 0",
											fontWeight: 500,
											color: "#111",
											cursor: "pointer",
											userSelect: "none",
										}}
										onClick={handleOrdenEstatus}
									>
										Estatus
										<span
											style={{
												marginLeft: 6,
												fontSize: 14,
												verticalAlign: "middle",
											}}
										>
											{ordenEstatusAsc ? "▲" : "▼"}
										</span>
									</th>
								</tr>
							</thead>
							<tbody>
								{reportesData.map((reporte, idx) => (
									<tr
										key={idx}
										style={{
											borderBottom: "1px solid #eee",
											color: "#111",
										}}
									>
										<td
											style={{
												padding: "16px 0",
												color: "#111",
											}}
										>
											{reporte.espacio}
										</td>
										<td
											style={{
												padding: "16px 0",
												color: "#111",
											}}
										>
											{reporte.reservas}
										</td>
										<td
											style={{
												padding: "16px 0",
												color: "#111",
											}}
										>
											{reporte.estatus}
										</td>
									</tr>
								))}
							</tbody>
						</table>
					</div>
				</div>
			</div>
			<Footer />
		</div>
	);
};

export default VerReportes;
