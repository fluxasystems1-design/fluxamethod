'use client';

import { PRECIOS_RESUMEN, PRECIOS_RESUMEN_ROWS } from '@/app/embajadores-fluxa/vendedores-config';
import colombiaVibrant from '@/components/colombia/colombiaVibrant.module.css';
import VendedoresSection from './VendedoresSection';
import styles from './PreciosResumen.module.css';

export default function PreciosResumen() {
  const { title, subtitle, printLabel, columns } = PRECIOS_RESUMEN;

  function handlePrint() {
    window.print();
  }

  return (
    <VendedoresSection className={styles.section} id="precios-resumen">
      <div className={styles.container}>
        <div className={styles.head}>
          <div>
            <h2 className={`${styles.h2} ${colombiaVibrant.headlineSm}`}>{title}</h2>
            <p className={styles.sub}>{subtitle}</p>
          </div>
          <button type="button" className={styles.printBtn} onClick={handlePrint}>
            {printLabel}
          </button>
        </div>

        <div className={styles.tableWrap}>
          <table className={styles.table}>
            <thead>
              <tr>
                {columns.map((col) => (
                  <th key={col}>{col}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {PRECIOS_RESUMEN_ROWS.map((row) => (
                <tr key={row.name}>
                  <td data-label={columns[0]}>{row.name}</td>
                  <td data-label={columns[1]}>{row.neto}</td>
                  <td data-label={columns[2]}>{row.venta}</td>
                  <td data-label={columns[3]}>{row.entrega}</td>
                  <td data-label={columns[4]}>{row.margen}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </VendedoresSection>
  );
}
