'use client';

import { useEffect, useState } from 'react';
import FluxaSystemArchitecture from '@/components/FluxaSystemArchitecture';
import { FLUXA_WHATSAPP_HREF } from '@/lib/whatsapp';

/** Plan de trabajo específico · FLUXA START (1 semana, mismo layout que arquitectura OS) */
const PLAN_TRABAJO_FLUXA_START = [
  {
    id: 'start-w1',
    theme: 'diagnostic',
    weekLabel: 'SEMANA 1',
    title: 'Diagnostic OS®',
    tagline: 'Diagnóstico, oportunidad y estrategia',
    alcance: [
      'Diagnóstico estratégico del negocio y estado digital',
      'Definición de cliente ideal (ICP documentado)',
      'Mapa de oferta y propuesta de valor diferenciada',
      'Benchmark y análisis competitivo del mercado',
      'Hoja de ruta personalizada para las siguientes fases',
      'Recomendación de stack tecnológico según el negocio',
    ],
    entregables: [
      'Documento de estrategia Fluxa personalizada',
      'Scorecard digital del negocio',
      'Matriz de oportunidades con priorización',
      'Calendario de contenido 30 días',
      'Scripts de ventas WhatsApp (5 flujos)',
      'Plantilla CRM básica en Google Sheets',
      '20 plantillas Canva posts y stories',
    ],
  },
];

/** Plan de trabajo específico · FLUXA SYSTEM (3 semanas) */
const PLAN_TRABAJO_FLUXA_SYSTEM = [
  {
    id: 'system-w1',
    theme: 'diagnostic',
    weekLabel: 'SEMANA 1',
    title: 'Diagnostic OS®',
    tagline: 'Diagnóstico, oportunidad y estrategia',
    alcance: [
      'Diagnóstico estratégico del negocio y estado digital',
      'Definición de cliente ideal (ICP documentado)',
      'Mapa de oferta y propuesta de valor diferenciada',
      'Benchmark y análisis competitivo del mercado',
      'Hoja de ruta personalizada para las siguientes fases',
      'Recomendación de stack tecnológico según el negocio',
    ],
    entregables: [
      'Documento de estrategia Fluxa personalizada',
      'Scorecard digital del negocio',
      'Matriz de oportunidades con priorización',
      'Calendario de contenido 30 días',
      'Scripts de ventas WhatsApp (5 flujos)',
      'Plantilla CRM básica en Google Sheets',
      '20 plantillas Canva posts y stories',
    ],
  },
  {
    id: 'system-w2',
    theme: 'content',
    weekLabel: 'SEMANA 2',
    title: 'Content OS®',
    tagline: 'Sistema de contenido y comunicación digital',
    alcance: [
      'ADN digital: pilares, narrativa, tono y propuesta de valor',
      'Optimización del perfil digital (bio, destacadas, links, posts fijos)',
      'Matriz de formatos por fase de embudo (atracción, validación, conversión)',
      'Stack de IA para producción de contenido',
      'Framework de contenido replicable e infinito',
      'Sistema UGC: identificación de 3-5 creadoras + briefs',
    ],
    entregables: [
      'Guía de ADN digital de la marca',
      'Perfil digital optimizado y estructurado',
      'Librería de formatos con templates por fase de embudo',
      'Banco de prompts de IA categorizados por tipo de contenido',
      'Parrilla de contenido 60 días + framework Content OS',
      'Brief UGC + banco de hooks para creadoras',
    ],
  },
  {
    id: 'system-w3',
    theme: 'tech',
    weekLabel: 'SEMANA 3',
    title: 'Tech OS®',
    tagline: 'Instalación técnica del sistema',
    alcance: [
      'Landing page de captación (diseño + copy + desarrollo)',
      'Automatización WhatsApp con n8n (5-8 flujos automáticos activos)',
      'CRM configurado según necesidad del negocio',
      'Setup de cuenta Meta Ads estructurado y listo (Alejandro)',
      'Dashboard de métricas en Google Sheets',
      'Capacitación al cliente en el sistema instalado',
    ],
    entregables: [
      'Landing page activa y publicada',
      'Flujos de WhatsApp automáticos funcionando',
      'CRM configurado con pipeline de prospectos',
      'Cuenta publicitaria estructurada (Alejandro)',
      'Dashboard de métricas listo para usar',
      'Grabación de sesión de capacitación',
    ],
  },
];

