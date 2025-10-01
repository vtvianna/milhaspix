import React from 'react';
import { FaRegCircle, FaDotCircle } from 'react-icons/fa';
import styles from './Stepper.module.css';

const steps = [
  { title: 'Passo 1', subtitle: 'Escolha o programa' },
  { title: 'Passo 2', subtitle: 'Oferte suas milhas' },
  { title: 'Passo 3', subtitle: 'Insira os dados do programa' },
  { title: 'Passo 4', subtitle: 'Pedido finalizado' },
];

const Stepper = ({ currentStep }) => {
  return (
    <div className={styles.stepperContainer}>
      {steps.map((step, index) => {
        const isActive = index === currentStep;

        return (
          <div className={styles.stepItem} key={index}>
            <div className={styles.stepIcon}>
              {isActive ? (
                <FaDotCircle className={styles.iconActive} />
              ) : (
                <FaRegCircle className={styles.iconInactive} />
              )}
              {index < steps.length - 1 && <div className={styles.verticalLine} />}
            </div>
            <div className={`${styles.stepContent} ${isActive ? styles.active : ''}`}>
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
