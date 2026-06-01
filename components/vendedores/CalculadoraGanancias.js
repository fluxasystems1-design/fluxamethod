'use client';

import { useEffect, useMemo, useState } from 'react';
import {
  CALCULADORA,
  CALCULATOR_PACKAGE_GROUPS,
  CALCULATOR_PACKAGES,
  CALCULATOR_RETAINERS,
} from '@/app/embajadores-fluxa/vendedores-config';
import colombiaVibrant from '@/components/colombia/colombiaVibrant.module.css';
import VendedoresSection from './VendedoresSection';
import styles from './CalculadoraGanancias.module.css';

function midpoint(min, max) {
  return (min + max) / 2;
}

function formatUsd(n) {
  return `$${Math.round(n).toLocaleString('en-US')}`;
}

function formatRango(min, max, desde) {
  if (desde) return `desde ${formatUsd(min)}`;
  return `${formatUsd(min)}–${formatUsd(max)}`;
}

export default function CalculadoraGanancias() {
  const {
    title,
    subtitle,
    projectsLabel,
    projectsMin,
    projectsMax,
    retainersLabel,
    retainersMin,
    retainersMax,
    packageLabel,
    retainerTypeLabel,
    results,
    footnote,
  } = CALCULADORA;

  const defaultPackageId = CALCULATOR_PACKAGES[0]?.id || '';

  const [packageId, setPackageId] = useState(defaultPackageId);
  const [projects, setProjects] = useState(2);
  const [retainers, setRetainers] = useState(0);
  const [retainerTypeId, setRetainerTypeId] = useState(CALCULATOR_RETAINERS[0].id);

  const selectedPackage =
    CALCULATOR_PACKAGES.find((p) => p.id === packageId) || CALCULATOR_PACKAGES[0];
  const selectedRetainer =
    CALCULATOR_RETAINERS.find((r) => r.id === retainerTypeId) || CALCULATOR_RETAINERS[0];

  useEffect(
    function () {
      if (packageId && !CALCULATOR_PACKAGES.some((p) => p.id === packageId)) {
        setPackageId(defaultPackageId);
      }
    },
    [packageId, defaultPackageId]
  );

  const calc = useMemo(() => {
    if (!selectedPackage) {
      return {
        pagas: 0,
        cobras: 0,
        ganancia: 0,
        pkgNetoUnit: 0,
        pkgVentaUnit: 0,
        retNetoUnit: 0,
        retVentaUnit: 0,
      };
    }

    const pkgNetoUnit = selectedPackage.neto;
    const pkgVentaUnit = midpoint(selectedPackage.ventaMin, selectedPackage.ventaMax);
    const retNetoUnit = selectedRetainer.neto;
    const retVentaUnit = midpoint(selectedRetainer.ventaMin, selectedRetainer.ventaMax);

    const pagas = pkgNetoUnit * projects + retNetoUnit * retainers;
    const cobras = pkgVentaUnit * projects + retVentaUnit * retainers;

    return {
      pagas,
      cobras,
      ganancia: cobras - pagas,
      pkgNetoUnit,
      pkgVentaUnit,
      retNetoUnit,
      retVentaUnit,
    };
  }, [selectedPackage, selectedRetainer, projects, retainers]);

  const { pagas, cobras, ganancia, pkgNetoUnit, pkgVentaUnit, retNetoUnit, retVentaUnit } =
    calc;

  const breakdownLines = useMemo(() => {
    if (!selectedPackage) return [];
    const lines = [
      `${projects} × ${selectedPackage.name}: neto ${formatUsd(pkgNetoUnit)} → ref. ${formatUsd(pkgVentaUnit)}/cierre`,
    ];
    if (retainers > 0) {
      lines.push(
        `${retainers} × retainer ${selectedRetainer.label}: neto ${formatUsd(retNetoUnit)}/mes → ref. ${formatUsd(retVentaUnit)}/mes`
      );
    }
    return lines;
  }, [
    selectedPackage,
    selectedRetainer,
    projects,
    retainers,
    pkgNetoUnit,
    pkgVentaUnit,
    retNetoUnit,
    retVentaUnit,
  ]);

  return (
    <VendedoresSection className={styles.section} id="calculadora">
      <div className={styles.container}>
        <h2 className={`${styles.h2} ${colombiaVibrant.headlineSm}`}>{title}</h2>
        <p className={styles.sub}>{subtitle}</p>

        <div className={`${styles.calcPanel} ${colombiaVibrant.glowPanel}`}>
          <div className={styles.calcGrid}>
            <div className={styles.controls}>
              <label className={styles.field}>
                <span className={styles.fieldLabel}>{packageLabel}</span>
                <div className={styles.selectWrap}>
                  <select
                    value={packageId}
                    onChange={(e) => setPackageId(e.target.value)}
                    className={styles.select}
                  >
                    {CALCULATOR_PACKAGE_GROUPS.map((group) => (
                      <optgroup key={group.id} label={group.label}>
                        {group.packageIds.map((id) => {
                          const p = CALCULATOR_PACKAGES.find((pkg) => pkg.id === id);
                          if (!p) return null;
                          return (
                            <option key={p.id} value={p.id}>
                              {p.name} · neto {formatUsd(p.neto)}
                            </option>
                          );
                        })}
                      </optgroup>
                    ))}
                  </select>
                </div>
                {selectedPackage ? (
                  <p className={styles.fieldHint}>
                    Ref. venta por cierre:{' '}
                    <strong>
                      {formatRango(
                        selectedPackage.ventaMin,
                        selectedPackage.ventaMax,
                        selectedPackage.ventaDesde
                      )}
                    </strong>
                    {!selectedPackage.ventaDesde ? (
                      <> · punto medio usado: {formatUsd(pkgVentaUnit)}</>
                    ) : null}
                  </p>
                ) : null}
              </label>

              <label className={styles.field}>
                <span className={styles.fieldLabel}>
                  {projectsLabel}
                  <strong className={styles.fieldValue}>{projects}</strong>
                </span>
                <input
                  type="range"
                  min={projectsMin}
                  max={projectsMax}
                  value={projects}
                  onChange={(e) => setProjects(Number(e.target.value))}
                  className={styles.range}
                  aria-valuemin={projectsMin}
                  aria-valuemax={projectsMax}
                  aria-valuenow={projects}
                />
                <div className={styles.rangeTicks} aria-hidden>
                  <span>{projectsMin}</span>
                  <span>{projectsMax}</span>
                </div>
              </label>

              <label className={styles.field}>
                <span className={styles.fieldLabel}>
                  {retainersLabel}
                  <strong className={styles.fieldValue}>{retainers}</strong>
                </span>
                <input
                  type="range"
                  min={retainersMin}
                  max={retainersMax}
                  value={retainers}
                  onChange={(e) => setRetainers(Number(e.target.value))}
                  className={styles.range}
                  aria-valuemin={retainersMin}
                  aria-valuemax={retainersMax}
                  aria-valuenow={retainers}
                />
                <div className={styles.rangeTicks} aria-hidden>
                  <span>{retainersMin}</span>
                  <span>{retainersMax}</span>
                </div>
              </label>

              <label className={styles.field}>
                <span className={styles.fieldLabel}>{retainerTypeLabel}</span>
                <div className={styles.selectWrap}>
                  <select
                    value={retainerTypeId}
                    onChange={(e) => setRetainerTypeId(e.target.value)}
                    className={styles.select}
                    disabled={retainers === 0}
                  >
                    {CALCULATOR_RETAINERS.map((r) => (
                      <option key={r.id} value={r.id}>
                        {r.label} — neto {formatUsd(r.neto)}/mes
                      </option>
                    ))}
                  </select>
                </div>
                {retainers === 0 ? (
                  <p className={styles.fieldHintMuted}>Sube el slider para incluir retainers.</p>
                ) : null}
              </label>
            </div>

            <div className={styles.resultsCol}>
              <p className={styles.resultsTitle}>Resumen mensual estimado</p>
              <div className={styles.results}>
                <article className={`${styles.resultCard} ${colombiaVibrant.glowCard}`}>
                  <span className={styles.resultLabel}>{results.pagas}</span>
                  <strong>{formatUsd(pagas)}</strong>
                </article>
                <article className={`${styles.resultCard} ${colombiaVibrant.glowCard}`}>
                  <span className={styles.resultLabel}>{results.cobras}</span>
                  <strong>{formatUsd(cobras)}</strong>
                </article>
                <article
                  className={`${styles.resultCard} ${styles.resultHighlight} ${colombiaVibrant.glowCard}`}
                >
                  <span className={styles.resultLabel}>{results.ganancia}</span>
                  <strong>{formatUsd(ganancia)}</strong>
                </article>
              </div>

              {breakdownLines.length > 0 ? (
                <ul className={styles.breakdown}>
                  {breakdownLines.map((line) => (
                    <li key={line}>{line}</li>
                  ))}
                </ul>
              ) : null}
            </div>
          </div>
        </div>

        <p className={styles.footnote}>{footnote}</p>
      </div>
    </VendedoresSection>
  );
}
