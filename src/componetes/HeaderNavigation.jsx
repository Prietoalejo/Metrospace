import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexto/AuthContext";

function HeaderNavigation() {
    const navigate = useNavigate();
    const { currentUser, logout } = useAuth();

    const handleLogout = async () => {
        try {
            await logout();
        } catch (error) {
            console.error("Error al cerrar sesión:", error);
        }
    };

    return (
        <header
            className="header"
            style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "0 40px",
                height: 100,
                background: "#fff",
                boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.1), 0px 2px 6px rgba(0, 0, 0, 0.08)"
            }}
        >
            {/* Logo y título */}
            <div
                style={{ display: "flex", alignItems: "center", cursor: "pointer" }}
                onClick={() => navigate("/")}
            >
                <div className="logo" style={{ width: 27, height: 48, background: "#eee", borderRadius: 4 }} />
                <div
                    className="div"
                    style={{
                        marginLeft: 24,
                        color: "#f78628",
                        fontFamily: "Roboto Condensed-Bold, Helvetica",
                        fontSize: 48,
                        fontWeight: 700,
                        letterSpacing: "-1.44px"
                    }}
                >
                    METROSPACE
                </div>
            </div>

            {/* Botones de navegación */}
            <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
                {currentUser ? (
                    // Usuario autenticado
                    <>
                        <button
                            className="nav-button"
                            style={{
                                background: "transparent",
                                color: "#273b80",
                                border: "2px solid #273b80",
                                borderRadius: 8,
                                padding: "8px 16px",
                                fontWeight: 600,
                                fontSize: 14,
                                cursor: "pointer",
                            }}
                            onClick={() => navigate("/reservas")}
                        >
                            Mis reservas
                        </button>

                        <button
                            className="profile-button"
                            style={{
                                background: "rgba(219, 132, 17, 0.05)",
                                border: "1px solid #ccc",
                                borderRadius: 8,
                                padding: "6px 12px",
                                display: "flex",
                                alignItems: "center",
                                gap: 8,
                                fontSize: 14,
                                fontWeight: 500,
                                cursor: "pointer",
                            }}
                            onClick={() => navigate("/perfil")}
                        >
                            <div
                                style={{
                                    width: 28,
                                    height: 28,
                                    borderRadius: "50%",
                                    background: "#f78628",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    fontSize: 14,
                                    color: "#fff",
                                    fontWeight: "bold"
                                }}
                            >
                                {currentUser.userData?.nombre?.charAt(0)?.toUpperCase() ||
                                    currentUser.displayName?.charAt(0)?.toUpperCase() || "U"}
                            </div>
                            Mi perfil
                        </button>

                        <button
                            className="logout-button"
                            style={{
                                background: "#dc3545",
                                color: "#fff",
                                border: "none",
                                borderRadius: 8,
                                padding: "8px 16px",
                                fontWeight: 500,
                                fontSize: 14,
                                cursor: "pointer",
                            }}
                            onClick={handleLogout}
                        >
                            Cerrar sesión
                        </button>
                    </>
                ) : (
                    // Usuario no autenticado
                    <>
                        <button
                            className="button-instance"
                            style={{
                                background: "transparent",
                                color: "#273b80",
                                border: "2px solid #273b80",
                                borderRadius: 8,
                                padding: "8px 16px",
                                fontWeight: 600,
                                fontSize: 14,
                                cursor: "pointer",
                            }}
                            onClick={() => navigate("/registro")}
                        >
                            Registrarme
                        </button>
                        <button
                            className="design-component-instance-node"
                            style={{
                                background: "#f78628",
                                color: "#fff",
                                border: "none",
                                borderRadius: 8,
                                padding: "10px 20px",
                                fontWeight: 600,
                                fontSize: 14,
                                cursor: "pointer",

                            }}
                            onClick={() => navigate("/iniciar-sesion")}
                        >
                            Ingresar
                        </button>
                    </>
                )}
            </div>
        </header>
    );
}

export default HeaderNavigation;