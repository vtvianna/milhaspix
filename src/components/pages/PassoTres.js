import Stepper from "../layout/Stepper";
import styles from "./PassoTres.module.css";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import {
  FaRegUserCircle,
  FaLock,
  FaWhatsapp,
  FaEnvelope,
} from "react-icons/fa";
import Button from "../layout/Button";
import ButtonVoltar from "../layout/ButtonVoltar";

import latam from "../../img/latam.png";
import airportugal from "../../img/airportugal.png";
import smiles from "../../img/smiles.png";
import tudoazul from "../../img/tudoazul.png";

// Formatadores e validadores
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

function isValidEmail(email) {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email.toLowerCase());
}

function PassoTres() {
  const [cpfRaw, setCpfRaw] = useState("");
  const [cpfTouched, setCpfTouched] = useState(false);

  const [login, setLogin] = useState("");
  const [senha, setSenha] = useState("");
  const [telefone, setTelefone] = useState("");

  const [companhiaSelecionada, setCompanhiaSelecionada] = useState(null);

  const navigate = useNavigate();

  const logos = { latam, air: airportugal, smiles, azul: tudoazul };

  useEffect(() => {
    const selecionada = localStorage.getItem("programaSelecionado");
    if (selecionada) setCompanhiaSelecionada(selecionada);
  }, []);

  const cpfFormatted = formatCpf(cpfRaw);
  const telefoneFormatted = formatTelefone(telefone);

  const cpfIsValid = cpfRaw.length === 11 && isValidCpf(cpfRaw);
  const loginIsValid = isValidEmail(login);
  const senhaIsValid = senha.length >= 6;
  const telefoneIsValid = isValidTelefone(telefone);

  const handleCpfChange = (e) => {
    const digits = e.target.value.replace(/\D/g, "").slice(0, 11);
    setCpfRaw(digits);
  };

  // Função usada para validar antes de prosseguir
  const handleProsseguir = () => {
    setCpfTouched(true); // força mostrar erro do CPF se inválido

    // Podemos adicionar lógica para mostrar outras mensagens também se quiser

    return cpfIsValid && loginIsValid && senhaIsValid && telefoneIsValid;
  };

  return (
    <section className={styles.tiles}>
      <Stepper currentStep={2} />

      <div className={styles.mainContent}>
        <div className={styles.container}>
          <div className={styles.container_titulo}>
            <div className={styles.titulo}>
              <span className={styles.span_titulo}>03. </span> Informações da
              conta
            </div>
            {companhiaSelecionada && (
              <img
                src={logos[companhiaSelecionada]}
                alt={companhiaSelecionada}
                className={styles.logoCompanhia}
              />
            )}
          </div>

          {/* Campos */}
          <div className={styles.container_campos}>
            <div className={styles.campo}>
              <label htmlFor="cpf">CPF</label>
              <div className={styles.inputWrapper}>
                <input
                  id="cpf"
                  type="text"
                  className={styles.input}
                  placeholder="000.000.000-00"
                  value={cpfFormatted}
                  onChange={handleCpfChange}
                  onBlur={() => setCpfTouched(true)}
                  inputMode="numeric"
                  required
                />
                <FaRegUserCircle className={styles.iconInput} />
              </div>
              {cpfTouched && cpfRaw.length > 0 && !cpfIsValid && (
                <p className={styles.erro}>CPF inválido</p>
              )}
            </div>

            <div className={styles.campo}>
              <label htmlFor="login">E-mail de acesso</label>
              <div className={styles.inputWrapper}>
                <input
                  id="login"
                  type="email"
                  className={styles.input}
                  placeholder="exemplo@email.com"
                  value={login}
                  onChange={(e) => setLogin(e.target.value)}
                  required
                />
                <FaEnvelope className={styles.iconInput} />
              </div>
              {login.length > 0 && !loginIsValid && (
                <p className={styles.erro}>Digite um e-mail válido</p>
              )}
            </div>
          </div>

          <div className={styles.container_campos}>
            <div className={styles.campo}>
              <label htmlFor="senha">Senha de acesso</label>
              <div className={styles.inputWrapper}>
                <input
                  id="senha"
                  type="password"
                  className={styles.input}
                  placeholder="Digite sua senha"
                  value={senha}
                  onChange={(e) => setSenha(e.target.value)}
                  required
                />
                <FaLock className={styles.iconInput} />
              </div>
              {senha.length > 0 && !senhaIsValid && (
                <p className={styles.erro}>
                  A senha deve ter pelo menos 6 caracteres
                </p>
              )}
            </div>

            <div className={styles.campo}>
              <label htmlFor="telefone">Telefone</label>
              <div className={styles.inputWrapper}>
                <span className={styles.prefixoDentro}>
                  <img
                    src="https://flagcdn.com/w20/br.png"
                    alt="BR"
                    className={styles.bandeira}
                  />
                  +55
                </span>
                <input
                  id="telefone"
                  type="tel"
                  className={styles.input}
                  placeholder="(99) 99999-9999"
                  value={telefoneFormatted}
                  onChange={(e) => setTelefone(e.target.value)}
                  required
                />
                <FaWhatsapp
                  className={`${styles.iconInput} ${styles.iconWhats}`}
                />
              </div>
              {telefone.length > 0 && !telefoneIsValid && (
                <p className={styles.erro}>Telefone inválido</p>
              )}
            </div>
          </div>

          {/* Botões de navegação */}
         
<div className={styles.botao_container}>
  <ButtonVoltar texto="Voltar" to="/passodois" />

  {/* Texto entre os botões */}
  <p className={styles.termosTexto}>
    Ao prosseguir você concorda com os termos de uso
  </p>

  <Button
    texto="Concluir"
    to="/passoquatro"
    onValidar={handleProsseguir}
  />
</div>
        </div>

        <div className={styles.infoCard}>
          <p>
            Aqui você deve informar os dados da sua conta no programa de
            milhagem.
            <br />
            <strong>Use apenas contas em seu nome.</strong>
          </p>
        </div>
      </div>
    </section>
  );
}

export default PassoTres;
