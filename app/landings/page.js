'use client';

import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useReveal, useFaqAccordion } from '@/lib/landingEffects';
import styles from './page.module.css';

export default function LandingsLandingPage() {
  useReveal();
  useFaqAccordion();

  const h3 = { margin: '0 0 8px', fontFamily: "'Space Grotesk', sans-serif", fontWeight: 900 };
  const p = { margin: 0, color: 'rgba(255,255,255,0.72)', fontSize: '0.95rem', lineHeight: 1.5 };

  return (
    <div className={styles.wrap}>
      <div className={styles.topBar}>⚡ Landing promedio entregada en 7 días</div>
      <Navbar ctaHref="#cta-final" ctaLabel="Quiero mi landing ahora →" ctaLabelMobile="Landing →" />

      <section className={styles.hero} data-reveal>
        <div className={styles.container}>
          <h1 className={styles.heroH1}>
            Una landing bien hecha vale más que <span>1.000 posts en redes.</span>
          </h1>
          <p className={styles.heroSub}>
            Páginas de venta diseñadas para convertir. Con automatizaciones que trabajan solas.
          </p>
          <div className={styles.heroCtas}>
            <a href="#cta-final" className={styles.ctaPrimary}>
              Quiero mi landing ahora →
            </a>
            <a href="#que-es" className={styles.ctaGhost}>
              Ver qué incluye ↓
            </a>
          </div>
          <div className={styles.stats}>
            <span>🌐 +80 landings entregadas</span>
            <span>📈 Conversión promedio 8.3%</span>
            <span>⚡ 7 días de entrega</span>
          </div>
        </div>
      </section>

      <section className={`${styles.section} ${styles.sectionAlt}`} data-reveal id="dolor">
        <div className={styles.container}>
          <h2 className={styles.h2}>¿Te pasa esto con tu presencia online?</h2>
          <ul className={styles.painList}>
            <li>✗ Tenés redes pero no tenés dónde mandar el tráfico</li>
            <li>✗ Tu web tarda en cargar y la gente se va</li>
            <li>✗ No sabés si tu página está convirtiendo o no</li>
            <li>✗ Cada vez que querés cambiar algo dependés de alguien</li>
            <li>✗ Tus links de bio no llevan a ningún lado útil</li>
          </ul>
        </div>
      </section>

      <section className={styles.section} data-reveal id="que-es">
        <div className={styles.container}>
          <h2 className={styles.h2}>Qué es una landing que vende</h2>
          <p className={styles.lead}>No es una web “linda”. Es un sistema enfocado en una sola acción: vender o captar.</p>
          <div className={styles.grid3}>
            <div className={styles.card}>
              <div className={styles.cardIcon}>🎯</div>
              <h3>Una promesa clara arriba de todo</h3>
              <p>En 3 segundos el visitante entiende qué ofrecés y por qué debería quedarse.</p>
            </div>
            <div className={styles.card}>
              <div className={styles.cardIcon}>⚙️</div>
              <h3>Estructura probada, no decoración</h3>
              <p>Secciones ordenadas para educar, quitar objeciones y pedir la acción en el momento justo.</p>
            </div>
            <div className={styles.card}>
              <div className={styles.cardIcon}>📲</div>
              <h3>Conectada a WhatsApp y tu CRM</h3>
              <p>Cada lead entra en un flujo automático para que nada se pierda en el inbox.</p>
            </div>
          </div>
        </div>
      </section>

      <section className={`${styles.section} ${styles.sectionAlt}`} data-reveal id="servicios">
        <div className={styles.container}>
          <h2 className={styles.h2}>Servicios</h2>
          <p className={styles.lead}>Todo lo que podemos construir alrededor de tu oferta.</p>
          <div className={styles.svcGrid}>
            {[
              ['🛍️', 'Landing de producto o servicio'],
              ['📇', 'Landing de captura de leads'],
              ['🔗', 'Página de link in bio optimizada'],
              ['💬', 'Automatización WhatsApp integrada'],
              ['📦', 'Flujo de pedidos conectado'],
              ['✉️', 'Seguimiento post-venta'],
            ].map(([icon, text]) => (
              <div key={text} className={styles.svcItem}>
                <span className={styles.svcIcon} aria-hidden>
                  {icon}
                </span>
                <span style={{ fontWeight: 600, lineHeight: 1.45 }}>{text}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.section} data-reveal id="proceso">
        <div className={styles.container}>
          <h2 className={styles.h2}>Proceso</h2>
          <p className={styles.lead}>Cuatro etapas claras hasta el lanzamiento.</p>
          <div className={styles.timeline}>
            {[
              ['01', 'Briefing', 'Objetivo, oferta, público y palabras que usa tu cliente ideal.'],
              ['02', 'Diseño', 'Wireframe y UI mobile-first alineada a tu marca.'],
              ['03', 'Desarrollo', 'Implementación veloz, formularios, tracking y automatizaciones.'],
              ['04', 'Lanzamiento', 'Pruebas, métricas y ajustes para subir conversión desde el día 1.'],
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

      <section className={styles.mockSection} data-reveal id="mockup">
        <div className={styles.container}>
          <div className={styles.mockRow}>
            <div className={styles.mockCopy}>
              <h2>Mockup visual</h2>
              <p>Cada landing se diseña desde cero para tu negocio. Estructura, mensaje y estética alineados a conversión.</p>
            </div>
            <div className={styles.device} aria-hidden>
              <div className={styles.deviceInner}>
                <div className={styles.deviceNotch} />
                <div className={styles.mockScreen}>
                  <div className={styles.mockHeroBar} />
                  <div className={styles.mockBlock} />
                  <div className={`${styles.mockBlock} ${styles.mockBlockWide}`} />
                  <div className={styles.mockBlock} />
                  <div className={styles.mockCta} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className={`${styles.section} ${styles.sectionAlt}`} data-reveal id="planes">
        <div className={styles.container}>
          <h2 className={styles.h2}>Precios</h2>
          <div className={styles.pricing}>
            <div className={styles.priceCard}>
              <div className={styles.priceTitle}>BÁSICA</div>
              <div className={styles.priceAmt}>$297</div>
              <p className={styles.priceList}>Landing simple + formulario + dominio + hosting 1 año</p>
            </div>
            <div className={`${styles.priceCard} ${styles.popular}`}>
              <span className={styles.badgePop}>⭐ PROFESIONAL</span>
              <div className={styles.priceTitle}>PROFESIONAL</div>
              <div className={styles.priceAmt}>$597</div>
              <p className={styles.priceList}>Landing completa + automatización WhatsApp + CRM básico</p>
            </div>
            <div className={styles.priceCard}>
              <div className={styles.priceTitle}>SISTEMA</div>
              <div className={styles.priceAmt}>$997</div>
              <p className={styles.priceList}>Landing + ecommerce + automatizaciones completas + soporte 3 meses</p>
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
                q: '¿Incluye dominio y hosting?',
                a: 'En el plan BÁSICA incluimos dominio y hosting por 1 año. En superiores lo coordinamos según tu infraestructura.',
              },
              {
                q: '¿Puedo editar textos después?',
                a: 'Sí. Entregamos documentación breve o te dejamos el contenido en un sistema que podás actualizar.',
              },
              {
                q: '¿Se integra con mi CRM?',
                a: 'Profesional y Sistema incluyen integraciones con herramientas habituales y webhooks.',
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
        <h2>Tu landing puede estar lista en 7 días</h2>
        <a href="mailto:contacto@fluxasystems.com?subject=Landings%20que%20Venden" className={styles.ctaPrimary}>
          Empezar mi proyecto →
        </a>
      </section>

      <Footer />
    </div>
  );
}
