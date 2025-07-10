import React, { useState, useEffect } from "react";
import Footer from "../componetes/Footer";
import Breadcrumbs from "../componetes/Breadcrumbs";
import "../estilos/style.css";

import { getReporteEspacioEstado } from "../logica/supabaseReservas";

const reportesDataDefault = [
	{
		espacio: "Auditorio Pensairi",
		reservas: 12,
		estatus: [
			{ label: "Pendientes", valor: 0 },
			{ label: "Finalizadas", valor: 0 },
			{ label: "Canceladas", valor: 12 },
		],
	},
	{
		espacio: "A1-201",
		reservas: 16,
		estatus: [
			{ label: "Pendientes", valor: 0 },
			{ label: "Finalizadas", valor: 16 },
			{ label: "Canceladas", valor: 0 },
		],
	},
	{
		espacio: "Laboratorio de Química",
		reservas: 8,
		estatus: [
			{ label: "Pendientes", valor: 8 },
			{ label: "Finalizadas", valor: 0 },
			{ label: "Canceladas", valor: 0 },
		],
	},
	{
		espacio: "Auditorio Paraninfo Luisa Rodríguez De Mendoza",
		reservas: 5,
		estatus: [
			{ label: "Pendientes", valor: 5 },
			{ label: "Finalizadas", valor: 0 },
			{ label: "Canceladas", valor: 0 },
		],
	},
];

