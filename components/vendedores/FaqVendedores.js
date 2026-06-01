'use client';

import { useState } from 'react';
import { FAQ } from '@/app/embajadores-fluxa/vendedores-config';
import colombiaVibrant from '@/components/colombia/colombiaVibrant.module.css';
import VendedoresSection from './VendedoresSection';
import styles from './FaqVendedores.module.css';

export default function FaqVendedores() {
  const { title, items } = FAQ;
  const [openIndex, setOpenIndex] = useState(0);

  function toggle(index) {
    setOpenIndex((prev) => (prev === index ? -1 : index));
  }

  return (
    <VendedoresSection className={styles.section} id="faq">
      <div className={styles.container}>
        <h2 className={`${styles.h2} ${colombiaVibrant.headlineSm}`}>{title}</h2>
        <div className={styles.accordion}>
          {items.map((item, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={item.q}
                className={`${styles.item} ${isOpen ? styles.itemOpen : ''} ${colombiaVibrant.glowCard}`}
              >
                <button
                  type="button"
                  className={styles.trigger}
                  aria-expanded={isOpen}
                  onClick={() => toggle(index)}
                >
                  <span>{item.q}</span>
                  <span className={styles.icon} aria-hidden>
                    {isOpen ? '−' : '+'}
                  </span>
                </button>
                {isOpen && (
                  <div className={styles.answer}>
                    <p>{item.a}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </VendedoresSection>
  );
}
