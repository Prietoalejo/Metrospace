import React, { useState, useEffect, useRef } from "react";
import Footer from "../componetes/Footer";
import Breadcrumbs from "../componetes/Breadcrumbs";
import "../estilos/style.css";

import Modal from "../componetes/Modal";

import { crearEspacio } from "../logica/supabaseEspacios";
import { subirImagenEspacio } from "../logica/supabaseUpload";

const CrearEspacio = () => {
  // Estado para imágenes
  const [imagenes, setImagenes] = useState([]); // Archivos seleccionados
  const [imagenesPreview, setImagenesPreview] = useState([]); // URLs para previsualización
  const inputImagenesRef = useRef(null);

  // Manejar selección de imágenes (máx 3)
  const handleImagenesChange = (e) => {
	let files = Array.from(e.target.files).filter(f => f.type.startsWith("image/"));
	if (files.length > 3) {
	  files = files.slice(0, 3);
	  alert("Solo puedes seleccionar hasta 3 imágenes.");
	}
	setImagenes(files);
	// Crear previews
	const previews = files.map(file => URL.createObjectURL(file));
	setImagenesPreview(previews);
  };
  const [nombre, setNombre] = useState("");
  const [tipo, setTipo] = useState("");
  const [nuevoTipo, setNuevoTipo] = useState("");
  const [subTipo, setSubTipo] = useState("");
  const [nuevoSubTipo, setNuevoSubTipo] = useState("");
  const [capacidad, setCapacidad] = useState("");
  const [precio, setPrecio] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalTipoOpen, setModalTipoOpen] = useState(false);
  const [modalSubTipoPreguntaOpen, setModalSubTipoPreguntaOpen] = useState(false);
  const [modalSubTipoOpen, setModalSubTipoOpen] = useState(false);
  const [tiposExistentes, setTiposExistentes] = useState([]);
  const [subTiposExistentes, setSubTiposExistentes] = useState([]);

  // Cargar tipos y subtipos únicos de la base de datos
  useEffect(() => {
	async function fetchTiposSubtipos() {
	  try {
		const { getEspacios } = await import("../logica/supabaseEspacios");
		const espacios = await getEspacios();
		let tipos = Array.from(new Set(espacios.map(e => e.tipo).filter(Boolean)));
		// Si el tipo seleccionado es uno nuevo (no está en la base), lo agregamos temporalmente
		if (tipo && tipo !== "nuevo" && !tipos.includes(tipo)) {
		  tipos = [...tipos, tipo];
		}
		setTiposExistentes(tipos);
		// Si hay tipo seleccionado, filtrar subtipos de ese tipo
		if (tipo && tipo !== "nuevo") {
		  let subtipos = Array.from(new Set(espacios.filter(e => e.tipo === tipo).map(e => e.sub_tipo).filter(Boolean)));
		  // Si el subtipo seleccionado es nuevo, agregarlo temporalmente
		  if (subTipo && subTipo !== "nuevo" && !subtipos.includes(subTipo)) {
			subtipos = [...subtipos, subTipo];
		  }
		  setSubTiposExistentes(subtipos);
		} else {
		  setSubTiposExistentes([]);
		}
	  } catch (e) {
		// No hacer nada
	  }
	}
	fetchTiposSubtipos();
  }, [tipo, subTipo]);

  const handlePerfilClick = () => {
		window.location.href = "/perfil-admin";
	};

  const handleGuardar = async () => {
	setError(null);
	// Determinar el tipo y subtipo final
	let tipoFinal = tipo;
	let subTipoFinal = subTipo;
	if (tipo === "nuevo") {
	  if (!nuevoTipo) {
		setError("Debes ingresar el nuevo tipo.");
		return;
	  }
	  tipoFinal = nuevoTipo;
	}
	if (subTipo === "nuevo") {
	  if (!nuevoSubTipo) {
		setError("Debes ingresar el nuevo subtipo.");
		return;
	  }
	  subTipoFinal = nuevoSubTipo;
	}
	if (!nombre || !tipoFinal || !capacidad || !precio || !descripcion) {
	  setError("Completa todos los campos obligatorios.");
	  return;
	}
	setLoading(true);
	try {
	  const precioInt = parseInt(precio, 10);
	  const capacidadInt = parseInt(capacidad, 10);
	  if (isNaN(precioInt) || isNaN(capacidadInt)) {
		setError("Precio y capacidad deben ser números válidos.");
		setLoading(false);
		return;
	  }

	  // Subir todas las imágenes seleccionadas
	  let imagenesUrls = [];
	  if (imagenes.length > 0) {
		for (const file of imagenes) {
		  const url = await subirImagenEspacio(file);
		  imagenesUrls.push(url);
		}
	  }

	  const espacio = {
		nombre,
		tipo: tipoFinal,
		sub_tipo: subTipoFinal,
		precio: precioInt,
		capacidad: capacidadInt,
		descripcion,
		imagenes: imagenesUrls,
	  };
	  await crearEspacio(espacio);
	  setModalOpen(true);
	  setTimeout(() => {
		window.location.href = "/espacios";
	  }, 1200);
	} catch (err) {
	  setError(err?.message || "Error al guardar el espacio. Intenta de nuevo.");
	  console.error('Error al guardar espacio:', err);
	} finally {
	  setLoading(false);
	}
  };

  const handleCancelar = () => {
	window.location.href = "/espacios";
  };

  return (
	<div className="landing" style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
	  <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)}>
		<div style={{ textAlign: "center" }}>
		  <div style={{ fontSize: 32, color: "#4caf50", marginBottom: 12 }}>✔</div>
		  <div style={{ fontWeight: 600, fontSize: 20, marginBottom: 8 }}>¡Espacio creado con éxito!</div>
		  <div style={{ color: "#888", fontSize: 15 }}>Redirigiendo a la lista de espacios...</div>
		</div>
	  </Modal>
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
				}}
			>
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

				<div style={{ flex: 2, textAlign: 'center' }}>
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

				<div style={{ display: "flex", alignItems: "center", gap: 16, flex: 1, justifyContent: 'flex-end' }}>
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
  <div style={{ maxWidth: 1200, margin: "0 auto", width: "100%", padding: "0 40px", flex: 1, color: "#000" }}>
	  <h2 style={{ fontWeight: 500, fontSize: 24, margin: "32px 0 0 0", color: "#111" }}>Completa los datos</h2>
	  {error && (
		<div style={{ color: "#d32f2f", margin: "16px 0", fontWeight: 500 }}>{error}</div>
	  )}
  <div style={{ display: "flex", gap: 32, marginTop: 24, flexWrap: "wrap" }}>
	{/* Formulario */}
  <div style={{ flex: 1, minWidth: 340, color: "#000" }}>
		  {/* Eliminado campo duplicado de Nombre */}
		  <div style={{ marginBottom: 16 }}>
			<div style={{ display: "flex", gap: 16 }}>
			  <div style={{ flex: 1 }}>
				<label style={{ display: "block", marginBottom: 8, fontWeight: 500, color: "#111" }}>Tipo de espacio</label>
				<select
				  value={tipo}
				  onChange={e => {
					if (e.target.value === "nuevo") {
					  setModalTipoOpen(true);
					} else {
					  setTipo(e.target.value);
					  setSubTipo("");
					}
				  }}
				  style={{ width: "100%", padding: 12, borderRadius: 8, border: "1px solid #444", color: "#111", background: "#f5f5f5" }}
				  disabled={loading}
				>
				  <option value="">Selecciona un tipo</option>
				  {tiposExistentes.map((t) => (
					<option key={t} value={t}>{t}</option>
				  ))}
				  <option value="nuevo">Agregar nuevo tipo...</option>
				</select>
			  </div>
			  <div style={{ flex: 1 }}>
				<label style={{ display: "block", marginBottom: 8, fontWeight: 500, color: "#111" }}>Subtipo</label>
				<select
				  value={subTipo}
				  onChange={e => {
					if (e.target.value === "nuevo") {
					  setModalSubTipoOpen(true);
					} else {
					  setSubTipo(e.target.value);
					}
				  }}
				  style={{ width: "100%", padding: 12, borderRadius: 8, border: "1px solid #444", color: "#111", background: "#f5f5f5" }}
				  disabled={loading || !tipo}
				>
				  <option value="">Selecciona un subtipo</option>
				  {subTiposExistentes.map((st) => (
					<option key={st} value={st}>{st}</option>
				  ))}
				  <option value="nuevo">Agregar nuevo subtipo...</option>
				</select>
			  </div>
			</div>
		  </div>
	  {/* Modal para agregar nuevo tipo */}
	  <Modal isOpen={modalTipoOpen} onClose={() => setModalTipoOpen(false)}>
		<div style={{ textAlign: "center" }}>
		  <div style={{ fontWeight: 600, fontSize: 20, marginBottom: 16 }}>Agregar nuevo tipo</div>
		  <input
			type="text"
			placeholder="Nombre del nuevo tipo"
			value={nuevoTipo}
			onChange={e => setNuevoTipo(e.target.value)}
			style={{ width: "100%", padding: 12, borderRadius: 8, border: "1px solid #444", color: "#111", background: "#f5f5f5", marginBottom: 16 }}
			autoFocus
		  />
		  <div style={{ display: "flex", justifyContent: "center", gap: 16 }}>
			<button
			  onClick={() => {
				setModalTipoOpen(false);
				setNuevoTipo("");
			  }}
			  style={{ background: "none", border: "1px solid #ccc", borderRadius: 8, padding: "10px 24px", fontWeight: 600, cursor: "pointer" }}
			>Cancelar</button>
			<button
			  onClick={() => {
				if (!nuevoTipo) return;
				// Si el tipo no existe, agregarlo y seleccionarlo, luego abrir el modal de subtipo
				setTiposExistentes(prev => {
				  if (prev.includes(nuevoTipo)) return prev;
				  return [...prev, nuevoTipo];
				});
				setTipo(nuevoTipo); // Selecciona el tipo inmediatamente
				setNuevoTipo("");
				setModalTipoOpen(false);
				setTimeout(() => {
				  setModalSubTipoPreguntaOpen(true);
				}, 0);
			  }}
			  style={{ background: "#f78628", color: "#fff", border: "none", borderRadius: 8, padding: "10px 24px", fontWeight: 600, cursor: "pointer" }}
			>Guardar</button>
		  </div>
		</div>
	  </Modal>
	  {/* Modal pregunta si tiene subtipo */}
	  <Modal isOpen={modalSubTipoPreguntaOpen} onClose={() => setModalSubTipoPreguntaOpen(false)}>
		<div style={{ textAlign: "center" }}>
		  <div style={{ fontWeight: 600, fontSize: 20, marginBottom: 16 }}>¿Este tipo tiene subtipo?</div>
		  <div style={{ display: "flex", justifyContent: "center", gap: 16 }}>
			<button
			  onClick={() => {
				setModalSubTipoPreguntaOpen(false);
				setModalSubTipoOpen(true);
			  }}
			  style={{ background: "#f78628", color: "#fff", border: "none", borderRadius: 8, padding: "10px 24px", fontWeight: 600, cursor: "pointer" }}
			>Sí</button>
			<button
			  onClick={() => {
				setModalSubTipoPreguntaOpen(false);
				setSubTipo("");
			  }}
			  style={{ background: "none", border: "1px solid #ccc", borderRadius: 8, padding: "10px 24px", fontWeight: 600, cursor: "pointer" }}
			>No</button>
		  </div>
		</div>
	  </Modal>
	  {/* Modal para agregar nuevo subtipo */}
	  <Modal isOpen={modalSubTipoOpen} onClose={() => setModalSubTipoOpen(false)}>
		<div style={{ textAlign: "center" }}>
		  <div style={{ fontWeight: 600, fontSize: 20, marginBottom: 16 }}>Agregar nuevo subtipo</div>
		  <input
			type="text"
			placeholder="Nombre del nuevo subtipo"
			value={nuevoSubTipo}
			onChange={e => setNuevoSubTipo(e.target.value)}
			style={{ width: "100%", padding: 12, borderRadius: 8, border: "1px solid #444", color: "#111", background: "#f5f5f5", marginBottom: 16 }}
			autoFocus
		  />
		  <div style={{ display: "flex", justifyContent: "center", gap: 16 }}>
			<button
			  onClick={() => {
				setModalSubTipoOpen(false);
				setNuevoSubTipo("");
			  }}
			  style={{ background: "none", border: "1px solid #ccc", borderRadius: 8, padding: "10px 24px", fontWeight: 600, cursor: "pointer" }}
			>Cancelar</button>
			<button
			  onClick={() => {
				if (nuevoSubTipo) {
				  setSubTiposExistentes(prev => [...prev, nuevoSubTipo]);
				  setSubTipo(nuevoSubTipo);
				  setNuevoSubTipo("");
				  setModalSubTipoOpen(false);
				}
			  }}
			  style={{ background: "#f78628", color: "#fff", border: "none", borderRadius: 8, padding: "10px 24px", fontWeight: 600, cursor: "pointer" }}
			>Guardar</button>
		  </div>
		</div>
	  </Modal>
		  <div style={{ marginBottom: 16 }}>
			<label style={{ display: "block", marginBottom: 8, fontWeight: 500, color: "#111" }}>Nombre</label>
			<input
			  type="text"
			  placeholder="ejem. espacio de prueba"
			  style={{ width: "100%", padding: 12, borderRadius: 8, border: "1px solid #444", color: "#111", background: "#f5f5f5" }}
			  value={nombre}
			  onChange={e => setNombre(e.target.value)}
			  disabled={loading}
			/>
		  </div>
		  <div style={{ marginBottom: 16 }}>
			<label style={{ display: "block", marginBottom: 8, fontWeight: 500, color: "#111" }}>Capacidad máxima de personas</label>
			<input
			  type="number"
			  placeholder="ejem. 100"
			  style={{ width: "100%", padding: 12, borderRadius: 8, border: "1px solid #444", color: "#111", background: "#f5f5f5" }}
			  value={capacidad}
			  onChange={e => setCapacidad(e.target.value)}
			  disabled={loading}
			  min={1}
			/>
		  </div>
		  <div style={{ marginBottom: 16 }}>
			<label style={{ display: "block", marginBottom: 8, fontWeight: 500, color: "#111" }}>Precio de alquiler</label>
			<input
			  type="number"
			  placeholder="ejem. 50.00"
			  style={{ width: "100%", padding: 12, borderRadius: 8, border: "1px solid #444", color: "#111", background: "#f5f5f5" }}
			  value={precio}
			  onChange={e => setPrecio(e.target.value)}
			  disabled={loading}
			  min={0}
			  step={0.01}
			/>
		  </div>
		  <div style={{ marginBottom: 16 }}>
			<label style={{ display: "block", marginBottom: 8, fontWeight: 500, color: "#111" }}>Descripción</label>
			<textarea
			  placeholder="Describe el espacio, ubicación, equipamiento, etc."
			  style={{ width: "100%", padding: 12, borderRadius: 8, border: "1px solid #444", color: "#111", background: "#f5f5f5", minHeight: 60 }}
			  value={descripcion}
			  onChange={e => setDescripcion(e.target.value)}
			  disabled={loading}
			/>
		  </div>
		</div>
	{/* Carga de fotos habilitada */}
	<div style={{ flex: 1, color: "#000" }}>
	  <label style={{ display: "block", marginBottom: 8, fontWeight: 500, color: "#000" }}>Fotos del espacio</label>
	  <div style={{ border: "2px dashed #ccc", borderRadius: 8, padding: 24, textAlign: "center", minHeight: 260, display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", color: "#000", position: "relative" }}>
		<span style={{ fontSize: 48, color: "#ccc" }}>🖼️</span>
		<p style={{ color: "#000" }}>Arrastra y suelta una imagen aquí</p>
		<p style={{ fontSize: 12, color: "#888" }}>PNG, JPG, GIF de no más de 10MB</p>
	<input
	  type="file"
	  accept="image/*"
	  multiple
	  style={{ display: "none" }}
	  id="input-imagenes"
	  ref={inputImagenesRef}
	  onChange={handleImagenesChange}
	  max={3}
	/>
		<button
		  type="button"
		  style={{ background: "#e0e0e0", border: "none", borderRadius: 8, padding: "8px 16px", cursor: "pointer", marginTop: 8, color: "#000" }}
		  onClick={() => inputImagenesRef.current && inputImagenesRef.current.click()}
		>
		  Explorar
		</button>
		{/* Previews de imágenes seleccionadas */}
	{imagenesPreview.length > 0 && (
	  <div style={{ display: "flex", gap: 12, marginTop: 18, flexWrap: "wrap", justifyContent: "center" }}>
		{imagenesPreview.map((url, idx) => (
		  <div key={idx} style={{ position: "relative" }}>
			<img src={url} alt={`preview${idx}`} style={{ width: 70, height: 70, objectFit: "cover", borderRadius: 8, border: "1px solid #ddd" }} />
		  </div>
		))}
		{imagenesPreview.length === 3 && (
		  <div style={{ color: '#d32f2f', fontSize: 13, width: '100%', textAlign: 'center', marginTop: 8 }}>Máximo 3 imágenes</div>
		)}
	  </div>
	)}
	  </div>
	</div>
	  </div>
	  <div style={{ display: "flex", justifyContent: "flex-end", gap: 16, marginTop: 32, marginBottom: 56 }}>
		<button onClick={handleCancelar} style={{ background: "none", border: "1px solid #ccc", borderRadius: 8, padding: "10px 24px", fontWeight: 600, color: "#111", cursor: loading ? "not-allowed" : "pointer" }} disabled={loading}>Cancelar</button>
		<button onClick={handleGuardar} style={{ background: "#f78628", color: "#fff", border: "none", borderRadius: 8, padding: "10px 24px", fontWeight: 600, cursor: loading ? "not-allowed" : "pointer" }} disabled={loading}>{loading ? "Guardando..." : "Guardar"}</button>
	  </div>
	</div>
	  <Footer />
	</div>
  );
};

export default CrearEspacio;
