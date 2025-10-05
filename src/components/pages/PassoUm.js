import { useState } from "react";
import styles from "./PassoUm.module.css";
import Stepper from "../layout/Stepper";
import { useNavigate } from "react-router-dom";

import latam from "../../img/latam.png";
import airportugal from "../../img/airportugal.png";
import smiles from "../../img/smiles.png";
import tudoazul from "../../img/tudoazul.png";

// Funções utilitárias
function formatCpf(value) {
  const digits = value.replace(/\D/g, "").slice(0, 11);
  return digits
    .replace(/^(\d{3})(\d)/, "$1.$2")
    .replace(/^(\d{3})\.(\d{3})(\d)/, "$1.$2.$3")
    .replace(/\.(\d{3})(\d{1,2})$/, ".$1-$2");
}

function isValidCpf(cpf) {
  const s = cpf.replace(/\D/g, "");
  if (s.length !== 11) return false;
  if (/^(\d)\1+$/.test(s)) return false;
  const calc = (t) => {
    let sum = 0;
    for (let i = 0; i < t; i++) sum += parseInt(s[i]) * (t + 1 - i);
    const mod = (sum * 10) % 11;
    return mod === 10 ? 0 : mod;
  };
  const d1 = calc(9);
  const d2 = calc(10);
  return d1 === parseInt(s[9]) && d2 === parseInt(s[10]);
}

function PassoUm() {
  const [programa, setPrograma] = useState(null);
  const [cpfRaw, setCpfRaw] = useState("");
  const [cpfTouched, setCpfTouched] = useState(false);

  const navigate = useNavigate(); // Hook de navegação

  const programas = [
    { id: "azul", nome: "TudoAzul", logo: tudoazul },
    { id: "smiles", nome: "Smiles", logo: smiles },
    { id: "latam", nome: "Latam Pass", logo: latam },
    { id: "air", nome: "Air Portugal", logo: airportugal },
  ];

  const handleCpfChange = (e) => {
    const digits = e.target.value.replace(/\D/g, "").slice(0, 11);
    setCpfRaw(digits);
  };

  const cpfFormatted = formatCpf(cpfRaw);
  const cpfIsValid = cpfRaw.length === 11 && isValidCpf(cpfRaw);

  const handleProsseguir = () => {
    if (programa && cpfIsValid) {
      navigate("/passodois"); // Rota de destino
    }
  };

  return (
    <section className={styles.tiles}>
      <Stepper currentStep={0} />

      <div className={styles.container}>
        <div className={styles.container_titulo}>
          <p>
            <span>01. </span> Escolha o programa de fidelidade.
          </p>
        </div>

        <div className={styles.container_companhia}>
          <div className={styles.companhia}>
            {programas.map((p) => (
              <button
                key={p.id}
                onClick={() => setPrograma(p.id)}
                className={`${styles.programaBtn} ${
                  programa === p.id ? styles.ativo : ""
                }`}
              >
                <img src={p.logo} alt={p.nome} />
              </button>
            ))}
          </div>
        </div>


        <div className={styles.container_campos}>
        
          {/* Campo Produto */}
          <div className={styles.campo}>
            <label htmlFor="produto">Produto</label>
            <select id="produto" className={styles.select}>
              <option value="liminar">Liminar</option>
              <option value="outro">Outro</option>
            </select>
          </div>

            {/* Campo CPF */}
          <div className={styles.campo}>
            <label htmlFor="cpf">CPF</label>
            <input
              id="cpf"
              type="text"
              className={styles.input}
              placeholder="000.000.000-00"
              value={cpfFormatted}
              onChange={handleCpfChange}
              onBlur={() => setCpfTouched(true)}
              inputMode="numeric"
              autoComplete="off"
            />
            {cpfTouched && cpfRaw.length > 0 && !cpfIsValid && (
              <p className={styles.erro}>CPF inválido</p>
            )}
          </div>
        </div>
      

      <div className={styles.botao_container}>
        <button
          disabled={!programa || !cpfIsValid}
          onClick={handleProsseguir}
          className={`${styles.prosseguirBtn} ${
            programa && cpfIsValid ? styles.ativo : ""
          }`}
        >
          Prosseguir
        </button>
      </div>
      </div>
    </section>
  );
}

export default PassoUm;


