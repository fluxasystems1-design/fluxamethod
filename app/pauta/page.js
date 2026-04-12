'use client';

import { useEffect, useRef } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useReveal, useFaqAccordion } from '@/lib/landingEffects';
import styles from './page.module.css';

const Ico = {
  target: String.fromCodePoint(0x1f3af),
  play: '\u25b6',
  chart: String.fromCodePoint(0x1f4ca),
  dart: String.fromCodePoint(0x1f3af),
};

function VideoPlaceholder({ small }) {
  return (
    <div className={`${styles.videoBox} ${small ? styles.videoBoxSm : ''}`}>
      <button type="button" className={styles.playCircle} aria-label="Reproducir video (placeholder)">
        <span className={styles.playTri} aria-hidden />
      </button>
      <span className={styles.videoPlaceholderLabel}>Reemplazá por tu VSL o embed de YouTube / Vimeo</span>
    </div>
  );
}

function ProofScreenshot({ tag }) {
  return (
    <div className={styles.proofMock} aria-hidden>
      <div className={styles.proofMockTop}>
        <span className={styles.proofMockDot} />
        <span className={styles.proofMockDot} />
        <span className={styles.proofMockDot} />
        <span className={styles.proofMockTitle}>Meta Ads · resultado</span>
      </div>
      <div className={styles.proofMockBody}>
        <div className={`${styles.proofMockRow} ${styles.proofMockRowAccent}`} />
        <div className={`${styles.proofMockRow} ${styles.proofMockRowMid}`} />
        <div className={`${styles.proofMockRow} ${styles.proofMockRowShort}`} />
        <div className={styles.proofMockBars}>
          <span className={styles.proofMockBar} />
          <span className={styles.proofMockBar} />
          <span className={styles.proofMockBar} />
          <span className={styles.proofMockBar} />
        </div>
      </div>
      <div className={styles.proofMockBadge}>{tag}</div>
    </div>
  );
}

