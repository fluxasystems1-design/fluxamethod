'use client';

import Image from 'next/image';
import Link from 'next/link';
import { COLOMBIA_LOGO_SRC } from '@/lib/colombia/brand';
import { trackTradingCta } from '@/lib/trading/analytics';
import { NAV_LINKS } from '@/app/trading/trading-config';
import styles from '@/app/trading/page.module.css';

export default function TradingHeader({ waHref }) {
  return (
    <header className={styles.header}>
      <Link href="/trading" className={styles.headerLogo}>
        <Image
          src={COLOMBIA_LOGO_SRC}
          alt="Fluxa Method"
          width={240}
          height={86}
          className={styles.headerLogoImg}
          priority
        />
      </Link>
      <nav className={styles.headerNav} aria-label="Secciones">
        {NAV_LINKS.map((link) => (
          <a key={link.href} href={link.href} className={styles.headerNavLink}>
            {link.label}
          </a>
        ))}
      </nav>
      <a
        href={waHref}
        className={styles.headerCta}
        target="_blank"
        rel="noopener noreferrer"
        onClick={() => trackTradingCta('header')}
      >
        <span className={styles.headerCtaDesktop}>Agendar diagnóstico →</span>
        <span className={styles.headerCtaMobile}>Diagnóstico →</span>
      </a>
    </header>
  );
}
