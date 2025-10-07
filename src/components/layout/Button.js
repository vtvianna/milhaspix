// Button.js
import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Button.module.css";

function Button({ texto, to, onValidar, disabled }) {
  const navigate = useNavigate();

  const handleClick = (e) => {
    e.preventDefault();
    if (disabled) return; // bloqueia clique se desabilitado

    if (onValidar) {
      const resultado = onValidar();
      if (resultado === false) return;
    }

    if (to) navigate(to);
  };

  return (
    <button
      onClick={handleClick}
      className={`${styles.button} ${disabled ? styles.disabled : styles.ativo}`}
      disabled={disabled}
    >
      {texto}
    </button>
  );
}

export default Button;


