import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import Stepper from "../layout/Stepper";
import styles from "./PassoDois.module.css";
import debounce from "lodash.debounce";
import { PiAirplaneInFlight } from "react-icons/pi";
import Mileage from "../ultilitario/Mileage";

function PassoDois() {
  const [milhasInput, setMilhasInput] = useState("");
  const [valorMilheiroInput, setValorMilheiroInput] = useState("");
  const [valorMilheiro, setValorMilheiro] = useState(null);
  const [ranking, setRanking] = useState([]);
  const [selected, setSelected] = useState("Imediato");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  // === FORMATAÇÕES ===
  // Formata milhas (com separador de milhar)
  const formatMilhas = (value) => {
    const numeric = value.replace(/\D/g, "");
    return numeric ? parseInt(numeric).toLocaleString("pt-BR") : "";
  };

  const handleMilhasChange = (e) => {
    setMilhasInput(formatMilhas(e.target.value));
  };

  // Formata moeda (R$)
  const formatCurrency = (value) => {
    if (value === null || value === "") return "";
    return Number(value).toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
      minimumFractionDigits: 2,
    });
  };

  // Atualiza campo e valor do milheiro
  const handleValorMilheiroChange = (e) => {
    const raw = e.target.value.replace(/\D/g, ""); // mantém apenas números
    const number = parseFloat(raw) / 100; // transforma 1650 em 16.50
    setValorMilheiroInput(number ? formatCurrency(number) : "");
    setValorMilheiro(number); // valor numérico limpo
  };

  // === FETCH DE RANKING ===
  const fetchRanking = useCallback(
    debounce(async (valor) => {
      try {
        if (!valor || isNaN(Number(valor))) return;
        setLoading(true);

        const url = `https://api.milhaspix.com/simulate-ranking?mile_value=${valor}`;
        console.log("🔹 Chamando API:", url);

        const res = await fetch(url);
        const data = await res.json();

        console.log("🔹 Retorno da API:", data);

        // Caso o retorno seja { ranking: [...] }
        setRanking(Array.isArray(data) ? data : data.ranking || []);
      } catch (err) {
        console.error("Erro ao buscar ranking:", err);
        setRanking([]);
      } finally {
        setLoading(false);
      }
    }, 500),
    []
  );

  // Atualiza ranking sempre que o valor mudar
  useEffect(() => {
    if (valorMilheiro && !isNaN(valorMilheiro)) {
      const valorFormatado = valorMilheiro
        .toFixed(2)
        .toString()
        .replace(",", "."); // garante ponto decimal
      fetchRanking(valorFormatado);
    }
  }, [valorMilheiro, fetchRanking]);

  // === NAVEGAÇÃO ===
  const handleProsseguir = () => {
    if (valorMilheiro && milhasInput) {
      navigate("/passotres");
    }
  };

  const camposValidos = milhasInput && valorMilheiro && !isNaN(valorMilheiro);

  return (
    <section className={styles.tiles}>
      <Stepper currentStep={1} />

      {/* CONTAINER PRINCIPAL */}
      <div className={styles.container}>
        {/* Título */}
        <div className={styles.container_titulo}>
          <p>
            <span>02. </span> Oferte suas milhas
          </p>
          <div className={styles.badge}>
            <p className={styles.p}>
              Escolha entre <span className={styles.span}>R$ 14,00</span> e{" "}
              <span className={styles.span}>R$ 16,56</span> milheiro
            </p>
          </div>
        </div>

        {/* Seção de recebimento */}
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

        {/* Campos de entrada */}
        <div className={styles.container_campos}>
          {/* Milhas ofertadas */}
          <div className={styles.campo}>
            <label htmlFor="milhasOfertadas">Milhas ofertadas</label>
            <div className={styles.inputWrapper}>
              <input
                type="text"
                id="milhasOfertadas"
                value={milhasInput}
                onChange={handleMilhasChange}
                className={styles.input}
                placeholder="10.000"
              />
              <PiAirplaneInFlight className={styles.inputIcon} />
            </div>
          </div>

          {/* Valor do milheiro */}
          <div className={styles.campo}>
            <label htmlFor="valorMilheiro">Valor por milheiro</label>
            <div className={styles.inputWrapper}>
              <input
                type="text"
                id="valorMilheiro"
                value={valorMilheiroInput}
                onChange={handleValorMilheiroChange}
                className={styles.input}
                placeholder="R$ 0,00"
              />
            </div>
          </div>
        </div>

        {/* Mileage opcional */}
        <div className={styles.mileage_container}>
          <Mileage />
        </div>

        {/* Loader */}
        {loading && (
          <div style={{ paddingLeft: "16px", color: "#666" }}>
            Buscando ranking...
          </div>
        )}

        {/* Botão Prosseguir */}
        
      </div>

      {/* === RANKING LATERAL === */}
      <div className={styles.rankingContainer}>
        <label>Ranking das ofertas</label>
        <ul className={styles.rankingList}>
          {Array.isArray(ranking) && ranking.length > 0 ? (
            ranking.map((item) => (
              <li
                key={item.position}
                className={`${styles.rankingItem} ${
                  item.description?.includes("sua posição")
                    ? styles.userOffer
                    : ""
                }`}
              >
                <span className={styles.rankPosition}>{item.position}º</span>
                <span className={styles.rankValue}>
                  {formatCurrency(item.mile_value)}
                </span>
                {item.description?.includes("sua posição") && (
                  <span className={styles.userTag}>Você</span>
                )}
              </li>
            ))
          ) : loading ? (
            <p style={{ padding: "1rem" }}>Carregando ranking...</p>
          ) : (
            <p style={{ padding: "1rem" }}>Nenhum dado disponível.</p>
          )}
        </ul>
      </div>
    </section>
  );
}

export default PassoDois;



