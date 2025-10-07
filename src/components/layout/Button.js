import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Button.module.css";

function Button({ texto = "Prosseguir", to = "/", icone, onValidar }) {
  const navigate = useNavigate();

  const handleClick = () => {
    // 🔹 Caso exista uma função de validação passada pelo passo
    if (onValidar) {
      const valido = onValidar(); // deve retornar true ou false

      if (valido) {
        navigate(to); // só navega se a validação for TRUE
      }
      return; // impede o botão de avançar sozinho
    }

    // 🔹 Caso não tenha função de validação, tenta validar campos required
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
