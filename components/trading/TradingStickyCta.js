'use client';

import { useEffect, useState } from 'react';
import { trackTradingCta } from '@/lib/trading/analytics';
import styles from '@/app/trading/page.module.css';

export default function TradingStickyCta({ href, label }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    function onScroll() {
      setVisible(window.scrollY > 480);
    }
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  if (!visible) return null;

  return (
    <div className={styles.stickyCta} role="region" aria-label="Acción rápida">
      <a
        href={href}
        className={styles.stickyCtaBtn}
        target="_blank"
        rel="noopener noreferrer"
        onClick={() => trackTradingCta('sticky_bar')}
      >
        {label}
      </a>
    </div>
  );
}
