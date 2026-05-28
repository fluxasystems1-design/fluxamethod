import blockStyles from './ChileServiceBlocks.module.css';
import styles from './ChileVoiceWaveVisual.module.css';

const VOICE_BARS = [
  { duration: 0.42, delay: 0 },
  { duration: 0.58, delay: 0.06 },
  { duration: 0.48, delay: 0.11 },
  { duration: 0.72, delay: 0.03 },
  { duration: 0.55, delay: 0.14 },
  { duration: 0.65, delay: 0.08 },
  { duration: 0.45, delay: 0.18 },
  { duration: 0.88, delay: 0.05 },
  { duration: 0.52, delay: 0.16 },
  { duration: 0.76, delay: 0.09 },
  { duration: 0.61, delay: 0.12 },
  { duration: 0.9, delay: 0.02 },
];

const PULSE_DELAYS = ['0s', '0.5s', '1s', '1.5s'];

function MicIcon() {
  return (
    <svg
      className={styles.micIcon}
      width="40"
      height="40"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <rect x="9" y="3" width="6" height="10" rx="3" fill="currentColor" />
      <path
        d="M6 11.5a6 6 0 0 0 12 0"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
      />
      <path d="M12 17.5v3" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" />
      <path d="M9 20.5h6" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" />
    </svg>
  );
}

/** Bloque 4 — visual de onda de voz (CSS puro) */
export default function ChileVoiceWaveVisual() {
  return (
    <div
      className={`service-block-4 ${blockStyles.imagePlaceholder} ${styles.panel}`}
      role="img"
      aria-label="Visualización de asistente de voz activo"
    >
      <div className={`${styles.metric} ${styles.metricTopLeft}`}>
        <span className={styles.metricValue}>1,247</span>
        <span className={styles.metricLabel}>Llamadas atendidas</span>
      </div>
      <div className={`${styles.metric} ${styles.metricTopRight}`}>
        <span className={styles.metricValue}>98.3%</span>
        <span className={styles.metricLabel}>Tasa de respuesta</span>
      </div>

      <div className={styles.stage}>
        <div className={styles.rings} aria-hidden>
          {PULSE_DELAYS.map((delay) => (
            <span
              key={delay}
              className={styles.ring}
              style={{ animationDelay: delay }}
            />
          ))}
        </div>
        <div className={styles.center}>
          <MicIcon />
          <p className={styles.status}>
            <span className={styles.typingLine}>Asistente activo...</span>
          </p>
        </div>
      </div>

      <div className={styles.bars} aria-hidden>
        {VOICE_BARS.map((bar, index) => (
          <span
            key={index}
            className={styles.bar}
            style={{
              animationDuration: `${bar.duration}s`,
              animationDelay: `${bar.delay}s`,
            }}
          />
        ))}
      </div>
    </div>
  );
}