/** Plan de trabajo específico · FLUXA SCALE (5 semanas) */
const PLAN_TRABAJO_FLUXA_SCALE = [
  {
    id: 'scale-w1',
    theme: 'diagnostic',
    weekLabel: 'SEMANA 1',
    title: 'Diagnostic OS®',
    tagline: 'Diagnóstico, oportunidad y estrategia',
    alcance: [
      'Diagnóstico estratégico del negocio y estado digital',
      'Definición de cliente ideal (ICP documentado)',
      'Mapa de oferta y propuesta de valor diferenciada',
      'Benchmark y análisis competitivo del mercado',
      'Hoja de ruta personalizada para las siguientes fases',
      'Recomendación de stack tecnológico según el negocio',
    ],
    entregables: [
      'Documento de estrategia Fluxa personalizada',
      'Scorecard digital del negocio',
      'Matriz de oportunidades con priorización',
      'Calendario de contenido 30 días',
      'Scripts de ventas WhatsApp (5 flujos)',
      'Plantilla CRM básica en Google Sheets',
      '20 plantillas Canva posts y stories',
    ],
  },
  {
    id: 'scale-w2',
    theme: 'content',
    weekLabel: 'SEMANA 2',
    title: 'Content OS®',
    tagline: 'Sistema de contenido y comunicación digital',
    alcance: [
      'ADN digital: pilares, narrativa, tono y propuesta de valor',
      'Optimización del perfil digital (bio, destacadas, links, posts fijos)',
      'Matriz de formatos por fase de embudo (atracción, validación, conversión)',
      'Stack de IA para producción de contenido',
      'Framework de contenido replicable e infinito',
      'Sistema UGC: identificación de 3-5 creadoras + briefs',
    ],
    entregables: [
      'Guía de ADN digital de la marca',
      'Perfil digital optimizado y estructurado',
      'Librería de formatos con templates por fase de embudo',
      'Banco de prompts de IA categorizados por tipo de contenido',
      'Parrilla de contenido 60 días + framework Content OS',
      'Brief UGC + banco de hooks para creadoras',
    ],
  },
  {
    id: 'scale-w3',
    theme: 'tech',
    weekLabel: 'SEMANA 3',
    title: 'Tech OS®',
    tagline: 'Instalación técnica del sistema',
    alcance: [
      'Landing page de captación (diseño + copy + desarrollo)',
      'Automatización WhatsApp con n8n (5-8 flujos automáticos activos)',
      'CRM configurado según necesidad del negocio',
      'Setup de cuenta Meta Ads estructurado y listo (Alejandro)',
      'Dashboard de métricas en Google Sheets',
      'Capacitación al cliente en el sistema instalado',
    ],
    entregables: [
      'Landing page activa y publicada',
      'Flujos de WhatsApp automáticos funcionando',
      'CRM configurado con pipeline de prospectos',
      'Cuenta publicitaria estructurada (Alejandro)',
      'Dashboard de métricas listo para usar',
      'Grabación de sesión de capacitación',
    ],
  },
  {
    id: 'scale-w4',
    theme: 'sales',
    weekLabel: 'SEMANA 4',
    title: 'Sales OS®',
    tagline: 'Sistema de conversión y ventas digital',
    alcance: [
      'Landing page profesional con VSL integrado (guión + dirección + edición)',
      'Embudo de conversión digital multi-etapa',
      'Automatización avanzada WhatsApp + n8n (flujos completos + post-venta)',
      'Gestión y optimización de campañas Meta Ads (Alejandro)',
      'Sistema UGC completo: 5-10 creadoras activas coordinadas',
      'Capacitación en ventas por WhatsApp y TikTok Live',
    ],
    entregables: [
      'VSL grabada, editada y publicada',
      'Embudo multi-etapa activo y midiendo',
      'Flujos avanzados de automatización post-venta',
      'Campañas Meta Ads activas y optimizadas con Alejandro',
      'Kit comercial: scripts, respuestas rápidas, portafolio digital',
      'Protocolo de ventas por 5 fases documentado',
    ],
  },
  {
    id: 'scale-w5',
    theme: 'unified',
    weekLabel: 'SEMANA 5',
    title: 'Fluxa OS®',
    tagline: 'El sistema operativo completo e integrado',
    alcance: [
      'Ecommerce o membresía instalada (si aplica según diagnóstico)',
      'CRM o sistema personalizado según necesidad específica',
      'Integración de todos los sistemas en un flujo unificado',
      'Dashboard de KPIs completo del negocio',
      'Optimización continua del funnel según datos reales',
      'Sesión de cierre con plan de acción 90 días',
    ],
    entregables: [
      'Ecommerce o membresía activa (si aplica)',
      'Sistema personalizado instalado y funcionando',
      'Dashboard de KPIs completo',
      'Mapa maestro Fluxa OS con conexiones entre módulos',
      'Manual de operación del sistema',
      'Plan de acción 90 días post-instalación',
    ],
  },
];

