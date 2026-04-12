'use client';

import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useReveal, useFaqAccordion } from '@/lib/landingEffects';
import styles from './page.module.css';

/**
 * Imágenes sugeridas en public/contenido/:
 * - hero.jpg (retrato / figura autoridad, ~4:5 o 3:4)
 * - mock-laptop.png, mock-phone.png, mock-guia.png (mockups apilados)
 * - pilar-calendario.jpg, pilar-diseno.jpg, pilar-copy.jpg (cards)
 * - video-cover.jpg (poster del video, opcional)
 * Sustituí los <MediaSlot /> por next/image cuando las tengas.
 */
function MediaSlot({ className, label, file }) {
  return (
    <div className={className}>
      <div className={styles.slotInner}>
        <span className={styles.slotHint}>{label}</span>
        <span className={styles.slotPath}>public/contenido/{file}</span>
      </div>
    </div>
  );
}

function VideoBlock() {
  return (
    <div className={styles.videoFrame}>
      <button type="button" className={styles.videoPlay} aria-label="Reproducir video">
        <span className={styles.videoTri} />
      </button>
      <span className={styles.videoLabel}>MIRÁ EL VIDEO</span>
      <span className={styles.slotPath}>Reemplazá por embed o poster: public/contenido/video-cover.jpg</span>
    </div>
  );
}

