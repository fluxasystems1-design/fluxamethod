'use client';

import { CTA_FINAL } from '@/app/embajadores-fluxa/vendedores-config';
import colombiaVibrant from '@/components/colombia/colombiaVibrant.module.css';
import VendedoresSection from './VendedoresSection';
import styles from './CtaFinal.module.css';

export default function CtaFinal() {
  const { title, subtitle, ctaLabel, ctaHref, secondaryText } = CTA_FINAL;

  return (
    <VendedoresSection className={styles.section} id="cta-final">
      <div className={styles.container}>
        <h2 className={`${styles.title} ${colombiaVibrant.headlineSm}`}>{title}</h2>
        <p className={styles.sub}>{subtitle}</p>
        <a
          href={ctaHref}
          className={styles.btn}
          target="_blank"
          rel="noopener noreferrer"
        >
          {ctaLabel}
        </a>
        <p className={styles.secondary}>{secondaryText}</p>
      </div>
    </VendedoresSection>
  );
}
