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

  const navigate = useNavigate();

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

  const handleSelecionarPrograma = (id) => {
    setPrograma(id);
    localStorage.setItem("programaSelecionado", id); // 🔹 salva escolha
  };

  const handleProsseguir = () => {
    if (programa && cpfIsValid) {
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
                <img src={p.logo} alt={p.nome} className={`${styles.companyLogo} ${styles[p.id]}`} />
              </button>
            ))}
          </div>
        </div>

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
            <label htmlFor="cpf">CPF</label>
            <div className={styles.inputWrapper}>
              <input
                id="cpf"
                type="text"
                className={styles.input}
                placeholder="Ilimitado"
                value={cpfFormatted}
                onChange={handleCpfChange}
                onBlur={() => setCpfTouched(true)}
                inputMode="numeric"
                autoComplete="off"
              />
              <FaLock className={styles.inputIcon} />
            </div>

            {cpfTouched && cpfRaw.length > 0 && !cpfIsValid && (
              <p className={styles.erro}>CPF inválido</p>
            )}
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
