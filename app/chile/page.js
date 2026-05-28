'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import ChileServiceBlocks from '@/components/chile/ChileServiceBlocks';
import ChileCollaborationLottie from '@/components/chile/ChileCollaborationLottie';
import ChileHero from '@/components/chile/ChileHero';
import chileVibrant from '@/components/chile/chileVibrant.module.css';
import ChilePageLoader from '@/components/chile/ChilePageLoader';
import ChileWhatsAppFloat from '@/components/chile/ChileWhatsAppFloat';
import ChileSection from '@/components/chile/ChileSection';
import LandingsGlobeSection from '@/components/landings/LandingsGlobeSection';
import {
  CHILE_LANDING_CORNER_SRC,
  CHILE_LOGO_SRC,
  CHILE_WA_HREF,
  CHILE_WA_PHONE_DISPLAY,
} from '@/lib/chile/brand';
import styles from './page.module.css';

const NAV_LINKS = [
  { href: '#catalogo', label: 'Servicios' },
  { href: '#alcance', label: 'Alcance' },
  { href: '#proceso', label: 'Proceso' },
  { href: '#cotizar', label: 'Cotizar' },
];

const AUDIENCE = [
  {
    icon: '🎯',
    title: 'Marcas personales',
    desc: 'Convierte tu audiencia en un sistema de ingresos que funciona sin que estés disponible las 24 horas.',
  },
  {
    icon: '📈',
    title: 'Traders e inversores',
    desc: 'Comunidades de señales, plataformas de resultados en vivo y sistemas que automatizan tu método.',
  },
  {
    icon: '🎓',
    title: 'Coaches y mentores',
    desc: 'Academias digitales, membresías y embudos que venden tu conocimiento mientras tú te enfocas en enseñar.',
  },
  {
    icon: '🛍️',
    title: 'Negocios y ecommerce',
    desc: 'Tiendas, automatizaciones de pedidos y sistemas de atención que escalan sin contratar más personal.',
  },
  {
    icon: '📱',
    title: 'Influencers y creadores',
    desc: 'Infraestructura digital para monetizar tu alcance — más allá de la pauta y las colaboraciones.',
  },
  {
    icon: '🏢',
    title: 'Empresas y startups',
    desc: 'Software a medida, CRMs, dashboards y plataformas construidas exactamente como tu operación lo necesita.',
  },
];

const PROCESS = [
  {
    num: '01',
    title: 'Nos cuentas tu proyecto',
    text: 'Describes qué necesitas — nosotros analizamos, cotizamos y te decimos exactamente qué construimos y en cuánto tiempo.',
  },
  {
    num: '02',
    title: 'Ejecutamos en segundo plano',
    text: 'Nuestro equipo trabaja sin que tengas que supervisar cada detalle. Tú recibes actualizaciones, revisas y apruebas.',
  },
  {
    num: '03',
    title: 'Recibes listo para usar',
    text: 'Entregamos el sistema funcionando, documentado y en tus manos. Incluye rondas de revisión y soporte post-entrega.',
  },
];

const audienceCard = {
  hidden: { opacity: 0, y: 22 },
  show: (i) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, delay: i * 0.07, ease: [0.22, 1, 0.36, 1] },
  }),
};

const processStep = {
  hidden: { opacity: 0, x: -16 },
  show: (i) => ({
    opacity: 1,
    x: 0,
    transition: { duration: 0.5, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] },
  }),
};

