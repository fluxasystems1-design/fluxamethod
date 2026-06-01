'use client';

import { OPERACION } from '@/app/embajadores-fluxa/vendedores-config';
import colombiaVibrant from '@/components/colombia/colombiaVibrant.module.css';
import VendedoresSection from './VendedoresSection';
import styles from './OperacionAliados.module.css';

export default function OperacionAliados() {
  const { title, subtitle, brief, checklistTitle, checklist, support } = OPERACION;

  return (
    <VendedoresSection className={styles.section} id="operacion">
      <div className={styles.container}>
        <h2 className={`${styles.h2} ${colombiaVibrant.headlineSm}`}>{title}</h2>
        <p className={styles.sub}>{subtitle}</p>

        <article className={`${styles.briefCard} ${colombiaVibrant.glowCard}`}>
          <h3>{brief.title}</h3>
          <p>{brief.description}</p>
          <a
            href={brief.ctaHref}
            className={styles.btnPrimary}
            target="_blank"
            rel="noopener noreferrer"
          >
            {brief.ctaLabel}
          </a>
        </article>

        <div className={`${styles.panel} ${colombiaVibrant.glowPanel}`}>
          <h3>{checklistTitle}</h3>
          <ul>
            {checklist.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>

        <article className={`${styles.supportCard} ${colombiaVibrant.glowCard}`}>
          <h3>{support.title}</h3>
          <p>{support.text}</p>
          <a
            href={support.href}
            className={styles.btnGhost}
            target="_blank"
            rel="noopener noreferrer"
          >
            {support.cta}
          </a>
        </article>
      </div>
    </VendedoresSection>
  );
}
