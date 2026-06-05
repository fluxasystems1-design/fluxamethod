'use client';

import Image from 'next/image';
import Link from 'next/link';
import typeStyles from './tradingType.module.css';
import TradingHeader from '@/components/trading/TradingHeader';
import TradingHeadline from '@/components/trading/TradingHeadline';
import TradingStickyCta from '@/components/trading/TradingStickyCta';
import TradingWhatsAppFloat from '@/components/trading/TradingWhatsAppFloat';
import TradingIconCardGrid from '@/components/trading/TradingIconCardGrid';
import TradingPhaseTimeline from '@/components/trading/TradingPhaseTimeline';
import TradingTechPillGroups from '@/components/trading/TradingTechPillGroups';
import TradingTagPill from '@/components/trading/TradingTagPill';
import TradingIdealBlock from '@/components/trading/TradingIdealBlock';
import SectionVisual from '@/components/trading/SectionVisual';
import { CheckIcon, CrossIcon } from '@/components/trading/TradingIcons';
import { useReveal, useFaqAccordion } from '@/lib/landingEffects';
import { trackTradingCta } from '@/lib/trading/analytics';
import { TRADING_SECTION_IMAGES } from '@/lib/trading/assets';
import { tradingWaHref } from '@/lib/trading/whatsapp';
import {
  COMPARACION,
  CTA_FINAL,
  FAQ,
  FOOTER,
  HERO,
  IDEAL_PARA_TI,
  PAQUETES,
  PROBLEMA,
  SOCIAL_PROOF,
  SOLUCION,
  TECNOLOGIA,
  TRADING_WA,
} from './trading-config';
import styles from './page.module.css';

function SectionLabel({ children }) {
  return <p className={styles.sectionLabel}>{children}</p>;
}

function HeroHeadlineLine({ parts }) {
  return (
    <span className={styles.heroTitleLine}>
      {parts.map((part) => (
        <span
          key={part.text}
          className={
            part.style === 'purple'
              ? typeStyles.accentPurple
              : part.style === 'green'
                ? typeStyles.accentGreen
                : undefined
          }
        >
          {part.text}
        </span>
      ))}
    </span>
  );
}

function trackWa(location, extra) {
  return () => trackTradingCta(location, extra);
}

