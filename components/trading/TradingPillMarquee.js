import styles from '@/app/trading/page.module.css';

export default function TradingPillMarquee({ pills, reverse = false, className = '' }) {
  if (!pills?.length) return null;

  const track = [...pills, ...pills];

  return (
    <div
      className={`${styles.marqueeWrap} ${reverse ? styles.marqueeWrapReverse : ''} ${className}`.trim()}
      aria-hidden
    >
      <div className={`${styles.marqueeTrack} ${reverse ? styles.marqueeReverse : ''}`}>
        {track.map((pill, index) => (
          <span key={`${pill}-${index}`} className={styles.pill}>
            {pill}
          </span>
        ))}
      </div>
    </div>
  );
}
