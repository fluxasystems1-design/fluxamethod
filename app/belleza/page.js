'use client';

import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useReveal } from '@/lib/landingEffects';
import styles from './page.module.css';

const E = {
  point: String.fromCodePoint(0x1f449),
  dizzy: String.fromCodePoint(0x1f635, 0x200d, 0x1f4ab),
  speech: String.fromCodePoint(0x1f4ac),
  boom: String.fromCodePoint(0x1f4a5),
  gear: String.fromCodePoint(0x2699, 0xfe0f),
  check: String.fromCodePoint(0x2714, 0xfe0f),
  timer: String.fromCodePoint(0x23f1, 0xfe0f),
  puzzle: String.fromCodePoint(0x1f9e9),
  fire: String.fromCodePoint(0x1f525),
  woman: String.fromCodePoint(0x1f469, 0x200d, 0x1f4bc),
  dart: String.fromCodePoint(0x1f3af),
};

/**
 * Coloca imágenes en public/belleza/ (hero.jpg, velocidad.jpg, paola.jpg).
 * Sustituye ImageSlot por next/image cuando las tengas (ver comentario en repo).
 */
function ImageSlot({ variant = 'portrait', fileHint, label }) {
  const cls =
    variant === 'wide'
      ? `${styles.mediaFrame} ${styles['mediaFrame--wide']}`
      : variant === 'photo'
        ? `${styles.mediaFrame} ${styles['mediaFrame--photo']}`
        : `${styles.mediaFrame} ${styles['mediaFrame--portrait']}`;

  return (
    <div className={cls}>
      <div className={styles.mediaInner}>
        <span className={styles.mediaHint}>{label}</span>
        <span className={styles.mediaPath}>public/belleza/{fileHint}</span>
      </div>
    </div>
  );
}

