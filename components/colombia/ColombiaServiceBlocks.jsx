'use client';

import Image from 'next/image';
import { motion, useReducedMotion } from 'framer-motion';
import {
  COLOMBIA_APP_SRC,
  COLOMBIA_AUTOMATIZACIONES_SRC,
  COLOMBIA_DASHBOARD_VIDEO_SRC,
  COLOMBIA_ROBOT_FLUJO_SRC,
  COLOMBIA_SOFTWARE_SRC,
  COLOMBIA_WA_HREF,
} from '@/lib/colombia/brand';
import LandingsVitrinaCarousel from '@/components/landings/LandingsVitrinaCarousel';
import vitrinaStyles from '@/components/landings/landingsShowcase.module.css';
import colombiaVibrant from './colombiaVibrant.module.css';
import ColombiaSection from './ColombiaSection';
import ColombiaVoiceWaveVisual from './ColombiaVoiceWaveVisual';
import styles from './ColombiaServiceBlocks.module.css';

const COTIZAR_HREF = COLOMBIA_WA_HREF;

/** Catálogo visual — 8 bloques alternados imagen / texto */
const SERVICE_BLOCKS = [
  /* BLOQUE 1 — imagen izquierda */
  {
    id: 1,
    imageFirst: true,
    label: 'PÁGINAS Y PRESENCIA DIGITAL',
    title: 'Tu presencia digital, desde cero hasta convertir.',
    description:
      'Construimos páginas que no solo se ven bien — están diseñadas para que quien llega, actúe. Desde una landing simple hasta un ecommerce completo.',
    items: [
      'Home page corporativa o de marca',
      'Landing page de venta o captación',
      'Landing page con múltiples productos',
      'Página web corporativa',
      'Ecommerce completo con pasarela de pago',
      'Página de biografía / link in bio avanzado',
      'VSL — guión y estructura de video de ventas',
    ],
  },
  /* BLOQUE 2 — imagen derecha */
  {
    id: 2,
    imageFirst: false,
    label: 'AUTOMATIZACIÓN',
    title: 'Sistemas que trabajan mientras tú descansas.',
    description:
      'Configuramos flujos automáticos que responden, califican y hacen seguimiento sin que tengas que estar presente en cada paso.',
    items: [
      'Bot WhatsApp — respuestas, leads y seguimiento',
      'Bot Instagram — DMs y comentarios automáticos',
      'Combo WhatsApp + Instagram',
      'Bot de señales en tiempo real',
      'Embudos de nutrición automatizados',
      'Sistema de agendamiento y reservas',
      'Flujos personalizados con n8n',
    ],
  },
  /* BLOQUE 3 — imagen izquierda */
  {
    id: 3,
    imageFirst: true,
    label: 'INTELIGENCIA ARTIFICIAL',
    title: 'Tecnología que atiende, califica y cierra sola.',
    description:
      'Integramos IA directamente en tu negocio — tu sitio web, tu WhatsApp o tu operación. Disponible 24/7, sin salarios ni descansos.',
    items: [
      'Chatbot con IA para sitio web',
      'Agente de ventas por WhatsApp con IA',
      'Generador de contenido automatizado con IA',
      'Analizador de métricas con IA',
    ],
  },
  /* BLOQUE 4 — imagen derecha */
  {
    id: 4,
    imageFirst: false,
    label: 'BOTS DE VOZ',
    title: 'Recepcionistas virtuales que nunca pierden una llamada.',
    description:
      'Agentes de voz que llaman, recuerdan citas, califican prospectos y atienden fuera de horario — sin intervención humana.',
    items: [
      'Bot de recordatorio de citas por llamada',
      'Bot de calificación de leads por llamada',
      'Recepcionista virtual con voz',
    ],
  },
  /* BLOQUE 5 — imagen izquierda */
  {
    id: 5,
    imageFirst: true,
    label: 'SISTEMAS Y PLATAFORMAS',
    title: 'Visibilidad total. Control absoluto.',
    description:
      'Plataformas, dashboards y comunidades digitales construidas para que tu negocio tenga la infraestructura que necesita para escalar sin límites.',
    items: [
      'Dashboard de métricas en tiempo real',
      'CRM personalizado + automatización avanzada',
      'Mesa de ayuda y soporte al cliente',
      'Setup de comunidad digital (Skool, Circle)',
      'Sistema de membresía o cursos',
      'Portal de clientes',
      'Plataforma web a medida',
    ],
  },
  /* BLOQUE 6 — imagen derecha */
  {
    id: 6,
    imageFirst: false,
    label: 'APPS MÓVILES',
    title: 'Tu negocio en el bolsillo de tus clientes.',
    description:
      'Desarrollamos apps móviles con tu marca para iOS y Android — con membresías, contenido exclusivo y acceso premium desde cualquier dispositivo.',
    items: ['App móvil con marca propia (iOS + Android)'],
  },
  /* BLOQUE 7 — imagen izquierda */
  {
    id: 7,
    imageFirst: true,
    label: 'SOFTWARE PERSONALIZADO',
    title: 'Si lo puedes imaginar, lo construimos.',
    description:
      'Desde herramientas internas hasta plataformas completas — desarrollamos software a medida exactamente como tu negocio lo necesita.',
    items: ['Software a medida para cualquier nicho o industria'],
  },
  /* BLOQUE 8 — imagen derecha */
  {
    id: 8,
    imageFirst: false,
    label: 'SOPORTE MENSUAL',
    title: 'Tu sistema optimizado mes a mes.',
    description:
      'Mantenemos tu infraestructura digital funcionando, optimizada y actualizada — sin que tengas que preocuparte por nada técnico.',
    items: ['Retainer — mantenimiento, optimizaciones y soporte'],
  },
];

