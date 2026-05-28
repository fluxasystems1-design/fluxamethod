'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import dynamic from 'next/dynamic';
import { motion, useReducedMotion } from 'framer-motion';
import { CHILE_WA_HREF } from '@/lib/chile/brand';
import {
  CHILE_SPLINE_SCENE_FALLBACK,
  CHILE_SPLINE_SCENE_PRIMARY,
} from '@/lib/chile/spline';
import styles from './ChileHero.module.css';

const SplineScene = dynamic(
  () => import('@/components/ui/spline-scene').then((m) => m.SplineScene),
  {
    ssr: false,
    loading: () => <div className={styles.splineLoading}>Cargando escena 3D…</div>,
  }
);

const stagger = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.12, delayChildren: 0.08 },
  },
};

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] },
  },
};

export default function ChileHero() {
  const reduceMotion = useReducedMotion();
  const [sceneUrl, setSceneUrl] = useState(CHILE_SPLINE_SCENE_PRIMARY);
  const [useGradientFallback, setUseGradientFallback] = useState(false);
  const [splineKey, setSplineKey] = useState(0);
  const loadedRef = useRef(false);
  const triedFallbackRef = useRef(false);
  const failTimerRef = useRef(null);

  const handleSplineError = useCallback(function () {
    if (failTimerRef.current) window.clearTimeout(failTimerRef.current);

    if (sceneUrl === CHILE_SPLINE_SCENE_PRIMARY && !triedFallbackRef.current) {
      triedFallbackRef.current = true;
      setSceneUrl(CHILE_SPLINE_SCENE_FALLBACK);
      setSplineKey((k) => k + 1);
      return;
    }

    setUseGradientFallback(true);
  }, [sceneUrl]);

  useEffect(function () {
    loadedRef.current = false;
    failTimerRef.current = window.setTimeout(function () {
      if (!loadedRef.current) handleSplineError();
    }, 16000);
    return function () {
      if (failTimerRef.current) window.clearTimeout(failTimerRef.current);
    };
  }, [sceneUrl, splineKey, handleSplineError]);

  function onSplineLoad() {
    loadedRef.current = true;
    if (failTimerRef.current) window.clearTimeout(failTimerRef.current);
  }

  return (
    <section className={styles.hero} id="inicio" aria-label="Inicio">
      <div className={styles.heroGrid}>
        <div className={styles.splineCol}>
          {useGradientFallback ? (
            <div className={styles.splineFallback} aria-hidden />
          ) : (
            <div className={styles.splineWrap}>
              <SplineScene
                key={`${sceneUrl}-${splineKey}`}
                scene={sceneUrl}
                className={styles.splineCanvas}
                onSplineLoad={onSplineLoad}
                onError={handleSplineError}
              />
            </div>
          )}
        </div>

        <motion.div
          className={styles.copy}
          variants={reduceMotion ? undefined : stagger}
          initial={reduceMotion ? false : 'hidden'}
          animate={reduceMotion ? false : 'show'}
        >
          <motion.p className={styles.label} variants={fadeUp}>
            Fluxa Method — Arquitectura digital
          </motion.p>
          <motion.h1 className={styles.title} variants={fadeUp}>
            <span className={styles.titleLine}>Tu visión convertida</span>
            <span className={styles.titleAccent}>en tecnología que funciona sola.</span>
          </motion.h1>
          <motion.p className={styles.sub} variants={fadeUp}>
            Construimos el sistema digital detrás de tu marca, negocio o comunidad. Páginas,
            automatizaciones, inteligencia artificial y software a medida — para que lo que
            construiste empiece a trabajar sin que estés presente en cada paso.
          </motion.p>
          <motion.a
            href={CHILE_WA_HREF}
            className={styles.btnWa}
            target="_blank"
            rel="noopener noreferrer"
            variants={fadeUp}
          >
            Cotizar por WhatsApp
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
}