const PLAN_TRABAJO_BY_TIER = {
  start: PLAN_TRABAJO_FLUXA_START,
  system: PLAN_TRABAJO_FLUXA_SYSTEM,
  scale: PLAN_TRABAJO_FLUXA_SCALE,
};

const PLAN_MODAL_LABELS = {
  start: 'FLUXA START',
  system: 'FLUXA SYSTEM',
  scale: 'FLUXA SCALE',
};

function FluxaWeekOsArticle({ w }) {
  return (
    <article className={`fluxa-week-os fluxa-week-os--${w.theme} card card--glass`}>
      <p className="fluxa-week-os__week">{w.weekLabel}</p>
      <h3 className="fluxa-week-os__title">{w.title}</h3>
      <p className="fluxa-week-os__tagline">{w.tagline}</p>
      <div className="fluxa-week-os__block">
        <p className="fluxa-week-os__block-title">Alcance</p>
        <ul className="fluxa-week-os__list">
          {w.alcance.map((line) => (
            <li key={line}>{line}</li>
          ))}
        </ul>
      </div>
      <div className="fluxa-week-os__block">
        <p className="fluxa-week-os__block-title">Entregables</p>
        <ul className="fluxa-week-os__list">
          {w.entregables.map((line) => (
            <li key={line}>{line}</li>
          ))}
        </ul>
      </div>
    </article>
  );
}

