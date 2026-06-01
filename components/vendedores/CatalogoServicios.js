'use client';

import Image from 'next/image';
import { motion, useReducedMotion } from 'framer-motion';
import { CATALOGO } from '@/app/embajadores-fluxa/vendedores-config';
import {
  COLOMBIA_APP_SRC,
  COLOMBIA_AUTOMATIZACIONES_SRC,
  COLOMBIA_DASHBOARD_VIDEO_SRC,
  COLOMBIA_LANDING_CORNER_SRC,
  COLOMBIA_ROBOT_FLUJO_SRC,
  COLOMBIA_SOFTWARE_SRC,
} from '@/lib/colombia/brand';
import ColombiaVoiceWaveVisual from '@/components/colombia/ColombiaVoiceWaveVisual';
import colombiaVibrant from '@/components/colombia/colombiaVibrant.module.css';
import colombiaBlockStyles from '@/components/colombia/ColombiaServiceBlocks.module.css';
import VendedoresSection from './VendedoresSection';
import styles from './CatalogoServicios.module.css';

const blockFadeUp = {
  hidden: { opacity: 0, y: 36 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] },
  },
};

function PricingList({ services }) {
  return (
    <div className={styles.pricingWrap}>
      <div className={styles.pricingHead} aria-hidden>
        <span>Servicio</span>
        <span>Neto Fluxa</span>
        <span>Venta ref.</span>
        <span>Margen</span>
      </div>
      <ul className={styles.pricingList}>
        {services.map((svc) => (
          <li key={svc.name} className={styles.pricingRow}>
            <span className={styles.svcName}>{svc.name}</span>
            <span className={styles.priceNeto}>{svc.neto}</span>
            <span className={styles.priceVenta}>{svc.venta}</span>
            <span className={styles.priceMargen}>{svc.margen}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function BlockStaticImage({ blockId, src, alt }) {
  return (
    <div
      className={`service-block-${blockId} ${colombiaVibrant.glowPanel} ${colombiaBlockStyles.blockImagePanel} ${colombiaBlockStyles.blockImagePanelTight}`}
    >
      <Image
        src={src}
        alt={alt}
        width={1400}
        height={1050}
        className={colombiaBlockStyles.blockImageTight}
        sizes="(max-width: 768px) 100vw, 50vw"
      />
    </div>
  );
}

function BlockDashboardVideo() {
  return (
    <div
      className={`service-block-5 ${colombiaVibrant.glowPanel} ${colombiaBlockStyles.blockImagePanel} ${colombiaBlockStyles.blockImagePanelTight} ${colombiaBlockStyles.blockVideoPanel}`}
    >
      <video
        className={colombiaBlockStyles.blockVideo}
        src={COLOMBIA_DASHBOARD_VIDEO_SRC}
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        aria-label="Dashboard de métricas en tiempo real"
      />
    </div>
  );
}

function CategoryCreative({ category }) {
  const { block } = category;
  const id = block.colombiaBlockId;

  if (block.layout === 'image' && block.imageKey === 'landing') {
    return (
      <BlockStaticImage
        blockId={id}
        src={COLOMBIA_LANDING_CORNER_SRC}
        alt="Landing page de conversión — Fluxa Method"
      />
    );
  }
  if (block.layout === 'voice') {
    return <ColombiaVoiceWaveVisual />;
  }
  if (block.layout === 'video') {
    return <BlockDashboardVideo />;
  }
  if (block.layout === 'image' && block.imageKey === 'robot') {
    return (
      <BlockStaticImage
        blockId={id}
        src={COLOMBIA_ROBOT_FLUJO_SRC}
        alt="Automatización Fluxa Method — robot y flujos conectados"
      />
    );
  }
  if (block.layout === 'image' && block.imageKey === 'software') {
    return (
      <BlockStaticImage
        blockId={id}
        src={COLOMBIA_SOFTWARE_SRC}
        alt="Software personalizado a medida — Fluxa Method"
      />
    );
  }
  return null;
}

function CategoryBlockText({ category }) {
  const { block, description, services } = category;

  return (
    <div className={colombiaBlockStyles.textCol}>
      <p className={`${colombiaBlockStyles.label} ${colombiaVibrant.labelCaps}`}>{block.label}</p>
      <h3 className={`${colombiaBlockStyles.blockTitle} ${colombiaVibrant.headlineBlock}`}>
        {block.headline}
      </h3>
      <p className={colombiaBlockStyles.blockDesc}>{description}</p>
      <PricingList services={services} />
      <p className={styles.priceNote}>Precios netos a Fluxa · venta referencia orientativa</p>
    </div>
  );
}

function CategoryBlockIA({ category, reduceMotion }) {
  const { block, description, services } = category;
  const motionProps = reduceMotion
    ? {}
    : {
        variants: blockFadeUp,
        initial: 'hidden',
        whileInView: 'show',
        viewport: { once: true, amount: 0.12 },
      };

  return (
    <motion.article
      className={`${colombiaBlockStyles.block} ${colombiaBlockStyles.blockIALayout}`}
      {...motionProps}
    >
      <div className={colombiaBlockStyles.blockInnerIA}>
        <div className={colombiaBlockStyles.textColIA}>
          <p className={`${colombiaBlockStyles.label} ${colombiaVibrant.labelCaps}`}>
            {block.label}
          </p>
          <h3 className={`${colombiaBlockStyles.blockTitle} ${colombiaVibrant.headlineBlock}`}>
            {block.headline}
          </h3>
          <p className={colombiaBlockStyles.blockDesc}>{description}</p>
          <div className={colombiaBlockStyles.iaListRow}>
            <div className={styles.iaPricingCol}>
              <PricingList services={services} />
            </div>
            <Image
              src={COLOMBIA_AUTOMATIZACIONES_SRC}
              alt="Asistente de inteligencia artificial Fluxa Method"
              width={480}
              height={480}
              className={colombiaBlockStyles.iaMascot}
              sizes="(max-width: 768px) 120px, 168px"
            />
          </div>
          <p className={styles.priceNote}>Precios netos a Fluxa · venta referencia orientativa</p>
        </div>
      </div>
    </motion.article>
  );
}

function CategoryBlockApp({ category, reduceMotion }) {
  const { block, description, services } = category;
  const motionProps = reduceMotion
    ? {}
    : {
        variants: blockFadeUp,
        initial: 'hidden',
        whileInView: 'show',
        viewport: { once: true, amount: 0.12 },
      };

  return (
    <motion.article
      className={`${colombiaBlockStyles.block} ${colombiaBlockStyles.blockAppLayout}`}
      {...motionProps}
    >
      <div className={colombiaBlockStyles.blockInnerApp}>
        <div className={colombiaBlockStyles.textColApp}>
          <p className={`${colombiaBlockStyles.label} ${colombiaVibrant.labelCaps}`}>
            {block.label}
          </p>
          <h3 className={`${colombiaBlockStyles.blockTitle} ${colombiaVibrant.headlineBlock}`}>
            {block.headline}
          </h3>
          <p className={colombiaBlockStyles.blockDesc}>{description}</p>
          <PricingList services={services} />
          <div className={colombiaBlockStyles.appCtaRow}>
            <Image
              src={COLOMBIA_APP_SRC}
              alt="App móvil con marca propia para iOS y Android — Fluxa Method"
              width={800}
              height={600}
              className={colombiaBlockStyles.appVisual}
              sizes="(max-width: 768px) 130px, 220px"
            />
          </div>
          <p className={styles.priceNote}>Precios netos a Fluxa · venta referencia orientativa</p>
        </div>
      </div>
    </motion.article>
  );
}

function CategoryBlock({ category, reduceMotion }) {
  const { block } = category;
  const motionProps = reduceMotion
    ? { initial: false }
    : {
        variants: blockFadeUp,
        initial: 'hidden',
        whileInView: 'show',
        viewport: { once: true, amount: 0.12 },
      };

  if (block.layout === 'ia') {
    return <CategoryBlockIA category={category} reduceMotion={reduceMotion} />;
  }

  if (block.layout === 'app') {
    return <CategoryBlockApp category={category} reduceMotion={reduceMotion} />;
  }

  if (block.layout === 'text-only') {
    return (
      <motion.article
        className={`${colombiaBlockStyles.block} ${colombiaBlockStyles.blockTextOnly}`}
        {...motionProps}
      >
        <div className={colombiaBlockStyles.blockInnerTextOnly}>
          <CategoryBlockText category={category} />
        </div>
      </motion.article>
    );
  }

  const layoutClass = block.imageFirst
    ? colombiaBlockStyles.imageLeft
    : colombiaBlockStyles.imageRight;
  const innerCompact =
    block.layout === 'image' || block.layout === 'voice' || block.layout === 'video';

  return (
    <motion.article className={`${colombiaBlockStyles.block} ${layoutClass}`} {...motionProps}>
      <div
        className={
          innerCompact
            ? `${colombiaBlockStyles.blockInner} ${colombiaBlockStyles.blockInnerCompact}`
            : colombiaBlockStyles.blockInner
        }
      >
        <div className={colombiaBlockStyles.imageCol}>
          <CategoryCreative category={category} />
        </div>
        <CategoryBlockText category={category} />
      </div>
    </motion.article>
  );
}

export default function CatalogoServicios() {
  const reduceMotion = useReducedMotion();
  const { title, subtitle, note, categories } = CATALOGO;

  return (
    <VendedoresSection className={colombiaBlockStyles.section} id="catalogo">
      <div className={colombiaBlockStyles.sectionHead}>
        <h2 className={`${colombiaBlockStyles.h2} ${colombiaVibrant.headlineSm}`}>
          ¿Qué puedes{' '}
          <span className={colombiaVibrant.accentPurple}>vender?</span>
        </h2>
        <p className={`${colombiaBlockStyles.sub} ${colombiaVibrant.body}`}>{subtitle}</p>
        <p className={styles.catalogNote}>{note}</p>
      </div>

      <div className={colombiaBlockStyles.blocks}>
        {categories.map((category, index) => (
          <div key={category.id} className={colombiaBlockStyles.blockWrap}>
            <CategoryBlock category={category} reduceMotion={!!reduceMotion} />
            {index < categories.length - 1 ? (
              <hr className={colombiaBlockStyles.separator} aria-hidden />
            ) : null}
          </div>
        ))}
      </div>
    </VendedoresSection>
  );
}
