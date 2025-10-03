import Stepper from "../layout/Stepper";
import styles from "./PassoDois.module.css";
import React, { useState } from "react";
import { PiAirplaneInFlight } from "react-icons/pi";

function PassoDois() {
  const [selected, setSelected] = useState("Imediato");

  return (
    <section className={styles.tiles}>
      <Stepper currentStep={1} />

      <div className={styles.container}>
        <div className={styles.container_titulo}>
          <>
            <span>02. </span>Oferte suas milhas
          </>
          <p className={styles.badge}>Escolha entre R$ 14,00 e R$ 16,56</p>
        </div>

        <div className={styles.container_receber}>
          <div>Quero receber</div>
          <div className={styles.receber}>
            {["Imediato", "em 2 dias", "em 7 dias", "Depois do voo"].map(
              (option) => (
                <button
                  key={option}
                  onClick={() => setSelected(option)}
                  className={`${styles.programaBtn} ${
                    selected === option ? styles.ativo : ""
                  }`}
                >
                  {option}
                </button>
              )
            )}
          </div>
        </div>

        {/* Container de campos */}
        <div className={styles.container_campos}>
          {/* Campo com ícone dentro do input */}
          <div className={styles.campo}>
            <label htmlFor="produtoMilhas">Produto</label>
            <div className={styles.inputWrapper}>
              <input
                className={styles.input}
                id="produtoMilhas"
                defaultValue="10.000"
              />
              <PiAirplaneInFlight className={styles.inputIcon} />
            </div>
          </div>

          {/* Campo de seleção */}
          <div className={styles.campo}>
            <label htmlFor="tipoProduto">Tipo</label>
            <select id="tipoProduto" className={styles.select}>
              <option value="liminar">Liminar</option>
              <option value="outro">Outro</option>
            </select>
          </div>
        </div>
      </div>
    </section>
  );
}

export default PassoDois;

