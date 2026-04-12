'use client';

import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useReveal, useFaqAccordion } from '@/lib/landingEffects';
import styles from './page.module.css';

export default function EmpresasLandingPage() {
  useReveal();
  useFaqAccordion();

  const h3 = { margin: '0 0 8px', fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700 };
  const p = { margin: 0, color: 'rgba(255,255,255,0.72)', fontSize: '0.95rem', lineHeight: 1.5 };

  return (
    <div className={styles.wrap}>
      <div className={styles.topBar}>🏢 Marketing B2B especializado para empresas en crecimiento</div>
      <Navbar
        ctaHref="#cta-final"
        ctaLabel="Agendar diagnóstico empresarial →"
        ctaLabelMobile="Empresas →"
      />

      <section className={styles.hero} data-reveal>
        <div className={styles.container}>
          <h1 className={styles.heroH1}>
            Tu empresa necesita más que una web. <span>Necesita un sistema de captación.</span>
          </h1>
          <p className={styles.heroSub}>
            Estrategia digital completa para empresas que quieren crecer de forma predecible y escalable.
          </p>
          <div className={styles.heroCtas}>
            <a href="#cta-final" className={styles.ctaPrimary}>
              Agendar diagnóstico empresarial →
            </a>
            <a href="#servicios" className={styles.ctaGhost}>
              Ver servicios B2B ↓
            </a>
          </div>
          <div className={styles.stats}>
            <span>🏢 +20 empresas</span>
            <span>📊 ROI promedio 3.8x</span>
            <span>🤝 Contratos B2B cerrados</span>
          </div>
        </div>
      </section>

      <section className={`${styles.section} ${styles.sectionAlt}`} data-reveal id="dolor">
        <div className={styles.container}>
          <h2 className={styles.h2}>Dolor típico en marketing B2B</h2>
          <ul className={styles.painList}>
            <li>✗ Tu web corporativa existe pero no genera leads</li>
            <li>✗ Dependés de referidos para conseguir clientes nuevos</li>
            <li>✗ No tenés sistema para nutrir prospectos</li>
            <li>✗ Tu competencia aparece primero en búsquedas de tu sector</li>
            <li>✗ No medís el ROI de tu inversión en marketing</li>
          </ul>
        </div>
      </section>

      <section className={styles.section} data-reveal id="diferencia">
        <div className={styles.container}>
          <h2 className={styles.h2}>Por qué el B2B no es como el B2C</h2>
          <p className={styles.lead}>
            En empresa a empresa, la venta es conversación prolongada: más filtros, más responsables y más necesidad de
            contenido que educa.
          </p>
          <div className={styles.grid3}>
            <div className={styles.card}>
              <div className={styles.cardIcon}>⏳</div>
              <h3>Ciclos de venta largos</h3>
              <p>El lead no compra hoy: hay instancias técnicas, legal y financiera. Hay que acompañar cada etapa.</p>
            </div>
            <div className={styles.card}>
              <div className={styles.cardIcon}>👥</div>
              <h3>Decisiones en comité</h3>
              <p>Varios stakeholders leen tus piezas. El mensaje debe ser claro para quien usa y quien aprueba.</p>
            </div>
            <div className={styles.card}>
              <div className={styles.cardIcon}>📚</div>
              <h3>Contenido especializado</h3>
              <p>Whitepapers, casos y demos importan más que promos livianas. Hablamos en el idioma del sector.</p>
            </div>
          </div>
        </div>
      </section>

      <section className={`${styles.section} ${styles.sectionAlt}`} data-reveal id="servicios">
        <div className={styles.container}>
          <h2 className={styles.h2}>Servicios B2B</h2>
          <p className={styles.lead}>Capas que podés combinar según madurez digital y ticket.</p>
          <div className={styles.b2bGrid}>
            {[
              ['📑', 'Estrategia de contenido por industria'],
              ['💼', 'LinkedIn Ads y Google Ads B2B'],
              ['🌐', 'Landing de captación de leads empresariales'],
              ['✉️', 'Email marketing y nurturing automatizado'],
              ['🗂️', 'CRM y seguimiento de prospectos'],
              ['📈', 'Reportes ejecutivos mensuales'],
            ].map(([icon, text]) => (
              <div key={text} className={styles.card}>
                <div className={styles.cardIcon}>{icon}</div>
                <h3>{text}</h3>
                <p style={{ margin: 0, color: 'rgba(255,255,255,0.68)', fontSize: '0.9rem', lineHeight: 1.5 }}>
                  Diseñado para equipos que necesitan previsibilidad, no solo tráfico.
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.section} data-reveal id="proceso">
        <div className={styles.container}>
          <h2 className={styles.h2}>Proceso B2B</h2>
          <p className={styles.lead}>Del diagnóstico al cierre acompañado con datos.</p>
          <div className={styles.timeline}>
            {[
              ['01', 'Diagnóstico', 'Auditoría de canales, ICP y embudo actual frente a la competencia.'],
              ['02', 'Estrategia', 'Objetivos por trimestre, pilares de contenido y presupuestos por canal.'],
              ['03', 'Implementación', 'Activamos landings, campañas, CRM y automatizaciones.'],
              ['04', 'Nurturing', 'Secuencias y contenido para mover MQL a SQL sin fricción.'],
              ['05', 'Optimización y cierre', 'Reportes, reuniones de negocio y ajustes según pipeline real.'],
            ].map(([n, t, d]) => (
              <div key={n} className={styles.timelineStep}>
                <span className={styles.tNum}>{n}</span>
                <div>
                  <h3 style={h3}>{t}</h3>
                  <p style={p}>{d}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className={`${styles.section} ${styles.sectionAlt}`} data-reveal id="sectores">
        <div className={styles.container}>
          <h2 className={styles.h2}>Sectores que atendemos</h2>
          <p className={styles.lead}>Equipos internos pequeños que necesitan un socio estratégico digital.</p>
          <div className={styles.sectorGrid}>
            {['Contabilidad', 'Legal', 'Salud', 'Construcción', 'Tecnología', 'Educación'].map((s) => (
              <div key={s} className={styles.sectorCell}>
                {s}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.section} data-reveal id="planes">
        <div className={styles.container}>
          <h2 className={styles.h2}>Inversión mensual estimada</h2>
          <div className={styles.pricing}>
            <div className={styles.priceCard}>
              <div className={styles.priceTitle}>BÁSICO</div>
              <div className={styles.priceAmt}>$497/mes</div>
              <p className={styles.priceList}>Contenido B2B + LinkedIn orgánico + reportes</p>
            </div>
            <div className={`${styles.priceCard} ${styles.popular}`}>
              <span className={styles.badgePop}>⭐ PROFESIONAL</span>
              <div className={styles.priceTitle}>PROFESIONAL</div>
              <div className={styles.priceAmt}>$797/mes</div>
              <p className={styles.priceList}>Todo + pauta + landing + nurturing automático</p>
            </div>
            <div className={styles.priceCard}>
              <div className={styles.priceTitle}>ENTERPRISE</div>
              <div className={styles.priceAmt}>$1.297/mes</div>
              <p className={styles.priceList}>Sistema completo + CRM + consultoría estratégica mensual</p>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.section} data-reveal id="faq">
        <div className={styles.container}>
          <h2 className={styles.h2}>Preguntas frecuentes</h2>
          <div className={styles.faq} data-faq-root>
            {[
              {
                q: '¿Trabajan con equipos internos de marketing?',
                a: 'Sí. Podemos operar el día a día o complementar a tu equipo con media y performance.',
              },
              {
                q: '¿Qué tan rápido se ven leads B2B?',
                a: 'Depende del ticket y del canal. Suelen aparecer consultas calificadas entre 4 y 8 semanas con buen ICP.',
              },
              {
                q: '¿Integran con nuestro CRM?',
                a: 'Sí. Mapeamos campos, etapas y alertas para que ventas reciba contexto completo.',
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

      <section className={styles.ctaFinal} data-reveal id="cta-final">
        <h2>Agendemos un diagnóstico de 30 minutos sin costo</h2>
        <a href="mailto:contacto@fluxasystems.com?subject=Diagn%C3%B3stico%20empresarial%20B2B" className={styles.ctaPrimary}>
          Agendar diagnóstico →
        </a>
      </section>

      <Footer />
    </div>
  );
}