export default function PautaLandingPage() {
  useReveal();
  useFaqAccordion();

  const chartRef = useRef(null);

  useEffect(() => {
    var el = chartRef.current;
    if (!el) return undefined;

    var io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            el.setAttribute('data-chart-ready', 'true');
            io.disconnect();
          }
        });
      },
      { threshold: 0.25 }
    );

    io.observe(el);
    return function () {
      io.disconnect();
    };
  }, []);

  return (
    <div className={styles.wrap}>
      <Navbar ctaHref="#cta-final" ctaLabel="QUIERO CLIENTES →" ctaLabelMobile="Clientes →" />

      {/* 1 — Hero */}
      <section className={styles.hero} data-reveal id="inicio">
        <div className={styles.containerNarrow}>
          <div className={styles.badge}>
            <span aria-hidden>{Ico.target}</span>
            <span>Fluxa Pauta — El método que sí convierte</span>
          </div>
          <h1 className={styles.heroH1}>
            Descubrí cómo conseguir clientes todos los meses haciendo pauta para negocios con el{' '}
            <span>Método Fluxa Ads</span>
          </h1>
          <p className={styles.heroVideoHint}>
            <span className={styles.playIconPulse} aria-hidden>
              {Ico.play}
            </span>{' '}
            Mirá el video abajo para entender cómo funciona
          </p>
          <p className={styles.trustStrip}>
            <span>150+ campañas gestionadas</span>
            <span className={styles.trustSep}>·</span>
            <span>ROAS promedio 4.2x</span>
            <span className={styles.trustSep}>·</span>
            <span>Pauta con método, no a ciegas</span>
          </p>
        </div>
        <VideoPlaceholder />
        <div className={styles.containerNarrow}>
          <p className={styles.heroFootnote}>
            Esta es tu oportunidad de tener un sistema de pauta que genera clientes reales.
          </p>
          <a href="#cta-final" className={styles.ctaMega}>
            QUIERO CLIENTES CON PAUTA AHORA →
          </a>
          <div className={styles.scrollHint} aria-hidden="true">
            ↓
          </div>
        </div>
      </section>

      {/* 2 — Prueba social */}
      <section className={`${styles.section} ${styles.sectionDark}`} data-reveal id="resultados">
        <div className={styles.container}>
          <span className={styles.labelTeal}>LOS RESULTADOS HABLAN SOLOS</span>
          <h2 className={styles.h2}>Mirá los resultados de nuestros clientes</h2>
          <div className={styles.proofGrid}>
            {[
              ['Camila Rodríguez', 'ROAS 5.2x en 30 días'],
              ['Andrés Morales', 'CAC reducido 60%'],
              ['Valentina Cruz', '+320 leads en mes 1'],
              ['Diego Herrera', 'Ventas x3 con mismo presupuesto'],
            ].map(([name, tag]) => (
              <div key={name} className={styles.proofItem}>
                <div className={styles.proofCard}>
                  <ProofScreenshot tag={tag} />
                </div>
                <div className={styles.proofName}>{name}</div>
                <div className={styles.proofRole}>Cliente Fluxa Ads</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3 — Para quién */}
      <section className={`${styles.section} ${styles.sectionSurface}`} data-reveal id="servicios">
        <div className={styles.container}>
          <div className={styles.twoCol}>
            <div>
              <span className={`${styles.labelTeal} ${styles.labelTealLeft}`}>¿PARA QUIÉN ES ESTO?</span>
              <h2 className={`${styles.h2} ${styles.h2Left}`}>Pauta que genera ventas reales para tu negocio</h2>
              <p className={`${styles.sub} ${styles.subLeft}`}>Este servicio es la solución definitiva para vos si…</p>
              <ul className={styles.checkList}>
                <li>Querés clientes nuevos todos los meses de forma predecible</li>
                <li>Ya invertiste en pauta y no viste resultados reales</li>
                <li>Querés escalar tu negocio sin depender del voz a voz</li>
                <li>Estás listo para tener un sistema de captación que funcione solo</li>
                <li>Querés entender exactamente en qué se gasta tu presupuesto</li>
              </ul>
            </div>
            <div ref={chartRef} className={styles.chartCard} data-chart-ready="false">
              <p className={styles.chartTitle}>Crecimiento típico de clientes Fluxa Ads</p>
              <div className={styles.chartBars}>
                <div className={styles.barCol}>
                  <div className={`${styles.bar} ${styles.bar1}`} />
                  <span className={styles.barLabel}>Mes 1</span>
                </div>
                <div className={styles.barCol}>
                  <div className={`${styles.bar} ${styles.bar2}`} />
                  <span className={styles.barLabel}>Mes 2</span>
                </div>
                <div className={styles.barCol}>
                  <div className={`${styles.bar} ${styles.bar3}`} />
                  <span className={styles.barLabel}>Mes 3</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4 — Video método */}
      <section className={`${styles.section} ${styles.sectionSurface2}`} data-reveal id="metodo-video">
        <div className={styles.container}>
          <div className={styles.row2}>
            <div>
              <span className={`${styles.labelTeal} ${styles.labelTealLeft}`}>{Ico.dart} CONOCÉ EL MÉTODO</span>
              <VideoPlaceholder small />
            </div>
            <div>
              <span className={`${styles.labelTeal} ${styles.labelTealLeft}`}>FLUXA ADS METHOD</span>
              <h2 className={`${styles.h2} ${styles.h2Left}`}>El sistema que usamos para generar resultados consistentes</h2>
              <p className={`${styles.sub} ${styles.subLeft}`} style={{ marginBottom: 0 }}>
                No es magia. Es un proceso probado de 5 pasos que aplicamos en cada cliente para garantizar que cada peso
                invertido en pauta trabaje al máximo.
              </p>
              <a href="#como-funciona" className={styles.ctaGhost}>
                Ver cómo funciona ↓
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* 5 — Proceso */}
      <section className={`${styles.section} ${styles.sectionDark}`} data-reveal id="como-funciona">
        <div className={styles.container}>
          <span className={styles.labelTeal}>EL MÉTODO FLUXA ADS</span>
          <h2 className={styles.h2}>Así generamos resultados predecibles con pauta</h2>
          <div className={styles.timeline}>
            {[
              ['Auditoría y diagnóstico', 'Analizamos tu negocio, competencia y oportunidades de mercado antes de gastar un peso.'],
              ['Estrategia de audiencias', 'Identificamos exactamente quién es tu cliente ideal y cómo encontrarlo en Meta y Google.'],
              ['Creativos que convierten', 'Diseñamos los anuncios con copy e imagen optimizados para detener el scroll y generar acción.'],
              ['Optimización continua', 'Monitoreamos diariamente y optimizamos para maximizar el ROAS semana a semana.'],
              ['Escalado inteligente', 'Cuando algo funciona, lo escalamos. Tu inversión crece junto con tus resultados.'],
            ].map(([title, desc], i) => (
              <div key={title} className={styles.timelineStep}>
                <span className={styles.stepDot} aria-hidden />
                <div className={styles.stepBody}>
                  <div className={styles.stepNum}>{String(i + 1).padStart(2, '0')}</div>
                  <h3>{title}</h3>
                  <p>{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6 — Métricas */}
      <section className={`${styles.section} ${styles.sectionSurface}`} data-reveal id="metricas">
        <div className={styles.container}>
          <h2 className={styles.h2}>Las métricas que importan. No las que se ven bonitas.</h2>
          <p className={styles.sub}>Olvidate de los likes y los alcances. Esto es lo que medimos:</p>
          <div className={styles.metricGrid}>
            {[
              ['ROAS', 'Retorno publicitario', 'Retorno por cada peso invertido'],
              ['CPL', 'Costo por lead', 'Costo por lead generado'],
              ['CTR', 'Clics / impresiones', 'Tasa de clics del anuncio'],
              ['CPA', 'Costo por acción', 'Costo por adquisición'],
              ['CONV.', 'Conversiones', 'Acciones reales, no vanidad'],
              ['CAC', 'Cliente nuevo', 'Costo de adquisición de cliente'],
            ].map(([code, name, desc]) => (
              <div key={code} className={styles.metricCard}>
                <div className={styles.metricVal}>{code}</div>
                <div className={styles.metricName}>{name}</div>
                <p className={styles.metricDesc}>{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7 — Precios */}
      <section
        className={`${styles.section} ${styles.sectionDark}`}
        data-reveal
        id="planes"
        style={{
          background: 'linear-gradient(180deg, #050a08 0%, #071510 50%, #050a08 100%)',
        }}
      >
        <div className={styles.container}>
          <h2 className={styles.h2}>Empezá a invertir con estrategia</h2>
          <p className={styles.sub}>Sin contratos trampa. Sin resultados prometidos sin base.</p>
          <div className={styles.pricingGrid}>
            <div className={styles.priceCard}>
              <div className={styles.priceTitle}>LAUNCH</div>
              <div className={styles.priceAmt}>$297/mes</div>
              <p className={styles.priceSub}>Para negocios que quieren empezar a pautar bien</p>
              <ul className={styles.priceList}>
                <li>Gestión de hasta $500 en pauta mensual</li>
                <li>2 campañas activas simultáneas</li>
                <li>Creativos básicos incluidos</li>
                <li>Reporte semanal</li>
                <li>Soporte por WhatsApp</li>
              </ul>
              <div className={styles.priceBtn}>
                <a href="#cta-final" className={styles.priceBtnGhost}>
                  QUIERO EMPEZAR →
                </a>
              </div>
            </div>
            <div className={`${styles.priceCard} ${styles.pricePopular}`}>
              <span className={styles.badgePopular}>⭐ MÁS POPULAR</span>
              <div className={styles.priceTitle}>SCALE</div>
              <div className={styles.priceAmt}>$497/mes</div>
              <div className={styles.priceWas}>ANTES: $697</div>
              <p className={styles.priceSub}>Para negocios listos para crecer con pauta constante</p>
              <ul className={styles.priceList}>
                <li>Gestión de hasta $2.000 en pauta mensual</li>
                <li>Campañas ilimitadas</li>
                <li>Creativos profesionales incluidos</li>
                <li>Optimización diaria</li>
                <li>Reporte semanal + reunión mensual</li>
                <li>A/B testing continuo</li>
              </ul>
              <div className={styles.priceBtn}>
                <a href="#cta-final" className={styles.priceBtnPrimary}>
                  QUIERO ESCALAR →
                </a>
              </div>
            </div>
            <div className={styles.priceCard}>
              <div className={styles.priceTitle}>PRO</div>
              <div className={styles.priceAmt}>$797/mes</div>
              <p className={styles.priceSub}>Para negocios que quieren escalar sin límites</p>
              <ul className={styles.priceList}>
                <li>Presupuesto de pauta ilimitado</li>
                <li>Estrategia omnicanal (Meta + Google)</li>
                <li>Creativos premium + video</li>
                <li>Auditoría mensual completa</li>
                <li>Consultoría estratégica incluida</li>
              </ul>
              <div className={styles.priceBtn}>
                <a href="#cta-final" className={styles.priceBtnGhost}>
                  HABLAR CON UN ASESOR →
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 8 — FAQ */}
      <section className={`${styles.section} ${styles.sectionSurface}`} data-reveal id="faq">
        <div className={styles.container}>
          <h2 className={styles.h2}>Preguntas frecuentes</h2>
          <div className={styles.faq} data-faq-root>
            {[
              {
                q: '¿Cuánto presupuesto necesito para empezar?',
                a: 'Con $200-300 USD al mes ya podés empezar a generar resultados. Lo importante no es el presupuesto inicial sino la estrategia detrás. Nosotros te asesoramos sobre cuánto invertir según tu objetivo.',
              },
              {
                q: '¿Cuánto tiempo tarda en verse resultados?',
                a: 'Los primeros datos los tenés en la semana 1. Resultados optimizados generalmente se ven entre el día 14 y 30. El mes 2 y 3 es donde la pauta realmente empieza a escalar.',
              },
              {
                q: '¿Trabajan con Meta Ads, Google Ads o los dos?',
                a: 'Trabajamos con ambos. La estrategia define qué plataforma usar según tu negocio. Para la mayoría de negocios B2C empezamos con Meta. Para B2B solemos ir con Google.',
              },
              {
                q: '¿Qué pasa si no veo resultados?',
                a: 'Primero hacemos un diagnóstico honesto antes de empezar. Si vemos que tu negocio no está listo para pauta, te lo decimos. No prometemos magia — prometemos proceso y optimización continua.',
              },
              {
                q: '¿Incluye la creación de los anuncios?',
                a: 'Sí. Diseñamos los creativos (imagen y copy) incluidos en todos los planes. En el plan PRO incluimos también producción de video.',
              },
              {
                q: '¿Puedo pausar o cancelar?',
                a: 'Sí. Sin penalizaciones. El mes 1 es de setup y primeras campañas. A partir del mes 2 podés pausar cuando quieras.',
              },
            ].map((item, i) => (
              <div key={i} className={styles.faqItem} data-faq-item data-open="false">
                <button type="button" className={styles.faqQuestion} aria-expanded="false" data-faq-trigger>
                  {item.q}
                  <span aria-hidden="true">+</span>
                </button>
                <div className={styles.faqPanel} data-faq-panel>
                  <p>{item.a}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 9 — CTA final */}
      <section className={styles.ctaFinal} data-reveal id="cta-final">
        <h2>Tu próxima campaña puede tener ROAS positivo desde la semana 1</h2>
        <p>Más de 150 campañas gestionadas. Resultados reales para negocios reales.</p>
        <a href="mailto:contacto@fluxasystems.com?subject=Clientes%20con%20pauta%20Fluxa" className={`${styles.ctaMega} ${styles.ctaMegaLg}`}>
          QUIERO CLIENTES CON PAUTA AHORA →
        </a>
        <p className={styles.trustLine}>
          ✅ Sin contrato mínimo | ✅ Auditoría gratuita | ✅ Resultados desde semana 1
        </p>
      </section>

      <Footer />
    </div>
  );
}
