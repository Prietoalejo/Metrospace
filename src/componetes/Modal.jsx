import React from "react";

const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;
  return (
    <div style={{
      position: "fixed",
      top: 0,
      left: 0,
      width: "100vw",
      height: "100vh",
      background: "rgba(0,0,0,0.3)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      zIndex: 1000
    }}>
      <div style={{ background: "#fff", borderRadius: 8, padding: 32, minWidth: 320, position: "relative", boxShadow: "0 2px 16px #0003" }}>
        <button onClick={onClose} style={{ position: "absolute", top: 12, right: 12, fontSize: 22, background: "none", border: "none", cursor: "pointer", color: "#888" }}>×</button>
        {children}
      </div>
    </div>
  );
};

export default Modal;
