import React from "react";

const GoogleButton = ({ onClick }) => {
  return (
    <button onClick={onClick} className="google-btn">
      <img 
        src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg" 
        alt="Google Logo" 
        width="20"
      />
      <span>Continuar con Google</span>
    </button>
  );
};

export default GoogleButton;