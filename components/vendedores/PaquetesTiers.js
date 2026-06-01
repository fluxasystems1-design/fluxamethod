'use client';

import { useState } from 'react';
import { PAQUETES } from '@/app/embajadores-fluxa/vendedores-config';
import colombiaVibrant from '@/components/colombia/colombiaVibrant.module.css';
import VendedoresSection from './VendedoresSection';
import styles from './PaquetesTiers.module.css';

function formatVenta(pkg) {
  if (pkg.ventaLabel) return pkg.ventaLabel;
  if (pkg.ventaMax) {
    return `$${pkg.ventaMin.toLocaleString('en-US')}–$${pkg.ventaMax.toLocaleString('en-US')}`;
  }
  return `desde $${pkg.ventaMin.toLocaleString('en-US')}`;
}

function formatNeto(pkg) {
  if (pkg.netoLabel) return pkg.netoLabel;
  return `$${pkg.neto.toLocaleString('en-US')}`;
}

function TierPackageCard({ pkg, activeTier }) {
  return (
    <article
      className={`${styles.pkgCard} ${colombiaVibrant.glowCard} ${
        activeTier.featured ? styles.pkgCardFeatured : ''
      }`}
    >
      {activeTier.featured && activeTier.recommendedLabel && (
        <span className={styles.recBadge}>{activeTier.recommendedLabel}</span>
      )}
      {pkg.customQuote && pkg.badge && <span className={styles.quoteBadge}>{pkg.badge}</span>}
      <h3>{pkg.name}</h3>
      <div className={styles.priceRow}>
        <div>
          <span className={styles.priceLabel}>Neto</span>
          <strong>{formatNeto(pkg)}</strong>
        </div>
        <div>
          <span className={styles.priceLabel}>Venta ref.</span>
          <strong>{formatVenta(pkg)}</strong>
        </div>
        <div>
          <span className={styles.priceLabel}>Comisión</span>
          <strong className={styles.comision}>{pkg.comision}</strong>
        </div>
      </div>
      {pkg.entrega ? (
        <p className={styles.entrega}>
          <span>Entrega orientativa:</span> {pkg.entrega}
        </p>
      ) : null}
      <ul>
        {pkg.includes.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </article>
  );
}

function NicheComboCard({ combo }) {
  return (
    <article className={`${styles.nicheCard} ${colombiaVibrant.glowCard}`}>
      <span className={styles.industryBadge}>{combo.industryBadge}</span>
      <span className={styles.savingsBadge}>Ahorras ${combo.ahorro.toLocaleString('en-US')}</span>
      <h3 className={styles.nicheName}>{combo.name}</h3>
      <div className={styles.nichePricing}>
        <div className={styles.nicheNeto}>
          <span className={styles.priceLabel}>Neto Fluxa</span>
          <strong>${combo.neto.toLocaleString('en-US')}</strong>
        </div>
        <p className={styles.nicheVenta}>
          Venta sugerida: ${combo.ventaMin.toLocaleString('en-US')}–$
          {combo.ventaMax.toLocaleString('en-US')}
        </p>
        <p className={styles.nicheMargen}>
          Margen vendedor: <strong>{combo.margen}</strong>
        </p>
        {combo.entrega ? (
          <p className={styles.entrega}>
            <span>Entrega:</span> {combo.entrega}
          </p>
        ) : null}
      </div>
      <ul className={styles.nicheIncludes}>
        {combo.includes.map((item) => (
          <li key={item}>
            <span className={styles.checkIcon} aria-hidden>
              ✓
            </span>
            {item}
          </li>
        ))}
      </ul>
      <p className={styles.idealFor}>
        <span>Ideal para:</span> {combo.idealFor}
      </p>
    </article>
  );
}

export default function PaquetesTiers() {
  const { title, subtitle, note, tiers, nicheCombos, comparisonTable } = PAQUETES;
  const [activeTierId, setActiveTierId] = useState(
    tiers.find((t) => t.featured)?.id || tiers[0].id
  );

  const activeTier = tiers.find((t) => t.id === activeTierId) || tiers[0];

  return (
    <VendedoresSection className={`${styles.section} ${colombiaVibrant.glowSection}`} id="paquetes">
      <div className={styles.container}>
        <h2 className={`${styles.h2} ${colombiaVibrant.headlineSm}`}>{title}</h2>
        <p className={styles.sub}>{subtitle}</p>
        <p className={styles.note}>{note}</p>

        <div className={styles.tierTabs} role="tablist" aria-label="Niveles de paquetes">
          {tiers.map((tier) => (
            <button
              key={tier.id}
              type="button"
              role="tab"
              aria-selected={activeTierId === tier.id}
              className={
                activeTierId === tier.id
                  ? `${styles.tierTab} ${styles.tierTabActive}`
                  : styles.tierTab
              }
              onClick={() => setActiveTierId(tier.id)}
            >
              {tier.name.replace(/^TIER \d+ — /, '')}
            </button>
          ))}
        </div>

        <div className={styles.packagesGrid} role="tabpanel">
          {activeTier.packages.map((pkg) => (
            <TierPackageCard key={pkg.id} pkg={pkg} activeTier={activeTier} />
          ))}
        </div>

        <section className={styles.nicheSection} id="paquetes-nichos" aria-labelledby="niche-heading">
          <h3 id="niche-heading" className={styles.nicheSectionTitle}>
            {nicheCombos.title}
          </h3>
          <p className={styles.nicheSectionSub}>{nicheCombos.subtitle}</p>
          <div className={styles.nicheGrid}>
            {nicheCombos.combos.map((combo) => (
              <NicheComboCard key={combo.id} combo={combo} />
            ))}
          </div>
        </section>

        <h3 className={styles.tableTitle}>Comparativa de ganancias</h3>
        <div className={styles.compareWrap}>
          <table className={styles.compareTable}>
            <thead>
              <tr>
                {comparisonTable.headers.map((h) => (
                  <th key={h}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {comparisonTable.rows.map((row) => (
                <tr key={row.escenario}>
                  <td data-label="Escenario">{row.escenario}</td>
                  <td data-label="Paquete">{row.paquete}</td>
                  <td data-label="Cierres">{row.cierres}</td>
                  <td data-label="Pagas">{row.pagas}</td>
                  <td data-label="Cobras">{row.cobras}</td>
                  <td data-label="Ganancia" className={styles.gananciaCell}>
                    {row.ganancia}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className={styles.compareCards}>
          {comparisonTable.rows.map((row) => (
            <article key={row.escenario} className={`${styles.compareCard} ${colombiaVibrant.glowCard}`}>
              <h4>{row.escenario}</h4>
              <p className={styles.comparePkg}>{row.paquete}</p>
              <dl>
                <div>
                  <dt>Cierres/mes</dt>
                  <dd>{row.cierres}</dd>
                </div>
                <div>
                  <dt>Pagas a Fluxa</dt>
                  <dd>{row.pagas}</dd>
                </div>
                <div>
                  <dt>Cobras (ref.)</dt>
                  <dd>{row.cobras}</dd>
                </div>
                <div>
                  <dt>Tu ganancia</dt>
                  <dd className={styles.gananciaCell}>{row.ganancia}</dd>
                </div>
              </dl>
            </article>
          ))}
        </div>
      </div>
    </VendedoresSection>
  );
}
