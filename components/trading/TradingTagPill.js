import styles from '@/app/trading/page.module.css';

export default function TradingTagPill({ children, variant = 'green', className = '' }) {
  const variantClass =
    variant === 'purple' ? styles.tagPillPurple : styles.tagPillGreen;

  return (
    <span className={`${styles.tagPill} ${variantClass} ${className}`.trim()}>
      {children}
    </span>
  );
}
