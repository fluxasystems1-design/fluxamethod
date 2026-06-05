import { CheckIcon, CrossIcon } from '@/components/trading/TradingIcons';
import TradingIconCardGrid from '@/components/trading/TradingIconCardGrid';
import TradingTagPill from '@/components/trading/TradingTagPill';
import styles from '@/app/trading/page.module.css';

export default function TradingIdealBlock({ data }) {
  if (!data) return null;

  return (
    <div className={styles.idealBlock}>
      {data.businessCards?.length ? (
        <TradingIconCardGrid
          items={data.businessCards}
          className={styles.idealIconGrid}
          columns="auto"
        />
      ) : null}
      <div className={styles.idealGrid}>
        <article className={`${styles.idealCard} ${styles.idealCardYes}`}>
          <TradingTagPill className={styles.idealCardTag}>Ideal para ti</TradingTagPill>
          <h3 className={styles.idealCardTitle}>{data.yesTitle}</h3>
          <ul className={styles.idealList}>
            {data.yes.map((item) => (
              <li key={item}>
                <CheckIcon />
                {item}
              </li>
            ))}
          </ul>
        </article>
        <article className={`${styles.idealCard} ${styles.idealCardNo}`}>
          <TradingTagPill variant="purple" className={styles.idealCardTag}>
            No aplica
          </TradingTagPill>
          <h3 className={styles.idealCardTitle}>{data.noTitle}</h3>
          <ul className={styles.idealList}>
            {data.no.map((item) => (
              <li key={item}>
                <CrossIcon />
                {item}
              </li>
            ))}
          </ul>
        </article>
      </div>
    </div>
  );
}
