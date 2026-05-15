'use client';

import { useEffect, useRef, useState } from 'react';
import createGlobe from 'cobe';
import { ContainerScroll } from './ContainerScroll';
import { FallingPattern } from './FallingPattern';
import styles from './page.module.css';

const WA_PRIMARY =
  'https://api.whatsapp.com/message/SEVUH3LFWHLUE1?autoload=1&app_absent=0';

const CRAV_SITE_URL = 'https://www.cravburgers.shop';
const CRAV_TABLET_PREVIEW_IMG = '/imagenes/hamburgeusa.png';

const INCLUDE_CARDS = [
  { icon: '📱', title: 'Responsive', text: 'Se ve perfecto en celular y computador' },
  { icon: '⚡', title: 'Entrega rápida', text: 'Máximo 3 días hábiles' },
  { icon: '📩', title: 'Formulario funcional', text: 'Los mensajes llegan directo a tu correo' },
  { icon: '💬', title: 'Botón WhatsApp', text: 'Flotante, siempre visible' },
  { icon: '🎨', title: 'Diseño personalizado', text: 'Con tus colores y tu logo' },
  { icon: '🔄', title: 'Un ajuste incluido', text: 'Cambios sin costo adicional' },
];

const VITRINA_ITEMS = [
  {
    src: '/imagenes/' + encodeURIComponent('ChatGPT Image 14 may 2026, 04_52_03 p.m..png'),
    name: 'Testosterone',
    category: 'Suplementos',
  },
  {
    src: '/imagenes/' + encodeURIComponent('ChatGPT Image 14 may 2026, 04_52_06 p.m..png'),
    name: 'Sopladora',
    category: 'Herramientas',
  },
  {
    src: '/imagenes/' + encodeURIComponent('ChatGPT Image 14 may 2026, 04_52_09 p.m..png'),
    name: 'Rueda Abdominal',
    category: 'Fitness',
  },
];

const PRICE_CHECKS = [
  'Diseño 100% personalizado',
  'Responsive para celular y desktop',
  'Formulario al correo',
  'Botón WhatsApp flotante',
  'Entrega en máximo 3 días',
  'Un ajuste sin costo',
];

const PROCESS_STEPS = [
  { icon: '💬', title: 'Nos escribes', text: 'Por WhatsApp, sin formularios' },
  { icon: '📋', title: 'Nos cuentas', text: 'Tu negocio, colores y logo' },
  { icon: '🎨', title: 'Diseñamos', text: 'Tú apruebas antes de publicar' },
  { icon: '🚀', title: 'Publicamos', text: 'Lista en máximo 3 días' },
];

const TRUST_PILLS = [
  { icon: '⚡', text: 'Hasta 3 días hábiles' },
  { icon: '👀', text: 'Ves el diseño antes de publicar' },
  { icon: '💬', text: 'Todo el flujo por WhatsApp' },
  { icon: '🔄', text: 'Un ajuste incluido' },
];

const HOME_TESTIMONIAL = {
  quote:
    'Necesitábamos salir rápido con algo que se viera serio. Fue directo: propuesta clara, ajustamos detalles por WhatsApp y en pocos días ya teníamos el enlace para compartir.',
  name: 'Laura R.',
  role: 'Emprendedora · Bogotá',
};

