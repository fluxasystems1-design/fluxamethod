'use client';

import { useEffect, useRef, useState } from 'react';

function IconContent({ className }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M12 20h9M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function IconTraffic({ className }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function IconSales({ className }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M20 6L9 17l-5-5"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function FluxaSystemArchitecture() {
  const stageRef = useRef(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = stageRef.current;
    if (!el) return undefined;
    if (typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setInView(true);
      return undefined;
    }
    const io = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          setInView(true);
          io.disconnect();
        }
      },
      { threshold: 0.12, rootMargin: '0px 0px 18% 0px' }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <section className="section section--reveal section--architecture" id="arquitectura" aria-labelledby="arquitectura-heading">
      <div className="container">
        <h2 className="section__title section__title--architecture" id="arquitectura-heading">
          <span className="section__title-line">Una arquitectura completa</span>
          <span className="section__title-line section__title-line--architecture-sub">para tu negocio digital.</span>
        </h2>
        <p className="section__lead section__lead--architecture">
          Tres pilares conectados — como un sistema operativo: lo que comunicas, lo que atraes y lo que cierra. Fluxa los
          implementa y optimiza en un solo plan.
        </p>

        <div className="fluxa-arch">
          <figure className="fluxa-arch__figure">
            <div ref={stageRef} className={'fluxa-arch__stage' + (inView ? ' fluxa-arch__stage--inview' : '')}>
              <svg className="fluxa-arch__svg" viewBox="0 0 520 440" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
                <defs>
                  <linearGradient id="fluxa-arch-grad-c" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#22d3ee" />
                    <stop offset="100%" stopColor="#38bdf8" />
                  </linearGradient>
                  <linearGradient id="fluxa-arch-grad-p" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#7b2fbe" />
                    <stop offset="100%" stopColor="#a855f7" />
                  </linearGradient>
                  <linearGradient id="fluxa-arch-grad-g" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#16a34a" />
                    <stop offset="100%" stopColor="#4ade80" />
                  </linearGradient>
                  <linearGradient id="fluxa-arch-grad-hub" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#1e3a5f" />
                    <stop offset="50%" stopColor="#4c1d95" />
                    <stop offset="100%" stopColor="#7b2fbe" />
                  </linearGradient>
                  <filter id="fluxa-arch-glow-c" x="-50%" y="-50%" width="200%" height="200%">
                    <feGaussianBlur stdDeviation="4" result="b" />
                    <feMerge>
                      <feMergeNode in="b" />
                      <feMergeNode in="SourceGraphic" />
                    </feMerge>
                  </filter>
                  <filter id="fluxa-arch-glow-p" x="-50%" y="-50%" width="200%" height="200%">
                    <feGaussianBlur stdDeviation="5" result="b" />
                    <feMerge>
                      <feMergeNode in="b" />
                      <feMergeNode in="SourceGraphic" />
                    </feMerge>
                  </filter>
                  <filter id="fluxa-arch-glow-g" x="-50%" y="-50%" width="200%" height="200%">
                    <feGaussianBlur stdDeviation="4" result="b" />
                    <feMerge>
                      <feMergeNode in="b" />
                      <feMergeNode in="SourceGraphic" />
                    </feMerge>
                  </filter>
                </defs>

                <path
                  className="fluxa-arch__tri fluxa-arch__tri--c"
                  d="M 260 72 L 118 318"
                  stroke="url(#fluxa-arch-grad-c)"
                  strokeWidth="2"
                  strokeLinecap="round"
                  filter="url(#fluxa-arch-glow-c)"
                />
                <path
                  className="fluxa-arch__tri fluxa-arch__tri--g"
                  d="M 260 72 L 402 318"
                  stroke="url(#fluxa-arch-grad-g)"
                  strokeWidth="2"
                  strokeLinecap="round"
                  filter="url(#fluxa-arch-glow-g)"
                />
                <path
                  className="fluxa-arch__tri fluxa-arch__tri--p"
                  d="M 118 318 L 402 318"
                  stroke="url(#fluxa-arch-grad-p)"
                  strokeWidth="2"
                  strokeLinecap="round"
                  filter="url(#fluxa-arch-glow-p)"
                />

                <path
                  className="fluxa-arch__dash fluxa-arch__dash--c"
                  d="M 260 72 L 260 218"
                  stroke="url(#fluxa-arch-grad-c)"
                  strokeWidth="1.5"
                  strokeDasharray="6 5"
                  strokeLinecap="round"
                />
                <path
                  className="fluxa-arch__dash fluxa-arch__dash--l"
                  d="M 118 318 L 210 238"
                  stroke="url(#fluxa-arch-grad-p)"
                  strokeWidth="1.5"
                  strokeDasharray="6 5"
                  strokeLinecap="round"
                />
                <path
                  className="fluxa-arch__dash fluxa-arch__dash--r"
                  d="M 402 318 L 310 238"
                  stroke="url(#fluxa-arch-grad-g)"
                  strokeWidth="1.5"
                  strokeDasharray="6 5"
                  strokeLinecap="round"
                />

                <circle cx="260" cy="228" r="52" fill="url(#fluxa-arch-grad-hub)" className="fluxa-arch__hub-circle" />
                <circle cx="260" cy="228" r="52" fill="none" stroke="rgba(168,85,247,0.5)" strokeWidth="2" />
              </svg>

              <div className="fluxa-arch__hub" aria-hidden="true">
                <span className="fluxa-arch__hub-title">Fluxa</span>
                <span className="fluxa-arch__hub-sub">Method</span>
              </div>

              <div className="fluxa-arch__node fluxa-arch__node--top">
                <span className="fluxa-arch__node-icon fluxa-arch__node-icon--c" aria-hidden>
                  <IconContent className="fluxa-arch__ico-svg fluxa-arch__ico-svg--c" />
                </span>
                <span className="fluxa-arch__node-title">Contenido</span>
                <span className="fluxa-arch__node-os fluxa-arch__node-os--c">CONTENT</span>
              </div>

              <div className="fluxa-arch__node fluxa-arch__node--left">
                <span className="fluxa-arch__node-icon fluxa-arch__node-icon--p" aria-hidden>
                  <IconTraffic className="fluxa-arch__ico-svg fluxa-arch__ico-svg--p" />
                </span>
                <span className="fluxa-arch__node-title">Tráfico</span>
                <span className="fluxa-arch__node-os fluxa-arch__node-os--p">TRAFFIC</span>
              </div>

              <div className="fluxa-arch__node fluxa-arch__node--right">
                <span className="fluxa-arch__node-icon fluxa-arch__node-icon--g" aria-hidden>
                  <IconSales className="fluxa-arch__ico-svg fluxa-arch__ico-svg--g" />
                </span>
                <span className="fluxa-arch__node-title">Ventas</span>
                <span className="fluxa-arch__node-os fluxa-arch__node-os--g">SALES</span>
              </div>

              <p className="fluxa-arch__caption fluxa-arch__caption--left">
                El contenido alimenta el tráfico cualificado
              </p>
              <p className="fluxa-arch__caption fluxa-arch__caption--right">El tráfico alimenta las ventas</p>
              <p className="fluxa-arch__caption fluxa-arch__caption--bottom">
                Las ventas retroalimentan el contenido
              </p>
            </div>

            <figcaption className="fluxa-arch__figcaption">
              Cada pieza se refuerza con la otra: sin mensaje claro no hay pauta eficiente; sin pauta medible no hay
              embudo; sin cierre ordenado no hay datos para mejorar lo que publicas.
            </figcaption>
          </figure>

          <div className="fluxa-arch__cta">
            <a href="/diagnostico" className="btn btn--primary fluxa-arch__cta-primary">
              Ver cómo lo aplicamos a tu negocio →
            </a>
            <a href="/diagnostico" className="btn btn--ghost fluxa-arch__cta-secondary">
              Diagnóstico gratuito →
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
