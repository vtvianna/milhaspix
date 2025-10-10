import React, { useState, useEffect } from "react";
import styles from "./Mileage.module.css";

function Mileage({ onRankingChange, onLoadingChange }) {
  const [isEnabled, setIsEnabled] = useState(false);
  const [mileage, setMileage] = useState("R$ 00,00");
  const [ranking, setRanking] = useState([]);
  const suggestedMileage = "27.900";

  const toggleSwitch = () => setIsEnabled(!isEnabled);

  const formatCurrency = (value) => {
    const onlyDigits = value.replace(/\D/g, "");
    const number = parseFloat(onlyDigits) / 100;
    if (isNaN(number)) return "R$ 0,00";
    return number.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    });
  };

  const unformatCurrency = (value) => {
    if (!value) return "";
    const cleaned = value
      .replace(/[R$\s]/g, "")
      .replace(/\./g, "")
      .replace(",", ".");
    const number = parseFloat(cleaned);
    return isNaN(number) ? "" : number.toFixed(2);
  };

  const handleInputChange = (e) => {
    const formatted = formatCurrency(e.target.value);
    setMileage(formatted);
  };

  useEffect(() => {
    if (!isEnabled) return;

    const timeout = setTimeout(() => {
      const rawValue = unformatCurrency(mileage);
      if (!rawValue || isNaN(rawValue)) return;

      if (onLoadingChange) onLoadingChange(true);

      // Chamada para sua rota serverless (Vercel)
      fetch(`/api/ranking?mile_value=${rawValue}`)
        .then((res) => {
          if (!res.ok) throw new Error(`Erro HTTP ${res.status}`);
          return res.json();
        })
        .then((data) => {
          const r = Array.isArray(data) ? data : data.ranking || [];
          setRanking(r);
          if (onRankingChange) onRankingChange(r);
        })
        .catch((err) => {
          console.error("Erro ao buscar ranking:", err);
          setRanking([]);
          if (onRankingChange) onRankingChange([]);
        })
        .finally(() => {
          if (onLoadingChange) onLoadingChange(false);
        });
    }, 500);

    return () => clearTimeout(timeout);
  }, [mileage, isEnabled, onRankingChange, onLoadingChange]);

  return (
    <div
      className={`${styles.wrapper} ${
        isEnabled ? styles.wrapperAberto : styles.wrapperFechado
      }`}
    >
      <div className={styles.toggleSection}>
        <label className={styles.switch}>
          <input type="checkbox" checked={isEnabled} onChange={toggleSwitch} />
          <span className={`${styles.slider} ${styles.round}`}></span>
        </label>
        <span
          className={`${styles.toggleLabel} ${
            isEnabled ? styles.active : ""
          }`}
        >
          Definir média de milhas por passageiro
        </span>
      </div>

      <div
        className={`${styles.inputContainer} ${
          isEnabled ? styles.visivel : ""
        }`}
      >
        {isEnabled && (
          <div className={styles.inputSection}>
            <input
              type="text"
              value={mileage}
              onChange={handleInputChange}
              className={styles.mileageInput}
            />
            <div className={styles.suggestion}>
              Melhor média para o seu cliente:{" "}
              <strong>{suggestedMileage}</strong>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Mileage;


