'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion, useReducedMotion } from 'framer-motion';
import { COLOMBIA_ASTRONAUT_SRC } from '@/lib/colombia/brand';
import { HERO } from '@/app/embajadores-fluxa/vendedores-config';
import colombiaVibrant from '@/components/colombia/colombiaVibrant.module.css';
import heroStyles from '@/components/colombia/ColombiaHero.module.css';
import styles from './VendedoresHero.module.css';

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1, delayChildren: 0.15 } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  },
};

export default function VendedoresHero() {
  const reduceMotion = useReducedMotion();

  return (
    <section className={`${heroStyles.hero} ${styles.hero}`} id="hero" aria-label="Inicio">
      <div className={heroStyles.stage}>
        <div className={heroStyles.bgTitleRow} aria-hidden>
          <span className={heroStyles.bgTitlePart}>FLU</span>
          <span className={heroStyles.bgTitlePart}>XA</span>
        </div>
        <div className={heroStyles.figureWrap}>
          <Image
            src={COLOMBIA_ASTRONAUT_SRC}
            alt=""
            width={900}
            height={1200}
            className={heroStyles.astronaut}
            priority
            sizes="(max-width: 768px) 90vw, 520px"
          />
        </div>
      </div>

      <motion.div
        className={`${heroStyles.content} ${styles.content}`}
        variants={reduceMotion ? undefined : stagger}
        initial={reduceMotion ? false : 'hidden'}
        animate={reduceMotion ? false : 'show'}
      >
        <motion.p className={`${styles.eyebrow} ${colombiaVibrant.labelCaps}`} variants={fadeUp}>
          {HERO.eyebrow}
        </motion.p>
        <motion.h1 className={`${heroStyles.title} ${colombiaVibrant.headlineHero}`} variants={fadeUp}>
          {HERO.titleLines.map((line, i) => (
            <span
              key={line}
              className={i === 1 ? colombiaVibrant.accentPurple : heroStyles.titleLine}
            >
              {line}
            </span>
          ))}
        </motion.h1>
        <motion.p className={styles.subtitle} variants={fadeUp}>
          {HERO.subtitle}
        </motion.p>
        <motion.span className={styles.badge} variants={fadeUp}>
          {HERO.badge}
        </motion.span>
        <motion.div className={styles.actions} variants={fadeUp}>
          <Link href={HERO.ctaPrimary.href} className={heroStyles.btnPrimary}>
            {HERO.ctaPrimary.label}
          </Link>
          <a
            href={HERO.ctaSecondary.href}
            className={heroStyles.btnGhost}
            target="_blank"
            rel="noopener noreferrer"
          >
            {HERO.ctaSecondary.label}
          </a>
        </motion.div>
      </motion.div>
    </section>
  );
}
