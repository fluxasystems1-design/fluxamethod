import typeStyles from '@/app/trading/tradingType.module.css';

export default function TradingHeadline({ before, accent, className = '' }) {
  return (
    <h2 className={`${typeStyles.headlineSm} ${className}`.trim()}>
      {before} <span className={typeStyles.accentPurple}>{accent}</span>
    </h2>
  );
}
