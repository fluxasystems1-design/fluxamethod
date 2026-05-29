'use client';

import { useEffect, useRef } from 'react';
import styles from './ColombiaPageLoader.module.css';

const SPLASH_MS = 1500;
const FADE_MS = 500;
/** Si algún asset bloquea `window.load`, igual quitamos el loader */
const MAX_WAIT_MS = 4500;

/**
 * Splash inicial /colombia — no espera imágenes/video pesados (evita quedar trabado).
 * @param {() => void} [onReveal] — dispara fade-in del contenido de la página
 */
export default function ColombiaPageLoader({ onReveal }) {
  const onRevealRef = useRef(onReveal);
  onRevealRef.current = onReveal;

  useEffect(function () {
    var dismissed = false;
    var splashTimer;
    var fadeTimer;
    var safetyTimer;

    function dismissLoader() {
      if (dismissed) return;
      dismissed = true;
      window.clearTimeout(splashTimer);
      window.clearTimeout(safetyTimer);

      var loader = document.getElementById('fluxa-loader');
      if (!loader) {
        onRevealRef.current?.();
        return;
      }
      loader.style.opacity = '0';
      fadeTimer = window.setTimeout(function () {
        loader.remove();
        onRevealRef.current?.();
      }, FADE_MS);
    }

    function scheduleSplash() {
      var delay = window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 0 : SPLASH_MS;
      splashTimer = window.setTimeout(dismissLoader, delay);
    }

    safetyTimer = window.setTimeout(dismissLoader, MAX_WAIT_MS);

    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', scheduleSplash, { once: true });
    } else {
      scheduleSplash();
    }

    return function () {
      dismissed = true;
      document.removeEventListener('DOMContentLoaded', scheduleSplash);
      window.clearTimeout(splashTimer);
      window.clearTimeout(fadeTimer);
      window.clearTimeout(safetyTimer);
    };
  }, []);

  return (
    <div id="fluxa-loader" className={styles.loader} role="status" aria-live="polite" aria-label="Cargando">
      <div className={styles.inner}>
        <span className={styles.line} aria-hidden="true" />
        <p className={styles.label}>FLUXA METHOD</p>
        <h1 className={styles.title}>Arquitectura digital.</h1>
        <span className={styles.line} aria-hidden="true" />
      </div>
    </div>
  );
}
