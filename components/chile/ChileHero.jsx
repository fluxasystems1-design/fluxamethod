'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion, useReducedMotion } from 'framer-motion';
import { CHILE_ASTRONAUT_SRC, CHILE_WA_HREF } from '@/lib/chile/brand';
import chileVibrant from './chileVibrant.module.css';
import styles from './ChileHero.module.css';

const stagger = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.1, delayChildren: 0.2 },
  },
};

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  },
};

export default function ChileHero() {
  const reduceMotion = useReducedMotion();

  return (
    <section className={styles.hero} id="inicio" aria-label="Inicio">
      <div className={styles.stage}>
        <div className={styles.bgTitleRow} aria-hidden>
          <span className={styles.bgTitlePart}>FLU</span>
          <span className={styles.bgTitlePart}>XA</span>
        </div>
        <div className={styles.figureWrap}>
          <Image
            src={CHILE_ASTRONAUT_SRC}
            alt=""
            width={900}
            height={1200}
            className={styles.astronaut}
            priority
            sizes="(max-width: 768px) 90vw, 520px"
          />
        </div>
      </div>

      <div className={styles.content}>
        <motion.div
          className={styles.copyMain}
          variants={reduceMotion ? undefined : stagger}
          initial={reduceMotion ? false : 'hidden'}
          animate={reduceMotion ? false : 'show'}
        >
          <motion.p className={`${styles.label} ${chileVibrant.labelCaps}`} variants={fadeUp}>
            Fluxa Method — Arquitectura digital
          </motion.p>
          <motion.h1 className={`${styles.title} ${chileVibrant.headlineHero}`} variants={fadeUp}>
            <span className={styles.titleLine}>Tu visión convertida</span>
            <span className={chileVibrant.accentPurple}>en tecnología que funciona sola.</span>
          </motion.h1>
          <motion.div className={styles.actions} variants={fadeUp}>
            <a
              href={CHILE_WA_HREF}
              className={styles.btnPrimary}
              target="_blank"
              rel="noopener noreferrer"
            >
              Cotizar por WhatsApp
            </a>
            <Link href="#catalogo" className={styles.btnGhost}>
              Ver servicios
            </Link>
          </motion.div>
        </motion.div>

        <motion.p
          className={styles.copyAside}
          variants={fadeUp}
          initial={reduceMotion ? false : 'hidden'}
          animate={reduceMotion ? false : { opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.35 }}
        >
          Infraestructura digital que escala sin que operes cada paso manualmente.
        </motion.p>
      </div>
    </section>
  );
}
