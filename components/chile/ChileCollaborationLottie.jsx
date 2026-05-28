'use client';

import dynamic from 'next/dynamic';
import { useReducedMotion } from 'framer-motion';
import { CHILE_HERO_LOTTIE_SRC } from '@/lib/chile/lottie';
import styles from './ChileCollaborationLottie.module.css';

const DotLottieReact = dynamic(
  () => import('@lottiefiles/dotlottie-react').then((m) => m.DotLottieReact),
  {
    ssr: false,
    loading: () => <div className={styles.loading}>Cargando animación…</div>,
  }
);

/** Robot + persona — encima de la sección “Para quién” */
export default function ChileCollaborationLottie() {
  const reduceMotion = useReducedMotion();

  return (
    <section className={styles.section} aria-hidden>
      <div className={styles.wrap}>
        <DotLottieReact
          src={CHILE_HERO_LOTTIE_SRC}
          loop={!reduceMotion}
          autoplay={!reduceMotion}
          className={styles.canvas}
        />
      </div>
    </section>
  );
}
