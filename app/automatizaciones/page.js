'use client';

import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useReveal, useFaqAccordion } from '@/lib/landingEffects';
import styles from './page.module.css';

/**
 * Imágenes: public/automatizaciones/
 * - hero-mentor.png (retrato recorte, figura autoridad)
 * - phone-screen.png (opcional, interior del mock celular)
 * - mentor-full.jpg (foto grande sección mentor)
 * - galeria-1.jpg, galeria-2.jpg, galeria-3.jpg */
function MediaSlot({ className, label, file }) {
  return (
    <div className={className}>
      <div className={styles.slotInner}>
        <span className={styles.slotHint}>{label}</span>
        <span className={styles.slotPath}>public/automatizaciones/{file}</span>
      </div>
    </div>
  );
}

function PathConnector() {
  return (
    <svg className={styles.pathSvg} viewBox="0 0 4 300" preserveAspectRatio="none" aria-hidden>
      <path
        className={styles.pathStroke}
        d="M2 0 L2 300"
        fill="none"
        stroke="url(#autoGradAutomatizaciones)"
        strokeWidth="2"
        vectorEffect="non-scaling-stroke"
      />
      <defs>
        <linearGradient id="autoGradAutomatizaciones" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#CCFF00" stopOpacity="1" />
          <stop offset="50%" stopColor="#b8e632" stopOpacity="0.75" />
          <stop offset="100%" stopColor="#CCFF00" stopOpacity="1" />
        </linearGradient>
      </defs>
    </svg>
  );
}

