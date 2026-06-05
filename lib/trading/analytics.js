/** Eventos Meta Pixel en CTAs de /trading */
export function trackTradingEvent(eventName, params = {}) {
  if (typeof window === 'undefined' || !window.fbq) return;
  window.fbq('trackCustom', eventName, params);
}

export function trackTradingCta(location, extra = {}) {
  trackTradingEvent('TradingCTA', { location, ...extra });
}