export default function BellezaLandingPage() {
  useReveal();

  return (
    <div className={styles.wrap}>
      <div className={styles.topBar}>Fluxa · Belleza &amp; estética</div>
      <Navbar ctaHref="#cta-final" ctaLabel="Agendar diagnóstico →" />

      <section className={styles.hero} data-reveal id="inicio">
        <div className={styles.container}>
          <div className={styles.heroGrid}>
            <div className={styles.heroCopy}>
              <span className={styles.eyebrow}>Reservas sin estar pegada al celular</span>
              <h1 className={styles.heroH1}>
                Llena tu agenda con reservas automatizadas{' '}
                <span>sin depender de estar respondiendo todo el día.</span>
              </h1>
              <p className={styles.heroSub}>
                Creamos contenido que convierte, páginas de reserva y automatización para que tu negocio de belleza
                atraiga y cierre citas de forma constante.
              </p>
              <div className={styles.heroCtas}>
                <a href="#cta-final" className={styles.ctaPrimary}>
                  {E.point} Quiero más reservas
                </a>
                <a href="#cta-final" className={styles.ctaGhost}>
                  {E.point} Agendar diagnóstico
                </a>
              </div>
            </div>
            <ImageSlot variant="portrait" fileHint="hero.jpg" label="Hero · vertical 9:16" />
          </div>
        </div>
      </section>

      <section className={`${styles.section} ${styles.sectionTint}`} data-reveal id="problema">
        <div className={styles.container}>
          <h2 className={styles.h2}>
            {E.dizzy} Si tienes un negocio de belleza, seguro te pasa
          </h2>
          <div className={styles.problemaGrid}>
            <ul className={styles.painList}>
              <li>Días llenos… y otros completamente vacíos</li>
              <li>Clientes preguntan por DM, pero no reservan</li>
              <li>Respondes todo el día y pierdes tiempo</li>
              <li>Publicas contenido, pero no se traduce en citas</li>
              <li>Dependes de estar activa para llenar tu agenda</li>
            </ul>
            <div className={`${styles.glass} ${styles.reframeBox}`} style={{ margin: 0, padding: '28px 24px' }}>
              <span className={styles.pullQuoteIcon}>{E.speech}</span>
              <p style={{ margin: 0, fontSize: '1.05rem', lineHeight: 1.55, color: 'var(--ink-soft)' }}>
                Y eso te mantiene trabajando más…
                <br />
                <strong style={{ color: 'var(--ink)' }}>pero sin crecer realmente.</strong>
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.section} data-reveal id="reframe">
        <div className={styles.container}>
          <div className={`${styles.glass} ${styles.reframeBox}`}>
            <h2 className={styles.h2} style={{ marginBottom: '20px' }}>
              {E.boom} No necesitas más publicaciones.
            </h2>
            <p>Ni más tiempo respondiendo mensajes.</p>
            <span className={styles.reframeHighlight}>
              Necesitas un sistema que convierta tu contenido en reservas reales.
            </span>
          </div>
        </div>
      </section>

      <section className={`${styles.section} ${styles.sectionTint}`} data-reveal id="solucion">
        <div className={styles.container}>
          <h2 className={styles.h2}>
            {E.gear} Fluxa Method para belleza
          </h2>
          <p className={styles.sectionLead}>En Fluxa instalamos un sistema completo para tu negocio:</p>
          <div className={styles.solGrid}>
            {[
              'Contenido estratégico que atrae clientas ideales',
              'Landing de reservas clara y profesional',
              'Automatización de mensajes y seguimiento',
              'Flujo organizado desde que te descubren hasta que agendan',
            ].map((t) => (
              <div key={t} className={styles.solItem}>
                <span className={styles.solCheck}>{E.check}</span>
                <p>{t}</p>
              </div>
            ))}
          </div>
          <div className={styles.pullQuote}>
            <span className={styles.pullQuoteIcon}>{E.speech}</span>
            Todo pensado para que tu agenda se llene sin depender de ti todo el tiempo.
          </div>
        </div>
      </section>

      <section className={styles.section} data-reveal id="diferencial">
        <div className={styles.container}>
          <div className={styles.diffRow}>
            <div>
              <h2 className={`${styles.h2} ${styles.h2Left}`} style={{ textAlign: 'left' }}>
                {E.timer} Velocidad + orden
              </h2>
              <p className={styles.sectionLead} style={{ textAlign: 'left', margin: '0 0 20px' }}>
                Implementamos tu sistema en días, no meses.
              </p>
              <ul className={styles.diffList}>
                <li>Sin procesos complicados</li>
                <li>Sin depender de agencias eternas</li>
              </ul>
              <div className={styles.pullQuote} style={{ marginTop: '24px', textAlign: 'left' }}>
                <span className={styles.pullQuoteIcon}>{E.speech}</span>
                Rápido, claro y enfocado en resultados.
              </div>
            </div>
            <ImageSlot variant="wide" fileHint="velocidad.jpg" label="Imagen opcional · 16:10" />
          </div>
        </div>
      </section>

      <section className={`${styles.section} ${styles.sectionTint}`} data-reveal id="como-funciona">
        <div className={styles.container}>
          <h2 className={styles.h2}>{E.puzzle} Cómo funciona</h2>
          <div className={styles.steps}>
            {[
              ['Analizamos tu negocio y tus servicios', 'Partimos de tu oferta, precios y el tipo de clienta que quieres llenar en agenda.'],
              ['Creamos contenido que conecta y convierte', 'Piezas y mensajes pensados para llevar a reserva, no solo a likes.'],
              ['Diseñamos tu página de reservas', 'Un solo lugar claro: servicios, disponibilidad y siguiente paso.'],
              ['Automatizamos tu proceso de atención', 'Respuestas, recordatorios y seguimiento sin que pierdas el día en el chat.'],
              ['Empiezas a recibir citas con más orden y constancia', 'Menos improvisación, más previsibilidad en tu semana.'],
            ].map(([title, desc], i) => (
              <div key={title} className={styles.step}>
                <div className={styles.stepNum}>{i + 1}</div>
                <div>
                  <h3>{title}</h3>
                  <p>{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.section} data-reveal id="resultados">
        <div className={styles.container}>
          <h2 className={styles.h2}>{E.fire} Con Fluxa puedes lograr</h2>
          <ul className={styles.resultList}>
            <li>Agenda más llena y constante</li>
            <li>Menos tiempo respondiendo mensajes</li>
            <li>Más clientas ideales (no solo curiosas)</li>
            <li>Un negocio más organizado y profesional</li>
          </ul>
          <div className={styles.pullQuote}>
            <span className={styles.pullQuoteIcon}>{E.speech}</span>
            Pasas de depender del día a día… a tener un sistema que trabaja contigo.
          </div>
        </div>
      </section>

      <section className={`${styles.section} ${styles.sectionTint}`} data-reveal id="filtro">
        <div className={styles.container}>
          <h2 className={styles.h2}>{E.dart} ¿Es para ti?</h2>
          <div className={styles.filterGrid}>
            <div className={`${styles.filterCard} ${styles.filterNo}`}>
              <h3 className={styles.filterTitle}>Esto NO es para ti si…</h3>
              <ul className={styles.filterList}>
                <li>No quieres invertir en crecer tu negocio</li>
                <li>Buscas solo “más seguidores”</li>
                <li>No estás dispuesta a organizar tu proceso</li>
              </ul>
            </div>
            <div className={`${styles.filterCard} ${styles.filterYes}`}>
              <h3 className={styles.filterTitle}>Esto SÍ es para ti si…</h3>
              <ul className={styles.filterList}>
                <li>Quieres más reservas sin estrés</li>
                <li>Quieres verte más profesional</li>
                <li>Estás lista para escalar tu negocio de belleza</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.section} data-reveal id="autoridad">
        <div className={styles.container}>
          <div className={`${styles.glass} ${styles.authRow}`} style={{ padding: '32px 28px' }}>
            <ImageSlot variant="photo" fileHint="paola.jpg" label="Foto · 4:5" />
            <div className={styles.authText}>
              <h2>
                {E.woman} Soy Paola
              </h2>
              <p className={styles.authName}>Estratega detrás de Fluxa.</p>
              <p>
                Ayudo a negocios de belleza a dejar de depender de mensajes y empezar a trabajar con sistemas que
                convierten interacción en citas.
              </p>
              <div className={styles.pullQuote} style={{ marginTop: '20px', marginBottom: 0 }}>
                <span className={styles.pullQuoteIcon}>{E.speech}</span>
                Porque tu talento merece una agenda llena.
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.ctaFinal} data-reveal id="cta-final">
        <h2>
          {E.dart} Si quieres dejar de perseguir clientes y empezar a recibir reservas automáticamente…
        </h2>
        <p className={styles.ctaFinalSub}>Elige cómo quieres dar el primer paso hoy.</p>
        <div className={styles.ctaRow}>
          <a
            href="mailto:contacto@fluxasystems.com?subject=Diagn%C3%B3stico%20Belleza%20Fluxa"
            className={styles.ctaPrimary}
          >
            {E.point} Agenda tu diagnóstico ahora
          </a>
        </div>
        <p className={styles.orText}>o</p>
        <div className={styles.ctaRow}>
          <a href="mailto:contacto@fluxasystems.com?subject=Empezar%20hoy%20Belleza%20Fluxa" className={styles.ctaGhost}>
            {E.point} Empieza hoy
          </a>
        </div>
      </section>

      <Footer />
    </div>
  );
}
