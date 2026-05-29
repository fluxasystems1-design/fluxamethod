'use client';

import dynamic from 'next/dynamic';
import { useReducedMotion } from 'framer-motion';
import { COLOMBIA_HERO_LOTTIE_SRC } from '@/lib/colombia/lottie';
import colombiaVibrant from './colombiaVibrant.module.css';
import styles from './ColombiaCollaborationLottie.module.css';

const DotLottieReact = dynamic(
  () => import('@lottiefiles/dotlottie-react').then((m) => m.DotLottieReact),
  {
    ssr: false,
    loading: () => <div className={styles.loading}>Cargando animación…</div>,
  }
);

/** Robot + persona — encima de la sección “Para quién” */
export default function ColombiaCollaborationLottie() {
  const reduceMotion = useReducedMotion();

  return (
    <section className={`${styles.section} ${colombiaVibrant.glowSection}`} aria-hidden>
      <div className={styles.wrap}>
        <DotLottieReact
          src={COLOMBIA_HERO_LOTTIE_SRC}
          loop={!reduceMotion}
          autoplay={!reduceMotion}
          className={styles.canvas}
        />
      </div>
    </section>
  );
}
