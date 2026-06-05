const WA_NUMBER = '573105813007';

const MESSAGES = {
  default:
    'Hola Fluxa Method. Vengo desde /trading y quiero agendar un diagnóstico estratégico.',
  growth:
    'Hola Fluxa Method. Vengo desde /trading y quiero aplicar al plan Growth Trader (USD 897).',
  domination:
    'Hola Fluxa Method. Vengo desde /trading y quiero aplicar al plan Trader Domination (USD 1.597).',
  custom:
    'Hola Fluxa Method. Vengo desde /trading y necesito una solución tecnológica a medida.',
};

export function tradingWaHref(variant = 'default') {
  const text = MESSAGES[variant] || MESSAGES.default;
  return `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(text)}`;
}

export const TRADING_WA_DISPLAY = '+57 310 581 3007';