export default function TradingPage() {
  useReveal();
  useFaqAccordion();

  return (
    <div className={styles.wrap}>
      <TradingHeader waHref={TRADING_WA.href} />
      <TradingStickyCta href={TRADING_WA.href} label={HERO.ctaPrimary} />

      <section className={styles.hero} data-reveal id="inicio">
        <div className={styles.heroGlow} aria-hidden />
        <div className={styles.heroInner}>
          <p className={styles.heroEyebrow}>{HERO.eyebrow}</p>
          <h1 className={`${typeStyles.headlineHero} ${styles.heroTitle}`}>
            {HERO.headlineLines.map((line) => (
              <HeroHeadlineLine key={line.map((p) => p.text).join('')} parts={line} />
            ))}
          </h1>
          <p className={styles.heroLead}>{HERO.lead}</p>

          <div className={styles.heroMedia}>
            <Image
              src={TRADING_SECTION_IMAGES.hero.src}
              alt={TRADING_SECTION_IMAGES.hero.alt}
              width={1024}
              height={1024}
              className={styles.heroMediaImg}
              priority
              sizes="(max-width: 768px) 100vw, 900px"
            />
          </div>

          <div className={styles.heroCtas}>
            <a
              href={TRADING_WA.href}
              className={styles.ctaPrimary}
              target="_blank"
              rel="noopener noreferrer"
              onClick={trackWa('hero_primary')}
            >
              {HERO.ctaPrimary}
            </a>
            <a
              href={HERO.ctaSecondaryHref}
              className={styles.ctaGhost}
              target="_blank"
              rel="noopener noreferrer"
              onClick={trackWa('hero_secondary')}
            >
              {HERO.ctaSecondary}
            </a>
          </div>
          <p className={styles.heroTrustLine}>{HERO.trustLine}</p>
        </div>
      </section>

      <section className={`${styles.section} ${styles.sectionCard}`} data-reveal id="problema">
        <div className={styles.container}>
          <SectionLabel>{PROBLEMA.label}</SectionLabel>
          <div className={styles.sectionSplit}>
            <div className={styles.sectionSplitText}>
              <TradingHeadline before={PROBLEMA.titleBefore} accent={PROBLEMA.titleAccent} />
              <div className={styles.problemaIntroPills}>
                {PROBLEMA.intro.map((line) => (
                  <span key={line} className={styles.problemaIntroPill}>
                    {line}
                  </span>
                ))}
              </div>
              <p className={styles.problemaPivot}>{PROBLEMA.pivot}</p>
              <div className={styles.painBlock}>
                <TradingTagPill variant="purple" className={styles.painsTag}>
                  {PROBLEMA.painsTag}
                </TradingTagPill>
                <p className={styles.painsSubtitle}>{PROBLEMA.subtitle}</p>
                <ul className={styles.painGrid}>
                  {PROBLEMA.pains.map((pain) => (
                    <li key={pain} className={styles.painCard}>
                      <CrossIcon />
                      <span>{pain}</span>
                    </li>
                  ))}
                </ul>
                <p className={styles.problemaCloseCard}>{PROBLEMA.close}</p>
              </div>
            </div>
            <SectionVisual
              image={TRADING_SECTION_IMAGES.problema}
              className={`${styles.sectionVisualSide} ${styles.problemaVisual}`}
              sizes="100vw"
            />
          </div>
        </div>
      </section>

      <section className={styles.section} data-reveal id="solucion">
        <div className={styles.container}>
          <SectionLabel>{SOLUCION.label}</SectionLabel>
          <TradingHeadline before={SOLUCION.titleBefore} accent={SOLUCION.titleAccent} />
          <p className={styles.sectionLead}>{SOLUCION.subtitle}</p>
          <SectionVisual
            image={TRADING_SECTION_IMAGES.solucion}
            className={styles.solucionVisual}
            sizes="100vw"
          />
          <h3 className={styles.includesBlockTitle}>{SOLUCION.includesTitle}</h3>
          <TradingIconCardGrid items={HERO.featureCards} className={styles.includesIconGrid} />
          <TradingPhaseTimeline phases={SOLUCION.phases} />
        </div>
      </section>

      <section className={`${styles.section} ${styles.sectionCard}`} data-reveal id="comparacion">
        <div className={styles.container}>
          <SectionLabel>{COMPARACION.label}</SectionLabel>
          <TradingHeadline before={COMPARACION.titleBefore} accent={COMPARACION.titleAccent} />
          <SectionVisual image={TRADING_SECTION_IMAGES.comparacion} className={styles.compareVisualTop} />
          <div className={styles.compareTableWrap}>
            <table className={styles.compareTable}>
              <thead>
                <tr>
                  <th scope="col" />
                  <th scope="col">Trader tradicional</th>
                  <th scope="col">Growth Traders</th>
                </tr>
              </thead>
              <tbody>
                {COMPARACION.rows.map((row) => (
                  <tr key={row.topic}>
                    <th scope="row">{row.topic}</th>
                    <td>
                      <CrossIcon /> {row.before}
                    </td>
                    <td className={styles.compareCellAfter}>
                      <CheckIcon /> {row.after}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className={styles.compareCardsMobile}>
            <article className={`${styles.compareCard} ${styles.compareBefore}`}>
              <span className={styles.compareLabel}>Trader tradicional</span>
              <ul>
                {COMPARACION.rows.map((row) => (
                  <li key={row.topic}>
                    <CrossIcon />
                    {row.before}
                  </li>
                ))}
              </ul>
            </article>
            <article className={`${styles.compareCard} ${styles.compareAfter}`}>
              <span className={styles.compareLabel}>Growth Traders</span>
              <ul>
                {COMPARACION.rows.map((row) => (
                  <li key={row.topic}>
                    <CheckIcon />
                    {row.after}
                  </li>
                ))}
              </ul>
            </article>
          </div>
        </div>
      </section>

      <section className={styles.section} data-reveal id="social-proof">
        <div className={styles.container}>
          <SectionLabel>{SOCIAL_PROOF.label}</SectionLabel>
          <h2 className={typeStyles.headlineSm}>{SOCIAL_PROOF.title}</h2>
          <div className={styles.statsRow}>
            {SOCIAL_PROOF.stats.map((stat) => (
              <article key={stat.label} className={styles.statCard}>
                <span className={styles.iconCardCircle} aria-hidden>
                  {stat.icon}
                </span>
                <span className={styles.statValue}>{stat.value}</span>
                <span className={styles.statLabel}>{stat.label}</span>
              </article>
            ))}
          </div>
          <div className={styles.quotesGrid}>
            {SOCIAL_PROOF.items.map((item) => (
              <blockquote key={item.author} className={styles.quoteCard}>
                <p>&ldquo;{item.quote}&rdquo;</p>
                <cite>{item.author}</cite>
              </blockquote>
            ))}
          </div>
        </div>
      </section>

      <section className={`${styles.section} ${styles.sectionCard}`} data-reveal id="ideal">
        <div className={styles.container}>
          <SectionLabel>{IDEAL_PARA_TI.label}</SectionLabel>
          <h2 className={typeStyles.headlineSm}>{IDEAL_PARA_TI.title}</h2>
          <TradingIdealBlock data={IDEAL_PARA_TI} />
        </div>
      </section>

      <section className={`${styles.section} ${styles.sectionCard}`} data-reveal id="paquetes">
        <div className={styles.container}>
          <SectionLabel>{PAQUETES.label}</SectionLabel>
          <h2 className={typeStyles.headlineSm}>{PAQUETES.title}</h2>
          <div className={styles.plansGrid}>
            {PAQUETES.plans.map((plan) => (
              <article
                key={plan.id}
                className={`${styles.planCard} ${plan.featured ? styles.planFeatured : ''}`}
              >
                {plan.badge ? (
                  <TradingTagPill
                    variant={plan.featured ? 'green' : 'purple'}
                    className={styles.planTagPill}
                  >
                    {plan.badge}
                  </TradingTagPill>
                ) : null}
                <h3 className={styles.planName}>{plan.name}</h3>
                <p className={styles.planPrice}>
                  <span className={styles.planCurrency}>{plan.currency}</span>{' '}
                  {plan.price.toLocaleString('en-US')}
                </p>
                <p className={styles.planTagline}>{plan.tagline}</p>
                <p className={styles.planIdeal}>{plan.ideal}</p>
                <p className={styles.includesLabel}>{plan.includesLabel || 'Incluye:'}</p>
                <ul className={styles.planIncludes}>
                  {plan.includes.map((item) => (
                    <li key={item}>
                      <CheckIcon />
                      {item}
                    </li>
                  ))}
                </ul>
                <p className={styles.planResult}>
                  <strong>Resultado:</strong> {plan.result}
                </p>
                <a
                  href={tradingWaHref(plan.waVariant)}
                  className={plan.featured ? styles.ctaPrimary : styles.ctaGhost}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={trackWa('plan', { plan: plan.id })}
                >
                  {plan.cta}
                </a>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className={`${styles.section} ${styles.sectionCard}`} data-reveal id="tecnologia">
        <div className={styles.container}>
          <SectionLabel>{TECNOLOGIA.label}</SectionLabel>
          <TradingHeadline before={TECNOLOGIA.titleBefore} accent={TECNOLOGIA.titleAccent} />
          <p className={styles.sectionLead}>{TECNOLOGIA.subtitle}</p>
          <SectionVisual
            image={TRADING_SECTION_IMAGES.tecnologia}
            className={styles.techVisual}
            sizes="100vw"
          />
          <p className={styles.techDesc}>{TECNOLOGIA.description}</p>
          <TradingTechPillGroups groups={TECNOLOGIA.groups} />
          <div className={styles.customBox}>
            <h3>{TECNOLOGIA.customTitle}</h3>
            <p>{TECNOLOGIA.customText}</p>
            <a
              href={TRADING_WA.custom}
              className={styles.ctaGhost}
              target="_blank"
              rel="noopener noreferrer"
              onClick={trackWa('tech_custom')}
            >
              Consultar solución a medida
            </a>
          </div>
        </div>
      </section>

      <section className={styles.section} data-reveal id="faq">
        <div className={styles.container}>
          <SectionLabel>{FAQ.label}</SectionLabel>
          <h2 className={typeStyles.headlineSm}>{FAQ.title}</h2>
          <div className={styles.faqRoot} data-faq-root>
            {FAQ.items.map((item) => (
              <div key={item.q} className={styles.faqItem} data-faq-item data-open="false">
                <button type="button" className={styles.faqTrigger} data-faq-trigger aria-expanded="false">
                  {item.q}
                  <span className={styles.faqChevron} aria-hidden />
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
        <div className={styles.container}>
          <SectionLabel>{CTA_FINAL.label}</SectionLabel>
          <TradingHeadline before={CTA_FINAL.titleBefore} accent={CTA_FINAL.titleAccent} />
          <SectionVisual image={TRADING_SECTION_IMAGES.ctaFinal} className={styles.ctaVisual} />
          <p className={styles.ctaFinalSub}>{CTA_FINAL.subtitle}</p>
          <p className={styles.ctaFinalLead}>{CTA_FINAL.lead}</p>
          <a
            href={TRADING_WA.href}
            className={styles.ctaPrimary}
            target="_blank"
            rel="noopener noreferrer"
            onClick={trackWa('cta_final')}
          >
            {CTA_FINAL.cta}
          </a>
          <p className={styles.waHint}>{TRADING_WA.display} · Fluxa Method</p>
        </div>
      </section>

      <footer className={styles.footer}>
        <Link href="/trading" className={styles.footerLogo}>
          <Image
            src="/colombia/fluxa-partners-logo.png"
            alt="Fluxa Method"
            width={220}
            height={78}
            className={styles.footerLogoImg}
            loading="lazy"
          />
        </Link>
        <p className={styles.footerTagline}>{FOOTER.tagline}</p>
        <nav className={styles.footerLinks} aria-label="Enlaces">
          {FOOTER.links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className={styles.footerLink}
              {...(link.external
                ? { target: '_blank', rel: 'noopener noreferrer' }
                : {})}
            >
              {link.label}
            </a>
          ))}
        </nav>
        <p className={styles.footerCopy}>© 2026 Fluxa Method. Todos los derechos reservados.</p>
      </footer>

      <TradingWhatsAppFloat href={TRADING_WA.href} />
    </div>
  );
}
