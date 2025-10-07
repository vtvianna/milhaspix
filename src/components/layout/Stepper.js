import React from "react";
import styles from "./Stepper.module.css";

const steps = [
  { title: "Passo 1", subtitle: "Escolha a companhia aérea" },
  { title: "Passo 2", subtitle: "Oferte suas milhas" },
  { title: "Passo 3", subtitle: "Insira os dados do programa" },
  { title: "Passo 4", subtitle: "Pedido finalizado" },
];

const Stepper = ({ currentStep = 0 }) => {
  return (
    <div className={styles.stepperContainer}>
      {steps.map((step, index) => {
        const isActive = index === currentStep;
        const isCompleted = index < currentStep;
        const isLast = index === steps.length - 1;

        // linhas: top deve estar ativa quando o segmento acima está concluído
        const topLineActive = index !== 0 && index <= currentStep;
        // bottom ativa quando o passo atual já estiver concluído
        const bottomLineActive = !isLast && index < currentStep;

        return (
          <div
            key={index}
            className={`${styles.stepItem} ${isActive ? styles.activeStepItem : ""}`}
          >
            <div className={styles.stepIconWrapper}>
              {/* linha de cima (conecta ao passo anterior) */}
              {index !== 0 && (
                <div
                  className={`${styles.line} ${styles.lineTop} ${topLineActive ? styles.lineActive : ""}`}
                />
              )}

              {/* círculo */}
              <div
                className={`${styles.stepCircle} ${
                  isActive ? styles.activeCircle : isCompleted ? styles.completedCircle : styles.inactiveCircle
                }`}
              >
                {(isActive || isCompleted) && (
                  <div className={isCompleted ? styles.innerDotCompleted : styles.innerDotActive} />
                )}
              </div>

              {/* linha de baixo (conecta ao próximo passo) */}
              {!isLast && (
                <div
                  className={`${styles.line} ${styles.lineBottom} ${bottomLineActive ? styles.lineActive : ""}`}
                />
              )}
            </div>

            <div
              className={`${styles.stepContent} ${
                isActive ? styles.activeText : isCompleted ? styles.completedText : styles.inactiveText
              }`}
            >
              <div className={styles.stepTitle}>{step.title}</div>
              <div className={styles.stepSubtitle}>{step.subtitle}</div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Stepper;