export default function ChileLandingPage() {
  const [headerScrolled, setHeaderScrolled] = useState(false);
  const [pageRevealed, setPageRevealed] = useState(false);

  useEffect(function () {
    document.documentElement.style.scrollBehavior = 'smooth';
    return function () {
      document.documentElement.style.scrollBehavior = '';
    };
  }, []);

  useEffect(function () {
    function onScroll() {
      setHeaderScrolled(window.scrollY > 24);
    }
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return function () {
      window.removeEventListener('scroll', onScroll);
    };
  }, []);

  return (
    <>
      <ChilePageLoader onReveal={() => setPageRevealed(true)} />
      <div
        className={`${styles.wrap} ${pageRevealed ? styles.wrapRevealed : styles.wrapPending}`}
      >
      <header className={`${styles.header} ${headerScrolled ? styles.headerScrolled : ''}`}>
        <Link href="/chile" className={styles.headerLogo}>
          <Image
            src={CHILE_LOGO_SRC}
            alt="Fluxa Method"
            width={180}
            height={64}
            className={styles.headerLogoImg}
            priority
          />
        </Link>
        <nav className={styles.headerNav} aria-label="Secciones principales">
          {NAV_LINKS.map((link) => (
            <a key={link.href} href={link.href} className={styles.headerNavLink}>
              {link.label}
            </a>
          ))}
        </nav>
        <a
          href={CHILE_WA_HREF}
          className={styles.headerCta}
          target="_blank"
          rel="noopener noreferrer"
        >
          Cotizar →
        </a>
      </header>

      <main>
        <ChileHero />

        <ChileSection className={styles.intro} id="intro">
          <h2 className={`${styles.introTitle} ${chileVibrant.headlineSm}`}>
            No importa qué <span className={chileVibrant.accentPurple}>construiste</span>.
          </h2>
          <p
            className={`${styles.introAccent} ${chileVibrant.headlineSm}`}
            style={{ fontSize: 'clamp(1.2rem, 3.5vw, 1.65rem)', marginBottom: 14 }}
          >
            Nosotros lo hacemos <span className={chileVibrant.accentCyan}>escalar</span>.
          </p>
          <p className={styles.introBody}>
            Trabajamos con emprendedores, marcas personales, negocios locales, influencers, traders,
            coaches y empresas que quieren dejar de operar manualmente. Si tienes audiencia, una idea
            o un negocio que ya funciona — nosotros ponemos la infraestructura digital que lo lleva al
            siguiente nivel. Sin plantillas genéricas. Sin soluciones de talla única. Todo construido
            para ti.
          </p>
          <p className={styles.trustLine}>
            Atención y proyectos para Chile y Latinoamérica
          </p>
        </ChileSection>

        <ChileServiceBlocks />

        <ChileCollaborationLottie />

        <ChileSection className={`${styles.audience} ${chileVibrant.glowSection}`} id="para-quien">
          <div className={styles.container}>
            <h2 className={`${styles.sectionTitle} ${chileVibrant.headlineSm}`}>
              Sistemas que <span className={chileVibrant.accentPurple}>escalan</span>. Tecnología que{' '}
              <span className={chileVibrant.accentCyan}>no falla</span>.
            </h2>
            <div className={styles.audienceGrid}>
              {AUDIENCE.map((card, index) => (
                <motion.article
                  key={card.title}
                  className={`${styles.audienceCard} ${chileVibrant.glowCard}`}
                  custom={index}
                  variants={audienceCard}
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true, amount: 0.15 }}
                >
                  <span className={styles.audienceIcon} aria-hidden>
                    {card.icon}
                  </span>
                  <h3>{card.title}</h3>
                  <p>{card.desc}</p>
                </motion.article>
              ))}
            </div>
          </div>
        </ChileSection>

        <ChileSection className={styles.midCta} id="cotizar-catalogo">
          <p className={styles.midCtaText}>¿Ya sabes qué categoría necesitas?</p>
          <a
            href={CHILE_WA_HREF}
            className={styles.midCtaBtn}
            target="_blank"
            rel="noopener noreferrer"
          >
            Cotizar por WhatsApp
          </a>
        </ChileSection>

        <LandingsGlobeSection
          id="alcance"
          headingId="chile-globe-heading"
          title="Construimos donde estés."
          subtitle="Chile o cualquier parte del mundo — entregamos el mismo estándar técnico sin importar la distancia."
          showCountryPins={false}
          className={styles.landingsBlock}
          compact
        />

        <ChileSection className={styles.process} id="proceso">
          <div className={styles.container}>
            <h2 className={`${styles.sectionTitle} ${chileVibrant.headlineSm}`}>
              Así <span className={chileVibrant.accentPurple}>trabajamos</span>
            </h2>
            <p className={styles.processLead}>Primera propuesta en 48–72 h · Entrega según alcance acordado</p>
            <ol className={styles.processList}>
              {PROCESS.map((step, index) => (
                <motion.li
                  key={step.num}
                  className={styles.processItem}
                  custom={index}
                  variants={processStep}
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true, amount: 0.3 }}
                >
                  <span className={styles.processNum}>{step.num}</span>
                  <div>
                    <h3>{step.title}</h3>
                    <p>{step.text}</p>
                  </div>
                </motion.li>
              ))}
            </ol>
          </div>
        </ChileSection>

        <div className={styles.pageEnd}>
          <div className={styles.pageEndFlow}>
            <ChileSection className={styles.ctaFinal} id="cotizar">
              <div className={styles.pageEndContent}>
                <h2 className={`${styles.ctaTitle} ${chileVibrant.headlineSm}`}>
                  ¿Tienes un <span className={chileVibrant.accentPurple}>proyecto</span> en mente?
                </h2>
                <p className={styles.ctaSub}>
                  Cuéntanos qué necesitas construir. Sin compromiso — primero entendemos tu visión y
                  luego te decimos exactamente cómo lo hacemos realidad.
                </p>
                <a
                  href={CHILE_WA_HREF}
                  className={styles.ctaBtn}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Hablar con el equipo
                </a>
                <p className={styles.ctaNote}>Respondemos en menos de 24 horas · Lunes a viernes</p>
              </div>
            </ChileSection>

            <footer className={styles.footer}>
              <div className={styles.pageEndContent}>
                <p className={styles.footerLead}>
                  Fluxa Method — Arquitectura digital para marcas que crecen sin operar manualmente.
                </p>
                <p className={styles.footerMeta}>
                  fluxamethod.com · @fluxamethod · Chile y LATAM
                </p>
                <div className={styles.footerLinks}>
                  <a
                    href={CHILE_WA_HREF}
                    className={styles.footerLink}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    WhatsApp {CHILE_WA_PHONE_DISPLAY}
                  </a>
                  <a
                    href="https://instagram.com/fluxamethod"
                    className={styles.footerLink}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Instagram
                  </a>
                </div>
              </div>
            </footer>
          </div>

          <div className={styles.cornerLanding} aria-hidden>
            <Image
              src={CHILE_LANDING_CORNER_SRC}
              alt=""
              width={900}
              height={900}
              className={styles.cornerLandingImg}
              sizes="(max-width: 768px) 72vw, 620px"
            />
          </div>
        </div>
      </main>

      <ChileWhatsAppFloat className={styles.waFloatLeft} />
      </div>
    </>
  );
}
