'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { COMO_FUNCIONA } from '@/app/embajadores-fluxa/vendedores-config';
import colombiaVibrant from '@/components/colombia/colombiaVibrant.module.css';
import VendedoresSection from './VendedoresSection';
import styles from './ComoFunciona.module.css';

const cardVariant = {
  hidden: { opacity: 0, y: 20 },
  show: (i) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] },
  }),
};

export default function ComoFunciona() {
  const reduceMotion = useReducedMotion();
  const { moneyFlow, highlightedRule, yourRoleTitle, yourRoleSteps, title, subtitle } =
    COMO_FUNCIONA;

  return (
    <VendedoresSection className={styles.section} id="como-funciona">
      <div className={styles.container}>
        <h2 className={`${styles.h2} ${colombiaVibrant.headlineSm}`}>{title}</h2>
        <p className={styles.sub}>{subtitle}</p>

        <div className={styles.flowGrid}>
          {moneyFlow.map((step, i) => (
            <motion.article
              key={step.step}
              className={`${styles.flowCard} ${colombiaVibrant.glowCard}`}
              custom={i}
              variants={reduceMotion ? undefined : cardVariant}
              initial={reduceMotion ? false : 'hidden'}
              whileInView={reduceMotion ? false : 'show'}
              viewport={{ once: true, amount: 0.2 }}
            >
              <span className={styles.stepNum}>{step.step}</span>
              <h3>{step.title}</h3>
              <p>{step.text}</p>
            </motion.article>
          ))}
        </div>

        <blockquote className={styles.ruleBlock}>
          <p>{highlightedRule}</p>
        </blockquote>

        <h3 className={styles.roleTitle}>{yourRoleTitle}</h3>
        <ol className={styles.roleList}>
          {yourRoleSteps.map((text, i) => (
            <li key={i}>
              <span className={styles.roleIndex}>{i + 1}</span>
              <span>{text}</span>
            </li>
          ))}
        </ol>
      </div>
    </VendedoresSection>
  );
}
