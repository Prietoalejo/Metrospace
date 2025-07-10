import React, { useState, useEffect } from "react";
import Modal from "../componetes/Modal";
import Breadcrumbs from "../componetes/Breadcrumbs";
import { supabase } from '../../supabaseCredentials';
import { deleteReserva } from "../logica/supabaseReservas";

function Reportes() {
	// Navegación a perfil
	const handlePerfilClick = () => {
		window.location.href = "/perfil-admin";
	};

const [modal, setModal] = useState(null); // null | 'detalles' | 'editar' | 'eliminar' | 'confirmarEliminar'
const [reservaSeleccionada, setReservaSeleccionada] = useState(null);
const [editFecha, setEditFecha] = useState("");
const [editHora, setEditHora] = useState("");
const [reservas, setReservas] = useState([]);
const [loading, setLoading] = useState(true);

	const horarios = [
		{ label: "02:00 pm - 03:00 pm", value: "14:00-15:00" },
		{ label: "03:00 pm - 04:00 pm", value: "15:00-16:00" },
		{ label: "04:00 pm - 05:00 pm", value: "16:00-17:00" },
	];

const abrirModalDetalles = (reserva) => {
  setReservaSeleccionada(reserva);
  setModal("detalles");
};
const cerrarModal = () => {
  setModal(null);
  setReservaSeleccionada(null);
};

useEffect(() => {
  async function fetchReservas() {
	setLoading(true);
	const { data, error } = await supabase
	  .from('reserva')
	  .select('id, fecha, hora_inicio, hora_fin, estado, requerimientos, pago, espacio:espacio_id(id, nombre, imagenes)')
	  .order('fecha', { ascending: false });
	if (!error && data) {
	  setReservas(data);
	}
	setLoading(false);
  }
  fetchReservas();
}, []);
	const abrirModalEditar = () => setModal("editar");
const abrirModalEliminar = () => setModal("eliminar");
	const abrirModalConfirmarEliminar = () => setModal("confirmarEliminar");
	const eliminarReserva = () => {
	// Lógica real de eliminación
	if (!reservaSeleccionada) return;
	deleteReserva(reservaSeleccionada.id)
	  .then(({ error }) => {
		if (!error) {
		  setReservas(reservas.filter(r => r.id !== reservaSeleccionada.id));
		  cerrarModal();
		} else {
		  alert("Error al eliminar la reserva");
		}
	  });
};

	return (
		<div
			className="landing"
			style={{
				minHeight: "100vh",
				background: "#fff",
				display: "flex",
				flexDirection: "column",
				color: "#111" // Forzar texto negro global
			}}
		>
			{/* Header */}
			<header
				className="header"
				style={{
					display: "flex",
					alignItems: "center",
					justifyContent: "space-between",
					padding: "0 40px",
					height: 100,
					background: "#fff",
					borderBottom: "4px solid #f78628",
					boxSizing: "border-box",
					position: "relative",
					zIndex: 4,
				}}
			>
				<div style={{ display: "flex", alignItems: "center", gap: 16 }}>
					<div
						style={{
							width: 32,
							height: 48,
							background: "#e0e0e0",
							borderRadius: 4,
						}}
					/>
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
				<div style={{ display: "flex", alignItems: "center", gap: 16 }}>
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
							marginRight: 8,
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
			{/* Contenido */}
			<main
				style={{
					maxWidth: 1200,
					margin: "0 auto",
					flex: 1,
					width: "100%",
					padding: "0 20px",
				}}
			>
				<h2
					style={{
						margin: "40px 0 0 0",
						fontWeight: 700,
						fontSize: 28,
						color: "#222",
					}}
				>
					Inicio
				</h2>
				<div
					style={{
						margin: "32px 0 0 0",
						fontSize: 20,
						fontWeight: 500,
						color: "#222",
					}}
				>
					Próximos eventos
				</div>

				{/* Botones */}
				<div
					style={{
						display: "flex",
						gap: 16,
						margin: "24px 0 0 0",
						flexWrap: "wrap",
					}}
				>
					<button
						onClick={() => window.location.href = "/ver-reportes"}
						style={{
							background: "#222",
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
						Reportes
						<span role="img" aria-label="report" style={{ fontSize: 18 }}>
							🗂️
						</span>
					</button>
					<button
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
						onClick={() => (window.location.href = "/espacios")}
					>
						Ver espacios
						<span role="img" aria-label="spaces" style={{ fontSize: 18 }}>
							🏢
						</span>
					</button>
				</div>

				{/* Tabla */}
				<div
					style={{
						marginTop: 32,
						background: "#fff",
						borderRadius: 12,
						boxShadow: "0 2px 8px #0001",
						padding: 0,
						color: "#111" // Forzar texto negro en tabla
					}}
				>
					<table style={{ width: "100%", borderCollapse: "collapse", color: "#111" }}>
						<thead>
							<tr
								style={{
									color: "#888",
									fontWeight: 500,
									fontSize: 16,
									borderBottom: "1px solid #eee",
								}}
							>
								<th
									style={{
										textAlign: "left",
										padding: "16px 0 16px 24px",
									}}
								>
									Espacio
								</th>
								<th
									style={{
										textAlign: "left",
										padding: "16px 0",
									}}
								>
									Nombre{" "}
									<span style={{ fontSize: 14 }}>▼</span>
								</th>
								<th
									style={{
										textAlign: "left",
										padding: "16px 0",
									}}
								>
									Fecha{" "}
									<span style={{ fontSize: 14 }}>▼</span>
								</th>
								<th
									style={{
										textAlign: "left",
										padding: "16px 0",
									}}
								>
									Hora{" "}
									<span style={{ fontSize: 14 }}>▼</span>
								</th>
								<th
									style={{
										textAlign: "left",
										padding: "16px 24px 16px 0",
									}}
								>
									Acciones
								</th>
							</tr>
						</thead>
<tbody>
  {loading ? (
	<tr><td colSpan={5} style={{ textAlign: 'center', padding: 32, color: '#888' }}>Cargando reservas...</td></tr>
  ) : reservas.length === 0 ? (
	<tr><td colSpan={5} style={{ textAlign: 'center', padding: 32, color: '#888' }}>No hay reservas registradas</td></tr>
  ) : (
	reservas.map((reserva) => (
	  <tr key={reserva.id} style={{ borderBottom: "1px solid #eee" }}>
		<td style={{ padding: "16px 0 16px 24px" }}>
		  <img
			src={Array.isArray(reserva.espacio?.imagenes) && reserva.espacio.imagenes.length > 0 ? reserva.espacio.imagenes[0] : "https://via.placeholder.com/80x80?text=Sin+foto"}
			alt={reserva.espacio?.nombre || "Espacio"}
			style={{ width: 56, height: 56, borderRadius: 8, objectFit: "cover", marginRight: 12, verticalAlign: "middle" }}
		  />
		</td>
		<td style={{ padding: "16px 0", color: "#222", fontWeight: 500 }}>{reserva.espacio?.nombre || '-'}</td>
		<td style={{ padding: "16px 0", color: "#222" }}>{reserva.fecha}</td>
		<td style={{ padding: "16px 0", color: "#222" }}>{reserva.hora_inicio} - {reserva.hora_fin}</td>
		<td style={{ padding: "16px 24px 16px 0", color: "#f78628", fontWeight: 500, cursor: "pointer" }} onClick={() => abrirModalDetalles(reserva)}>
		  Ver detalles
		</td>
	  </tr>
	))
  )}
</tbody>
					</table>
				</div>
			</main>

			{/* Footer */}
			<footer
				style={{
					background: "#f78628",
					color: "#fff",
					padding: "24px 0",
					marginTop: 64,
					position: "relative",
					bottom: 0,
					width: "100%",
				}}
			>
				<div
					style={{
						maxWidth: 1200,
						margin: "0 auto",
						display: "flex",
						justifyContent: "center",
						alignItems: "center",
						gap: 24,
						fontSize: 15,
					}}
				>
					<span>Copyright © 2025 - Universidad Metropolitana</span>
					<span style={{ opacity: 0.5 }}>|</span>
					<span>
						Síguenos en{" "}
						<span style={{ fontWeight: 700 }}>Intagram</span>
					</span>
					<span style={{ opacity: 0.5 }}>|</span>
					<span>Contáctanos</span>
				</div>
			</footer>

			{/* MODAL: Detalles de la reserva */}
<Modal isOpen={modal === "detalles"} onClose={cerrarModal}>
  <div style={{ minWidth: 350, maxWidth: 400, color: "#111" }}>
	<h2 style={{ textAlign: "center", fontWeight: 500, fontSize: 22, marginBottom: 24, color: "#111" }}>Detalles de la reserva</h2>
	<table style={{ width: "100%", marginBottom: 24, color: "#111" }}>
	  <tbody>
		<tr>
		  <td style={{ color: "#888", padding: "6px 0" }}>Espacio</td>
		  <td style={{ fontWeight: 500, padding: "6px 0", color: "#111" }}>{reservaSeleccionada?.espacio?.nombre || '-'}</td>
		</tr>
		<tr>
		  <td style={{ color: "#888", padding: "6px 0" }}>Fecha</td>
		  <td style={{ fontWeight: 500, padding: "6px 0", color: "#111" }}>{reservaSeleccionada?.fecha || '-'}</td>
		</tr>
		<tr>
		  <td style={{ color: "#888", padding: "6px 0" }}>Horario</td>
		  <td style={{ fontWeight: 500, padding: "6px 0", color: "#111" }}>{reservaSeleccionada?.hora_inicio} - {reservaSeleccionada?.hora_fin}</td>
		</tr>
		<tr>
		  <td style={{ color: "#888", padding: "6px 0" }}>Observaciones</td>
		  <td style={{ fontWeight: 500, padding: "6px 0", color: "#f78628" }}>{reservaSeleccionada?.requerimientos || 'Ninguna'}</td>
		</tr>
		<tr>
		  <td style={{ color: "#888", padding: "6px 0" }}>Monto total</td>
		  <td style={{ fontWeight: 500, padding: "6px 0", color: "#111" }}>${reservaSeleccionada?.pago?.toFixed ? reservaSeleccionada.pago.toFixed(2) : reservaSeleccionada?.pago || '-'}</td>
		</tr>
	  </tbody>
	</table>
	<div style={{ display: "flex", justifyContent: "center", gap: 32 }}>
	  <button onClick={abrirModalEditar} style={{ background: "none", border: "none", color: "#111", fontWeight: 500, fontSize: 16, cursor: "pointer", display: "flex", alignItems: "center", gap: 6 }}>
		Editar <span style={{ fontSize: 18 }}>✏️</span>
	  </button>
	  <button onClick={abrirModalEliminar} style={{ background: "none", border: "none", color: "#f44336", fontWeight: 500, fontSize: 16, cursor: "pointer", display: "flex", alignItems: "center", gap: 6 }}>
		Eliminar <span style={{ fontSize: 18 }}>🗑️</span>
	  </button>
	</div>
  </div>
</Modal>

			{/* MODAL: Editar reserva */}
			<Modal isOpen={modal === "editar"} onClose={cerrarModal}>
				<div style={{ minWidth: 350, maxWidth: 400, color: "#111" }}>
					<h2 style={{ textAlign: "center", fontWeight: 500, fontSize: 22, marginBottom: 24, color: "#111" }}>Editar la reserva</h2>
					<table style={{ width: "100%", marginBottom: 24, color: "#111" }}>
						<tbody>
							<tr>
								<td style={{ color: "#888", padding: "6px 0" }}>Espacio</td>
								<td style={{ fontWeight: 500, padding: "6px 0", color: "#111" }}>{reservaSeleccionada?.espacio?.nombre || '-'}</td>
<td style={{ fontWeight: 500, padding: "6px 0", color: "#111" }}>{reservaSeleccionada?.espacio?.nombre || '-'}</td>
<td style={{ fontWeight: 500, padding: "6px 0", color: "#111" }}>{reservaSeleccionada?.espacio?.nombre || '-'}</td>
							</tr>
							<tr>
								<td style={{ color: "#888", padding: "6px 0" }}>Fecha</td>
								<td style={{ fontWeight: 500, padding: "6px 0", color: "#111", display: "flex", alignItems: "center", gap: 8 }}>
									<input type="date" value={editFecha} onChange={e => setEditFecha(e.target.value)} style={{ width: "100%", padding: 8, borderRadius: 6, border: "1px solid #ccc", background: "#ededed", color: "#111", fontSize: 15 }} />
									<span style={{ fontSize: 18, color: "#888" }}>📅</span>
								</td>
							</tr>
							<tr>
								<td style={{ color: "#888", padding: "6px 0" }}>Horario</td>
								<td style={{ fontWeight: 500, padding: "6px 0", color: "#111", display: "flex", alignItems: "center", gap: 8 }}>
									<select value={editHora} onChange={e => setEditHora(e.target.value)} style={{ width: "100%", padding: 8, borderRadius: 6, border: "1px solid #ccc", background: "#ededed", color: "#111", fontSize: 15 }}>
										{horarios.map(h => <option key={h.value} value={h.value}>{h.label}</option>)}
									</select>
									<span style={{ fontSize: 18, color: "#888" }}>🔗</span>
								</td>
							</tr>
						</tbody>
					</table>
					<div style={{ display: "flex", justifyContent: "center", gap: 32 }}>
						<button onClick={cerrarModal} style={{ background: "none", border: "none", color: "#888", fontWeight: 500, fontSize: 16, cursor: "pointer" }}>Cancelar</button>
						<button style={{ background: "#b8863b", color: "#fff", border: "none", borderRadius: 8, padding: "8px 32px", fontWeight: 500, fontSize: 16, cursor: "pointer" }}>Guardar</button>
					</div>
				</div>
			</Modal>

			{/* MODAL: Eliminar reserva */}
			<Modal isOpen={modal === "eliminar"} onClose={cerrarModal}>
				<div style={{ minWidth: 350, maxWidth: 400, color: "#111" }}>
					<h2 style={{ textAlign: "center", fontWeight: 500, fontSize: 22, marginBottom: 24, color: "#111" }}>¿Estás seguro de que deseas eliminar esta reserva?</h2>
					<table style={{ width: "100%", marginBottom: 24, color: "#111" }}>
						<tbody>
							<tr>
								<td style={{ color: "#888", padding: "6px 0" }}>Espacio</td>
								<td style={{ fontWeight: 500, padding: "6px 0", color: "#111" }}>{reservaSeleccionada?.espacio?.nombre || '-'}</td>
							</tr>
							<tr>
								<td style={{ color: "#888", padding: "6px 0" }}>Fecha</td>
								<td style={{ fontWeight: 500, padding: "6px 0", color: "#111" }}>01/01/2025</td>
							</tr>
							<tr>
								<td style={{ color: "#888", padding: "6px 0" }}>Horario</td>
								<td style={{ fontWeight: 500, padding: "6px 0", color: "#111" }}>02:00 pm - 03:00 pm</td>
							</tr>
							<tr>
								<td style={{ color: "#888", padding: "6px 0" }}>Observaciones</td>
								<td style={{ fontWeight: 500, padding: "6px 0", color: "#f78628" }}>Ninguna</td>
							</tr>
						</tbody>
					</table>
					<div style={{ display: "flex", justifyContent: "center", gap: 32 }}>
						<button onClick={cerrarModal} style={{ background: "#b8863b", color: "#fff", border: "none", borderRadius: 8, padding: "8px 32px", fontWeight: 500, fontSize: 16, cursor: "pointer" }}>Cancelar</button>
						<button onClick={abrirModalConfirmarEliminar} style={{ background: "none", color: "#111", border: "none", fontWeight: 500, fontSize: 16, cursor: "pointer" }}>Eliminar</button>
					</div>
				</div>
			</Modal>

			{/* MODAL: Confirmar eliminación */}
			<Modal isOpen={modal === "confirmarEliminar"} onClose={cerrarModal}>
				<div style={{ minWidth: 350, maxWidth: 400, color: "#111" }}>
					<h2 style={{ textAlign: "center", fontWeight: 500, fontSize: 22, marginBottom: 24, color: "#111" }}>¿Estás seguro de que deseas eliminar este espacio?</h2>
					<div style={{ display: "flex", justifyContent: "center", gap: 32, marginTop: 32 }}>
						<button onClick={cerrarModal} style={{ background: "#b8863b", color: "#fff", border: "none", borderRadius: 8, padding: "8px 32px", fontWeight: 500, fontSize: 16, cursor: "pointer" }}>Cancelar</button>
						<button onClick={eliminarReserva} style={{ background: "none", color: "#111", border: "none", fontWeight: 500, fontSize: 16, cursor: "pointer" }}>Eliminar</button>
					</div>
				</div>
			</Modal>
		</div>
	);
}

export default Reportes;