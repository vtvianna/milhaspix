import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "./ButtonVoltar.module.css";

function ButtonVoltar({ texto = "Voltar", to = "/" }) {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(to);
  };

  return (
    <button className={styles.botaoVoltar} type="button" onClick={handleClick}>
      {texto}
    </button>
  );
}

export default ButtonVoltar;
