export const TRADING_CREATIVOS_BASE = '/trading/creativos';

export const TRADING_CREATIVOS = {
  fondos: `${TRADING_CREATIVOS_BASE}/fondos`,
  hero: `${TRADING_CREATIVOS_BASE}/hero`,
  video: `${TRADING_CREATIVOS_BASE}/video`,
  secciones: `${TRADING_CREATIVOS_BASE}/secciones`,
  iconos: `${TRADING_CREATIVOS_BASE}/iconos`,
};

export const TRADING_BG_SRC = '/trading/trading-bg.png';

export const TRADING_SECTION_IMAGES = {
  hero: {
    src: '/trading/imagen1trading.png',
    alt: 'Sistema digital para traders — landing, gráficos y automatización',
  },
  problema: {
    src: `${TRADING_CREATIVOS.secciones}/problema-tight.png`,
    alt: 'Alianza digital — automatización y conversión para traders',
    width: 887,
    height: 580,
  },
  solucion: {
    src: `${TRADING_CREATIVOS.secciones}/equipo-sistema-tight.png`,
    alt: 'Equipo e infraestructura digital para traders',
    width: 914,
    height: 680,
  },
  comparacion: {
    src: `${TRADING_CREATIVOS.secciones}/laptop-trading-tight.png`,
    alt: 'Laptop con métricas y gráficos de trading en tiempo real',
    width: 1015,
    height: 520,
  },
  tecnologia: {
    src: '/trading/celulares-png.png',
    alt: 'Apps móviles de trading con gráficos y operaciones en tiempo real',
  },
  ctaFinal: {
    src: `${TRADING_CREATIVOS.secciones}/handshake-conversion.png`,
    alt: 'Cierre digital y conversión de clientes',
  },
};
