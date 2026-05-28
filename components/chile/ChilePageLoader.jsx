'use client';

import { useEffect, useRef } from 'react';
import styles from './ChilePageLoader.module.css';

/**
 * Pantalla de carga inicial /chile — se elimina del DOM tras 2s (load + 1.5s + 0.5s fade).
 * @param {() => void} [onReveal] — dispara fade-in del contenido de la página
 */
export default function ChilePageLoader({ onReveal }) {
  const ranRef = useRef(false);

  useEffect(function () {
    if (ranRef.current) return undefined;
    ranRef.current = true;

    function handleLoad() {
      var delay = 1500;
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        delay = 0;
      }

      window.setTimeout(function () {
        var loader = document.getElementById('fluxa-loader');
        if (!loader) return;
        loader.style.opacity = '0';
        window.setTimeout(function () {
          loader.remove();
          if (typeof onReveal === 'function') {
            onReveal();
          }
        }, 500);
      }, delay);
    }

    if (document.readyState === 'complete') {
      handleLoad();
    } else {
      window.addEventListener('load', handleLoad);
    }

    return function () {
      window.removeEventListener('load', handleLoad);
    };
  }, [onReveal]);

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
