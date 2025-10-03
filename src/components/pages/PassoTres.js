import Stepper from "../layout/Stepper";
import styles from "./PassoTres.module.css";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

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

// Funções de Formatação e Validação
function formatTelefone(value) {
  const digits = value.replace(/\D/g, "").slice(0, 11);
  return digits
    .replace(/^(\d{2})(\d)/, "($1) $2")
    .replace(/(\d{5})(\d)/, "$1-$2");
}

function isValidTelefone(telefone) {
  const cleanTelefone = telefone.replace(/\D/g, "");
  return cleanTelefone.length === 11;
}

function PassoTres() {
  const [programa, setPrograma] = useState(null);

  // CPF
  const [cpfRaw, setCpfRaw] = useState("");
  const [cpfTouched, setCpfTouched] = useState(false);
  const handleCpfChange = (e) => {
    const digits = e.target.value.replace(/\D/g, "").slice(0, 11);
    setCpfRaw(digits);
  };
  const cpfFormatted = formatCpf(cpfRaw);
  const cpfIsValid = cpfRaw.length === 11 && isValidCpf(cpfRaw);

  // Novos campos
  const [login, setLogin] = useState("");
  const [senha, setSenha] = useState("");
  const [telefone, setTelefone] = useState("");

  const navigate = useNavigate();

  const handleProsseguir = () => {
    if (programa && cpfIsValid && login && senha && telefone) {
      navigate("/passodois");
    }
  };

  // Validações de login e senha
  const loginIsValid = login.length > 0;
  const senhaIsValid = senha.length >= 6; // Exemplo de mínimo de 6 caracteres

  // Formatação de telefone
  const telefoneFormatted = formatTelefone(telefone);
  const telefoneIsValid = isValidTelefone(telefone);

  return (
    <section className={styles.tiles}>
      <Stepper currentStep={2} />

      <div className={styles.container}>
        <div className={styles.container_titulo}>
          Insira os dados do programa de Fidelidade
        </div>

        {/* Campos lado a lado */}
        <div className={styles.container_campos}>
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

          {/* Campo Login */}
          <div className={styles.campo}>
            <label htmlFor="login">Login de acesso</label>
            <input
              id="login"
              type="text"
              className={styles.input}
              placeholder="Digite seu login"
              value={login}
              onChange={(e) => setLogin(e.target.value)}
              autoComplete="off"
            />
            {!loginIsValid && <p className={styles.erro}>Login inválido</p>}
          </div>
        </div>

        <div className={styles.container_campos}>
          {/* Campo Senha */}
          <div className={styles.campo}>
            <label htmlFor="senha">Senha de acesso</label>
            <input
              id="senha"
              type="password"
              className={styles.input}
              placeholder="Digite sua senha"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              autoComplete="off"
            />
            {senha.length > 0 && senha.length < 6 && (
              <p className={styles.erro}>Senha deve ter no mínimo 6 caracteres</p>
            )}
          </div>

          {/* Campo Telefone */}
          <div className={styles.campo}>
            <label htmlFor="telefone">Telefone para autenticação</label>
            <input
              id="telefone"
              type="tel"
              className={styles.input}
              placeholder="(99) 99999-9999"
              value={telefoneFormatted}
              onChange={(e) => setTelefone(e.target.value)}
              autoComplete="off"
            />
            {telefone.length > 0 && !telefoneIsValid && (
              <p className={styles.erro}>Telefone inválido</p>
            )}
          </div>
        </div>
      </div>

      <div className={styles.botao_container}>
        <button
          disabled={!programa || !cpfIsValid || !loginIsValid || !senhaIsValid || !telefoneIsValid}
          onClick={handleProsseguir}
          className={`${styles.prosseguirBtn} ${
            programa && cpfIsValid && loginIsValid && senhaIsValid && telefoneIsValid
              ? styles.ativo
              : ""
          }`}
        >
          Prosseguir
        </button>
      </div>
    </section>
  );
}

export default PassoTres;

