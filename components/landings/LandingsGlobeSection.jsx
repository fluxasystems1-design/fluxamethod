'use client';

import { useEffect, useRef } from 'react';
import createGlobe from 'cobe';
import styles from './landingsShowcase.module.css';

const COUNTRY_MARKERS = [
  { location: [4.711, -74.0721], base: 0.045, color: [0.15, 0.85, 0.98] },
  { location: [40.4168, -3.7038], base: 0.05, color: [0.2, 0.92, 1] },
  { location: [19.4326, -99.1332], base: 0.044, color: [0.15, 0.85, 0.98] },
  { location: [39.8283, -98.5795], base: 0.052, color: [0.2, 0.92, 1] },
];

function CobeGlobePulse({ showCountryMarkers }) {
  const canvasRef = useRef(null);
  const rafRef = useRef(null);

  useEffect(
    function () {
      const canvas = canvasRef.current;
      if (!canvas) return undefined;

      const cyan = [0.2, 0.92, 1];
      const baseMarkers = showCountryMarkers ? COUNTRY_MARKERS : [];

      let phi = 0;
      const dpr = Math.min(2, typeof window !== 'undefined' ? window.devicePixelRatio || 1 : 1);

      const globe = createGlobe(canvas, {
        devicePixelRatio: dpr,
        width: 320,
        height: 320,
        phi: 0,
        theta: 0.32,
        dark: 1,
        diffuse: 1.22,
        mapSamples: 14000,
        mapBrightness: 5.8,
        mapBaseBrightness: 0,
        baseColor: [0.18, 0.18, 0.22],
        markerColor: cyan,
        glowColor: [0.3, 0.65, 1],
        markers: baseMarkers.map(function (m) {
          return { location: m.location, size: m.base, color: m.color };
        }),
        scale: 1.06,
      });

      function tick() {
        phi += 0.0035;
        const t = Date.now() * 0.0028;
        const markers = baseMarkers.map(function (m, i) {
          const pulse = 0.018 * Math.sin(t + i * 1.37);
          return {
            location: m.location,
            size: Math.max(0.02, m.base + pulse),
            color: m.color,
          };
        });
        globe.update({ phi: phi, theta: 0.32, markers: markers });
        rafRef.current = window.requestAnimationFrame(tick);
      }

      rafRef.current = window.requestAnimationFrame(tick);

      return function () {
        if (rafRef.current) {
          window.cancelAnimationFrame(rafRef.current);
        }
        globe.destroy();
      };
    },
    [showCountryMarkers]
  );

  return <canvas ref={canvasRef} className={styles.globeCanvas} aria-hidden />;
}

function GlobeWithPins({ showCountryMarkers }) {
  return (
    <div className={styles.globeStage}>
      {showCountryMarkers ? (
        <div className={styles.globePins}>
          <div className={styles.globePin + ' ' + styles.globePinEs}>
            <span className={styles.globePinDot} aria-hidden />
            <span className={styles.globePinLine} aria-hidden />
            <span className={styles.globePinLabel}>🇪🇸 España</span>
          </div>
          <div className={styles.globePin + ' ' + styles.globePinUs}>
            <span className={styles.globePinDot} aria-hidden />
            <span className={styles.globePinLine} aria-hidden />
            <span className={styles.globePinLabel}>🇺🇸 USA</span>
          </div>
          <div className={styles.globePin + ' ' + styles.globePinMx}>
            <span className={styles.globePinLabel}>🇲🇽 México</span>
            <span className={styles.globePinLine} aria-hidden />
            <span className={styles.globePinDot} aria-hidden />
          </div>
          <div className={styles.globePin + ' ' + styles.globePinCo}>
            <span className={styles.globePinDot} aria-hidden />
            <span className={styles.globePinLine} aria-hidden />
            <span className={styles.globePinLabel}>🇨🇴 Colombia</span>
          </div>
        </div>
      ) : null}
      <CobeGlobePulse showCountryMarkers={showCountryMarkers} />
    </div>
  );
}

export default function LandingsGlobeSection({
  id = 'mundo',
  headingId = 'world-heading',
  title = 'Landings para cualquier industria, en cualquier parte del mundo',
  subtitle = 'Colombia o el exterior: mismo estándar para tu negocio.',
  className = '',
  showCountryPins = true,
  compact = false,
}) {
  return (
    <section
      className={
        styles.sectionWorld +
        (compact ? ` ${styles.sectionWorldCompact}` : '') +
        (className ? ` ${className}` : '')
      }
      aria-labelledby={headingId}
      id={id}
    >
      <div className={styles.container}>
        <h2 id={headingId} className={styles.sectionTitle}>
          {title}
        </h2>
        <p className={styles.sectionWorldSub}>{subtitle}</p>
        <div className={styles.worldGrid}>
          <div className={styles.worldColGlobe}>
            <GlobeWithPins showCountryMarkers={showCountryPins} />
          </div>
        </div>
      </div>
    </section>
  );
}
