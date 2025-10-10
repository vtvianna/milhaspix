import { useNavigate } from "react-router-dom";
import styles from "./PassoQuatro.module.css";
import Stepper from "../layout/Stepper";
import concluidoImg from "../../img/concluido.png";

function PassoQuatro() {
  const navigate = useNavigate();

  return (
    <section className={styles.pageWrapper}>
      <div className={styles.colunaStepper}>
        <Stepper currentStep={3} />
      </div>

      <div className={styles.container}>
        <div className={styles.icone}>
          <img
            src={concluidoImg}
            alt="Concluído"
            className={styles.imgConcluido}
          />
        </div>

        <h2 className={styles.titulo}>Ordem de venda criada com sucesso!</h2>

        <p className={styles.descricao}>
          Agora é só aguardar — assim que suas milhas forem vendidas, o valor
          será transferido direto para sua conta via Pix.
        </p>

        <button
          className={styles.botao}
          onClick={() => navigate("/listaofertas")}
        >
          Ver minhas ofertas
        </button>
      </div>
    </section>
  );
}

export default PassoQuatro;