function CobeGlobePulse() {
  var canvasRef = useRef(null);
  var rafRef = useRef(null);

  useEffect(function () {
    var canvas = canvasRef.current;
    if (!canvas) return undefined;

    var cyan = [0.2, 0.92, 1];
    var cyanSoft = [0.15, 0.85, 0.98];
    var baseMarkers = [
      { location: [4.711, -74.0721], base: 0.045, color: cyanSoft },
      { location: [40.4168, -3.7038], base: 0.05, color: cyan },
      { location: [19.4326, -99.1332], base: 0.044, color: cyanSoft },
      { location: [39.8283, -98.5795], base: 0.052, color: cyan },
    ];

    var phi = 0;
    var dpr = Math.min(2, typeof window !== 'undefined' ? window.devicePixelRatio || 1 : 1);

    var globe = createGlobe(canvas, {
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
      var t = Date.now() * 0.0028;
      var markers = baseMarkers.map(function (m, i) {
        var pulse = 0.018 * Math.sin(t + i * 1.37);
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
  }, []);

  return <canvas ref={canvasRef} className={styles.globeCanvas} aria-hidden />;
}

function GlobeWithPins() {
  return (
    <div className={styles.globeStage}>
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
      <CobeGlobePulse />
    </div>
  );
}

/** Captura del sitio dentro del marco tablet (sin iframe = sin redirecciones). */
function HeroTabletPreview() {
  return (
    <div className={styles.heroTabletFrame}>
      <div className={styles.heroTabletImageWrap}>
        <img
          src={CRAV_TABLET_PREVIEW_IMG}
          alt="Vista previa del sitio CRAV Burgers"
          className={styles.heroTabletImage}
          width={1200}
          height={780}
          draggable={false}
        />
      </div>
    </div>
  );
}

function OrbitIconsField() {
  var hostRef = useRef(null);

  useEffect(function () {
    var host = hostRef.current;
    if (!host) return undefined;
    var nodes = host.querySelectorAll('[data-orbit-icon]');
    var items = [];
    var i;
    for (i = 0; i < nodes.length; i++) {
      var node = nodes[i];
      items.push({
        el: node,
        r: Number(node.getAttribute('data-r')),
        speed: Number(node.getAttribute('data-speed')),
        dir: Number(node.getAttribute('data-dir')),
        angle: Number(node.getAttribute('data-phase')),
      });
    }

    var frameId = 0;

    function tick() {
      var w = host.offsetWidth || 280;
      var scale = w / 400;
      var j;
      for (j = 0; j < items.length; j++) {
        var o = items[j];
        o.angle += o.speed * o.dir;
        var xr = o.r * scale * Math.cos(o.angle);
        var yr = o.r * scale * Math.sin(o.angle);
        o.el.style.transform = 'translate(-50%, -50%) translate(' + xr + 'px,' + yr + 'px)';
      }
      frameId = window.requestAnimationFrame(tick);
    }

    frameId = window.requestAnimationFrame(tick);

    return function () {
      window.cancelAnimationFrame(frameId);
    };
  }, []);

  return (
    <div className={styles.orbitHost} ref={hostRef}>
      <div className={styles.orbitRing + ' ' + styles.orbitRing1} aria-hidden />
      <div className={styles.orbitRing + ' ' + styles.orbitRing2} aria-hidden />
      <div className={styles.orbitRing + ' ' + styles.orbitRing3} aria-hidden />
      <div className={styles.orbitCenterLogo} aria-hidden>
        F
      </div>
      <div
        className={styles.orbitIcon}
        data-orbit-icon
        data-r="80"
        data-speed="0.008"
        data-dir="1"
        data-phase="0"
      >
        ⚡
      </div>
      <div
        className={styles.orbitIcon}
        data-orbit-icon
        data-r="80"
        data-speed="0.008"
        data-dir="1"
        data-phase="3.14159"
      >
        📱
      </div>
      <div
        className={styles.orbitIcon}
        data-orbit-icon
        data-r="130"
        data-speed="0.005"
        data-dir="-1"
        data-phase="0"
      >
        🔒
      </div>
      <div
        className={styles.orbitIcon}
        data-orbit-icon
        data-r="130"
        data-speed="0.005"
        data-dir="-1"
        data-phase="2.0944"
      >
        📧
      </div>
      <div
        className={styles.orbitIcon}
        data-orbit-icon
        data-r="130"
        data-speed="0.005"
        data-dir="-1"
        data-phase="4.18879"
      >
        💬
      </div>
      <div
        className={styles.orbitIcon}
        data-orbit-icon
        data-r="180"
        data-speed="0.003"
        data-dir="1"
        data-phase="0"
      >
        🎨
      </div>
      <div
        className={styles.orbitIcon}
        data-orbit-icon
        data-r="180"
        data-speed="0.003"
        data-dir="1"
        data-phase="2.0944"
      >
        📊
      </div>
      <div
        className={styles.orbitIcon}
        data-orbit-icon
        data-r="180"
        data-speed="0.003"
        data-dir="1"
        data-phase="4.18879"
      >
        🚀
      </div>
    </div>
  );
}

export default function LandingsPage() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const intervalRef = useRef(null);
  const heroSectionRef = useRef(null);
  const heroCanvasRef = useRef(null);

  useEffect(
    function () {
      if (!paused) {
        intervalRef.current = setInterval(function () {
          setActive(function (prev) {
            return (prev + 1) % VITRINA_ITEMS.length;
          });
        }, 2500);
      }
      return function () {
        if (intervalRef.current) {
          clearInterval(intervalRef.current);
        }
      };
    },
    [paused],
  );

  useEffect(function () {
    var section = heroSectionRef.current;
    var canvas = heroCanvasRef.current;
    if (!section || !canvas) return undefined;

    var ctx = canvas.getContext('2d');
    if (!ctx) return undefined;

    var lines = [];
    var frameId = 0;

    function buildLines(w, h) {
      var count = Math.max(32, Math.min(160, Math.floor((w * h) / 9000)));
      var arr = [];
      var i;
      for (i = 0; i < count; i++) {
        arr.push({
          x: Math.random() * w,
          y: Math.random() * (h + h * 0.5) - h * 0.7,
          speed: 1 + Math.random() * 4.2,
          len: 12 + Math.random() * 48,
          lw: 0.5 + Math.random() * 1.1,
        });
      }
      return arr;
    }

    function resize() {
      var dpr = window.devicePixelRatio || 1;
      var w = section.offsetWidth;
      var h = section.offsetHeight;
      if (w < 1 || h < 1) return;
      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
      canvas.style.width = w + 'px';
      canvas.style.height = h + 'px';
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      lines = buildLines(w, h);
    }

    function tick() {
      var w = section.offsetWidth;
      var h = section.offsetHeight;
      if (w < 1 || h < 1) {
        frameId = window.requestAnimationFrame(tick);
        return;
      }
      ctx.clearRect(0, 0, w, h);
      var i;
      for (i = 0; i < lines.length; i++) {
        var L = lines[i];
        L.y += L.speed;
        if (L.y > h + L.len) {
          L.y = -L.len - Math.random() * h * 0.4;
          L.x = Math.random() * w;
          L.speed = 1 + Math.random() * 4.2;
        }
        ctx.strokeStyle = 'rgba(124,58,237,0.15)';
        ctx.lineWidth = L.lw;
        ctx.beginPath();
        ctx.moveTo(L.x, L.y);
        ctx.lineTo(L.x, L.y + L.len);
        ctx.stroke();
      }
      frameId = window.requestAnimationFrame(tick);
    }

    resize();
    var ro = typeof ResizeObserver !== 'undefined' ? new ResizeObserver(resize) : null;
    if (ro) ro.observe(section);
    window.addEventListener('resize', resize);

    frameId = window.requestAnimationFrame(tick);

    return function cleanup() {
      window.cancelAnimationFrame(frameId);
      if (ro) ro.disconnect();
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <div className={styles.page}>
      <div className={styles.pageFallingLayer} aria-hidden="true">
        <FallingPattern
          color="rgba(124, 58, 237, 0.4)"
          backgroundColor="#0a0a0a"
          duration={150}
          blurIntensity="1em"
          density={1}
          className={styles.pageFallingInner}
        />
      </div>
      <main className={styles.pageMain}>
        <section className={styles.hero} ref={heroSectionRef}>
          <canvas className={styles.heroCanvas} ref={heroCanvasRef} aria-hidden="true" />
          <div className={styles.heroCanvasOverlay} aria-hidden="true" />

          <div className={styles.heroInner}>
            <div className={styles.heroScrollSlot}>
              <ContainerScroll
                titleComponent={
                  <div>
                    <p className={styles.heroBadge}>⚡ Entrega en máximo 3 días</p>
                    <h1 className={styles.heroTitle}>
                      Tu negocio necesita
                      <br />
                      <span className={styles.heroTitleLine2}>
                        una página <span className={styles.heroTitleGradient}>que venda</span>
                      </span>
                    </h1>
                    <p className={styles.heroScrollCaption}>
                      Una página pensada para convertir visitas en ventas — en celular y en escritorio.
                    </p>
                  </div>
                }
              >
                <div className={styles.tabletScrollInner}>
                  <div className={styles.deviceChrome}>
                    <div className={styles.deviceTraffic}>
                      <span className={styles.dotRed} aria-hidden />
                      <span className={styles.dotYellow} aria-hidden />
                      <span className={styles.dotGreen} aria-hidden />
                    </div>
                    <div className={styles.deviceUrlBar} aria-hidden="true">
                      cravburgers.shop
                    </div>
                  </div>
                  <div className={styles.deviceIframeWrap}>
                    <HeroTabletPreview />
                    <a
                      className={styles.deviceStaticLink}
                      href={CRAV_SITE_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Abrir cravburgers.shop en pestaña nueva ↗
                    </a>
                  </div>
                </div>
              </ContainerScroll>
            </div>

            <div className={styles.heroContent}>
              <p className={styles.heroSub}>
                Diseño profesional desde $200.000 COP.
                <br />
                Trato claro por WhatsApp, sin vueltas.
              </p>

              <div className={styles.heroButtons}>
                <a className={styles.btnWhatsAppHero} href={WA_PRIMARY} target="_blank" rel="noopener noreferrer">
                  Escribir por WhatsApp →
                </a>
                <a className={styles.btnGhostHero} href="#ejemplos">
                  Ver ejemplos
                </a>
              </div>

              <ul className={styles.heroStats} aria-label="Beneficios rápidos">
                <li>⚡ 3 días máximo</li>
                <li>🔄 1 ajuste incluido</li>
              </ul>
            </div>
          </div>
        </section>

        <div className={styles.trustStrip} role="region" aria-label="Por qué confiar">
          <div className={styles.trustStripInner}>
            {TRUST_PILLS.map(function (pill) {
              return (
                <div key={pill.text} className={styles.trustPill}>
                  <span className={styles.trustPillIcon} aria-hidden="true">
                    {pill.icon}
                  </span>
                  <span className={styles.trustPillText}>{pill.text}</span>
                </div>
              );
            })}
          </div>
        </div>

        <section className={styles.sectionIncludes} aria-labelledby="includes-heading">
          <div className={styles.container}>
            <h2 id="includes-heading" className={styles.sectionTitle}>
              Todo lo que necesitas, sin pagar de más
            </h2>
            <div className={styles.includeGrid}>
              {INCLUDE_CARDS.map(function (item) {
                return (
                  <article key={item.title} className={styles.includeCard}>
                    <span className={styles.includeIcon} aria-hidden>
                      {item.icon}
                    </span>
                    <h3 className={styles.includeCardTitle}>{item.title}</h3>
                    <p className={styles.includeCardText}>{item.text}</p>
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        <section className={styles.sectionExamples} id="ejemplos" aria-labelledby="examples-heading">
          <div className={styles.container}>
            <h2 id="examples-heading" className={styles.carouselSectionTitle}>
              Estas landings ya venden. La tuya puede ser la próxima.
            </h2>
            <p className={styles.carouselSectionSub}>Landings que convierten para cada nicho</p>

            <div
              className={styles.vitrinaShowcase}
              onMouseEnter={function () {
                setPaused(true);
              }}
              onMouseLeave={function () {
                setPaused(false);
              }}
            >
              <div className={styles.vitrinaWrap}>
                <div className={styles.vitrinaStageBlock}>
                  <button
                    type="button"
                    className={styles.vitrinaArrow}
                    aria-label="Anterior"
                    onClick={function () {
                      setActive(function (i) {
                        return (i - 1 + VITRINA_ITEMS.length) % VITRINA_ITEMS.length;
                      });
                    }}
                  >
                    ←
                  </button>

                  <div className={styles.vitrinaStage}>
                    {[0, 1, 2, 3, 4].map(function (slot) {
                      var n = VITRINA_ITEMS.length;
                      var slotIndex = (active + slot - 2 + n * 10) % n;
                      var item = VITRINA_ITEMS[slotIndex];
                      var posClass =
                        slot === 0
                          ? styles.vitrinaPos0
                          : slot === 1
                            ? styles.vitrinaPos1
                            : slot === 2
                              ? styles.vitrinaPos2
                              : slot === 3
                                ? styles.vitrinaPos3
                                : styles.vitrinaPos4;
                      return (
                        <div key={slot} className={styles.vitrinaPhoneItem + ' ' + posClass}>
                          <div className={styles.vitrinaPhoneFrame}>
                          <div className={styles.vitrinaStatusBar}>
                            <span className={styles.vitrinaStatusTime}>4:16</span>
                            <div className={styles.vitrinaNotch} aria-hidden />
                            <span className={styles.vitrinaStatusIcons} aria-hidden>
                              ▐▐ ≋ ▮
                            </span>
                          </div>
                          <div className={styles.vitrinaScreen}>
                            <img
                              src={item.src}
                              alt=""
                              className={styles.vitrinaScreenImg}
                              draggable={false}
                            />
                          </div>
                          <div className={styles.vitrinaHomeBar}>
                            <span className={styles.vitrinaHomePill} aria-hidden />
                          </div>
                        </div>
                        <div
                          className={
                            styles.vitrinaSlotLabel +
                            (slot === 2 ? ' ' + styles.vitrinaSlotLabelOn : '')
                          }
                        >
                          <p className={styles.vitrinaSlotName}>{item.name}</p>
                          <p className={styles.vitrinaSlotCat}>{item.category}</p>
                        </div>
                      </div>
                      );
                    })}
                  </div>

                  <button
                    type="button"
                    className={styles.vitrinaArrow + ' ' + styles.vitrinaArrowRight}
                    aria-label="Siguiente"
                    onClick={function () {
                      setActive(function (i) {
                        return (i + 1) % VITRINA_ITEMS.length;
                      });
                    }}
                  >
                    →
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className={styles.sectionWorld} aria-labelledby="world-heading">
          <div className={styles.container}>
            <h2 id="world-heading" className={styles.sectionTitle}>
              Landings para cualquier industria, en cualquier parte del mundo
            </h2>
            <p className={styles.sectionWorldSub}>Colombia o el exterior: mismo estándar para tu negocio.</p>
            <div className={styles.worldGrid}>
              <div className={styles.worldColGlobe}>
                <GlobeWithPins />
              </div>
            </div>
          </div>
        </section>

        <section className={styles.sectionPrice} aria-labelledby="price-heading">
          <div className={styles.containerNarrow}>
            <p className={styles.priceLabel}>Inversión única</p>
            <p className={styles.priceStruck}>$350.000</p>
            <p className={styles.priceReal}>$200.000 COP</p>
            <ul className={styles.priceList}>
              {PRICE_CHECKS.map(function (line) {
                return (
                  <li key={line} className={styles.priceLi}>
                    <span className={styles.priceCheck} aria-hidden>
                      ✓
                    </span>
                    {line}
                  </li>
                );
              })}
            </ul>
            <p className={styles.priceNote}>* Dominio y hosting no incluidos</p>
            <a className={styles.btnPriceCta} href={WA_PRIMARY} target="_blank" rel="noopener noreferrer">
              Quiero mi landing ahora →
            </a>
          </div>
        </section>

        <section className={styles.sectionTestimonial} aria-labelledby="testimonial-heading">
          <div className={styles.containerNarrow}>
            <p className={styles.testimonialKicker}>Lo que cuenta quien ya pasó por el proceso</p>
            <blockquote className={styles.testimonialCard}>
              <p id="testimonial-heading" className={styles.testimonialQuote}>
                “{HOME_TESTIMONIAL.quote}”
              </p>
              <footer className={styles.testimonialFooter}>
                <strong className={styles.testimonialName}>{HOME_TESTIMONIAL.name}</strong>
                <span className={styles.testimonialRole}>{HOME_TESTIMONIAL.role}</span>
              </footer>
            </blockquote>
          </div>
        </section>

        <section className={styles.sectionProcess} aria-labelledby="process-heading">
          <div className={styles.container}>
            <h2 id="process-heading" className={styles.sectionTitle}>
              Así de fácil funciona
            </h2>
            <ol className={styles.processList}>
              {PROCESS_STEPS.map(function (step) {
                return (
                  <li key={step.title} className={styles.processStep}>
                    <span className={styles.processIcon} aria-hidden>
                      {step.icon}
                    </span>
                    <div className={styles.processBody}>
                      <h3 className={styles.processTitle}>{step.title}</h3>
                      <p className={styles.processText}>{step.text}</p>
                    </div>
                  </li>
                );
              })}
            </ol>
          </div>
        </section>

        <section className={styles.sectionOrbit} aria-labelledby="orbit-tech-heading">
          <div className={styles.container}>
            <h2 id="orbit-tech-heading" className={styles.sectionTitle}>
              Construido con tecnología de primer nivel
            </h2>
            <p className={styles.sectionOrbitSub}>
              Las mismas herramientas que usan las empresas más grandes del mundo
            </p>
            <div className={styles.orbitGrid}>
              <div className={styles.orbitTextCol}>
                <h3 className={styles.orbitHeading}>Tu landing, construida para vender</h3>
                <p className={styles.orbitBody}>
                  Usamos las tecnologías más modernas para que tu página cargue rápido, se vea increíble
                  y convierta visitantes en clientes.
                </p>
                <a className={styles.orbitCtaWhats} href={WA_PRIMARY} target="_blank" rel="noopener noreferrer">
                  Escribir por WhatsApp →
                </a>
              </div>
              <div className={styles.orbitVisualCol}>
                <OrbitIconsField />
              </div>
            </div>
          </div>
        </section>

        <section className={styles.sectionFinalCta} aria-labelledby="final-cta-heading">
          <h2 id="final-cta-heading" className={styles.finalCtaTitle}>
            ¿Listo para vender más?
          </h2>
          <p className={styles.finalCtaSub}>Escríbenos hoy y en 3 días tienes tu página lista.</p>
          <a className={styles.btnFinalWhatsApp} href={WA_PRIMARY} target="_blank" rel="noopener noreferrer">
            Escribir por WhatsApp →
          </a>
          <p className={styles.finalCtaHint}>
            WhatsApp +57 310 5813007 · Respuesta en menos de 1 hora 🕐
          </p>
        </section>
      </main>

      <footer className={styles.footer}>
        <p className={styles.footerText}>Fluxa · Colombia</p>
      </footer>
    </div>
  );
}