export default function FluxaMainSections() {
  const [planModalTier, setPlanModalTier] = useState(null);

  useEffect(() => {
    if (!planModalTier) return;
    const onKey = (e) => {
      if (e.key === 'Escape') setPlanModalTier(null);
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [planModalTier]);

  useEffect(() => {
    if (!planModalTier) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = prev;
    };
  }, [planModalTier]);

  const planModalWeeks = planModalTier ? PLAN_TRABAJO_BY_TIER[planModalTier] : null;

  return (
    <main>
      <FluxaSystemArchitecture />

      <section className="section section--reveal section--problema" id="problema">
        <div className="container">
          <p className="section__eyebrow">EL PROBLEMA REAL</p>
          <h2 className="section__title section__title--problema">
            Ya tienes un negocio.<br />
            Lo que no tienes es{' '}
            <span className="section__title-accent">el sistema.</span>
          </h2>
          <div className="problema-grid">
            {[
              ['Publicas contenido', 'sin saber si funciona o genera clientes'],
              ['Gastas en pauta', 'y no sabes si te está sirviendo realmente'],
              ['Tu competencia', 'te está ganando terreno en el mundo digital'],
              ['No tienes un sistema', 'tienes improvisación disfrazada de estrategia'],
              ['Vendes por impulso', 'no por proceso ni por estructura definida'],
              ['Sabes que necesitas digital', 'pero no sabes por dónde empezar ni cómo'],
            ].map(([bold, rest], i) => (
              <div key={i} className="problema-card">
                <span className="problema-card__icon" aria-hidden="true">
                  ✕
                </span>
                <p className="problema-card__text">
                  <strong>{bold}</strong> {rest}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section
        className="section section--reveal section--transform"
        id="transformacion"
        aria-labelledby="transform-heading"
      >
        <div className="container">
          <h2 className="section__title" id="transform-heading">
            Llegas así · Te vas así
          </h2>
          <p className="section__lead section__lead--transform">
            Sin magia: es el mismo esfuerzo, ordenado en un sistema que trabaja contigo.
          </p>
          <div className="transform-split">
            <div className="transform-col transform-col--antes card card--glass">
              <h3 className="transform-col__label">Llegas así</h3>
              <ul className="transform-list">
                <li>Publicas sin un hilo claro: cada post es “a ver qué pasa”.</li>
                <li>Pauta encendida o apagada sin saber qué medir.</li>
                <li>Web o perfil que no cierra conversaciones ni ventas.</li>
                <li>WhatsApp, DMs y pedidos repartidos sin protocolo.</li>
                <li>Tu tiempo se va coordinando piezas que no conversan entre sí.</li>
              </ul>
            </div>
            <div className="transform-col transform-col--despues card card--glass">
              <h3 className="transform-col__label">Te vas así</h3>
              <ul className="transform-list transform-list--pro">
                <li>Mensaje, calendario y creativos alineados a tu oferta.</li>
                <li>Campañas con objetivo, presupuesto y lectura clara de resultados.</li>
                <li>Landing y/o embudo listo para convertir tráfico en contacto.</li>
                <li>Canales con flujo ordenado: menos fricción para el cliente.</li>
                <li>Un equipo que ejecuta; tú te quedas con las decisiones grandes.</li>
              </ul>
            </div>
          </div>
          <div className="transform-cta">
            <p className="transform-cta__text">¿Listo para instalar tu sistema digital?</p>
            <a
              href={FLUXA_WHATSAPP_HREF}
              className="btn btn--primary transform-cta__btn"
              target="_blank"
              rel="noopener noreferrer"
            >
              Hablar por WhatsApp →
            </a>
          </div>
        </div>
      </section>

      <section className="section section--alt section--reveal section--gears" id="como-funciona">
        <div className="img-wrapper img-wrapper--gears-bg" aria-hidden="true">
          <img src="/assets/img/system-gears.png" width="800" height="800" loading="lazy" alt="" />
        </div>
        <div className="container container--above-gears">
          <h2 className="section__title">Así es trabajar con Fluxa</h2>
          <p className="section__lead section__lead--timeline">
            Sin vueltas. Sin coordinaciones interminables. Tú te enfocas en tu negocio.
          </p>
          <ol className="timeline">
            {[
              ['1', 'Diagnóstico', 'Analizamos tu negocio, tu mercado y qué necesitas exactamente.'],
              ['2', 'Estrategia', 'Diseñamos el plan completo: qué crear, dónde pautar y cómo automatizar.'],
              ['3', 'Instalación', 'Creamos tu landing, calendario, automatizaciones y campañas.'],
              ['4', 'Ejecución', 'Publicamos, pautamos y optimizamos. Tú solo revisas los resultados.'],
              ['5', 'Crecimiento', 'Mes a mes ajustamos y escalamos lo que funciona.'],
            ].map(([n, title, desc]) => (
              <li key={n} className="timeline__item">
                <span className="timeline__num">{n}</span>
                <div className="timeline__content">
                  <h3 className="timeline__title">{title}</h3>
                  <p className="timeline__desc">{desc}</p>
                </div>
              </li>
            ))}
          </ol>
          <div className="mini-cta mini-cta--soft">
            <p className="mini-cta__text">¿Listo para tener un equipo que ejecute por ti?</p>
            <a href="/diagnostico" className="btn btn--primary mini-cta__btn">
              Agendar diagnóstico gratuito →
            </a>
          </div>
        </div>
      </section>

      <section className="section section--reveal section--proceso" id="proceso-fluxa">
        <div className="container container--narrow">
          <p className="section__eyebrow">ASÍ FUNCIONA EL ACOMPAÑAMIENTO</p>
          <h2 className="section__title">Incluido: plan de ejecución a 90 días</h2>
          <p className="section__lead">
            Al cerrar tu plan recibes una hoja de ruta clara con las acciones exactas para los próximos 90 días. Sin
            improvisar. Sin adivinar.
          </p>
          <div className="proceso-plan-box">
            <div className="proceso-plan-box__header">
              <span className="proceso-plan-box__badge">INCLUIDO</span>
              <span className="proceso-plan-box__title">PLAN 90 DÍAS — FLUXA METHOD</span>
            </div>
            <p className="proceso-plan-box__desc">
              Tu hoja de ruta post-instalación con las acciones exactas que debes ejecutar cada semana durante los
              próximos 90 días. Sin improvisar. Sin adivinar. Solo ejecutar.
            </p>
            <div className="proceso-fases">
              {[
                ['DÍAS 1–30', 'Activar el sistema y conseguir los primeros resultados'],
                ['DÍAS 31–60', 'Optimizar y escalar lo que está funcionando'],
                ['DÍAS 61–90', 'Consolidar, sistematizar y preparar el siguiente nivel'],
              ].map(([fase, desc]) => (
                <div key={fase} className="proceso-fase">
                  <p className="proceso-fase__label">{fase}</p>
                  <p className="proceso-fase__desc">{desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="section section--reveal section--testimonials" id="testimonios">
        <div className="container">
          <h2 className="section__title">Lo que dicen quienes ya tienen su sistema</h2>
          <div className="testimonial-featured card card--glass testimonial-featured--hero">
            <div className="testimonial-featured__avatar" aria-hidden="true">
              CM
            </div>
            <div className="testimonial-featured__stars" aria-hidden="true">
              ★★★★★
            </div>
            <p className="testimonial-featured__tag">Case · E-commerce · Suplementos · Medellín</p>
            <blockquote className="testimonial-featured__quote">
              «Llevaba 2 años publicando en Instagram sin resultados. En el primer mes con Fluxa ya tenía mi landing, mi
              calendario y mis primeras ventas desde pauta. Por fin siento que tengo un equipo que entiende mi negocio.»
            </blockquote>
            <p className="testimonial-featured__outcome">
              <strong>Resultado:</strong> presencia ordenada, pauta en marcha y primeras ventas atribuibles en el primer mes
              (relato del cliente; resultados varían según oferta y mercado).
            </p>
            <p className="testimonial-featured__meta">
              <strong>Carlos Mendoza</strong> · Tienda de suplementos deportivos · Medellín, Colombia
            </p>
          </div>
          <div className="grid grid--testimonials">
            <article className="testimonial-card card card--glass">
              <div className="testimonial-card__head">
                <div className="testimonial-card__avatar" aria-hidden="true">
                  AR
                </div>
                <div>
                  <p className="testimonial-card__tag">Retail · Moda femenina · Bogotá</p>
                  <div className="testimonial-card__stars" aria-hidden="true">
                    ★★★★★
                  </div>
                  <p className="testimonial-card__meta">
                    <strong>Andrea Rojas</strong> · Boutique de ropa femenina · Bogotá, Colombia
                  </p>
                </div>
              </div>
              <p className="testimonial-card__text">
                «Antes coordinaba diseñador, redactor y community manager por separado. Ahora Fluxa lo maneja todo y yo me
                enfoco en vender.»
              </p>
              <p className="testimonial-card__outcome">
                Resultado: un solo equipo para creativo y ejecución — menos coordinación, foco en ventas.
              </p>
            </article>
            <article className="testimonial-card card card--glass">
              <div className="testimonial-card__head">
                <div className="testimonial-card__avatar" aria-hidden="true">
                  MT
                </div>
                <div>
                  <p className="testimonial-card__tag">Distribución B2B/B2C · Productos naturales · Cali</p>
                  <div className="testimonial-card__stars" aria-hidden="true">
                    ★★★★★
                  </div>
                  <p className="testimonial-card__meta">
                    <strong>Miguel Torres</strong> · Distribuidora de productos naturales · Cali, Colombia
                  </p>
                </div>
              </div>
              <p className="testimonial-card__text">
                «Las automatizaciones de WhatsApp cambiaron mi negocio. Respondo menos y vendo más. Increíble.»
              </p>
              <p className="testimonial-card__outcome">
                Resultado: flujo de WhatsApp ordenado — menos mensajes manuales, más conversaciones que cierran.
              </p>
            </article>
          </div>
        </div>
      </section>

      <section className="section section--reveal" id="planes">
        <div className="container">
          <h2 className="section__title">Planes de acompañamiento</h2>
          <p className="section__lead">
            Tres niveles según el momento de tu negocio. Todos incluyen estrategia, instalación y seguimiento real con
            nuestro equipo.
          </p>
          <div className="grid grid--pricing">
            <article className="card card--glass card--pricing card--border-start">
              <p className="pricing__badge">🟢 FLUXA START</p>
              <h3 className="pricing__title">Tu estrategia digital completa lista para ejecutar</h3>
              <p className="pricing__ideal">
                <strong>Ideal si</strong> tu marketing está desordenado y no tienes claridad en cómo atraer clientes de
                forma constante.
              </p>
              <p className="pricing__price">
                <strong>$297 USD</strong>
              </p>
              <p className="pricing__period">Pago único · Entrega en 1 semana</p>
              <p className="pricing__cop">≈ $1.188.000 COP</p>
              <ul className="pricing__list">
                <li>Diagnóstico estratégico del negocio (sesión 90 min)</li>
                <li>Definición de cliente ideal (ICP documentado)</li>
                <li>Mapa de oferta y propuesta de valor diferenciada</li>
                <li>Optimización del perfil digital (bio, highlights, link en bio)</li>
                <li>Calendario de contenido 30 días con temas, formatos y hooks</li>
                <li>Framework de contenido replicable e infinito</li>
                <li>Blueprint de automatizaciones WhatsApp (documentado)</li>
                <li>Estructura de landing page ideal (wireframe + copy)</li>
                <li>Scripts de ventas WhatsApp (5 flujos)</li>
                <li>Plantilla CRM básica en Google Sheets</li>
              </ul>
              <div className="pricing__ctas">
                <a href="/diagnostico" className="btn btn--ghost btn--block btn--pricing">
                  Empezar con Start →
                </a>
                <button
                  type="button"
                  className="btn btn--ghost btn--block btn--pricing btn--pricing-plan"
                  onClick={() => setPlanModalTier('start')}
                >
                  Plan de trabajo →
                </button>
              </div>
            </article>

            <article className="card card--glass card--pricing card--popular">
              <p className="pricing__badge pricing__badge--popular">🔵 FLUXA SYSTEM · MÁS POPULAR</p>
              <h3 className="pricing__title">Tu sistema de captación instalado y funcionando</h3>
              <p className="pricing__ideal">
                <strong>Ideal si</strong> quieres que nuestro equipo instale y active tu sistema completo de captación de
                clientes.
              </p>
              <p className="pricing__price">
                <strong>$650 USD</strong>
              </p>
              <p className="pricing__period">mes 1 (instalación) + $350 USD/mes × 2 meses</p>
              <p className="pricing__cop">≈ $5.400.000 COP total · Done With You</p>
              <ul className="pricing__list">
                <li>Todo lo de Fluxa Start ejecutado (no solo documentado)</li>
                <li>Landing page de captación (diseño + copy + desarrollo)</li>
                <li>Automatización WhatsApp con n8n (5-8 flujos activos)</li>
                <li>CRM configurado según necesidad del negocio</li>
                <li>Estrategia de contenido 60 días con dirección mensual</li>
                <li>Sistema UGC básico: 3-5 creadoras + briefs</li>
                <li>Setup cuenta Meta Ads estructurado y listo</li>
                <li>Dashboard de métricas en Google Sheets</li>
                <li>2 sesiones estratégicas mensuales</li>
                <li>Soporte WhatsApp días hábiles</li>
              </ul>
              <div className="pricing__ctas">
                <a href="/diagnostico" className="btn btn--primary btn--block btn--pricing">
                  Elegir Fluxa System →
                </a>
                <button
                  type="button"
                  className="btn btn--ghost btn--block btn--pricing btn--pricing-plan"
                  onClick={() => setPlanModalTier('system')}
                >
                  Plan de trabajo →
                </button>
              </div>
            </article>

            <article className="card card--glass card--pricing card--border-scale">
              <p className="pricing__badge">🟣 FLUXA SCALE</p>
              <h3 className="pricing__title">Tu máquina completa de captación y conversión</h3>
              <p className="pricing__ideal">
                <strong>Ideal si</strong> quieres un equipo completo ejecutando todos los frentes de tu marketing
                digital.
              </p>
              <p className="pricing__price">
                <strong>$1.100 USD</strong>
              </p>
              <p className="pricing__period">mes 1 (instalación completa) + $497 USD/mes × 2 meses</p>
              <p className="pricing__cop">≈ $8.376.000 COP total · Done For You</p>
              <ul className="pricing__list">
                <li>Todo lo de Fluxa System a mayor escala</li>
                <li>Landing page profesional + VSL integrado</li>
                <li>Embudo de conversión digital multi-etapa</li>
                <li>Automatización avanzada WhatsApp + n8n (flujos completos + post-venta)</li>
                <li>Sistema UGC completo: 5-10 creadoras activas</li>
                <li>Gestión y optimización de campañas Meta Ads (Alejandro)</li>
                <li>CRM o sistema personalizado según necesidad</li>
                <li>Ecommerce o membresía instalada (si aplica)</li>
                <li>Dashboard de KPIs completo + integraciones</li>
                <li>4 sesiones estratégicas mensuales</li>
                <li>Soporte prioritario WhatsApp 6 días/semana</li>
              </ul>
              <div className="pricing__ctas">
                <a href="/diagnostico" className="btn btn--ghost btn--block btn--pricing">
                  Escalar con Fluxa →
                </a>
                <button
                  type="button"
                  className="btn btn--ghost btn--block btn--pricing btn--pricing-plan"
                  onClick={() => setPlanModalTier('scale')}
                >
                  Plan de trabajo →
                </button>
              </div>
            </article>
          </div>
          <p className="fluxa-soft-urgency" role="note">
            Solo 5 cupos disponibles por mes. Respondemos en menos de 24 horas hábiles.
          </p>
        </div>
      </section>

      <section className="section section--reveal section--faq" id="faq">
        <div className="container container--narrow">
          <h2 className="section__title">Preguntas frecuentes</h2>
          <p className="section__lead section__lead--faq">Todo lo que necesitas saber antes de agendar</p>
          <div className="faq">
            {[
              {
                id: '1',
                q: '1. ¿Esto realmente me va a generar más ventas o clientes?',
                a: [
                  'Fluxa no es contenido ni diseño suelto.',
                  'Es un sistema que organiza cómo atraes, respondes y conviertes.',
                  'Cuando eso se estructura bien, lo que cambia no es solo lo que haces… es cómo tu negocio convierte.',
                ],
              },
              {
                id: '2',
                q: '2. ¿En cuánto tiempo voy a ver resultados?',
                a: [
                  'Desde la implementación ya tienes estructura funcionando.',
                  'Los resultados dependen de tu oferta y constancia, pero la diferencia es que dejas de improvisar y empiezas a trabajar con dirección.',
                ],
              },
              {
                id: '3',
                q: '3. ¿Tengo que saber de marketing o tecnología?',
                a: [
                  'No.',
                  'Justamente Fluxa está pensado para que no tengas que entender lo técnico.',
                  'Nosotros te entregamos el sistema listo para usar, con estructura clara y acompañamiento.',
                ],
              },
              {
                id: '4',
                q: '4. Ya he invertido en marketing antes y no funcionó…',
                a: [
                  'Eso pasa cuando hay ejecución sin estrategia.',
                  'Fluxa no empieza por hacer más, empieza por ordenar cómo funciona tu negocio digital.',
                  'Si la base no está clara, nada escala.',
                ],
              },
              {
                id: '5',
                q: '5. ¿Esto reemplaza lo que ya estoy haciendo?',
                a: [
                  'No necesariamente.',
                  'Fluxa organiza y potencia lo que ya tienes.',
                  'Puedes seguir creando contenido o teniendo equipo, pero ahora con un sistema que conecta todo.',
                ],
              },
              {
                id: '6',
                q: '6. ¿Voy a dejar de responder mensajes?',
                a: [
                  'No completamente, pero sí dejas de hacerlo de forma manual y desordenada.',
                  'El sistema filtra, organiza y automatiza gran parte del proceso, para que tú te enfoques en lo importante.',
                ],
              },
              {
                id: '7',
                q: '7. ¿Esto es mejor que contratar una agencia?',
                a: [
                  'Es diferente.',
                  'Una agencia ejecuta por ti.',
                  'Fluxa te instala un sistema para que tu negocio funcione mejor a largo plazo, sin depender de terceros.',
                ],
              },
              {
                id: '8',
                q: '8. ¿Y si mi negocio es pequeño o estoy empezando?',
                a: [
                  'Mejor aún.',
                  'Entre antes tengas estructura, menos errores y pérdida de tiempo vas a tener.',
                  'Fluxa te da una base sólida desde el inicio.',
                ],
              },
              {
                id: '9',
                q: '9. ¿Qué pasa después de implementar el sistema?',
                a: [
                  'Tu negocio deja de operar al azar.',
                  'Tienes claridad en qué hacer, cómo hacerlo y cómo convertir mejor.',
                  'Desde ahí puedes escalar con más control.',
                ],
              },
              {
                id: '10',
                q: '10. ¿Qué hace diferente a Fluxa?',
                a: [
                  'No vendemos servicios sueltos.',
                  'Instalamos un sistema que conecta contenido, automatización y conversión para que tu negocio deje de depender de ti.',
                ],
              },
            ].map((item) => (
              <div key={item.id} className="faq__item">
                <button
                  type="button"
                  className="faq__question"
                  aria-expanded="false"
                  aria-controls={`faq-panel-${item.id}`}
                  id={`faq-btn-${item.id}`}
                >
                  <span className="faq__question-text">{item.q}</span>
                  <span className="faq__icon" aria-hidden="true" />
                </button>
                <div className="faq__panel" id={`faq-panel-${item.id}`} role="region" aria-labelledby={`faq-btn-${item.id}`}>
                  {item.a.map((paragraph, i) => (
                    <p key={i} className="faq__answer">
                      {paragraph}
                    </p>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {planModalTier && planModalWeeks?.length ? (
        <div
          className="plan-trabajo-modal"
          role="dialog"
          aria-modal="true"
          aria-labelledby="plan-trabajo-modal-title"
        >
          <button
            type="button"
            className="plan-trabajo-modal__backdrop"
            aria-label="Cerrar ventana de plan de trabajo"
            onClick={() => setPlanModalTier(null)}
          />
          <div className="plan-trabajo-modal__panel">
            <div className="plan-trabajo-modal__header">
              <div>
                <h2 className="plan-trabajo-modal__title" id="plan-trabajo-modal-title">
                  Plan de trabajo · {PLAN_MODAL_LABELS[planModalTier]}
                </h2>
                <p className="plan-trabajo-modal__subtitle">
                  Desglose por semana con alcance y entregables (mismo diseño que la arquitectura Fluxa en la página).
                </p>
              </div>
              <button type="button" className="plan-trabajo-modal__close" onClick={() => setPlanModalTier(null)}>
                Cerrar
              </button>
            </div>
            <div className="plan-trabajo-modal__themes section--fluxa-weeks">
              <div className="fluxa-weeks-grid fluxa-weeks-grid--modal">
                {planModalWeeks.map((w) => (
                  <FluxaWeekOsArticle key={w.id} w={w} />
                ))}
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </main>
  );
}
