import styles from '@/app/trading/page.module.css';

export function CheckIcon() {
  return <span className={styles.checkIcon} aria-hidden>✓</span>;
}

export function CrossIcon() {
  return <span className={styles.crossIcon} aria-hidden>✕</span>;
}
