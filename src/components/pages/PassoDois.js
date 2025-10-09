import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import Stepper from "../layout/Stepper";
import styles from "./PassoDois.module.css";
import debounce from "lodash.debounce";
import { PiAirplaneInFlight, PiCurrencyDollar } from "react-icons/pi";
import Mileage from "../ultilitario/Mileage";
import Button from "../layout/Button";
import ButtonVoltar from "../layout/ButtonVoltar";

function PassoDois() {
  const [milhasInput, setMilhasInput] = useState("");
  const [valorEmReais, setValorEmReais] = useState("");
  const [valorMilheiro, setValorMilheiro] = useState(null);
  const [ranking, setRanking] = useState([]);
  const [selected, setSelected] = useState("Imediato");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  // === FORMATADORES ===
  const formatMilhas = (value) => {
    const numeric = value.replace(/\D/g, "");
    return numeric ? parseInt(numeric).toLocaleString("pt-BR") : "";
  };

  const handleMilhasChange = (e) => {
    const valorDigitado = e.target.value.replace(/\D/g, "");
    setMilhasInput(formatMilhas(valorDigitado));

    const valorPorMilheiro = 16.0;
    const milhas = parseInt(valorDigitado || 0, 10);
    const total = (milhas / 1000) * valorPorMilheiro;

    if (total > 0) {
      const formatted = total.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL",
        minimumFractionDigits: 2,
      });
      setValorEmReais(formatted);
      setValorMilheiro(total);
    } else {
      setValorEmReais("");
      setValorMilheiro(null);
    }
  };

  // === FETCH DE RANKING ===
  const fetchRanking = useCallback(
    debounce(async (valor) => {
      try {
        if (!valor || isNaN(Number(valor))) return;
        setLoading(true);

        // ✅ Chamada via rota serverless
        const res = await fetch(`/api/ranking?mile_value=${valor}`);
        if (!res.ok) throw new Error(`Erro HTTP ${res.status}`);
        const data = await res.json();

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

  useEffect(() => {
    if (valorMilheiro && !isNaN(valorMilheiro)) {
      const valorFormatado = valorMilheiro.toFixed(2).replace(",", ".");
      fetchRanking(valorFormatado);
    }
  }, [valorMilheiro, fetchRanking]);

  const handleProsseguir = () => {
    if (valorMilheiro && milhasInput) {
      navigate("/passotres");
    }
  };

  return (
    <section className={styles.tiles}>
      <Stepper currentStep={1} />

      <div className={styles.container}>
        <div className={styles.container_titulo}>
          <p className={styles.titulo}>
            <span className={styles.span_titulo}>02. </span> Cadastro da oferta
          </p>
          <div className={`${styles.badge} ${styles.badgeDesktop}`}>
            <p className={styles.p}>
              Escolha entre <span className={styles.span}>R$ 14,00</span> e{" "}
              <span className={styles.span}>R$ 16,56</span> por milheiro
            </p>
          </div>
        </div>

        <div className={`${styles.badge} ${styles.badgeMobile}`}>
          <p className={styles.p}>
            Escolha entre <span className={styles.span}>R$ 14,00</span> e{" "}
            <span className={styles.span}>R$ 16,56</span> por milheiro
          </p>
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

        <div className={styles.container_campos}>
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

          <div className={styles.campo}>
            <label>Valor em R$</label>
            <div className={styles.valorDisplay}>
              <PiCurrencyDollar className={styles.iconValor} />
              <span className={styles.valorTexto}>
                {valorEmReais || "R$ 0,00"}
              </span>
            </div>
          </div>
        </div>

        <div className={styles.mileage_container}>
          <Mileage
            onRankingChange={setRanking}
            onLoadingChange={setLoading}
          />
        </div>

        {loading && (
          <div style={{ paddingLeft: "16px", color: "#666" }}>
            Buscando ranking...
          </div>
        )}
      
      </div>

        <div className={styles.botao_container}>
        <ButtonVoltar texto="Voltar" to="/passoum" />
        <Button texto="Prosseguir" to="/passotres" onValidar={handleProsseguir} />
      </div>

      <div className={styles.rankingContainer}>
        <div className={styles.ranking_titulo}>
          <h3>Média de milhas</h3>
          <p>
            Ao vender mais de 20.000 milhas, ative as Opções Avançadas para
            definir a média de milhas por emissão.
          </p>
        </div>

        <div className={styles.rankingList}>
          <label>Ranking das ofertas</label>
          <ul className={styles.rankingList}>
            {Array.isArray(ranking) && ranking.length > 0 ? (
              ranking.map((item) => {
                const isUserPosition = item.description?.includes("sua posição");
                return (
                  <li
                    key={item.position}
                    className={`${styles.rankingItem} ${
                      isUserPosition ? styles.userOffer : ""
                    }`}
                  >
                    <span
                      className={`${styles.rankPosition} ${
                        isUserPosition ? styles.userRankPosition : ""
                      }`}
                    >
                      {item.position}º
                    </span>

                    <span className={styles.rankValue}>
                      {item.mile_value.toLocaleString("pt-BR", {
                        style: "currency",
                        currency: "BRL",
                      })}
                    </span>

                    {isUserPosition && (
                      <span className={styles.userTag}>Você</span>
                    )}
                  </li>
                );
              })
            ) : loading ? (
              <p style={{ padding: "1rem" }}>Carregando ranking...</p>
            ) : (
              <p style={{ padding: "1rem" }}>Nenhum dado disponível.</p>
            )}
          </ul>
        </div>
      </div>
    </section>
  );
}

export default PassoDois;