const VerReportes = () => {
	const handlePerfilClick = () => {
		window.location.href = "/perfil-admin";
	};

	const [reportesData, setReportesData] = useState(reportesDataDefault);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	// Estados para el ordenamiento (solo visual por ahora)
	const [ordenReservasAsc, setOrdenReservasAsc] = useState(true);

const [ordenEstatusAsc, setOrdenEstatusAsc] = useState(true);

// Estados de los filtros de estatus
const [ocultarPendiente, setOcultarPendiente] = useState(false);
const [ocultarFinalizado, setOcultarFinalizado] = useState(false);
const [ocultarCancelado, setOcultarCancelado] = useState(false);

// Estados para el filtro de fechas
const [fechaDesde, setFechaDesde] = useState("");
const [fechaHasta, setFechaHasta] = useState("");
const [datosOriginales, setDatosOriginales] = useState([]);

	// Cargar datos reales al montar
	useEffect(() => {
		const fetchReportes = async () => {
			setLoading(true);
			const { data, error } = await getReporteEspacioEstado();
			if (error) {
				setError("Error al cargar reportes");
			} else if (data && data.length > 0) {
                const adaptados = data.map((r) => ({
                    espacio: r.nombre_espacio,
                    reservas: r.total,
                    fecha_actualizacion: r.fecha_actualizacion,
                    estatus: [
                        { label: "Pendientes", valor: r.pendientes },
                        { label: "Finalizadas", valor: r.finalizadas },
                        { label: "Canceladas", valor: r.canceladas },
                    ],
                    fecha_creacion: r.fecha_creacion || null, // si existe el campo
                }));
                setReportesData(adaptados);
                setDatosOriginales(adaptados);
            } else {
                setReportesData([]);
                setDatosOriginales([]);
            }
			setLoading(false);
		};
		fetchReportes();
	}, []);

	// Handlers de click (solo cambian la flecha)

const handleOrdenReservas = () => {
  setOrdenReservasAsc((prev) => !prev);
  setOrdenEstatusAsc(null); // Desactiva orden por estatus
};
const handleOrdenEstatus = () => {
  setOrdenEstatusAsc((prev) => prev === null ? true : !prev);
};


// Determina el primer estado visible para ordenar por estatus
const getValorEstatusParaOrden = (reporte) => {
  const visibles = reporte.estatus.filter(e => {
	if (e.label === "Pendientes" && ocultarPendiente) return false;
	if (e.label === "Finalizadas" && ocultarFinalizado) return false;
	if (e.label === "Canceladas" && ocultarCancelado) return false;
	return true;
  });
  // Prioridad: Pendientes > Finalizadas > Canceladas
  const orden = ["Pendientes", "Finalizadas", "Canceladas"];
  for (let label of orden) {
	const found = visibles.find(e => e.label === label);
	if (found) return found.valor;
  }
  return 0;
};

// Filtrado por fechas (frontend)
let filtradosPorFecha = [...reportesData];
if (fechaDesde) {
    filtradosPorFecha = filtradosPorFecha.filter(r => {
        if (!r.fecha_actualizacion) return false;
        return new Date(r.fecha_actualizacion) >= new Date(fechaDesde);
    });
}
if (fechaHasta) {
    filtradosPorFecha = filtradosPorFecha.filter(r => {
        if (!r.fecha_actualizacion) return false;
        const hasta = new Date(fechaHasta);
        hasta.setDate(hasta.getDate() + 1);
        return new Date(r.fecha_actualizacion) < hasta;
    });
}
let reportesOrdenados = [...filtradosPorFecha];
if (ordenEstatusAsc !== null) {
  // Si se ordena por estatus
  reportesOrdenados.sort((a, b) => {
	const va = getValorEstatusParaOrden(a);
	const vb = getValorEstatusParaOrden(b);
	return ordenEstatusAsc ? va - vb : vb - va;
  });
} else {
  // Por reservas
  reportesOrdenados.sort((a, b) => ordenReservasAsc ? a.reservas - b.reservas : b.reservas - a.reservas);
}

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
	value={fechaDesde}
	onChange={e => setFechaDesde(e.target.value)}
	style={{
		padding: 12,
		borderRadius: 8,
		border: "1px solid #ccc",
		color: "#111",
		background: "#fff"
	}}
/>
							<span style={{ color: "#111" }}>Hasta</span>
<input
	type="date"
	value={fechaHasta}
	onChange={e => setFechaHasta(e.target.value)}
	style={{
		padding: 12,
		borderRadius: 8,
		border: "1px solid #ccc",
		color: "#111",
		background: "#fff"
	}}
/>
<button
	onClick={() => {
		setFechaDesde("");
		setFechaHasta("");
		setReportesData(datosOriginales);
	}}
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
<input
  type="checkbox"
  id="finalizado"
  style={{ background: '#fff', color: '#111' }}
  checked={ocultarFinalizado}
  onChange={() => setOcultarFinalizado((prev) => !prev)}
/>
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
<input
  type="checkbox"
  id="pendiente"
  style={{ background: '#fff', color: '#111' }}
  checked={ocultarPendiente}
  onChange={() => setOcultarPendiente((prev) => !prev)}
/>
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
<input
  type="checkbox"
  id="cancelado"
  style={{ background: '#fff', color: '#111' }}
  checked={ocultarCancelado}
  onChange={() => setOcultarCancelado((prev) => !prev)}
/>
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
	Fecha actualización
</th>
<th
	style={{
		textAlign: "left",
		padding: "16px 0",
		fontWeight: 500,
		color: "#111",
	}}
>
    Fecha creación
</th>
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
 {loading ? (
   <tr><td colSpan={3} style={{ padding: 20, textAlign: "center" }}>Cargando...</td></tr>
 ) : error ? (
   <tr><td colSpan={3} style={{ padding: 20, textAlign: "center", color: "red" }}>{error}</td></tr>
 ) : reportesOrdenados.length === 0 ? (
   <tr><td colSpan={3} style={{ padding: 20, textAlign: "center" }}>No hay datos para mostrar</td></tr>
 ) : (
   reportesOrdenados.map((reporte, idx) => (
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
	{reporte.fecha_actualizacion ? new Date(reporte.fecha_actualizacion).toLocaleString() : "-"}
</td>
<td
	style={{
		padding: "16px 0",
		color: "#111",
	}}
>
	{reporte.fecha_creacion ? new Date(reporte.fecha_creacion).toLocaleString() : "-"}
</td>
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
	 {reporte.estatus
	   .filter(e => {
		 if (e.label === "Pendientes" && ocultarPendiente) return false;
		 if (e.label === "Finalizadas" && ocultarFinalizado) return false;
		 if (e.label === "Canceladas" && ocultarCancelado) return false;
		 return true;
	   })
	   .map((e, i) => (
		 <div key={i}>{e.label}: {e.valor}</div>
	   ))}
   </td>
	 </tr>
   ))
 )}
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
