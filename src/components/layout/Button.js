import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Button.module.css";

function Button({ texto = "Prosseguir", to = "/", icone, onValidar }) {
  const navigate = useNavigate();

  const handleClick = () => {
    // 🔹 Se o passo tiver função de validação, executa e só navega se for true
    if (onValidar) {
      const valido = onValidar();
      if (valido) navigate(to);
      return;
    }

    // 🔹 Se não houver validação manual, valida campos com required
    const requiredFields = document.querySelectorAll("[required]");
    let allValid = true;

    requiredFields.forEach((field) => {
      if (!field.reportValidity()) {
        allValid = false;
      }
    });

    if (allValid) {
      navigate(to);
    }
  };

  return (
    <button className={styles.botaoProximo} type="button" onClick={handleClick}>
      {icone && <span className={styles.icone}>{icone}</span>}
      {texto}
    </button>
  );
}

export default Button;

