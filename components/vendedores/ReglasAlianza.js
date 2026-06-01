'use client';

import { REGLAS } from '@/app/embajadores-fluxa/vendedores-config';
import colombiaVibrant from '@/components/colombia/colombiaVibrant.module.css';
import VendedoresSection from './VendedoresSection';
import styles from './ReglasAlianza.module.css';

export default function ReglasAlianza() {
  const { title, subtitle, items } = REGLAS;

  return (
    <VendedoresSection className={`${styles.section} ${colombiaVibrant.glowSection}`} id="reglas">
      <div className={styles.container}>
        <h2 className={`${styles.h2} ${colombiaVibrant.headlineSm}`}>{title}</h2>
        <p className={styles.sub}>{subtitle}</p>
        <ul className={styles.list}>
          {items.map((text) => (
            <li key={text} className={`${styles.item} ${colombiaVibrant.glowCard}`}>
              <span className={styles.check} aria-hidden>
                ✓
              </span>
              <span>{text}</span>
            </li>
          ))}
        </ul>
      </div>
    </VendedoresSection>
  );
}