export default function ContenidoLandingPage() {
  useReveal();
  useFaqAccordion();

  return (
    <div className={styles.wrap}>
      <div className={styles.topBar}>+500 piezas de contenido creadas este mes</div>
      <Navbar
        ctaHref="#cta-final"
        ctaLabel="Quiero contenido que convierta →"
        ctaLabelMobile="Contenido →"
      />

      <section className={styles.hero} data-reveal id="inicio">
        <div className={styles.container}>
          <div className={styles.heroGrid}>
            <div className={styles.heroCopy}>
              <p className={styles.heroKicker}>Fluxa · Contenido que convierte</p>
              <h1 className={styles.heroH1}>
                Dejá de publicar sin estrategia.
                <br />
                <span>Empezá a crear contenido que vende.</span>
              </h1>
              <p className={styles.heroSub}>
                Calendarios editoriales, diseño profesional y <strong>copy persuasivo</strong>. Todo listo para publicar y
                convertir seguidores en clientes.
              </p>
              <div className={styles.heroCtas}>
                <a href="#video" className={styles.ctaPrimary}>
                  Ver cómo funciona
                </a>
                <a href="#cta-final" className={styles.ctaGhost}>
                  Quiero contenido que convierta →
                </a>
              </div>
              <div className={styles.stats}>
                <span>+200 clientes</span>
                <span>+2.400 piezas</span>
                <span>4.9/5</span>
              </div>
            </div>
            <div className={styles.heroFigure}>
              <div className={styles.heroGlow} aria-hidden />
              <MediaSlot className={styles.imgSlotHero} label="Hero · autoridad / equipo" file="hero.jpg" />
            </div>
          </div>
        </div>
      </section>

      <section className={`${styles.section} ${styles.sectionVideo}`} data-reveal id="video">
        <div className={styles.containerNarrow}>
          <h2 className={styles.videoHook}>¿Querés ver cómo llevamos tu contenido del caos al calendario?</h2>
          <VideoBlock />
          <a href="#cta-final" className={styles.ctaPrimaryLg}>
            QUIERO CONTENIDO QUE CONVIERTA →
          </a>
        </div>
      </section>

      <section className={`${styles.section} ${styles.sectionAlt}`} data-reveal id="sistema">
        <div className={styles.container}>
          <div className={styles.split}>
            <div className={styles.mockWrap}>
              <div className={styles.mockWatermark} aria-hidden>
                FLUXA
              </div>
              <div className={styles.mockStack}>
                <MediaSlot className={styles.mockLaptop} label="Mock laptop / feed" file="mock-laptop.png" />
                <MediaSlot className={styles.mockPhone} label="Mock celular / stories" file="mock-phone.png" />
                <MediaSlot className={styles.mockBook} label="PDF / guía / lead magnet" file="mock-guia.png" />
              </div>
            </div>
            <div className={styles.splitCopy}>
              <h2 className={styles.h2Left}>Un sistema, no publicaciones sueltas</h2>
              <p className={styles.leadLeft}>
                Te entregamos <strong>piezas listas para publicar</strong> y un calendario que respeta tu oferta y tu
                voz. Nada de plantillas genéricas: cada pieza tiene objetivo y CTA.
              </p>
              <ul className={styles.featList}>
                {[
                  ['1', 'Calendario mensual con temas, formato y objetivo por día'],
                  ['2', 'Diseño alineado a tu marca (feed + stories + reels)'],
                  ['3', 'Copy que engancha y empuja a la acción'],
                  ['4', 'Reporte claro: qué funcionó y qué ajustamos'],
                ].map(([ico, text]) => (
                  <li key={text} className={styles.featItem}>
                    <span className={styles.featIcon}>{ico}</span>
                    <span>{text}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.section} data-reveal id="dolor">
        <div className={styles.container}>
          <h2 className={styles.h2}>¿Te pasa alguna de estas?</h2>
          <ul className={styles.painList}>
            <li>Publicás random sin saber si funciona</li>
            <li>Gastás horas en Canva y el resultado no convence</li>
            <li>Tu competencia crece y vos seguís igual</li>
            <li>No sabés qué publicar mañana, ni pasado</li>
            <li>Tenés seguidores pero nadie te compra</li>
          </ul>
          <div className={styles.truthCard}>
            El problema no es que no tengas ideas. Es que no tenés un <strong>sistema de contenido.</strong>
          </div>
        </div>
      </section>

      <section className={`${styles.section} ${styles.sectionAlt}`} data-reveal id="solucion">
        <div className={styles.container}>
          <h2 className={styles.h2}>Un equipo creativo completo por menos de lo que pensás</h2>
          <p className={styles.lead}>Estrategia, diseño y copy en un solo lugar — sin coordinar freelancers.</p>
          <div className={styles.grid3}>
            <div className={styles.card}>
              <MediaSlot className={styles.cardImg} label="Imagen pilar calendario" file="pilar-calendario.jpg" />
              <div className={`${styles.cardIcon} ${styles.cardIconCal}`} aria-hidden />
              <h3>Calendario Mensual</h3>
              <p>30 días de contenido planificado, con objetivo y copy listo.</p>
            </div>
            <div className={styles.card}>
              <MediaSlot className={styles.cardImg} label="Imagen pilar diseño" file="pilar-diseno.jpg" />
              <div className={`${styles.cardIcon} ${styles.cardIconDesign}`} aria-hidden />
              <h3>Diseño Profesional</h3>
              <p>Piezas que se ven como marca grande, no como amateur.</p>
            </div>
            <div className={styles.card}>
              <MediaSlot className={styles.cardImg} label="Imagen pilar copy" file="pilar-copy.jpg" />
              <div className={`${styles.cardIcon} ${styles.cardIconCopy}`} aria-hidden />
              <h3>Copy Persuasivo</h3>
              <p>Textos que enganchan, educan y venden.</p>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.section} data-reveal id="servicios">
        <div className={styles.container}>
          <h2 className={styles.h2}>¿Qué recibís cada mes?</h2>
          <div className={styles.deliverGrid}>
            {[
              ['01', 'Calendario editorial mensual completo'],
              ['02', '20 posts diseñados (feed + stories)'],
              ['03', '8 reels con guión y estructura'],
              ['04', 'Copy para cada publicación'],
              ['05', 'Hashtags estratégicos por nicho'],
              ['06', 'Reporte mensual de rendimiento'],
            ].map(([num, text]) => (
              <div key={num} className={styles.deliverItem}>
                <span className={styles.deliverNum}>{num}</span>
                <span>{text}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className={`${styles.section} ${styles.sectionAlt}`} data-reveal id="como-funciona">
        <div className={styles.container}>
          <h2 className={styles.h2}>Así funciona</h2>
          <div className={styles.timeline}>
            {[
              ['01', 'Briefing', 'Entendemos tu negocio, tu tono y tu audiencia'],
              ['02', 'Planificación', 'Diseñamos el calendario con objetivos claros'],
              ['03', 'Producción', 'Creamos todo el contenido del mes'],
              ['04', 'Entrega y ajustes', 'Te lo entregamos listo para publicar con revisiones incluidas'],
            ].map(([n, t, d]) => (
              <div key={n} className={styles.timelineStep}>
                <span className={styles.tNum}>{n}</span>
                <div>
                  <h3 className={styles.timelineTitle}>{t}</h3>
                  <p className={styles.timelineDesc}>{d}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.section} data-reveal id="para-quien">
        <div className={styles.container}>
          <h2 className={styles.h2}>Esto es para vos si...</h2>
          <div className={styles.checkCards}>
            <div className={styles.checkCard}>Tenés negocio pero no tenés tiempo de crear contenido solo</div>
            <div className={styles.checkCard}>Querés presencia profesional en redes sin contratar un equipo interno</div>
            <div className={styles.checkCard}>Estás listo para que el contenido trabaje por vos</div>
          </div>
        </div>
      </section>

      <section className={`${styles.section} ${styles.sectionAlt}`} data-reveal id="planes">
        <div className={styles.container}>
          <h2 className={styles.h2}>Planes de contenido</h2>
          <div className={styles.pricing}>
            <div className={styles.priceCard}>
              <div className={styles.priceTitle}>STARTER</div>
              <div className={styles.priceAmt}>$197/mes</div>
              <p className={styles.priceList}>12 posts + 4 reels + calendario + copy</p>
            </div>
            <div className={`${styles.priceCard} ${styles.popular}`}>
              <span className={styles.badgePop}>POPULAR</span>
              <div className={styles.priceTitle}>PRO</div>
              <div className={styles.priceAmt}>$297/mes</div>
              <p className={styles.priceList}>20 posts + 8 reels + stories + calendario + copy + reporte</p>
            </div>
            <div className={styles.priceCard}>
              <div className={styles.priceTitle}>FULL</div>
              <div className={styles.priceAmt}>$497/mes</div>
              <p className={styles.priceList}>Todo ilimitado + estrategia + comunidad + asesoramiento</p>
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
                q: '¿El contenido es para mi industria?',
                a: 'Sí. El briefing cubre tu nicho, competencia y tono de voz para que todo suene auténtico.',
              },
              { q: '¿Puedo pedir cambios?', a: 'Incluimos rondas de revisión antes de la entrega final del mes.' },
              { q: '¿Publican ustedes por mí?', a: 'Entregamos piezas listas; opcionalmente podés delegarnos la publicación.' },
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
        <h2>Tu contenido del próximo mes puede estar listo en 48 horas</h2>
        <a href="mailto:contacto@fluxasystems.com?subject=Contenido%20que%20Convierte" className={styles.ctaPrimaryLg}>
          Empezar ahora →
        </a>
      </section>

      <Footer />
    </div>
  );
}