export default function AutomatizacionesPage() {
  useReveal();
  useFaqAccordion();

  return (
    <div className={styles.wrap}>
      <div className={styles.topBar}>Automatización real para negocios que ya venden — sin humo</div>
      <Navbar ctaHref="#cta-final" ctaLabel="Quiero automatizar →" ctaLabelMobile="Automatizar →" />

      <section className={styles.hero} data-reveal id="inicio">
        <div className={styles.heroRays} aria-hidden />
        <div className={styles.container}>
          <div className={styles.heroGrid}>
            <div className={styles.heroCopy}>
              <p className={styles.heroKicker}>Fluxa · Automatizaciones</p>
              <h1 className={styles.heroH1}>
                <span className={styles.heroTitleAccent}>EL GRAN SALTO</span>
                <span className={styles.heroTitleRest}>
                  Pasá del <span className={styles.heroHl}>caos manual</span> a un sistema que{' '}
                  <span className={styles.heroHl}>trabaja 24/7</span> por vos.
                </span>
              </h1>
              <p className={styles.heroSub}>
                Conectamos <strong>WhatsApp, CRM, calendarios y correo</strong> para que los leads no se enfríen y cada
                venta deje de depender de tu memoria.
              </p>
              <ul className={styles.heroBullets}>
                <li>Seguimiento instantáneo a cada lead</li>
                <li>Menos tareas repetitivas para tu equipo</li>
                <li>Métricas claras: qué flujo convierte y qué hay que ajustar</li>
                <li>Implementación acompañada, no &quot;PDF y suerte&quot;</li>
              </ul>
              <div className={styles.heroCtas}>
                <a href="#recorrido" className={styles.ctaPrimary}>
                  Ver qué incluye
                </a>
                <a href="#cta-final" className={styles.ctaGhost}>
                  Hablar con el equipo →
                </a>
              </div>
            </div>
            <div className={styles.heroFigure}>
              <div className={styles.heroGlow} aria-hidden />
              <MediaSlot className={styles.imgSlotHero} label="Retrato / mentor o equipo" file="hero-mentor.png" />
              <div className={styles.floatStack} aria-hidden>
                <div className={styles.notifCard}>
                  <span className={styles.notifDot} />
                  <div>
                    <strong>Nueva venta</strong>
                    <span>Orden #4821 · hace 2 min</span>
                  </div>
                </div>
                <div className={`${styles.notifCard} ${styles.notifCardAlt} ${styles.notifMagenta}`}>
                  <span className={styles.notifDot} />
                  <div>
                    <strong>Lead calificado</strong>
                    <span>WhatsApp → CRM sincronizado</span>
                  </div>
                </div>
                <div className={styles.notifCard}>
                  <span className={styles.notifDot} />
                  <div>
                    <strong>Cita confirmada</strong>
                    <span>Recordatorio enviado automático</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className={`${styles.section} ${styles.sectionAlt}`} data-reveal id="resultados">
        <div className={styles.container}>
          <div className={styles.proofGrid}>
            <div className={styles.phoneStage}>
              <div className={styles.phoneFrame}>
                <div className={styles.phoneNotch} />
                <div className={styles.phoneScreen}>
                  <p className={styles.phoneScreenTitle}>Registro de automatización</p>
                  <ul className={styles.logList}>
                    <li>
                      <span className={styles.logOk} /> Lead capturado · formulario web
                    </li>
                    <li>
                      <span className={styles.logOk} /> Etiqueta &quot;interesado&quot; en CRM
                    </li>
                    <li>
                      <span className={styles.logOk} /> Secuencia día 0 enviada
                    </li>
                    <li>
                      <span className={styles.logOk} /> WhatsApp: plantilla aprobada
                    </li>
                    <li>
                      <span className={styles.logPending} /> Reunión agendada (pendiente)
                    </li>
                  </ul>
                  <span className={styles.slotPath}>Opcional: imagen public/automatizaciones/phone-screen.png</span>
                </div>
              </div>
            </div>
            <div className={styles.proofCopy}>
              <p className={styles.proofMega}>+30% más recuperación de leads</p>
              <h2 className={styles.h2Left}>El método detrás del resultado</h2>
              <p className={styles.leadLeft}>
                Cuando los flujos están bien diseñados, <strong>dejás de perder oportunidades</strong> por demora o
                mensajes olvidados. Tu equipo responde mejor tiempos y el cliente siente continuidad.
              </p>
              <p className={styles.proofStat}>
                <span className={styles.proofStatNum}>24/7</span>
                <span className={styles.proofStatLabel}>
                  seguimiento automático en primer contacto, etiquetado en CRM y recordatorios sin intervención manual.
                </span>
              </p>
              <a href="#cta-final" className={styles.ctaPrimary}>
                Quiero un diagnóstico de mis flujos
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.section} data-reveal id="recorrido">
        <div className={styles.container}>
          <h2 className={styles.h2}>¿Qué vas a recibir?</h2>
          <p className={styles.lead}>
            Un recorrido claro: diagnóstico, diseño del flujo, integraciones y puesta en marcha con pruebas reales.
          </p>
          <div className={styles.pathWrap}>
            <PathConnector />
            <div className={styles.pathSteps}>
              <article className={`${styles.pathCard} ${styles.pathCardLeft}`}>
                <span className={styles.pathIcon} aria-hidden />
                <h3>Mapa de procesos</h3>
                <p>Identificamos cuellos de botella: dónde se pierden leads, qué tareas son repetitivas y qué herramientas ya usás.</p>
              </article>
              <article className={`${styles.pathCard} ${styles.pathCardRight}`}>
                <span className={`${styles.pathIcon} ${styles.pathIcon2}`} aria-hidden />
                <h3>Flujos e integraciones</h3>
                <p>Diseñamos disparadores, mensajes y sincronización entre WhatsApp, email, CRM y calendarios según tu operación.</p>
              </article>
              <article className={`${styles.pathCard} ${styles.pathCardLeft}`}>
                <span className={`${styles.pathIcon} ${styles.pathIcon3}`} aria-hidden />
                <h3>Go-live y monitoreo</h3>
                <p>Probamos con casos reales, ajustamos copy y tiempos, y te dejamos documentación para que no dependas de nadie para lo básico.</p>
              </article>
            </div>
          </div>
        </div>
      </section>

      <section className={`${styles.section} ${styles.sectionAlt}`} data-reveal id="servicios">
        <div className={styles.container}>
          <h2 className={styles.h2}>Stack que solemos conectar</h2>
          <div className={styles.tagGrid}>
            {['WhatsApp Business API', 'HubSpot / CRM', 'Google Calendar', 'Make / n8n / Zapier', 'Meta Lead Ads', 'Shopify / pagos', 'Email transaccional'].map(
              (t) => (
                <span key={t} className={styles.tag}>
                  {t}
                </span>
              )
            )}
          </div>
        </div>
      </section>

      <section className={styles.section} data-reveal id="mentor">
        <div className={styles.container}>
          <div className={styles.mentorGrid}>
            <div className={styles.mentorBio}>
              <h2 className={styles.mentorTitle}>
                Conocé a quien diseña <span>tu automatización</span>
              </h2>
              <p>
                En Fluxa combinamos <strong>estrategia comercial</strong> con implementación técnica. No vendemos
                promesas mágicas: priorizamos flujos que impactan ingresos y tiempo del equipo.
              </p>
              <p>
                Trabajamos con pymes y equipos comerciales que ya venden y necesitan{' '}
                <strong>escalar sin contratar tres personas más</strong> para tareas que una máquina hace mejor.
              </p>
            </div>
            <div className={styles.mentorRight}>
              <MediaSlot className={styles.mentorMain} label="Foto principal · autoridad" file="mentor-full.jpg" />
              <div className={styles.mentorStrip} aria-label="Galería lifestyle">
                <MediaSlot className={styles.galleryThumb} label="Lifestyle1" file="galeria-1.jpg" />
                <MediaSlot className={styles.galleryThumb} label="Lifestyle 2" file="galeria-2.jpg" />
                <MediaSlot className={styles.galleryThumb} label="Lifestyle 3" file="galeria-3.jpg" />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className={`${styles.section} ${styles.sectionAlt}`} data-reveal id="planes">
        <div className={styles.container}>
          <h2 className={styles.h2}>Inversión orientada a ROI</h2>
          <p className={styles.lead}>Cada proyecto se cotiza según complejidad de integraciones y volumen de flujos. Empezá con un diagnóstico.</p>
          <div className={styles.pricing}>
            <div className={styles.priceCard}>
              <div className={styles.priceTitle}>DIAGNÓSTICO</div>
              <div className={styles.priceAmt}>Desde USD 290</div>
              <p className={styles.priceList}>Mapa de procesos, quick wins y propuesta de flujos priorizados.</p>
            </div>
            <div className={`${styles.priceCard} ${styles.popular}`}>
              <span className={styles.badgePop}>RECOMENDADO</span>
              <div className={styles.priceTitle}>IMPLEMENTACIÓN</div>
              <div className={styles.priceAmt}>A medida</div>
              <p className={styles.priceList}>Flujos completos, integraciones, pruebas y handoff documentado.</p>
            </div>
            <div className={styles.priceCard}>
              <div className={styles.priceTitle}>SOPORTE</div>
              <div className={styles.priceAmt}>Mensual</div>
              <p className={styles.priceList}>Ajustes, nuevos disparadores y monitoreo según tu operación.</p>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.section} data-reveal id="como-funciona">
        <div className={styles.containerNarrow}>
          <h2 className={styles.h2}>Cómo arrancamos</h2>
          <ol className={styles.simpleSteps}>
            <li>
              <strong>Reunión de contexto</strong> — objetivos, herramientas y volumen.
            </li>
            <li>
              <strong>Propuesta y alcance</strong> — flujos, tiempos y entregables fijos.
            </li>
            <li>
              <strong>Construcción y pruebas</strong> — iteramos contigo hasta validar en producción.
            </li>
          </ol>
        </div>
      </section>

      <section className={`${styles.section} ${styles.sectionAlt}`} data-reveal id="faq">
        <div className={styles.container}>
          <h2 className={styles.h2}>Preguntas frecuentes</h2>
          <div className={styles.faq} data-faq-root>
            {[
              {
                q: '¿Necesito saber de APIs o integraciones?',
                a: 'No. Nosotros traducimos tu operación a flujos técnicos y te explicamos en lenguaje claro qué hace cada pieza.',
              },
              {
                q: '¿Trabajan con mi CRM actual?',
                a: 'Sí, en la mayoría de los casos. En el diagnóstico validamos compatibilidad y la mejor forma de conectar.',
              },
              {
                q: '¿Cuánto tarda un proyecto típico?',
                a: 'Depende del alcance. Un primer flujo end-to-end suele estar en pocas semanas; proyectos más grandes se dividen en fases.',
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
        <h2>Dejá de apagar incendios. Empezá con un sistema que escala.</h2>
        <a href="mailto:contacto@fluxasystems.com?subject=Automatizaciones%20Fluxa" className={styles.ctaPrimaryLg}>
          Pedir diagnóstico →
        </a>
      </section>

      <Footer />
    </div>
  );
}
