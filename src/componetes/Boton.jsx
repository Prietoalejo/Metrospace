import React from "react";

function Boton({ texto, onClick }) {
  return <button onClick={onClick}>{texto}</button>;
}

export default Boton;