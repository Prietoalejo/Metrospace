
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Footer from "../componetes/Footer";
import Breadcrumbs from "../componetes/Breadcrumbs";
import { getEspacios, editarEspacio, eliminarEspacio } from "../logica/supabaseEspacios";
import Modal from "../componetes/Modal";

const EditarPerfilEspacio = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [espacio, setEspacio] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editando, setEditando] = useState(false);
  const [modalOpen, setModalOpen] = useState(false); // Modal de éxito
  const [confirmar, setConfirmar] = useState(false); // Modal de confirmación
  const [saving, setSaving] = useState(false);
  const [originalEspacio, setOriginalEspacio] = useState(null);
  const [modalEliminar, setModalEliminar] = useState(false);

  useEffect(() => {
    async function fetchEspacio() {
      setLoading(true);
      try {
        const espacios = await getEspacios();
        const found = espacios.find(e => String(e.id) === String(id));
        if (!found) throw new Error("Espacio no encontrado");
        setEspacio(found);
        setError(null);
      } catch (err) {
        setError("Error al cargar el espacio");
      } finally {
        setLoading(false);
      }
    }
    fetchEspacio();
  }, [id]);

  if (loading) return <div style={{ padding: 40 }}>Cargando...</div>;
  if (error) return <div style={{ padding: 40, color: "#d32f2f" }}>{error}</div>;

  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column", background: "#fff" }}>
      <header style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 40px", height: 80, background: "#fff", borderBottom: "1px solid #eee" }}>
        <div style={{ width: 32, height: 48, background: "#e0e0e0", borderRadius: 4 }} />
        <span style={{ color: "#f78628", fontWeight: 700, fontSize: 40, letterSpacing: "-1.44px", fontFamily: "Roboto Condensed, Helvetica, Arial, sans-serif" }}>METROSPACE</span>
        <button style={{ background: "none", border: "none", display: "flex", alignItems: "center", cursor: "pointer", color: "#222", fontWeight: 500, fontSize: 16, padding: 0 }} onClick={() => navigate("/perfil-admin")}>Mi perfil <span style={{ width: 28, height: 28, borderRadius: "50%", background: "#e0e0e0", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18, color: "#888", marginLeft: 8 }}>👤</span></button>
      </header>
      <Breadcrumbs />
      <div style={{ maxWidth: 1200, margin: "0 auto", width: "100%", padding: "0 20px", flex: 1 }}>
        <div style={{ display: "flex", marginTop: 32, gap: 40 }}>
          <div style={{ flex: 1 }}>
            <h2 style={{ fontWeight: 500, fontSize: 22, marginBottom: 24 }}>Datos del espacio</h2>
            <div style={{ marginBottom: 18 }}>
              <label style={{ display: "block", marginBottom: 6, color: "#444" }}>Nombre</label>
              <input
                value={espacio?.nombre || ""}
                disabled={!editando}
                onChange={e => setEspacio({ ...espacio, nombre: e.target.value })}
                style={{ width: "100%", padding: 12, borderRadius: 8, border: "1px solid #ccc", background: editando ? "#fff" : "#ededed", color: editando ? "#222" : "#888", fontSize: 16 }}
              />
            </div>
            <div style={{ marginBottom: 18 }}>
              <label style={{ display: "block", marginBottom: 6, color: "#444" }}>Tipo de espacio</label>
              <input
                value={espacio?.tipo || ""}
                disabled={!editando}
                onChange={e => setEspacio({ ...espacio, tipo: e.target.value })}
                style={{ width: "100%", padding: 12, borderRadius: 8, border: "1px solid #ccc", background: editando ? "#fff" : "#ededed", color: editando ? "#222" : "#888", fontSize: 16 }}
              />
            </div>
            <div style={{ marginBottom: 18 }}>
              <label style={{ display: "block", marginBottom: 6, color: "#444" }}>Subtipo</label>
              <input
                value={espacio?.sub_tipo || ""}
                disabled={!editando}
                onChange={e => setEspacio({ ...espacio, sub_tipo: e.target.value })}
                style={{ width: "100%", padding: 12, borderRadius: 8, border: "1px solid #ccc", background: editando ? "#fff" : "#ededed", color: editando ? "#222" : "#888", fontSize: 16 }}
              />
            </div>
            <div style={{ marginBottom: 18 }}>
              <label style={{ display: "block", marginBottom: 6, color: "#444" }}>Capacidad máxima de personas</label>
              <input
                value={espacio?.capacidad || ""}
                type="number"
                disabled={!editando}
                onChange={e => setEspacio({ ...espacio, capacidad: e.target.value })}
                style={{ width: "100%", padding: 12, borderRadius: 8, border: "1px solid #ccc", background: editando ? "#fff" : "#ededed", color: editando ? "#222" : "#888", fontSize: 16 }}
              />
            </div>
            <div style={{ marginBottom: 18 }}>
              <label style={{ display: "block", marginBottom: 6, color: "#444" }}>Precio de alquiler</label>
              <input
                value={espacio?.precio || ""}
                type="number"
                disabled={!editando}
                onChange={e => setEspacio({ ...espacio, precio: e.target.value })}
                style={{ width: "100%", padding: 12, borderRadius: 8, border: "1px solid #ccc", background: editando ? "#fff" : "#ededed", color: editando ? "#222" : "#888", fontSize: 16 }}
              />
            </div>
            <div style={{ marginBottom: 18 }}>
              <label style={{ display: "block", marginBottom: 6, color: "#444" }}>Descripción</label>
              <textarea
                value={espacio?.descripcion || ""}
                disabled={!editando}
                onChange={e => setEspacio({ ...espacio, descripcion: e.target.value })}
                style={{ width: "100%", padding: 12, borderRadius: 8, border: "1px solid #ccc", background: editando ? "#fff" : "#ededed", color: editando ? "#222" : "#888", fontSize: 16, minHeight: 60 }}
              />
            </div>
          </div>
          <div style={{ flex: 2 }}>
            <h3 style={{ fontWeight: 500, fontSize: 18, marginBottom: 16 }}>Fotos del espacio</h3>
            <div style={{ display: "flex", gap: 32 }}>
              {espacio?.imagen ? (
                <img src={espacio.imagen} alt="foto espacio" style={{ width: 220, height: 180, objectFit: "cover", borderRadius: 8, boxShadow: "0 2px 8px #0001" }} />
              ) : (
                <div style={{ width: 220, height: 180, background: "#e0e0e0", borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center", color: "#bbb", fontSize: 32 }}>🖼️</div>
              )}
            </div>
          </div>
        </div>
        <div style={{ display: "flex", justifyContent: "flex-end", alignItems: "center", gap: 32, marginTop: 40 }}>
          {!editando ? (
            <button
              style={{ background: "#f78628", color: "#fff", border: "none", borderRadius: 8, padding: "12px 48px", fontWeight: 500, fontSize: 18, cursor: "pointer" }}
              onClick={() => {
                setOriginalEspacio(espacio); // Guarda el estado original para cancelar
                setEditando(true);
              }}
            >
              Editar
            </button>
          ) : (
            <>
              <button
                style={{ background: "#4caf50", color: "#fff", border: "none", borderRadius: 8, padding: "12px 32px", fontWeight: 500, fontSize: 18, cursor: "pointer" }}
                onClick={() => setConfirmar(true)}
                disabled={saving}
              >
                Guardar cambios
              </button>
              <button
                style={{ background: "none", color: "#f78628", border: "1px solid #f78628", borderRadius: 8, padding: "12px 32px", fontWeight: 500, fontSize: 18, cursor: "pointer" }}
                onClick={() => {
                  setEspacio(originalEspacio);
                  setEditando(false);
                }}
                disabled={saving}
              >
                Cancelar
              </button>
            </>
          )}
          {/* Modal de confirmación de cambios */}
          <Modal isOpen={confirmar} onClose={() => setConfirmar(false)}>
            <div style={{ textAlign: "center" }}>
              <div style={{ fontWeight: 600, fontSize: 20, marginBottom: 16, color: "#222" }}>¿Estás seguro de guardar los cambios?</div>
              <div style={{ display: "flex", justifyContent: "center", gap: 16, marginTop: 24 }}>
                <button
                  onClick={async () => {
                    setSaving(true);
                    try {
                      await editarEspacio(id, {
                        nombre: espacio.nombre,
                        tipo: espacio.tipo,
                        sub_tipo: espacio.sub_tipo,
                        capacidad: parseInt(espacio.capacidad, 10),
                        precio: parseInt(espacio.precio, 10),
                        descripcion: espacio.descripcion
                      });
                      setEditando(false);
                      setConfirmar(false);
                      setModalOpen(true);
                      setTimeout(() => {
                        setModalOpen(false);
                        navigate("/espacios");
                      }, 1200);
                    } catch (err) {
                      alert("Error al guardar los cambios");
                    } finally {
                      setSaving(false);
                    }
                  }}
                  style={{ background: "#f78628", color: "#fff", border: "none", borderRadius: 8, padding: "10px 24px", fontWeight: 600, cursor: "pointer", minWidth: 100 }}
                  disabled={saving}
                >
                  Guardar
                </button>
                <button
                  onClick={() => setConfirmar(false)}
                  style={{ background: "none", border: "1px solid #ccc", borderRadius: 8, padding: "10px 24px", fontWeight: 600, cursor: "pointer", minWidth: 100, color: "#222" }}
                  disabled={saving}
                >
                  Cancelar
                </button>
              </div>
            </div>
          </Modal>
          {/* Modal de éxito */}
          <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)}>
            <div style={{ textAlign: "center" }}>
              <div style={{ fontSize: 32, color: "#4caf50", marginBottom: 12 }}>✔</div>
              <div style={{ fontWeight: 600, fontSize: 20, marginBottom: 8 }}>¡Espacio editado con éxito!</div>
              <div style={{ color: "#888", fontSize: 15 }}>Redirigiendo a la lista de espacios...</div>
            </div>
          </Modal>
          <button
            style={{ background: "none", color: "#f78628", border: "none", fontWeight: 500, fontSize: 18, cursor: "pointer" }}
            onClick={() => setModalEliminar(true)}
            disabled={saving}
          >
            Eliminar
          </button>
          {/* Modal de confirmación de eliminación */}
          <Modal isOpen={modalEliminar} onClose={() => setModalEliminar(false)}>
            <div style={{ textAlign: "center" }}>
              <div style={{ fontWeight: 600, fontSize: 20, marginBottom: 16, color: "#d32f2f" }}>¿Seguro que deseas eliminar este espacio?</div>
              <div style={{ color: "#888", fontSize: 15, marginBottom: 24 }}>Esta acción no se puede deshacer.</div>
              <div style={{ display: "flex", justifyContent: "center", gap: 16 }}>
                <button
                  onClick={async () => {
                    setSaving(true);
                    try {
                      await eliminarEspacio(id);
                      setModalEliminar(false);
                      setModalOpen(true);
                      setTimeout(() => {
                        setModalOpen(false);
                        navigate("/espacios");
                      }, 1200);
                    } catch (err) {
                      alert("Error al eliminar el espacio");
                    } finally {
                      setSaving(false);
                    }
                  }}
                  style={{ background: "#d32f2f", color: "#fff", border: "none", borderRadius: 8, padding: "10px 24px", fontWeight: 600, cursor: "pointer", minWidth: 100 }}
                  disabled={saving}
                >
                  Eliminar
                </button>
                <button
                  onClick={() => setModalEliminar(false)}
                  style={{ background: "none", border: "1px solid #ccc", borderRadius: 8, padding: "10px 24px", fontWeight: 600, cursor: "pointer", minWidth: 100, color: "#222" }}
                  disabled={saving}
                >
                  Cancelar
                </button>
              </div>
            </div>
          </Modal>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default EditarPerfilEspacio;
