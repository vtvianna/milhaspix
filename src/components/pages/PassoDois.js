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

  // FORMATADOR DE MILHAS
  const formatMilhas = (value) => {
    const numeric = value.replace(/\D/g, "");
    return numeric ? parseInt(numeric).toLocaleString("pt-BR") : "";
  };

  // FUNÇÃO DE BUSCA DO RANKING
  const fetchRanking = useCallback(
    debounce(async (valor) => {
      try {
        setLoading(true);
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

  // RANKING INICIAL (base 16,5)
  useEffect(() => {
    const valorInicial = 16.5;
    fetchRanking(valorInicial.toFixed(2));
  }, [fetchRanking]);

  // ATUALIZAÇÃO PELO CAMPO DE MILHAS
  const handleMilhasChange = (e) => {
    const valorDigitado = e.target.value.replace(/\D/g, "");
    setMilhasInput(formatMilhas(valorDigitado));

    const valorPorMilheiro = 25.0; // 🔹 cálculo interno
    const milhas = parseInt(valorDigitado || 0, 10);
    const total = (milhas / 10000) * valorPorMilheiro;

    if (total > 0) {
      const formatted = total.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL",
        minimumFractionDigits: 2,
      });
      setValorEmReais(formatted);
      setValorMilheiro(total);

      // Atualiza ranking conforme o valor digitado
      const valorFormatado = total.toFixed(2).replace(",", ".");
      fetchRanking(valorFormatado);
    } else {
      setValorEmReais("");
      setValorMilheiro(null);
      fetchRanking(16.5); // 🔹 volta para o ranking base de 16,5
    }
  };

  const handleProsseguir = () => {
    if (valorMilheiro && milhasInput) {
      navigate("/passotres");
    }
  };

  return (
    <section className={styles.tiles}>
      <Stepper currentStep={1} />

      <div className={styles.container}>
        {/*  TÍTULO  */}
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

        {/* OPÇÕES DE RECEBIMENTO */}
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

        {/* CAMPOS */}
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
                placeholder=""
              />
              <PiAirplaneInFlight className={styles.inputIcon} />
            </div>
          </div>

          <div className={styles.campo}>
            <label>Valor a cada 10.000 milhas</label>
            <div className={styles.valorDisplay}>
              <PiCurrencyDollar className={styles.iconValor} />
              <span className={styles.valorTexto}>
                {valorEmReais || "R$ 25,00"}
              </span>
            </div>
          </div>
        </div>

        {/* SEÇÃO DE MÉDIA DE MILHAS (VISUAL) */}
        <div className={styles.mileage_container}>
          <Mileage /> {/* não interfere mais no ranking */}
        </div>
      </div>

      {/* BOTÕES */}
      <div className={styles.botao_container}>
        <ButtonVoltar texto="Voltar" to="/passoum" />
        <Button
          texto="Prosseguir"
          to="/passotres"
          onValidar={handleProsseguir}
        />
      </div>

      {/* RANKING */}
      <div className={styles.rankingContainer}>
        <div className={styles.ranking_titulo}>
          <h3>Milhas ofertadas</h3>
          <p>
            Ao vender mais de 20.000 milhas, ative as Opções Avançadas para
            definir a média de milhas por emissão.
          </p>
        </div>


           
        <div className={styles.rankingList}>
          <label className={styles.label_ranking}>Ranking das ofertas</label>
          
          <ul className={styles.rankingContainerL}>
            {Array.isArray(ranking) && ranking.length > 0 ? (
              ranking.map((item) => {
                const isUserPosition =
                  item.description?.includes("sua posição");
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
