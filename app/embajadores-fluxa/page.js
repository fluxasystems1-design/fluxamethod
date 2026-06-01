'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { COLOMBIA_LOGO_SRC } from '@/lib/colombia/brand';
import VendedoresHero from '@/components/vendedores/VendedoresHero';
import VendedoresStartHere from '@/components/vendedores/VendedoresStartHere';
import ComoFunciona from '@/components/vendedores/ComoFunciona';
import CatalogoServicios from '@/components/vendedores/CatalogoServicios';
import PaquetesTiers from '@/components/vendedores/PaquetesTiers';
import SpeechSection from '@/components/vendedores/SpeechSection';
import CalculadoraGanancias from '@/components/vendedores/CalculadoraGanancias';
import OperacionAliados from '@/components/vendedores/OperacionAliados';
import PreciosResumen from '@/components/vendedores/PreciosResumen';
import ReglasAlianza from '@/components/vendedores/ReglasAlianza';
import FaqVendedores from '@/components/vendedores/FaqVendedores';
import CtaFinal from '@/components/vendedores/CtaFinal';
import { FOOTER, NAV_SECTIONS } from './vendedores-config';
import styles from './page.module.css';

export default function EmbajadoresFluxaPage() {
  const [headerScrolled, setHeaderScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState(NAV_SECTIONS[0].id);
  const [navOpen, setNavOpen] = useState(false);

  useEffect(function () {
    document.documentElement.style.scrollBehavior = 'smooth';
    return function () {
      document.documentElement.style.scrollBehavior = '';
    };
  }, []);

  useEffect(function () {
    function onScroll() {
      setHeaderScrolled(window.scrollY > 20);
    }
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return function () {
      window.removeEventListener('scroll', onScroll);
    };
  }, []);

  useEffect(function () {
    const ids = NAV_SECTIONS.map((s) => s.id);
    const elements = ids.map((id) => document.getElementById(id)).filter(Boolean);

    if (!elements.length) return undefined;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible[0]?.target?.id) {
          setActiveSection(visible[0].target.id);
        }
      },
      { rootMargin: '-30% 0px -55% 0px', threshold: [0, 0.15, 0.4] }
    );

    elements.forEach((el) => observer.observe(el));
    return function () {
      observer.disconnect();
    };
  }, []);

  function closeNav() {
    setNavOpen(false);
  }

  return (
    <div className={styles.wrap}>
      <header className={`${styles.header} ${headerScrolled ? styles.headerScrolled : ''}`}>
        <div className={styles.headerTop}>
          <Link href="#hero" className={styles.headerLogo} onClick={closeNav}>
            <Image
              src={COLOMBIA_LOGO_SRC}
              alt="Fluxa Method"
              width={180}
              height={64}
              className={styles.headerLogoImg}
              priority
            />
          </Link>
          <div className={styles.headerActions}>
            <button
              type="button"
              className={styles.menuBtn}
              aria-expanded={navOpen}
              aria-controls="vendedores-nav"
              onClick={() => setNavOpen((open) => !open)}
            >
              <span className={styles.menuIcon} aria-hidden />
              <span className={styles.srOnly}>{navOpen ? 'Cerrar menú' : 'Abrir menú'}</span>
            </button>
          </div>
        </div>
        <nav
          id="vendedores-nav"
          className={navOpen ? `${styles.navChips} ${styles.navOpen}` : styles.navChips}
          aria-label="Secciones"
        >
          {NAV_SECTIONS.map((link) => (
            <a
              key={link.id}
              href={link.href}
              className={
                activeSection === link.id
                  ? `${styles.navChip} ${styles.navChipActive}`
                  : styles.navChip
              }
              onClick={closeNav}
            >
              {link.label}
            </a>
          ))}
        </nav>
      </header>

      <main className={styles.main}>
        <VendedoresHero />
        <VendedoresStartHere />
        <ComoFunciona />
        <CatalogoServicios />
        <PaquetesTiers />
        <SpeechSection />
        <CalculadoraGanancias />
        <OperacionAliados />
        <PreciosResumen />
        <ReglasAlianza />
        <FaqVendedores />
        <CtaFinal />
      </main>

      <footer className={styles.pageFooter}>
        <Image
          src={COLOMBIA_LOGO_SRC}
          alt="Fluxa Method"
          width={160}
          height={56}
          className={styles.footerLogoImg}
        />
        <p className={styles.footerConfidential}>{FOOTER.confidential}</p>
        <p className={styles.footerCopy}>{FOOTER.copyright}</p>
      </footer>
    </div>
  );
}
