// ButtonVoltar.js
import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Button.module.css"; // usa o mesmo CSS para manter padrão visual

function ButtonVoltar({ texto = "Voltar", to }) {
  const navigate = useNavigate();

  const handleClick = (e) => {
    e.preventDefault();
    if (to) navigate(to);
    else navigate(-1);
  };

  return (
    <button onClick={handleClick} className={`${styles.button} ${styles.voltar}`}>
      {texto}
    </button>
  );
}

export default ButtonVoltar;
