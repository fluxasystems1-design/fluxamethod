import { CheckIcon } from '@/components/trading/TradingIcons';
import TradingTagPill from '@/components/trading/TradingTagPill';
import styles from '@/app/trading/page.module.css';

export default function TradingPhaseTimeline({ phases }) {
  if (!phases?.length) return null;

  return (
    <div className={styles.phaseTimeline}>
      {phases.map((phase) => (
        <article key={phase.id} className={styles.phaseStep}>
          <TradingTagPill className={styles.phaseStepTag}>Fase {phase.step}</TradingTagPill>
          <span className={styles.iconCardCircle} aria-hidden>
            {phase.icon}
          </span>
          <h3 className={styles.phaseStepTitle}>{phase.label}</h3>
          {phase.pills?.length ? (
            <div className={styles.phaseStepPills}>
              {phase.pills.map((pill) => (
                <TradingTagPill key={pill} variant="purple" className={styles.phaseMiniTag}>
                  {pill}
                </TradingTagPill>
              ))}
            </div>
          ) : null}
          <ul className={styles.phaseStepList}>
            {phase.items.map((item) => (
              <li key={item}>
                <CheckIcon />
                {item}
              </li>
            ))}
          </ul>
        </article>
      ))}
    </div>
  );
}
