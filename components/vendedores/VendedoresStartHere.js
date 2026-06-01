'use client';

import Link from 'next/link';
import { EMPIEZA_AQUI } from '@/app/embajadores-fluxa/vendedores-config';
import colombiaVibrant from '@/components/colombia/colombiaVibrant.module.css';
import VendedoresSection from './VendedoresSection';
import styles from './VendedoresStartHere.module.css';

export default function VendedoresStartHere() {
  const { title, titleAccent, subtitle, steps } = EMPIEZA_AQUI;

  return (
    <VendedoresSection className={styles.section} id="empieza-aqui">
      <div className={styles.container}>
        <h2 className={`${styles.h2} ${colombiaVibrant.headlineSm}`}>
          {title} <span className={colombiaVibrant.accentPurple}>{titleAccent}</span>
        </h2>
        <p className={styles.sub}>{subtitle}</p>
        <ol className={styles.steps}>
          {steps.map((item) => (
            <li key={item.step}>
              <article className={`${styles.stepCard} ${colombiaVibrant.glowCard}`}>
                <span className={styles.stepNum}>{item.step}</span>
                <div>
                  <h3>{item.title}</h3>
                  <p>{item.text}</p>
                  <Link href={item.href} className={styles.stepCta}>
                    {item.cta} →
                  </Link>
                </div>
              </article>
            </li>
          ))}
        </ol>
      </div>
    </VendedoresSection>
  );
}
