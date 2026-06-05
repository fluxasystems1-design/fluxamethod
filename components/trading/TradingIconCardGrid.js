import styles from '@/app/trading/page.module.css';

export default function TradingIconCardGrid({
  items,
  className = '',
  compact = false,
  columns = 'auto',
}) {
  if (!items?.length) return null;

  const colClass =
    columns === '3'
      ? styles.iconCardGrid3
      : columns === '4'
        ? styles.iconCardGrid4
        : styles.iconCardGridAuto;

  return (
    <div
      className={`${styles.iconCardGrid} ${colClass} ${compact ? styles.iconCardGridCompact : ''} ${className}`.trim()}
      role="list"
    >
      {items.map((item) => (
        <article key={item.label} className={styles.iconCard} role="listitem">
          <span className={styles.iconCardCircle} aria-hidden>
            {item.icon}
          </span>
          <span className={styles.iconCardLabel}>{item.label}</span>
        </article>
      ))}
    </div>
  );
}
