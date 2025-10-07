import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaPlus, FaSearch } from "react-icons/fa";
import styles from "./ListaOfertas.module.css";

import tapLogo from "../../img/airportugal.png";
import latamLogo from "../../img/latam.png";
import smilesLogo from "../../img/smiles.png";
import azulLogo from "../../img/tudoazul.png";

function ListaOfertas() {
  const [ofertas, setOfertas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [campoFiltro, setCampoFiltro] = useState("todos");
  const [valorFiltro, setValorFiltro] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchOfertas = async () => {
      try {
        setLoading(true);

        // ✅ Chamada para sua rota Serverless da Vercel
        const response = await fetch("/api/offers");

        if (!response.ok) throw new Error(`Erro HTTP ${response.status}`);

        const data = await response.json();
        console.log("✅ Ofertas recebidas:", data);

        setOfertas(data.offers || []);
      } catch (error) {
        console.error("❌ Erro ao buscar ofertas:", error);
        setOfertas([]);
      } finally {
        setLoading(false);
      }
    };

    fetchOfertas();
  }, []);

  // 🔹 Mapeia o logo do programa
  const getLogo = (programa) => {
    if (!programa) return null;
    switch (programa.toLowerCase()) {
      case "tap":
      case "tap miles&go":
        return tapLogo;
      case "latam":
      case "latam pass":
        return latamLogo;
      case "smiles":
        return smilesLogo;
      case "tudoazul":
        return azulLogo;
      default:
        return null;
    }
  };

  // 🔹 Define classe de cor do status
  const getStatusClass = (status) => {
    if (!status) return "";
    const s = status.toLowerCase();
    if (s.includes("ativa")) return styles.statusAtiva;
    if (s.includes("utilização")) return styles.statusUtilizacao;
    return styles.statusPadrao;
  };

  // 🔹 Filtro dinâmico
  const ofertasFiltradas = ofertas.filter((oferta) => {
    if (!valorFiltro) return true;
    const termo = valorFiltro.toLowerCase();

    const dataFormatada = new Date(oferta.createdAt).toLocaleString("pt-BR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });

    switch (campoFiltro) {
      case "programa":
        return oferta.loyaltyProgram?.toLowerCase().includes(termo);
      case "id":
        return String(oferta.offerId).includes(termo);
      case "status":
        return oferta.offerStatus?.toLowerCase().includes(termo);
      case "tipo":
        return oferta.offerType?.toLowerCase().includes(termo);
      case "login":
        return oferta.accountLogin?.toLowerCase().includes(termo);
      case "milhas":
        return String(oferta.availableQuantity).includes(termo);
      case "data":
        return dataFormatada.includes(termo);
      default:
        return true;
    }
  });

  return (
    <section className={styles.tiles}>
      {/* 🔹 Cabeçalho da página */}
      <div className={styles.topo}>
        <h1>Minhas Ofertas</h1>
        <button className={styles.btnNova} onClick={() => navigate("/")}>
          <FaPlus color="white" style={{ marginRight: "8px" }} />
          Nova Oferta
        </button>
      </div>

      {/* 🔹 Container principal */}
      <div className={styles.container}>
        {/* 🔹 Linha superior com título e filtros */}
        <div className={styles.linhaSuperior}>
          <span className={styles.tituloEsquerda}>Todas as ofertas</span>

          <div className={styles.filtroGlobal}>
            <div className={styles.inputWrapper}>
              <input
                type="text"
                placeholder="Login de acesso, ID da oferta..."
                className={styles.inputGlobal}
                value={valorFiltro}
                onChange={(e) => setValorFiltro(e.target.value)}
              />
              <FaSearch className={styles.iconSearch} />
            </div>

            <select
              className={styles.selectFiltro}
              value={campoFiltro}
              onChange={(e) => setCampoFiltro(e.target.value)}
            >
              <option value="todos">Todos os Campos</option>
              <option value="programa">Programa</option>
              <option value="id">ID da Oferta</option>
              <option value="status">Status</option>
              <option value="tipo">Tipo</option>
              <option value="login">Login da Conta</option>
              <option value="milhas">Qtd. Disponível</option>
              <option value="data">Data</option>
            </select>
          </div>
        </div>

        {/* 🔹 Lista de ofertas */}
        {loading ? (
          <p>Carregando ofertas...</p>
        ) : ofertasFiltradas.length > 0 ? (
          <table className={styles.tabela}>
            <thead>
              <tr>
                <th>Programa</th>
                <th>Status</th>
                <th>ID da Oferta</th>
                <th>Login</th>
                <th>Milhas</th>
              </tr>
            </thead>
            <tbody>
              {ofertasFiltradas.map((oferta) => (
                <tr key={oferta.offerId}>
                  <td className={styles.programaCell}>
                    {getLogo(oferta.loyaltyProgram) && (
                      <img
                        src={getLogo(oferta.loyaltyProgram)}
                        alt={oferta.loyaltyProgram}
                        className={styles.logoPrograma}
                      />
                    )}
                    <div className={styles.programaInfo}>
                      <span className={styles.programaNome}>
                        {oferta.loyaltyProgram}
                      </span>
                      <span className={styles.programaTipo}>
                        {oferta.offerType || "Liminar"}
                      </span>
                    </div>
                  </td>

                  <td>
                    <span
                      className={`${styles.statusBadge} ${getStatusClass(
                        oferta.offerStatus
                      )}`}
                    >
                      <span className={styles.statusDot}></span>
                      {oferta.offerStatus}
                    </span>
                  </td>

                  <td>{oferta.offerId}</td>
                  <td>{oferta.accountLogin}</td>
                  <td>{oferta.availableQuantity?.toLocaleString("pt-BR")}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>Nenhuma oferta encontrada.</p>
        )}
      </div>
    </section>
  );
}

export default ListaOfertas;