const blockFadeUp = {
  hidden: { opacity: 0, y: 36 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] },
  },
};

function ServiceImagePlaceholder({ blockId }) {
  return (
    <div
      className={`service-image-placeholder service-block-${blockId} ${colombiaVibrant.glowPanel} ${styles.imagePlaceholder}`}
    >
      <span className={styles.placeholderText}>Imagen próximamente</span>
    </div>
  );
}

function ServiceBlockStaticImage({ blockId, src, alt }) {
  return (
    <div
      className={`service-block-${blockId} ${colombiaVibrant.glowPanel} ${styles.blockImagePanel} ${styles.blockImagePanelTight}`}
    >
      <Image
        src={src}
        alt={alt}
        width={1400}
        height={1050}
        className={styles.blockImageTight}
        sizes="(max-width: 768px) 100vw, 50vw"
      />
    </div>
  );
}

/** Bloque 5 — video dashboard */
function ServiceBlock5Video() {
  return (
    <div
      className={`service-block-5 ${colombiaVibrant.glowPanel} ${styles.blockImagePanel} ${styles.blockImagePanelTight} ${styles.blockVideoPanel}`}
    >
      <video
        className={styles.blockVideo}
        src={COLOMBIA_DASHBOARD_VIDEO_SRC}
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        aria-label="Dashboard de métricas y control en tiempo real"
      />
    </div>
  );
}

/** Bloque 1 — vitrina 3D de /landings */
function ServiceBlock1Creative() {
  return (
    <div className={`service-block-1 ${colombiaVibrant.glowPanel} ${styles.blockVitrina}`}>
      <LandingsVitrinaCarousel
        compact
        embed
        accentTheme="fluxa"
        className={`${styles.embeddedVitrina} ${vitrinaStyles.sectionExamplesEmbedLarge}`}
      />
    </div>
  );
}

function ServiceBlockImage({ block }) {
  if (block.id === 1) {
    return <ServiceBlock1Creative />;
  }
  if (block.id === 2) {
    return (
      <ServiceBlockStaticImage
        blockId={2}
        src={COLOMBIA_ROBOT_FLUJO_SRC}
        alt="Automatización Fluxa Method — robot y flujos conectados"
      />
    );
  }
  if (block.id === 4) {
    return <ColombiaVoiceWaveVisual />;
  }
  if (block.id === 5) {
    return <ServiceBlock5Video />;
  }
  if (block.id === 7) {
    return (
      <ServiceBlockStaticImage
        blockId={7}
        src={COLOMBIA_SOFTWARE_SRC}
        alt="Software personalizado a medida — Fluxa Method"
      />
    );
  }
  return <ServiceImagePlaceholder blockId={block.id} />;
}

