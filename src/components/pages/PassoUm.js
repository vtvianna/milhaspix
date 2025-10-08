import { useState } from "react";
import styles from "./PassoUm.module.css";
import Stepper from "../layout/Stepper";
import { useNavigate } from "react-router-dom";
import { PiCaretUpDown } from "react-icons/pi";
import { FaLock } from "react-icons/fa";
import Button from "../layout/Button";

import latam from "../../img/latam.png";
import airportugal from "../../img/airportugal.png";
import smiles from "../../img/smiles.png";
import tudoazul from "../../img/tudoazul.png";

function PassoUm() {
  const [programa, setPrograma] = useState(null);
  const navigate = useNavigate();

  const programas = [
    { id: "azul", nome: "TudoAzul", logo: tudoazul },
    { id: "smiles", nome: "Smiles", logo: smiles },
    { id: "latam", nome: "Latam Pass", logo: latam },
    { id: "air", nome: "Air Portugal", logo: airportugal },
  ];

  const handleSelecionarPrograma = (id) => {
    setPrograma(id);
    localStorage.setItem("programaSelecionado", id);
  };

  const handleProsseguir = () => {
    if (programa) {
      navigate("/passodois");
    }
  };

  return (
    <section className={styles.tiles}>
      <Stepper currentStep={0} />

      <div className={styles.container}>
        <div className={styles.container_titulo}>
          <p className={styles.titulo}>
            <span className={styles.span_titulo}>01. </span> Escolha o programa de fidelidade.
          </p>
        </div>

        {/* Programas */}
        <div className={styles.container_companhia}>
          <div className={styles.companhia}>
            {programas.map((p) => (
              <button
                key={p.id}
                onClick={() => handleSelecionarPrograma(p.id)}
                className={`${styles.programaBtn} ${
                  programa === p.id ? styles.ativo : ""
                }`}
              >
                <img
                  src={p.logo}
                  alt={p.nome}
                  className={`${styles.companyLogo} ${styles[p.id]}`}
                />
              </button>
            ))}
          </div>
        </div>

        {/* Produto + CPF estático */}
        <div className={styles.container_campos}>
          <div className={styles.campo}>
            <label htmlFor="produto">Produto</label>
            <div className={styles.inputWrapper}>
              <select id="produto" className={styles.select}>
                <option value="liminar">Liminar</option>
                <option value="outro">Outro</option>
              </select>
              <PiCaretUpDown className={styles.inputIcon} />
            </div>
          </div>

          <div className={styles.campo}>
            <label>CPF</label>
            <div className={styles.inputWrapper}>
              <div className={styles.input}>
                000.000.000-00
              </div>
              <FaLock className={styles.inputIcon} />
            </div>
          </div>
        </div>

        <div className={styles.botao_container}>
          <Button texto="Prosseguir" to="/passodois" onValidar={handleProsseguir} />
        </div>
      </div>

      <div className={styles.infoCard}>
        <p>
          Escolha de qual programa de fidelidade você quer vender suas milhas.
          <br />
          <strong>Use apenas contas em seu nome.</strong>
        </p>
      </div>
    </section>
  );
}

export default PassoUm;


