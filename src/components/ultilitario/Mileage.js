import React, { useState, useEffect } from "react";
import styles from "./Mileage.module.css";

function Mileage() {
  const [isEnabled, setIsEnabled] = useState(false);
  const [mileage, setMileage] = useState("R$ 10,00");
  const [ranking, setRanking] = useState([]);
  const suggestedMileage = "27.900";

  const toggleSwitch = () => setIsEnabled(!isEnabled);

  // === Função para formatar valor em R$ ===
  const formatCurrency = (value) => {
    const onlyDigits = value.replace(/\D/g, "");
    const number = parseFloat(onlyDigits) / 100;
    if (isNaN(number)) return "R$ 0,00";
    return number.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    });
  };

  // === Função para remover formatação e converter para número ===
  const unformatCurrency = (value) => {
    if (!value) return "";
    const cleaned = value
      .replace(/[R$\s]/g, "")
      .replace(/\./g, "")
      .replace(",", ".");
    const number = parseFloat(cleaned);
    return isNaN(number) ? "" : number.toFixed(2);
  };

  // === Atualiza o input com máscara R$ ===
  const handleInputChange = (e) => {
    const formatted = formatCurrency(e.target.value);
    setMileage(formatted);
  };

  // === Chama a API sempre que o valor muda (com debounce de 500ms) ===
  useEffect(() => {
    if (!isEnabled) return;

    const timeout = setTimeout(() => {
      const rawValue = unformatCurrency(mileage);
      if (!rawValue || isNaN(rawValue)) return;

      console.log("🔹 Valor enviado para API:", rawValue);
      console.log(
        "🔹 URL completa:",
        `https://api.milhaspix.com/simulate-ranking?mile_value=${rawValue}`
      );

      fetch(`/simulate-ranking?mile_value=${rawValue}`)
        .then((res) => res.json())
        .then((data) => {
          console.log("🔹 Retorno da API:", data);
          setRanking(Array.isArray(data) ? data : data.ranking || []);
        })
        .catch((err) => console.error("Erro ao buscar ranking:", err));
    }, 500); // debounce de 500ms

    return () => clearTimeout(timeout);
  }, [mileage, isEnabled]);

  return (
    <div className={styles.wrapper}>
      {/* Toggle do recurso */}
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

      {/* Quando ativado */}
      {isEnabled && (
        <div className={styles.inputContainer}>
          {/* Campo de input com máscara */}
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

          {/* Ranking lateral */}
          <div className={styles.rankingSection}>
            <h4>Ranking</h4>
            <ul>
              {ranking.length > 0 ? (
                ranking.map((item) => (
                  <li key={item.position}>
                    <strong>
                      R$ {item.mile_value.toFixed(2).replace(".", ",")}
                    </strong>{" "}
                    – {item.description}
                  </li>
                ))
              ) : (
                <li>Nenhum dado disponível.</li>
              )}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}

export default Mileage;