function ServiceBlockText({ block }) {
  return (
    <div className={styles.textCol}>
      <p className={`${styles.label} ${colombiaVibrant.labelCaps}`}>{block.label}</p>
      <h3 className={`${styles.blockTitle} ${colombiaVibrant.headlineBlock}`}>{block.title}</h3>
      <p className={styles.blockDesc}>{block.description}</p>
      <ul className={styles.itemList}>
        {block.items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
      <a
        href={COTIZAR_HREF}
        className={styles.ctaOutline}
        target="_blank"
        rel="noopener noreferrer"
      >
        <span className={styles.ctaOutlineInner}>Cotizar este servicio</span>
      </a>
    </div>
  );
}

/** Bloque 6 — visual de app al lado del botón cotizar */
function ServiceBlock6Content({ block }) {
  return (
    <div className={styles.blockInnerApp}>
      <div className={styles.textColApp}>
        <p className={`${styles.label} ${colombiaVibrant.labelCaps}`}>{block.label}</p>
        <h3 className={`${styles.blockTitle} ${colombiaVibrant.headlineBlock}`}>{block.title}</h3>
        <p className={styles.blockDesc}>{block.description}</p>
        <ul className={styles.itemList}>
          {block.items.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
        <div className={styles.appCtaRow}>
          <a
            href={COTIZAR_HREF}
            className={styles.ctaOutline}
            target="_blank"
            rel="noopener noreferrer"
          >
            <span className={styles.ctaOutlineInner}>Cotizar este servicio</span>
          </a>
          <Image
            src={COLOMBIA_APP_SRC}
            alt="App móvil con marca propia para iOS y Android — Fluxa Method"
            width={800}
            height={600}
            className={styles.appVisual}
            sizes="(max-width: 768px) 130px, 220px"
            priority={false}
          />
        </div>
      </div>
    </div>
  );
}

/** Bloque 3 — robot al lado de la lista (junto a las líneas con «IA») */
function ServiceBlock3Content({ block }) {
  return (
    <div className={styles.blockInnerIA}>
      <div className={styles.textColIA}>
        <p className={`${styles.label} ${colombiaVibrant.labelCaps}`}>{block.label}</p>
        <h3 className={`${styles.blockTitle} ${colombiaVibrant.headlineBlock}`}>{block.title}</h3>
        <p className={styles.blockDesc}>{block.description}</p>
        <div className={styles.iaListRow}>
          <ul className={styles.itemList}>
            {block.items.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
          <Image
            src={COLOMBIA_AUTOMATIZACIONES_SRC}
            alt="Asistente de inteligencia artificial Fluxa Method"
            width={480}
            height={480}
            className={styles.iaMascot}
            sizes="(max-width: 768px) 120px, 168px"
            priority={false}
          />
        </div>
        <a
          href={COTIZAR_HREF}
          className={styles.ctaOutline}
          target="_blank"
          rel="noopener noreferrer"
        >
          <span className={styles.ctaOutlineInner}>Cotizar este servicio</span>
        </a>
      </div>
    </div>
  );
}

function ServiceBlock({ block, reduceMotion }) {
  const layoutClass = block.imageFirst ? styles.imageLeft : styles.imageRight;
  const motionProps = reduceMotion
    ? { initial: false, animate: undefined, whileInView: undefined }
    : {
        variants: blockFadeUp,
        initial: 'hidden',
        whileInView: 'show',
        viewport: { once: true, amount: 0.12 },
      };

  if (block.id === 3) {
    return (
      <motion.article className={`${styles.block} ${styles.blockIALayout}`} {...motionProps}>
        <ServiceBlock3Content block={block} />
      </motion.article>
    );
  }

  if (block.id === 6) {
    return (
      <motion.article className={`${styles.block} ${styles.blockAppLayout}`} {...motionProps}>
        <ServiceBlock6Content block={block} />
      </motion.article>
    );
  }

  if (block.id === 8) {
    return (
      <motion.article className={`${styles.block} ${styles.blockTextOnly}`} {...motionProps}>
        <div className={styles.blockInnerTextOnly}>
          <ServiceBlockText block={block} />
        </div>
      </motion.article>
    );
  }

  return (
    <motion.article className={`${styles.block} ${layoutClass}`} {...motionProps}>
      <div
        className={
          block.id === 1
            ? `${styles.blockInner} ${styles.blockInnerVitrina}`
            : block.id === 2 || block.id === 4 || block.id === 5 || block.id === 7
              ? `${styles.blockInner} ${styles.blockInnerCompact}`
              : styles.blockInner
        }
      >
        <div className={styles.imageCol}>
          <ServiceBlockImage block={block} />
        </div>
        <ServiceBlockText block={block} />
      </div>
    </motion.article>
  );
}

export default function ColombiaServiceBlocks() {
  const reduceMotion = useReducedMotion();

  return (
    <ColombiaSection className={styles.section} id="catalogo">
      <div className={styles.sectionHead}>
        <h2 className={`${styles.h2} ${colombiaVibrant.headlineSm}`}>
          ¿Qué <span className={colombiaVibrant.accentPurple}>construimos</span>?
        </h2>
        <p className={`${styles.sub} ${colombiaVibrant.body}`}>
          Arquitectura digital por categorías —{' '}
          <span className={colombiaVibrant.accentCyan}>todo a medida</span>.
        </p>
      </div>

      <div className={styles.blocks}>
        {SERVICE_BLOCKS.map((block, index) => (
          <div key={block.id} className={styles.blockWrap}>
            <ServiceBlock block={block} reduceMotion={!!reduceMotion} />
            {index < SERVICE_BLOCKS.length - 1 ? (
              <hr className={styles.separator} aria-hidden />
            ) : null}
          </div>
        ))}
      </div>
    </ColombiaSection>
  );
}
